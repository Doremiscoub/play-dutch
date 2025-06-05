
# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for Continuous Integration and Deployment. The pipeline automatically runs on every push to `main` or `develop` branches, and on all pull requests to `main`.

## Pipeline Steps

### 1. Environment Setup
- **Checkout**: Retrieves the latest code from the repository
- **Node.js Setup**: Installs Node.js v18 (LTS)
- **pnpm Setup**: Configures pnpm package manager v8
- **Dependencies**: Installs all project dependencies via `pnpm install`

### 2. Database Migration
- **Supabase CLI**: Sets up the latest Supabase CLI
- **Schema Migration**: Applies database migrations with `supabase db push --schema-only`
- **Environment**: Uses configured secrets for project authentication

### 3. Code Quality & Testing
- **Linting**: Runs ESLint and TypeScript checks via `pnpm lint`
- **Testing**: Executes all unit and integration tests with coverage via `pnpm test --coverage`
- **Coverage**: Generates detailed coverage reports for code quality metrics

### 4. Build & Artifacts
- **Application Build**: Creates production build via `pnpm build`
- **Artifact Upload**: Saves coverage reports, build files, and bundle analysis
- **Bundle Analysis**: Generates visualization of bundle size and dependencies

## Required Secrets

Configure these secrets in GitHub repository settings:

```
SUPABASE_PROJECT_REF=your-project-reference
SUPABASE_ACCESS_TOKEN=your-access-token
```

### Setting up Secrets
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each required secret with appropriate values

## Triggers

- **Push Events**: Automatically runs on pushes to `main` and `develop` branches
- **Pull Requests**: Runs on all PRs targeting the `main` branch
- **Manual Trigger**: Can be triggered manually from GitHub Actions tab

## Artifacts Generated

### Coverage Report
- **Path**: `coverage/`
- **Contents**: HTML coverage report, LCOV data, JSON summary
- **Retention**: 30 days

### Build Artifacts
- **Path**: `dist/`
- **Contents**: Production-ready application bundle
- **Usage**: Ready for deployment to any static hosting service

### Bundle Analysis
- **Path**: `stats.html`
- **Contents**: Interactive bundle size visualization
- **Usage**: Performance optimization and dependency analysis

## Pipeline Status

- ✅ **Success**: All steps passed, artifacts uploaded
- ❌ **Failure**: Check logs for specific step that failed
- ⚠️ **Warning**: Some non-critical steps may have warnings

## Local Development

To run the same checks locally:

```bash
# Install dependencies
pnpm install

# Run linting
pnpm lint

# Run tests with coverage
pnpm test --coverage

# Build application
pnpm build
```

## Troubleshooting

### Common Issues

1. **Migration Failures**
   - Verify Supabase secrets are correctly configured
   - Check migration files for syntax errors
   - Ensure project reference is valid

2. **Test Failures**
   - Review test logs in GitHub Actions
   - Run tests locally to reproduce issues
   - Check for environment-specific test dependencies

3. **Build Errors**
   - Verify all dependencies are properly installed
   - Check for TypeScript compilation errors
   - Review build logs for specific error messages

### Getting Help

- Check the Actions tab for detailed logs
- Review this documentation for configuration details
- Consult project README for development setup
