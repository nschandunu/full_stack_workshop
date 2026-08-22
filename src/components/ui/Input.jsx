export default function Input({ label, type = 'text', placeholder, value, onChange, name }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate)' }}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: '0.7rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          border: '2px solid var(--border)',
          background: 'var(--surface-raised)',
          fontSize: '0.92rem',
          color: 'var(--ink)',
        }}
      />
    </label>
  );
}
