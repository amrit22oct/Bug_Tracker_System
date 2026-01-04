import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice.js";

import Form from "../../organisms/Form";

import { showSuccess, showError } from "@/utils/Toast";

export default function LoginForm({ setIsAuth, onSuccess }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false); 

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

  // const handleLogin = async ({ loginId, password }) => {
  //   if (loading) return; 
  //   setLoading(true);

  //   try {
  //     const response = await authService.login({ loginId, password });
  //     const { user } = response;

  //     localStorage.setItem("isLoggedIn", "true");
  //     setIsAuth(true);

  //     if (onSuccess) onSuccess();
  //     showSuccess("Login successful 🎉");

  //     switch (user.role) {
  //       case "Admin":
  //         navigate("/admin/dashboard", { replace: true });
  //         break;
  //       case "ProjectManager":
  //         navigate("/projects", { replace: true });
  //         break;
  //       default:
  //         navigate("/bugs", { replace: true });
  //     }
  //   } catch (error) {
  //     const message =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Login failed!";
  //     showError(message);
  //   } finally {
  //     setLoading(false); 
  //   }
  // };

  /* =============== login ===================*/
  const handleLogin = async (FormData) => {
    const resultAction = await dispatch(login(FormData));

    if (login.fulfilled.match(resultAction)) {
      const loggedInUser = resultAction.payload.user;

      localStorage.setItem("isLoggedIn", "true");
      setIsAuth(true);
      if (onSuccess) onSuccess();
      showSuccess("Login Successful🎉");

      switch (loggedInUser.role) {
        case "Admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "ProjectManager":
          navigate("/projects", { replace: true });
          break;
        default:
          navigate("/bugs", { replace: true });
      }
      
    } else {
      const message =
        resultAction.payload?.message ||
        error ||
        "Login failed!";
      showError(message);
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
