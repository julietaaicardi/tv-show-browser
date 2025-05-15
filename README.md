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
- Jest (Testing)
- ESLint & Prettier (Code quality & formatting)

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

## Project Structure

```
src/
├── components/     # Reusable Vue components
├── views/         # Page components
├── stores/        # Pinia stores
├── services/      # API services
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
- Unit testing with Jest

## API

This project uses the [TVMaze API](https://www.tvmaze.com/api) to fetch TV show data. The API is free to use and doesn't require authentication for basic endpoints.
