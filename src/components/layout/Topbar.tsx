
import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();

  const title = location.pathname.startsWith("/employees/")
    ? "Employee profile"
    : location.pathname.startsWith("/employees")
      ? "Employee directory"
      : "Overview";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="breadcrumb">TEAMSPHERE / WORKSPACE</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="top-search">
          <Search size={17} />
          <input
            aria-label="Search"
            placeholder="Search workspace..."
            onKeyDown={(event) => {
              if (event.key === "Escape") event.currentTarget.blur();
            }}
          />
          <kbd>⌘ K</kbd>
        </label>

        <button className="icon-button notification-button" aria-label="Notifications">
          <Bell size={19} />
          <span />
        </button>

        <div className="topbar-avatar">WA</div>
      </div>
    </header>
  );
}
