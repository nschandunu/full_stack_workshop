export default function ConfirmActionModal({ isOpen, title, message, confirmLabel, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal-card small">
        <div className="modal-header">
          <div>
            <p className="section-label">CONFIRMATION</p>
            <h3 id="confirm-title">{title}</h3>
          </div>
          <button type="button" className="close-button" onClick={onCancel} aria-label="Close confirmation">
            ×
          </button>
        </div>

        <p className="confirm-message">{message}</p>

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="danger-btn" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
