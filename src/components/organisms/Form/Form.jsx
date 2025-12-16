import { useState } from "react";
import InputField from "../../molecules/InputField/InputField";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

export default function Form({
  title,
  sections = [],
  onSubmit,
  submitText = "Submit",
}) {
  const initialState = sections.reduce((acc, section) => {
    section.fields.forEach((f) => {
      acc[f.id] = f.defaultValue || "";
    });
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto space-y-10 "
    >
      {/* HEADER */}
      <div className="bg-(--primary) rounded-2xl border shadow-sm p-8 text-center ">
        <h1 className="text-3xl font-bold text-(--accent-light)">
          {title}
        </h1>
        <p className="text-(--accent-light) mt-2">
        { ` Fill in the information below to create a new ${title}`}
        </p>
      </div>

      {/* FORM CONTENT */}
      <div className="bg-(--text-secondary)/20 rounded-2xl border shadow-lg p-8 space-y-12">
        {sections.map((section, index) => (
          <div key={section.title}>
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h2>
              <p className="text-sm text-gray-500">
                {section.description}
              </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => (
                <div
                  key={field.id}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <InputField
                    {...field}
                    value={formData[field.id]}
                    onChange={(value) =>
                      handleChange(field.id, value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Divider */}
            {index !== sections.length - 1 && (
              <div className="mt-10 border-t" />
            )}
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end pb-6">
        <PrimaryButton
          type="submit"
          title={submitText}
          variant="outline"
          className="w-full md:w-1/4 hover:bg-(--primary) hover:text-(--accent-light)"
        />
      </div>
    </form>
  );
}
