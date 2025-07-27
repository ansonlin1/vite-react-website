import React from "react";
import Head from "../components/seo/Head";

interface RegistryItem {
  name: string;
  url: string;
  logo: string;
  description: string;
}

const registries: RegistryItem[] = [
  {
    name: "Crate & Barrel",
    url: "https://www.crateandbarrel.com/gift-registry",
    logo: "/images/registries/crate-and-barrel.svg",
    description: "Home decor, furniture, and kitchen essentials",
  },
  {
    name: "Amazon",
    url: "https://www.amazon.com/wedding/registry",
    logo: "/images/registries/amazon.svg",
    description: "Wide variety of items for our new home",
  },
  {
    name: "Honeyfund",
    url: "https://www.honeyfund.com",
    logo: "/images/registries/honeyfund.svg",
    description: "Help us create memories on our honeymoon",
  },
];

const RegistryPage = () => {
  return (
    <>
      <Head
        title="Gift Registry"
        description="Browse Anson and Partner's wedding registry. Find the perfect gift from their carefully curated selection at Crate & Barrel, Amazon, and Honeyfund."
        keywords="wedding registry, gifts, Crate and Barrel, Amazon, Honeyfund, wedding presents, gift ideas"
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif mb-4">Gift Registry</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for thinking of us! We've registered at these stores to
            make gift-giving easier. Your presence at our wedding is the
            greatest gift of all, but if you'd like to help us celebrate with a
            present, we've registered at the following places.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {registries.map((registry) => (
            <a
              key={registry.name}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-16 flex items-center justify-center mb-4">
                <img
                  src={registry.logo}
                  alt={`${registry.name} logo`}
                  className="max-h-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">
                {registry.name}
              </h2>
              <p className="text-gray-600 text-center text-sm">
                {registry.description}
              </p>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center text-sm font-medium text-gray-700">
                  View Registry
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">
            Don't feel obligated to choose from our registries. A card with your
            warm wishes is just as meaningful to us.
          </p>
          <p className="text-sm">
            Having trouble with a registry?{" "}
            <a href="#contact" className="text-gray-800 underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistryPage;
