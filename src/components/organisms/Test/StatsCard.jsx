import {
  FaCheckCircle,
  FaSpinner,
  FaBug,
  FaProjectDiagram,
} from "react-icons/fa";
import PressedContainer from "../../atoms/PressedContainer/index";

const cards = [
  {
    label: "Total Projects",
    value: 12,
    icon: FaProjectDiagram,
    color: "var(--secondary)",
  },
  {
    label: "Open Bugs",
    value: 7,
    icon: FaBug,
    color: "#e5533d",
  },
  {
    label: "In Progress",
    value: 5,
    icon: FaSpinner,
    color: "#f4b400",
    spin: true,
  },
  {
    label: "Completed",
    value: 18,
    icon: FaCheckCircle,
    color: "var(--accent)",
  },
];

export default function StatsCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, icon: Icon, color, spin }) => (
        <PressedContainer
          key={label}
          className="bg-(--accent-light) border-(--primary) p-6"
        >
          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center justify-center h-12 w-12 rounded-xl text-white"
              style={{ backgroundColor: color }}
            >
              <Icon className={spin ? "animate-spin" : ""} />
            </span>
            <span className="text-xs font-medium text-black/50 tracking-wide">
              Overview
            </span>
          </div>

          <div className="mt-6">
            <p className="text-sm text-black/60">{label}</p>
            <p className="mt-1 text-3xl font-bold text-black">{value}</p>
          </div>
        </PressedContainer>
      ))}
    </section>
  );
}
