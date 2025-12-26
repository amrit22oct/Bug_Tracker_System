import React, { useMemo, useState, useEffect } from "react";
import Cookies from "js-cookie";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import PrimarySearchBar from "../../atoms/Searchbar/PrimarySearchBar.jsx";
import {
  FaUsers,
  FaUserTie,
  FaCode,
  FaTasks,
  FaLayerGroup,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import teamService from "../../../services/api/team.service.js";
import projectService from "../../../services/api/project.service.js";
import userService from "../../../services/api/user.service.js";
import bugService from "../../../services/api/bug.service.js";

/* 🔎 search helper */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const TLUserManagement = ({ searchValue = "" }) => {
  const navigate = useNavigate();
  const loggedInUserId = Cookies.get("bt_userId");

  /* ---------------- STATES ---------------- */
  const [selectedRole, setSelectedRole] = useState("All");
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedBug, setSelectedBug] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  /* ---------------- ROLES ---------------- */
  const roles = ["All", "TeamLeader", "Developer"];

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const teamsRes = await teamService.getAllTeams();
        const projectsRes = await projectService.getAllProjects();
        const usersRes = await userService.getAllUsers();

        const allTeams = teamsRes.data || teamsRes;
        const tlTeams = allTeams.filter(
          (team) => team.lead?._id === loggedInUserId
        );
        setTeams(tlTeams);

        setProjects(projectsRes.data || projectsRes);

        const teamMemberIds = new Set(
          tlTeams.flatMap((team) => team.members?.map((m) => m._id) || [])
        );
        teamMemberIds.add(loggedInUserId);

        const allUsers = usersRes.data || usersRes;
        setUsers(allUsers.filter((u) => teamMemberIds.has(u._id)));
      } catch (error) {
        console.error("Failed to load TL data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedInUserId]);

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

  /* ---------------- FETCH BUGS FOR SELECTED PROJECT ---------------- */
  const handleProjectChange = async (projectId) => {
    setSelectedProject(projectId);
    setSelectedBug("");
    console.log("Selected project:", projectId);
  
    if (!projectId) {
      setBugs([]);
      return;
    }
  
    try {
      const projectBugs = await bugService.getBugsByProjectId(projectId);
      console.log("Bugs for project:", projectBugs);
  
      // ✅ Use the `data` array
      setBugs(projectBugs.data || []);
    } catch (error) {
      console.error("Failed to fetch project bugs", error);
      setBugs([]);
    }
  };
  

  /* ---------------- ASSIGN BUG ---------------- */
  const handleAssignBug = async () => {
    if (!selectedBug || !selectedDeveloper)
      return alert("Select bug & developer!");

    try {
      await bugService.assignBug(selectedBug, selectedDeveloper);
      alert("Bug assigned successfully!");
      setShowAssignModal(false);
      setSelectedBug("");
      setSelectedDeveloper("");
      setSelectedProject("");
      setBugs([]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign bug");
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) return <div className="p-10">Loading...</div>;

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)] space-y-10 overflow-auto">
      {/* ================= USERS ================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaUsers /> My Team Members
        </h2>

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
                <tr key={user._id} className="border-t">
                  <td className="p-4">{user.name}</td>

                  <td className="p-4 flex gap-2 items-center">
                    {user.role === "TeamLeader" && <FaUserTie />}
                    {user.role === "Developer" && <FaCode />}
                    {user.role}
                  </td>

                  <td className="p-4">{user.isActive ? "Active" : "Inactive"}</td>

                  <td className="p-4">
                    <button className="text-blue-600">
                      <FaTasks /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= TEAMS ================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaLayerGroup /> My Teams
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-2xl shadow p-4 space-y-2"
            >
              <h3 className="font-semibold">{team.name}</h3>

              <p>
                <b>Leader:</b> {team.lead?.name}
              </p>

              <p>
                <b>Members:</b> {team.members?.length || 0}
              </p>

              <p>
                <b>Projects:</b>{" "}
                {team.projects?.length
                  ? team.projects.map((p) => p.name).join(", ")
                  : "None"}
              </p>

              <button
                onClick={() => {
                  setCurrentTeam(team);
                  setShowAssignModal(true);
                }}
                className="text-sm text-blue-600"
              >
                Assign Bug
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ASSIGN BUG MODAL ================= */}
      {showAssignModal && currentTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 space-y-4">
            <h3 className="text-lg font-semibold">Assign Bug</h3>

            <div>
              <label>Project:</label>
              <select
                className="border p-2 w-full rounded"
                value={selectedProject}
                onChange={(e) => handleProjectChange(e.target.value)}
              >
                <option value="">Select Project</option>
                {currentTeam.projects?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Bug:</label>
              <select
                className="border p-2 w-full rounded"
                value={selectedBug}
                onChange={(e) => setSelectedBug(e.target.value)}
              >
                <option value="">Select Bug</option>
                {bugs.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Assign To Developer:</label>
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
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignBug}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl"
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
