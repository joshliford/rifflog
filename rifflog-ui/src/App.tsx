import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RecordingDetail from "./pages/RecordingDetail";
import RecordingForm from "./components/recordings/RecordingForm";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/admin/upload"
        element={
          <ProtectedRoute>
            <RecordingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute>
            <RecordingForm />
          </ProtectedRoute>
        }
      />
      {/* Public Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recordings/:id" element={<RecordingDetail />} />
    </Routes>
  );
}

export default App;
