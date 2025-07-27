import { Link } from "react-router-dom";

/**
 * Footer component for the wedding website
 * Includes social links, copyright, and contact information
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-wedding-navy-900 to-wedding-navy-800 text-wedding-ivory-100">
      <div className="container-elegant py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-serif font-medium text-wedding-ivory-50 mb-6">
              Contact Us
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:wedding@example.com"
                className="flex items-center justify-center md:justify-start text-wedding-ivory-300 hover:text-wedding-blush-300 transition-colors duration-200 group"
                aria-label="Email us about the wedding"
              >
                <svg
                  className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                wedding@example.com
              </a>
              <p className="text-wedding-ivory-400 text-sm">
                Questions? We'd love to hear from you!
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h2 className="text-xl font-serif font-medium text-wedding-ivory-50 mb-6">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/details"
                  className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-colors duration-200 hover:underline"
                >
                  Event Details
                </Link>
              </li>
              <li>
                <Link
                  to="/rsvp"
                  className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-colors duration-200 hover:underline"
                >
                  RSVP
                </Link>
              </li>
              <li>
                <Link
                  to="/registry"
                  className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-colors duration-200 hover:underline"
                >
                  Registry
                </Link>
              </li>
              <li>
                <Link
                  to="/music"
                  className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-colors duration-200 hover:underline"
                >
                  Music Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Love Story */}
          <div className="text-center md:text-right">
            <h2 className="text-xl font-serif font-medium text-wedding-ivory-50 mb-6">
              Follow Our Journey
            </h2>
            <div className="flex justify-center md:justify-end space-x-6 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-all duration-200 hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wedding-ivory-300 hover:text-wedding-blush-300 transition-all duration-200 hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="text-wedding-ivory-400 text-sm">
              Share in our happiness
            </p>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-wedding-blush-400 to-transparent mb-8" />

        {/* Copyright & Wedding Details */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4 text-wedding-ivory-300">
            <span className="font-script text-2xl text-wedding-blush-400">
              Anson & Partner
            </span>
            <span className="text-wedding-ivory-500">•</span>
            <span className="text-sm">December 31, 2025</span>
          </div>
          <p className="text-wedding-ivory-500 text-sm">
            © {currentYear} All rights reserved. Made with
            <span className="text-wedding-blush-400 mx-1">♥</span>
            for our special day.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
