import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../organisms/Form/Form";
import userService from "../../../services/api/user.service";
import teamService from "../../../services/api/team.service";
import { showSuccess, showError } from "@/utils/Toast";

export default function AddTeamForm() {
  const navigate = useNavigate();

  const [teamLeaders, setTeamLeaders] = useState([]);
  const [developers, setDevelopers] = useState([]);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const leaders = await userService.getUsersByRole("TeamLeader");
        const devs = await userService.getUsersByRole("Developer");

        setTeamLeaders(
          leaders.data.map((u) => ({
            label: `${u.name} (${u.email})`,
            value: u._id,
          }))
        );

        setDevelopers(
          devs.data.map((u) => ({
            label: `${u.name} (${u.email})`,
            value: u._id,
          }))
        );
      } catch (err) {
        showError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  /* ================= FORM SECTIONS ================= */
  const sections = [
    {
      title: "Team Information",
      description: "Basic team details",
      fields: [
        {
          id: "name",
          label: "Team Name",
          type: "text",
          fullWidth: true,
        },
        {
          id: "description",
          label: "Description",
          type: "textarea",
          fullWidth: true,
        },
      ],
    },
    {
      title: "Team Structure",
      description: "Assign leader and members",
      fields: [
        {
          id: "lead",
          label: "Team Leader",
          type: "select",
          options: teamLeaders,
        },
        {
          id: "members",
          label: "Team Members",
          type: "multiselect",
          options: developers,
          fullWidth: true,
        },
      ],
    },
  ];

  /* ================= SUBMIT ================= */
  const handleSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      lead: data.lead,
      members: Array.from(new Set([data.lead, ...data.members])),
    };

    try {
      await teamService.createTeam(payload);
      showSuccess("Team created successfully 🎉");
      navigate("/teams");
    } catch (err) {
      showError("Failed to create team");
    }
  };

  return (
    <Form
      title="Add Team"
      subtitle="Create a team and assign members"
      sections={sections}
      submitText="Create Team"
      onSubmit={handleSubmit}
    />
  );
}
