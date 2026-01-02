import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../organisms/Test/ProfileHeader.jsx";
import StatsCards from "../../organisms/Test/StatsCard.jsx";
import ProjectsTable from "../../organisms/Test/ProjectTable.jsx";
import BugsTable from "../../organisms/Test/BugTable.jsx";
import ActivityList from "../../organisms/Test/Activity.jsx";
import CalendarWidget from "../../organisms/Test/CalendarWidget.jsx";
import Notifications from "../../organisms/Test/Notificatioin.jsx";
import TeamList from "../../organisms/Test/TeamList.jsx";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import { FaPlus, FaProjectDiagram, FaBug, FaUsers } from "react-icons/fa";
import authService from "@/services/api/auth.js";
import dashboardService from "../../../services/api/dashboard.service.js";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton/index.jsx";

/* ---------------- Generic search helper ---------------- */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const Dashboard = ({ searchValue = "" }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();
  const { name, username, role, email } = currentUser;

  const statuses = [
    "All",
    "Recent",
    "Active",
    "In Progress",
    "On Hold",
    "Completed",
    "Delayed",
    "Cancelled",
  ];

  /* ---------------- Dashboard State ---------------- */
  const [dashboardData, setDashboardData] = useState({
    totals: {},
    bugStatus: {},
    projectStatus: {},
    recentProjects: [],
    recentBugs: [],
    teams: [],
    recentActivities: [],
    notifications: [],
  });

  /* ---------------- Fetch dashboard from API ---------------- */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
  
        const data = await dashboardService.getAdminDashboard();
  
        /* ---------------- Safe Projects ---------------- */
        const safeProjects = (data.recentProjects || []).map((p) => ({
          ...p,
          managerName: p.manager?.name || "N/A",
          testerName: p.tester?.name || "N/A",
          progress: p.progressPercentage ?? 0,
          deadline: p.endDate ? new Date(p.endDate).toISOString() : "N/A",
          status: p.status || "Active",
          priority: p.priority || "Low",
          manager: undefined,
          tester: undefined,
        }));
  
        /* ---------------- Safe Bugs ---------------- */
        const safeBugs = (data.recentBugs || []).map((b) => ({
          ...b,
          reportedByName: b.reportedBy?.name || "N/A",
          assignedToName: b.assignedTo?.name || "Unassigned",
          projectName: b.projectId?.name || "N/A",
          created: b.createdAt ? new Date(b.createdAt).toISOString() : "N/A",
          status: b.status || "Open",
          priority: b.priority || "Low",
        }));
  
        /* ---------------- Safe Teams ---------------- */
        const safeTeams = (data.teams || []).map((t) => {
          const deadlines = (t.projects || [])
            .map((p) => p.deadline)
            .filter(Boolean)
            .map((d) => new Date(d));
  
          const nearestDeadline =
            deadlines.length > 0
              ? new Date(Math.min(...deadlines)).toLocaleDateString()
              : "-";
  
          return {
            ...t,
            leadName: t.lead?.name || "N/A",
            membersList: t.members?.map((m) => m.name || "N/A") || [],
            projectsList: t.projects?.map((p) => p.name || "N/A") || [],
            totalProjects: t.totalProjects || 0,
            completedProjects: t.completedProjects || 0,
            teamProgress: t.teamProgress || 0,
            totalBugs: t.totalBugs || 0,
            openBugs: t.openBugs || 0,
            teamBugsInProgress: t.teamBugsInProgress || 0,
            closedBugs: t.closedBugs || 0,
            nearestDeadline,
          };
        });
  
        /* ---------------- Safe Activities ---------------- */
        const safeActivities = (data.recentActivities || []).map((a) => ({
          id: a.bugId || a.projectId,
          type: a.type,
          action: a.action,
          byName: a.by || "System",
          updatedAt: a.updatedAt ? new Date(a.updatedAt).toISOString() : null,
        }));
  
        const safeNotifications = safeActivities.map(
          (a) => `${a.action} • by ${a.byName}`
        );
  
        setDashboardData({
          totals: data.totals || {},
          bugStatus: data.bugStatus || {},
          projectStatus: data.projectStatus || {},
          recentProjects: safeProjects,
          recentBugs: safeBugs,
          teams: safeTeams,
          recentActivities: safeActivities,
          notifications: safeNotifications,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboard();
  }, []);
  

  const {
    totals,
    bugStatus,
    projectStatus,
    recentProjects,
    recentBugs,
    teams,
    recentActivities,
    notifications,
  } = dashboardData;

  const profileActions = [
    {
      label: "New Bug",
      icon: <FaPlus />,
      variant: "primary",
      onClick: () => navigate("/add-bug"),
    },
    {
      label: "New Project",
      icon: <FaProjectDiagram />,
      variant: "outline",
      onClick: () => navigate("/add-project"),
    },
  ];

  /* ---------------- Filtering ---------------- */
  const search = searchValue.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    const statusFiltered =
      selectedStatus === "All"
        ? recentProjects
        : recentProjects.filter((p) => p.status === selectedStatus);

    if (!search) return statusFiltered;

    return statusFiltered.filter(
      (p) =>
        matchesSearch(p.name, search) ||
        matchesSearch(p.managerName, search) ||
        matchesSearch(p.status, search)
    );
  }, [recentProjects, selectedStatus, search]);

  const filteredBugs = useMemo(() => {
    if (!search) return recentBugs;
    return recentBugs.filter(
      (b) =>
        matchesSearch(b.title, search) ||
        matchesSearch(b.status, search) ||
        matchesSearch(b.priority, search) ||
        matchesSearch(b.projectName, search) ||
        matchesSearch(b.reportedByName, search) ||
        matchesSearch(b.assignedToName, search)
    );
  }, [recentBugs, search]);

  const filteredTeams = useMemo(() => {
    if (!search) return teams;
    return teams.filter(
      (t) =>
        matchesSearch(t.name, search) ||
        matchesSearch(t.leadName, search) ||
        t.membersList.some((m) => matchesSearch(m, search)) ||
        t.projectsList.some((p) => matchesSearch(p, search))
    );
  }, [teams, search]);

  const filteredActivities = useMemo(() => {
    if (!search) return recentActivities;
    return recentActivities.filter(
      (a) =>
        matchesSearch(a.action || a.type, search) ||
        matchesSearch(a.byName, search)
    );
  }, [recentActivities, search]);

  const filteredNotifications = useMemo(() => {
    if (!search) return notifications;

    return notifications.filter(
      (n) => typeof n === "string" && matchesSearch(n, search)
    );
  }, [notifications, search]);

  const displayedBugs = showAll ? filteredBugs : filteredBugs.slice(0, 5);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 5);

  /* ================= VIEW ================= */
  const handleViewProject = (project) => {
    navigate(`/view-project-detail/${project._id}`);
  };

  const handleViewBug = (bug) => {
    navigate(`/view-bug-detail/${bug._id}`);
  };
  const handleViewallBug = (bug) => {
    navigate(`/bugs`);
  };

  const handleViewallProject = (bug) => {
    navigate(`/projects`);
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[var(--accent-light)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
   
    
    
    <div className="h-full w-full p-8 bg-[var(--accent-light)] overflow-auto space-y-10">
      <ProfileHeader
        name={name || username}
        role={role}
        location="New York"
        email={email || `${username}@example.com`}
        stats={[
          {
            label: "Projects",
            value: totals.totalProjects || 0,
            icon: <FaProjectDiagram />,
          },
          {
            label: "Completed Projects",
            value: projectStatus.completed || 0,
            icon: <FaProjectDiagram />,
          },
          {
            label: "In Progress Projects",
            value: projectStatus.inprogress || 0,
            icon: <FaProjectDiagram />,
          },
          {
            label: "Total Bugs",
            value: totals.totalBugs || 0,
            icon: <FaBug />,
          },
          { label: "Open Bugs", value: bugStatus.open || 0, icon: <FaBug /> },
          {
            label: "Resolved Bugs",
            value: bugStatus.resolved || 0,
            icon: <FaBug />,
          },
          { label: "Team ", value: totals.totalTeams || 0, icon: <FaUsers /> },
          { label: "Users", value: totals.totalUsers || 0, icon: <FaUsers /> },
          // { label: "Users", value: totals.totalUsers || 0, icon: <FaUsers /> },
        ]}
        actions={profileActions}
      />

      <StatsCards
        projectStatus={projectStatus}
        bugStatus={bugStatus}
        totals={totals}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2 mb-2">
          <h1 className="text-xl md:text-3xl font-bold text-(--primary) mb-5">
            Bugs
          </h1>
          {filteredBugs.length > 5 && (
            <PrimaryButton
              title="View All"
              variant="outline"
              className="max-w-[180px]"
              handler={handleViewallBug}
            >
              {showAll ? "Show Less" : "View All"}
            </PrimaryButton>
          )}
        </div>

        <BugsTable bugs={displayedBugs} onView={handleViewBug} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2 mb-2">
          <h1 className="text-xl md:text-3xl font-bold text-(--primary) mb-5">
            Projects
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 mb-2 items-center">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-2xl cursor-pointer hover:bg-[var(--primary)] hover:text-(--accent-light) ${
                  selectedStatus === status
                    ? "bg-[var(--primary)] text-(--accent-light)"
                    : "border"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredProjects.length > 5 && (
            <PrimaryButton
              title="View All"
              variant="outline"
              className="max-w-[180px]"
              handler={handleViewallProject}
            >
              {showAll ? "Show Less" : "View All"}
            </PrimaryButton>
          )}
        </div>
        <ProjectsTable
          projects={displayedProjects}
          onView={handleViewProject}
        />
      </div>

      <TeamList team={filteredTeams} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <Notifications notifications={filteredNotifications} />
        </div>
        <ActivityList activities={filteredNotifications} />
      </div>
    </div>
  );
};

/* ---------------- Header ---------------- */
Dashboard.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Dashboard"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search everything..."
      />
    }
  />
);

export default Dashboard;
