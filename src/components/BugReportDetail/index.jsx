import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderContent from "../../components/templates/AppHeader/HeaderContent.jsx";
import PrimaryButton from "../../components/atoms/Buttons/PrimaryButton";
import PressedContainer from "../../components/atoms/PressedContainer";
import {
  FiAlertCircle,
  FiClock,
  FiTag,
  FiEdit,
  FiTrash2,
  FiUser,
  FiLayers,
} from "react-icons/fi";
import bugReportService from "../../services/api/bugReportService.js";

const statusStyles = {
  open: { bg: "var(--secondary)", text: "var(--primary)" },
  pending: { bg: "#fbbf24", text: "var(--primary)" },
  resolved: { bg: "#22c55e", text: "white" },
  closed: { bg: "#9ca3af", text: "white" },
};

const BugReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        setLoading(true);
        const res = await bugReportService.getReportById(id);
        const data = res.data;

        const normalizedBug = {
          id: data._id,
          title: data.bugId?.title || data.title,
          description: data.bugId?.description || data.description,
          status: data.bugId?.status || data.status,
          priority: data.bugId?.priority || data.priority,
          severity: data.bugId?.severity || data.severity,
          tags: data.bugId?.tags || data.tags || [],
          environment: data.bugId?.environment || {},
          projectId: data.projectId || {},
          reportedBy: data.reportedBy || data.bugId?.reportedBy || {},
          stepsToReproduce:
            data.stepsToReproduce || data.bugId?.stepsToReproduce || [],
          expectedResult: data.expectedResult || data.bugId?.expectedResult,
          actualResult: data.actualResult || data.bugId?.actualResult,
          attachments: data.bugId?.attachments || data.attachments || [],
          createdAt: data.createdAt || data.bugId?.createdAt,
          comments: data.bugId?.comments || data.comments || [],
        };

        setBug(normalizedBug);
      } catch (error) {
        console.error("Failed to fetch bug report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading bug details...
      </div>
    );
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
          <p className="text-sm text-gray-500">BUG-{bug.id}</p>
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
          <strong>
            {bug.environment
              ? `${bug.environment.os || "N/A"} / ${
                  bug.environment.browser || "N/A"
                }`
              : "N/A"}
          </strong>
        </span>
      </PressedContainer>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BUG INFO */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-3">
          <h2 className="font-semibold text-lg">Bug Info</h2>
          <p>
            <strong>Project:</strong> {bug.projectId?.name || "N/A"}
          </p>
          <p className="flex items-center gap-1">
            <FiUser />
            <strong>Reported By:</strong> {bug.reportedBy?.name || "N/A"}
          </p>
          <p>
            <FiClock className="inline mr-1" />
            <strong>Created:</strong>{" "}
            {new Date(bug.createdAt).toLocaleDateString()}
          </p>
          {bug.stepsToReproduce?.length > 0 && (
            <div>
              <strong>Steps to Reproduce:</strong>
              <ol className="list-decimal list-inside text-sm">
                {bug.stepsToReproduce.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {bug.expectedResult && (
            <p>
              <strong>Expected Result:</strong> {bug.expectedResult}
            </p>
          )}
          {bug.actualResult && (
            <p>
              <strong>Actual Result:</strong> {bug.actualResult}
            </p>
          )}
        </PressedContainer>

        {/* DESCRIPTION & TAGS */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-sm">{bug.description || "No description"}</p>
          {bug.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {bug.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded bg-gray-200">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {bug.attachments?.length > 0 && (
            <div className="mt-4">
              <strong>Attachments:</strong>
              <ul className="list-disc list-inside">
                {bug.attachments.map((att) => (
                  <li key={att._id}>
                    <a
                      href={att.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      {att.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PressedContainer>
      </div>

      {/* COMMENTS / ACTIVITY */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Activity</h2>
        {bug.comments?.length === 0 ? (
          <p className="text-sm text-gray-500">No activity yet</p>
        ) : (
          bug.comments.map((comment) => (
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
          ))
        )}
      </PressedContainer>
    </div>
  );
};

BugReportDetail.header = () => <HeaderContent title="Report Details" />;

export default BugReportDetail;
