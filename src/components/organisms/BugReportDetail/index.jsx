import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton/index.jsx";
import PressedContainer from "../../atoms/PressedContainer/index.jsx";
import {
  FiAlertCircle,
  FiClock,
  FiTag,
  FiEdit,
  FiTrash2,
  FiUser,
  FiLayers,
  FiExternalLink,
} from "react-icons/fi";
import bugReportService from "../../../services/api/bugReportService.js";

const statusStyles = {
  pending: { bg: "#fbbf24", text: "#000" },
  approved: { bg: "#22c55e", text: "#fff" },
  rejected: { bg: "#ef4444", text: "#fff" },
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

        /* ============================
           NORMALIZED REPORT STRUCTURE
        ============================ */
        const normalizedReport = {
          id: data._id,

          title: data.title,
          description: data.description || "",

          status: data.status,
          priority: data.priority,
          severity: data.severity,

          project: {
            id: data.projectId?._id,
            name: data.projectId?.name,
          },

          bug: {
            id: data.bugId?._id,
            title: data.bugId?.title,
            description: data.bugId?.description,
            status: data.bugId?.status,
            priority: data.bugId?.priority,
            severity: data.bugId?.severity,
            type: data.bugId?.type,
          },

          reportedBy: data.reportedBy || {},

          stepsToReproduce: data.stepsToReproduce || [],
          expectedResult: data.expectedResult || "",
          actualResult: data.actualResult || "",

          tags: data.tags || [],
          comments: data.comments || [],

          createdAt: data.createdAt,
        };

        setReport(normalizedReport);
      } catch (error) {
        console.error("❌ Failed to fetch report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading report...
      </div>
    );
  }

  if (!report) return null;

  const statusStyle =
    statusStyles[report.status?.toLowerCase()] || statusStyles.pending;

  return (
    <div className="w-full h-full p-6 space-y-6 overflow-auto bg-[var(--accent-light)]">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start gap-4">
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
            className="text-red-600 border-red-400"
          />
          <PrimaryButton
            title="Back"
            variant="outline"
            handler={() => navigate(-1)}
          />
        </div>
      </div>

      {/* ================= STATUS BAR ================= */}
      <PressedContainer className="p-4 bg-white rounded-xl border flex gap-6 flex-wrap">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          {report.status}
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiTag /> Priority: <strong>{report.priority}</strong>
        </span>

        <span className="flex items-center gap-1 text-sm">
          <FiAlertCircle /> Severity: <strong>{report.severity}</strong>
        </span>
      </PressedContainer>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---------- REPORT INFO ---------- */}
        <PressedContainer className="p-6 bg-white rounded-xl border">
          {/* HEADER ROW */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">Report Info</h2>

            {report.project?.id && (
              <PrimaryButton
                title="View Project"
                icon={FiExternalLink}
                variant="outline"
                className="h-9 px-4 text-sm max-w-[160px]"
                handler={() =>
                  navigate(`/view-project-detail/${report.project.id}`)
                }
              />
            )}
          </div>

          {/* CONTENT */}
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong className="text-gray-900">Project:</strong>{" "}
              {report.project?.name || "N/A"}
            </p>

            <p className="flex items-center gap-2">
              <FiUser className="text-gray-500" />
              <span>
                <strong className="text-gray-900">Reported By:</strong>{" "}
                {report.reportedBy?.name || "N/A"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FiClock className="text-gray-500" />
              <span>
                <strong className="text-gray-900">Created:</strong>{" "}
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </PressedContainer>

        {/* ---------- BUG DETAILS ---------- */}
        <PressedContainer className="p-6 bg-white rounded-xl border">
          {/* HEADER ROW */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">Bug Details</h2>

            {report.bug?.id && (
              <PrimaryButton
                title="View Bug"
                icon={FiExternalLink}
                variant="outline"
                className="h-9 px-4 text-sm max-w-[160px]"
                handler={() => navigate(`/view-bug-detail/${report.bug.id}`)}
              />
            )}
          </div>

          {/* CONTENT */}
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong className="text-gray-900">Bug:</strong>{" "}
              {report.bug?.title || "N/A"}
            </p>

            <p>
              <strong className="text-gray-900">Status:</strong>{" "}
              {report.bug?.status || "N/A"}
            </p>

            <p>
              <strong className="text-gray-900">Priority:</strong>{" "}
              {report.bug?.priority || "N/A"}
            </p>

            <p>
              <strong className="text-gray-900">Severity:</strong>{" "}
              {report.bug?.severity || "N/A"}
            </p>

            {report.bug?.description && (
              <p className="text-sm text-gray-600">{report.bug.description}</p>
            )}
          </div>
        </PressedContainer>
      </div>

      {/* ================= REPRODUCTION ================= */}
      <PressedContainer className="p-6 bg-white rounded-xl border space-y-4">
        <h2 className="font-semibold text-lg">Reproduction</h2>

        {report.stepsToReproduce.length > 0 && (
          <ol className="list-decimal list-inside text-sm">
            {report.stepsToReproduce.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
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
    </div>
  );
};

BugReportDetail.header = () => <HeaderContent title="Bug Report Details" />;

export default BugReportDetail;
