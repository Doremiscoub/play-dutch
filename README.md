
# Dutch - Card Game Score Tracker

A modern, offline-first web application for tracking scores in card games between friends. Built with React, TypeScript, and Supabase.

## 🎯 Features

- **Offline-First**: Works completely offline with automatic sync when online
- **Real-time Scoring**: Live score updates and game state management
- **Player Management**: Add, remove, and customize players with avatars and emojis
- **Game History**: Complete history of all games with detailed statistics
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Progressive Web App**: Installable on mobile devices for native-like experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm package manager
- Supabase CLI (for database operations)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dutch-game
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Apply database migrations**
   ```bash
   supabase db push --project-ref <your-project-ref>
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- **`pnpm dev`** - Start development server with hot reload
- **`pnpm build`** - Create production build
- **`pnpm preview`** - Preview production build locally
- **`pnpm lint`** - Run ESLint for code quality checks
- **`pnpm test`** - Run unit and integration tests
- **`pnpm test --coverage`** - Run tests with coverage report
- **`pnpm type-check`** - Run TypeScript type checking

### Testing

The project includes comprehensive testing coverage:

```bash
# Run all tests
pnpm test

# Run specific test types
pnpm test --grep "unit"          # Unit tests only
pnpm test --grep "integration"   # Integration tests only

# Generate coverage report
pnpm test --coverage
```

### Database Operations

```bash
# Apply all migrations
supabase db push --project-ref <project-ref>

# Generate TypeScript types from database
supabase gen types typescript --project-id <project-id> --schema public > src/integrations/supabase/types.ts

# Reset database (development only)
supabase db reset
```

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Testing**: Vitest, React Testing Library
- **CI/CD**: GitHub Actions

### Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Atomic design system components
│   ├── layout/        # Layout components
│   ├── game/          # Game-specific components
│   └── scoreboard/    # Scoreboard components
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── design/            # Design system tokens
└── __tests__/         # Test files
```

### Key Features

- **Design System**: Comprehensive design tokens and component library
- **Offline Support**: localStorage with Supabase sync
- **Row Level Security**: User data isolation at database level
- **Real-time Updates**: Supabase real-time subscriptions
- **Performance Optimized**: Code splitting and lazy loading

## 🔒 Security

### Authentication
- JWT-based authentication via Supabase Auth
- Automatic token refresh and session management
- Support for email/password and social login

### Data Security
- Row Level Security (RLS) policies on all database tables
- User data isolation - users can only access their own games
- HTTPS enforced for all API communications
- Input validation and sanitization

## 📱 Deployment

### Production Build

```bash
# Create optimized production build
pnpm build

# The build artifacts will be in the `dist/` directory
```

### Environment Variables

Required environment variables for deployment:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Hosting Options

The application can be deployed to any static hosting service:

- **Netlify**: Connect GitHub repository for automatic deployments
- **Vercel**: Zero-configuration deployment with Git integration
- **AWS S3 + CloudFront**: For custom AWS infrastructure
- **GitHub Pages**: For simple static hosting

### CI/CD Pipeline

The project includes automated GitHub Actions workflow:

1. **Code Quality**: Linting and type checking
2. **Testing**: Unit and integration tests with coverage
3. **Database**: Automatic migration application
4. **Build**: Production build generation
5. **Artifacts**: Coverage reports and bundle analysis

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[Design System](docs/DESIGN_SYSTEM.md)** - Design tokens and component usage
- **[CI/CD Pipeline](docs/CI_CD_PIPELINE.md)** - Deployment and automation guide
- **[Supabase RLS Tests](docs/SUPABASE_RLS_TESTS.md)** - Database security testing
- **[Changelog](docs/CHANGELOG.md)** - Project development history

## 🧪 Testing

### Test Coverage

The project maintains high test coverage across all layers:

- **Unit Tests**: >95% coverage for components and utilities
- **Integration Tests**: Complete RLS policy verification
- **E2E Tests**: Critical user workflow validation (planned)

### Running Tests

```bash
# All tests with coverage
pnpm test --coverage

# Specific test files
pnpm test button.test.tsx

# Watch mode for development
pnpm test --watch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode requirements
- Maintain test coverage above 90%
- Use conventional commit messages
- Update documentation for new features
- Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Database and authentication by [Supabase](https://supabase.com)
- Icons provided by [Lucide React](https://lucide.dev)

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: December 2024
