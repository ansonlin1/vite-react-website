import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock IntersectionObserver for tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
  root: null,
  rootMargin: "0px",
  thresholds: [0],
  takeRecords: vi.fn().mockReturnValue([]),
}));

// Mock window.matchMedia for responsive components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scroll behavior
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});
