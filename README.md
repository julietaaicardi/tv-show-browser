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

### Future code improvements

  - Implement a Node.js backend to handle TVmaze API calls and caching
  - Add proper error handling and retry mechanisms for API calls
  - Implement state management (Pinia/Vuex) for better data flow
  - Add unit and integration tests using Vitest
  - Implement proper TypeScript types for API responses
  - Add proper loading states and error boundaries
  - Implement proper SEO meta tags and sitemap
  - Add proper image optimization and lazy loading
  - Implement proper caching strategies for API responses

### Features: New ideas to implement

  - Add a related shows section based on matching genres in show detail page
  - Implement episode list with season grouping in show detail page
  - Add user watchlist functionality with local storage
  - Implement show recommendations based on user's watch history
  - Add advanced filters (by network, status, language)
  - Implement show comparison feature
  - Add cast and crew information with their other works
  - Implement show schedule/calendar view
  - Add social sharing functionality
  - Implement dark/light theme toggle
