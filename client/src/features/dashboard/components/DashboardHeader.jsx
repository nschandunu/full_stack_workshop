import { useState, useRef, useEffect } from "react";

const DashboardHeader = ({ onNewTask, onNewProject }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="dashboard-header">
      <div>
        <p>Overview</p>
        <h1>Dashboard</h1>
        <p>Manage your projects, tasks, and team activity.</p>
      </div>

      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            padding: "8px 16px",
            border: "2px solid #000000",
            backgroundColor: "#f5b700",
            color: "#000000",
            fontWeight: "800",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            cursor: "pointer",
            boxShadow: "2px 2px 0px #000000",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          + Add New ▾
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "100%",
              marginTop: "6px",
              backgroundColor: "#ffffff",
              border: "2px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              zIndex: 50,
              minWidth: "160px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNewTask?.();
              }}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                background: "none",
                border: "none",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef3c7")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span>📝</span> New Task
            </button>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onNewProject?.();
              }}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                background: "none",
                border: "none",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef3c7")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span>📁</span> New Project
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;