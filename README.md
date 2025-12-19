# React Demo - Nx Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A modern React monorepo powered by [Nx](https://nx.dev), featuring React 19, TypeScript, Vite, and shared UI components.

## 📦 Project Structure

This workspace contains:

### Applications
- **`apps/react-demo`** - Main React application with Hero component demo
- **`apps/dashboard`** - Dashboard application with stats and activity tracking

### Packages
- **`packages/ui`** - Shared UI component library (Hero component, etc.)
- **`packages/dashboard-components`** - Dashboard-specific reusable components (StatCard, RecentActivity)

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Fast build tool and dev server
- **React Router 6.29** - Client-side routing
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Nx 21.4** - Monorepo management and build system

## 🏁 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

```sh
npm install
```

### Start the Nx Daemon (Recommended)

Enable faster builds and auto-refresh for the project graph:

```sh
npx nx daemon --start
```

## 💻 Common Commands

### Development

```sh
# Start the react-demo app (default port 4200)
npx nx serve react-demo

# Start the dashboard app (default port 4201)
npx nx serve dashboard

# Start dev server on a specific port
npx nx serve react-demo --port 3000

# Run both apps simultaneously (in separate terminals)
npx nx serve react-demo
npx nx serve dashboard
```

### Building

```sh
# Build the react-demo app
npx nx build react-demo

# Build the dashboard app
npx nx build dashboard

# Build the UI library
npx nx build ui

# Build the dashboard-components library
npx nx build dashboard-components

# Build all projects
npx nx run-many -t build
```

### Testing

```sh
# Run tests for react-demo
npx nx test react-demo

# Run tests for ui library
npx nx test ui

# Run all tests in the workspace
npx nx run-many -t test

# Run tests with coverage
npx nx test react-demo --coverage

# Run tests in watch mode
npx nx test react-demo --watch
```

### Linting

```sh
# Lint the react-demo app
npx nx lint react-demo

# Lint the ui library
npx nx lint ui

# Lint all projects
npx nx run-many -t lint

# Lint and auto-fix issues
npx nx lint react-demo --fix
```

### Type Checking

```sh
# Type check react-demo
npx nx typecheck react-demo

# Type check all projects
npx nx run-many -t typecheck
```

### Project Information

```sh
# Show all available targets for a project
npx nx show project react-demo

# Show project dependency graph
npx nx graph

# Show what's affected by your changes
npx nx affected:graph

# List all projects in the workspace
npx nx show projects
```

### Affected Commands

Run tasks only on projects affected by your changes:

```sh
# Test only affected projects
npx nx affected -t test

# Build only affected projects
npx nx affected -t build

# Lint only affected projects
npx nx affected -t lint
```

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔧 Code Generation

Nx provides powerful code generators to scaffold new projects and components:

### Generate New Projects

```sh
# Generate a new React application
npx nx g @nx/react:app my-new-app

# Generate a new React library in packages/
npx nx g @nx/react:lib my-lib --directory=packages/my-lib

# Generate a buildable library
npx nx g @nx/react:lib shared-utils --buildable --directory=packages/shared-utils
```

### Generate Components

```sh
# Generate a component in the react-demo app
npx nx g @nx/react:component Button --project=react-demo --directory=src/components

# Generate a component in the ui library
npx nx g @nx/react:component Card --project=ui --directory=src/lib

# Generate a component with tests
npx nx g @nx/react:component Modal --project=ui --directory=src/lib --skipTests=false
```

### Other Generators

```sh
# Generate a React hook
npx nx g @nx/react:hook useAuth --project=react-demo --directory=src/hooks

# Generate a Redux slice (if Redux is added)
npx nx g @nx/react:redux feature --project=react-demo

# List all available generators
npx nx list @nx/react
```

### Explore Available Plugins

```sh
# List all installed plugins
npx nx list

# Show capabilities of a specific plugin
npx nx list @nx/react
npx nx list @nx/vite
```

Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔍 Workspace Maintenance

### Cache Management

```sh
# Clear the Nx cache
npx nx reset

# Check cache status
npx nx daemon --status
```

### Dependency Management

```sh
# Check for outdated dependencies
npm outdated

# Update Nx workspace
npx nx migrate latest

# Run migrations after updating
npx nx migrate --run-migrations

# Security audit
npm audit

# Auto-fix vulnerabilities
npm audit fix
```

### Workspace Analysis

```sh
# View workspace dependency graph
npx nx graph

# Generate a dependency graph image
npx nx graph --file=output.html

# Print workspace information
npx nx report
```

## 🐛 Debugging & Troubleshooting

### Common Issues

```sh
# If you encounter module resolution issues
npm install

# Restart the Nx daemon
npx nx daemon --stop
npx nx daemon --start

# Clear cache and reinstall
npx nx reset
rm -rf node_modules package-lock.json
npm install

# Check for configuration errors
npx nx show project react-demo --json
```

### Verbose Output

```sh
# Run commands with verbose logging
npx nx serve react-demo --verbose

# Run with debug information
NX_VERBOSE_LOGGING=true npx nx build react-demo
```

## ⚡ Performance Tips

1. **Enable Nx Daemon** - Keeps processes running for faster task execution
   ```sh
   npx nx daemon --start
   ```

2. **Use Computation Caching** - Nx automatically caches task results
   - Cached results are reused when inputs haven't changed
   - Share cache with your team using Nx Cloud

3. **Run Only Affected** - Save time by running tasks only on affected projects
   ```sh
   npx nx affected -t test
   ```

4. **Parallel Execution** - Run tasks across multiple projects in parallel
   ```sh
   npx nx run-many -t build --parallel=3
   ```

## 🛠️ Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 📝 Project-Specific Notes

### Current Packages

- **@react-demo/react-demo** - Main application with Hero component integration
- **@react-demo/dashboard** - Dashboard application showcasing stats and activity (runs on port 4201)
- **@react-demo/ui** - Shared UI library exporting Hero and other generic components
- **@react-demo/dashboard-components** - Dashboard-specific components (StatCard, RecentActivity)

### Development Workflow

1. Make changes to your code
2. Run `npx nx affected:graph` to see what's impacted
3. Run `npx nx affected -t test` to test only affected projects
4. Build with `npx nx build <project-name>`

### Import Shared Components

Components from the shared packages can be imported in your apps:

```typescript
// From the ui package
import { Hero } from '@react-demo/ui';

// From the dashboard-components package
import { StatCard, RecentActivity } from '@react-demo/dashboard-components';
```

## 📚 Useful Links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
