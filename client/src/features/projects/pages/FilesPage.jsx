import '../files.css';

const PLACEHOLDER_FILES = [
  {
    id: 'f1',
    name: 'spec.pdf',
    type: 'pdf',
    typeLabel: 'PDF',
    size: '2.4 MB',
    uploadDate: '12 Aug 2026',
  },
  {
    id: 'f2',
    name: 'wireframe.png',
    type: 'image',
    typeLabel: 'PNG',
    size: '840 KB',
    uploadDate: '10 Aug 2026',
  },
  {
    id: 'f3',
    name: 'notes.docx',
    type: 'doc',
    typeLabel: 'DOCX',
    size: '128 KB',
    uploadDate: '08 Aug 2026',
  },
  {
    id: 'f4',
    name: 'budget.xlsx',
    type: 'spreadsheet',
    typeLabel: 'XLSX',
    size: '56 KB',
    uploadDate: '05 Aug 2026',
  },
];

function FileTypeIcon({ type }) {
  switch (type) {
    case 'pdf':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h10l4 4v12H6z" />
          <path d="M16 4v4h4" />
          <path d="M9 13h2.5a1 1 0 0 0 0-2H9v5" />
          <path d="M15 11v5" />
        </svg>
      );
    case 'image':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <circle cx="9" cy="9" r="1.5" />
          <path d="M4 16l4-4 3 3 2-2 7 7" />
        </svg>
      );
    case 'doc':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h10l4 4v12H6z" />
          <path d="M16 4v4h4" />
          <path d="M8 11h8M8 14h6M8 17h4" />
        </svg>
      );
    case 'spreadsheet':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <path d="M4 9h16M4 14h16M9 4v16M14 4v16" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h10l4 4v12H6z" />
          <path d="M16 4v4h4" />
        </svg>
      );
  }
}

function FileCard({ file }) {
  return (
    <article className="file-card">
      <div className="file-card__top">
        <div className={`file-card__icon file-card__icon--${file.type}`}>
          <FileTypeIcon type={file.type} />
        </div>
        <button type="button" className="file-card__delete" aria-label={`Delete ${file.name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h14" />
            <path d="M9 7V5h6v2" />
            <path d="M7 7l1 12h8l1-12" />
            <path d="M10 11v5M14 11v5" />
          </svg>
        </button>
      </div>

      <div>
        <p className="file-card__name">{file.name}</p>
        <span className={`file-card__type file-card__type--${file.type}`}>
          {file.typeLabel}
        </span>
      </div>

      <p className="file-card__meta">
        <span>{file.size}</span>
        <span className="file-card__meta-sep" aria-hidden="true" />
        <span>{file.uploadDate}</span>
      </p>
    </article>
  );
}

function FilesEmptyState() {
  return (
    <div className="files-empty">
      <div className="files-empty__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3.5 7h6l2 2h9v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 2.5 17V8.5A1.5 1.5 0 0 1 4 7h-.5z" />
          <path d="M12 12v4M10 14h4" />
        </svg>
      </div>
      <h2 className="files-empty__heading">No files yet</h2>
      <p className="files-empty__sub">
        Upload your first file to start organizing project documents,
        assets, and deliverables in one place.
      </p>
    </div>
  );
}

function FilesPage() {
  const showEmptyState = false;

  return (
    <main className="files-page">
      <header className="files-page__header">
        <div>
          <p className="files-page__eyebrow">Projects</p>
          <h1>Files</h1>
        </div>
        <p className="files-page__summary">
          Project documents, assets, and deliverables — all in one place.
        </p>
      </header>

      <div className="files-toolbar">
        <p className="files-toolbar__count">
          {showEmptyState ? '0 files' : `${PLACEHOLDER_FILES.length} files`}
        </p>
        <button type="button" className="files-upload-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16V4" />
            <path d="M8 8l4-4 4 4" />
            <path d="M20 17v2H4v-2" />
          </svg>
          Upload
        </button>
      </div>

      {showEmptyState ? (
        <FilesEmptyState />
      ) : (
        <section className="files-grid">
          {PLACEHOLDER_FILES.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </section>
      )}
    </main>
  );
}

export default FilesPage;
