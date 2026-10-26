import { Link } from "react-router-dom";

type ActionProps =
    | {
        kind: "link";
        href: string;
        label: string;
    }
    | {
        kind: "button";
        onClick: () => void;
        label: string;
        variant?: "primary" | "danger";
    };


export default function Action(props: ActionProps) {
    if (props.kind === "link") {
        return (
            <Link className="btn btn-outline" to={props.href}>
                {props.label}
            </Link>
        );
    }

    return (
        <button className={`btn ${props.variant === "danger"
                ? "btn-danger"
                : "btn-primary"
            }`} onClick={props.onClick}>
            {props.label}
        </button>
    );
}