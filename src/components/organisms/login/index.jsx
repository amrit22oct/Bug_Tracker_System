import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Form from "../../organisms/Form";
import authService from "@/services/api/auth.js";
import { showSuccess, showError } from "@/utils/Toast";

export default function LoginForm({ setIsAuth, onSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    try {
      // Call API login
      const response = await authService.login({ loginId, password });
      console.log("Full API response:", response);

      const { user, token } = response;

      // 🔐 LOCAL STATE
      localStorage.setItem("isLoggedIn", "true");
      setIsAuth(true);

      // Optional callback for toast
      if (onSuccess) onSuccess();

      // Show success toast
      showSuccess("Login successful 🎉");

      // 🚀 Redirect based on role
      switch (user.role) {
        case "Admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "ProjectManager":
          navigate("/projects", { replace: true });
          break;
        case "QA":
        case "Developer":
        default:
          navigate("/bugs", { replace: true });
          break;
      }
    } catch (error) {
      console.error("Login error:", error);

      // ✅ Show error toast instead of alert
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed!";
      showError(message);
    }
  };

  return <Form title="Login" fields={loginFields} onSubmit={handleLogin} />;
}
