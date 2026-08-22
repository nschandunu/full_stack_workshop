export default function Button({ children, variant = 'primary', type = 'button', onClick, full = false }) {
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.85rem',
    padding: '0.65rem 1.2rem',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--border)',
    cursor: 'pointer',
    transition: 'transform 100ms ease, box-shadow 100ms ease',
    width: full ? '100%' : 'auto',
    boxShadow: 'var(--hard-shadow)',
  };

  const variants = {
    primary: { background: 'var(--ink)', color: '#fff' },
    accent: { background: 'var(--teal)', color: 'var(--ink)' },
    ghost: { background: '#fff', color: 'var(--ink)' },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)';
        e.currentTarget.style.boxShadow = '0 0 0 var(--ink)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = 'var(--hard-shadow)';
      }}
    >
      {children}
    </button>
  );
}
