import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const defaultMeta = {
  title: "Anson & Brittany's Wedding",
  description:
    "Join us for our wedding celebration on August 15, 2025 in San Francisco, CA",
  image: "/images/og-image.jpg",
  url: "https://anson-brittany-wedding.com",
};

const Head: React.FC<SEOProps> = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
}) => {
  const fullTitle =
    title === defaultMeta.title ? title : `${title} | ${defaultMeta.title}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default Head;
