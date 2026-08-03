import React, { useState } from "react";
import { DEFAULT_PROFILE_PHOTO } from "../cvData";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string;
  onSavePhoto: (photoUrl: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  currentPhoto,
  onSavePhoto,
}) => {
  const [photoInput, setPhotoInput] = useState<string>(currentPhoto);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoInput(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSavePhoto(photoInput);
    onClose();
  };

  const handleReset = () => {
    setPhotoInput(DEFAULT_PROFILE_PHOTO);
    onSavePhoto(DEFAULT_PROFILE_PHOTO);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fs-6">
              <i className="bi bi-camera-fill me-2"></i>
              Change Profile Photo
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center py-4">
            <div
              className="rounded-circle overflow-hidden mx-auto mb-3 border border-3 border-primary shadow"
              style={{ width: 120, height: 120 }}
            >
              <img
                src={photoInput}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bold fs-7">
                Upload Photo from Device:
              </label>
              <input
                type="file"
                className="form-control form-control-sm"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div className="form-text">
                Recommended: Square photo (e.g. 400x400 px).
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bold fs-7">
                Or Paste Image URL:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleReset}
            >
              Reset to Default
            </button>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-light me-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={handleSave}
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
