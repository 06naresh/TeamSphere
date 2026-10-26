
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Building2, Hash, Pencil } from "lucide-react";
import type { EmployeeView } from "../types/employee";

// Connect this to your existing EmployeeContext hook.
export default function EmployeeDetailsPage() {
  const { employeeId } = useParams<{ employeeId: string }>();

  /*
   * Replace with your existing hook:
   * const { employees } = useEmployees();
   */
  const employees: EmployeeView[] = [];

  const employee = employees.find(
    (item) => String(item.id) === employeeId
  );

  if (!employee) {
    return (
      <section className="not-found-panel">
        <div className="not-found-symbol">?</div>
        <h2>Employee not found</h2>
        <p>This employee may have been removed or the URL may be incorrect.</p>
        <Link to="/employees" className="button button-primary">
          <ArrowLeft size={17} /> Back to directory
        </Link>
      </section>
    );
  }

  const initials = employee.displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="employee-detail-page">
      <Link to="/employees" className="back-link">
        <ArrowLeft size={17} /> Back to employees
      </Link>

      <section className="profile-hero">
        <div className="profile-hero-decoration" />
        <div className="profile-large-avatar">{initials}</div>

        <div className="profile-hero-copy">
          <span className="profile-eyebrow">TEAM MEMBER PROFILE</span>
          <h2>{employee.displayName}</h2>
          <p>{employee.department}</p>
          <span className="status-pill status-pill-light">
            <span /> Active employee
          </span>
        </div>

        <div className="profile-hero-actions">
          <span className="employee-id-label">EMPLOYEE ID</span>
          <strong>#{employee.id}</strong>
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-section-heading">
          <div>
            <span className="eyebrow">EMPLOYEE INFORMATION</span>
            <h3>Personal workspace</h3>
            <p>Key information associated with this team member.</p>
          </div>
        </div>

        <div className="detail-info-grid">
          <article className="detail-info-item">
            <div className="detail-icon detail-icon-purple"><Mail size={20} /></div>
            <div>
              <span>Work email</span>
              <strong>{employee.email}</strong>
            </div>
          </article>

          <article className="detail-info-item">
            <div className="detail-icon detail-icon-cyan"><Building2 size={20} /></div>
            <div>
              <span>Department</span>
              <strong>{employee.department}</strong>
            </div>
          </article>

          <article className="detail-info-item">
            <div className="detail-icon detail-icon-orange"><Hash size={20} /></div>
            <div>
              <span>Employee ID</span>
              <strong>#{employee.id}</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="detail-note">
        <div>
          <h3>Employee record</h3>
          <p>This profile is part of your TeamSphere employee directory.</p>
        </div>
        <Link to="/employees" className="button button-secondary">
          <Pencil size={16} /> Manage in directory
        </Link>
      </section>
    </div>
  );
}
