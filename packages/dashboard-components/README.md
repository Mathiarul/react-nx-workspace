# @react-demo/dashboard-components

A collection of reusable React components specifically designed for dashboard applications.

## Components

### StatCard

A beautiful card component for displaying statistics with optional trends and icons.

**Props:**
- `title` (string) - The title of the stat
- `value` (string | number) - The main value to display
- `icon` (string, optional) - An emoji or icon to display
- `trend` (object, optional) - Trend information with `value` (number) and `isPositive` (boolean)
- `color` ('blue' | 'green' | 'purple' | 'orange') - The accent color

**Example:**
```tsx
import { StatCard } from '@react-demo/dashboard-components';

<StatCard
  title="Total Users"
  value="12,345"
  icon="👥"
  trend={{ value: 12.5, isPositive: true }}
  color="blue"
/>
```

### RecentActivity

Displays a list of recent activities with colored indicators for different activity types.

**Example:**
```tsx
import { RecentActivity } from '@react-demo/dashboard-components';

<RecentActivity />
```

## Usage

Install and import components in your application:

```typescript
import { StatCard, RecentActivity } from '@react-demo/dashboard-components';
```

## Development

### Running unit tests

Run `nx test dashboard-components` to execute the unit tests via [Vitest](https://vitest.dev/).

### Building

Run `nx build dashboard-components` to build the library.
