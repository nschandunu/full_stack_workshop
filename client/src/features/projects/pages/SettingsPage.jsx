import { useMemo, useState } from 'react';
import '../settings.css';

const preferenceGroups = [
  {
    id: 'workspace',
    title: 'Workspace preferences',
    subtitle: 'Tweak how the board feels while you work.',
    fields: [
      { id: 'compact', label: 'Compact cards', description: 'Reduce spacing for denser boards.' },
      { id: 'avatars', label: 'Show avatars', description: 'Display assignee chips in task cards.' },
      { id: 'sidebar', label: 'Pinned sidebar', description: 'Keep the icon rail always visible.' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Temporary frontend toggles only for this session.',
    fields: [
      { id: 'reminders', label: 'Deadline reminders', description: 'Highlight tasks with near due dates.' },
      { id: 'mentions', label: 'Mentions and updates', description: 'Surface collaboration activity in the rail.' },
      { id: 'status', label: 'Status changes', description: 'Show when tasks move across columns.' },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    subtitle: 'Match the project’s dashboard look and feel.',
    fields: [
      { id: 'accent', label: 'Amber accent', description: 'Use the project accent for highlights and progress.' },
      { id: 'borders', label: 'Strong borders', description: 'Keep the sharp black border treatment.' },
      { id: 'density', label: 'Board density', description: 'Adjust the amount of space between panels.' },
    ],
  },
];

function ToggleButton({ enabled, onToggle, label }) {
  return (
    <button
      type="button"
      className={`settings-toggle${enabled ? ' settings-toggle--active' : ''}`}
      aria-pressed={enabled}
      onClick={onToggle}
    >
      <span className="settings-toggle__dot" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

function SettingsPage() {
  const [compactCards, setCompactCards] = useState(false);
  const [showAvatars, setShowAvatars] = useState(true);
  const [pinnedSidebar, setPinnedSidebar] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [mentionsEnabled, setMentionsEnabled] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState(false);
  const [accentEnabled, setAccentEnabled] = useState(true);
  const [strongBorders, setStrongBorders] = useState(true);
  const [boardDensity, setBoardDensity] = useState('comfortable');

  const boardDensityLabel = useMemo(() => {
    if (boardDensity === 'compact') {
      return 'Compact';
    }

    if (boardDensity === 'spacious') {
      return 'Spacious';
    }

    return 'Comfortable';
  }, [boardDensity]);

  const resetSettings = () => {
    setCompactCards(false);
    setShowAvatars(true);
    setPinnedSidebar(true);
    setDeadlineReminders(true);
    setMentionsEnabled(true);
    setStatusUpdates(false);
    setAccentEnabled(true);
    setStrongBorders(true);
    setBoardDensity('comfortable');
  };

  return (
    <main className="settings-page">
      <header className="settings-page__header">
        <div>
          <p className="settings-page__eyebrow">Projects</p>
          <h1>Settings</h1>
        </div>
        <p className="settings-page__summary">
          Frontend-only workspace preferences. Changes stay local to this session.
        </p>
      </header>

      <section className="settings-summary">
        <article className="settings-summary__stat">
          <span className="settings-summary__label">Active toggles</span>
          <strong>6</strong>
        </article>
        <article className="settings-summary__stat">
          <span className="settings-summary__label">Theme</span>
          <strong>Dashboard</strong>
        </article>
        <article className="settings-summary__stat">
          <span className="settings-summary__label">Board density</span>
          <strong>{boardDensityLabel}</strong>
        </article>
        <button type="button" className="settings-reset" onClick={resetSettings}>
          Reset to defaults
        </button>
      </section>

      <section className="settings-grid">
        {preferenceGroups.map((group) => (
          <article key={group.id} className="settings-panel">
            <div className="settings-panel__heading">
              <h2>{group.title}</h2>
              <p>{group.subtitle}</p>
            </div>

            <div className="settings-panel__body">
              {group.id === 'workspace' ? (
                <div className="settings-control-list">
                  <ToggleButton enabled={compactCards} onToggle={() => setCompactCards((value) => !value)} label={group.fields[0].label} />
                  <ToggleButton enabled={showAvatars} onToggle={() => setShowAvatars((value) => !value)} label={group.fields[1].label} />
                  <ToggleButton enabled={pinnedSidebar} onToggle={() => setPinnedSidebar((value) => !value)} label={group.fields[2].label} />
                </div>
              ) : null}

              {group.id === 'notifications' ? (
                <div className="settings-control-list">
                  <ToggleButton enabled={deadlineReminders} onToggle={() => setDeadlineReminders((value) => !value)} label={group.fields[0].label} />
                  <ToggleButton enabled={mentionsEnabled} onToggle={() => setMentionsEnabled((value) => !value)} label={group.fields[1].label} />
                  <ToggleButton enabled={statusUpdates} onToggle={() => setStatusUpdates((value) => !value)} label={group.fields[2].label} />
                </div>
              ) : null}

              {group.id === 'appearance' ? (
                <div className="settings-control-stack">
                  <div className="settings-control-row">
                    <ToggleButton enabled={accentEnabled} onToggle={() => setAccentEnabled((value) => !value)} label={group.fields[0].label} />
                    <ToggleButton enabled={strongBorders} onToggle={() => setStrongBorders((value) => !value)} label={group.fields[1].label} />
                  </div>

                  <label className="settings-select">
                    <span>{group.fields[2].label}</span>
                    <select value={boardDensity} onChange={(event) => setBoardDensity(event.target.value)}>
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </label>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default SettingsPage;
