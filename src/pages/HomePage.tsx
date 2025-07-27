import type { FC } from "react";
import Head from "../components/seo/Head";

/**
 * Homepage component for the wedding website
 * Features hero section, countdown timer, and welcome message
 */
const HomePage: FC = () => {
  // Calculate days until wedding (example date: December 31, 2025)
  const weddingDate = new Date("2025-12-31");
  const today = new Date();
  const daysUntilWedding = Math.ceil(
    (weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Head
        title="Home"
        description="Join Anson and Partner as they celebrate their wedding on December 31, 2025 at San Francisco Botanical Garden. RSVP today and help create the perfect celebration."
        keywords="wedding, Anson, Partner, December 2025, San Francisco, botanical garden, RSVP, celebration"
      />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section
          className="relative h-screen bg-gradient-to-br from-wedding-blush-100 via-wedding-ivory-50 to-wedding-sage-50 flex items-center justify-center"
          role="banner"
          aria-labelledby="hero-heading"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5" aria-hidden="true">
            <div
              className="absolute inset-0 bg-repeat bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Floating elements for decoration */}
          <div
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-wedding-blush-200/30 animate-pulse-soft"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-wedding-sage-200/30 animate-pulse-soft"
            style={{ animationDelay: "1s" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-wedding-gold-200/30 animate-pulse-soft"
            style={{ animationDelay: "2s" }}
            aria-hidden="true"
          />

          {/* Hero Content */}
          <div className="relative text-center space-y-8 p-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="space-y-4">
              <h1 id="hero-heading" className="heading-1 text-balance">
                <span className="text-wedding-blush-600">Anson</span>
                <span className="text-wedding-navy-800 mx-4">&</span>
                <span className="text-wedding-sage-600">Partner</span>
              </h1>
              <div
                className="h-px w-32 bg-gradient-to-r from-transparent via-wedding-gold-400 to-transparent mx-auto"
                aria-hidden="true"
              />
              <p className="text-xl md:text-2xl text-wedding-navy-700 font-light">
                Together Forever
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-lg md:text-xl text-wedding-navy-600">
                <time dateTime="2025-12-31">December 31, 2025</time>
              </p>
              <p className="text-base md:text-lg text-muted">
                Venue Location • City, State
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#countdown"
                className="inline-flex items-center text-wedding-blush-600 hover:text-wedding-blush-700 transition-colors duration-200 group"
                aria-label="Scroll to countdown section"
              >
                <span className="mr-2">Celebrate with us</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section
          id="countdown"
          className="section bg-gradient-to-r from-wedding-sage-50 to-wedding-blush-50"
          aria-labelledby="countdown-heading"
        >
          <div className="container-elegant text-center">
            <h2 id="countdown-heading" className="heading-2 mb-8 text-balance">
              Counting Down to
              <span className="text-accent"> Forever</span>
            </h2>

            <div className="card max-w-md mx-auto">
              <div
                className="text-6xl md:text-7xl font-light text-wedding-blush-600 mb-4"
                aria-live="polite"
              >
                {daysUntilWedding}
              </div>
              <div className="text-lg text-wedding-navy-600 uppercase tracking-wide">
                Days to go
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-wedding-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-wedding-blush-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-wedding-navy-800 mb-2">
                  Love Story
                </h3>
                <p className="text-muted text-sm">Years in the making</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-wedding-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-wedding-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-wedding-navy-800 mb-2">
                  Celebration
                </h3>
                <p className="text-muted text-sm">One magical day</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-wedding-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-wedding-gold-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-wedding-navy-800 mb-2">
                  New Beginning
                </h3>
                <p className="text-muted text-sm">Forever starts here</p>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="section bg-white">
          <div className="container-elegant">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-2 mb-8 text-balance">
                Welcome to Our
                <span className="text-accent"> Wedding Website</span>
              </h2>

              <div className="prose prose-lg mx-auto text-wedding-navy-700">
                <p className="text-xl leading-relaxed mb-8">
                  We're excited to celebrate our special day with you! Here
                  you'll find all the details about our wedding, including venue
                  information, how to RSVP, and even a way to request your
                  favorite songs for the reception.
                </p>
                <p className="text-lg leading-relaxed">
                  We can't wait to share this moment with all our family and
                  friends. Your presence will make our celebration complete.
                </p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/rsvp" className="btn-primary">
                  RSVP Now
                </a>
                <a href="/details" className="btn-outline">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section
          className="section-sm bg-gradient-to-r from-wedding-ivory-50 to-wedding-sage-50"
          aria-labelledby="quicklinks-heading"
        >
          <div className="container-elegant">
            <h2 id="quicklinks-heading" className="sr-only">
              Quick Navigation Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="/details"
                className="card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
                aria-labelledby="details-title"
                aria-describedby="details-desc"
              >
                <div className="text-center">
                  <div
                    className="w-12 h-12 bg-wedding-blush-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wedding-blush-200 transition-colors"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6 text-wedding-blush-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    id="details-title"
                    className="text-lg font-medium text-wedding-navy-800 mb-2"
                  >
                    Event Details
                  </h3>
                  <p id="details-desc" className="text-sm text-muted">
                    Schedule, venue & more
                  </p>
                </div>
              </a>

              <a
                href="/rsvp"
                className="card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
                aria-labelledby="rsvp-title"
                aria-describedby="rsvp-desc"
              >
                <div className="text-center">
                  <div
                    className="w-12 h-12 bg-wedding-sage-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wedding-sage-200 transition-colors"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6 text-wedding-sage-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    id="rsvp-title"
                    className="text-lg font-medium text-wedding-navy-800 mb-2"
                  >
                    RSVP
                  </h3>
                  <p id="rsvp-desc" className="text-sm text-muted">
                    Let us know you're coming
                  </p>
                </div>
              </a>

              <a
                href="/music"
                className="card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-wedding-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wedding-gold-200 transition-colors">
                    <svg
                      className="w-6 h-6 text-wedding-gold-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-wedding-navy-800 mb-2">
                    Music Requests
                  </h3>
                  <p className="text-sm text-muted">
                    Help us create the playlist
                  </p>
                </div>
              </a>

              <a
                href="/registry"
                className="card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-wedding-blush-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wedding-blush-200 transition-colors">
                    <svg
                      className="w-6 h-6 text-wedding-blush-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-wedding-navy-800 mb-2">
                    Registry
                  </h3>
                  <p className="text-sm text-muted">
                    Gift ideas for our new home
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
