# Contributing to Damu Salama

Thank you for your interest in contributing to Damu Salama! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## Development Setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `pnpm install`
4. Create a `.env.local` file with required environment variables
5. Run the development server: `pnpm dev`

## Pull Request Process

1. Create a new branch from `main`
2. Make your changes with clear, descriptive commits
3. Ensure all tests pass
4. Update documentation if needed
5. Submit a pull request with a clear description

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain responsive design

### Database
- Write migrations for schema changes
- Use parameterized queries to prevent SQL injection
- Add proper indexes for performance

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Questions?

Open an issue or contact the maintainers.
