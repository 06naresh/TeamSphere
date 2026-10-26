
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  Building2,
} from "lucide-react";

import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import EmployeeForm, {
  type EmployeeFormValues,
} from "../features/employees/components/EmployeeForm";

import EmployeeTable from "../features/employees/components/EmployeeTable";
import { useEmployees } from "../features/employees/EmployeeContext";

import type { EmployeeView } from "../types/employee";

export default function DirectoryPage() {
  // Get employee state and reducer actions from the shared context.
  const { state, dispatch } = useEmployees();

  // Use employees fetched from the API once loading succeeds.
  const employees: EmployeeView[] =
    state.status === "success" ? state.employees : [];

  // Search, filter, and dialog state.
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EmployeeView | undefined>();
  const [deleting, setDeleting] = useState<EmployeeView | undefined>();
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState("");

  // Add an employee to the current application state.
  const addEmployee = async (values: EmployeeFormValues) => {
    const newEmployee: EmployeeView = {
      id: Date.now(),
      displayName: values.displayName,
      email: values.email,
      department: values.department,
      age: 0,
      jobTitle: "Not specified",
      city: "Not specified",
      phone: "",
      avatar: "",
      skills: [],
      manager: null,
    };

    dispatch({
      type: "add",
      employee: newEmployee,
    });
  };

  // Update an existing employee in the current application state.
  const updateEmployee = async (
    id: EmployeeView["id"],
    values: EmployeeFormValues
  ) => {
    dispatch({
      type: "update",
      id,
      changes: {
        displayName: values.displayName,
        email: values.email,
        department: values.department,
      },
    });
  };

  // Delete an employee from the current application state.
  const deleteEmployee = async (id: EmployeeView["id"]) => {
    dispatch({
      type: "delete",
      id,
    });
  };

  // Filter employees by name, email, and department.
  const filteredEmployees = useMemo(() => {
    const term = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesSearch =
        employee.displayName.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term);

      const matchesDepartment =
        department === "All departments" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  // Build department options from the employee data.
  const departmentOptions = useMemo(
    () => [
      "All departments",
      ...new Set(employees.map((employee) => employee.department)),
    ],
    [employees]
  );

  function openAddDialog() {
    setEditing(undefined);
    setPageError("");
    setFormOpen(true);
  }

  function openEditDialog(employee: EmployeeView) {
    setEditing(employee);
    setPageError("");
    setFormOpen(true);
  }

  // Save a new employee or update an existing employee.
  async function handleSave(values: EmployeeFormValues) {
    setBusy(true);
    setPageError("");

    try {
      if (editing) {
        await updateEmployee(editing.id, values);
      } else {
        await addEmployee(values);
      }

      setFormOpen(false);
      setEditing(undefined);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save employee.";

      setPageError(message);
      throw error;
    } finally {
      setBusy(false);
    }
  }

  // Delete the selected employee.
  async function handleDelete() {
    if (!deleting) return;

    setBusy(true);
    setPageError("");

    try {
      await deleteEmployee(deleting.id);
      setDeleting(undefined);
    } catch (error: unknown) {
      setPageError(
        error instanceof Error
          ? error.message
          : "Unable to delete employee."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="page-intro">
        <div>
          <div className="eyebrow">
            <span />
            PEOPLE & CULTURE
          </div>

          <h2>
            Your people, <span>all in one place.</span>
          </h2>

          <p>
            Manage your team, discover employee details, and keep information
            up to date.
          </p>
        </div>

        <button
          className="button button-primary add-button"
          onClick={openAddDialog}
        >
          <Plus size={18} />
          Add employee
        </button>
      </section>

      {/* Loading and API error states */}
      {state.status === "loading" && (
        <p role="status" className="loading-message">
          Loading employees...
        </p>
      )}

      {state.status === "error" && (
        <p className="inline-error" role="alert">
          {state.message}
        </p>
      )}

      <section className="stats-grid">
        <article className="stat-card stat-indigo">
          <div className="stat-top">
            <span>Total employees</span>
            <div className="stat-icon">
              <Users size={20} />
            </div>
          </div>

          <strong>{employees.length}</strong>
          <small>Across your organization</small>
        </article>

        <article className="stat-card stat-emerald">
          <div className="stat-top">
            <span>Active members</span>
            <div className="stat-icon">
              <UserCheck size={20} />
            </div>
          </div>

          <strong>{employees.length}</strong>
          <small>Team members in the directory</small>
        </article>

        <article className="stat-card stat-cyan">
          <div className="stat-top">
            <span>Departments</span>
            <div className="stat-icon">
              <Building2 size={20} />
            </div>
          </div>

          <strong>{Math.max(0, departmentOptions.length - 1)}</strong>
          <small>Unique departments</small>
        </article>
      </section>

      <section className="directory-panel">
        <div className="directory-heading">
          <div>
            <h3>Employee directory</h3>
            <p>Browse and manage your team members.</p>
          </div>

          <span className="count-pill">
            {filteredEmployees.length} people
          </span>
        </div>

        <div className="directory-toolbar">
          <label className="directory-search">
            <Search size={18} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, or department..."
            />
          </label>

          <select
            className="department-select"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Filter by department"
          >
            {departmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {pageError && (
          <p className="inline-error" role="alert">
            {pageError}
          </p>
        )}

        <EmployeeTable
          employees={filteredEmployees}
          onEdit={openEditDialog}
          onDelete={(employee) => {
            setPageError("");
            setDeleting(employee);
          }}
        />
      </section>

      {/* Add and edit employee modal */}
      <Modal
        open={formOpen}
        title={editing ? "Edit employee" : "Add a new employee"}
        description={
          editing
            ? "Update the details for this team member."
            : "Add someone new to your TeamSphere workspace."
        }
        onClose={() => {
          if (!busy) {
            setFormOpen(false);
            setEditing(undefined);
          }
        }}
      >
        <EmployeeForm
          key={editing?.id ?? "new-employee"}
          initialEmployee={editing}
          busy={busy}
          onCancel={() => {
            if (!busy) {
              setFormOpen(false);
              setEditing(undefined);
            }
          }}
          onSubmit={handleSave}
        />
      </Modal>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={Boolean(deleting)}
        employeeName={deleting?.displayName ?? ""}
        busy={busy}
        onCancel={() => {
          if (!busy) {
            setDeleting(undefined);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
