
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { EmployeeView } from "../../../types/employee";

type EmployeeTableProps = {
  employees: EmployeeView[];
  onEdit: (employee: EmployeeView) => void;
  onDelete: (employee: EmployeeView) => void;
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const avatarColors = [
  "avatar-purple",
  "avatar-blue",
  "avatar-teal",
  "avatar-orange",
  "avatar-pink",
];

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✦</div>
        <h3>No employees found</h3>
        <p>Try a different search or add a new team member.</p>
      </div>
    );
  }

  return (
    <div className="employee-table-wrap">
      <table className="employee-table">
        <thead>
          <tr>
            <th>EMPLOYEE</th>
            <th>DEPARTMENT</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th className="actions-heading">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-identity">
                  <div
                    className={`employee-avatar ${
                      avatarColors[index % avatarColors.length]
                    }`}
                  >
                    {initials(employee.displayName)}
                  </div>

                  <div className="employee-identity-copy">
                    <strong>{employee.displayName}</strong>
                    <span>Employee #{employee.id}</span>
                  </div>
                </div>
              </td>

              <td>
                <span className="department-pill">
                  {employee.department}
                </span>
              </td>

              <td className="email-cell">{employee.email}</td>

              <td>
                <span className="status-pill">
                  <span />
                  Active
                </span>
              </td>

              <td>
                <div className="row-actions">
                  <Link
                    className="action-icon action-view"
                    to={`/employees/${employee.id}`}
                    title="View employee"
                    aria-label={`View ${employee.displayName}`}
                  >
                    <Eye size={17} />
                  </Link>

                  <button
                    className="action-icon action-edit"
                    type="button"
                    title="Edit employee"
                    aria-label={`Edit ${employee.displayName}`}
                    onClick={() => onEdit(employee)}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="action-icon action-delete"
                    type="button"
                    title="Delete employee"
                    aria-label={`Delete ${employee.displayName}`}
                    onClick={() => onDelete(employee)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
