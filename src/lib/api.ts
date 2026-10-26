import { employeeResponseSchema, type EmployeeDto } from "../types/employee";


const API_URL = import.meta.env.VITE_API_URL;

export async function getJson<T>(url:string): Promise<T> {
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
}

export async function getEmployees(): Promise<EmployeeDto[]> {
    const response = await getJson<unknown>(API_URL);

    // validate the response
    const parsed = employeeResponseSchema.parse(response);

    return parsed.users;
}