# React TypeScript Website

A modern React TypeScript website built with Vite and TailwindCSS.

## Prerequisites

- Node.js (version 18.16.0 or higher)
- npm (version 9.5.1 or higher)

## Getting Started

1. Clean and install dependencies:

```bash
npm run clean # Optional: Use this to clean up node_modules and package-lock.json
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Available Scripts

- `npm run clean` - Removes node_modules directory and package-lock.json file
- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check code quality

## Development

The project uses:

- React with TypeScript for type-safe development
- Vite for fast development and optimized builds
- TailwindCSS for styling
- ESLint for code quality

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── layout/     # Layout components (Header, Footer)
├── assets/        # Static assets
└── App.tsx        # Main application component
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.
