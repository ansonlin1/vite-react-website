import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "../components/layout/Header";

// Test wrapper for components that need router context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Header Component", () => {
  it("renders navigation links", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    // Check for main navigation links (note: no "Home" link, just logo)
    // Use getAllByText to handle both desktop and mobile menu instances
    expect(screen.getAllByText("RSVP")).toHaveLength(2); // Desktop + mobile menu
    expect(screen.getAllByText("Event Details")).toHaveLength(2);
    expect(screen.getAllByText("Music Requests")).toHaveLength(2);
    expect(screen.getAllByText("Registry")).toHaveLength(2);
  });

  it("renders wedding couple names", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(screen.getByText("Anson & Partner")).toBeInTheDocument();
  });

  it("has proper navigation structure", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });

  it("renders mobile menu button", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("has wedding-themed styling classes", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-white/95", "shadow-elegant");
  });
});
