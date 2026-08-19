export default function ProfileTabs({ activeTab, onChange }) {
  const tabs = ["Overview", "My Projects", "Team", "Activity", "Settings"];

  return (
    <nav className="pm-profile-tabs" aria-label="Project manager sections">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`pm-profile-tab ${activeTab === tab ? "is-active" : ""}`}
          onClick={() => onChange(tab)}
          aria-pressed={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
