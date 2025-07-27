import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FormField from "../components/forms/FormField";

describe("FormField Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input field with label", () => {
    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={() => {}}
      />
    );

    // The label should be connected to the input via htmlFor
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("displays error message when provided", () => {
    const errorMessage = "This field is required";

    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={() => {}}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChange when input value changes", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders textarea when type is textarea", () => {
    render(
      <FormField
        label="Message"
        type="textarea"
        id="message"
        name="message"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
  });

  it("renders select when type is select", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(
      <FormField
        label="Select Option"
        type="select"
        id="select-input"
        name="select"
        value=""
        onChange={() => {}}
        options={options}
      />
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("applies wedding-themed styling", () => {
    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("form-field");
  });

  it("shows required indicator when field is required", () => {
    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });

  it("applies disabled state correctly", () => {
    render(
      <FormField
        label="Test Label"
        type="text"
        id="test-input"
        name="test"
        value=""
        onChange={() => {}}
        disabled
      />
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
