# Next.js Application

A modern web application built with Next.js 15, React 19, and TypeScript.

## Requirements

- Node.js >= 20
- pnpm >= 9

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
pnpm install
```

## Development

Run the development server with Turbopack enabled:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building and Running for Production

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Docker Deployment

This project includes Docker support with multi-stage builds for optimal production deployment.

1. Build the Docker image:

```bash
docker build -t manager-app .
```

2. Run the container:

```bash
docker run -p 3000:3000 manager-app
```

The application is configured for standalone output, optimizing it for containerized deployments.

## Updating Dependencies

Update all dependencies to their latest versions:

```bash
pnpm update
```

Update a specific package:

```bash
pnpm update <package-name>
```

## Project Configuration

- TypeScript support with strict type checking
- ESLint for code quality
- Tailwind CSS for styling
- Turbopack for faster development builds
- Standalone output configuration for optimized deployments

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks

## Environment Variables

Create a `.env.local` file in the root directory for local development:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=your_api_url
```

## Deployment Options

1. **Docker (Recommended)**

   - Uses multi-stage builds for minimal image size
   - Includes security best practices
   - Configured for production optimization

2. **Traditional Deployment**

   - Build the application using `pnpm build`
   - Start the server using `pnpm start`
   - Ensure Node.js 20 or higher is installed on the server
