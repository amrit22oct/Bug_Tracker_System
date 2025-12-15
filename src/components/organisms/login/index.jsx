import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Form from "../../organisms/Form";

export default function LoginForm({ setIsAuth, onSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const staticLogin = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const loginFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
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

  const handleLogin = ({ email, password }) => {
    if (email === staticLogin.email && password === staticLogin.password) {
      localStorage.setItem("isLoggedIn", "true");
      setIsAuth(true);

      // Trigger parent callback for toast
      if (onSuccess) onSuccess();

      // Navigate to home/dashboard
      navigate("/", { replace: true });
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <Form
      title="Login"
      fields={loginFields}
      onSubmit={handleLogin}
    />
  );
}
