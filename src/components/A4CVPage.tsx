import React from "react";
import { CVData } from "../cvData";

interface A4CVPageProps {
  data: CVData;
}

export const A4CVPage: React.FC<A4CVPageProps> = ({ data }) => {
  return (
    <div className="a4-page shadow-lg" id="printable-cv">
      {/* ================= LEFT SIDEBAR COLUMN ================= */}
      <div className="cv-sidebar">
        {/* Profile Photo */}
        <div className="profile-photo-container">
          <img
            src={data.profilePhoto}
            alt={data.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // prevent infinite loop
              target.src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%231A3E78'/><circle cx='100' cy='75' r='35' fill='%23FFFFFF' opacity='0.9'/><path d='M40 175 C40 135 70 120 100 120 C130 120 160 135 160 175' fill='%23FFFFFF' opacity='0.9'/></svg>";
            }}
          />
        </div>

        {/* Contact Section */}
        <div className="sidebar-section-title">
          <span className="sidebar-icon-circle">
            <i className="bi bi-person-fill"></i>
          </span>
          <span>Contact</span>
        </div>

        <div className="contact-item">
          <div className="contact-icon-badge">
            <i className="bi bi-telephone-fill"></i>
          </div>
          <div>
            <div className="contact-label">Phone</div>
            <div className="contact-value">{data.contact.phone}</div>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon-badge">
            <i className="bi bi-envelope-fill"></i>
          </div>
          <div>
            <div className="contact-label">Email</div>
            <div className="contact-value">{data.contact.email}</div>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon-badge">
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          <div>
            <div className="contact-label">Address</div>
            <div className="contact-value">{data.contact.address}</div>
          </div>
        </div>

        {/* Education Section */}
        <div className="sidebar-section-title" style={{ marginTop: "14px" }}>
          <span className="sidebar-icon-circle">
            <i className="bi bi-mortarboard-fill"></i>
          </span>
          <span>Education</span>
        </div>

        {data.education.map((edu, idx) => (
          <div className="edu-row" key={idx}>
            <div className="edu-year">{edu.year}</div>
            <div className="edu-content">
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-inst">{edu.institution}</div>
              {edu.board && <div className="edu-inst">{edu.board}</div>}
              {edu.group && <div className="edu-inst">{edu.group}</div>}
              <div className="edu-score">{edu.score}</div>
            </div>
          </div>
        ))}

        {/* Skills Section */}
        <div className="sidebar-section-title" style={{ marginTop: "12px" }}>
          <span className="sidebar-icon-circle">
            <i className="bi bi-gear-fill"></i>
          </span>
          <span>Skills</span>
        </div>

        <ul className="skills-list">
          {data.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>

        {/* Leadership Section */}
        <div className="sidebar-section-title" style={{ marginTop: "12px" }}>
          <span className="sidebar-icon-circle">
            <i className="bi bi-star-fill"></i>
          </span>
          <span>Leadership</span>
        </div>

        <div style={{ marginBottom: "6px" }}>
          <div style={{ fontWeight: 700, fontSize: "10.5px", color: "#FFFFFF" }}>
            {data.leadership.role}
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.9)" }}>
            {data.leadership.organization}
          </div>
          <div style={{ fontSize: "9.8px", color: "rgba(255,255,255,0.8)" }}>
            {data.leadership.period}
          </div>
        </div>

        {/* Language Section */}
        <div className="sidebar-section-title" style={{ marginTop: "12px" }}>
          <span className="sidebar-icon-circle">
            <i className="bi bi-globe"></i>
          </span>
          <span>Language</span>
        </div>

        {data.languages.map((lang, idx) => (
          <div className="language-row" key={idx}>
            <span style={{ fontWeight: 600 }}>{lang.language}</span>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{lang.proficiency}</span>
          </div>
        ))}
      </div>

      {/* ================= RIGHT MAIN CONTENT COLUMN ================= */}
      <div className="cv-main">
        {/* Header Title Block */}
        <h1 className="cv-header-name">{data.name}</h1>
        <div className="cv-header-subtitle-wrapper">
          <h2 className="cv-header-subtitle">{data.subtitle}</h2>
        </div>

        {/* Professional Summary */}
        <p className="cv-summary-text">{data.summary}</p>

        {/* Experience Section */}
        <div className="main-section-title">
          <span className="main-icon-circle">
            <i className="bi bi-briefcase-fill"></i>
          </span>
          <span>Experience</span>
        </div>

        <div className="experience-timeline">
          {data.experience.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-marker"></div>
              <div className="timeline-date">{exp.period}</div>
              <div className="timeline-role">{exp.title}</div>
              {exp.description && (
                <p className="timeline-desc">{exp.description}</p>
              )}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="timeline-list">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Extra-Curricular Activities */}
        <div className="main-section-title" style={{ marginTop: "10px" }}>
          <span className="main-icon-circle">
            <i className="bi bi-people-fill"></i>
          </span>
          <span>Extra-Curricular Activities</span>
        </div>

        <ul className="timeline-list" style={{ paddingLeft: "18px", marginTop: "2px" }}>
          {data.extraCurricular.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "2px" }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Personal Information */}
        <div className="main-section-title" style={{ marginTop: "10px" }}>
          <span className="main-icon-circle">
            <i className="bi bi-person-fill"></i>
          </span>
          <span>Personal Information</span>
        </div>

        <div className="personal-info-grid">
          {data.personalInfo.map((info, idx) => (
            <React.Fragment key={idx}>
              <div className="info-label">{info.label}</div>
              <div className="info-colon">:</div>
              <div className="info-value">{info.value}</div>
            </React.Fragment>
          ))}
        </div>

        {/* Reference Section */}
        <div className="main-section-title" style={{ marginTop: "10px" }}>
          <span className="main-icon-circle">
            <i className="bi bi-person-badge-fill"></i>
          </span>
          <span>Reference</span>
        </div>

        <div className="references-container">
          {data.references.map((ref, idx) => (
            <div className="reference-card" key={idx}>
              <div className="ref-name">{ref.name}</div>
              <div className="ref-title">{ref.title}</div>
              <div className="ref-org">{ref.organization}</div>
              <div className="ref-contact-row">
                <span className="ref-label">Phone:</span>
                <span>{ref.phone}</span>
              </div>
              <div className="ref-contact-row">
                <span className="ref-label">Email:</span>
                <span>{ref.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
