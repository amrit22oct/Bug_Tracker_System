import React, { useState } from "react";
import PressedContainer from "../../atoms/PressedContainer";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Frontend Developer",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    autoUpdates: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    changePassword: "",
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "Public",
    dataSharing: true,
  });

  const [language, setLanguage] = useState({
    language: "English",
    timezone: "GMT-5",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacy((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLanguageChange = (e) => {
    const { name, value } = e.target;
    setLanguage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    // API call can go here
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-[var(--accent-light)] overflow-auto space-y-6">
      <h1 className="text-[var(--primary)] text-2xl sm:text-3xl font-semibold">
        Settings
      </h1>

      {/* Profile Settings */}
      <PressedContainer className="p-4 sm:p-6 bg-white border-[var(--primary)] rounded-xl w-full">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">
          Profile Settings
        </h2>
        <div className="flex flex-col gap-4">
          {["name", "email", "role"].map((field) => (
            <div
              key={field}
              className="flex flex-col sm:flex-row sm:items-center gap-2"
            >
              <label className="w-full sm:w-32 text-[var(--primary)] font-medium capitalize">
                {field}:
              </label>
              {field !== "role" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleProfileChange}
                  className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
                />
              ) : (
                <select
                  name={field}
                  value={profile.role}
                  onChange={handleProfileChange}
                  className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>API Engineer</option>
                  <option>QA Engineer</option>
                </select>
              )}
            </div>
          ))}
        </div>
      </PressedContainer>

      {/* Preferences */}
      <PressedContainer className="p-4 sm:p-6 bg-white border-[var(--primary)] rounded-xl w-full">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">
          Preferences
        </h2>
        <div className="flex flex-col gap-4">
          {Object.keys(preferences).map((pref) => (
            <label
              key={pref}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-[var(--primary)] capitalize font-medium">
                {pref.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                name={pref}
                checked={preferences[pref]}
                onChange={handlePreferencesChange}
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </PressedContainer>

      {/* Security Settings */}
      <PressedContainer className="p-4 sm:p-6 bg-white border-[var(--primary)] rounded-xl w-full">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">
          Account Security
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 text-[var(--primary)] font-medium">
              New Password:
            </label>
            <input
              type="password"
              name="changePassword"
              value={security.changePassword}
              onChange={handleSecurityChange}
              className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
              placeholder="Enter new password"
            />
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[var(--primary)] font-medium">
              Two-Factor Authentication
            </span>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={security.twoFactorAuth}
              onChange={handleSecurityChange}
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
            />
          </label>
        </div>
      </PressedContainer>

      {/* Privacy Settings */}
      <PressedContainer className="p-4 sm:p-6 bg-white border-[var(--primary)] rounded-xl w-full">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">
          Privacy Settings
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 text-[var(--primary)] font-medium">
              Profile Visibility:
            </label>
            <select
              name="profileVisibility"
              value={privacy.profileVisibility}
              onChange={handlePrivacyChange}
              className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[var(--primary)] font-medium">
              Share Data with Partners
            </span>
            <input
              type="checkbox"
              name="dataSharing"
              checked={privacy.dataSharing}
              onChange={handlePrivacyChange}
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
            />
          </label>
        </div>
      </PressedContainer>

      {/* Language & Region */}
      <PressedContainer className="p-4 sm:p-6 bg-white border-[var(--primary)] rounded-xl w-full">
        <h2 className="text-[var(--primary)] font-semibold text-lg mb-4">
          Language & Region
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 text-[var(--primary)] font-medium">
              Language:
            </label>
            <select
              name="language"
              value={language.language}
              onChange={handleLanguageChange}
              className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 text-[var(--primary)] font-medium">
              Timezone:
            </label>
            <select
              name="timezone"
              value={language.timezone}
              onChange={handleLanguageChange}
              className="flex-1 border border-[var(--primary)] rounded-md px-3 py-2 text-sm sm:text-base"
            >
              <option>GMT-5</option>
              <option>GMT+0</option>
              <option>GMT+5</option>
            </select>
          </div>
        </div>
      </PressedContainer>

      {/* Save Button */}
      <div className="flex justify-end">
        <PrimaryButton
          title="Save Changes"
          onClick={handleSave}
          className="px-4 py-2 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

/* HEADER */
Settings.header = () => <HeaderContent title="Settings" />;

export default Settings;
