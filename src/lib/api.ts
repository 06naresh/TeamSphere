import type { EmployeeDto } from "../types/employee";

interface UsersResponse {
  users: EmployeeDto[];
  total: number;
  skip: number;
  limit: number;
}

const API_URL =
  import.meta.env.VITE_API_URL ??
  "https://dummyjson.com/users?limit=20&skip=20";

export async function getEmployees(): Promise<EmployeeDto[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch employees: ${response.status}`);
  }

  const data: UsersResponse = await response.json();

  return data.users;
}