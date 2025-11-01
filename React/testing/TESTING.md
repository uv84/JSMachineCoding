# React Testing Library Examples

This project demonstrates comprehensive testing patterns using React Testing Library, Vitest, and TypeScript.

## 🧪 Testing Setup

### Dependencies Used
- **Vitest**: Modern testing framework
- **React Testing Library**: Simple and complete testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: Fire events the same way the user does
- **jsdom**: DOM implementation for Node.js

### Configuration
- Test configuration is in `vite.config.ts`
- Test setup file: `src/test/setup.ts`
- Coverage reporting enabled with v8 provider

## 📁 Test Examples

### 1. Component Testing (`App.test.tsx`)
Tests the main App component covering:
- ✅ Rendering elements
- ✅ Button interactions  
- ✅ State updates
- ✅ External links
- ✅ CSS classes
- ✅ Accessibility attributes

### 2. Form Testing (`ContactForm.test.tsx`)
Comprehensive form testing including:
- ✅ Input validation
- ✅ Error messaging
- ✅ Form submission
- ✅ Success states
- ✅ Accessibility (ARIA attributes)
- ✅ Keyboard navigation
- ✅ Error clearing

### 3. Complex Component Testing (`UserList.test.tsx`)
Advanced component interactions:
- ✅ Search functionality
- ✅ Loading states
- ✅ Data filtering
- ✅ User selection
- ✅ Callback handling
- ✅ Async operations
- ✅ Edge cases

### 4. Custom Hooks Testing (`hooks/index.test.ts`)
Testing React hooks in isolation:
- ✅ `useCounter` - State management
- ✅ `useFetch` - API calls and side effects
- ✅ `useLocalStorage` - Browser storage integration
- ✅ Hook memoization
- ✅ Error handling

### 5. Utility Functions Testing (`utils/index.test.ts`)
Pure function testing:
- ✅ Mathematical operations
- ✅ String formatting
- ✅ Email validation
- ✅ Debounce functionality
- ✅ Edge cases and error handling

## 🎯 Testing Patterns & Best Practices

### 1. Component Testing Approach
```typescript
// ✅ Good: Test user behavior, not implementation
await user.click(screen.getByRole('button', { name: /submit/i }))
expect(screen.getByText(/success/i)).toBeInTheDocument()

// ❌ Avoid: Testing implementation details
expect(component.state.isSubmitted).toBe(true)
```

### 2. Async Testing
```typescript
// ✅ Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument()
})

// ✅ Use user-event for realistic interactions
const user = userEvent.setup()
await user.type(input, 'test')
```

### 3. Accessibility Testing
```typescript
// ✅ Test ARIA attributes
expect(input).toHaveAttribute('aria-invalid', 'true')
expect(input).toHaveAttribute('aria-describedby', 'error-id')

// ✅ Use semantic queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
```

### 4. Mock Management
```typescript
// ✅ Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})

// ✅ Restore original implementations
afterEach(() => {
  vi.restoreAllMocks()
})
```

### 5. Hook Testing
```typescript
// ✅ Use renderHook for testing hooks
const { result } = renderHook(() => useCustomHook())

// ✅ Wrap state updates in act()
act(() => {
  result.current.updateState('new value')
})
```

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 📊 Coverage Reports

Coverage reports are generated in the `coverage/` directory with:
- HTML report for visual coverage analysis
- JSON report for CI/CD integration
- Text summary in terminal

## 🔍 Debugging Tests

### Common Debugging Techniques

1. **Screen Debug**
```typescript
import { screen } from '@testing-library/react'
screen.debug() // Prints current DOM
```

2. **Queries Debug**
```typescript
screen.getByRole('', { name: /pattern/i }) // See all available roles
```

3. **Async Debugging**
```typescript
await waitFor(() => {
  expect(element).toBeInTheDocument()
}, { timeout: 5000 }) // Increase timeout for debugging
```

## 🧩 Test Organization

### File Structure
```
src/
├── components/
│   ├── Component.tsx
│   └── Component.test.tsx
├── hooks/
│   ├── index.ts
│   └── index.test.ts
├── utils/
│   ├── index.ts
│   └── index.test.ts
└── test/
    └── setup.ts
```

### Test Naming Convention
- Test files: `*.test.tsx` or `*.test.ts`
- Describe blocks: Component/function name
- Test cases: User behavior or expected outcome

## 📚 Additional Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://www.accessibility-developer-guide.com/knowledge/testing/)

## 🎭 Common Testing Scenarios

### Form Testing Checklist
- [ ] Input field rendering
- [ ] Input value updates
- [ ] Validation error display
- [ ] Error clearing on input
- [ ] Successful submission
- [ ] Form reset functionality
- [ ] Accessibility attributes

### Component Interaction Checklist  
- [ ] Click handlers
- [ ] Keyboard navigation
- [ ] State updates
- [ ] Prop changes
- [ ] Conditional rendering
- [ ] Loading states
- [ ] Error states

### Async Operation Checklist
- [ ] Loading state
- [ ] Success state
- [ ] Error handling
- [ ] Retry mechanisms
- [ ] Timeout handling
- [ ] Race condition prevention