import React, { useState, useEffect } from "react";
import { initialCVData, CVData } from "./cvData";
import { A4CVPage } from "./components/A4CVPage";
import { CVToolbar } from "./components/CVToolbar";
import { PhotoModal } from "./components/PhotoModal";
import { EditCVModal } from "./components/EditCVModal";
import "./cv-style.css";

// Safe localStorage helpers for iframe/sandboxed environments
function safeGetCVData(): CVData {
  try {
    const saved = localStorage.getItem("naimur_cv_data");
    return saved ? JSON.parse(saved) : initialCVData;
  } catch (error) {
    console.warn("localStorage read access restricted in iframe preview:", error);
    return initialCVData;
  }
}

function safeSetCVData(data: CVData) {
  try {
    localStorage.setItem("naimur_cv_data", JSON.stringify(data));
  } catch (error) {
    // Ignore security errors in sandboxed iframes
  }
}

// Calculate optimal zoom to fit A4 (794px width) inside preview container
function calculateOptimalZoom(): number {
  if (typeof window === "undefined") return 1.0;
  const availableWidth = window.innerWidth - 32; // padding accounted
  const a4PixelWidth = 794; // 210mm at 96 DPI
  if (availableWidth < a4PixelWidth) {
    return Math.max(0.45, Math.min(1.0, Number((availableWidth / a4PixelWidth).toFixed(2))));
  }
  return 1.0;
}

export default function App() {
  const [cvData, setCvData] = useState<CVData>(() => safeGetCVData());
  const [theme, setTheme] = useState<string>("navy");
  const [zoom, setZoom] = useState<number>(() => calculateOptimalZoom());
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    safeSetCVData(cvData);
  }, [cvData]);

  // Adjust zoom automatically if window is resized and small
  useEffect(() => {
    const handleResize = () => {
      const optimal = calculateOptimalZoom();
      if (optimal < 1.0 && zoom > optimal) {
        setZoom(optimal);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [zoom]);

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error("Print failed:", e);
    }
  };

  const handleSavePhoto = (photoUrl: string) => {
    setCvData((prev) => ({
      ...prev,
      profilePhoto: photoUrl,
    }));
  };

  const handleSaveData = (newData: CVData) => {
    setCvData(newData);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Interactive Top Control Bar (Hidden during Print) */}
      <CVToolbar
        onPrint={handlePrint}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
        zoom={zoom}
        setZoom={setZoom}
      />

      {/* Main A4 Workspace with responsive wrapper */}
      <main className="a4-wrapper d-flex justify-content-center align-items-start overflow-auto">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease-out",
            marginBottom: zoom < 1 ? `-${(1 - zoom) * 1100}px` : "0px",
          }}
        >
          <A4CVPage data={cvData} />
        </div>
      </main>

      {/* Interactive Photo Changer Modal */}
      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={cvData.profilePhoto}
        onSavePhoto={handleSavePhoto}
      />

      {/* Interactive Content Editor Modal */}
      <EditCVModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={cvData}
        onSave={handleSaveData}
      />
    </div>
  );
}
