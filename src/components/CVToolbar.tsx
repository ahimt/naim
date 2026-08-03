import React from "react";

interface CVToolbarProps {
  onPrint: () => void;
  onOpenEditModal: () => void;
  onOpenPhotoModal: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const CVToolbar: React.FC<CVToolbarProps> = ({
  onPrint,
  onOpenEditModal,
  onOpenPhotoModal,
  theme,
  setTheme,
  zoom,
  setZoom,
}) => {
  return (
    <div className="cv-toolbar no-print">
      <div className="toolbar-title">
        <i className="bi bi-file-earmark-person-fill text-primary"></i>
        <span>NAIMUR RAHMAN — A4 Professional CV</span>
        <span className="badge bg-success ms-2" style={{ fontSize: "11px" }}>
          1-Page A4 Ready
        </span>
      </div>

      <div className="toolbar-actions">
        {/* Theme Accent selector */}
        <div className="btn-group btn-group-sm me-1" role="group">
          <button
            type="button"
            className={`btn ${theme === "navy" ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setTheme("navy")}
            title="Classic Navy Blue (Original)"
          >
            <span
              className="d-inline-block rounded-circle me-1"
              style={{ width: 10, height: 10, backgroundColor: "#0F2C59" }}
            ></span>
            Navy
          </button>
          <button
            type="button"
            className={`btn ${theme === "slate" ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setTheme("slate")}
            title="Executive Slate"
          >
            <span
              className="d-inline-block rounded-circle me-1"
              style={{ width: 10, height: 10, backgroundColor: "#1E293B" }}
            ></span>
            Slate
          </button>
          <button
            type="button"
            className={`btn ${theme === "emerald" ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setTheme("emerald")}
            title="Royal Emerald"
          >
            <span
              className="d-inline-block rounded-circle me-1"
              style={{ width: 10, height: 10, backgroundColor: "#064E3B" }}
            ></span>
            Emerald
          </button>
          <button
            type="button"
            className={`btn ${theme === "burgundy" ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setTheme("burgundy")}
            title="Burgundy"
          >
            <span
              className="d-inline-block rounded-circle me-1"
              style={{ width: 10, height: 10, backgroundColor: "#581C28" }}
            ></span>
            Burgundy
          </button>
        </div>

        {/* Zoom controls for Desktop/Mobile viewing */}
        <div className="btn-group btn-group-sm me-1" role="group">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setZoom(Math.max(0.6, zoom - 0.1))}
            title="Zoom Out"
          >
            <i className="bi bi-zoom-out"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-light disabled text-white"
            style={{ width: 60 }}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setZoom(Math.min(1.3, zoom + 0.1))}
            title="Zoom In"
          >
            <i className="bi bi-zoom-in"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setZoom(1.0)}
            title="Reset Zoom (100% A4)"
          >
            100%
          </button>
        </div>

        {/* Photo change button */}
        <button
          type="button"
          className="btn btn-sm btn-outline-light"
          onClick={onOpenPhotoModal}
          title="Change Profile Photo"
        >
          <i className="bi bi-camera-fill me-1"></i>
          Photo
        </button>

        {/* Edit Content Button */}
        <button
          type="button"
          className="btn btn-sm btn-outline-light"
          onClick={onOpenEditModal}
          title="Edit CV Text / Customize"
        >
          <i className="bi bi-pencil-square me-1"></i>
          Edit CV
        </button>

        {/* Print / Download 1-page A4 PDF button */}
        <button
          type="button"
          className="btn btn-sm btn-success fw-semibold shadow-sm"
          onClick={onPrint}
        >
          <i className="bi bi-printer-fill me-1"></i>
          Print / Save A4 PDF
        </button>
      </div>
    </div>
  );
};
