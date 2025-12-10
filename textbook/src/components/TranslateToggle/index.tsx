import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

const STORAGE_KEY = "translate-to-urdu";

// Store original content
const originalContent: Map<Element, string> = new Map();

const TranslateToggle: React.FC = () => {
  const [isUrdu, setIsUrdu] = useState(false);
  const location = useLocation();
  const cancelRef = React.useRef(false);

  // Reset state and translate on route change
  useEffect(() => {
    // Reset stored content for the new page
    originalContent.clear();
    const saved = localStorage.getItem(STORAGE_KEY);

    // Stop any previous translation
    cancelRef.current = true;

    if (saved === "true") {
      setIsUrdu(true);
      // Wait for Docusaurus to swap content
      setTimeout(() => {
        cancelRef.current = false;
        translateToUrdu();
      }, 800);
    } else {
      setIsUrdu(false);
      document.body.classList.remove("urdu-mode");
    }
  }, [location.pathname]);

  const translateText = async (text: string): Promise<string> => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data[0]) {
        return data[0].map((item: any) => item[0]).join("");
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

      const elements = main.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, li, a, span, td, th, label, button"
      );
      const elementsToTranslate: Element[] = [];

      elements.forEach((el) => {
        if (!originalContent.has(el)) {
          const text = el.textContent?.trim();
          if (
            text &&
            text.length > 0 &&
            !el.closest("code, pre, script, style")
          ) {
            originalContent.set(el, text);
            elementsToTranslate.push(el);
          }
        }
      });

      if (elementsToTranslate.length === 0) return;

      const batchSize = 30;
      for (let i = 0; i < elementsToTranslate.length; i += batchSize) {
        // Check if cancelled
        if (cancelRef.current) {
          console.log("Translation cancelled");

          return;
        }

        const batch = elementsToTranslate.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (el) => {
            // Double check cancellation inside loop
            if (cancelRef.current) return;

            const originalText = originalContent.get(el) || "";
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
    } finally {
    }
  };

  const handleClick = async () => {
    if (isUrdu) {
      // Switch to English immediately
      cancelRef.current = true; // Stop any ongoing translation
      localStorage.setItem(STORAGE_KEY, "false");
      setIsUrdu(false);
      // Force stop loading state
      document.body.classList.remove("urdu-mode");

      // Restore text from memory if available
      if (originalContent.size > 0) {
        originalContent.forEach((text, el) => {
          if (document.body.contains(el)) {
            el.textContent = text;
          }
        });
      } else {
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
      // Never disable the button so user can always cancel
      title={isUrdu ? "Switch to English" : "Translate to Urdu"}
    >
      {/* Show EN/Aglo even if loading so user knows they can switch back */}
      {isUrdu ? "EN" : "اردو"}
    </button>
  );
};

export default TranslateToggle;
