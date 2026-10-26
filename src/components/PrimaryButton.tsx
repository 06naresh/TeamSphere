import type { ComponentPropsWithoutRef } from "react";


interface PrimaryButtonProps
    extends ComponentPropsWithoutRef<"button">{
        loading?: boolean;
    }


export default function PrimaryButton({children, loading= false, disabled, className="", ...rest}: PrimaryButtonProps) {
    return (
        <button {...rest} disabled={disabled || loading} className={`btn btn-primary ${className}`}>
            {loading ? "Please wait...": children}
        </button>
    );
}