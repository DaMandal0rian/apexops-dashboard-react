# Overview

ApexOps is a real-time AI agent and GPU resource management platform that provides comprehensive monitoring, optimization, and cost analytics for AI infrastructure. The application enables users to deploy, monitor, and scale AI agents across distributed GPU resources while providing real-time performance metrics, cost tracking, and optimization recommendations.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## January 12, 2025
- Added comprehensive Alerts & Notifications section with real-time alert management
- Implemented Data Lineage & Tracing with animated dataset graphs for pipeline visualization
- Added sidebar navigation for new sections (Alerts and Data Lineage)
- Created interactive alert feed with filtering, search, and notification settings
- Built animated data flow visualization with node-based lineage tracking
- Enhanced API endpoints for alerts management and data lineage queries
- Integrated notification system with real-time WebSocket updates
- **Enhanced Landing Page with Sophisticated Design:**
  - Created advanced SVG logo with hexagonal geometry, neural network patterns, and floating particles
  - Added sophisticated hover animations for solution cards with scanning effects, orbital animations, and GPU flash patterns
  - Implemented glassmorphism effects with backdrop blur and gradient overlays
  - Added orbital animation system for AI Gateway routing visualization
  - Created random GPU activation patterns with data flow line animations
  - Enhanced visual hierarchy with improved typography and gradient text effects

# System Architecture

## Frontend Architecture

The client uses a modern React-based single-page application built with:

- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management, caching, and real-time data synchronization
- **Tailwind CSS** with custom dark theme configuration for styling
- **Shadcn/ui** component library built on Radix UI primitives for accessible, customizable components

The frontend follows a component-based architecture with:
- Dashboard layout using fixed sidebar navigation and responsive grid system
- Real-time widget components for metrics visualization using Recharts
- WebSocket integration for live updates of performance metrics and resource status
- Custom hooks for mobile responsiveness, toast notifications, and WebSocket management

## Backend Architecture

The server implements a RESTful API using:

- **Express.js** with TypeScript for the web framework
- **WebSocket Server** for real-time bidirectional communication with connected clients
- **Middleware-based architecture** with request logging, error handling, and JSON parsing
- **Development-specific Vite integration** for hot reloading and asset serving

The API provides endpoints for:
- AI agent management (CRUD operations, status updates)
- GPU resource marketplace and availability tracking
- Resource usage analytics and performance metrics
- Cost analytics and optimization recommendations
- Real-time alert management

## Data Storage Solutions

The application uses PostgreSQL as the primary database with:

- **Drizzle ORM** for type-safe database queries and schema management
- **Neon Database** (serverless PostgreSQL) for cloud hosting
- **Schema-first approach** with shared TypeScript types between client and server
- **Drizzle-Kit** for database migrations and schema synchronization

Database schema includes tables for:
- Users and authentication
- AI agents with configuration and status tracking
- GPU resources with specifications and availability
- Resource usage metrics and performance data
- Cost analytics and billing information
- System alerts and notifications

## Authentication and Authorization

The current implementation includes basic user management with:
- User creation and retrieval by username/ID
- Session-based authentication using connect-pg-simple for PostgreSQL session storage
- Planned integration with secure authentication providers

## Real-time Communication

WebSocket implementation provides:
- Bidirectional communication between server and multiple connected clients
- Real-time updates for agent status changes, resource utilization, and performance metrics
- Automatic reconnection logic with exponential backoff
- Message broadcasting to all connected clients for system-wide updates

The real-time system enables live dashboard updates without manual refresh, critical for monitoring AI agent performance and resource allocation.

# External Dependencies

## Database Services
- **Neon Database** - Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM** - Type-safe database toolkit with PostgreSQL dialect support

## Frontend Libraries
- **Radix UI** - Headless component primitives for accessibility and customization
- **Recharts** - Chart library built on D3 for data visualization
- **TanStack Query** - Powerful data synchronization for React applications
- **Tailwind CSS** - Utility-first CSS framework with custom design system

## Development Tools
- **Vite** - Fast build tool with TypeScript support and plugin ecosystem
- **ESBuild** - Fast JavaScript bundler for production builds
- **TypeScript** - Static type checking across the entire application stack

## Monitoring and Analytics
- Real-time performance metrics collection and visualization
- Cost tracking and optimization recommendations
- Resource utilization monitoring across distributed GPU infrastructure
- Integration points prepared for external monitoring services and cloud providers

## GPU Marketplace Integration
- Abstract provider interface supporting multiple GPU cloud providers
- Real-time pricing and availability data aggregation
- Resource allocation and scaling automation capabilities
- Cost optimization algorithms based on usage patterns

The architecture is designed to scale horizontally with additional GPU providers and supports integration with major cloud platforms for expanded resource availability.