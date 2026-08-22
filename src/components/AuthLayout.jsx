export default function AuthLayout({ children, tagline }) {
  const dots = [];
  for (let i = 0; i < 48; i++) {
    dots.push(i);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div
        style={{
          flex: '1 1 45%',
          background: 'var(--ink)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '3rem',
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          minWidth: 320,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1, position: 'absolute', top: '2.5rem', left: '2.5rem' }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--teal)',
              boxShadow: '0 0 0 4px rgba(246,196,69,0.35)',
            }}
          />
          <h1 style={{ fontSize: '1.1rem' }}>SyncBoard</h1>
        </span>

        <div style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', lineHeight: 1.25, maxWidth: 380 }}>
            {tagline}
          </h2>
        </div>

        <svg
          viewBox="0 0 320 200"
          style={{ position: 'absolute', bottom: -20, right: -20, width: 280, opacity: 0.45 }}
        >
          {dots.map((i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            const isLive = i % 7 === 0;
            return (
              <circle
                key={i}
                cx={col * 40 + 20}
                cy={row * 34 + 20}
                r={isLive ? 4 : 2.5}
                fill={isLive ? 'var(--teal)' : '#3A3F5C'}
              />
            );
          })}
        </svg>
      </div>

      <div
        style={{
          flex: '1 1 55%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--surface)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 360 }}>{children}</div>
      </div>
    </div>
  );
}
