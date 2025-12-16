import Label from "../../atoms/Lable";
import Input from "../../atoms/Input";

export default function InputField({
  id,
  label,
  type = "text",
  options = [],
  value,
  onChange,
  placeholder = "",
  rightAction = null,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </Label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 min-h-[120px] rounded-xl border border-(--primary)
                     focus:outline-none focus:ring-2 focus:ring-(--primary) 
                     transition-all duration-200 placeholder-(--primary-hover)"
          {...rest}
        />
      ) : type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 rounded-xl border border-(--primary)
                     focus:outline-none focus:ring-2 focus:ring-(--primary)
                     transition-all duration-200"
          {...rest}
        >
          <option value="" disabled>
            Select
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rightAction={rightAction}
          {...rest}
        />
      )}
    </div>
  );
}
