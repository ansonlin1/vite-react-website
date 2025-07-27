import { useState, useEffect } from "react";
import FormField from "../components/forms/FormField";
import Head from "../components/seo/Head";

interface SongRequest {
  id: number;
  songTitle: string;
  artist: string;
  requestedBy: string;
  createdAt: string;
  addedToPlaylist: boolean;
}

interface FormData {
  songTitle: string;
  artist: string;
}

interface FormErrors {
  [key: string]: string;
}

const MusicRequestPage = () => {
  const [formData, setFormData] = useState<FormData>({
    songTitle: "",
    artist: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSongRequests();
  }, []);

  const fetchSongRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/music/list");
      if (!response.ok) throw new Error("Failed to fetch song requests");
      const data = await response.json();
      setSongRequests(data);
    } catch (error) {
      console.error("Error fetching song requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.songTitle.trim()) {
      newErrors.songTitle = "Song title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3000/api/music/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit song request");
      }

      setSubmitStatus("success");
      // Reset form
      setFormData({
        songTitle: "",
        artist: "",
      });
      // Refresh song list
      fetchSongRequests();
    } catch (error) {
      console.error("Song request error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <Head
        title="Music Requests"
        description="Help create the perfect wedding playlist! Request your favorite songs for Anson and Partner's reception. View all song requests and help make their special day unforgettable."
        keywords="music requests, wedding playlist, song requests, reception music, dance songs, wedding entertainment"
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-4">Music Requests</h1>
          <p className="text-gray-600">
            Help us create the perfect playlist for our special day!
            <br />
            Request your favorite songs below.
          </p>
        </div>

        {submitStatus === "success" && (
          <div
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md"
            role="alert"
          >
            <p className="text-green-800">
              Thank you! Your song request has been submitted.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
            role="alert"
          >
            <p className="text-red-800">
              Sorry, there was an error submitting your request. Please try
              again.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-12 max-w-lg mx-auto"
          noValidate
        >
          <FormField
            label="Song Title"
            name="songTitle"
            type="text"
            required
            value={formData.songTitle}
            onChange={handleInputChange}
            error={errors.songTitle}
            placeholder="Enter the song title"
          />

          <FormField
            label="Artist"
            name="artist"
            type="text"
            value={formData.artist}
            onChange={handleInputChange}
            error={errors.artist}
            placeholder="Enter the artist name (optional)"
          />

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
              px-6 py-2 rounded-md text-white font-medium
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }
            `}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-serif mb-6 text-center">
            Requested Songs
          </h2>
          {isLoading ? (
            <p className="text-center text-gray-600">
              Loading song requests...
            </p>
          ) : songRequests.length === 0 ? (
            <p className="text-center text-gray-600">
              No songs have been requested yet. Be the first!
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {songRequests.map((song) => (
                <div
                  key={song.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <h3 className="font-medium text-gray-900">
                    {song.songTitle}
                  </h3>
                  {song.artist && (
                    <p className="text-gray-600 text-sm mt-1">
                      by {song.artist}
                    </p>
                  )}
                  {song.requestedBy && (
                    <p className="text-gray-500 text-sm mt-2">
                      Requested by {song.requestedBy}
                    </p>
                  )}
                  {song.addedToPlaylist && (
                    <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Added to playlist
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicRequestPage;
