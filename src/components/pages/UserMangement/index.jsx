import React, { useMemo, useState } from "react";
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

/* 🔎 search helper */
const matchesSearch = (value, search) =>
  value?.toString().toLowerCase().includes(search.toLowerCase());

const Users = ({ searchValue = "" }) => {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [selectedRole, setSelectedRole] = useState("All");
  const [expandedUserId, setExpandedUserId] = useState(null);

  const [assignType, setAssignType] = useState("Project");
  const [assignItem, setAssignItem] = useState("");
  const [assignTeam, setAssignTeam] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  /* ---------------- DATA ---------------- */
  const roles = ["All", "Admin", "Team Leader", "Developer"];

  const teams = [
    {
      id: 1,
      name: "Frontend Team",
      leader: "Alice Johnson",
      members: ["Bob Smith", "Sarah Lee"],
    },
    {
      id: 2,
      name: "Backend Team",
      leader: "John Doe",
      members: ["Bob Smith"],
    },
    {
      id: 3,
      name: "Androide Team",
      leader: "John Doe",
      members: ["Bob Smith"],
    },
    {
      id: 4,
      name: "Ios Team",
      leader: "John Doe",
      members: ["Bob Smith"],
    },
  ];

  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "alice",
      email: "alice@example.com",
      role: "Team Leader",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bob",
      email: "bob@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 3,
      name: "John Doe",
      username: "john",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Lee",
      username: "sarah",
      email: "sarah@example.com",
      role: "Developer",
      status: "Inactive",
    },
  ];

  /* ---------------- FILTERING ---------------- */
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

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full w-full p-8 bg-[var(--accent-light)] space-y-10 overflow-auto">

      {/* ================= USERS ================= */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaUsers /> Users
          </h2>

          <button
            onClick={() => navigate("/add-user")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-(--accent-light)"
          >
            <FaUserPlus /> Add User
          </button>
        </div>

        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-2xl ${
                selectedRole === role
                  ? "bg-[var(--primary)] text-(--accent-light)"
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
                <React.Fragment key={user.id}>
                  <tr className="border-t">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4 flex gap-2 items-center">
                      {user.role === "Admin" && <FaUserTie />}
                      {user.role === "Developer" && <FaCode />}
                      {user.role}
                    </td>
                    <td className="p-4">{user.status}</td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          setExpandedUserId(
                            expandedUserId === user.id ? null : user.id
                          )
                        }
                        className="text-blue-600"
                      >
                        <FaTasks /> Assign
                      </button>
                    </td>
                  </tr>

                  {/* ASSIGNMENT PANEL */}
                  {expandedUserId === user.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <select
                            value={assignType}
                            onChange={(e) => setAssignType(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option>Project</option>
                            <option>Bug</option>
                          </select>

                          <select
                            value={assignItem}
                            onChange={(e) => setAssignItem(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="">Select</option>
                            <option>{assignType} A</option>
                            <option>{assignType} B</option>
                          </select>

                          <select
                            value={assignTeam}
                            onChange={(e) => setAssignTeam(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="">Team</option>
                            {teams.map((t) => (
                              <option key={t.id}>{t.name}</option>
                            ))}
                          </select>

                          <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                          </select>

                          <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="border p-2 rounded"
                          />
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
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaLayerGroup /> Teams
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-2xl shadow p-4 space-y-2"
            >
              <h3 className="font-semibold">{team.name}</h3>
              <p>
                <b>Leader:</b> {team.leader}
              </p>
              <p>
                <b>Members:</b> {team.members.join(", ")}
              </p>

              <div className="flex gap-2 pt-2">
                <button className="text-sm text-blue-600">
                  Assign Leader
                </button>
                <button className="text-sm text-purple-600">
                  Add Member
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* HEADER */
Users.header = ({ searchValue, setSearchValue }) => (
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

export default Users;
