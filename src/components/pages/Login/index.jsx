import { Bug, Github, Mail } from "lucide-react";
import LoginForm from "../../organisms/login";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import { showSuccess } from "@/utils/Toast";

export default function Login({ setIsAuth }) {
  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuth(true);

    // Show 3D toast
    showSuccess("Login Successful 🎉");
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[var(--background)]">
      <div className="w-[30vw] min-w-[360px] bg-[var(--accent-light)] border border-[var(--primary)] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <Bug className="w-8 h-8" />
            <h1 className="text-2xl font-semibold">Bug Tracker</h1>
          </div>
          <p className="text-sm opacity-70">Track. Fix. Ship better.</p>
        </div>

        {/* Login Form */}
        <LoginForm setIsAuth={setIsAuth} onSuccess={handleLoginSuccess} />

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <PrimaryButton
            title="Continue with Google"
            variant="outline"
            icon={Mail}
            className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
          />
          <PrimaryButton
            title="Continue with GitHub"
            variant="secondary"
            icon={Github}
            className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
          />
        </div>
      </div>
    </div>
  );
}
