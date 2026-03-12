# Science & App Creation Learning Hub

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A learning platform covering two main topics:
  1. **Science** -- articles and lessons on core science topics (biology, chemistry, physics, earth science)
  2. **How to Create Apps** -- beginner-friendly guides on app development concepts (planning, design, coding basics, deploying)
- Home page with topic cards linking to each category
- Topic listing page showing lessons/articles per category
- Lesson detail page showing content for a single lesson
- A "Bookmark" feature so users can save lessons they want to revisit
- Search bar to filter lessons by keyword

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Store categories, lessons (title, description, content, category), and bookmarks per user
2. Backend: Expose query methods for listing categories, listing lessons by category, getting a single lesson, searching lessons
3. Backend: Expose update methods for adding/removing bookmarks, getting bookmarks for a user
4. Frontend: Home page with hero section and two category cards (Science, App Creation)
5. Frontend: Category page listing lesson cards with title, short description, and a bookmark toggle
6. Frontend: Lesson detail page with full content rendered nicely
7. Frontend: Search bar on lessons page
8. Frontend: Bookmarks page showing saved lessons
9. Seed a set of sample lessons for both categories
