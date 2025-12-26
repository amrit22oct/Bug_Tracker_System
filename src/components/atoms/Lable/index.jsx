export default function Label({ htmlFor, children, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-semibold mb-1 ${className}`}
    >
      {children}
    </label>
  );
}
