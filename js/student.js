/* ==========================================================================
   CampusCloud - Student Portal JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Check student session
  const currentUser = getCurrentUser();

  // Highlight active user info in sidebar/header if present
  const userNameElements = document.querySelectorAll(".student-user-name");
  userNameElements.forEach(el => el.textContent = currentUser.name || "Student");

  // Page Specific Inits
  if (document.getElementById("studentDashboardView")) {
    initStudentDashboard();
  } else if (document.getElementById("studentEventsView")) {
    initStudentEvents();
  } else if (document.getElementById("studentClubsView")) {
    initStudentClubs();
  } else if (document.getElementById("studentProfileView")) {
    initStudentProfile();
  }
});

/* --------------------------------------------------------------------------
   1. Student Dashboard
   -------------------------------------------------------------------------- */
function initStudentDashboard() {
  const profile = getStudentProfile();
  const events = getEvents();
  const clubs = getClubs();
  const announcements = getAnnouncements();

  // Update Stat Counters
  const statClubs = document.getElementById("statClubsCount");
  const statUpcoming = document.getElementById("statUpcomingEventsCount");
  const statRegistered = document.getElementById("statRegisteredEventsCount");
  const statAnnouncements = document.getElementById("statAnnouncementsCount");

  if (statClubs) statClubs.textContent = profile.joinedClubs.length.toString().padStart(2, '0');
  if (statUpcoming) statUpcoming.textContent = events.length.toString().padStart(2, '0');
  if (statRegistered) statRegistered.textContent = profile.registeredEvents.length.toString().padStart(2, '0');
  if (statAnnouncements) statAnnouncements.textContent = announcements.length.toString().padStart(2, '0');

  // Render Dashboard Upcoming Events List
  renderUpcomingEventsList(events, profile);

  // Render Dashboard Announcements List
  renderAnnouncementsFeed(announcements);

  // Render Dashboard My Clubs
  renderMyClubsList(clubs, profile);
}

function renderUpcomingEventsList(events, profile) {
  const container = document.getElementById("dashboardEventsContainer");
  if (!container) return;

  container.innerHTML = events.slice(0, 3).map(evt => {
    const isRegistered = profile.registeredEvents.includes(evt.id);
    return `
      <div class="event-item-card">
        <div class="event-thumb">
          <img src="${evt.banner}" alt="${evt.title}">
          <span class="event-badge-tag">${evt.category}</span>
        </div>
        <div class="event-details-body">
          <div class="event-meta-date">📅 ${evt.date} • ${evt.time}</div>
          <h4 class="event-title-text">${evt.title}</h4>
          <div class="event-club-name">Organized by: <strong>${evt.club}</strong></div>
          <div class="event-actions-bar">
            <span style="font-size: 0.8rem; color: var(--text-muted);">👥 ${evt.registrations} registered</span>
            ${isRegistered 
              ? `<button class="btn btn-sm btn-success" onclick="viewEventTicket('${evt.id}')">Pass Active ✓</button>`
              : `<button class="btn btn-sm btn-primary" onclick="handleDashboardRegister('${evt.id}')">Register</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAnnouncementsFeed(announcements) {
  const container = document.getElementById("dashboardAnnouncementsContainer");
  if (!container) return;

  container.innerHTML = announcements.map(ann => `
    <div class="announcement-card">
      <div class="ann-card-header">
        <span class="ann-club-tag">📢 ${ann.club}</span>
        <span class="ann-date">${ann.date}</span>
      </div>
      <h5 class="ann-title">${ann.title}</h5>
      <p class="ann-message">${ann.message}</p>
    </div>
  `).join('');
}

function renderMyClubsList(clubs, profile) {
  const container = document.getElementById("dashboardMyClubsContainer");
  if (!container) return;

  const joinedClubsData = clubs.filter(c => profile.joinedClubs.includes(c.id));
  
  if (joinedClubsData.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">You haven't joined any clubs yet.</p>`;
    return;
  }

  container.innerHTML = joinedClubsData.map(c => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-color);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1.5rem;">${c.logo}</span>
        <div>
          <h5 style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.1rem;">${c.name}</h5>
          <span style="font-size: 0.775rem; color: var(--text-muted);">${c.members} Members</span>
        </div>
      </div>
      <a href="clubs.html" class="btn btn-sm btn-secondary">View</a>
    </div>
  `).join('');
}

function handleDashboardRegister(eventId) {
  const res = registerForEvent(eventId);
  if (res.success) {
    showToast("Successfully registered for event!", "success");
    initStudentDashboard();
  } else {
    showToast(res.message, "info");
  }
}

/* --------------------------------------------------------------------------
   2. Student Events Browse Page
   -------------------------------------------------------------------------- */
function initStudentEvents() {
  const searchInput = document.getElementById("eventSearchInput");
  const categoryFilter = document.getElementById("eventCategoryFilter");

  renderEventsGrid();

  if (searchInput) {
    searchInput.addEventListener("input", renderEventsGrid);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", renderEventsGrid);
  }
}

function renderEventsGrid() {
  const container = document.getElementById("eventsGridContainer");
  if (!container) return;

  const events = getEvents();
  const profile = getStudentProfile();
  const searchVal = (document.getElementById("eventSearchInput")?.value || "").toLowerCase();
  const catVal = document.getElementById("eventCategoryFilter")?.value || "All";

  const filtered = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchVal) || e.club.toLowerCase().includes(searchVal);
    const matchesCat = catVal === "All" || e.category === catVal;
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No events found matching your search criteria.</div>`;
    return;
  }

  container.innerHTML = filtered.map(evt => {
    const isRegistered = profile.registeredEvents.includes(evt.id);
    return `
      <div class="event-item-card">
        <div class="event-thumb">
          <img src="${evt.banner}" alt="${evt.title}">
          <span class="event-badge-tag">${evt.category}</span>
        </div>
        <div class="event-details-body">
          <div class="event-meta-date">📅 ${evt.date} • ${evt.time}</div>
          <h3 class="event-title-text">${evt.title}</h3>
          <div class="event-club-name">Organized by: <strong>${evt.club}</strong></div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">📍 ${evt.venue}</p>
          
          <div class="event-actions-bar">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary);">👥 ${evt.registrations} Registrations</span>
            <div>
              ${isRegistered
                ? `<button class="btn btn-sm btn-success" onclick="viewEventTicket('${evt.id}')">View Ticket 🎟️</button>`
                : `<button class="btn btn-sm btn-primary" onclick="handleEventRegister('${evt.id}')">Register Now</button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleEventRegister(eventId) {
  const res = registerForEvent(eventId);
  if (res.success) {
    showToast("Event registration complete!", "success");
    renderEventsGrid();
  } else {
    showToast(res.message, "info");
  }
}

function viewEventTicket(eventId) {
  const events = getEvents();
  const profile = getStudentProfile();
  const eventData = events.find(e => e.id === eventId);
  if (!eventData) return;

  const modalBody = document.getElementById("ticketModalBody");
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="event-pass-card">
        <div class="pass-header">
          <div class="pass-brand">☁️ CampusCloud Entry Pass</div>
          <span class="pass-tag">CONFIRMED ✓</span>
        </div>
        <h3 class="pass-title">${eventData.title}</h3>
        <div class="pass-details-row">
          <div class="pass-field">
            <label>Attendee</label>
            <p>${profile.name}</p>
          </div>
          <div class="pass-field">
            <label>PRN</label>
            <p>${profile.prn}</p>
          </div>
          <div class="pass-field">
            <label>Date & Time</label>
            <p>${eventData.date} | ${eventData.time}</p>
          </div>
          <div class="pass-field">
            <label>Venue</label>
            <p>${eventData.venue}</p>
          </div>
        </div>
        <div class="pass-qr-box">
          QR CODE: CC-TICKET-${eventData.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}
        </div>
      </div>
    `;
  }
  openModal("ticketModal");
}

/* --------------------------------------------------------------------------
   3. Student Clubs Browse Page
   -------------------------------------------------------------------------- */
function initStudentClubs() {
  const searchInput = document.getElementById("clubSearchInput");

  renderClubsGrid();

  if (searchInput) {
    searchInput.addEventListener("input", renderClubsGrid);
  }
}

function renderClubsGrid() {
  const container = document.getElementById("clubsGridContainer");
  if (!container) return;

  const clubs = getClubs();
  const profile = getStudentProfile();
  const searchVal = (document.getElementById("clubSearchInput")?.value || "").toLowerCase();

  const filtered = clubs.filter(c => 
    c.name.toLowerCase().includes(searchVal) || c.category.toLowerCase().includes(searchVal)
  );

  container.innerHTML = filtered.map(c => {
    const isJoined = profile.joinedClubs.includes(c.id);
    return `
      <div class="panel-card" style="padding: 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">${c.logo}</div>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">${c.name}</h3>
        <span class="badge badge-indigo" style="margin-bottom: 0.75rem;">${c.category}</span>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; flex: 1;">${c.description}</p>
        
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <span style="font-size: 0.825rem; font-weight: 600; color: var(--text-muted);">👥 ${c.members} Members</span>
          <button class="btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}" onclick="handleToggleClub('${c.id}')">
            ${isJoined ? 'Joined ✓' : 'Join Club'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleToggleClub(clubId) {
  const res = toggleJoinClub(clubId);
  if (res.success) {
    showToast(res.isJoined ? `Joined ${res.club.name}!` : `Left ${res.club.name}`, "info");
    renderClubsGrid();
  }
}

/* --------------------------------------------------------------------------
   4. Student Profile Page
   -------------------------------------------------------------------------- */
function initStudentProfile() {
  const profile = getStudentProfile();
  const events = getEvents();
  const clubs = getClubs();

  // Profile Header
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileDeptYear").textContent = `${profile.dept} • ${profile.year}`;
  document.getElementById("profilePrn").textContent = `PRN: ${profile.prn}`;
  document.getElementById("profileEmail").textContent = profile.email;

  // Registered Events
  const regContainer = document.getElementById("profileRegisteredEvents");
  if (regContainer) {
    const regEvents = events.filter(e => profile.registeredEvents.includes(e.id));
    if (regEvents.length === 0) {
      regContainer.innerHTML = `<p style="color: var(--text-muted);">No registrations yet.</p>`;
    } else {
      regContainer.innerHTML = regEvents.map(evt => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
          <div>
            <h5 style="font-weight: 700; font-size: 0.95rem;">${evt.title}</h5>
            <span style="font-size: 0.8rem; color: var(--text-muted);">📅 ${evt.date} | 📍 ${evt.venue}</span>
          </div>
          <button class="btn btn-sm btn-outline" onclick="viewEventTicket('${evt.id}')">View Pass 🎟️</button>
        </div>
      `).join('');
    }
  }

  // Joined Clubs
  const clubsContainer = document.getElementById("profileJoinedClubs");
  if (clubsContainer) {
    const joinedClubsData = clubs.filter(c => profile.joinedClubs.includes(c.id));
    clubsContainer.innerHTML = joinedClubsData.map(c => `
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
        <span style="font-size: 1.5rem;">${c.logo}</span>
        <div>
          <h5 style="font-weight: 700; font-size: 0.9rem;">${c.name}</h5>
          <span style="font-size: 0.775rem; color: var(--primary);">${c.category}</span>
        </div>
      </div>
    `).join('');
  }
}
