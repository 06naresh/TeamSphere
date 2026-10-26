import type { ComponentPropsWithRef } from "react";


interface FocusInputProps 
    extends ComponentPropsWithRef<"input">{
        label: string;
    }

export default function FocusInput({label, id, ...inputProps}: FocusInputProps) {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <label className="field" htmlFor={inputId}>
            <span>{label}</span>
            <input {...inputProps} id={inputId} className="input" />
        </label>
    );
}