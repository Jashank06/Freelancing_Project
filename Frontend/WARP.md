# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a beauty salon website built with React 19 and Create React App. The project showcases a modern, animated beauty service platform with a dark theme and pink accent colors, resembling a Spotify-like aesthetic.

## Architecture

### Core Structure
- **Framework**: React 19 with React Router for navigation
- **Styling**: Tailwind CSS (loaded via CDN) with custom animations
- **Build Tool**: Create React App (react-scripts)
- **Testing**: Jest with React Testing Library

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with mobile menu
│   ├── Hero.jsx        # Landing hero section
│   ├── Services.jsx    # Services showcase
│   ├── Packages.jsx    # Service packages
│   ├── About.jsx       # About section
│   └── Contact.jsx     # Contact form/info
├── pages/              # Route-specific pages
│   └── ServiceDetail.jsx # Dynamic service detail pages
├── assets/
│   └── images/         # Service images and hero background
├── App.js              # Main app with routing setup
├── index.js            # React entry point
├── App.css             # Custom animations and theme variables
└── index.css           # Global styles and keyframe animations
```

### Key Architectural Patterns
- **Component-Based**: Each UI section is a separate component
- **Route-Based Navigation**: Uses React Router with `/service/:serviceName` dynamic routes
- **Mobile-First Design**: Responsive components with mobile menu toggle
- **Animation-Heavy**: Custom CSS animations for floating elements, fades, slides
- **Theme System**: CSS custom properties for primary (#ff4d8d) and secondary (#1a1a1a) colors

### Styling Approach
- **Tailwind CSS**: Utility-first styling loaded via CDN
- **Custom Animations**: Defined in `index.css` and `App.css`
- **Theme Configuration**: Tailwind config embedded in `public/index.html`
- **Responsive Design**: Mobile-first with `md:` and `lg:` breakpoints

## Development Commands

### Starting Development
```bash
npm start
```
Runs the app in development mode at http://localhost:3000 with hot reload.

### Testing
```bash
# Run all tests in watch mode
npm test

# Run tests once (CI mode)
CI=true npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

### Building
```bash
npm run build
```
Creates optimized production build in the `build/` folder.

### Code Quality
The project uses Create React App's built-in ESLint configuration:
- React app rules
- React Jest rules

## Service Data Structure

Services are defined in `ServiceDetail.jsx` with the following structure:
```javascript
const serviceOptions = {
  'hair-styling': ['Layer Cut', 'Bob Cut', 'Hair Coloring', ...],
  'makeup': ['Bridal', 'Party', 'Casual', ...],
  'facials': ['Hydra Facial', 'Anti-aging', ...],
  // ... more services
};
```

## Animation Classes

The project includes custom animation utilities:
- `animate-float`, `animate-float-slow`, `animate-float-slower` - Floating effects
- `animate-fade-in`, `animate-slide-up`, `animate-scale-in` - Entry animations
- `animate-pulse-slow` - Slow pulsing effect
- Animation delays: `delay-100`, `delay-300`, `delay-500`, `delay-700`

## Route Structure

- `/` - Home page with all sections (Hero, Services, Packages, About, Contact)
- `/service/:serviceName` - Dynamic service detail pages

Valid service names: `hair-styling`, `makeup`, `facials`, `nail-extension`, `waxing`, `threading`, `spa`

## Development Notes

- The project uses React 19's latest features
- Tailwind CSS is loaded via CDN with inline configuration
- All components use JSX extension
- Images are stored in `src/assets/images/`
- The app uses sticky navigation and smooth scrolling anchor links
- Mobile menu is implemented with state management in Navbar component
