import Form from "../../organisms/Form/Form";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";

export default function AddBug() {
  const sections = [
    {
      title: "Basic Information",
      description: "Core details about the bug",
      fields: [
        {
          id: "title",
          label: "Bug Title",
          type: "text",
          placeholder: "Login page crashes on submit",
          required: true,
          fullWidth: true,
        },
        {
          id: "project",
          label: "Project",
          type: "text",
          placeholder: "Website Redesign",
        },
        {
          id: "type",
          label: "Bug Type",
          type: "select",
          options: ["Functional", "UI", "Performance", "Security"],
        },
      ],
    },
    {
      title: "Classification",
      description: "Impact and urgency of the bug",
      fields: [
        {
          id: "priority",
          label: "Priority",
          type: "select",
          options: ["Low", "Medium", "High", "Critical"],
          defaultValue: "Medium",
        },
        {
          id: "severity",
          label: "Severity",
          type: "select",
          options: ["Minor", "Major", "Blocker"],
          defaultValue: "Minor",
        },
        {
          id: "status",
          label: "Status",
          type: "select",
          options: ["Open", "In Progress", "Resolved", "Closed"],
          defaultValue: "Open",
        },
      ],
    },
    {
      title: "Assignment",
      description: "Ownership and accountability",
      fields: [
        { id: "assignedTo", label: "Assigned To", type: "text" },
        { id: "reporter", label: "Reported By", type: "text" },
        { id: "dueDate", label: "Due Date", type: "date" },
      ],
    },
    {
      title: "Detailed Description",
      description: "Explain the bug clearly",
      fields: [
        {
          id: "description",
          label: "Description",
          type: "textarea",
          fullWidth: true,
        },
        {
          id: "steps",
          label: "Steps to Reproduce",
          type: "textarea",
          fullWidth: true,
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
   console.log("FULL BUG DATA:", data);
 };

 return (
   <div className="h-full w-full bg-[var(--accent-light)] flex justify-center overflow-auto">
     <div className="w-full max-w-7xl h-full px-6 py-10">
       <Form
         title="Create New Bug"
         sections={sections}
         onSubmit={handleSubmit}
         submitText="Create Bug"
       />
     </div>
   </div>
 );
}

AddBug.header = () => <HeaderContent title="Add Bug" />;
