import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/ai-dashboard");   // 🔥 Redirect to AI Dashboard
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}