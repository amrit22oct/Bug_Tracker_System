import { useState } from "react";
import InputField from "../../molecules/InputField";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

export default function Form({
  title = "Form",
  fields = [],
  onSubmit = () => {},
}) {
  const initialState = fields.reduce(
    (acc, f) => ({ ...acc, [f.id]: "" }),
    {}
  );

  const [formData, setFormData] = useState(initialState);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full rounded-xl p-6 bg-[rgba(var(--accent-rgb),0.06)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-center text-[var(--primary)]">
          {title}
        </h2>

        {fields.map((field) => (
          <InputField
            key={field.id}
            {...field}
            value={formData[field.id]}
            onChange={(val) => handleChange(field.id, val)}
          />
        ))}

        <PrimaryButton
          title="Submit"
          type="submit"
          variant="outline"
          className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
        />
      </form>
    </div>
  );
}
