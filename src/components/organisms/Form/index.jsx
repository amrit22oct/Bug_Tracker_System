import { useState } from "react";
import InputField from "../../molecules/InputField";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

export default function Form({
  title = "Form",
  fields = [],
  onSubmit = () => {},
  loading = false,        
  submitText = "Submit",  
  loadingtext = "Submiting",
}) {
  const initialState = fields.reduce(
    (acc, f) => ({ ...acc, [f.id]: "" }),
    {}
  );

  const [formData, setFormData] = useState(initialState);

  const handleChange = (id, value) => {
    if (loading) return; 
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return; 
    onSubmit(formData);
  };

  return (
    <div className="w-full rounded-xl p-6 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-center text-[var(--primary)]">
          {title}
        </h2>

        {fields.map((field) => (
          <InputField
            key={field.id}
            {...field}
            value={formData[field.id]}
            disabled={loading}              
            onChange={(val) => handleChange(field.id, val)}
          />
        ))}

        <PrimaryButton
          title={loading ? loadingtext : submitText}
          type="submit"
          variant="outline"
          disabled={loading}               
          className="w-full hover:bg-[var(--primary)] hover:text-[var(--accent-light)]"
        />
      </form>
    </div>
  );
}
