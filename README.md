# TV Show Browser

A Vue 3 application that allows users to browse TV shows using the [TVMaze API](https://www.tvmaze.com/api).

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vite (Build tool)
- Pinia (State management)
- Vue Router (Navigation)
- Bootstrap 5 (UI framework)
- Axios (API client)
- Vitest (Testing)
- ESLint & Prettier (Code quality & formatting)
- Font Awesome (Icons)
- Husky (Git hooks)

## Prerequisites

- Node.js v22.15.1
- npm 11.3.0

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Build for production:
```bash
npm run build
```

5. Type checking:
```bash
npm run type-check
```

6. Linting:
```bash
npm run lint
```

7. Format code:
```bash
npm run format
```

8. Run all checks (type checking and linting):
```bash
npm run check
```

## Project Structure

```
src/
├── components/     # Reusable Vue components
├── views/         # Page components
├── stores/        # Pinia stores
├── api/           # APIs
├── types/         # TypeScript interfaces
├── router/        # Vue Router configuration
└── assets/        # Static assets
```

## Features

- Browse TV shows from TVMaze API
- View detailed information about each show
- Responsive design using Bootstrap
- Type-safe development with TypeScript
- State management with Pinia
- Unit testing with Vitest
- Code quality enforced with ESLint and Prettier
- Git hooks with Husky
- Icon support with Font Awesome

## API

This project uses the [TVMaze API](https://www.tvmaze.com/api) to fetch TV show data. The API is free to use and doesn't require authentication for basic endpoints.

### Known limitations

  - App.vue and the view components currently handle interactions with the store directly. This breaks separation of concerns. Ideally, this logic should be moved into dedicated container components.
  - No pagination is implemented for search results — only the first page is shown. This limits the ranking to the top results of a single API call. A better approach would involve a backend that filters shows by ranking.
  - Some Husky pre-commit checks are implemented locally only. These should be moved to a GitHub Actions pipeline to ensure validation before merging.
  - Accessibility could be improved, especially for navigation arrows in horizontally scrollable rows. E.g. adding a better coverage for keyboard navigation or proper ARIA labels.
  - Contrast and general accessibility checks (e.g. color contrast ratios, focus indicators) are pending a full audit.
  - Images are not yet lazy-loaded or optimized, which may impact performance on slower connections.
  
### Features: New ideas to implement

  - Add “Related shows” section based on genre overlap.
  - Display all episodes grouped by season in the detail page.
  - Add advanced filters.
  - Allow users to switch between light and dark mode.
