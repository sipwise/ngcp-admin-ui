# Architecture Overview
Table of Contents
- [High-Level Architecture](#high-level-architecture)
- [Application Layers](#application-layers)
- [Core Components](#core-components)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Legacy Integration](#legacy-integration)


## High-Level Architecture
The NGCP Admin UI is a modern Vue.js application that replaces the legacy Perl-based ngcp-panel. It follows a component-based architecture with clear separation of concerns between data management, UI components, and business logic.

## Architecture Overview
The application consists of several key layers:

1. *UI Layer*: Vue.js components using the Quasar Framework
2. *Data Layer*: Centralized API services and Vuex stores
3. *Business Logic Layer*: helpers and mixins for shared logic
4. *Legacy Integration Layer*: Proxy components for integrating with legacy pages

## Application Layers

### UI Layer
The UI layer is built with Vue.js and Quasar Framework, following these principles:

- *Component-Based Design*: Reusable UI components with clear interfaces
- *Consistent Styling*: Quasar components with custom styling
- *Internationalization*: All text is internationalized using vue-i18n
- *Responsive Layout*: Adapts to different screen sizes

Key UI component categories:

- *Page Components*: Top-level route components (pages)
- *AUI Components*: Reusable UI building blocks (components)
- *Layout Components*: Define the application structure (layouts)

### Data Layer
See [data-layer.md](data-layer.md) for more info.
The data layer handles all communication with the NGCP backend:

- *Centralized API Module*: All API calls go through `ngcpAPI.js`
- *Vuex Store Modules*: State management organized by resource
- *Store Generators*: Reduce boilerplate for common data patterns
- *Error Handling*: Standardized error handling and notifications

### Business Logic Layer
Business logic is separated from UI components:

- *Helpers*: Utility functions for common operations (helpers)
- *Mixins*: Shared component behavior (mixins) - more info in [data-layer.md](data-layer.md).

### Legacy Integration Layer
See [proxy-components.md](proxy-components.md) for more info.
A proxy component system allows integration with legacy ngcp-panel pages:

- *Proxy Components*: Embed legacy pages within iframes
- *History Management*: Ensure proper navigation between old and new pages

## Core Components

### AUI Component Library
The application includes a custom component library:

- *aui-data-table*: Advanced data grid with CRUD operations
- *AuiSelectLazy*: Lazy-loading select component
- *AuiForm*: Form handling with validation
- *AuiDialog*: Modal dialogs and confirmations

### Routing System
The routing system (router) defines:

- *Route Structure*: Hierarchy of pages and views
- *Route Guards*: Authentication and permission checks with ACL integration (`aclCanInternal()` in `src/boot/acl.js`)
- *Route Metadata*: Additional information for rendering

### API Services
API services abstract backend communication:

- *Resource-Based API*: Endpoints organized by resource type
- *Authentication*: Automatic token handling and refresh
- *Error Normalization*: Consistent error format
- *Request Cancellation*: Support for cancelling in-flight requests

## Data Flow

Component Initialization Flow

1. Component mounts
2. Component dispatches Vuex action
3. Action calls API service
4. API returns data
5. Store updates state
6. Component reactively renders updated data

### CRUD Operation Flow
1. User triggers action (create/edit/delete)
2. Component calls API directly or via store
3. API performs operation
4. Store updates local state if needed
5. UI updates to reflect changes
6. Success/error notification shown

### Proxy Component Flow
1. Vue router navigates to proxy component
2. Proxy component loads legacy URL in iframe
3. Legacy page loads and communicates via postMessage
4. Navigation events synchronized between new and old UI

## State Management
### Vuex Store Structure
The application uses Vuex with a modular approach:
```js
// names are just illustrative
store/
├── index.js             # Root store configuration
├── modules/             # Domain-specific modules
│   ├── subscribers.js   # Subscriber management
│   ├── domains.js       # Domain management
│   └── ...
└── plugins/             # Store plugins
    └── store-generator.js  # Generates common store patterns
```

## Store Generators
Store generators reduce boilerplate by creating standard store patterns:

- For components that need lazy-loaded data (SelectLazy)
- For managing entities with CRUD operations
- For form state management (FormData)

## Legacy Integration
### Proxy Component System
The proxy component system allows integration with legacy pages:

- URL Mapping: Maps new routes to legacy URLs
- Session Handling: Maintains single session between old and new
- Navigation Synchronization: Ensures back/forward works correctly
- Migration Strategy: Plan for gradually moving features to the new system
