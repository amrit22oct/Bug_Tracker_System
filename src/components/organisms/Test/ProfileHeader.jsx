import React from "react";
import { FaPlus, FaProjectDiagram, FaBug, FaUsers } from "react-icons/fa";
import ProfilePic from "../../atoms/Profile/ProfilePic.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import PressedContainer from "../../atoms/PressedContainer";

const ProfileHeader = ({
  name = "John Doe",
  role = "Senior Project Manager",
  location = "New York",
  email = "johndoe@example.com",
  stats = [
    { label: "Projects", value: 12, icon: <FaProjectDiagram /> },
    { label: "Open Bugs", value: 7, icon: <FaBug /> },
    { label: "Team Members", value: 4, icon: <FaUsers /> },
  ],
  profileSize = 100,
  actions = [
    {
      label: "New Bug",
      icon: <FaPlus />,
      variant: "primary",
      onClick: () => {},
    },
    {
      label: "New Project",
      icon: <FaProjectDiagram />,
      variant: "outline",
      className: "w-full hover:bg-(--primary) hover:text-(--accent-light)",
      onClick: () => {},
    },
  ],
}) => {
  return (
    <PressedContainer className="relative p-4 sm:p-6 bg-(--accent-light)">
      
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <ProfilePic
          name={name}
          size={profileSize}
          bgColor="#10B981"
          textColor="#fff"
          className="flex-shrink-0"
        />

        <div className="flex-1 flex flex-col gap-1 md:gap-2 text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-bold text-(--primary)">{name}</h1>
          <p className="text-(--primary)/90 text-sm md:text-base">{role}</p>
          <p className="text-(--primary)/90 text-xs md:text-sm">
            Managing {stats[0]?.value || 0} active projects | Based in {location}
          </p>
          <p className="text-(--primary)/90 text-xs md:text-sm break-all">Email: {email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 md:mt-0 md:absolute md:top-4 md:right-4 flex flex-wrap md:flex-nowrap gap-2 md:gap-3 justify-center md:justify-end">
        {actions.map((btn, idx) => (
          <PrimaryButton
            key={idx}
            title={
              <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                {btn.icon}
                {btn.label}
              </span>
            }
            variant={btn.variant}
            handler={btn.onClick}
            className={`h-8 md:h-10 px-2 md:px-4 text-xs md:text-sm ${btn.className || ""}`}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 md:mt-6">
        {stats.map((s, idx) => (
          <PressedContainer
            key={idx}
            className="
              flex flex-col items-center p-3 sm:p-4
              bg-(--secondary)/40 rounded-2xl
              border border-var(--primary-hover)
              transition-all
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="text-(--primary) text-xl sm:text-2xl mb-1 sm:mb-2">{s.icon}</div>
            <p className="text-(--primary)/90 text-xs sm:text-sm">{s.label}</p>
            <p className="text-(--primary)/90 font-semibold text-lg sm:text-xl">{s.value}</p>
          </PressedContainer>
        ))}
      </div>
    </PressedContainer>
  );
};

export default ProfileHeader;
