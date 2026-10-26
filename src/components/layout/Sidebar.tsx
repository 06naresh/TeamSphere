
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  UserRound,
  X,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/employees", label: "Employees", icon: Users, end: false },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">T</div>
          <div>
            <strong>TeamSphere</strong>
            <span>People workspace</span>
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="nav-caption">WORKSPACE</p>

        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <p className="nav-caption nav-caption-bottom">PREFERENCES</p>

        <div className="side-nav">
          <button className="nav-link nav-link-muted" type="button">
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="profile-avatar">
            <UserRound size={21} />
          </div>
          <div className="profile-copy">
            <strong>Workspace Admin</strong>
            <span>People operations</span>
          </div>
          <span className="online-dot" />
        </div>
      </aside>
    </>
  );
}
