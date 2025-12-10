import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

const STORAGE_KEY = "translate-to-urdu";
const SELECTOR_QUERY =
  "h1, h2, h3, h4, h5, h6, p, li, a, span, td, th, label, button, .markdown";

const TranslateToggle: React.FC = () => {
  const [isUrdu, setIsUrdu] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) === "true";
    }
    return false;
  });
  const location = useLocation();
  const cancelRef = useRef(false);
  const originalContentRef = useRef<Map<Element, string>>(new Map());
  const observerRef = useRef<MutationObserver | null>(null);

  const translateText = async (text: string): Promise<string> => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data[0]) {
        return data[0].map((item: [string]) => item[0]).join("");
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
    return text;
  };

  const translateToUrdu = async () => {
    cancelRef.current = false;

    try {
      const main =
        document.querySelector("main") || document.querySelector("article");
      if (!main) return;

      const elements = main.querySelectorAll(SELECTOR_QUERY);
      const elementsToTranslate: Element[] = [];

      elements.forEach((el) => {
        if (!originalContentRef.current.has(el)) {
          const text = el.textContent?.trim();
          if (
            text &&
            text.length > 0 &&
            !el.closest("code, pre, script, style")
          ) {
            originalContentRef.current.set(el, text);
            elementsToTranslate.push(el);
          }
        }
      });

      if (elementsToTranslate.length === 0) return;

      const batchSize = 30;
      for (let i = 0; i < elementsToTranslate.length; i += batchSize) {
        if (cancelRef.current) return;

        const batch = elementsToTranslate.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (el) => {
            if (cancelRef.current) return;

            const originalText = originalContentRef.current.get(el) || "";
            const translatedText = await translateText(originalText);

            if (!cancelRef.current && el.textContent !== translatedText) {
              el.textContent = translatedText;
            }
          })
        );
      }

      if (!cancelRef.current) {
        document.body.classList.add("urdu-mode");
      }
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  // Reset state and translate on route change
  useEffect(() => {
    // Stop any previous translation
    cancelRef.current = true;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Clear content for new page only if we intend to translate fresh or if completely navigating away
    // Actually, on route change, elements change, so we should always start fresh for the new page
    originalContentRef.current.clear();

    if (isUrdu) {
      // Use MutationObserver to wait for content to be ready
      const main =
        document.querySelector("main") || document.querySelector("article");
      if (main) {
        // If content is already there (unlikely on route change but possible), try immediately
        // But better to wait for stability using observer

        let debounceTimer: NodeJS.Timeout;
        const observer = new MutationObserver(() => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            // Content stabilized
            observer.disconnect();
            cancelRef.current = false;
            translateToUrdu();
          }, 500); // Wait 500ms after last mutation to ensure full load
        });

        observer.observe(main, { childList: true, subtree: true });
        observerRef.current = observer;

        // Fallback for safety if no mutations occur (already loaded)
        setTimeout(() => {
          if (originalContentRef.current.size === 0 && !cancelRef.current) {
            translateToUrdu();
            observer.disconnect();
          }
        }, 2000);
      } else {
        // Fallback if no main found initially
        setTimeout(() => {
          cancelRef.current = false;
          translateToUrdu();
        }, 1000);
      }
    } else {
      document.body.classList.remove("urdu-mode");
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      cancelRef.current = true;
    };
  }, [location.pathname]);

  const handleClick = async () => {
    if (isUrdu) {
      // Switch to English immediately
      cancelRef.current = true;
      if (observerRef.current) observerRef.current.disconnect();

      localStorage.setItem(STORAGE_KEY, "false");
      setIsUrdu(false);
      document.body.classList.remove("urdu-mode");

      // Restore text from memory if available
      if (originalContentRef.current.size > 0) {
        originalContentRef.current.forEach((text, el) => {
          if (document.body.contains(el)) {
            el.textContent = text;
          }
        });
      } else {
        // Recover cleanly if no stored content (unlikely, but safe fallback)
        window.location.reload();
      }
    } else {
      // Translate to Urdu
      localStorage.setItem(STORAGE_KEY, "true");
      setIsUrdu(true);
      await translateToUrdu();
    }
  };

  return (
    <button
      className={styles.translateButton}
      onClick={handleClick}
      title={isUrdu ? "Switch to English" : "Translate to Urdu"}
    >
      {isUrdu ? "EN" : "اردو"}
    </button>
  );
};

export default TranslateToggle;
