/* ==========================================================================
   CampusCloud - Common JavaScript Utilities
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Sidebar Toggle
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("portalSidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Auto highlight active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link, .sidebar-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && currentPath.endsWith(href)) {
      link.classList.add("active");
    }
  });

  // Modal Backdrop Click to Close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
});

// Toast Helper
function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "✓";
  if (type === "info") icon = "ℹ";
  if (type === "error") icon = "✕";

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modal Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}
