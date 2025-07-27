import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout component that wraps all pages
 * Provides consistent header, footer, and main content area
 * Uses semantic HTML and proper accessibility landmarks
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory-50">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wedding-blush-600 text-white p-4 z-50 rounded-md shadow-elegant font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-wedding-gold-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Header />

      <main className="flex-grow" role="main" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
