import type { FC, InputHTMLAttributes } from "react";

interface FormFieldProps
  extends InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  label: string;
  name: string;
  type: "text" | "email" | "number" | "textarea" | "select";
  error?: string;
  options?: { value: string; label: string }[];
  helpText?: string;
}

/**
 * Reusable form field component with built-in accessibility and error handling
 * Styled with wedding theme colors and proper focus states
 */
const FormField: FC<FormFieldProps> = ({
  label,
  name,
  type,
  error,
  options,
  required,
  helpText,
  className = "",
  ...props
}) => {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const baseClassName = `form-field ${
    error ? "border-red-400 focus:ring-red-500" : ""
  } ${className}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-wedding-navy-800 dark:text-wedding-ivory-200"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          className={`${baseClassName} min-h-[120px] resize-y`}
          aria-describedby={
            [error ? errorId : undefined, helpText ? helpId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={error ? "true" : "false"}
          required={required}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          className={`${baseClassName} cursor-pointer`}
          aria-describedby={
            [error ? errorId : undefined, helpText ? helpId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={error ? "true" : "false"}
          required={required}
          {...props}
        >
          <option value="" className="text-wedding-navy-400">
            Please select...
          </option>
          {options?.map(({ value, label }) => (
            <option key={value} value={value} className="text-wedding-navy-800">
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={baseClassName}
          aria-describedby={
            [error ? errorId : undefined, helpText ? helpId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={error ? "true" : "false"}
          required={required}
          {...props}
        />
      )}

      {helpText && !error && (
        <p id={helpId} className="text-xs text-muted">
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600 flex items-center"
          role="alert"
        >
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
