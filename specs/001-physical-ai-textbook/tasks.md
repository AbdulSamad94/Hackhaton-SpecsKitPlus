---
description: "Task list template for feature implementation"
---

# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/001-physical-ai-textbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: /src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Update Docusaurus for Markdown/MDX content in `docusaurus.config.js` to support Physical AI & Humanoid Robotics Textbook.
- [ ] T002 Update initial Docusaurus configuration for the textbook in `docusaurus.config.js`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Create `docs/` directory.
- [ ] T004 Create `docs/intro.md`.
- [ ] T005 Create `docs/modules/` directory.
- [ ] T006 Create `docs/sensors/` directory.
- [ ] T007 Create `docs/labs/` directory.
- [ ] T008 Create `docs/hardware/` directory.
- [ ] T009 Create `docs/capstone/` directory.
- [ ] T010 Create `docs/_shared/` directory.
- [ ] T011 Create `docs/_shared/diagrams/` directory.
- [ ] T012 Create `docs/_shared/code-snippets/` directory.
- [ ] T013 Create `docs/_shared/urdf-files/` directory.
- [ ] T014 Create `static/img/` directory.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Comprehensive Learning Path (Priority: P1) 🎯 MVP

**Goal**: As a student or professional learner, I want a structured textbook that guides me from an introduction to advanced concepts in Physical AI and Humanoid Robotics, including practical examples, best practices, and relevant hardware/software requirements for each chapter, so that I can gain production-ready knowledge.

**Independent Test**: Can be fully tested by reviewing chapter outlines and content samples to ensure adherence to the structured learning path and inclusion of all required elements (explanation, practical example, best practices, hardware/software requirements).

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create Module 1 (ROS 2) directory in `docs/modules/module1-ros2/`.
- [ ] T016 [P] [US1] Create Module 2 (Gazebo & Unity) directory in `docs/modules/module2-gazebo-unity/`.
- [ ] T017 [P] [US1] Create Module 3 (NVIDIA Isaac) directory in `docs/modules/module3-nvidia-isaac/`.
- [ ] T018 [P] [US1] Create Module 4 (VLA) directory in `docs/modules/module4-vla/`.
- [ ] T019 [US1] Create initial chapter file `docs/modules/module1-ros2/chapter1.mdx`.
- [ ] T020 [US1] Create initial chapter file `docs/modules/module2-gazebo-unity/chapter1.mdx`.
- [ ] T021 [US1] Create initial chapter file `docs/modules/module3-nvidia-isaac/chapter1.mdx`.
- [ ] T022 [US1] Create initial chapter file `docs/modules/module4-vla/chapter1.mdx`.
- [ ] T023 [US1] Create initial sensor chapter file `docs/sensors/lidar.mdx`.
- [ ] T024 [US1] Create initial sensor chapter file `docs/sensors/imu.mdx`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Hands-on Skill Development (Priority: P1)

**Goal**: As a learner, I want the textbook to provide detailed labs, exercises, code examples (Python + ROS 2), URDF files, and simulation snippets, along with guidance for hardware setup and cloud/on-premise labs, so that I can develop practical skills in building and programming physical robots.

**Independent Test**: Can be fully tested by attempting to set up a lab environment (physical or simulated) and successfully running provided code examples and exercises, demonstrating practical skill development.

### Implementation for User Story 2

- [ ] T025 [US2] Create a placeholder lab file `docs/labs/week1-exercise1.mdx`.
- [ ] T026 [US2] Create a placeholder hardware guide `docs/hardware/workstations.mdx`.
- [ ] T027 [US2] Create a placeholder code snippet `docs/_shared/code-snippets/example.py`.
- [ ] T028 [US2] Create a placeholder URDF file `docs/_shared/urdf-files/robot.urdf`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Capstone Project Implementation (Priority: P2)

**Goal**: As an advanced learner, I want the textbook to include a comprehensive capstone project that involves building an autonomous humanoid with conversational AI, providing a challenging and integrative application of the learned concepts, so that I can demonstrate mastery of Physical AI and Humanoid Robotics.

**Independent Test**: Can be fully tested by providing the necessary resources (code, diagrams, instructions) for the capstone project, allowing a learner to independently attempt to implement and demonstrate the autonomous humanoid with conversational AI.

### Implementation for User Story 3

- [ ] T029 [US3] Create a capstone project overview file `docs/capstone/project-overview.mdx`.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T030 Review all content for consistent formatting and presentation across all `docs/` files.
- [ ] T031 Verify all code examples (e.g., in `docs/_shared/code-snippets/`) are runnable and produce expected outcomes.
- [ ] T032 Ensure clear warnings and fallback options for hardware setup in `docs/hardware/` files.
- [ ] T033 Specify exact software versions and provide guidance for managing discrepancies in `docs/`.
- [ ] T034 Offer distinct guidance for cloud-first vs. on-premise lab setups in `docs/hardware/` files.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):

# Launch all models for User Story 1 together:
Task: "Create Module 1 (ROS 2) directory in docs/modules/module1-ros2/"
Task: "Create Module 2 (Gazebo & Unity) directory in docs/modules/module2-gazebo-unity/"
Task: "Create Module 3 (NVIDIA Isaac) directory in docs/modules/module3-nvidia-isaac/"
Task: "Create Module 4 (VLA) directory in docs/modules/module4-vla/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
