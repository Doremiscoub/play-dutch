
# Dutch Game Architecture

## Overview

Dutch is a client-side web application built with React 18, TypeScript, and Vite, designed to replace traditional paper scorecards for card games between friends. The architecture emphasizes offline-first functionality, progressive enhancement, and maintainable code structure.

## Technology Stack

### Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand (lightweight, hook-based)
- **Routing**: React Router v6

### Database & Backend
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: Supabase Auth (email/password, social login)
- **Real-time**: Supabase Realtime subscriptions
- **File Storage**: Supabase Storage (future feature)

### Testing & Quality
- **Unit Testing**: Vitest + React Testing Library
- **Integration Testing**: Vitest with Supabase integration
- **Type Checking**: TypeScript strict mode
- **Code Quality**: ESLint + Prettier
- **Coverage**: c8 coverage reports

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Atomic design system components
│   ├── layout/         # Layout-specific components
│   ├── game/           # Game-specific components
│   ├── scoreboard/     # Scoreboard-related components
│   └── forms/          # Form components and validation
├── pages/              # Route components (page-level)
├── hooks/              # Custom React hooks
│   ├── persistence/    # Data persistence hooks
│   └── seo/           # SEO-related hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── design/             # Design system tokens and configuration
│   ├── tokens/         # Design tokens (colors, spacing, etc.)
│   └── theme/          # Theme configuration
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── __tests__/          # Test files (unit and integration)
    ├── ui/             # Component tests
    ├── layout/         # Layout component tests
    └── integration/    # Integration tests
```

## Data Architecture

### Local State Management

#### Game State (Zustand)
```typescript
interface GameState {
  players: Player[];
  rounds: Round[];
  currentGame: Game | null;
  gameSettings: GameSettings;
}
```

#### Persistence Strategy
- **Primary**: localStorage for offline-first experience
- **Sync**: Supabase for cross-device synchronization
- **Backup**: IndexedDB for large datasets (future)

### Database Schema

#### Tables
1. **games** - Game metadata and settings
2. **players** - Player information and scores
3. **profiles** - User profile information

#### Row Level Security (RLS)
- Users can only access their own games and players
- Authenticated users required for all operations
- Policies enforce data isolation between users

## Component Architecture

### Design System Hierarchy

```
Pages (Route-level)
└── Layout Components (PageShell, UnifiedPageLayout)
    └── Composite Components (GameBoard, ScoreCard)
        └── UI Components (Button, Card, Input)
            └── Atomic Elements (Icon, Text, Spacer)
```

### Component Patterns

#### Container/Presenter Pattern
```typescript
// Container (logic)
const GamePageContainer = () => {
  const { game, players, addScore } = useGameState();
  return <GamePagePresenter game={game} players={players} onAddScore={addScore} />;
};

// Presenter (UI)
const GamePagePresenter = ({ game, players, onAddScore }) => {
  return <div>{/* Pure UI rendering */}</div>;
};
```

#### Custom Hooks Pattern
```typescript
// Encapsulate complex logic in hooks
const useGameState = () => {
  const [game, setGame] = useState();
  const addPlayer = useCallback(() => {}, []);
  return { game, addPlayer };
};
```

## Data Flow

### Client-Side Flow
1. **User Action** → Component Event Handler
2. **Event Handler** → State Update (Zustand)
3. **State Update** → Component Re-render
4. **Background Sync** → Supabase (when online)

### Offline-First Strategy
1. All actions work offline (localStorage)
2. Queue sync operations when offline
3. Automatic sync when connection restored
4. Conflict resolution for concurrent edits

## Security Architecture

### Authentication Flow
1. User signs in via Supabase Auth
2. JWT token stored in httpOnly cookie
3. Token included in all API requests
4. Automatic token refresh

### Data Security
- Row Level Security (RLS) policies on all tables
- User data isolation at database level
- Client-side validation + server-side enforcement
- HTTPS only for all communications

## Performance Strategy

### Bundle Optimization
- Code splitting by route (`React.lazy()`)
- Dynamic imports for heavy features
- Tree shaking for unused code elimination
- Asset optimization (images, fonts)

### Runtime Performance
- React.memo for expensive components
- useCallback/useMemo for heavy computations
- Virtual scrolling for large lists (future)
- Service Worker for caching

### Loading Strategy
- Critical path first (game functionality)
- Progressive enhancement for advanced features
- Skeleton loading states
- Error boundaries for graceful degradation

## Deployment Architecture

### Build Process
1. TypeScript compilation with strict checks
2. Vite bundling with optimizations
3. Asset processing and compression
4. Source map generation for debugging

### Hosting Strategy
- Static hosting (Netlify, Vercel, or similar)
- CDN distribution for global performance
- Automatic deployments from main branch
- Preview deployments for PRs

### Environment Configuration
- Development: Local Supabase instance
- Staging: Shared staging database
- Production: Production Supabase project

## Monitoring & Analytics

### Error Tracking
- Sentry integration for error reporting
- Custom error boundaries for graceful handling
- User feedback collection for improvement

### Performance Monitoring
- Core Web Vitals tracking
- Bundle size monitoring
- Load time analytics
- User interaction metrics

## Future Architecture Considerations

### Scalability
- Consider micro-frontend architecture for larger teams
- Implement advanced caching strategies
- Add search indexing for game history

### Feature Additions
- Real-time multiplayer functionality
- Push notifications for game invites
- AI-powered game suggestions
- Social features and leaderboards

### Technical Debt
- Regular dependency updates
- Performance audit quarterly
- Accessibility audit semi-annually
- Security audit annually

## Development Workflow

### Code Standards
- TypeScript strict mode enforced
- ESLint + Prettier for consistent formatting
- Conventional commits for clear history
- PR reviews required for main branch

### Testing Strategy
- Unit tests for critical business logic
- Integration tests for user workflows
- E2E tests for critical paths (future)
- Visual regression testing (future)

This architecture provides a solid foundation for the Dutch game application while maintaining flexibility for future enhancements and scale.
