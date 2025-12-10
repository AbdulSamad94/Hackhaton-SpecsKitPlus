# Data Model: Translation Toggle for Docusaurus Textbook

**Feature**: Translation Toggle
**Date**: 2025-12-10

## Entities

### LanguagePreference
**Description**: Represents the user's selected language preference

**Attributes**:
- `languageCode`: string (required) - The language code ('ur' for Urdu, 'en' for English)
- `timestamp`: Date (required) - When the preference was last updated
- `userId`: string (optional) - Associated with user account if authenticated

**Validation Rules**:
- `languageCode` must be one of ['ur', 'en']
- `timestamp` must be a valid date
- `userId` must follow standard user ID format if provided

### TranslationCacheEntry
**Description**: Represents a cached translation for specific content

**Attributes**:
- `contentId`: string (required) - Unique identifier for the content being translated
- `sourceLanguage`: string (required) - The source language code
- `targetLanguage`: string (required) - The target language code
- `originalContent`: string (required) - The original content text
- `translatedContent`: string (required) - The translated content text
- `createdAt`: Date (required) - When the translation was cached
- `expiresAt`: Date (required) - When the cache entry expires

**Validation Rules**:
- `contentId` must be unique within the cache
- `sourceLanguage` and `targetLanguage` must be valid language codes
- `expiresAt` must be after `createdAt`
- Content fields must not be empty

### TranslationRequest
**Description**: Represents a request for content translation

**Attributes**:
- `sourceLanguage`: string (required) - The source language code
- `targetLanguage`: string (required) - The target language code
- `content`: string (required) - The content to be translated
- `priority`: string (optional) - Priority level (default: 'normal')

**Validation Rules**:
- `sourceLanguage` and `targetLanguage` must be valid language codes
- `sourceLanguage` and `targetLanguage` must be different
- `content` must not be empty
- `priority` must be one of ['low', 'normal', 'high']

## State Transitions

### LanguageState
**Initial State**: 'ur' (Urdu)
**Transitions**:
- 'ur' → 'en' when user toggles from Urdu to English
- 'en' → 'ur' when user toggles from English to Urdu
**Triggers**: User clicks language toggle button

### TranslationStatus
**States**: 'idle' | 'loading' | 'success' | 'error'
**Transitions**:
- 'idle' → 'loading' when translation request is initiated
- 'loading' → 'success' when translation completes successfully
- 'loading' → 'error' when translation fails
- 'error' → 'loading' when retry is attempted
- Any state → 'idle' when component unmounts or language changes

## Relationships

- **LanguagePreference** has many **TranslationCacheEntry** (one preference can have multiple cached translations)
- **TranslationRequest** produces **TranslationCacheEntry** (requests result in cached entries)