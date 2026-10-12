/* ==========================================================================
   CampusCloud - Authentication Logic (Simple Sign In & Create Account)
   ========================================================================== */

let currentRole = "student";
let authMode = "signin"; // 'signin' or 'signup'

document.addEventListener("DOMContentLoaded", () => {
  const roleStudentBtn = document.getElementById("roleStudent");
  const roleClubHeadBtn = document.getElementById("roleClubHead");
  const authModeTabs = document.getElementById("authModeTabs");
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const emailInput = document.getElementById("loginEmail");
  const quickStudentBtn = document.getElementById("quickStudentBtn");
  const quickClubHeadBtn = document.getElementById("quickClubHeadBtn");

  // Role Switching
  if (roleStudentBtn && roleClubHeadBtn) {
    roleStudentBtn.addEventListener("click", () => {
      currentRole = "student";
      roleStudentBtn.classList.add("active");
      roleClubHeadBtn.classList.remove("active");
      if (authModeTabs) authModeTabs.style.display = "flex";
      if (emailInput) emailInput.value = "student@campuscloud.edu";
    });

    roleClubHeadBtn.addEventListener("click", () => {
      currentRole = "clubhead";
      roleClubHeadBtn.classList.add("active");
      roleStudentBtn.classList.remove("active");
      
      // Club Head defaults to Sign In
      if (authModeTabs) authModeTabs.style.display = "none";
      switchAuthMode("signin");
      if (emailInput) emailInput.value = "clubhead@campuscloud.edu";
    });
  }

  // Auth Mode Switching (Sign In vs Create Account)
  function switchAuthMode(mode) {
    authMode = mode;
    if (mode === "signin") {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
      tabSignIn.style.color = "var(--primary)";
      tabSignIn.style.borderBottom = "2px solid var(--primary)";
      tabSignIn.style.fontWeight = "700";
      tabSignUp.style.color = "var(--text-muted)";
      tabSignUp.style.borderBottom = "none";
      tabSignUp.style.fontWeight = "600";
    } else {
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
      tabSignUp.style.color = "var(--primary)";
      tabSignUp.style.borderBottom = "2px solid var(--primary)";
      tabSignUp.style.fontWeight = "700";
      tabSignIn.style.color = "var(--text-muted)";
      tabSignIn.style.borderBottom = "none";
      tabSignIn.style.fontWeight = "600";
    }
  }

  if (tabSignIn && tabSignUp) {
    tabSignIn.addEventListener("click", () => switchAuthMode("signin"));
    tabSignUp.addEventListener("click", () => switchAuthMode("signup"));
  }

  // Handle Sign In Submit
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : "";

      if (currentRole === "student") {
        const existingProfile = getStudentProfile();
        const userObj = {
          name: existingProfile.name || "Student",
          role: "student",
          email: email || "student@campuscloud.edu",
          dept: existingProfile.dept || "Computer Engineering",
          year: existingProfile.year || "Third Year"
        };
        setCurrentUser(userObj);
        showToast("Signed in as Student!", "success");
        setTimeout(() => {
          window.location.href = "student/dashboard.html";
        }, 500);
      } else {
        const userObj = {
          name: "Club Head",
          role: "clubhead",
          email: email || "clubhead@campuscloud.edu",
          clubId: "club-1",
          clubName: "Astronomy Club"
        };
        setCurrentUser(userObj);
        showToast("Signed in as Club Head!", "success");
        setTimeout(() => {
          window.location.href = "club-head/dashboard.html";
        }, 500);
      }
    });
  }

  // Handle Create Account Submit (Student)
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("registerName").value.trim() || "Student";
      const email = document.getElementById("registerEmail").value.trim() || "student@campuscloud.edu";
      const dept = document.getElementById("registerDept").value;
      const year = document.getElementById("registerYear").value;

      const newStudentProfile = {
        name: name,
        email: email,
        dept: dept,
        year: year,
        prn: "ST" + Math.floor(100000 + Math.random() * 900000),
        phone: "",
        bio: "CampusCloud Student Account",
        joinedClubs: ["club-1"],
        registeredEvents: []
      };

      localStorage.setItem("cc_student_profile", JSON.stringify(newStudentProfile));
      
      const userObj = {
        name: name,
        role: "student",
        email: email,
        dept: dept,
        year: year
      };
      setCurrentUser(userObj);

      showToast("Account created successfully! Welcome!", "success");
      setTimeout(() => {
        window.location.href = "student/dashboard.html";
      }, 600);
    });
  }

  // Quick 1-Click Buttons
  if (quickStudentBtn) {
    quickStudentBtn.addEventListener("click", () => {
      const userObj = {
        name: "Student",
        role: "student",
        email: "student@campuscloud.edu",
        dept: "Computer Engineering",
        year: "Third Year"
      };
      setCurrentUser(userObj);
      window.location.href = "student/dashboard.html";
    });
  }

  if (quickClubHeadBtn) {
    quickClubHeadBtn.addEventListener("click", () => {
      const userObj = {
        name: "Club Head",
        role: "clubhead",
        email: "clubhead@campuscloud.edu",
        clubId: "club-1",
        clubName: "Astronomy Club"
      };
      setCurrentUser(userObj);
      window.location.href = "club-head/dashboard.html";
    });
  }
});
