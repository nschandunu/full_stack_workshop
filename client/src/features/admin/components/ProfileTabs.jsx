export default function ProfileTabs({ activeTab, onChange }) {
  const tabs = ["Overview", "Team Management", "Activity", "Settings"];

  return (
    <nav className="profile-tabs" aria-label="Admin profile sections">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`profile-tab ${activeTab === tab ? "is-active" : ""}`}
          onClick={() => onChange(tab)}
          aria-pressed={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
