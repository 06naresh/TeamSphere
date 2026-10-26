
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import DirectoryPage from "../pages/DirectoryPage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="employees" element={<DirectoryPage />} />
        <Route
          path="employees/:employeeId"
          element={<EmployeeDetailsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
