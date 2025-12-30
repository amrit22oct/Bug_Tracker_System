import React, { useMemo, useState, useEffect } from "react";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import {
  FaUsers,
  FaUserTie,
  FaCode,
  FaTasks,
  FaLayerGroup,
} from "react-icons/fa";
import teamService from "../../../services/api/team.service.js";
import bugService from "../../../services/api/bug.service.js";

/* 🔎 search helper */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const TLUserManagement = ({ searchValue = "" }) => {
  /* ---------------- STATES ---------------- */
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [loading, setLoading] = useState(false);

  // Assign Bug
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedBug, setSelectedBug] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchTLData = async () => {
      try {
        setLoading(true);

        const res = await teamService.getTeamLeadersTeamDetails();
        const { team, projects } = res.data;

        // Team
        setTeams([team]);

        // Projects (already includes bugs)
        setProjects(projects);

        // Users = leader + members
        const uniqueUsers = new Map();
        if (team.lead) uniqueUsers.set(team.lead._id, team.lead);
        team.members.forEach((m) => uniqueUsers.set(m._id, m));

        setUsers([...uniqueUsers.values()]);
      } catch (error) {
        console.error("Failed to load TL dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTLData();
  }, []);

  /* ---------------- FILTER USERS ---------------- */
  const search = searchValue.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    const roleFiltered =
      selectedRole === "All"
        ? users
        : users.filter((u) => u.role === selectedRole);

    if (!search) return roleFiltered;

    return roleFiltered.filter(
      (u) =>
        matchesSearch(u.name, search) ||
        matchesSearch(u.email, search) ||
        matchesSearch(u.role, search)
    );
  }, [users, selectedRole, search]);

  /* ---------------- ASSIGN BUG ---------------- */
  const handleAssignBug = async () => {
    if (!selectedBug || !selectedDeveloper) {
      alert("Select bug & developer");
      return;
    }

    try {
      await bugService.assignBug(selectedBug, selectedDeveloper);
      alert("Bug assigned successfully");

      setShowAssignModal(false);
      setSelectedBug("");
      setSelectedDeveloper("");
      setSelectedProject("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign bug");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full w-full p-8 space-y-10 bg-[var(--accent-light)]">
      {/* ================= USERS ================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex gap-2 items-center">
          <FaUsers /> My Team Members
        </h2>

        <div className="flex gap-2">
          {["All", "TeamLeader", "Developer"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-xl ${
                selectedRole === role
                  ? "bg-[var(--primary)] text-white"
                  : "border"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 flex items-center gap-2">
                    {user.role === "TeamLeader" && <FaUserTie />}
                    {user.role === "Developer" && <FaCode />}
                    {user.role}
                  </td>
                  <td className="p-4">
                    <FaTasks className="text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= TEAMS ================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex gap-2 items-center">
          <FaLayerGroup /> My Team
        </h2>

        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <h3 className="font-semibold">{team.name}</h3>
            <p>
              <b>Leader:</b> {team.lead.name}
            </p>
            <p>
              <b>Members:</b> {team.members.length}
            </p>
            <p>
              <b>Projects:</b> {projects.map((p) => p.name).join(", ")}
            </p>

            <button
              onClick={() => {
                setCurrentTeam(team);
                setShowAssignModal(true);
              }}
              className="text-blue-600 text-sm"
            >
              Assign Bug
            </button>
          </div>
        ))}
      </section>

      {/* ================= ASSIGN BUG MODAL ================= */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 space-y-4">
            <h3 className="text-lg font-semibold">Assign Bug</h3>

            <select
              className="border p-2 w-full rounded"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full rounded"
              value={selectedBug}
              onChange={(e) => setSelectedBug(e.target.value)}
            >
              <option value="">Select Bug</option>

              {projects
                .find((p) => p._id === selectedProject)
                ?.bugs?.filter((b) => !b.assignedTo)
                .map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.title} ({b.priority})
                  </option>
                ))}

              {/* Show message if no unassigned bugs */}
              {projects
                .find((p) => p._id === selectedProject)
                ?.bugs?.filter((b) => !b.assignedTo).length === 0 && (
                <option disabled>No unassigned bugs</option>
              )}
            </select>

            <select
              className="border p-2 w-full rounded"
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            >
              <option value="">Select Developer</option>
              {users
                .filter((u) => u.role === "Developer")
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="border px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignBug}
                className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* 🔥 HEADER */
TLUserManagement.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="My Team Management"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search team members..."
      />
    }
  />
);

export default TLUserManagement;
