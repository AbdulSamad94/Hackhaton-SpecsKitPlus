<!-- Sync Impact Report:
Version change: 1.2.0 → 1.3.0
List of modified principles: Added 'Seamless Language Switching Experience', 'Urdu Accessibility Priority', 'Efficient Translation Caching', 'Emerald/Teal Design Consistency', 'Persistent Language Preferences', 'TypeScript Strict Mode Quality', 'Comprehensive Translation Testing'.
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ updated
  - .specify/templates/spec-template.md: ✅ updated
  - .specify/templates/tasks-template.md: ✅ updated
  - .claude/commands/sp.constitution.md: ✅ updated
Follow-up TODOs: None
-->

# Physical AI & Humanoid Robotics Textbook Constitution

## Core Principles

### Structured Learning

Each chapter MUST follow a clear structure: explanation → practical example → best practices → hardware/software requirements. This ensures a comprehensive and actionable learning experience.

### Digital + Physical AI Integration

The textbook MUST maintain a clear and consistent structure for integrating digital AI concepts with physical robotics, emphasizing the symbiotic relationship between software and hardware in embodied intelligence.

### Production-Ready Robotics Focus

The content MUST emphasize practical, production-ready robotics knowledge, specifically covering key technologies such as ROS 2, Gazebo, Isaac Sim, VLA, and Jetson kits. Abstract or purely theoretical discussions should be minimized in favor of applied knowledge.

### Concise Content

The textbook MUST remove unnecessary "fluff" and avoid overly abstract AI-only discussions. The focus is on direct applicability to physical AI and robotics, ensuring every section adds tangible value to the reader's understanding and skill development.

### Consistency in Presentation

The textbook MUST maintain consistent formatting, diagrams, tables, and sample code throughout. This ensures a professional and easily digestible reading experience, reducing cognitive load for the reader.

### Accessibility with Depth

Chapters MUST be accessible for students with varying levels of prior knowledge while still covering advanced robotics and AI concepts with sufficient depth. The goal is to provide a comprehensive learning path for both beginners and those with some experience.

### Weekly Breakdown Alignment

The textbook MUST provide a weekly breakdown of content that aligns with a typical 13-week course syllabus. This helps instructors and students structure their learning over a standard academic term.

### Hardware, Lab, and Cloud Recommendations

The textbook MUST include practical hardware recommendations, detailed lab setup guidelines, and viable cloud alternatives for implementing and experimenting with physical AI and robotics concepts.

### Embodied Intelligence Focus

The textbook MUST focus on embodied intelligence, specifically bridging digital AI theories and practices to physical robot implementations. This principle guides the selection and presentation of all topics, ensuring a strong connection to real-world robotics.

### Secure Authentication & Personalization

Users MUST be authenticated via Better-Auth (Neon DB) to access personalized features. Personalization data (software/hardware background) MUST be captured during signup to enable tailored experiences.

### Seamless Language Switching Experience

The language toggle feature MUST provide seamless language switching without page reload, ensuring users can switch between Urdu and English without losing their place or context in the textbook.

### Urdu Accessibility Priority

The textbook MUST default to Urdu language for the primary Urdu-speaking audience, with all content fully accessible and properly formatted in Urdu to ensure maximum accessibility for the target demographic.

### Efficient Translation Caching

Translation functionality MUST implement efficient caching mechanisms to minimize API calls and reduce load times, ensuring optimal performance when switching between languages.

### Emerald/Teal Design Consistency

The language toggle UI MUST maintain consistency with the existing emerald/teal color scheme to match the overall design aesthetic of the textbook platform.

### Persistent Language Preferences

Language preferences MUST be saved across sessions using localStorage, ensuring users' language choice persists when they return to the textbook without requiring re-authentication.

### TypeScript Strict Mode Quality

All translation-related code MUST adhere to TypeScript strict mode and React best practices, ensuring type safety, maintainability, and code quality standards.

### Comprehensive Translation Testing

The translation feature MUST be manually verified on all pages to ensure proper functionality, content display, and UI consistency across the entire textbook platform.

## Key Standards

### Chapter Structure Adherence

All content MUST strictly align with the "Structured Learning" principle for chapters, ensuring each section contributes to a practical understanding of the topic.

### Testable Examples

All practical examples and code provided MUST be testable and runnable, demonstrating concepts effectively on specified target hardware or within simulation environments.

### Standard Robotics Development Practices

The textbook MUST promote and utilize standard practices for robotics development environments, including but not limited to ROS 2 package structure and Gazebo model integration.

### Secure Configuration Practices

The textbook MUST avoid hardcoding sensitive information. Instead, it MUST recommend and demonstrate secure configuration practices for both hardware and software setups in robotics.

### Translation Quality Standards

All translated content MUST maintain the same educational quality and accuracy as the original content, ensuring that learning objectives are preserved across languages.

## Constraints

### Academic and Industry Relevance

The textbook content MUST be reviewable and usable within standard academic curricula and relevant industry contexts, ensuring its practical value and educational rigor.

### Accessible Platforms

The initial focus MUST be on commonly available and accessible hardware/software platforms (e.g., Jetson kits, free tiers of simulation platforms) to maximize student reach and practical implementation.

### Logical Progression in Weekly Breakdown

Each weekly breakdown MUST logically progress in complexity and topic coverage over the 13 weeks, building foundational knowledge before introducing advanced concepts.

### Translation Performance Requirements

Language switching MUST maintain acceptable performance standards, with no significant delays or jank during the switching process that would detract from the learning experience.

## Success Criteria

### Consistent Chapter Structure

Each chapter consistently adheres to the `explanation → practical example → best practices → hardware/software requirements` structure.

### Clear Digital + Physical AI Integration

Content clearly demonstrates the seamless integration of digital AI with physical robotics.

### Comprehensive Technology Coverage

Specific technologies (ROS 2, Gazebo, Isaac Sim, VLA, Jetson kits) are adequately covered with practical examples and relevant details.

### Concise and Relevant Content

The textbook is free of superfluous academic jargon and maintains a clear focus on practical application in robotics.

### Uniform Presentation

The formatting, diagrams, tables, and code samples are uniform, easy to understand, and visually appealing throughout the textbook.

### Broad Accessibility with Advanced Depth

The material is comprehensible for students with diverse backgrounds, while advanced robotics and AI concepts are thoroughly explored.

### Actionable 13-Week Syllabus

The 13-week syllabus breakdown provides a clear, actionable, and well-paced learning path.

### Practical Hardware and Lab Guidance

Hardware, lab, and cloud recommendations are practical, actionable, and enhance the hands-on learning experience.

### Strong Embodied Intelligence Focus

The content effectively conveys the principles and applications of embodied intelligence, bridging theory to physical reality.

### Seamless Translation Experience

Language switching occurs without page reloads and maintains user context throughout the process.

### Proper Urdu Support

Urdu content displays correctly with appropriate font support and right-to-left text handling where required.

### Efficient Caching Implementation

Translation caching reduces redundant API calls and improves performance metrics.

### Consistent UI Design

The language toggle maintains visual consistency with the emerald/teal design theme.

### Persistent User Preferences

Language preferences persist across browser sessions using localStorage.

### Code Quality Standards

All translation code adheres to TypeScript strict mode and React best practices.

### Verified Functionality

The translation feature works correctly across all textbook pages as manually verified.

## Governance

This constitution outlines the core principles and standards for the "Physical AI & Humanoid Robotics Textbook" project. Amendments require approval by the project lead. All work must comply with these guidelines.

**Version**: 1.3.0 | **Ratified**: 2025-12-03 | **Last Amended**: 2025-12-10
