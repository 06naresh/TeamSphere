import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import DirectoryPage from "./pages/DirectoryPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import { EmployeeProvider } from "./features/employees/EmployeeContext";

function NotFoundPage() {
  return (
    <div className="status-panel">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to directory
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <header className="app-header">
            <Link className="brand" to="/">
              <span className="brand-icon">T</span>
              <span>TeamSphere</span>
            </Link>

            <nav className="main-nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Directory
              </NavLink>
            </nav>

            <div className="header-profile">
              <span className="header-avatar">TS</span>
              <div>
                <strong>Team Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<DirectoryPage />} />
              <Route
                path="/employees/:id"
                element={<EmployeeDetailsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <footer className="app-footer">
            TeamSphere · Built with React and TypeScript
          </footer>
        </div>
      </BrowserRouter>
    </EmployeeProvider>
  );
}