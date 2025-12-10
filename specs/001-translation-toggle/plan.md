# Implementation Plan: Translation Toggle for Docusaurus Textbook

**Branch**: `001-translation-toggle` | **Date**: 2025-12-10 | **Spec**: specs/001-translation-toggle/spec.md
**Input**: Feature specification from `/specs/001-translation-toggle/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a language translation toggle feature for the Docusaurus-based Physical AI & Humanoid Robotics textbook. The feature provides a navbar button allowing users to switch between Urdu (default) and English content with seamless page transitions. The solution uses React Context API for state management, Google Translate API for content translation, and localStorage for preference persistence, all while maintaining the emerald/teal design theme and ensuring code blocks remain in English.

## Technical Context

**Language/Version**: TypeScript 5.0+ for type safety and React best practices
**Primary Dependencies**: React Context API, Google Translate API, Docusaurus framework, CSS Modules
**Storage**: localStorage for persisting language preferences across sessions
**Testing**: Manual verification across all textbook pages (as per constitution requirement)
**Target Platform**: Web application (Docusaurus-based textbook)
**Project Type**: Web (frontend only implementation)
**Performance Goals**: Language switching within 500ms, efficient caching to minimize API calls
**Constraints**: Must integrate with existing Docusaurus theme, maintain emerald/teal design, preserve code blocks in English
**Scale/Scope**: Single textbook with multiple pages requiring translation support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] The implementation MUST provide seamless language switching without page reload (complies with "Seamless Language Switching Experience" principle)
- [x] The textbook MUST default to Urdu language for the primary Urdu-speaking audience (complies with "Urdu Accessibility Priority" principle)
- [x] Translation functionality MUST implement efficient caching mechanisms to minimize API calls (complies with "Efficient Translation Caching" principle)
- [x] The language toggle UI MUST maintain consistency with the existing emerald/teal color scheme (complies with "Emerald/Teal Design Consistency" principle)
- [x] Language preferences MUST be saved across sessions using localStorage (complies with "Persistent Language Preferences" principle)
- [x] All translation-related code MUST adhere to TypeScript strict mode and React best practices (complies with "TypeScript Strict Mode Quality" principle)
- [x] The translation feature MUST be manually verified on all pages (complies with "Comprehensive Translation Testing" principle)
- [x] All translated content MUST maintain the same educational quality and accuracy as the original content (complies with "Translation Quality Standards")
- [x] Language switching MUST maintain acceptable performance standards with no significant delays (complies with "Translation Performance Requirements")

## Project Structure

### Documentation (this feature)

```text
specs/001-translation-toggle/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── theme/
│   ├── TranslationContext/
│   │   ├── TranslationContext.tsx      # Manages language state and translation API calls
│   │   └── types.ts                    # TypeScript types for translation
│   ├── LanguageToggle/
│   │   ├── LanguageToggle.tsx          # Navbar button component
│   │   ├── LanguageToggle.module.css   # Component styling with emerald/teal theme
│   │   └── index.ts                    # Export component
│   └── Root/
│       └── Root.tsx                    # Root theme wrapper providing context
├── utils/
│   └── translation.ts                  # Translation service and caching utilities
└── types/
    └── translation.d.ts                # Global translation types

docusaurus.config.js                           # Docusaurus configuration for navbar integration
```

**Structure Decision**: Web application structure with Docusaurus theme components for seamless integration into the existing textbook platform. The implementation follows Docusaurus theme customization patterns with React Context for state management and TypeScript for type safety.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [N/A] | [No violations found] | [All constitution principles satisfied] |
