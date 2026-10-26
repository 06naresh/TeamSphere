import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import { useEmployees } from "../features/employees/EmployeeContext";

export default function EmployeeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useEmployees();

  if (state.status === "loading") {
    return <p className="status-panel">Loading employee...</p>;
  }

  if (state.status === "error") {
    return (
      <div className="status-panel">
        <h2>Unable to load the employee</h2>
        <p>{state.message}</p>
        <Link to="/">Return to directory</Link>
      </div>
    );
  }

  const employee = state.employees.find(
    (item) => item.id === Number(id)
  );

  if (!employee) {
    return (
      <div className="status-panel">
        <h2>Employee not found</h2>
        <p>This employee may have been deleted.</p>
        <Link to="/">Return to directory</Link>
      </div>
    );
  }

  return (
    <div className="page details-page">
      <Link className="back-link" to="/">
        ← Back to directory
      </Link>

      <Card className="profile-card">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={employee.avatar}
            alt={employee.displayName}
          />

          <div>
            <p className="eyebrow">EMPLOYEE PROFILE</p>
            <h1>{employee.displayName}</h1>
            <p className="page-description">
              {employee.jobTitle} · {employee.department}
            </p>
          </div>
        </div>

        <div className="profile-grid">
          <div>
            <span>Email</span>
            <strong>{employee.email}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{employee.phone || "Not provided"}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{employee.age}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{employee.department}</strong>
          </div>

          <div>
            <span>Job title</span>
            <strong>{employee.jobTitle}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{employee.city}</strong>
          </div>

          <div>
            <span>Manager</span>
            <strong>{employee.manager ?? "Not assigned"}</strong>
          </div>

          <div>
            <span>Skills</span>
            <strong>
              {employee.skills.length
                ? employee.skills.join(", ")
                : "Not provided"}
            </strong>
          </div>
        </div>

        <Link className="btn btn-primary" to="/">
          Return to directory
        </Link>
      </Card>
    </div>
  );
}