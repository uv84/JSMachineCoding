# 🎯 React Testing Quick Reference Card

## 📋 Daily Practice Checklist

### ✅ **Before You Start Testing**
- [ ] Understand what the component/feature does
- [ ] Think about user behavior, not implementation
- [ ] Identify accessibility requirements
- [ ] Plan test scenarios (happy path + edge cases)

### 🧪 **Essential Testing Patterns**

#### **1. Basic Component Test Template**
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    render(<ComponentName prop="value" />)
    
    // Act & Assert
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
  
  it('should handle user interaction', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ComponentName />)
    
    // Act
    await user.click(screen.getByRole('button'))
    
    // Assert
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  })
})
```

#### **2. Query Priority Cheat Sheet**
```typescript
// 🟢 PREFERRED (Accessible to everyone)
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
screen.getByPlaceholderText(/enter email/i)
screen.getByText(/welcome message/i)

// 🟡 OK (Semantic queries)
screen.getByDisplayValue(/current value/i)
screen.getByAltText(/image description/i)
screen.getByTitle(/tooltip text/i)

// 🔴 LAST RESORT (Test IDs)
screen.getByTestId('submit-button')
```

#### **3. Async Testing Pattern**
```typescript
// For elements that appear after async operations
const element = await screen.findByText(/loaded content/i)
expect(element).toBeInTheDocument()

// For waiting for conditions
await waitFor(() => {
  expect(screen.getByText(/updated/i)).toBeInTheDocument()
})

// All user interactions should be awaited
await user.click(button)
await user.type(input, 'text')
```

#### **4. Form Testing Pattern**
```typescript
it('should validate and submit form', async () => {
  const user = userEvent.setup()
  const mockSubmit = vi.fn()
  
  render(<Form onSubmit={mockSubmit} />)
  
  // Fill form
  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/password/i), 'password123')
  
  // Submit
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  // Verify
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  })
})
```

#### **5. Hook Testing Pattern**
```typescript
import { renderHook, act } from '@testing-library/react'

it('should handle state updates', () => {
  const { result } = renderHook(() => useCounter(0))
  
  act(() => {
    result.current.increment()
  })
  
  expect(result.current.count).toBe(1)
})
```

## 🛠️ **Common Debugging Commands**

```typescript
// Visual debugging
screen.debug()                    // Print entire DOM
screen.debug(screen.getByRole('button'))  // Print specific element

// Query debugging
screen.getByRole('')             // Shows all available roles
screen.logTestingPlaygroundURL() // Open in testing playground

// Check what queries are available
screen.getByRole('button', { name: '' }) // Shows available button names
```

## 🎯 **Test Categories by Complexity**

### **🟢 Beginner Tests**
- [ ] Component renders without crashing
- [ ] Text content appears correctly
- [ ] Props are displayed properly
- [ ] CSS classes are applied
- [ ] Links have correct href attributes

### **🟡 Intermediate Tests**
- [ ] User interactions (click, type, select)
- [ ] Form validation and submission
- [ ] Conditional rendering
- [ ] Loading and error states
- [ ] Callback function verification

### **🔴 Advanced Tests**
- [ ] Complex async operations
- [ ] Integration between components
- [ ] Custom hook behavior
- [ ] Error boundary handling
- [ ] Performance optimizations

## 📚 **Study Our Codebase Examples**

### **Start Here (Beginner)**
```bash
# Study these files in order:
1. src/App.test.tsx              # Basic component tests
2. src/utils/index.test.ts       # Pure function tests
```

### **Intermediate Level**
```bash
3. src/components/ContactForm.test.tsx  # Form testing
4. src/components/UserList.test.tsx     # Complex interactions
```

### **Advanced Level**
```bash
5. src/hooks/index.test.ts       # Custom hook testing
6. src/test/test-utils.tsx       # Testing utilities
```

## 🚀 **Daily Practice Routine**

### **Morning Warmup (10 minutes)**
- [ ] Review one test file from our codebase
- [ ] Identify new patterns or techniques
- [ ] Note any questions for further study

### **Active Practice (30-60 minutes)**
- [ ] Write 2-3 new tests
- [ ] Focus on current learning phase topic
- [ ] Practice debugging techniques
- [ ] Refactor existing tests

### **Evening Review (10 minutes)**
- [ ] Review what you learned
- [ ] Plan tomorrow's focus area
- [ ] Update learning progress

## 🎪 **Common Mistakes to Avoid**

### ❌ **Don't Test Implementation Details**
```typescript
// Bad
expect(component.state.count).toBe(1)
expect(wrapper.find('.hidden')).toHaveLength(0)

// Good  
expect(screen.getByText('Count: 1')).toBeInTheDocument()
expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
```

### ❌ **Don't Use Poor Queries**
```typescript
// Bad
screen.getByTestId('email-input')
screen.getByClassName('btn-primary')

// Good
screen.getByLabelText(/email/i)
screen.getByRole('button', { name: /submit/i })
```

### ❌ **Don't Forget Async/Await**
```typescript
// Bad
user.click(button)
expect(screen.getByText(/success/i)).toBeInTheDocument()

// Good
await user.click(button)
expect(await screen.findByText(/success/i)).toBeInTheDocument()
```

## 🏆 **Progress Tracking**

### **Week 1-2: Foundations**
- [ ] Set up testing environment
- [ ] Understand testing philosophy
- [ ] Write first 10 basic tests
- [ ] Master render and basic queries

### **Week 3-4: Basic Testing**
- [ ] Master all query types
- [ ] Handle user interactions
- [ ] Debug tests effectively
- [ ] Write 25+ tests total

### **Week 5-6: Component Testing**
- [ ] Test complex components
- [ ] Handle async operations
- [ ] Mock functions and props
- [ ] Write 50+ tests total

### **Week 7-8: Forms & Events**
- [ ] Master form testing
- [ ] Test validation flows
- [ ] Handle accessibility
- [ ] Write 75+ tests total

### **Continue with roadmap phases...**

## 📞 **When You Need Help**

### **Quick Fixes**
1. Check the error message carefully
2. Use `screen.debug()` to see current DOM
3. Verify element exists with correct query
4. Ensure async operations are awaited

### **Learning Resources**
- Our comprehensive test files (73 examples)
- [Testing Library Docs](https://testing-library.com/)
- [Testing Playground](https://testing-playground.com/)
- React Testing community forums

### **Best Practices Reminder**
- ✅ Test user behavior, not implementation
- ✅ Use accessible queries first
- ✅ Await all user interactions
- ✅ Keep tests simple and focused
- ✅ Write descriptive test names

---

**Remember**: The goal is to write tests that give you confidence your application works as users expect. Start simple, practice consistently, and gradually tackle more complex scenarios! 🎯