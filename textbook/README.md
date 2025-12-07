# Physical AI & Humanoid Robotics Textbook

Interactive Docusaurus-based textbook with an AI chatbot powered by RAG (Retrieval-Augmented Generation).

## Features

### 📖 Interactive Textbook

- Built with [Docusaurus](https://docusaurus.io/)
- Progressive course structure: Foundations → Simulation → Intelligence → Integration
- Topics: ROS 2, Gazebo, NVIDIA Isaac Sim, VLA, Humanoid Robotics

### 🤖 AI Chatbot Assistant

- **Agentic RAG**: AI autonomously searches the textbook using function tools
- **Smart Markdown Rendering**: Formatted responses with headings, lists, code blocks
- **Text Selection**: Highlight text and ask questions about it
- **User Personalization**: Tailored explanations based on your background
- **Size Options**: Small, Medium, Large chat window

### ✨ User Authentication

- Better Auth integration
- User profiles with software/hardware background
- Personalized AI responses

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without restart.

## Build

```bash
npm run build
```

Generates static content into the `build` directory for deployment.

## Project Structure

```
textbook/
├── docs/                   # Textbook content (MDX files)
│   ├── intro.md
│   ├── modules/           # Course modules
│   ├── labs/              # Hands-on exercises
│   └── hardware/          # Hardware guides
├── src/
│   ├── components/
│   │   └── Chatbot/       # AI chatbot component
│   │       ├── index.tsx  # Main chatbot logic
│   │       └── styles.module.css
│   ├── theme/             # Docusaurus theme customizations
│   └── pages/             # Custom pages
├── static/                # Static assets
├── docusaurus.config.ts   # Docusaurus configuration
└── sidebars.ts            # Sidebar structure
```

## Chatbot Setup

The chatbot requires the backend API to be running.

### Backend Prerequisites

1. Navigate to `../backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Configure `.env` with API keys
4. Run ingestion: `python ingest.py`
5. Start server: `uvicorn main:app --reload`

### Install Chatbot Dependencies

```bash
npm install react-markdown remark-gfm
```

### Environment Variables

Update `docusaurus.config.ts`:

```typescript
customFields: {
  apiUrl: process.env.NODE_ENV === "production"
    ? "https://your-production-api.com"
    : "http://localhost:8000";
}
```

## Chatbot Features

### Markdown Rendering

AI responses are formatted with:

- **Bold text** for emphasis
- Headings (##, ###) for structure
- Bullet points and numbered lists
- Code blocks with syntax highlighting
- Proper line breaks and spacing

### Text Selection

1. Highlight any text in the textbook
2. The chatbot detects it automatically
3. Ask questions about the selected passage
4. AI uses the highlighted text as context

### Personalization

- Visit your profile (avatar → Profile)
- Add software background (e.g., "Python, C++")
- Add hardware background (e.g., "Arduino, Raspberry Pi")
- AI tailors analogies and explanations to your experience level

### Window Sizing

Click S, M, or L in the chat header to resize the window.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### GitHub Pages

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

### Other Platforms

Build the static site and upload the `build/` directory to any static hosting service.

## Development

### Adding Content

1. Create `.md` or `.mdx` files in `docs/`
2. Update `sidebars.ts` if needed
3. Run `python ../backend/ingest.py` to index new content
4. Restart dev server

### Customizing Theme

Edit files in `src/theme/` to override Docusaurus defaults.

### Chatbot Styling

Modify `src/components/Chatbot/styles.module.css`.

## Troubleshooting

### Chatbot Not Appearing

- Check backend is running at `http://localhost:8000`
- Verify `apiUrl` in `docusaurus.config.ts`
- Check browser console for errors

### Markdown Not Rendering

- Ensure `react-markdown` and `remark-gfm` are installed
- Check `src/components/Chatbot/index.tsx` for ReactMarkdown component

### Build Errors

- Clear cache: `rm -rf .docusaurus build`
- Reinstall: `rm -rf node_modules && npm install`

## Tech Stack

- **Framework**: Docusaurus 3.x
- **UI**: React 19.x
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **Auth**: Better Auth
- **Markdown**: react-markdown + remark-gfm
- **Backend**: FastAPI (see `../backend/README.md`)
