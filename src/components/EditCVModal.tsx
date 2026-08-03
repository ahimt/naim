import React, { useState } from "react";
import { CVData, initialCVData } from "../cvData";

interface EditCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  onSave: (newData: CVData) => void;
}

export const EditCVModal: React.FC<EditCVModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<CVData>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "skills" | "summary">("general");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(initialCVData)));
    onSave(initialCVData);
    onClose();
  };

  const updateSkills = (text: string) => {
    const skillsArray = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormData({ ...formData, skills: skillsArray });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content shadow">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fs-6">
              <i className="bi bi-pencil-square me-2"></i>
              Edit CV Content
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4" style={{ fontSize: "13px" }}>
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "general" ? "active fw-bold" : ""}`}
                  onClick={() => setActiveTab("general")}
                >
                  General
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "summary" ? "active fw-bold" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  Summary
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "contact" ? "active fw-bold" : ""}`}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "skills" ? "active fw-bold" : ""}`}
                  onClick={() => setActiveTab("skills")}
                >
                  Skills
                </button>
              </li>
            </ul>

            {activeTab === "general" && (
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Professional Subtitle</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="mb-3">
                <label className="form-label fw-bold">Professional Summary</label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
                <div className="form-text">
                  Keep it concise to ensure the CV stays within exactly 1 A4 page when printing.
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, address: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Skills (One per line)
                </label>
                <textarea
                  className="form-control"
                  rows={8}
                  value={formData.skills.join("\n")}
                  onChange={(e) => updateSkills(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleReset}
            >
              Reset to Naimur Rahman Original
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
