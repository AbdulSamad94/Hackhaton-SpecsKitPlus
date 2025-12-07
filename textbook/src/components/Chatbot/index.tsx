"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  SendHorizontal,
  BotMessageSquare,
  X,
  Quote,
  Trash2,
  Bot,
} from "lucide-react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SizeOption = "small" | "medium" | "large";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface UserSession {
  id: string;
  name: string;
  email: string;
  softwareBackground?: string;
  hardwareBackground?: string;
}

export default function ChatbotEnhanced() {
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = siteConfig.customFields?.apiUrl as string;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [currentSize, setCurrentSize] = useState<SizeOption>("medium");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hello! 👋 I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, selectedText]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch("/api/auth/session", { credentials: "include", signal })
      .then((res) => res.json())
      .then((data) => {
        if (!signal.aborted && data.session && data.user) {
          setUserSession(data.user);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Chatbot session fetch error:", err);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const text = selection.toString().trim();
        if (text.length >= 5) {
          setSelectedText(text);
        }
      }
    };

    document.addEventListener("mouseup", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();

    const newUserMessage: Message = {
      id: uuidv4(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const messageHistory = [...messages, newUserMessage].map((m) => ({
        role: m.sender,
        content: m.text,
      }));

      let response;

      if (selectedText) {
        response = await fetch(`${apiUrl}/api/ask-selection`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: userMessage,
            selected_text: selectedText,
            user_context: userSession
              ? {
                  software_background: userSession.softwareBackground,
                  hardware_background: userSession.hardwareBackground,
                }
              : undefined,
          }),
        });
      } else {
        response = await fetch(`${apiUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: userMessage,
            history: messageHistory,
            user_context: userSession
              ? {
                  software_background: userSession.softwareBackground,
                  hardware_background: userSession.hardwareBackground,
                }
              : undefined,
          }),
        });
      }

      setSelectedText("");

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botResponse: Message = {
        id: uuidv4(),
        text: data.answer,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse: Message = {
        id: uuidv4(),
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSizeChange = (newSize: SizeOption) => {
    setCurrentSize(newSize);
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={clsx(styles.chatWindow, styles[`size-${currentSize}`])}>
          {/* Header with Size Controls */}
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <span>
                <Bot size={24} />
              </span>{" "}
              AI Assistant
            </div>
            <div className={styles.sizeControls}>
              <button
                className={clsx(
                  styles.sizeButton,
                  currentSize === "small" && styles.active
                )}
                onClick={() => handleSizeChange("small")}
                title="Small size"
                aria-label="Small window"
              >
                S
              </button>
              <button
                className={clsx(
                  styles.sizeButton,
                  currentSize === "medium" && styles.active
                )}
                onClick={() => handleSizeChange("medium")}
                title="Medium size"
                aria-label="Medium window"
              >
                M
              </button>
              <button
                className={clsx(
                  styles.sizeButton,
                  currentSize === "large" && styles.active
                )}
                onClick={() => handleSizeChange("large")}
                title="Large size"
                aria-label="Large window"
              >
                L
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  styles.message,
                  msg.sender === "user" ? styles.userMessage : styles.botMessage
                )}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Custom styling for markdown elements
                      h2: ({ node, ...props }) => (
                        <h2
                          style={{
                            marginTop: "12px",
                            marginBottom: "8px",
                            fontSize: "1.1em",
                            fontWeight: "bold",
                          }}
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          style={{
                            marginTop: "10px",
                            marginBottom: "6px",
                            fontSize: "1.05em",
                            fontWeight: "bold",
                          }}
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          style={{ marginBottom: "8px", lineHeight: "1.5" }}
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          style={{ marginLeft: "16px", marginBottom: "8px" }}
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          style={{ marginLeft: "16px", marginBottom: "8px" }}
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li style={{ marginBottom: "4px" }} {...props} />
                      ),
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: {
                        node?: any;
                        inline?: boolean;
                        className?: string;
                        children?: React.ReactNode;
                      }) =>
                        inline ? (
                          <code
                            style={{
                              backgroundColor: "rgba(0,0,0,0.1)",
                              padding: "2px 4px",
                              borderRadius: "3px",
                              fontSize: "0.9em",
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <code
                            style={{
                              display: "block",
                              backgroundColor: "rgba(0,0,0,0.1)",
                              padding: "8px",
                              borderRadius: "6px",
                              overflowX: "auto",
                              marginBottom: "8px",
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        ),
                      strong: ({ node, ...props }) => (
                        <strong style={{ fontWeight: "bold" }} {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
                <span className={styles.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected Text Context */}
          {selectedText && (
            <div className={styles.selectedContext}>
              <div className={styles.selectedContextHeader}>
                <span className={styles.selectedContextTitle}>
                  <Quote size={14} /> Selected Text
                </span>
                <button
                  onClick={() => setSelectedText("")}
                  className={styles.clearContextButton}
                  aria-label="Clear selection"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className={styles.selectedContextContent}>
                {selectedText.length > 100
                  ? `${selectedText.substring(0, 100)}...`
                  : selectedText}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.input}
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className={styles.sendButtonWrapper}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <BotMessageSquare size={24} />}
      </button>
    </div>
  );
}
