# Modern Next.js Application

A feature-rich web application built with Next.js 15, React 19, and TypeScript, offering a modern development experience with robust tooling and optimizations.

## ✨ Key Features

- **Modern Stack**: Next.js 15 with React 19 and TypeScript
- **Performance Optimized**:
  - Turbopack for faster development builds
  - Standalone output for optimized deployments
- **Internationalization**: Built-in i18n support with next-intl
- **Styling Solutions**:
  - Tailwind CSS for utility-first styling
  - SASS support for custom styling
  - Semantic color system
- **Dark Mode**: Built-in dark mode support
- **Developer Experience**:
  - TypeScript with strict type checking
  - ESLint and Prettier integration
  - Husky for Git hooks
  - Commitizen for standardized commit messages
- **Testing Suite**:
  - Jest for unit testing
  - React Testing Library for component testing
  - Playwright for end-to-end testing
- **Docker Support**: Multi-stage builds for production deployment

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

### Development

Start the development server with Turbopack:

```bash
pnpm dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest in watch mode
- `pnpm check-types` - Run TypeScript type checking
- `pnpm prepare-commit-msg` - Interactive commit message prompt

## 🐳 Docker Deployment

### Production Build

1. Build the optimized Docker image:

```bash
docker build -t manager-app .
```

2. Run the container:

```bash
docker run -p 3000:3000 manager-app
```

## 🔧 Project Structure

```
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable React components
│   ├── assets/      # SCSS and static assets
│   └── ...
├── public/          # Static files
├── e2e/             # End-to-end tests
└── ...
```

## 📦 Main Dependencies

- **Framework**: Next.js 15.1.2
- **UI**: React 19.0.0
- **Styling**:
  - Tailwind CSS 3.4
  - SASS 1.83.0
- **Testing**:
  - Jest 29.7.0
  - Playwright 1.49.1
- **Development Tools**:
  - TypeScript 5.7.2
  - ESLint 9.17.0
  - Prettier 3.4.2

## 🔄 Updating Dependencies

Update all dependencies:

```bash
pnpm update
```

Update a specific package:

```bash
pnpm update <package-name>
```

## 🤝 Contributing

1. Ensure you have the correct Node.js and pnpm versions
2. Fork and clone the repository
3. Install dependencies with `pnpm install`
4. Create a feature branch
5. Make your changes
6. Run tests with `pnpm test`
7. Commit using `pnpm prepare-commit-msg`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
