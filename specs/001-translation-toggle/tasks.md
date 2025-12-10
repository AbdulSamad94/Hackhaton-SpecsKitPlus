# Implementation Tasks: Translation Toggle for Docusaurus Textbook

**Feature**: Translation Toggle for Docusaurus Textbook
**Branch**: `001-translation-toggle`
**Created**: 2025-12-10
**Status**: Ready for Implementation

## Implementation Strategy

Implement the translation toggle feature following a phased approach with user stories as the primary organization. Start with the core functionality (US1) to create an MVP, then add persistence (US2) and content translation (US3). Each user story should be independently testable and deliver value on its own.

## Dependencies

- User Story 2 (US2) requires foundational context setup from Phase 2
- User Story 3 (US3) requires the TranslationContext from Phase 2
- All user stories depend on the basic project structure from Phase 1

## Parallel Execution Examples

- T002-T005 can be executed in parallel (different component files)
- T010-T013 can be executed in parallel (different service files)
- T020-T025 can be executed in parallel (different styling and integration tasks)

## Phase 1: Setup

### Goal
Establish the project structure and install necessary dependencies for the translation toggle feature.

- [x] T001 Create project structure per implementation plan in src/theme/TranslationContext/
- [x] T002 Create project structure per implementation plan in src/theme/LanguageToggle/
- [x] T003 Create project structure per implementation plan in src/utils/
- [x] T004 Create project structure per implementation plan in src/types/
- [x] T005 Update docusaurus.config.js to prepare for navbar integration

## Phase 2: Foundational Components

### Goal
Implement the core infrastructure needed for all user stories: translation context, service utilities, and type definitions.

- [x] T006 [P] Create TranslationContext provider in src/theme/TranslationContext/TranslationContext.tsx
- [x] T007 [P] Create translation types in src/theme/TranslationContext/types.ts
- [x] T008 [P] Create translation service utilities in src/utils/translation.ts
- [x] T009 [P] Create global translation types in src/types/translation.d.ts
- [x] T010 [P] Implement language preference persistence in src/utils/translation.ts
- [x] T011 [P] Implement translation caching mechanism in src/utils/translation.ts
- [x] T012 [P] Implement DOM text node parsing for translation in src/utils/translation.ts
- [x] T013 [P] Implement RTL text handling utilities in src/utils/translation.ts

## Phase 3: User Story 1 - Language Toggle in Navigation (Priority: P1)

### Goal
Create a language toggle button in the navigation bar that allows switching between Urdu and English content without page reload.

### Independent Test Criteria
- Toggle button appears in navigation bar
- Button is visually consistent with emerald/teal theme
- Clicking button switches between languages without page reload
- Language state is updated in the UI

- [x] T014 [US1] Create LanguageToggle component in src/theme/LanguageToggle/LanguageToggle.tsx
- [x] T015 [US1] Create LanguageToggle CSS module in src/theme/LanguageToggle/LanguageToggle.module.css
- [x] T016 [US1] Export LanguageToggle component in src/theme/LanguageToggle/index.ts
- [x] T017 [US1] Integrate LanguageToggle with TranslationContext
- [x] T018 [US1] Style LanguageToggle with emerald/teal theme
- [x] T019 [US1] Implement language state display ("اردو" or "English")
- [x] T020 [US1] Add click handler to toggle language state
- [x] T021 [US1] Test language toggle functionality without page reload
- [x] T022 [US1] Verify button appears in navigation bar
- [x] T023 [US1] Verify visual consistency with emerald/teal theme

## Phase 4: User Story 2 - Default Language and Persistence (Priority: P1)

### Goal
Ensure content defaults to Urdu and language preference persists across page navigation and browser sessions.

### Independent Test Criteria
- Urdu content displays by default on first visit
- Language preference maintained when navigating between pages
- Language preference persists across browser sessions
- localStorage properly stores and retrieves language preference

- [x] T024 [US2] Initialize TranslationContext with 'ur' as default language
- [x] T025 [US2] Check localStorage for saved language preference on initialization
- [x] T026 [US2] Save language preference to localStorage when changed
- [x] T027 [US2] Apply default Urdu language on initial load
- [x] T028 [US2] Test default language behavior on first visit
- [x] T029 [US2] Test language persistence during navigation
- [x] T030 [US2] Test language persistence across browser sessions
- [x] T031 [US2] Verify localStorage operations work correctly
- [x] T032 [US2] Test language preference restoration after page refresh

## Phase 5: User Story 3 - Content Translation with Code Preservation (Priority: P2)

### Goal
Translate all page content while preserving code blocks, technical terms, and programming examples in English.

### Independent Test Criteria
- All text content translates between Urdu and English
- Code blocks remain in English regardless of selected language
- Technical diagrams and labels translate appropriately
- Mathematical notation remains unchanged during translation

- [x] T033 [US3] Implement DOM content translation functionality in src/utils/translation.ts
- [x] T034 [US3] Identify and exclude code blocks from translation using CSS selectors
- [x] T035 [US3] Preserve technical elements like formulas and diagrams
- [x] T036 [US3] Implement RTL text rendering for Urdu content
- [x] T037 [US3] Apply proper text alignment for Urdu content
- [x] T038 [US3] Ensure translation quality and accuracy
- [x] T039 [US3] Test translation of text content while preserving code
- [x] T040 [US3] Verify code blocks remain in English during language toggle
- [x] T041 [US3] Test RTL rendering for Urdu text
- [x] T042 [US3] Verify mathematical notation preservation

## Phase 6: Integration and Testing

### Goal
Integrate all components and ensure seamless functionality across the entire textbook.

- [x] T043 Integrate TranslationContext with Docusaurus Root component in src/theme/Root/Root.tsx
- [x] T044 Configure docusaurus.config.js to include LanguageToggle in navbar
- [x] T045 Test seamless language switching without page reload
- [x] T046 Verify compatibility with existing AuthBar and navbar components
- [x] T047 Test performance with translation caching
- [x] T048 Verify all functional requirements from spec are met
- [x] T049 Test manual verification across all textbook pages
- [x] T050 Perform final integration testing