import type { ReactNode } from "react";

interface ListProps<T>{
    items: T[];
    renderItem: (item: T) => ReactNode;
    getkey: (item: T) => string | number;
    emptyMessage?: string;
}

export default function GenericList<T>({items, renderItem, getkey, emptyMessage = "No recors found.",}: ListProps<T>) {
    if(items.length === 0) {
        return <p className="empty-message">{emptyMessage}</p>;
    }

    return (
        <div className="employee-grid">
            {items.map((item) => (
                <div key={getkey(item)}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}

// A generic constrained list
interface SelectableListProps<T extends {id: number}> {
    items: T[];
    onSelect: (item: T) => void;
}

export function SelectableList<T extends {id: number}> ({
    items, onSelect,
}: SelectableListProps<T>) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <button type="button" onClick={() => onSelect(item)}>
                        Item {item.id}
                    </button>
                </li>
            ))}
        </ul>
    );
}