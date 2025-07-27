# Testing Guide

This guide covers the comprehensive testing setup for the wedding website including unit tests, integration tests, and end-to-end testing.

## Testing Stack

### Unit & Integration Testing

- **Vitest**: Fast unit test runner built for Vite
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Custom Jest matchers for DOM elements
- **User Event**: Realistic user interaction simulation

### End-to-End Testing

- **Playwright**: Cross-browser E2E testing
- **Multi-browser**: Chrome, Firefox, Safari testing
- **Mobile testing**: Responsive design validation

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Install Playwright browsers (first time only)
npx playwright install
```

## Test Structure

### Unit Tests Location

- `src/test/` - Test files
- `src/test/setup.ts` - Test configuration
- `vitest.config.ts` - Vitest configuration

### E2E Tests Location

- `e2e/` - End-to-end test files
- `playwright.config.ts` - Playwright configuration

## Writing Tests

### Unit Test Example

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MyComponent from "../components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();

    render(<MyComponent onClick={mockFn} />);

    await user.click(screen.getByRole("button"));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from "@playwright/test";

test("user can complete RSVP", async ({ page }) => {
  await page.goto("/rsvp");

  await page.fill('[name="name"]', "John Doe");
  await page.fill('[name="email"]', "john@example.com");
  await page.click('button[type="submit"]');

  await expect(page.getByText("Thank you")).toBeVisible();
});
```

## Test Categories

### 1. Component Tests (`src/test/`)

- **Header.test.tsx**: Navigation component testing
- **FormField.test.tsx**: Form input validation
- **Layout.test.tsx**: Layout component structure
- **Button.test.tsx**: Interactive element testing

### 2. Page Tests

- **HomePage.test.tsx**: Landing page functionality
- **RsvpPage.test.tsx**: RSVP form validation
- **EventDetailsPage.test.tsx**: Event information display

### 3. API Tests

- **rsvp.test.ts**: RSVP submission endpoints
- **music.test.ts**: Music request endpoints
- **validation.test.ts**: Input validation logic

### 4. E2E Tests (`e2e/`)

- **wedding-website.spec.ts**: Complete user journeys
- **accessibility.spec.ts**: WCAG compliance testing
- **performance.spec.ts**: Core Web Vitals validation

## Testing Best Practices

### Unit Tests

- ✅ Test component behavior, not implementation
- ✅ Use semantic queries (getByRole, getByLabelText)
- ✅ Mock external dependencies
- ✅ Test error states and edge cases
- ❌ Don't test implementation details
- ❌ Avoid testing third-party library internals

### E2E Tests

- ✅ Test critical user journeys
- ✅ Use page object model for complex scenarios
- ✅ Test across different browsers and devices
- ✅ Validate accessibility requirements
- ❌ Don't duplicate unit test coverage
- ❌ Avoid testing UI implementation details

### Form Testing

```tsx
// Good: Test user behavior
await user.type(screen.getByLabelText("Email"), "test@example.com");
await user.click(screen.getByRole("button", { name: /submit/i }));
expect(mockSubmit).toHaveBeenCalledWith({ email: "test@example.com" });

// Bad: Test implementation
expect(component.state.email).toBe("test@example.com");
```

## Test Configuration

### Vitest Setup (`vitest.config.ts`)

- **Environment**: jsdom for DOM testing
- **Global**: Global test functions available
- **Coverage**: v8 provider with HTML reports
- **Setup**: Custom matchers and mocks

### Playwright Setup (`playwright.config.ts`)

- **Browsers**: Chrome, Firefox, Safari
- **Mobile**: iOS and Android viewports
- **Retries**: CI-specific retry logic
- **Screenshots**: Failure capture

## Mocking Guidelines

### API Mocking

```typescript
// Mock fetch for API calls
global.fetch = vi.fn();

const mockResponse = {
  json: vi.fn().mockResolvedValue({ success: true }),
};

vi.mocked(fetch).mockResolvedValue(mockResponse as any);
```

### Component Mocking

```typescript
// Mock child components
vi.mock("../components/ComplexComponent", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-component">{children}</div>
  ),
}));
```

## Coverage Requirements

### Coverage Targets

- **Lines**: > 80%
- **Functions**: > 80%
- **Branches**: > 75%
- **Statements**: > 80%

### Coverage Exclusions

- Configuration files
- Test files
- Type definitions
- Build artifacts
- API routes (tested separately)

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run tests
  run: |
    npm test -- --coverage
    npm run test:e2e

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

### Quality Gates

- All tests must pass
- Coverage thresholds must be met
- E2E tests must pass on multiple browsers
- No critical accessibility violations

## Debugging Tests

### Unit Test Debugging

```bash
# Debug specific test
npm test -- --t "test name"

# Run with debugging output
npm test -- --reporter=verbose

# Open Vitest UI for debugging
npm run test:ui
```

### E2E Test Debugging

```bash
# Run with headed browser
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Open trace viewer
npx playwright show-trace trace.zip
```

## Performance Testing

### Core Web Vitals

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Load Testing

```typescript
test("page loads within performance budget", async ({ page }) => {
  const startTime = Date.now();
  await page.goto("/");
  const loadTime = Date.now() - startTime;

  expect(loadTime).toBeLessThan(3000);
});
```

## Accessibility Testing

### WCAG 2.1 AA Compliance

- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility
- Focus management
- ARIA attributes

### Automated Testing

```typescript
test("page has no accessibility violations", async ({ page }) => {
  await page.goto("/");

  // Use axe-playwright for automated a11y testing
  const results = await page.accessibilitySnapshot();
  expect(results.violations).toHaveLength(0);
});
```

## Continuous Improvement

### Test Metrics to Monitor

- Test execution time
- Flaky test identification
- Coverage trends
- Performance regression detection

### Regular Review Tasks

- Remove obsolete tests
- Update test data
- Refactor test utilities
- Improve test performance
- Update browser versions
