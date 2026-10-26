import { useMemo, useState } from "react";

import Card from "../components/Card";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm, {
  type EmployeeFormValues,
} from "../components/EmployeeForm";
import GenericList from "../components/GenericList";
import PrimaryButton from "../components/PrimaryButton";
import SearchBox from "../components/SearchBox";

import { getEmployees } from "../lib/api";
import { toEmployeeview } from "../features/employees/employeeMapper";
import { useEmployees } from "../features/employees/EmployeeContext";

import type {
  EmployeeView,
  NewEmployee,
} from "../types/employee";

export default function DirectoryPage() {
  const { state, dispatch } = useEmployees();

  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState<EmployeeView | undefined>(undefined);

  const employees =
    state.status === "success" ? state.employees : [];

  const departments = useMemo(
    () => [
      "All",
      ...new Set(employees.map((employee) => employee.department)),
    ],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch = [
        employee.displayName,
        employee.email,
        employee.jobTitle,
        employee.department,
      ].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, query, department]);

  function openAddForm() {
    setEditingEmployee(undefined);
    setFormOpen(true);
  }

  function handleEdit(employee: EmployeeView) {
    setEditingEmployee(employee);
    setFormOpen(true);
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmed) {
      dispatch({ type: "delete", id });
    }
  }

  function handleSave(values: EmployeeFormValues) {
    const employeeFields: NewEmployee = {
      displayName: values.displayName.trim(),
      email: values.email.trim(),
      age: Number(values.age),
      department: values.department,
      jobTitle: values.jobTitle.trim(),
      city: values.city.trim(),
      phone: values.phone.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        values.displayName
      )}`,
      skills: [],
      manager: null,
    };

    if (editingEmployee) {
      dispatch({
        type: "update",
        id: editingEmployee.id,
        changes: employeeFields,
      });
    } else {

      dispatch({
        type: "add",
        employee: {
          ...employeeFields,
          id: Date.now(),
        },
      });
    }

    setFormOpen(false);
    setEditingEmployee(undefined);
  }

  async function handleRetry() {
    dispatch({ type: "load-start" });

    try {
      const data = await getEmployees();

      dispatch({
        type: "load-success",
        employees: data.map(toEmployeeview),
      });
    } catch (error: unknown) {
      dispatch({
        type: "load-error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to load employees.",
      });
    }
  }

  if (state.status === "loading") {
    return (
      <div className="status-panel">
        <div className="spinner" />
        <h2>Loading employees...</h2>
        <p>Fetching the employee directory.</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="status-panel">
        <h2>We couldn't load employees</h2>
        <p>{state.message}</p>
        <PrimaryButton onClick={() => void handleRetry()}>
          Try again
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">PEOPLE OPERATIONS</p>
          <h1>Employee directory</h1>
          <p className="page-description">
            Manage your people, discover teams, and keep
            employee information organized.
          </p>
        </div>

        <PrimaryButton onClick={openAddForm}>
          + Add employee
        </PrimaryButton>
      </section>

      <section className="stats-grid">
        <Card>
          <p className="stat-label">Total employees</p>
          <h2 className="stat-value">{employees.length}</h2>
          <p className="stat-note">In your directory</p>
        </Card>

        <Card>
          <p className="stat-label">Departments</p>
          <h2 className="stat-value">
            {departments.length - 1}
          </h2>
          <p className="stat-note">Teams represented</p>
        </Card>

        <Card>
          <p className="stat-label">Search results</p>
          <h2 className="stat-value">
            {filteredEmployees.length}
          </h2>
          <p className="stat-note">
            Matching your current filters
          </p>
        </Card>
      </section>

      {formOpen && (
        <Card className="form-card">
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSave}
            onCancel={() => {
              setFormOpen(false);
              setEditingEmployee(undefined);
            }}
          />
        </Card>
      )}

      <Card className="directory-panel">
        <div className="directory-toolbar">
          <div>
            <h2>All employees</h2>
            <p>Search, filter, and manage your team.</p>
          </div>

          <div className="filter-controls">
            <SearchBox onSearch={setQuery} />

            <select
              className="input department-select"
              value={department}
              aria-label="Filter by department"
              onChange={(event) =>
                setDepartment(event.currentTarget.value)
              }
            >
              {departments.map((name) => (
                <option key={name} value={name}>
                  {name === "All" ? "All departments" : name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <GenericList
          items={filteredEmployees}
          getkey={(employee) => employee.id}
          emptyMessage="No employees match your search."
          renderItem={(employee) => (
            <EmployeeCard
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />
      </Card>
    </div>
  );
}