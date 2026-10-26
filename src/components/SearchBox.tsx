import { useState } from "react";

interface SearchBoxProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

export default function SearchBox({
    placeholder = "Search employees...",
    onSearch,
}: SearchBoxProps) {
    const [query, setQuery] = useState("");

    return (
        <div className="search-box">
            <span aria-hidden="true">⌕</span>

            <input type="search" value={query} placeholder={placeholder} aria-label="Search employees" onChange={(event) => {
                setQuery(event.currentTarget.value);
                onSearch(event.currentTarget.value);
            }} />
        </div>
    );
}