# Wedding Website Documentation

## Project Overview

A modern, elegant wedding website built with React, TypeScript, and Vite. Features a romantic design with RSVP functionality, event details, music requests, and gift registry information.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Design System](#design-system)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Performance](#performance)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js 18.16.0 or higher
- npm 9.5.1 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vite-react-website

# Install dependencies
npm install

# Set up the database
npm run db:migrate

# Start development server
npm run dev
```

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure environment variables:
   ```env
   VITE_API_URL=http://localhost:3001
   DATABASE_URL=./database.sqlite
   ```

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
