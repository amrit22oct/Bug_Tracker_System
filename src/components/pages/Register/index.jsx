import { Bug, Github, Mail, UserPlus } from "lucide-react";
import RegisterForm from "../../organisms/Register";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

export default function Register() {
  const handleRegisterSuccess = () => {
    // Optional: analytics, logs, or toast hooks
  };

  return (
   <div className="w-full h-full p-8 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto   items-center">
      <div className="w-[60vw] min-w-[360px] bg-[var(--accent-light)] border border-[var(--primary)] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <Bug className="w-8 h-8" />
            <h1 className="text-2xl font-semibold">Add User</h1>
          </div>
          <p className="text-sm opacity-70">
            Add the user to the system
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm onSuccess={handleRegisterSuccess} />

        {/* OAuth Buttons (optional / future-ready)
        <div className="flex flex-col gap-3 mt-4">
          <PrimaryButton
            title="Sign up with Google"
            variant="outline"
            icon={Mail}
            className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
          />
          <PrimaryButton
            title="Sign up with GitHub"
            variant="secondary"
            icon={Github}
            className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
          />
        </div> */}
      </div>
    </div>
  );
}
