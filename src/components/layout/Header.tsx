import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header component for the wedding website
 * Includes responsive navigation and accessibility features
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-elegant border-b border-wedding-sage-100">
      <div className="container-elegant">
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* Logo/Monogram */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-script text-wedding-blush-600 hover:text-wedding-blush-700 transition-colors duration-200"
              aria-label="Home"
            >
              Anson & Partner
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/details"
                  className={`nav-link ${
                    isActiveLink("/details") ? "active" : ""
                  }`}
                >
                  Event Details
                </Link>
              </li>
              <li>
                <Link
                  to="/rsvp"
                  className={`nav-link ${
                    isActiveLink("/rsvp") ? "active" : ""
                  }`}
                >
                  RSVP
                </Link>
              </li>
              <li>
                <Link
                  to="/registry"
                  className={`nav-link ${
                    isActiveLink("/registry") ? "active" : ""
                  }`}
                >
                  Registry
                </Link>
              </li>
              <li>
                <Link
                  to="/music"
                  className={`nav-link ${
                    isActiveLink("/music") ? "active" : ""
                  }`}
                >
                  Music Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-3 rounded-lg text-wedding-navy-700 hover:text-wedding-blush-600 hover:bg-wedding-blush-50 focus:outline-none focus:ring-2 focus:ring-wedding-blush-500 focus:ring-offset-2 transition-all duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
            {/* Icon for menu toggle */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block animate-fade-in-up" : "hidden"
          } md:hidden border-t border-wedding-sage-100 bg-white/98 backdrop-blur-sm`}
          id="mobile-menu"
        >
          <ul className="px-4 pt-4 pb-6 space-y-2">
            <li>
              <Link
                to="/details"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink("/details")
                    ? "bg-wedding-blush-50 text-wedding-blush-700 border-l-4 border-wedding-blush-500"
                    : "text-wedding-navy-700 hover:text-wedding-blush-600 hover:bg-wedding-blush-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Event Details
              </Link>
            </li>
            <li>
              <Link
                to="/rsvp"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink("/rsvp")
                    ? "bg-wedding-blush-50 text-wedding-blush-700 border-l-4 border-wedding-blush-500"
                    : "text-wedding-navy-700 hover:text-wedding-blush-600 hover:bg-wedding-blush-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                RSVP
              </Link>
            </li>
            <li>
              <Link
                to="/registry"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink("/registry")
                    ? "bg-wedding-blush-50 text-wedding-blush-700 border-l-4 border-wedding-blush-500"
                    : "text-wedding-navy-700 hover:text-wedding-blush-600 hover:bg-wedding-blush-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Registry
              </Link>
            </li>
            <li>
              <Link
                to="/music"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink("/music")
                    ? "bg-wedding-blush-50 text-wedding-blush-700 border-l-4 border-wedding-blush-500"
                    : "text-wedding-navy-700 hover:text-wedding-blush-600 hover:bg-wedding-blush-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Music Requests
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
