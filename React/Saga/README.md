# Redux Saga User Manager

A simple React TypeScript application demonstrating Redux Saga implementation with a beautiful UI design. This app allows you to fetch, display, and manage users with a clean and responsive interface.

## Features

- 🚀 **Redux Saga Integration**: Async state management with Redux Saga
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 👥 **User Management**: Fetch users from API and add new users
- 🎨 **Component-based CSS**: Each component has its own CSS file
- 🔍 **User Details Modal**: Click on users to view detailed information
- ⚡ **TypeScript Support**: Full TypeScript implementation
- 🎪 **Loading Animations**: Smooth loading states and transitions

## Components

### 1. UserList Component (`src/components/UserList.tsx` & `UserList.css`)
- Displays a grid of user cards
- Fetches users from JSONPlaceholder API
- Responsive grid layout
- Hover animations and effects
- Loading and error states

### 2. UserCard Component (`src/components/UserCard.tsx` & `UserCard.css`)
- Modal popup for detailed user information
- Beautiful overlay with backdrop blur
- Contact information and address display
- Smooth animations and transitions

### 3. AddUserForm Component (`src/components/AddUserForm.tsx` & `AddUserForm.css`)
- Form to add new users
- Modal with form validation
- Responsive form layout
- Redux Saga integration for adding users

### 4. LoadingSpinner Component (`src/components/LoadingSpinner.tsx` & `LoadingSpinner.css`)
- Reusable loading component
- Multiple size variants (small, medium, large)
- Smooth animations
- Customizable loading messages

## Redux Store Structure

### Store Configuration (`src/store/index.ts`)
- Redux Toolkit configuration
- Redux Saga middleware setup
- TypeScript type definitions

### User Slice (`src/store/slices/userSlice.ts`)
- User state management
- Actions for fetching, adding, and selecting users
- TypeScript interfaces for type safety

### Saga Implementation (`src/store/sagas/`)
- **userSaga.ts**: Handles user-related async operations
- **api.ts**: API service functions
- **rootSaga.ts**: Combines all sagas

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for:
- Fetching users: `GET /users`
- Adding users: `POST /users` (simulated)

## Project Structure

```
src/
├── components/           # React components
│   ├── UserList.tsx     # User list component
│   ├── UserList.css     # User list styles
│   ├── UserCard.tsx     # User detail modal
│   ├── UserCard.css     # User card styles
│   ├── AddUserForm.tsx  # Add user form
│   ├── AddUserForm.css  # Form styles
│   ├── LoadingSpinner.tsx # Loading component
│   └── LoadingSpinner.css # Loading styles
├── store/               # Redux store
│   ├── index.ts         # Store configuration
│   ├── hooks.ts         # Typed Redux hooks
│   ├── slices/          # Redux slices
│   │   ├── userSlice.ts # User slice
│   │   └── types.ts     # TypeScript types
│   └── sagas/           # Redux Sagas
│       ├── rootSaga.ts  # Root saga
│       ├── userSaga.ts  # User saga
│       └── api.ts       # API service
├── App.tsx              # Main app component
├── App.css              # Global app styles
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Redux Saga** - Side effects management
- **Vite** - Build tool
- **CSS3** - Styling with animations and gradients

## Key Features Implemented

### Redux Saga Flow
1. **Action Dispatch**: Components dispatch actions
2. **Saga Intercepts**: Sagas watch for specific actions
3. **API Calls**: Sagas handle async API operations
4. **State Updates**: Success/failure actions update the store
5. **UI Updates**: Components re-render based on state changes

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface
- Accessible design patterns

### TypeScript Integration
- Strict type checking
- Interface definitions for all data structures
- Typed Redux hooks
- Component props typing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development purposes.

---

**Happy Coding!** 🚀