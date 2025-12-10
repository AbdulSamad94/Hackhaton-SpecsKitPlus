# Quickstart Guide: Translation Toggle for Docusaurus Textbook

**Feature**: Translation Toggle
**Date**: 2025-12-10

## Overview
This guide provides a quick start for implementing and using the language translation toggle feature for the Docusaurus-based Physical AI & Humanoid Robotics textbook.

## Prerequisites
- Node.js 18+ installed
- Docusaurus 2.x project setup
- Google Translate API key (or equivalent translation service)
- TypeScript 5.0+ for type safety

## Installation Steps

### 1. Install Dependencies
```bash
npm install @types/react
# Translation service client (example for Google Translate)
npm install @google-cloud/translate
# Or use a browser-based translation API wrapper
```

### 2. Create Translation Context
Create the main context for managing translation state:
```bash
# This will be created in src/theme/TranslationContext/
mkdir -p src/theme/TranslationContext
```

### 3. Add Language Toggle Component
Create the UI component for the language toggle button:
```bash
# This will be created in src/theme/LanguageToggle/
mkdir -p src/theme/LanguageToggle
```

### 4. Configure Docusaurus
Update `docusaurus.config.js` to include the language toggle in the navbar.

## Key Components

### TranslationContext
- Manages the current language state ('ur' or 'en')
- Handles translation API calls
- Manages caching and persistence
- Provides state to all components

### LanguageToggle Component
- Navbar button showing current language
- Triggers language switching
- Follows emerald/teal design theme
- Updates global language state

### Translation Service
- Handles content translation requests
- Implements caching to minimize API calls
- Preserves code blocks and technical content
- Supports RTL text rendering for Urdu

## Usage

### Default Behavior
- Textbook displays in Urdu by default
- Language preference persists across sessions
- Code blocks remain in English regardless of selected language

### Language Switching
1. Click the language toggle button in the navigation bar
2. Content translates seamlessly without page reload
3. Preference is saved to localStorage
4. Translation persists during navigation

## Configuration

### Environment Variables
```env
GOOGLE_TRANSLATE_API_KEY=your_api_key_here
TRANSLATION_CACHE_TTL=3600  # Cache TTL in seconds
```

### Language Settings
- Default language: Urdu ('ur')
- Supported languages: ['ur', 'en']
- Code preservation: All `<code>`, `<pre>`, and technical elements remain in English