import { useState } from "react";

const DashboardSearch = () => {
  const [query, setQuery] = useState("");


  return (
    <div className="dashboard-search">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search projects, tasks..."
        aria-label="Search projects and tasks"
      />

      {query && (
        <button type="button" onClick={() => setQuery("")}>
          Clear
        </button>
      )}
    </div>
  );
};

export default DashboardSearch;