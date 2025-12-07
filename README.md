# Physical AI & Humanoid Robotics - Interactive Learning Platform

A comprehensive e-learning platform combining an interactive Docusaurus textbook with an AI-powered chatbot assistant using Agentic RAG (Retrieval-Augmented Generation). Built for the Physical AI & Humanoid Robotics hackathon.

## 🌟 Features

### Interactive Textbook

- Built with **Docusaurus** for rich, interactive documentation
- Progressive course structure: Foundations → Simulation → Intelligence → Integration
- Topics: ROS 2, Gazebo, NVIDIA Isaac Sim, VLA, Humanoid Robotics
- Markdown-based content with MDX support

### AI Chatbot Assistant

- **Agentic RAG**: AI autonomously searches the textbook using function tools
- **Context-Aware**: Understands user-selected text from the textbook
- **Personalized Responses**: Tailored explanations based on user's background
- **Smart Markdown Rendering**: Formatted responses with headings, lists, and code blocks
- **Resizable Interface**: Small, Medium, or Large chat window options

### User Authentication

- **Better Auth** integration with multiple providers
- GitHub and Google OAuth support
- Email/Password authentication
- User profiles with software/hardware background tracking
- Personalized AI responses based on user expertise

### Database & Persistence

- **PostgreSQL** database via Neon
- **Drizzle ORM** for type-safe database operations
- User session management
- Profile data storage for personalization

## Architecture

This is a **mono-repo** containing three integrated components:

1. **Next.js Application** (Root) - Authentication portal and main app
2. **Docusaurus Textbook** (`/textbook`) - Interactive learning content
3. **FastAPI Backend** (`/backend`) - RAG chatbot API with vector search

```
my-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (auth endpoints)
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── profile/           # User profile page
│   └── onboarding/        # Onboarding flow
├── backend/               # FastAPI RAG chatbot (Python)
│   ├── main.py           # API endpoints
│   ├── ingest.py         # Document ingestion to Qdrant
│   ├── models.py         # Gemini + OpenAI Agents SDK
│   ├── personalization.py # User-aware prompts
│   └── utils/            # Tools, helpers, config
├── textbook/             # Docusaurus documentation
│   ├── docs/             # Course content (MDX)
│   ├── src/              # React components & theme
│   └── docusaurus.config.ts
├── components/           # Shared React components
├── db/                   # Database schema (Drizzle)
├── lib/                  # Utilities & auth config
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Python** 3.10+ (for backend)
- **PostgreSQL** database (Neon recommended)
- **API Keys**:
  - Google Gemini API key
  - Qdrant Cloud credentials
  - GitHub OAuth app credentials
  - Google OAuth app credentials

### 1. Clone and Install

```bash
git clone https://github.com/AbdulSamad94/Hackhaton-SpecsKitPlus.git
cd my-website
npm install
```

### 2. Configure Environment Variables

Create `.env` in the root directory:

```env
# Database
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>

# Authentication
BETTER_AUTH_SECRET=<generate-random-string>
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Development
DOCS_URL=http://127.0.0.1:3001
```

### 3. Set Up Database

```bash
# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit push
```

### 4. Set Up Backend

```bash
cd backend
pip install -r requirements.txt

# Create backend/.env
echo "GEMINI_API_KEY=your_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_key" > .env

# Index the textbook
python ingest.py

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Run Development Servers

In the root directory:

```bash
# Runs both Next.js (port 3000) and Docusaurus (port 3001)
npm run dev
```

Or run individually:

```bash
# Next.js only
npm run dev:root

# Docusaurus only
npm run dev:docs
```

Access the application:

- **Main App**: http://localhost:3000 (redirects to textbook)
- **Textbook**: http://localhost:3001
- **Backend API**: http://localhost:8000

## Build & Deployment

### Build for Production

```bash
# Builds textbook, copies to public/docs, then builds Next.js
npm run build
```

This command:

1. Installs textbook dependencies
2. Builds Docusaurus to `textbook/build`
3. Copies built files to `public/docs`
4. Builds Next.js application

### Deploy

```bash
# Start production server
npm start
```

The app serves:

- Next.js app on root routes
- Docusaurus textbook at `/docs/*`
- Backend should be deployed separately (Vercel, Railway, etc.)

### Environment Variables for Production

Update `.env` with production URLs:

- Set `BETTER_AUTH_URL` to your production domain
- Configure OAuth callbacks in GitHub/Google consoles
- Update `DOCS_URL` if hosting docs separately

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **Lucide React** - Icons
- **Better Auth** - Authentication

### Textbook

- **Docusaurus 3** - Documentation framework
- **React 19** - UI components
- **React Markdown** - Markdown rendering in chatbot
- **CSS Modules** - Component styling

### Backend

- **FastAPI** - Python web framework
- **Google Gemini** - LLM for chatbot
- **OpenAI Agents SDK** - Agentic RAG framework
- **Qdrant** - Vector database for embeddings
- **Python 3.10+** - Runtime

### Database

- **PostgreSQL** - Relational database (via Neon)
- **Drizzle ORM** - Type-safe database toolkit

## Documentation

- **Backend API**: See [`backend/README.md`](./backend/README.md) for detailed RAG implementation
- **Textbook**: See [`textbook/README.md`](./textbook/README.md) for Docusaurus setup and chatbot features

## Development Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Run both Next.js and Docusaurus concurrently |
| `npm run dev:root` | Run Next.js only (port 3000)                 |
| `npm run dev:docs` | Run Docusaurus only (port 3001)              |
| `npm run build`    | Build textbook + Next.js for production      |
| `npm start`        | Start production server                      |
| `npm run lint`     | Run ESLint                                   |

## Troubleshooting

### Authentication Issues

- Verify OAuth credentials in `.env`
- Check callback URLs in GitHub/Google consoles
- Ensure `BETTER_AUTH_URL` matches your domain

### Chatbot Not Working

- Verify backend is running on port 8000
- Check backend `.env` has valid API keys
- Run `python ingest.py` to index textbook content
- Check browser console for CORS errors

### Build Errors

- Clear Next.js cache: `rm -rf .next`
- Clear Docusaurus cache: `rm -rf textbook/.docusaurus textbook/build`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Database Connection Issues

- Verify `DATABASE_URL` format is correct
- Check Neon dashboard for connection details
- Run `npx drizzle-kit push` to sync schema

## License

This project was created for the Physical AI & Humanoid Robotics Hackathon.

## Contributing

Contributions are welcome! Please follow the existing code structure and update documentation accordingly.
