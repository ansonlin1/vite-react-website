import type { FC } from "react";

/**
 * Event Details page component
 * Displays wedding schedule, venue information, and dress code
 */
const EventDetails: FC = () => {
  // Example schedule data (can be moved to a data file later)
  const schedule = [
    {
      time: "4:00 PM",
      event: "Ceremony",
      description: "Join us as we exchange our vows",
    },
    {
      time: "5:00 PM",
      event: "Cocktail Hour",
      description: "Enjoy drinks and hors d'oeuvres",
    },
    {
      time: "6:00 PM",
      event: "Reception",
      description: "Dinner, dancing, and celebrations",
    },
    {
      time: "11:00 PM",
      event: "Farewell",
      description: "End of evening celebrations",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <section className="text-center">
        <h1 className="text-4xl font-serif mb-4">Event Details</h1>
        <p className="text-xl text-gray-600">
          Join us in celebrating our special day
        </p>
      </section>

      {/* Schedule Section */}
      <section
        className="max-w-4xl mx-auto px-4"
        aria-labelledby="schedule-heading"
      >
        <h2
          id="schedule-heading"
          className="text-3xl font-serif mb-8 text-center"
        >
          Schedule
        </h2>
        <div className="space-y-6">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="md:w-1/4 font-semibold text-xl mb-2 md:mb-0">
                {item.time}
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-serif mb-1">{item.event}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Section */}
      <section className="bg-gray-50 py-12" aria-labelledby="venue-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            id="venue-heading"
            className="text-3xl font-serif mb-8 text-center"
          >
            Venue
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Ceremony & Reception</h3>
              <p className="text-gray-600 mb-4">
                The Grand Venue
                <br />
                123 Wedding Lane
                <br />
                City, State 12345
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Open venue location in Google Maps"
              >
                Get Directions
              </a>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video">
              {/* Placeholder for map - can be replaced with actual map component */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Map will be displayed here
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section
        className="max-w-4xl mx-auto px-4 mb-12"
        aria-labelledby="info-heading"
      >
        <h2 id="info-heading" className="text-3xl font-serif mb-8 text-center">
          Additional Information
        </h2>

        {/* Dress Code */}
        <div className="mb-8">
          <h3 className="text-xl font-serif mb-4">Dress Code</h3>
          <p className="text-gray-600">
            Semi-formal / Cocktail attire
            <br />
            We recommend suits or cocktail dresses in evening colors.
          </p>
        </div>

        {/* Parking */}
        <div className="mb-8">
          <h3 className="text-xl font-serif mb-4">Parking</h3>
          <p className="text-gray-600">
            Complimentary valet parking will be available at the venue entrance.
            Self-parking is also available in the adjacent parking structure.
          </p>
        </div>

        {/* Accommodations */}
        <div>
          <h3 className="text-xl font-serif mb-4">Accommodations</h3>
          <p className="text-gray-600">
            We have arranged special rates at nearby hotels. Please mention the
            wedding when making your reservation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
