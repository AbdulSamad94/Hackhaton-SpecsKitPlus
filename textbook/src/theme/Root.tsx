import React, { ReactNode } from "react";
import Chatbot from "../components/Chatbot";

// Default implementation, that you can customize
export default function Root({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}
