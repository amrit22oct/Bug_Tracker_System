import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Form from "../../organisms/Form/Form.jsx";
import authService from "@/services/api/auth";
import { showSuccess, showError } from "@/utils/Toast";

export default function RegisterForm({ onSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const sections = [
    {
      title: "User Information",
      description: "Basic details for your account",
      fields: [
        {
          id: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          id: "username",
          label: "Username",
          type: "text",
          placeholder: "Choose a username",
        },
        {
          id: "role",
          label: "Role",
          type: "select",
          defaultValue: "Developer",
          options: [
            { label: "Admin", value: "Admin" },
            { label: "Project Manager", value: "ProjectManager" },
            { label: "Team Leader", value: "TeamLeader" },
            { label: "Developer", value: "Developer" },
            { label: "QA", value: "QA" },
          ],
        },
      ],
    },
    {
      title: "Security",
      description: "Set your account password",
      fields: [
        {
          id: "password",
          label: "Password",
          type: showPassword ? "text" : "password",
          placeholder: "Enter password",
          rightAction: {
            show: true,
            icon: showPassword ? EyeOff : Eye,
            onClick: () => setShowPassword((p) => !p),
            ariaLabel: "Toggle password visibility",
          },
        },
        {
          id: "confirmPassword",
          label: "Confirm Password",
          type: showConfirmPassword ? "text" : "password",
          placeholder: "Confirm password",
          rightAction: {
            show: true,
            icon: showConfirmPassword ? EyeOff : Eye,
            onClick: () =>
              setShowConfirmPassword((p) => !p),
            ariaLabel: "Toggle confirm password visibility",
          },
        },
      ],
    },
  ];

  const handleRegister = async (formData) => {
    const {
      name,
      email,
      username,
      role,
      password,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      await authService.register({
        name,
        email,
        username,
        role,
        password,
      });

      showSuccess("Registration successful 🎉");

      if (onSuccess) onSuccess();

      navigate("/user-management", { replace: true });
    } catch (error) {
      console.error("Register error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed!";
      showError(message);
    }
  };

  return (
    <Form
      // title="Register"
      sections={sections}
      submitText="Create Account"
      onSubmit={handleRegister}
    />
  );
}
