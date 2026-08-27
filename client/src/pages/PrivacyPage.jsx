import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, FileCheck2, Printer, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './privacy.css';

export default function PrivacyPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [acknowledged, setAcknowledged] = useState(false);

  const handleBack = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="privacy-container">
      {/* Header */}
      <header className="privacy-header">
        <div className="privacy-header-top">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="privacy-btn"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="privacy-badge">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Privacy & Data Protection
            </span>
          </div>

          <div className="privacy-actions">
            <button
              onClick={handlePrint}
              className="privacy-btn"
              title="Print Privacy Policy"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Last Updated: August 27, 2026 • Version 2.4 • Applicable to CollabBoard & PLANR.SYS Agile Systems
          </p>
        </div>
      </header>

      {/* Main Layout: Sticky Navigation + Document Body */}
      <div className="privacy-content-layout">
        <aside className="privacy-nav">
          <div className="privacy-nav-title">Document Sections</div>
          <ul className="privacy-nav-list">
            <li><a href="#overview" className="privacy-nav-link">1. Privacy Commitment</a></li>
            <li><a href="#collection" className="privacy-nav-link">2. Information We Collect</a></li>
            <li><a href="#usage" className="privacy-nav-link">3. How We Use Data</a></li>
            <li><a href="#storage" className="privacy-nav-link">4. Local Storage & JWTs</a></li>
            <li><a href="#sharing" className="privacy-nav-link">5. Data Sharing & Third Parties</a></li>
            <li><a href="#security" className="privacy-nav-link">6. Security Architecture</a></li>
            <li><a href="#rights" className="privacy-nav-link">7. User Rights & Data Deletion</a></li>
            <li><a href="#updates" className="privacy-nav-link">8. Policy Updates</a></li>
            <li><a href="#contact" className="privacy-nav-link">9. Contact Data Officer</a></li>
          </ul>
        </aside>

        <main className="privacy-body">
          {/* Section 1 */}
          <section id="overview" className="privacy-section">
            <h2>
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              1. Privacy Commitment & Scope
            </h2>
            <p>
              At <strong>CollabBoard (PLANR.SYS)</strong>, we take your privacy and data sovereignty seriously. This Privacy Policy describes how we collect, store, process, and protect your personal credentials, project data, and agile task information when you interact with our web application, APIs, and services.
            </p>
            <div className="privacy-callout">
              <div className="privacy-callout-title">Core Privacy Principle</div>
              <p>
                We do not sell, rent, monetize, or broker your personal information or workspace data to any third-party advertising networks.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="collection" className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>
              To provide seamless task management and team collaboration, we collect the following categories of data:
            </p>
            <table className="privacy-table">
              <thead>
                <tr>
                  <th>Data Category</th>
                  <th>Specific Data Fields</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Account Credentials</strong></td>
                  <td>Full Name, Email Address, Bcrypt Hashed Password, Role (`admin`, `manager`, `member`)</td>
                  <td>User authentication, role authorization, account identity</td>
                </tr>
                <tr>
                  <td><strong>Workspace Content</strong></td>
                  <td>Project Boards, Column Names, Task Titles, Descriptions, Due Dates, Assignee IDs, Priority Labels</td>
                  <td>Kanban board rendering, sprint lifecycle management, task delegation</td>
                </tr>
                <tr>
                  <td><strong>Session Metadata</strong></td>
                  <td>JSON Web Tokens (JWT), Timestamps, API Request Logs, Browser User-Agent</td>
                  <td>Maintaining authenticated sessions, API rate limiting, diagnostic telemetry</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 3 */}
          <section id="usage" className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              We process your data strictly to operate and enhance platform features:
            </p>
            <ul>
              <li><strong>Sprint & Task Orchestration</strong>: Enabling drag-and-drop task state transitions across columns (`To Do`, `In Progress`, `Review`, `Done`).</li>
              <li><strong>Role-Based Permission Enforcement</strong>: Verifying whether your role authorizes access to admin panels, project manager velocity controls, or general team task cards.</li>
              <li><strong>Security & Authentication</strong>: Issuing and verifying cryptographic Bearer JWTs to prevent unauthorized endpoint access.</li>
              <li><strong>Platform Diagnostics</strong>: Resolving system bottlenecks, handling unexpected API errors, and ensuring high service reliability.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="storage" className="privacy-section">
            <h2>4. Client-Side Storage & Token Handling</h2>
            <p>
              CollabBoard minimizes unnecessary tracking cookies. Instead, we use HTML5 `localStorage` strictly for session persistence:
            </p>
            <ul>
              <li><code>collabboard-token</code>: Stores your stateless JWT string so you remain logged in across page refreshes.</li>
              <li><code>collabboard-user</code>: Caches basic user information (ID, name, email, role) to provide immediate UI hydration.</li>
            </ul>
            <p>
              Logging out via the sidebar or clearing your browser storage permanently clears these tokens from your device.
            </p>
          </section>

          {/* Section 5 */}
          <section id="sharing" className="privacy-section">
            <h2>5. Data Sharing & Third-Party Disclosure</h2>
            <p>
              We do not share your private workspace data or credentials with third parties, except in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Team Collaboration</strong>: Other members assigned to your workspace or board can view task descriptions, assignees, and sprint progress you create.</li>
              <li><strong>Legal Compliance</strong>: If required by applicable university guidelines, law enforcement, or valid legal processes.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="security" className="privacy-section">
            <h2>6. Security Architecture & Encryption</h2>
            <p>
              We apply industry-standard defensive measures to safeguard your information:
            </p>
            <ul>
              <li><strong>Password Salting & Hashing</strong>: Passwords are irreversibly hashed using Bcrypt before storage. Plain-text passwords are never saved.</li>
              <li><strong>Stateless JWT Validation</strong>: Protected routes require valid `Bearer &lt;token&gt;` authorization headers verified against server-side secret keys.</li>
              <li><strong>Cross-Origin Resource Sharing (CORS)</strong>: Strict CORS policies restrict API requests to approved client domains.</li>
              <li><strong>Granular Role Guards</strong>: Profile views and administrative endpoints are protected by role-checking middleware.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="rights" className="privacy-section">
            <h2>7. User Rights & Data Deletion</h2>
            <p>
              You maintain full control over your personal data:
            </p>
            <ul>
              <li><strong>Access & Review</strong>: You can view and edit your profile information, bio, skills, and notification preferences via `/profile`.</li>
              <li><strong>Task Modification & Erasure</strong>: You can edit or permanently delete tasks and cards you have created.</li>
              <li><strong>Account Deletion</strong>: You may request complete account deactivation and removal through your workspace Administrator.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="updates" className="privacy-section">
            <h2>8. Policy Updates & Notifications</h2>
            <p>
              As CollabBoard evolves through development milestones (such as real-time WebSocket sync and production database integration), we may update this Privacy Policy. Any material modifications will be reflected with a revised "Last Updated" timestamp at the top of this document.
            </p>
          </section>

          {/* Section 9 */}
          <section id="contact" className="privacy-section">
            <h2>9. Contact & Data Officer</h2>
            <p>
              For privacy inquiries, questions regarding data retention, or security disclosures:
            </p>
            <ul>
              <li><strong>Repository & Issues</strong>: <a href="https://github.com/nschandunu/full_stack_workshop" target="_blank" rel="noreferrer" className="text-black font-semibold underline">github.com/nschandunu/full_stack_workshop</a></li>
              <li><strong>Terms Reference</strong>: View our <Link to="/terms" className="text-black font-semibold underline">Terms & Conditions</Link></li>
            </ul>
          </section>

          {/* Footer Acknowledgement Action */}
          <div className="privacy-footer">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAcknowledged(!acknowledged)}
                className={`privacy-btn ${acknowledged ? 'privacy-btn-primary' : ''}`}
              >
                <CheckCircle2 className={`w-4 h-4 ${acknowledged ? 'text-emerald-400' : 'text-gray-400'}`} />
                <span>{acknowledged ? 'Privacy Policy Acknowledged' : 'Acknowledge Policy'}</span>
              </button>
              {acknowledged && (
                <span className="text-xs font-semibold text-emerald-600">
                  Thank you! Your acknowledgment has been recorded.
                </span>
              )}
            </div>

            <button
              onClick={handleBack}
              className="privacy-btn privacy-btn-primary"
            >
              Return to {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
