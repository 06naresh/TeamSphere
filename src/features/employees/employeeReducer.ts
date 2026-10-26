import type { EmployeeUpdate, EmployeeView, RequestState } from "../../types/employee";


export type EmployeeAction =
    | { type: "load-start" }
    | {
        type: "load-success";
        employees: EmployeeView[];
    }
    | { type: "load-error"; message: string }
    | { type: "add"; employee: EmployeeView }
    | {
        type: "update";
        id: number;
        changes: EmployeeUpdate;
    }
    | { type: "delete"; id: number };


export function employeeReducer(state: RequestState, action: EmployeeAction): RequestState {
    switch (action.type) {
        case "load-start":
            return { status: "loading" };

        case "load-success":
            return { status: "success", employees: action.employees, };

        case "load-error":
            return { status: "error", message: action.message, };

        case "add":
            if (state.status !== "success") return state;

            return {
                ...state,
                employees: [...state.employees, action.employee],
            };

        case "update":
            if (state.status !== "success") return state;

            return {
                ...state,
                employees: state.employees.map((employee) =>
                    employee.id === action.id
                        ? { ...employee, ...action.changes }
                        : employee
                ),
            };

        case "delete":
            if (state.status !== "success") return state;

            return {
                ...state,
                employees: state.employees.filter((employee) => employee.id !== action.id),
            };

        default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck
        }
    }
}