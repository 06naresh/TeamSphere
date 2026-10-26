import type { EmployeeView } from "../types/employee";
import Action from "./Action";
import Card from "./Card";
import PrimaryButton from "./PrimaryButton";

interface EmployeeCardProps {
    employee: EmployeeView;
    onEdit: (employee: EmployeeView) => void;
    onDelete: (id: number) => void;
}

export default function EmployeeCard({
    employee, onEdit, onDelete,
}: EmployeeCardProps) {
    const initials = employee.displayName.split(" ").map((part) => part[0] ?? "").join("").slice(0,2).toUpperCase();


    return (
        <Card className="employee-card">
            <div className="employee-card-top">
                <img src={employee.avatar} alt={employee.displayName} className="avatar" />

                <div className="employee-identity">
                    <h3>{employee.displayName}</h3>
                    <p>{employee.jobTitle}</p>
                </div>

                <span className="initials" title="Employee initials">
                    {initials}
                </span>
            </div>

            <div className="employee-meta">
                <p>
                    <span>Department</span>
                    <strong>{employee.department}</strong>
                </p>
                <p>
                    <span>Email</span>
                    <strong className="truncate">{employee.email}</strong>
                </p>
                <p>
                    <span>Location</span>
                    <strong>{employee.city}</strong>
                </p>
            </div>

            <div className="employee-actions">
                <Action
                    kind="link"
                    href={`/employees/${employee.id}`}
                    label="View profile"
                />

                <PrimaryButton
                    type="button"
                    onClick={() => onEdit(employee)}
                >
                    Edit
                </PrimaryButton>

                <PrimaryButton
                    type="button"
                    className="btn-danger"
                    onClick={() => onDelete(employee.id)}
                >
                    Delete
                </PrimaryButton>
            </div>
        </Card>
    );
}