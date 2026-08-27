import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, Printer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './terms.css';

export default function TermsPage() {
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
    <div className="terms-container">
      {/* Header */}
      <header className="terms-header">
        <div className="terms-header-top">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="terms-btn"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="terms-badge">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Official Policy
            </span>
          </div>

          <div className="terms-actions">
            <button
              onClick={handlePrint}
              className="terms-btn"
              title="Print Terms"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="terms-title">Terms & Conditions of Service</h1>
          <p className="terms-subtitle">
            Last Updated: August 27, 2026 • Version 2.4 • Effective for all CollabBoard & PLANR.SYS users
          </p>
        </div>
      </header>

      {/* Main Layout: Sticky Navigation + Document Body */}
      <div className="terms-content-layout">
        <aside className="terms-nav">
          <div className="terms-nav-title">Document Sections</div>
          <ul className="terms-nav-list">
            <li><a href="#acceptance" className="terms-nav-link">1. Acceptance of Terms</a></li>
            <li><a href="#accounts" className="terms-nav-link">2. User Accounts & Roles</a></li>
            <li><a href="#data-ownership" className="terms-nav-link">3. Workspaces & Data</a></li>
            <li><a href="#acceptable-use" className="terms-nav-link">4. Acceptable Use Policy</a></li>
            <li><a href="#auth-security" className="terms-nav-link">5. Security & Tokens</a></li>
            <li><a href="#availability" className="terms-nav-link">6. Service Availability</a></li>
            <li><a href="#liability" className="terms-nav-link">7. Limitation of Liability</a></li>
            <li><a href="#termination" className="terms-nav-link">8. Account Termination</a></li>
            <li><a href="#contact" className="terms-nav-link">9. Contact & Support</a></li>
          </ul>
        </aside>

        <main className="terms-body">
          {/* Section 1 */}
          <section id="acceptance" className="terms-section">
            <h2>
              <FileText className="w-5 h-5 text-amber-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, registering for, or using the <strong>CollabBoard (PLANR.SYS)</strong> application, web platform, APIs, or associated services (collectively, the "Platform"), you agree to be legally bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, you must immediately cease all access and use of the Platform.
            </p>
            <p>
              These Terms apply to all registered members, administrators, project managers, guests, and automated API consumers.
            </p>
          </section>

          {/* Section 2 */}
          <section id="accounts" className="terms-section">
            <h2>2. User Accounts & Role-Based Access Control (RBAC)</h2>
            <p>
              To access core task orchestration features, you must register for an account with a valid name, email address, and secure password. CollabBoard operates a role-based access system consisting of three primary tiers:
            </p>
            <ul>
              <li><strong>Admin (Administrator)</strong>: Possesses system-wide privileges, user management capabilities, security log auditing, role elevation/demotion, and workspace configuration oversight.</li>
              <li><strong>Manager (Project Manager)</strong>: Authorized to create, configure, and archive project boards, assign milestones, adjust sprint velocity, and delegate team tasks.</li>
              <li><strong>Member (Team User)</strong>: Authorized to view boards, create and transition task cards, participate in team discussions, and manage personal profile settings.</li>
            </ul>
            <div className="terms-callout">
              <div className="terms-callout-title">Account Responsibility</div>
              <p>
                You are solely responsible for maintaining the confidentiality of your authentication credentials and for all activities that occur under your registered account.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="data-ownership" className="terms-section">
            <h2>3. Workspaces & Data Ownership</h2>
            <p>
              You retain all ownership, intellectual property rights, and title to any project data, task descriptions, file attachments, conversation logs, and boards created or uploaded to the Platform ("User Content").
            </p>
            <p>
              By posting or submitting content within CollabBoard, you grant the Platform a worldwide, non-exclusive, royalty-free license to store, process, display, and transmit your data solely for the purpose of operating, improving, and delivering collaborative project management services to you and your designated team.
            </p>
          </section>

          {/* Section 4 */}
          <section id="acceptable-use" className="terms-section">
            <h2>4. Acceptable Use Policy</h2>
            <p>
              When utilizing CollabBoard, you agree strictly not to:
            </p>
            <ul>
              <li>Engage in any activity that impairs, overburdens, or disrupts the normal operation of our REST API endpoints, WebSockets, or backend infrastructure.</li>
              <li>Attempt to gain unauthorized access to other users' boards, private workspaces, JWT secret keys, or database records.</li>
              <li>Upload malicious code, viruses, automated web scrapers, or abusive scripts.</li>
              <li>Impersonate any person, company, or authorized platform administrator.</li>
              <li>Use the Platform for any unlawful, defamatory, infringing, or harmful purpose.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="auth-security" className="terms-section">
            <h2>5. Security, Passwords & JWT Authentication</h2>
            <p>
              CollabBoard utilizes stateless JSON Web Tokens (JWT) signed using cryptographically secure algorithms and password hashing via Bcrypt.
            </p>
            <ul>
              <li><strong>Token Storage</strong>: Auth tokens are temporarily stored in browser local storage (`collabboard-token`) to maintain your authenticated session.</li>
              <li><strong>Token Expiry</strong>: Tokens expire automatically based on system configuration (default: 7 days). You must re-authenticate upon expiry.</li>
              <li><strong>Breach Notification</strong>: If you suspect unauthorized access or token leakage, you must notify workspace administrators and update your credentials immediately.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="availability" className="terms-section">
            <h2>6. Service Availability & Modifications</h2>
            <p>
              We strive to maintain continuous platform availability, low latency, and rapid task sync. However, CollabBoard is provided on an "as is" and "as available" basis. We reserve the right to deploy updates, modify features, perform server maintenance, or introduce new schema revisions without prior individual notice.
            </p>
          </section>

          {/* Section 7 */}
          <section id="liability" className="terms-section">
            <h2>7. Disclaimer of Warranties & Limitation of Liability</h2>
            <p>
              IN ACCORDANCE WITH THE <strong>MIT LICENSE</strong> UNDER WHICH THIS SOFTWARE IS DISTRIBUTED, COLLABBOARD AND ITS AUTHORS/CONTRIBUTORS DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              IN NO EVENT SHALL THE AUTHORS, PROJECT CONTRIBUTORS, OR AFFILIATED ENTITIES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM DATA LOSS, SPRINT DELAYS, OR SYSTEM DOWNTIME.
            </p>
          </section>

          {/* Section 8 */}
          <section id="termination" className="terms-section">
            <h2>8. Account Termination & Workspace Deactivation</h2>
            <p>
              Workspace administrators may deactivate or adjust user roles at any time. You may also request account closure by contacting your organization's designated administrator. Upon termination, access to active boards and workspaces will be revoked in accordance with workspace access policies.
            </p>
          </section>

          {/* Section 9 */}
          <section id="contact" className="terms-section">
            <h2>9. Contact & Support</h2>
            <p>
              For questions regarding these Terms & Conditions, role permissions, or security reporting, please reach out to:
            </p>
            <ul>
              <li><strong>Project Repository</strong>: <a href="https://github.com/nschandunu/full_stack_workshop" target="_blank" rel="noreferrer" className="text-black font-semibold underline">github.com/nschandunu/full_stack_workshop</a></li>
              <li><strong>Platform</strong>: CollabBoard / PLANR.SYS Workspace Engineering Team</li>
            </ul>
          </section>

          {/* Footer Acknowledgement Action */}
          <div className="terms-footer">
            <div className="terms-ack-box">
              <button
                onClick={() => setAcknowledged(!acknowledged)}
                className={`terms-btn ${acknowledged ? 'terms-btn-primary' : ''}`}
              >
                <CheckCircle2 className={`w-4 h-4 ${acknowledged ? 'text-emerald-400' : 'text-gray-400'}`} />
                <span>{acknowledged ? 'Terms Acknowledged' : 'Acknowledge Terms'}</span>
              </button>
              {acknowledged && (
                <span className="text-xs font-semibold text-emerald-600">
                  Thank you! Your acknowledgment has been recorded for this session.
                </span>
              )}
            </div>

            <button
              onClick={handleBack}
              className="terms-btn terms-btn-primary"
            >
              Return to {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
