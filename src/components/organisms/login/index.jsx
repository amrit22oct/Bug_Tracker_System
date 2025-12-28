import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Form from "../../organisms/Form";
import authService from "@/services/api/auth.js";
import { showSuccess, showError } from "@/utils/Toast";

export default function LoginForm({ setIsAuth, onSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 

  const loginFields = [
    {
      id: "loginId",
      label: "Username or Email",
      type: "text",
      placeholder: "Enter your username or email",
    },
    {
      id: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      rightAction: {
        show: true,
        icon: showPassword ? EyeOff : Eye,
        onClick: () => setShowPassword((p) => !p),
        ariaLabel: "Toggle password visibility",
      },
    },
  ];

  const handleLogin = async ({ loginId, password }) => {
    if (loading) return; 
    setLoading(true);

    try {
      const response = await authService.login({ loginId, password });
      const { user } = response;

      localStorage.setItem("isLoggedIn", "true");
      setIsAuth(true);

      if (onSuccess) onSuccess();
      showSuccess("Login successful 🎉");

      switch (user.role) {
        case "Admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "ProjectManager":
          navigate("/projects", { replace: true });
          break;
        default:
          navigate("/bugs", { replace: true });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed!";
      showError(message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Form
      title="Login"
      fields={loginFields}
      onSubmit={handleLogin}
      loading={loading}    
      loadingtext="Logging in..."
      submitText="Login"    
    />
  );
}
