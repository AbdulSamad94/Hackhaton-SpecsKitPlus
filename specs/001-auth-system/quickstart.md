# Quickstart: Authentication System

## Prerequisites

- Node.js 18+ installed
- Neon DB account and database created
- Google and/or GitHub OAuth app credentials (if using social login)

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Neon Database
DATABASE_URL="your_neon_db_connection_string"

# Better-Auth Configuration
AUTH_SECRET="your_auth_secret_here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

## Database Setup

1. Install Drizzle Kit for migrations:
```bash
npm install -D drizzle-kit
```

2. Generate and apply the initial migration:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

## Installation

1. Install required dependencies:
```bash
npm install better-auth @better-auth/node neon-serverless @neondatabase/serverless drizzle-orm
```

2. Create the auth configuration files in `lib/`:
   - `lib/auth.ts` - Server-side auth configuration
   - `lib/auth-client.ts` - Client-side auth utilities

## Next.js API Routes Setup

1. Create the auth API route at `app/api/auth/[...all]/route.ts`:
```ts
import { auth } from '@/lib/auth'
export const { GET, POST } = auth
```

## Next.js Pages Setup

1. Create login page at `app/login/page.tsx`
2. Create signup page at `app/signup/page.tsx`
3. Both pages should use the auth client utilities

## Docusaurus Integration

1. Create the AuthBar component at `textbook/src/components/AuthBar.tsx`
2. This component should read session from Next.js cookies and display appropriate UI
3. Add the component to the Docusaurus navbar

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Access the application at `http://localhost:3000`
3. Navigate to `/login` or `/signup` to test authentication

## Testing Authentication

1. Visit `/signup` to create a new account
2. Use the multi-step form to provide background information
3. Verify that your session is maintained across page navigation
4. Test social login with Google/GitHub if configured
5. Check that the AuthBar displays correctly in Docusaurus