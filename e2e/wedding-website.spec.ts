import { test, expect } from "@playwright/test";

test.describe("Wedding Website E2E Tests", () => {
  test("homepage loads and displays key elements", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/Anson & Partner/);

    // Check main heading
    await expect(
      page.getByRole("heading", { name: /Anson & Partner/i })
    ).toBeVisible();

    // Check navigation menu
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "RSVP" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Event Details" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Music Requests" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Registry" })).toBeVisible();

    // Check hero section
    await expect(page.getByText(/Join us for our special day/i)).toBeVisible();

    // Check quick links
    await expect(page.getByText(/RSVP Today/i)).toBeVisible();
    await expect(page.getByText(/Event Details/i)).toBeVisible();
    await expect(page.getByText(/Music Requests/i)).toBeVisible();
  });

  test("navigation works correctly", async ({ page }) => {
    await page.goto("/");

    // Test RSVP navigation
    await page.getByRole("link", { name: "RSVP" }).click();
    await expect(page).toHaveURL("/rsvp");
    await expect(page.getByRole("heading", { name: /RSVP/i })).toBeVisible();

    // Test Event Details navigation
    await page.getByRole("link", { name: "Event Details" }).click();
    await expect(page).toHaveURL("/details");
    await expect(
      page.getByRole("heading", { name: /Event Details/i })
    ).toBeVisible();

    // Test Music Requests navigation
    await page.getByRole("link", { name: "Music Requests" }).click();
    await expect(page).toHaveURL("/music");
    await expect(
      page.getByRole("heading", { name: /Music Requests/i })
    ).toBeVisible();

    // Test Registry navigation
    await page.getByRole("link", { name: "Registry" }).click();
    await expect(page).toHaveURL("/registry");
    await expect(
      page.getByRole("heading", { name: /Registry/i })
    ).toBeVisible();

    // Test back to home
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("RSVP form functionality", async ({ page }) => {
    await page.goto("/rsvp");

    // Fill out the form
    await page.getByLabel(/Name/i).fill("John Doe");
    await page.getByLabel(/Email/i).fill("john.doe@example.com");
    await page.getByLabel(/Phone/i).fill("555-123-4567");
    await page.getByLabel(/Number of Guests/i).fill("2");
    await page.getByLabel(/Dietary Restrictions/i).fill("Vegetarian");

    // Submit the form
    await page.getByRole("button", { name: /Submit RSVP/i }).click();

    // Check for success message or confirmation
    await expect(page.getByText(/Thank you/i)).toBeVisible();
  });

  test("music request form functionality", async ({ page }) => {
    await page.goto("/music");

    // Fill out music request form
    await page.getByLabel(/Your Name/i).fill("Jane Smith");
    await page.getByLabel(/Song Title/i).fill("Perfect");
    await page.getByLabel(/Artist/i).fill("Ed Sheeran");
    await page.getByLabel(/Special Message/i).fill("Our favorite song!");

    // Submit the form
    await page.getByRole("button", { name: /Submit Request/i }).click();

    // Check for success message
    await expect(page.getByText(/Thank you/i)).toBeVisible();
  });

  test("mobile responsiveness", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile menu button is visible
    await expect(page.getByRole("button", { name: /menu/i })).toBeVisible();

    // Open mobile menu
    await page.getByRole("button", { name: /menu/i }).click();

    // Check navigation links are visible in mobile menu
    await expect(page.getByRole("link", { name: "RSVP" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Event Details" })
    ).toBeVisible();
  });

  test("accessibility features", async ({ page }) => {
    await page.goto("/");

    // Check for skip link
    await expect(page.getByText(/Skip to main content/i)).toBeVisible();

    // Check heading hierarchy
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    // Check alt text on images
    const images = page.getByRole("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      await expect(images.nth(i)).toHaveAttribute("alt");
    }

    // Check form labels
    await page.goto("/rsvp");
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
  });

  test("SEO elements are present", async ({ page }) => {
    await page.goto("/");

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content");

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content");

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute("content");

    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeAttached();
  });
});
