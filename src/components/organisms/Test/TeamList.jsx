import { FaUsers } from "react-icons/fa";
import PressedContainer from "../../atoms/PressedContainer";

const roleColors = {
  "Frontend Developer": "bg-[var(--secondary)] text-[var(--text-primary)]",
  "Backend Developer": "bg-[var(--accent-light)] text-[var(--text-primary)]",
  "API Engineer": "bg-[var(--accent)] text-[var(--text-primary)]",
  "QA Engineer": "bg-[var(--secondary-hover)] text-[var(--text-primary)]",
};

const TeamList = ({ team }) => (
  <PressedContainer className="p-6 bg-[var(--accent-light)] border-[var(--primary)]">
    <h2 className="text-[var(--primary)] font-semibold text-lg mb-6 flex items-center gap-3">
      <FaUsers className="text-[var(--secondary)]" /> My Team
    </h2>

    <ul className="space-y-4">
      {team.map((m) => (
        <li
          key={m.name}
          className="flex items-center justify-between p-4 rounded-xl border rounded-xl bg-white/50 hover:bg-[var(--secondary)]/20 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
              {m.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Name & Role */}
            <div>
              <p className="font-medium text-[var(--text-primary)]">{m.name}</p>
              <span
                className={`mt-1 text-xs px-2 py-0.5 rounded-full inline-block shadow-sm ${
                  roleColors[m.role] || "bg-gray-200 text-black"
                }`}
              >
                {m.role}
              </span>
            </div>
          </div>

          {/* Progress */}
          <span className="font-semibold text-[var(--text-primary)]">{m.progress}%</span>
        </li>
      ))}
    </ul>
  </PressedContainer>
);

export default TeamList;
