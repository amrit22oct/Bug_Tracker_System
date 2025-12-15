import React, { useState } from "react";
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

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchValue, setSearchValue] = useState("");

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
      deadline: "2025-01-15",
    },
    {
      id: 202,
      name: "Mobile App",
      manager: "Bob",
      status: "Completed",
      progress: 100,
      deadline: "2024-12-30",
    },
    {
      id: 203,
      name: "API Development",
      manager: "John",
      status: "In Progress",
      progress: 40,
      deadline: "2025-02-10",
    },
    {
      id: 204,
      name: "CRM Integration",
      manager: "Alice",
      status: "On Hold",
      progress: 20,
      deadline: "2025-03-01",
    },
    {
      id: 205,
      name: "Analytics Dashboard",
      manager: "Bob",
      status: "Delayed",
      progress: 50,
      deadline: "2025-01-20",
    },
    {
      id: 206,
      name: "Marketing Website",
      manager: "John",
      status: "Cancelled",
      progress: 0,
      deadline: "2025-02-28",
    },
    {
      id: 207,
      name: "Support Portal",
      manager: "Alice",
      status: "Recent",
      progress: 10,
      deadline: "2025-03-15",
    },
  ];

  const bugs = [
    {
      id: 101,
      title: "Login page error",
      priority: "High",
      status: "Open",
      created: "2025-12-01",
    },
    {
      id: 102,
      title: "Signup validation",
      priority: "Medium",
      status: "In Progress",
      created: "2025-11-28",
    },
    {
      id: 103,
      title: "Dashboard slow",
      priority: "Low",
      status: "Closed",
      created: "2025-11-25",
    },
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

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((p) => p.status === selectedStatus);

  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)]/60 overflow-auto space-y-10">
      {/* PROFILE */}
      <ProfileHeader />

      {/* STATS */}
      <StatsCards />

      {/* BUGS */}
      <BugsTable bugs={bugs} />

      {/* PROJECTS */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-2xl transition cursor-pointer ${
                selectedStatus === status
                  ? "bg-[var(--primary)] text-(--accent-light)"
                  : " border"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <ProjectsTable projects={filteredProjects} />
      </div>

      {/* TEAM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamProgress team={team} />
        <TeamList team={team} />
      </div>

      {/* CALENDAR + NOTIFICATIONS + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <Notifications notifications={notifications} />
        </div>
        <ActivityList activities={activities} />
      </div>
    </div>
  );
};

Dashboard.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="Dashboard"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search projects..."
        height="42px"
      />
    }
  />
);

export default Dashboard;
