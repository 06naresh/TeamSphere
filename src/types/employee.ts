import type { ReactNode } from "react";
import { z } from "zod";


// Nested API object.
export interface EmployeeAddress {
    city: string;
    state: string;
}

export interface EmployeeCompany {
    department: string;
    title: string;
}

// Shape returned by the API.
export interface EmployeeDto {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    image: string;
    company: EmployeeCompany;
    address: EmployeeAddress;
}


// Runtime validation schema for an API - zod
export const employeeDtoSchema: z.ZodType<EmployeeDto> = z.object ({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string().email(),
    phone: z.string(),
    image: z.string(),
    company: z.object({
        department: z.string(),
        title: z.string(),
    }),
    address: z.object({
        city: z.string(),
        state: z.string(),
    }),
});

export const employeeResponseSchema = z.object({
    users: z.array(employeeDtoSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});


// Shape used by react component 
export interface EmployeeView {
    id: number;
    displayName: string;
    email: string;
    age: number;
    department: string;
    jobTitle: string;
    city: string;
    phone: string;
    avatar: string;
    skills: string[];
    manager: string | null;
}


// New records do not have an ID yet.
export type NewEmployee = Omit<EmployeeView, "id">;

// while update cannot chnage the employee ID
export type EmployeeUpdate = Partial<Omit<EmployeeView, "id">>;

// A smaller type for compact directory rows.
export type EmployeeSummary = Pick<EmployeeView, "id" | "displayName">;

// Every property required.
export type CompleteEmployee = Required<EmployeeView>;

// State of employee request.
export type RequestState = 
    | {status: "loading"}
    | {status: "error"; message: string }
    | {
        status: "success";
        employees: EmployeeView[];
       };

export interface CardProps {
    title?: string;
    children?: ReactNode;
}