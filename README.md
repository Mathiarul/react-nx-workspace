# NX Monorepo Showcase

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A production-ready NX monorepo demonstrating enterprise-level code organization, sharing, and dependency management with **9 shared libraries** and **3 applications**.
---

## 🎯 NX Capabilities Demonstrated

This monorepo showcases key NX features:
- **Code Sharing** - Reusable libraries across multiple applications
- **Dependency Management** - Clean layered architecture with zero circular dependencies
- **Build Caching** - Instant rebuilds using NX computation cache
- **Affected Commands** - Build/test only what changed
- **Dependency Graph** - Visual representation of project relationships
- **Module Boundaries** - Enforced architectural constraints
- **Type Safety** - Shared TypeScript types across the workspace

---
## 📦 Project Structure

### 🚀 Applications (3)

#### 1. **E-Commerce Web** (`apps/e-commerce-web`)
Customer-facing online store with product browsing, shopping cart, and checkout.
- **Port:** 4200

#### 2. **Admin Portal** (`apps/admin-portal`)
Business management interface for user, product, and order management.
- **Port:** 4201

#### 3. **Mobile App** (`apps/mobile-app`)
Mobile-optimized shopping experience with responsive design.
- **Port:** 4202
---

### 📚 Libraries (9)

#### Shared Layer (Foundation)
1. **`@react-demo/types`** - Shared TypeScript types
2. **`@react-demo/utils`** - Common utilities
3. **`@react-demo/ui-components`** - Reusable UI components
4. **`@react-demo/api-client`** - HTTP client

#### Domain Layer (Business Logic)
5. **`@react-demo/user-management`** - User operations
6. **`@react-demo/order-management`** - Order processing

#### Feature Layer (Application Features)
7. **`@react-demo/auth`** - Authentication system
8. **`@react-demo/products`** - Product catalog
9. **`@react-demo/cart`** - Shopping cart
---

## 🏗️ Architecture

### Layered Dependency Structure

```
Applications → Features → Domain → Shared
```

- **Layer 1 (Shared):** Foundation libraries with no dependencies
- **Layer 2 (Domain):** Business logic depending on shared libraries
- **Layer 3 (Features):** Application features using domain and shared
- **Layer 4 (Apps):** Applications consuming all libraries

This structure prevents circular dependencies and ensures maintainable code.
---
## 🚀 Tech Stack
- **React 19.2.3** - Latest React with modern features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.3.0** - Fast build tool and dev server
- **React Router 7.11.0** - Client-side routing
- **NX 22.3.1** - Monorepo management and build system
- **Vitest 4.0.16** - Unit testing framework
- **ESLint 9.8.0** - Code linting
- **CSS Modules** - Component-scoped styling
---

## 🏁 Getting Started

```bash
# Install dependencies
yarn install

# Start NX daemon for faster builds
yarn nx daemon --start
```
---
## 💻 Common Commands

### Run Applications
```bash
# Using yarn scripts (recommended)
yarn start              # E-Commerce Web (port 4200)
yarn start:admin    # Admin Portal (port 4201)
yarn start:mobile   # Mobile App (port 4202)

# Or using nx directly
yarn nx serve e-commerce-web
```

### Build Projects
```bash
# Using yarn scripts
yarn build          # Build all projects
yarn build:apps     # Build only applications
yarn build:libs     # Build only libraries

# Or using nx directly
yarn nx build e-commerce-web
```

### Testing
```bash
# Using yarn scripts
yarn test               # Run all tests
yarn test:watch     # Run tests in watch mode
yarn test:coverage  # Run tests with coverage

# Or test specific project
yarn nx test @react-demo/auth
yarn nx test e-commerce-web
```

### Linting
```bash
# Using yarn scripts
yarn lint           # Lint all projects
yarn lint:fix       # Lint and auto-fix issues

# Or lint specific project
yarn nx lint e-commerce-web
```

### Code Formatting
```bash
yarn format         # Format all files
yarn format:check   # Check formatting without changes
```

### NX Graph & Visualization
```bash
yarn graph          # View dependency graph (opens in browser)
yarn nx graph --file=graph.html  # Generate graph as HTML file
```

### Smart Builds (Affected Commands)
```bash
yarn affected:build  # Build only projects affected by changes
yarn affected:test   # Test only affected projects
yarn affected:lint   # Lint only affected projects
yarn affected:graph  # Show affected projects graph
```

### Utility Commands
```bash
yarn reset          # Reset NX cache
yarn clean          # Clean all build artifacts and reset cache
yarn nx show projects   # List all projects
yarn nx show project @react-demo/products  # Show project details
```
---
## 🎯 Key Features

- **Authentication** - Login/register with JWT, protected routes
- **Shopping Cart** - Add/remove items, localStorage persistence
- **Product Catalog** - Listing, filtering, detail views
- **Order Management** - Creation, calculations, status tracking
---

## 🎨 Code Sharing in Action

All applications share common libraries:

```typescript
// Shared UI components across all apps
import { Button, Card, Input } from '@react-demo/ui-components';

// Shared business logic
import { useCart } from '@react-demo/cart';
import { useAuth } from '@react-demo/auth';

// Shared types for consistency
import { Product, User, Order } from '@react-demo/types';
```

This ensures consistency, reduces duplication, and centralizes business logic.
---

## 🔧 NX Advantages

### 1. **Build Caching**
Instant rebuilds for unchanged code. Run the same build twice - the second time completes instantly.

### 2. **Smart Rebuilds (Affected Commands)**
Only build/test what changed, saving time in large monorepos:
```bash
yarn nx affected:build  # Only builds affected projects
yarn nx affected:test   # Only tests affected projects
```

### 3. **Dependency Graph**
Visual representation of all project dependencies:
```bash
yarn nx graph  # Opens interactive graph in browser
```

### 4. **Parallel Execution**
Build multiple projects simultaneously for faster CI/CD pipelines.

### 5. **Module Boundaries**
Enforced architectural constraints prevent unwanted dependencies and maintain clean architecture.

### 6. **Code Generation**
Consistent project structure using NX generators for libraries and applications.
---

## 📈 Benefits

- **Code Reusability** - Shared components, logic, and types across all apps
- **Maintainability** - Fix bugs once, apply everywhere with clear separation of concerns
- **Scalability** - Easy to add new apps and features using existing libraries
- **Type Safety** - TypeScript consistency across the entire workspace
- **Build Performance** - Fast rebuilds with caching and parallel execution
- **Team Collaboration** - Clear ownership boundaries and independent development

---

## 🏆 Summary

This NX monorepo successfully demonstrates:
- ✅ 9 fully functional libraries
- ✅ 3 production-ready applications
- ✅ Clean architecture with no circular dependencies
- ✅ Real-world features (auth, cart, products, orders)
- ✅ All NX capabilities (caching, affected commands, dependency graph)

**Status: Complete and ready to showcase!** 🚀
---
## 📚 Additional Resources
- [NX Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
