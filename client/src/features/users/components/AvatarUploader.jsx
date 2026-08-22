import React, { useRef, useState, useCallback, useEffect } from "react";

const CANVAS_SIZE = 220;

/**
 * AvatarUploader – modal dialog with file picker, canvas-based circular crop,
 * drag-to-reposition, and zoom slider. No server upload — returns a data URL.
 */
export default function AvatarUploader({ currentAvatar, name, onAvatarChange, onClose }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageSrc) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const x = CANVAS_SIZE / 2 - sw / 2 + position.x;
    const y = CANVAS_SIZE / 2 - sh / 2 + position.y;
    ctx.drawImage(img, x, y, sw, sh);
    ctx.restore();

    // Border ring
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [imageSrc, scale, position]);

  useEffect(() => { draw(); }, [draw]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target.result);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const onMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => { setIsDragging(false); setDragStart(null); };

  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) => Math.min(3, Math.max(0.1, s - e.deltaY * 0.001)));
  };

  const applyCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onAvatarChange(canvas.toDataURL("image/png"));
    onClose();
  };

  return (
    <div
      className="au-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Upload avatar"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="au-panel">
        {/* Header */}
        <div className="au-header">
          <div>
            <p className="au-eyebrow">Profile photo</p>
            <h3 className="au-title">Update your photo</h3>
          </div>
          <button className="au-close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </div>

        {!imageSrc ? (
          <div className="au-dropzone">
            <div className="au-drop-icon" aria-hidden="true">&#128247;</div>
            <p className="au-drop-text">Drop an image or browse</p>
            {currentAvatar && (
              <p className="au-drop-hint">A photo is already set — upload a new one to replace it.</p>
            )}
            <button
              className="up-btn up-btn--primary"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <>
            <div className="au-crop-area">
              <img
                ref={imgRef}
                src={imageSrc}
                alt=""
                style={{ display: "none" }}
                onLoad={draw}
              />
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="au-canvas"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onWheel={onWheel}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              />
              <p className="au-crop-hint">Drag to reposition · Scroll to zoom</p>
            </div>

            <div className="au-zoom-row">
              <span className="au-zoom-icon" aria-hidden="true">&#128269;</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.01"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="au-zoom-slider"
                aria-label="Zoom level"
              />
              <span className="au-zoom-pct">{Math.round(scale * 100)}%</span>
            </div>

            <div className="au-actions">
              <button
                className="up-btn up-btn--ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                Change photo
              </button>
              <button className="up-btn up-btn--primary" onClick={applyCrop}>
                Apply
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
