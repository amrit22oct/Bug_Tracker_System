import React, { useState, useMemo } from "react";
import ProfileHeader from "../../organisms/Test/ProfileHeader.jsx";
import StatsCards from "../../organisms/Test/StatsCard.jsx";
import ProjectsTable from "../../organisms/Test/ProjectTable.jsx";
import BugsTable from "../../organisms/Test/BugTable.jsx";
import ActivityList from "../../organisms/Test/Activity.jsx";
import CalendarWidget from "../../organisms/Test/CalendarWidget.jsx";
import Notifications from "../../organisms/Test/Notificatioin.jsx";
import TeamProgress from "../../organisms/Test/TeamProgress.jsx";
import TeamList from "../../organisms/Test/TeamList.jsx";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";

/* 🔎 Generic search helper */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const Dashboard = ({ searchValue = "" }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  /* ---------------- DATA ---------------- */

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

  const projects = [
    {
      id: 201,
      name: "Website Redesign",
      manager: "Alice",
      status: "Active",
      progress: 65,
    },
    {
      id: 202,
      name: "Mobile App",
      manager: "Bob",
      status: "Completed",
      progress: 100,
    },
    {
      id: 203,
      name: "API Development",
      manager: "John",
      status: "In Progress",
      progress: 40,
    },
    {
      id: 204,
      name: "CRM Integration",
      manager: "Alice",
      status: "On Hold",
      progress: 20,
    },
    {
      id: 205,
      name: "Analytics Dashboard",
      manager: "Bob",
      status: "Delayed",
      progress: 50,
    },
    {
      id: 206,
      name: "Marketing Website",
      manager: "John",
      status: "Cancelled",
      progress: 0,
    },
    {
      id: 207,
      name: "Support Portal",
      manager: "Alice",
      status: "Recent",
      progress: 10,
    },
  ];

  const bugs = [
    { id: 101, title: "Login page error", priority: "High", status: "Open" },
    {
      id: 102,
      title: "Signup validation",
      priority: "Medium",
      status: "In Progress",
    },
    { id: 103, title: "Dashboard slow", priority: "Low", status: "Closed" },
  ];

  const activities = [
    "Alice created a new bug",
    "Bob completed Mobile App",
    "John updated API progress",
    "CRM Integration put on hold",
  ];

  const team = [
    { name: "Alice", role: "Frontend Developer", progress: 78 },
    { name: "Bob", role: "Backend Developer", progress: 62 },
    { name: "John", role: "API Engineer", progress: 55 },
    { name: "Sarah", role: "QA Engineer", progress: 88 },
  ];

  const notifications = [
    "New bug assigned to you",
    "API Development deadline approaching",
    "Alice commented on Website Redesign",
    "Mobile App marked completed",
  ];

  /* ---------------- FILTERING ---------------- */

  const search = searchValue.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    const statusFiltered =
      selectedStatus === "All"
        ? projects
        : projects.filter((p) => p.status === selectedStatus);

    if (!search) return statusFiltered;

    return statusFiltered.filter(
      (p) =>
        matchesSearch(p.name, search) ||
        matchesSearch(p.manager, search) ||
        matchesSearch(p.status, search)
    );
  }, [projects, selectedStatus, search]);

  const filteredBugs = useMemo(() => {
    if (!search) return bugs;

    return bugs.filter(
      (b) =>
        matchesSearch(b.title, search) ||
        matchesSearch(b.status, search) ||
        matchesSearch(b.priority, search)
    );
  }, [bugs, search]);

  const filteredTeam = useMemo(() => {
    if (!search) return team;

    return team.filter(
      (m) => matchesSearch(m.name, search) || matchesSearch(m.role, search)
    );
  }, [team, search]);

  const filteredActivities = useMemo(() => {
    if (!search) return activities;

    return activities.filter((a) => matchesSearch(a, search));
  }, [activities, search]);

  const filteredNotifications = useMemo(() => {
    if (!search) return notifications;

    return notifications.filter((n) => matchesSearch(n, search));
  }, [notifications, search]);

  /* ---------------- UI ---------------- */

  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)] overflow-auto space-y-10">
      <ProfileHeader />
      <StatsCards />

      <BugsTable bugs={filteredBugs} />

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2 ">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-2xl cursor-pointer hover:bg-[var(--primary)] hover:text-(--accent-light) ${
                selectedStatus === status
                  ? "bg-[var(--primary)] text-(--accent-light)"
                  : "border "
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <ProjectsTable projects={filteredProjects} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamProgress team={filteredTeam} />
        <TeamList team={filteredTeam} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <Notifications notifications={filteredNotifications} />
        </div>
        <ActivityList activities={filteredActivities} />
      </div>
    </div>
  );
};

/* HEADER */
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
