export default function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-[var(--primary)] mb-1"
    >
      {children}
    </label>
  );
}
