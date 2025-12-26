import { X } from "lucide-react";
import Label from "../../atoms/Lable";
import Input from "../../atoms/Input";
import { useState } from "react";

export default function InputField({
  id,
  label,
  type = "text",
  options = [],
  value = [],
  onChange,
  placeholder = "",
  rightAction = null,
  ...rest
}) {
  const [open, setOpen] = useState(false);

  /* ================= MULTISELECT ================= */
  if (type === "multiselect") {
    const selectedOptions = options.filter((opt) =>
      value.includes(opt.value)
    );

    return (
      <div className="flex flex-col gap-2 w-full relative">
        {label && (
          <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
            {label}
          </Label>
        )}

        {/* Selected Items Box */}
        <div
          className="w-full min-h-[52px] p-3 rounded-xl border border-(--primary)
                     flex flex-wrap gap-2 cursor-pointer"
          onClick={() => setOpen((p) => !p)}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="flex items-center gap-1 px-3 py-1 rounded-lg 
                           bg-(--primary) text-white text-sm"
              >
                {opt.label}
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value.filter((v) => v !== opt.value));
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder || "Select members"}</span>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute z-20 top-full mt-2 w-full max-h-60 overflow-auto
                       rounded-xl border bg-white shadow-lg"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100
                  ${value.includes(opt.value) ? "bg-gray-100" : ""}`}
                onClick={() => {
                  if (!value.includes(opt.value)) {
                    onChange([...value, opt.value]);
                  }
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ================= TEXTAREA ================= */
  if (type === "textarea") {
    return (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 min-h-[120px] rounded-xl border border-(--primary)
                   focus:outline-none focus:ring-2 focus:ring-(--primary)"
        {...rest}
      />
    );
  }

  /* ================= SELECT ================= */
  if (type === "select") {
    return (
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl border border-(--primary)
                   focus:outline-none focus:ring-2 focus:ring-(--primary)"
        {...rest}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  /* ================= DEFAULT INPUT ================= */
  return (
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rightAction={rightAction}
      {...rest}
    />
  );
}
