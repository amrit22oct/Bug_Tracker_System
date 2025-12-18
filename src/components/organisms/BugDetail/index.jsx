import React, { useEffect, useState } from "react";
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
  FiUser,
  FiLayers,
} from "react-icons/fi";
import bugService from "../../../services/api/bug.service.js";

const statusStyles = {
  open: { bg: "var(--secondary)", text: "var(--primary)" },
  "in progress": { bg: "#fbbf24", text: "var(--primary)" },
  resolved: { bg: "var(--accent)", text: "var(--primary)" },
  closed: { bg: "#9ca3af", text: "white" },
};

const BugDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BUG ================= */
  useEffect(() => {
    const fetchBug = async () => {
      try {
        setLoading(true);
        const res = await bugService.getBugById(id);
        setBug(res.data);
      } catch (error) {
        console.error("Failed to fetch bug:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading bug details...
      </div>
    );
  }

  if (!bug) return null;

  const statusKey = bug.status?.toLowerCase();
  const statusStyle = statusStyles[statusKey] || statusStyles.open;

  return (
    <div className="w-full h-full bg-[var(--accent-light)] p-6 overflow-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            {bug.title}
          </h1>
          <p className="text-sm text-gray-500">BUG-{bug._id}</p>
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

      {/* STATUS & META */}
      <PressedContainer className="p-4 bg-white rounded-xl border flex flex-wrap gap-6 items-center">
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

        <span className="flex items-center gap-1 text-sm">
          <FiLayers /> Environment:{" "}
          <strong>{bug.environment || "N/A"}</strong>
        </span>
      </PressedContainer>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BUG INFO */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-3">
          <h2 className="font-semibold text-lg">Bug Info</h2>

          <p>
            <strong>Project:</strong> {bug.projectId?.name}
          </p>

          <p className="flex items-center gap-1">
            <FiUser />
            <strong>Reported By:</strong> {bug.reportedBy?.name}
          </p>

          <p className="flex items-center gap-1">
            <FiUser />
            <strong>Assigned To:</strong>{" "}
            {bug.assignedTo?.name || "Unassigned"}
          </p>

          <p>
            <FiClock className="inline mr-1" />
            <strong>Created:</strong>{" "}
            {new Date(bug.createdAt).toLocaleDateString()}
          </p>

          {bug.dueDate && (
            <p>
              <strong>Due:</strong>{" "}
              {new Date(bug.dueDate).toLocaleDateString()}
            </p>
          )}

          {bug.estimatedFixTime && (
            <p>
              <strong>Estimated Fix Time:</strong> {bug.estimatedFixTime} hrs
            </p>
          )}
        </PressedContainer>

        {/* DESCRIPTION */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-sm">{bug.description || "No description"}</p>

          {bug.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {bug.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded bg-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </PressedContainer>
      </div>

      {/* COMMENTS / ACTIVITY */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Activity</h2>

        {bug.comments?.length === 0 && (
          <p className="text-sm text-gray-500">No activity yet</p>
        )}

        {bug.comments?.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 border-b pb-3 last:border-none"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm">
              {comment.user?.name?.[0] || "U"}
            </div>
            <div>
              <p className="text-sm">
                <strong>{comment.user?.name}</strong> {comment.message}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </PressedContainer>
    </div>
  );
};

BugDetail.header = () => <HeaderContent title="Bug Details" />;

export default BugDetail;
