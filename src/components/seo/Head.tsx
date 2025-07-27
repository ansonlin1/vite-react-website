import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * SEO Head component using react-helmet-async
 * Provides proper meta tags, Open Graph, and Twitter Card metadata
 */
const Head: React.FC<HeadProps> = ({
  title,
  description = "Join Anson and Partner as they celebrate their wedding on December 31, 2025. RSVP, view event details, and help create the perfect playlist for their special day.",
  keywords = "wedding, Anson, Partner, December 2025, RSVP, celebration, music requests, event details, registry",
  image = "/assets/images/wedding-og-image.jpg",
  url,
  type = "website",
  noIndex = false,
}) => {
  const siteTitle = "Anson & Partner's Wedding";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Anson Lin" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#e4935a" />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@ansonlin" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data for Wedding Event */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Anson & Partner's Wedding",
          description: description,
          startDate: "2025-12-31T16:00:00-08:00",
          endDate: "2025-12-31T23:00:00-08:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "San Francisco Botanical Garden",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1199 9th Ave",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94122",
              addressCountry: "US",
            },
          },
          organizer: {
            "@type": "Person",
            name: "Anson & Partner",
          },
          url: currentUrl,
          image: image,
        })}
      </script>
    </Helmet>
  );
};

export default Head;
