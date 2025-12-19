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

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await bugReportService.getReportById(id);
        const data = res.data;

        // ✅ Normalize STRICTLY as Bug Report
        const normalizedReport = {
          id: data._id,

          title: data.title || data.bugId?.title || "N/A",
          description: data.description || data.bugId?.description || "",

          status: data.status || data.bugId?.status || "Open",
          priority: data.priority || data.bugId?.priority || "N/A",
          severity: data.severity || data.bugId?.severity || "N/A",

          tags: data.tags || data.bugId?.tags || [],
          environment: data.environment || data.bugId?.environment || {},

          project: data.projectId || {},
          reportedBy: data.reportedBy || {},

          stepsToReproduce:
            data.stepsToReproduce || data.bugId?.stepsToReproduce || [],
          expectedResult:
            data.expectedResult || data.bugId?.expectedResult || "",
          actualResult:
            data.actualResult || data.bugId?.actualResult || "",

          attachments: data.attachments || [],
          comments: data.comments || [],

          createdAt: data.createdAt,
        };

        setReport(normalizedReport);
      } catch (error) {
        console.error("❌ Failed to fetch bug report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading report details...
      </div>
    );
  }

  if (!report) return null;

  const statusKey = report.status?.toLowerCase();
  const statusStyle = statusStyles[statusKey] || statusStyles.open;

  return (
    <div className="w-full h-full bg-[var(--accent-light)] p-6 overflow-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            {report.title}
          </h1>
          <p className="text-sm text-gray-500">Report ID: {report.id}</p>
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
            handler={() => navigate(-1)}
          />
        </div>
      </div>

      {/* STATUS BAR */}
      <PressedContainer className="p-4 bg-white rounded-xl border flex flex-wrap gap-6 items-center">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          {report.status}
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiTag /> Priority: <strong>{report.priority}</strong>
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiAlertCircle /> Severity: <strong>{report.severity}</strong>
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiLayers /> Environment:{" "}
          <strong>
            {report.environment?.os || "N/A"} /{" "}
            {report.environment?.browser || "N/A"}
          </strong>
        </span>
      </PressedContainer>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* REPORT INFO */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-3">
          <h2 className="font-semibold text-lg">Report Info</h2>

          <p>
            <strong>Project:</strong> {report.project?.name || "N/A"}
          </p>

          <p className="flex items-center gap-1">
            <FiUser />
            <strong>Reported By:</strong>{" "}
            {report.reportedBy?.name || "N/A"}
          </p>

          <p>
            <FiClock className="inline mr-1" />
            <strong>Created:</strong>{" "}
            {new Date(report.createdAt).toLocaleDateString()}
          </p>

          {report.stepsToReproduce.length > 0 && (
            <div>
              <strong>Steps to Reproduce:</strong>
              <ol className="list-decimal list-inside text-sm">
                {report.stepsToReproduce.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {report.expectedResult && (
            <p>
              <strong>Expected Result:</strong> {report.expectedResult}
            </p>
          )}

          {report.actualResult && (
            <p>
              <strong>Actual Result:</strong> {report.actualResult}
            </p>
          )}
        </PressedContainer>

        {/* DESCRIPTION */}
        <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Description</h2>

          <p className="text-sm">{report.description || "No description"}</p>

          {report.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {report.tags.map((tag, i) => (
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

      {/* ACTIVITY */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Activity</h2>

        {report.comments.length === 0 ? (
          <p className="text-sm text-gray-500">No activity yet</p>
        ) : (
          report.comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 border-b pb-3 last:border-none"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm">
                {comment.user?.name?.[0] || "U"}
              </div>

              <div>
                <p className="text-sm">
                  <strong>{comment.user?.name}</strong>{" "}
                  {comment.message}
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
