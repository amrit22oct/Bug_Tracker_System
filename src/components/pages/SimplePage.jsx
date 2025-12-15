import React, { useState } from "react";
import PrimaryButton from "../atoms/Buttons/PrimaryButton";
import PrimaryDropdown from "../atoms/Dropdown/PrimaryDropDown.jsx";
import PrimarySearchBar from "../atoms/Searchbar/PrimarySearchBar.jsx";
import ProfilePic from "../atoms/Profile/ProfilePic.jsx";
import FluidText from "../atoms/FluidText";
import Container3D from "../atoms/Container3D";
import { FaReact } from "react-icons/fa";
import Typography3D from "../atoms/TypoGraphy";
import Form from "../organisms/Form";
import InputField from "../molecules/InputField";

const SimplePage = () => {
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");

  const handleClick = (title) => {
    alert(`Button "${title}" clicked!`);
  };

  return (
    <div className="w-full h-full p-8 bg-(--accent-light)/60 overflow-auto">
      <h1 className="text-3xl font-bold text-[var(--primary)]">
        Button Palette Preview
      </h1>
      <p className="mt-3 text-gray-600 max-w-lg">
        Visually test button variants, colors, sizes, and click events.
      </p>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        {/* Profile pics */}
        <div className="flex items-center gap-4 mb-6">
          <ProfilePic
            name="John Doe"
            size={60}
            bgColor="#4F46E5"
            textColor="#fff"
          />
          <ProfilePic
            name="Alice"
            size={50}
            bgColor="#10B981"
            textColor="#fff"
          />
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Buttons */}
          <PrimaryButton
            title="Primary Small"
            variant="primary"
            className="h-9 px-3 text-sm"
            handler={() => handleClick("Primary Small")}
          />
          <PrimaryButton
            title="Secondary Medium"
            variant="secondary"
            className="h-11 px-4 text-sm"
            handler={() => handleClick("Secondary Medium")}
          />
          <PrimaryButton
            title="Accent Large"
            variant="accent"
            className="h-14 px-6"
            handler={() => handleClick("Accent Large")}
          />
          <PrimaryButton
            title="Accent Light Small"
            variant="accentLight"
            className="h-9 px-3 text-sm"
            handler={() => handleClick("Accent Light Small")}
          />
          <PrimaryButton
            title="Success Medium"
            variant="success"
            className="h-11 px-4"
            handler={() => handleClick("Success Medium")}
          />
          <PrimaryButton
            title="Warning Large"
            variant="warning"
            className="h-14 px-6"
            handler={() => handleClick("Warning Large")}
          />
          <PrimaryButton
            title="Disabled"
            variant="disabled"
            disabled
            className="h-11 px-4"
          />

          {/* Dropdown */}
          <PrimaryDropdown
            label="Select Role"
            value={role}
            onChange={setRole}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "User", value: "user" },
            ]}
          />

          {/* Search Bar */}
          <PrimarySearchBar
            value={query}
            onChange={setQuery}
            onSearch={() => console.log("Searching:", query)}
            placeholder="Search users..."
          />

          {/* 3D Containers */}
          <Container3D
            width={300}
            height={200}
            background="var(--secondary-hover)"
            borderRadius={16}
          >
            <h1 className="font-[1000] text-3xl">
              <FluidText fontFamily="Gabriela" maxScale={1.3}>
                Fluid Logo Text
              </FluidText>
            </h1>
          </Container3D>

          <Container3D
            width={250}
            height={180}
            background="#61dafb"
            borderRadius={20}
            className="flex items-center justify-center"
          >
            <FaReact size={80} color="#fff" />
          </Container3D>

          <Container3D
            width={300}
            height={200}
            background="#10B981"
            borderRadius={16}
            className="flex items-center justify-center"
          >
            <Typography3D
              text="Hello 3D"
              fontSize={48}
              color="#fff"
              depth={10}
              offset={2}
              tilt={10}
            />
          </Container3D>

          {/* Form Example */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Form />
          </div>

          {/* Individual Input Fields */}
          <InputField
            id="preview-name"
            label="Preview Name Input"
            value={query}
            onChange={setQuery}
            placeholder="Type something..."
          />
          <InputField
            id="preview-email"
            type="email"
            label="Email Input"
            value={query}
            onChange={setQuery}
            placeholder="Email example..."
          />
        </div>
      </div>
    </div>
  );
};

export default SimplePage;
