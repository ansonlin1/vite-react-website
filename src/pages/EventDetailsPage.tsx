import { useState } from "react";
import Head from "../components/seo/Head";

interface Event {
  time: string;
  title: string;
  description: string;
}

interface Venue {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  parkingInfo: string;
  directions: string[];
}

const schedule: Event[] = [
  {
    time: "3:30 PM",
    title: "Guest Arrival",
    description:
      "Please arrive early to be seated comfortably before the ceremony begins",
  },
  {
    time: "4:00 PM",
    title: "Ceremony",
    description: "Join us as we exchange vows in the garden",
  },
  {
    time: "4:45 PM",
    title: "Cocktail Hour",
    description: "Enjoy drinks and hors d'oeuvres while we take photos",
  },
  {
    time: "6:00 PM",
    title: "Reception & Dinner",
    description: "Celebrate with dinner, dancing, and festivities",
  },
  {
    time: "10:00 PM",
    title: "Farewell",
    description: "Thank you for sharing our special day",
  },
];

const venue: Venue = {
  name: "San Francisco Botanical Garden",
  address: "1199 9th Ave, San Francisco, CA 94122",
  coordinates: {
    lat: 37.7669,
    lng: -122.4703,
  },
  parkingInfo:
    "Parking is available in the nearby Music Concourse Garage. Street parking is also available along Martin Luther King Jr. Drive and Lincoln Way.",
  directions: [
    "From Downtown SF: Take Muni N-Judah outbound to 9th & Irving",
    "From East Bay: Take BART to Montgomery, then transfer to N-Judah",
    "From South Bay: Take Caltrain to 4th & King, then Muni N-Judah",
    "From North Bay: Take Golden Gate Transit to SF, then transfer to N-Judah",
  ],
};

const EventDetailsPage = () => {
  const [selectedMapOption, setSelectedMapOption] = useState<
    "google" | "apple"
  >("google");

  const getDirectionsUrl = () => {
    const { lat, lng } = venue.coordinates;
    if (selectedMapOption === "google") {
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    }
    return `http://maps.apple.com/?daddr=${lat},${lng}`;
  };

  return (
    <>
      <Head
        title="Event Details"
        description="Complete schedule and venue information for Anson and Partner's wedding on December 31, 2025 at San Francisco Botanical Garden. Find ceremony times, reception details, and directions."
        keywords="wedding schedule, venue details, ceremony time, reception, San Francisco Botanical Garden, directions, parking"
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-center mb-12">Event Details</h1>

        {/* Schedule Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif mb-6">Schedule of Events</h2>
          <div className="space-y-8">
            {schedule.map((event, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="sm:w-32 font-medium text-gray-900">
                  {event.time}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Venue Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif mb-6">Venue</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-xl mb-2">{venue.name}</h3>
              <p className="text-gray-600 mb-4">{venue.address}</p>

              {/* Map */}
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  title="Venue Map"
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${encodeURIComponent(
                    venue.address
                  )}`}
                  className="w-full h-full rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Directions Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => setSelectedMapOption("google")}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    selectedMapOption === "google"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Google Maps
                </button>
                <button
                  onClick={() => setSelectedMapOption("apple")}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    selectedMapOption === "apple"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Apple Maps
                </button>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 rounded-md bg-gray-800 text-white text-center hover:bg-gray-700"
                >
                  Get Directions
                </a>
              </div>

              {/* Parking Info */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Parking Information</h4>
                <p className="text-gray-600">{venue.parkingInfo}</p>
              </div>

              {/* Public Transit */}
              <div>
                <h4 className="font-medium mb-2">Public Transit Directions</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {venue.directions.map((direction, index) => (
                    <li key={index}>{direction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section>
          <h2 className="text-2xl font-serif mb-6">Additional Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-medium text-xl mb-4">Dress Code</h3>
              <p className="text-gray-600">
                Semi-formal / Cocktail attire. The ceremony and reception will
                be held outdoors, so please dress comfortably and consider
                appropriate footwear for garden paths.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-medium text-xl mb-4">Weather</h3>
              <p className="text-gray-600">
                San Francisco weather can be unpredictable. The ceremony and
                reception areas are covered, but we recommend bringing a light
                jacket for the evening.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventDetailsPage;
