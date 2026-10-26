import type React from "react";
import type { RequestState } from "../../types/employee";
import { employeeReducer, type EmployeeAction } from "./employeeReducer";
import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { getEmployees } from "../../lib/api";
import { toEmployeeview } from "./employeeMapper";


interface EmployeeContextValue {
    state: RequestState;
    dispatch: React.Dispatch<EmployeeAction>;
}

const EmployeeContext = 
    createContext<EmployeeContextValue | undefined>(undefined);

interface EmployeeProviderProps {
    children: ReactNode;
}

export function EmployeeProvider({children, }: EmployeeProviderProps) {
    const [state, dispatch] = useReducer(
        employeeReducer, {status: "loading"}
    );

    useEffect(() => {
        let cancelled = false;

        async function loadEmployees() {
            dispatch({type: "load-start"});

            try{
                const data = await getEmployees();

                if(cancelled) return;

                dispatch({
                    type: "load-success",
                    employees: data.map(toEmployeeview),
                });
            } catch (error: unknown){
                if(cancelled) return;

                dispatch({
                    type:"load-error",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unable to load employees.",
                });
            }
        }

        void loadEmployees();

        return () => {
            cancelled = true;
        };
    }, []);


    return (
        <EmployeeContext.Provider value={{state, dispatch}}>
            {children}
        </EmployeeContext.Provider>
    );
}


export function useEmployees(): EmployeeContextValue {
    const context = useContext(EmployeeContext);

    if(!context){
        throw new Error("useEmployees must be used inside EmployeeProvider.");
    }

    return context;
}