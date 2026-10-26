
import { useState, type FormEvent } from "react";
import { z } from "zod";
import type { EmployeeView } from "../../../types/employee";

const employeeFormSchema = z.object({
  displayName: z.string().trim().min(2, "Enter at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  department: z.string().trim().min(1, "Choose a department."),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

type EmployeeFormProps = {
  initialEmployee?: EmployeeView;
  busy?: boolean;
  onCancel: () => void;
  onSubmit: (values: EmployeeFormValues) => Promise<void>;
};

const departments = [
  "Engineering",
  "Design",
  "Human Resources",
  "Marketing",
  "Finance",
  "Operations",
];

export default function EmployeeForm({
  initialEmployee,
  busy = false,
  onCancel,
  onSubmit,
}: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeFormValues>({
    displayName: initialEmployee?.displayName ?? "",
    email: initialEmployee?.email ?? "",
    department: initialEmployee?.department ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof EmployeeFormValues, string>>
  >({});
  const [serverError, setServerError] = useState("");

  function updateField(
    field: keyof EmployeeFormValues,
    value: string
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = employeeFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: typeof errors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof EmployeeFormValues;
        nextErrors[field] ??= issue.message;
      }

      setErrors(nextErrors);
      return;
    }

    setServerError("");

    try {
      await onSubmit(result.data);
      // The parent closes the modal only after this promise succeeds.
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to save this employee. Please try again."
      );
    }
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="employee-name">Full name</label>
        <input
          id="employee-name"
          autoFocus
          value={values.displayName}
          onChange={(event) =>
            updateField("displayName", event.target.value)
          }
          placeholder="e.g. Alex Morgan"
          aria-invalid={Boolean(errors.displayName)}
        />
        {errors.displayName && (
          <span className="field-error">{errors.displayName}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-email">Work email</label>
        <input
          id="employee-email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="alex@company.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <span className="field-error">{errors.email}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-department">Department</label>
        <select
          id="employee-department"
          value={values.department}
          onChange={(event) =>
            updateField("department", event.target.value)
          }
          aria-invalid={Boolean(errors.department)}
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && (
          <span className="field-error">{errors.department}</span>
        )}
      </div>

      {serverError && (
        <p className="form-server-error" role="alert">
          {serverError}
        </p>
      )}

      <div className="dialog-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </button>

        <button className="button button-primary" type="submit" disabled={busy}>
          {busy
            ? "Saving..."
            : initialEmployee
              ? "Save changes"
              : "Add employee"}
        </button>
      </div>
    </form>
  );
}
