export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="pm-toast" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
