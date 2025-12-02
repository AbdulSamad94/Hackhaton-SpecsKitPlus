import React, { useState, useRef, useEffect, useCallback } from "react"
import clsx from "clsx"
import styles from "./styles.module.css"
import { v4 as uuidv4 } from "uuid";
import { SendHorizontal, BotMessageSquare, X } from 'lucide-react';

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hello! 👋 I'm your AI assistant. How can I help you master Next.js today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()

    const newUserMessage: Message = {
      id: uuidv4(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Clear input immediately for better UX
    setInputValue("")
    setIsLoading(true)
    
    // Update messages with the new user message
    setMessages((prev) => [...prev, newUserMessage])

    try {
      // Build history that includes the current message
      const messageHistory = [...messages, newUserMessage].map(m => ({ 
        role: m.sender, 
        content: m.text 
      }))

      const response = await fetch(`${process.env.DOCUSAURUS_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messageHistory
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botResponse: Message = {
        id: uuidv4(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorResponse: Message = {
        id: uuidv4(),
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <span>🤖</span> AI Assistant
            </div>
            <button 
              className={styles.closeButton} 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={clsx(styles.message, msg.sender === "user" ? styles.userMessage : styles.botMessage)}
              >
                {msg.text}
                <span className={styles.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
              <SendHorizontal 
                onClick={handleSend} 
                aria-label="Send message" 
                className={styles.sendButton}
                style={{ 
                  opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                  cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer'
                }}
              />
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        className={styles.toggleButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X />
        ) : (
          <BotMessageSquare />
        )}
      </button>
    </div>
  )
}
