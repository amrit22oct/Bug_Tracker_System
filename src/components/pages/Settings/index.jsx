import React, { useState } from "react";
import PressedContainer from "../../atoms/PressedContainer";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import HeaderContent from "../../templates/AppHeader/HeaderContent.jsx";
import { FiUser, FiSettings, FiShield, FiLock, FiGlobe, FiBell, FiLink } from "react-icons/fi";

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

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
  });

  const [connectedApps, setConnectedApps] = useState([
    { name: "Slack", connected: true },
    { name: "GitHub", connected: true },
    { name: "Trello", connected: false },
  ]);

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

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleConnectedAppToggle = (index) => {
    setConnectedApps((prev) => {
      const updated = [...prev];
      updated[index].connected = !updated[index].connected;
      return updated;
    });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const cardStyle =
    "bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full";

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-(--accent-light) space-y-6 overflow-auto">
      {/* PROFILE */}
      <PressedContainer className={cardStyle}>
        <div className="flex items-center gap-3 mb-4">
          <FiUser size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "role"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium capitalize">{field}</label>
              {field !== "role" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleProfileChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <select
                  name={field}
                  value={profile.role}
                  onChange={handleProfileChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="flex flex-col lg:flex-row gap-4">
        {/* PREFERENCES */}
        <PressedContainer className={cardStyle}>
          <div className="flex items-center gap-3 mb-4">
            <FiSettings size={24} className="text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
          </div>
          <div className="flex flex-col gap-3">
            {Object.keys(preferences).map((pref) => (
              <label key={pref} className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium capitalize">
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

        {/* SECURITY */}
        <PressedContainer className={cardStyle}>
          <div className="flex items-center gap-3 mb-4">
            <FiShield size={24} className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">New Password</label>
              <input
                type="password"
                name="changePassword"
                value={security.changePassword}
                onChange={handleSecurityChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter new password"
              />
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
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
      </div>

      {/* PRIVACY */}
      <PressedContainer className={cardStyle}>
        <div className="flex items-center gap-3 mb-4">
          <FiLock size={24} className="text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-800">Privacy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Profile Visibility</label>
            <select
              name="profileVisibility"
              value={privacy.profileVisibility}
              onChange={handlePrivacyChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 font-medium">Share Data with Partners</span>
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

      {/* LANGUAGE & REGION */}
      <PressedContainer className={cardStyle}>
        <div className="flex items-center gap-3 mb-4">
          <FiGlobe size={24} className="text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Language & Region</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Language</label>
            <select
              name="language"
              value={language.language}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Timezone</label>
            <select
              name="timezone"
              value={language.timezone}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option>GMT-5</option>
              <option>GMT+0</option>
              <option>GMT+5</option>
            </select>
          </div>
        </div>
      </PressedContainer>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* NOTIFICATIONS */}
        <PressedContainer className={cardStyle}>
          <div className="flex items-center gap-3 mb-4">
            <FiBell size={24} className="text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="flex flex-col gap-3">
            {Object.keys(notifications).map((key) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <input
                  type="checkbox"
                  name={key}
                  checked={notifications[key]}
                  onChange={handleNotificationsChange}
                  className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </PressedContainer>

        {/* CONNECTED APPS */}
        <PressedContainer className={cardStyle}>
  <div className="flex items-center gap-3 mb-4">
    <FiLink size={24} className="text-teal-500" />
    <h2 className="text-xl font-semibold text-gray-800">Connected Apps</h2>
  </div>
  <div className="flex flex-col gap-3">
    {connectedApps.map((app, idx) => (
      <div
        key={app.name}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-200 rounded-md px-4 py-3 hover:shadow-md transition-all duration-200 gap-2"
      >
        <span className="text-gray-700 font-medium">{app.name}</span>
        <PrimaryButton
          title={app.connected ? "Disconnect" : "Connect"}
          onClick={() => handleConnectedAppToggle(idx)}
          variant="outline"
          className="w-full sm:w-auto min-w-[160px] max-w-[250px] px-3 py-2 text-sm hover:text-(--accent-light) hover:bg-(--primary)"
        />
      </div>
    ))}
  </div>
</PressedContainer>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <PrimaryButton
          title="Save Changes"
          onClick={handleSave}
          variant="outline"
          className="px-6 py-2 text-base hover:text-(--accent-light) hover:bg-(--primary) min-w-[160px] max-w-[250px] "
        />
      </div>
    </div>
  );
};

Settings.header = () => <HeaderContent title="Settings" />;

export default Settings;
