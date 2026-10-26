import type { EmployeeDto, EmployeeView } from "../../types/employee";

export function toEmployeeview(employee:EmployeeDto): EmployeeView {
    return {
        id: employee.id,
        displayName:
            `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        age: employee.age,
        department: employee.company.department,
        jobTitle: employee.company.title,
        city: employee.address.city,
        phone: employee.phone,
        avatar: employee.image,

        skills: [],
        manager: null,
    };
}