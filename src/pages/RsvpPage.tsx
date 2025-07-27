import { useState } from "react";
import FormField from "../components/forms/FormField";
import Head from "../components/seo/Head";

interface FormData {
  name: string;
  email: string;
  attending: string;
  guestCount: string;
  dietaryRestrictions: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const RsvpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    attending: "",
    guestCount: "1",
    dietaryRestrictions: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.attending) {
      newErrors.attending = "Please indicate whether you will attend";
    }

    if (
      formData.attending === "yes" &&
      (!formData.guestCount || parseInt(formData.guestCount) < 1)
    ) {
      newErrors.guestCount = "Please indicate number of guests";
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
      const response = await fetch("http://localhost:3000/api/rsvp/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attending: formData.attending === "yes",
          guestCount: parseInt(formData.guestCount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit RSVP");
      }

      setSubmitStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        attending: "",
        guestCount: "1",
        dietaryRestrictions: "",
        message: "",
      });
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <Head
        title="RSVP"
        description="Please RSVP for Anson and Partner's wedding by June 27, 2025. Let us know if you'll be joining us for our special celebration on December 31, 2025."
        keywords="RSVP, wedding response, guest count, dietary restrictions, wedding attendance"
      />
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-4">RSVP</h1>
          <p className="text-gray-600">
            Please let us know if you'll be joining us on our special day.
            <br />
            Kindly respond by June 27, 2025.
          </p>
        </div>

        {submitStatus === "success" && (
          <div
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md"
            role="alert"
          >
            <p className="text-green-800">
              Thank you for your response! We've received your RSVP.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
            role="alert"
          >
            <p className="text-red-800">
              Sorry, there was an error submitting your RSVP. Please try again.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <FormField
            label="Full Name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            autoComplete="name"
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            autoComplete="email"
          />

          <FormField
            label="Will you attend?"
            name="attending"
            type="select"
            required
            value={formData.attending}
            onChange={handleInputChange}
            error={errors.attending}
            options={[
              { value: "yes", label: "Yes, I will attend" },
              { value: "no", label: "No, I cannot attend" },
            ]}
          />

          {formData.attending === "yes" && (
            <>
              <FormField
                label="Number of Guests (including yourself)"
                name="guestCount"
                type="number"
                required
                min="1"
                max="5"
                value={formData.guestCount}
                onChange={handleInputChange}
                error={errors.guestCount}
              />

              <FormField
                label="Dietary Restrictions"
                name="dietaryRestrictions"
                type="textarea"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="Please let us know of any dietary restrictions or allergies"
              />
            </>
          )}

          <FormField
            label="Message for the Couple"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Optional: Leave a message for the couple"
          />

          <div className="text-center">
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
              {isSubmitting ? "Submitting..." : "Submit RSVP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RsvpPage;
