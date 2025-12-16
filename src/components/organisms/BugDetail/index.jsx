import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import PressedContainer from "../../atoms/PressedContainer";
import {
  FiAlertCircle,
  FiClock,
  FiTag,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

const statusStyles = {
  open: { bg: "var(--secondary)", text: "var(--primary)" },
  "in progress": { bg: "#fbbf24", text: "var(--primary)" },
  resolved: { bg: "var(--accent)", text: "var(--primary)" },
  closed: { bg: "#9ca3af", text: "white" },
};

const BugDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (replace with API later)
  const bug = {
    id: `BUG-${id}`,
    title: "Login page crashes on submit",
    status: "In Progress",
    priority: "High",
    severity: "Major",
    project: "Website Redesign",
    reportedBy: "Alice",
    assignedTo: "John Doe",
    createdAt: "2025-01-10",
    dueDate: "2025-01-20",
    description:
      "When submitting the login form with valid credentials, the application crashes unexpectedly.",
    steps: [
      "Go to login page",
      "Enter valid credentials",
      "Click submit",
      "Application crashes",
    ],
    activity: [
      { user: "Alice", action: "created the bug", date: "Jan 10, 2025" },
      {
        user: "John",
        action: "changed status to In Progress",
        date: "Jan 11, 2025",
      },
    ],
  };

  const statusStyle =
    statusStyles[bug.status.toLowerCase()] || statusStyles.open;

  return (
    <div className="w-full h-full bg-[var(--accent-light)] p-6 overflow-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            {bug.title}
          </h1>
          <p className="text-sm text-gray-500">{bug.id}</p>
        </div>

        <div className="flex gap-2">
          <PrimaryButton title="Edit" variant="outline" icon={FiEdit} />
          <PrimaryButton
            title="Delete"
            variant="outline"
            icon={FiTrash2}
            className="text-red-600 border-red-400 hover:bg-red-500 hover:text-white"
          />
          <PrimaryButton
            title="Back"
            variant="outline"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      {/* STATUS */}
      <PressedContainer className="p-4 bg-white rounded-xl border flex flex-wrap gap-4">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          {bug.status}
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiTag /> Priority: <strong>{bug.priority}</strong>
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiAlertCircle /> Severity: <strong>{bug.severity}</strong>
        </span>
      </PressedContainer>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-2">
          <h2 className="font-semibold text-lg">Bug Info</h2>
          <p><strong>Project:</strong> {bug.project}</p>
          <p><strong>Reported By:</strong> {bug.reportedBy}</p>
          <p><strong>Assigned To:</strong> {bug.assignedTo}</p>
          <p>
            <FiClock className="inline mr-1" />
            <strong>Created:</strong>{" "}
            {new Date(bug.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Due:</strong>{" "}
            {new Date(bug.dueDate).toLocaleDateString()}
          </p>
        </PressedContainer>

        <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-sm">{bug.description}</p>

          <ol className="list-decimal list-inside text-sm space-y-1">
            {bug.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </PressedContainer>
      </div>

      {/* ACTIVITY */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-3">
        <h2 className="font-semibold text-lg">Activity</h2>

        {bug.activity.map((item, i) => (
          <div key={i} className="flex gap-3 border-b pb-2 last:border-none">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm">
              {item.user[0]}
            </div>
            <div>
              <p className="text-sm">
                <strong>{item.user}</strong> {item.action}
              </p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </PressedContainer>
    </div>
  );
};

BugDetail.header = () => <HeaderContent title="Bug Details" />;

export default BugDetail;
