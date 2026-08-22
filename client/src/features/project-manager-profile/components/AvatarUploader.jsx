import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 220;

export default function AvatarUploader({ currentAvatar, name, onAvatarChange, onClose }) {
  const [imageSrc, setImageSrc] = useState(currentAvatar || null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageSrc) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    const scaledW = img.naturalWidth * scale;
    const scaledH = img.naturalHeight * scale;
    const x = CANVAS_SIZE / 2 - scaledW / 2 + position.x;
    const y = CANVAS_SIZE / 2 - scaledH / 2 + position.y;

    ctx.drawImage(img, x, y, scaledW, scaledH);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [imageSrc, position, scale]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event) => {
    if (!dragging || !dragStart) return;
    setPosition({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDragStart(null);
  };

  const applyCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onAvatarChange(canvas.toDataURL("image/png"));
    onClose();
  };

  return (
    <div className="pm-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="avatar-title" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="pm-modal-card">
        <div className="pm-modal-header">
          <div>
            <p className="pm-section-label">Avatar</p>
            <h3 id="avatar-title">Upload & crop image</h3>
          </div>
          <button type="button" className="pm-close-button" onClick={onClose} aria-label="Close avatar editor">
            ×
          </button>
        </div>

        {!imageSrc ? (
          <div className="pm-upload-panel">
            <p>Select an image for your project manager profile.</p>
            <button type="button" className="pm-primary-btn" onClick={() => fileInputRef.current?.click()}>
              Choose image
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} hidden />
          </div>
        ) : (
          <>
            <div className="pm-crop-container">
              <img ref={imageRef} src={imageSrc} alt="" style={{ display: "none" }} onLoad={draw} />
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="pm-crop-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: dragging ? "grabbing" : "grab" }}
              />
            </div>

            <div className="pm-zoom-row">
              <span>Zoom</span>
              <input type="range" min="0.5" max="2.5" step="0.01" value={scale} onChange={(event) => setScale(parseFloat(event.target.value))} />
              <strong>{Math.round(scale * 100)}%</strong>
            </div>

            <div className="pm-modal-actions">
              <button type="button" className="pm-secondary-btn" onClick={() => fileInputRef.current?.click()}>
                Change image
              </button>
              <button type="button" className="pm-primary-btn" onClick={applyCrop}>
                Apply avatar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
