---[]
id: 3
title: Update Translation Principles
stage: constitution
date: 2025-12-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-translation-toggle
user: user
command: /sp.constitution
labels: [constitution,translation,principles]
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

 Create principles for the Docusaurus textbook translation feature focused on:
- User experience: seamless language switching without page reload
- Accessibility: Urdu as default language for primary Urdu-speaking audience
- Performance: efficient translation caching to minimize API calls
- Consistency: emerald/teal color scheme matching existing design
- Data persistence: language preference saved across sessions using localStorage
- Code quality: TypeScript strict mode, React best practices
- Testing: manual verification on all pages

## Response snapshot

The constitution file was successfully updated with new translation-specific principles while preserving existing ones. The following new principles were added:

1. Seamless Language Switching Experience - ensuring language toggle works without page reload
2. Urdu Accessibility Priority - defaulting to Urdu for the primary audience
3. Efficient Translation Caching - implementing caching to minimize API calls
4. Emerald/Teal Design Consistency - maintaining visual consistency with existing design
5. Persistent Language Preferences - saving preferences using localStorage
6. TypeScript Strict Mode Quality - maintaining code quality standards
7. Comprehensive Translation Testing - ensuring functionality across all pages

The version was updated from 1.2.0 to 1.3.0, and the Sync Impact Report was properly updated.

## Outcome

- ✅ Impact: New translation principles added to constitution
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md updated
- 🔁 Next prompts: none
- 🧠 Reflection: Successfully integrated translation-specific principles while maintaining existing constitution structure

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): not applicable
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): not applicable