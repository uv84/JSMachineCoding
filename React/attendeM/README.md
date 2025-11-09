# AttendanceM - Attendance Management System

A comprehensive attendance management system built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Role-based Authentication** - Admin, HR, and Employee roles with different permissions
- **Attendance Tracking** - Check-in/Check-out, break management, and status tracking
- **Real-time Dashboard** - Live attendance status and statistics
- **User Management** - Add, edit, delete, and manage user accounts (Admin/HR only)
- **Attendance Reports** - View and export attendance data
- **Internationalization** - English and Marathi language support

### Technical Features
- **Offline Support** - Uses IndexedDB for local data persistence
- **Progressive Web App** - Modern web app with offline capabilities
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Type Safety** - Full TypeScript implementation
- **State Management** - Redux Toolkit for predictable state updates
- **Routing** - Protected routes with role-based access control
- **Testing** - Comprehensive test suite with Vitest

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Database**: IndexedDB (via IDB library)
- **Internationalization**: React Intl
- **Testing**: Vitest, Testing Library
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with IndexedDB support

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/uv84/JSMachineCoding.git
   cd JSMachineCoding/React/attendeM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open http://localhost:5173 in your browser

## 🎮 Demo Accounts

The system comes with pre-configured demo accounts:

### Admin Account
- **Email**: admin@company.com
- **Password**: password123
- **Permissions**: Full access to all features

### Employee Account
- **Email**: employee@company.com
- **Password**: password123
- **Permissions**: Attendance tracking and personal reports

## 📱 Usage

### For Employees
1. **Login** with your credentials
2. **Check In** when you arrive at work
3. **Take Breaks** using the break start/end buttons
4. **Check Out** when leaving work
5. **View Reports** to see your attendance history

### For Admin/HR
1. **User Management** - Add, edit, or remove users
2. **Attendance Monitoring** - View all employee attendance
3. **Reports Generation** - Generate and export attendance reports
4. **System Configuration** - Manage system settings

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
