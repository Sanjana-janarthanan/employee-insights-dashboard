// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Wait until AuthContext finishes

  if (!user) return <Navigate to="/" replace />; // redirect if not logged in

  return children;
}
