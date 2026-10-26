import React, { useState } from "react";
import type { EmployeeView } from "../types/employee";
import PrimaryButton from "./PrimaryButton";

export interface EmployeeFormValues {
    displayName: string;
    email: string;
    age: string;
    department: string;
    jobTitle: string;
    city: string;
    phone: string;
}

interface EmployeeFormProps {
    employee?: EmployeeView;
    onSave: (values: EmployeeFormValues) => void;
    onCancel: () => void;
}

type FormErrors = Partial<Record<keyof EmployeeFormValues, string>>;

export default function EmployeeForm({
    employee,
    onSave,
    onCancel,
}: EmployeeFormProps) {
    const [values, setValues] = useState<EmployeeFormValues>({
        displayName: employee?.displayName ?? "",
        email: employee?.email ?? "",
        age: employee ? String(employee.age) : "",
        department: employee?.department ?? "Engineering",
        jobTitle: employee?.jobTitle ?? "",
        city: employee?.city ?? "",
        phone: employee?.phone ?? "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const {name, value} = event.currentTarget;
        const field = name as keyof EmployeeFormValues;

        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const nextErrors: FormErrors = {};

        if(!values.displayName.trim()){
            nextErrors.displayName = "Name is required.";
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if(!values.age || Number(values.age) < 10){
            nextErrors.email = "Enter an age of at least 18.";
        }

        if(!values.jobTitle.trim()) {
            nextErrors.jobTitle = "Job title is required.";
        }

        if(!values.city.trim()) {
            nextErrors.city = "City is required.";
        }

        setErrors(nextErrors);

        if(Object.keys(nextErrors).length > 0) return;

        onSave(values);
    }

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <div className="form-heading">
                <div>
                    <h2>
                        {employee ? "Edit employee" : "Add employee"}
                    </h2>
                    <p>Enter the employee information below.</p>
                </div>

                <button className="icon-button" type="button" onClick={onCancel} aria-label="Close form">
                    ×
                </button>
            </div>

            <div className="form-grid">
        <label className="field">
          Full name
          <input
            className="input"
            name="displayName"
            value={values.displayName}
            onChange={handleChange}
          />
          {errors.displayName && (
            <span className="error-text">
              {errors.displayName}
            </span>
          )}
        </label>

        <label className="field">
          Email
          <input
            className="input"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </label>

        <label className="field">
          Age
          <input
            className="input"
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
          />
          {errors.age && (
            <span className="error-text">{errors.age}</span>
          )}
        </label>

        <label className="field">
          Department
          <select
            className="input"
            name="department"
            value={values.department}
            onChange={handleChange}
          >
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Design</option>
            <option>Support</option>
          </select>
        </label>

        <label className="field">
          Job title
          <input
            className="input"
            name="jobTitle"
            value={values.jobTitle}
            onChange={handleChange}
          />
          {errors.jobTitle && (
            <span className="error-text">
              {errors.jobTitle}
            </span>
          )}
        </label>

        <label className="field">
          City
          <input
            className="input"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
          {errors.city && (
            <span className="error-text">{errors.city}</span>
          )}
        </label>

        <label className="field full-width">
          Phone
          <input
            className="input"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={onCancel}
        >
          Cancel
        </button>

        <PrimaryButton type="submit">
          {employee ? "Save changes" : "Add employee"}
        </PrimaryButton>
      </div>
        </form>
    )
}