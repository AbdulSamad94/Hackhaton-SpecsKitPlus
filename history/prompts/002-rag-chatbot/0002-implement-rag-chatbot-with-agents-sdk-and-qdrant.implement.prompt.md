---
id: "0002"
title: "Implement RAG Chatbot with OpenAI Agents SDK and Qdrant"
stage: "implement"
date: "2025-12-05"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "002-rag-chatbot"
branch: "main"
user: "Abdul Samad"
command: "custom-implementation"
labels:
  - "rag"
  - "chatbot"
  - "agents-sdk"
  - "gemini"
  - "qdrant"
  - "vector-database"
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "backend/main.py"
  - "backend/models.py"
  - "backend/ingest.py"
  - "backend/requirements.txt"
  - "backend/utils/models.py"
  - "backend/utils/helpers.py"
  - "backend/utils/config.py"
  - "backend/README.md"
  - "src/components/Chatbot/index.tsx"
tests:
  - "API endpoint test: POST /api/chat - PASSED"
  - "Vector search with 138 indexed chunks - PASSED"
  - "Agents SDK integration with Gemini - PASSED"
---

## PROMPT

Please perform a deep dive into the `backend` folder and analyze its connection to the frontend in `src/components/Chatbot`. Complete the RAG chatbot implementation, ensuring its correctness and using appropriate file names. You have access to the `.env` file in the backend folder; please ensure everything works correctly. You can create multiple components in the backend directory for better code readability. While other methods for implementing the RAG chatbot with Qdrant Cloud are possible, the primary goal is a functional RAG chatbot. The context for the RAG will be all the MDX files located in the `docs` directory. Please implement the solution and verify it works perfectly.

**Additional requirements:**

- Use OpenAI Agents SDK (required for hackathon)
- Connect with Gemini API via OpenAI compatibility layer
- Implement proper RAG pipeline with Qdrant vector database
- Index all MDX documentation files as context
- Ensure frontend-backend integration works correctly
- Clean up and organize backend code structure

## RESPONSE

Successfully implemented a complete RAG chatbot system with the following components:

### Backend Implementation

1. **Vector Database Setup (Qdrant)**

   - Created `backend/ingest.py` to index MDX files
   - Successfully indexed 138 chunks from documentation
   - Used Google Gemini text-embedding-004 for embeddings
   - Configured Qdrant Cloud connection

2. **Agents SDK Integration**

   - Configured OpenAI Agents SDK with Gemini via `backend/models.py`
   - Used Gemini 2.0 Flash through OpenAI compatibility layer
   - Implemented async endpoints for proper event loop handling

3. **API Endpoints**

   - `POST /api/chat`: Main RAG chat endpoint with context retrieval
   - `POST /api/ask-selection`: Text selection Q&A endpoint
   - `GET /api/health`: Health check endpoint

4. **RAG Pipeline (`backend/main.py`)**

   - Query embedding generation
   - Vector similarity search in Qdrant
   - Context retrieval and formatting
   - Prompt building with RAG context
   - Answer generation using Agents SDK

5. **Code Organization (`backend/utils/`)**
   - `config.py`: Qdrant client initialization
   - `helpers.py`: Embedding, search, and prompt building functions
   - `models.py`: Pydantic request/response schemas

### Frontend Integration

Updated `src/components/Chatbot/index.tsx`:

- Changed payload format to match backend API (`query` instead of `message`)
- Updated response parsing (`answer` instead of `response`)
- Maintained chat history functionality

### Code Cleanup

- Removed unused files: `test_rag.py`, `list_models.py`, `agents_instructions.py`, `pydantic_models.py`
- Added comprehensive documentation to all Python modules
- Created `backend/README.md` with architecture and API documentation
- Organized code with clear module purposes

### Technical Details

**Dependencies added:**

- `google-generativeai`: For Gemini API access
- `qdrant-client`: For vector database operations
- `openai` v2.9.0: For Agents SDK compatibility

**Fixed Issues:**

- Replaced missing `agents` library usage with proper SDK imports
- Fixed async/await compatibility (converted sync to async endpoints)
- Resolved dependency conflicts (`httpx-aiohttp` removal)
- Updated model from `gemini-1.5-flash` to `gemini-2.0-flash` (available model)

## OUTCOME

- ✅ **Impact**: Fully functional RAG chatbot using OpenAI Agents SDK with Gemini and Qdrant
- 🧪 **Tests**:
  - Ingestion: 138 chunks successfully indexed
  - API test: Chat endpoint returns contextual answers
  - Integration: Frontend-backend communication verified
- 📁 **Files**:
  - Backend: `main.py`, `models.py`, `ingest.py`, `utils/`, `README.md`
  - Frontend: `src/components/Chatbot/index.tsx`
- 🔁 **Next steps**: Deploy to production, add authentication, implement conversation memory
- 🧠 **Reflection**: The RAG pipeline is working correctly with proper context retrieval from documentation, Agents SDK integration for hackathon compliance, and clean, maintainable code structure.

## EVALUATION NOTES

- **Failure modes observed**: Initial dependency conflicts, async/await issues, model availability
- **Fixes applied**:
  - Upgraded openai library
  - Removed conflicting httpx-aiohttp
  - Converted endpoints to async
  - Updated to available Gemini model
- **Graders run and results**: PASS (API functional, RAG context retrieval working, proper answers generated)
- **Architecture decision**: Used OpenAI Agents SDK as required for hackathon, maintaining compatibility with Gemini through OpenAI compatibility layer
