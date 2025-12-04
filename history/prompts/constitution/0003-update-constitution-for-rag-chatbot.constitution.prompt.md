---
id: 0003
title: Update constitution for RAG Chatbot with Agents SDK
stage: constitution
date: 2025-12-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-rag-chatbot
branch: main
user: Abdul Samad
command: custom
labels: ["constitution", "rag", "chatbot", "agents-sdk", "vector-database"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

Update the project constitution to include principles for the RAG chatbot implementation with OpenAI Agents SDK.

Key requirements:
- Use OpenAI Agents SDK for LLM integration (hackathon requirement)
- Integrate with Google Gemini via OpenAI compatibility layer
- Use Qdrant Cloud for vector storage and retrieval
- Index all MDX documentation files as context
- Maintain clean, organized, and well-documented backend code
- Ensure proper async/await handling for agent execution
- Use Google text-embedding-004 for embeddings
- Implement proper RAG pipeline: query → embedding → search → context → generation
- Keep API endpoints RESTful and well-documented
- Organize code in modular structure (utils/, models, main app)

## Response snapshot

Updated the project constitution with principles for implementing and maintaining the RAG chatbot system, focusing on SDK integration, vector database usage, code organization, and production-ready patterns.

## Outcome

- ✅ Impact: Added comprehensive guidelines for RAG chatbot development to the project constitution, ensuring consistent patterns for AI-powered features with vector databases and agent frameworks.
- 🧪 Tests: Constitution principles validated against the implemented RAG system (all PASS)
- 📁 Files: .specify/memory/constitution.md
- 🔁 Next prompts: Apply these principles when adding new AI features or extending the RAG system (e.g., conversation memory, multi-modal support)
- 🧠 Reflection: The constitution update captures the technical architecture and best practices discovered during implementation, including async handling, SDK integration patterns, and code organization standards that future AI features should follow.

## Evaluation notes (flywheel)

- Failure modes observed: Initial async/await issues, dependency conflicts - documented as principles to avoid
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Consider adding principles for conversation memory and chat history management in future updates
