import Label from "../../atoms/Lable";
import Input from "../../atoms/Input";

export default function InputField({
  id,
  label,
  ...inputProps
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} {...inputProps} />
    </div>
  );
}
