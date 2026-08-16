import React, { useRef, useState, useCallback, useEffect } from "react";

const CANVAS_SIZE = 220;

/**
 * AvatarUploader – Client-side image crop & preview modal with circular canvas crop.
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

    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [imageSrc, scale, position]);

  useEffect(() => {
    draw();
  }, [draw]);

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

  const onMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const applyCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onAvatarChange(canvas.toDataURL("image/png"));
    onClose();
  };

  return (
    <div
      className="ap-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-heading"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="ap-modal-panel">
        <div className="ap-modal-header">
          <div>
            <p className="ap-eyebrow">ADMIN PHOTO</p>
            <h3 id="avatar-modal-heading" className="ap-modal-title">
              Upload &amp; Crop Avatar
            </h3>
          </div>
          <button className="ap-close-btn" onClick={onClose} aria-label="Close modal">
            &#x2715;
          </button>
        </div>

        {!imageSrc ? (
          <div className="ap-dropzone">
            <div className="ap-drop-icon" aria-hidden="true">&#128247;</div>
            <p className="ap-drop-text">Select an avatar photo from your computer</p>
            <button
              type="button"
              className="ap-btn ap-btn--primary"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Image
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
            <div className="ap-crop-container">
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
                className="ap-canvas"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              />
              <p className="ap-crop-hint">Drag image to adjust position</p>
            </div>

            <div className="ap-zoom-row">
              <span aria-hidden="true">&#128269;</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.01"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="ap-zoom-slider"
                aria-label="Zoom level"
              />
              <span className="ap-zoom-pct">{Math.round(scale * 100)}%</span>
            </div>

            <div className="ap-modal-actions">
              <button
                type="button"
                className="ap-btn ap-btn--ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose another
              </button>
              <button type="button" className="ap-btn ap-btn--primary" onClick={applyCrop}>
                Apply Avatar
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
