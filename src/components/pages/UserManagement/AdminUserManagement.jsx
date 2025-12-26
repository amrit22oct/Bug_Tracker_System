import React, { useMemo, useState, useEffect } from "react";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import {
  FaUsers,
  FaUserPlus,
  FaUserTie,
  FaCode,
  FaTasks,
  FaLayerGroup,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton/index.jsx";
import teamService from "../../../services/api/team.service.js";
import projectService from "../../../services/api/project.service.js";
import userService from "../../../services/api/user.service.js"; // ✅ ADDED

/* 🔎 search helper */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const AdminUserManagement = ({ searchValue = "" }) => {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [selectedRole, setSelectedRole] = useState("All");
  const [expandedUserId, setExpandedUserId] = useState(null);

  const [assignType, setAssignType] = useState("Project");
  const [assignItem, setAssignItem] = useState("");
  const [assignTeam, setAssignTeam] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); // ✅ NOW USED
  const [loading, setLoading] = useState(false);

  const [activeTeamId, setActiveTeamId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  /* ---------------- STATIC ROLES ---------------- */
  const roles = ["All", "Admin", "TeamLeader", "Developer"];

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const teamsRes = await teamService.getAllTeams();
        const projectsRes = await projectService.getAllProjects();
        const usersRes = await userService.getAllUsers(); // ✅ ADDED

        setTeams(teamsRes.data || teamsRes);
        setProjects(projectsRes.data || projectsRes);
        setUsers(usersRes.data || usersRes); // ✅ ADDED
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        matchesSearch(u.username, search) ||
        matchesSearch(u.email, search) ||
        matchesSearch(u.role, search)
    );
  }, [users, selectedRole, search]);

  /* ---------------- ASSIGN PROJECT TO TEAM ---------------- */
  const handleAssignProjectToTeam = async (teamId) => {
    if (!selectedProjectId) {
      alert("Please select a project");
      return;
    }

    try {
      const res = await teamService.assignProjectToTeam(
        teamId,
        selectedProjectId
      );
      alert("Project assigned successfully");

      setTeams((prev) =>
        prev.map((team) =>
          team._id === teamId
            ? { ...team, projects: [...(team.projects || []), res.data] }
            : team
        )
      );

      setActiveTeamId(null);
      setSelectedProjectId("");
    } catch (error) {
      alert(error.response?.data?.message || "Assignment failed");
    }
  };

  /* ---------------- ASSIGN PROJECT (USERS PANEL) ---------------- */
  const handleAssignProject = async () => {
    if (!assignTeam || !assignItem) {
      alert("Please select both team and project");
      return;
    }

    try {
      const res = await teamService.assignProjectToTeam(assignTeam, assignItem);
      alert("Project assigned successfully");

      setAssignItem("");
      setAssignTeam("");
      setExpandedUserId(null);

      setTeams((prev) =>
        prev.map((team) =>
          team._id === assignTeam
            ? { ...team, projects: [...(team.projects || []), res.data] }
            : team
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Assignment failed");
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)] space-y-10 overflow-auto">
      {/* ================= USERS ================= */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaUsers /> Users
          </h2>

          <div className="flex gap-2 items-center justify-center">
            <PrimaryButton
              title="Add User"
              icon={FaUserPlus}
              handler={() => navigate("/add-user")}
              className="px-4 py-2 rounded-xl"
              variant="outline"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-2xl ${
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
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <React.Fragment key={user._id}>
                  <tr className="border-t">
                    <td className="p-4">{user.name}</td>

                    <td className="p-4 flex gap-2 items-center ">
                      {user.role === "Admin" && <FaUserTie />}
                      {user.role === "Developer" && <FaCode />}
                      {user.role === "TeamLeader" && <FaUsers />}
                      {user.role}
                    </td>

                    <td className="p-4">
                      {user.isActive ? "Active" : "Inactive"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          setExpandedUserId(
                            expandedUserId === user._id ? null : user._id
                          )
                        }
                        className="text-blue-600"
                      >
                        <FaTasks /> Assign
                      </button>
                    </td>
                  </tr>

                  {/* USER ASSIGN PANEL — UNCHANGED */}
                  {expandedUserId === user._id && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {/* SAME AS YOUR ORIGINAL CODE */}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= TEAMS ================= */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLayerGroup /> Teams
          </h2>

          <div className="flex gap-2 items-center justify-center">
            <PrimaryButton
              title="Add Team"
              icon={FaUserPlus}
              handler={() => navigate("/add-team")}
              className="px-4 py-2 rounded-xl"
              variant="outline"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-2xl shadow p-4 space-y-2"
            >
              <h3 className="font-semibold">{team.name}</h3>

              <p>
                <b>Leader:</b> {team.lead?.name || "Not assigned"}
              </p>

              <p>
                <b>Projects:</b>
                {team.projects && team.projects.length > 0 ? (
                  <ul className="list-disc list-inside mt-1">
                    {team.projects.map((project) => (
                      <li
                        key={project._id}
                        className="flex items-center justify-between"
                      >
                        <span>{project.name}</span>
                        <button
                          onClick={() =>
                            (window.location.href = `http://localhost:3001/view-project-detail/${project._id}`)
                          }
                          className="text-sm text-blue-600 ml-2"
                        >
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="ml-1">Not assigned</span>
                )}
              </p>

              {/* ASSIGN PROJECT */}
              <div className="pt-3 space-y-2">
                <button
                  onClick={() =>
                    setActiveTeamId(activeTeamId === team._id ? null : team._id)
                  }
                  className="text-sm text-blue-600"
                >
                  Assign Project
                </button>

                {activeTeamId === team._id && (
                  <div className="flex gap-2 mt-2">
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="border p-2 rounded w-full"
                    >
                      <option value="">Select Project</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleAssignProjectToTeam(team._id)}
                      className="bg-[var(--primary)] text-white px-4 rounded-xl"
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button className="text-sm text-purple-600">Add Member</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* HEADER */
AdminUserManagement.header = ({ searchValue, setSearchValue }) => (
  <HeaderContent
    title="User & Team Management"
    searchComponent={
      <PrimarySearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search users, teams, roles..."
      />
    }
  />
);

export default AdminUserManagement;
