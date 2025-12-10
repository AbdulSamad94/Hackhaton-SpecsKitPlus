---[]
id: 5
title: Create Translation Toggle Plan
stage: plan
date: 2025-12-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: translation-toggle
branch: 001-translation-toggle
user: user
command: /sp.plan
labels: [planning,translation,docusaurus,react]
links:
  spec: specs/001-translation-toggle/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-translation-toggle/plan.md
  - specs/001-translation-toggle/research.md
  - specs/001-translation-toggle/data-model.md
  - specs/001-translation-toggle/quickstart.md
  - specs/001-translation-toggle/contracts/translation-api.yaml
tests:
  - none
---

## Prompt

 The translation feature uses:
FRONTEND ONLY:
- React Context API for global language state management
- Google Translate API (or similar translation service) for content translation
- localStorage for persisting language preference
- Custom Docusaurus navbar item component
- TypeScript for type safety
- CSS Modules for component styling
ARCHITECTURE:
- TranslationContext: Manages language state, handles translation API calls, persists to localStorage
- LanguageToggle component: Navbar button that triggers translation
- Root theme wrapper: Provides context to entire app
- Custom navbar item registration: Integrates toggle into Docusaurus navbar
WORKFLOW:
1. TranslationContext initializes with 'ur' as default, checks localStorage for saved preference
2. On mount, apply translation to page content based on current language
3. LanguageToggle button in navbar shows current language ("اردو" or "English")
4. On click, toggle language state, trigger translation, save to localStorage
5. Translation applies to all text content except code blocks
NO backend integration required - this is a pure frontend feature
NO additional libraries beyond what's needed for translation API

## Response snapshot

Successfully created a comprehensive implementation plan for the translation toggle feature. The plan includes:

- Technical Context: TypeScript, React Context API, Google Translate API, localStorage
- Constitution Check: All principles satisfied (seamless switching, Urdu default, caching, design consistency, etc.)
- Project Structure: Docusaurus theme components with TranslationContext and LanguageToggle
- Research: Translation implementation approach, API selection, content strategy, RTL support
- Data Model: LanguagePreference, TranslationCacheEntry, and TranslationRequest entities
- Contracts: API contracts for translation service and local storage contracts
- Quickstart: Installation steps and usage guidelines

The implementation follows all constitution principles and provides a seamless language switching experience with proper caching and RTL support.

## Outcome

- ✅ Impact: Complete implementation plan created for translation toggle feature
- 🧪 Tests: none
- 📁 Files: specs/001-translation-toggle/plan.md, research.md, data-model.md, quickstart.md, contracts/translation-api.yaml
- 🔁 Next prompts: /sp.tasks to generate implementation tasks
- 🧠 Reflection: Plan comprehensively addresses all requirements with proper architecture and constitution compliance

## Evaluation notes (flywheel)

- Failure modes observed: Agent context script had issue with multiple spec directories with same prefix
- Graders run and results (PASS/FAIL): not applicable
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): not applicable