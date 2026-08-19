import './sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'grid' },
  { id: 'tasks', label: 'Tasks', href: '/tasks', icon: 'checklist' },
  { id: 'overview', label: 'Overview', href: '/features/projects/overview', icon: 'grid' },
  { id: 'kanban', label: 'Kanban', href: '/features/projects/kanban', icon: 'board' },
  { id: 'messages', label: 'Messages', href: '/features/projects/chat', icon: 'message', badge: true },
  { id: 'team', label: 'Team', href: '/profiles/admin', icon: 'users', accent: true },
  { id: 'profile', label: 'Profile', href: '/profiles/user', icon: 'profile' },
  { id: 'files', label: 'Files', href: '/features/projects/files', icon: 'folder' },
  { id: 'settings', label: 'Settings', href: '/features/projects/settings', icon: 'settings' },
];

function Icon({ name }) {
  switch (name) {
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
        </svg>
      );
    case 'board':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="1.5" />
          <path d="M9 5v14M15 5v14" />
          <path d="M6.5 8h1.5M6.5 12h1.5M6.5 16h1.5" />
        </svg>
      );
    case 'checklist':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4.5 6.5l1 1 2-2M4.5 12.5l1 1 2-2M4.5 18.5l1 1 2-2" />
        </svg>
      );
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4l8 4-8 4-8-4 8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 16l8 4 8-4" />
        </svg>
      );
    case 'note':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h10l4 4v12H6z" />
          <path d="M16 4v4h4" />
          <path d="M8 11h8M8 15h5" />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5h14v10H9l-4 4z" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <path d="M3.5 19c.9-2.8 3-4.5 4.5-4.5S11.6 16.2 12.5 19" />
          <path d="M13.5 19c.6-2.1 2.2-3.5 3.7-3.5 1.7 0 3 1.1 3.3 3" />
        </svg>
      );
    case 'profile':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5" />
        </svg>
      );
    case 'folder':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 7h6l2 2h9v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 2.5 17V8.5A1.5 1.5 0 0 1 4 7h-.5z" />
        </svg>
      );
    case 'help':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 16v-.5M10.5 9a2 2 0 1 1 3.1 1.7c-.9.5-1.6 1.1-1.6 2.3v.5" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19 12l1.8-1-1.5-2.6-2 .3-.9-1.1.6-1.9-2.6-1.5-1 1.7h-1.3l-1-1.7-2.6 1.5.6 1.9-.9 1.1-2-.3L3 11l1.8 1L3 13l1.5 2.6 2-.3.9 1.1-.6 1.9 2.6 1.5 1-1.7h1.3l1 1.7 2.6-1.5-.6-1.9.9-1.1 2 .3L20.8 13z" />
        </svg>
      );
    default:
      return null;
  }
}

function Sidebar({ activeRoute }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand" aria-hidden="true">
        CB
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const isActive = item.href !== '#' && activeRoute === item.href;
          const isPlaceholder = item.href === '#';

          return (
            <a
              key={item.id}
              className={`sidebar__item${isActive ? ' sidebar__item--active' : ''}${isPlaceholder ? ' sidebar__item--ghost' : ''}${item.accent ? ' sidebar__item--accent' : ''}`}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={isPlaceholder ? 'true' : undefined}
              onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
            >
              <span className="sidebar__icon">
                <Icon name={item.icon} />
              </span>
              {item.badge ? <span className="sidebar__badge" aria-hidden="true" /> : null}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
