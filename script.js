/* ==========================================================
   NAIMUR RAHMAN - PROFESSIONAL CV (VANILLA JS CONTROLLER)
   ========================================================== */

const DEFAULT_PROFILE_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

const FALLBACK_PHOTO_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%231A3E78'/><circle cx='100' cy='75' r='35' fill='%23FFFFFF' opacity='0.9'/><path d='M40 175 C40 135 70 120 100 120 C130 120 160 135 160 175' fill='%23FFFFFF' opacity='0.9'/></svg>";

// Initial CV Data
const initialCVData = {
  name: "NAIMUR RAHMAN",
  subtitle: "TEXTILE ENGINEERING (APPAREL) GRADUATE",
  summary: "Motivated and detail-oriented B.Sc. in Textile Engineering (Apparel) graduate with a strong academic foundation in apparel manufacturing, garment production processes, and quality standards. Experienced in student leadership as Vice President of the City University Textile Club, demonstrating excellent leadership, communication, event management, and teamwork skills. Passionate about contributing to the growth of the textile and apparel industry through continuous learning and professional excellence.",
  profilePhoto: DEFAULT_PROFILE_PHOTO,
  contact: {
    phone: "01771092543",
    email: "naimurr183@gmail.com",
    address: "Road- 02, Block- G, Mirpur-2, Dhaka- 1216"
  },
  skills: [
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Internet Browsing",
    "Basic Documentation",
    "Report Preparation",
    "Data Management",
    "Quick Learner"
  ]
};

let currentCVData = { ...initialCVData };
let currentZoom = 1.0;
let currentTheme = "navy";

// Safe localStorage access
function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // ignore iframe storage errors
  }
}

// Load saved data
function loadCVData() {
  const saved = safeGetItem("naimur_cv_data_static");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      currentCVData = { ...initialCVData, ...parsed };
    } catch (e) {
      currentCVData = { ...initialCVData };
    }
  }
  const savedTheme = safeGetItem("naimur_cv_theme");
  if (savedTheme) {
    currentTheme = savedTheme;
  }
}

// Render data into HTML DOM
function renderCV() {
  const elName = document.getElementById("cv-name");
  const elSubtitle = document.getElementById("cv-subtitle");
  const elSummary = document.getElementById("cv-summary");
  const elPhone = document.getElementById("cv-phone");
  const elEmail = document.getElementById("cv-email");
  const elAddress = document.getElementById("cv-address");
  const elPhoto = document.getElementById("cv-profile-photo");
  const elSkillsList = document.getElementById("cv-skills-list");

  if (elName) elName.textContent = currentCVData.name;
  if (elSubtitle) elSubtitle.textContent = currentCVData.subtitle;
  if (elSummary) elSummary.textContent = currentCVData.summary;
  if (elPhone) elPhone.textContent = currentCVData.contact.phone;
  if (elEmail) elEmail.textContent = currentCVData.contact.email;
  if (elAddress) elAddress.textContent = currentCVData.contact.address;

  if (elPhoto) {
    elPhoto.src = currentCVData.profilePhoto || DEFAULT_PROFILE_PHOTO;
    elPhoto.onerror = function() {
      this.onerror = null;
      this.src = FALLBACK_PHOTO_SVG;
    };
  }

  if (elSkillsList) {
    elSkillsList.innerHTML = "";
    currentCVData.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      elSkillsList.appendChild(li);
    });
  }

  // Update theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButtons();
}

// Zoom control
function setZoom(val) {
  currentZoom = Math.max(0.45, Math.min(1.3, val));
  const elPage = document.getElementById("a4-page");
  const elZoomLabel = document.getElementById("zoom-label");
  if (elPage) {
    elPage.style.transform = `scale(${currentZoom})`;
    elPage.style.marginBottom = currentZoom < 1 ? `-${(1 - currentZoom) * 1100}px` : "0px";
  }
  if (elZoomLabel) {
    elZoomLabel.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

// Auto fit zoom for small screens
function calculateAutoZoom() {
  const availableWidth = window.innerWidth - 32;
  const a4PixelWidth = 794;
  if (availableWidth < a4PixelWidth) {
    return Math.max(0.45, Math.min(1.0, Number((availableWidth / a4PixelWidth).toFixed(2))));
  }
  return 1.0;
}

// Theme handling
function setTheme(themeName) {
  currentTheme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
  safeSetItem("naimur_cv_theme", themeName);
  updateThemeButtons();
}

function updateThemeButtons() {
  const themes = ["navy", "slate", "emerald", "burgundy"];
  themes.forEach(t => {
    const btn = document.getElementById(`btn-theme-${t}`);
    if (btn) {
      if (t === currentTheme) {
        btn.classList.remove("btn-outline-light");
        btn.classList.add("btn-primary");
      } else {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-light");
      }
    }
  });
}

// Modal handling
let photoModalInstance = null;
let editModalInstance = null;

function initModals() {
  const photoModalEl = document.getElementById("photoModal");
  if (photoModalEl && window.bootstrap) {
    photoModalInstance = new window.bootstrap.Modal(photoModalEl);
  }
  const editModalEl = document.getElementById("editModal");
  if (editModalEl && window.bootstrap) {
    editModalInstance = new window.bootstrap.Modal(editModalEl);
  }
}

function openPhotoModal() {
  const inputUrl = document.getElementById("photo-url-input");
  const previewImg = document.getElementById("photo-preview-img");
  if (inputUrl) inputUrl.value = currentCVData.profilePhoto || DEFAULT_PROFILE_PHOTO;
  if (previewImg) previewImg.src = currentCVData.profilePhoto || DEFAULT_PROFILE_PHOTO;
  if (photoModalInstance) photoModalInstance.show();
}

function openEditModal() {
  document.getElementById("edit-name").value = currentCVData.name;
  document.getElementById("edit-subtitle").value = currentCVData.subtitle;
  document.getElementById("edit-summary").value = currentCVData.summary;
  document.getElementById("edit-phone").value = currentCVData.contact.phone;
  document.getElementById("edit-email").value = currentCVData.contact.email;
  document.getElementById("edit-address").value = currentCVData.contact.address;
  document.getElementById("edit-skills").value = (currentCVData.skills || []).join("\n");

  if (editModalInstance) editModalInstance.show();
}

// Save Edit Modal
function saveCVEdits() {
  currentCVData.name = document.getElementById("edit-name").value.trim();
  currentCVData.subtitle = document.getElementById("edit-subtitle").value.trim();
  currentCVData.summary = document.getElementById("edit-summary").value.trim();
  currentCVData.contact.phone = document.getElementById("edit-phone").value.trim();
  currentCVData.contact.email = document.getElementById("edit-email").value.trim();
  currentCVData.contact.address = document.getElementById("edit-address").value.trim();

  const skillsText = document.getElementById("edit-skills").value;
  currentCVData.skills = skillsText
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  safeSetItem("naimur_cv_data_static", JSON.stringify(currentCVData));
  renderCV();
  if (editModalInstance) editModalInstance.hide();
}

// Save Photo Modal
function savePhotoModal() {
  const urlVal = document.getElementById("photo-url-input").value.trim();
  if (urlVal) {
    currentCVData.profilePhoto = urlVal;
    safeSetItem("naimur_cv_data_static", JSON.stringify(currentCVData));
    renderCV();
  }
  if (photoModalInstance) photoModalInstance.hide();
}

// Reset data to original
function resetCVToOriginal() {
  if (confirm("Reset CV content to original Naimur Rahman details?")) {
    currentCVData = JSON.parse(JSON.stringify(initialCVData));
    safeSetItem("naimur_cv_data_static", JSON.stringify(currentCVData));
    renderCV();
    if (editModalInstance) editModalInstance.hide();
  }
}

// Event Listeners on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadCVData();
  renderCV();
  initModals();

  // Set initial auto zoom for small screens
  setZoom(calculateAutoZoom());

  window.addEventListener("resize", () => {
    const optimal = calculateAutoZoom();
    if (optimal < 1.0 && currentZoom > optimal) {
      setZoom(optimal);
    }
  });

  // Photo file upload handler
  const fileInput = document.getElementById("photo-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function() {
        if (typeof reader.result === "string") {
          const previewImg = document.getElementById("photo-preview-img");
          const inputUrl = document.getElementById("photo-url-input");
          if (previewImg) previewImg.src = reader.result;
          if (inputUrl) inputUrl.value = reader.result;
        }
      };
      reader.readAsDataURL(file);
    });
  }
});
