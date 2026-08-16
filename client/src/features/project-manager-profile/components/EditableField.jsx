export default function EditableField({
  label,
  name,
  value,
  type = "text",
  isEditing,
  onChange,
  error,
  required = false,
  as = "input",
  options = [],
  rows = 3,
}) {
  const fieldId = `pm-field-${name}`;

  if (!isEditing) {
    return (
      <div className="pm-field-group">
        <label className="pm-field-label" htmlFor={fieldId}>{label}</label>
        <div className="pm-view-box">{value || "Not set"}</div>
      </div>
    );
  }

  return (
    <div className="pm-field-group">
      <label className="pm-field-label" htmlFor={fieldId}>
        {label}
        {required && <span className="pm-required"> *</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          rows={rows}
          onChange={onChange}
          className={`pm-input ${error ? "has-error" : ""}`}
          aria-invalid={Boolean(error)}
        />
      ) : as === "select" ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          className={`pm-input ${error ? "has-error" : ""}`}
          aria-invalid={Boolean(error)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`pm-input ${error ? "has-error" : ""}`}
          aria-invalid={Boolean(error)}
        />
      )}

      {error && <span className="pm-field-error">{error}</span>}
    </div>
  );
}
