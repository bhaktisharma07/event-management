/* ==========================================================================
   CampusCloud - Club Head Portal JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();

  // Page Specific Inits
  if (document.getElementById("clubHeadDashboardView")) {
    initClubHeadDashboard();
  } else if (document.getElementById("clubHeadEventsView")) {
    initClubHeadEvents();
  } else if (document.getElementById("clubHeadMembersView")) {
    initClubHeadMembers();
  } else if (document.getElementById("clubHeadAnnouncementsView")) {
    initClubHeadAnnouncements();
  }
});

/* --------------------------------------------------------------------------
   1. Club Head Dashboard
   -------------------------------------------------------------------------- */
function initClubHeadDashboard() {
  const events = getEvents();
  const members = getMembers("club-1"); // Astronomy Club by default
  const announcements = getAnnouncements();
  const clubs = getClubs();
  const astronomyClub = clubs.find(c => c.id === "club-1") || clubs[0];

  // Stats calculation
  const totalRegistrations = events.reduce((sum, e) => sum + e.registrations, 0);

  const elMembers = document.getElementById("headStatMembers");
  const elEvents = document.getElementById("headStatEvents");
  const elRegs = document.getElementById("headStatRegistrations");
  const elAnn = document.getElementById("headStatAnnouncements");

  if (elMembers) elMembers.textContent = astronomyClub.members;
  if (elEvents) elEvents.textContent = events.length.toString().padStart(2, '0');
  if (elRegs) elRegs.textContent = totalRegistrations.toString().padStart(2, '0');
  if (elAnn) elAnn.textContent = announcements.length.toString().padStart(2, '0');

  // Render Managed Events Preview Table
  renderHeadEventsTable(events.slice(0, 4), "dashboardEventsTable");

  // Render Managed Members Table
  renderHeadMembersTable(members.slice(0, 5), "dashboardMembersTable");
}

/* --------------------------------------------------------------------------
   2. Manage Events Page
   -------------------------------------------------------------------------- */
function initClubHeadEvents() {
  renderHeadEventsTable(getEvents(), "headEventsTable");

  // Event Form Submit
  const eventForm = document.getElementById("createEventForm");
  if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("eventId")?.value || "";
      const title = document.getElementById("eventTitle").value;
      const category = document.getElementById("eventCategory").value;
      const date = document.getElementById("eventDate").value;
      const time = document.getElementById("eventTime").value;
      const venue = document.getElementById("eventVenue").value;
      const capacity = parseInt(document.getElementById("eventCapacity").value) || 100;
      const description = document.getElementById("eventDescription").value;

      const eventObj = {
        id: id || undefined,
        title,
        clubId: "club-1",
        club: "Astronomy Club",
        category,
        date,
        time,
        venue,
        capacity,
        description,
        fee: "Free"
      };

      saveEvent(eventObj);
      showToast(id ? "Event updated successfully!" : "New event created!", "success");
      closeModal("createEventModal");
      eventForm.reset();
      
      if (document.getElementById("clubHeadEventsView")) {
        initClubHeadEvents();
      } else {
        initClubHeadDashboard();
      }
    });
  }
}

function renderHeadEventsTable(eventsList, tableId) {
  const container = document.getElementById(tableId);
  if (!container) return;

  if (eventsList.length === 0) {
    container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No events found.</td></tr>`;
    return;
  }

  container.innerHTML = eventsList.map(evt => `
    <tr>
      <td>
        <strong style="color: var(--text-main); font-size: 0.95rem;">${evt.title}</strong>
        <div style="font-size: 0.775rem; color: var(--text-muted);">${evt.category}</div>
      </td>
      <td>📅 ${evt.date}</td>
      <td>📍 ${evt.venue}</td>
      <td><span class="badge badge-sky">${evt.registrations} / ${evt.capacity} Registered</span></td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-sm btn-outline" onclick="openViewRegistrations('${evt.title}', ${evt.registrations})">View Regs</button>
          <button class="btn btn-sm btn-secondary" onclick="editEvent('${evt.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="handleDeleteEvent('${evt.id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openCreateEventModal() {
  const form = document.getElementById("createEventForm");
  if (form) form.reset();
  const idInput = document.getElementById("eventId");
  if (idInput) idInput.value = "";
  const titleEl = document.getElementById("eventModalTitle");
  if (titleEl) titleEl.textContent = "Create New Event";
  openModal("createEventModal");
}

function editEvent(eventId) {
  const events = getEvents();
  const evt = events.find(e => e.id === eventId);
  if (!evt) return;

  document.getElementById("eventId").value = evt.id;
  document.getElementById("eventTitle").value = evt.title;
  document.getElementById("eventCategory").value = evt.category;
  document.getElementById("eventDate").value = evt.date;
  document.getElementById("eventTime").value = evt.time;
  document.getElementById("eventVenue").value = evt.venue;
  document.getElementById("eventCapacity").value = evt.capacity;
  document.getElementById("eventDescription").value = evt.description;

  const titleEl = document.getElementById("eventModalTitle");
  if (titleEl) titleEl.textContent = "Edit Event";
  openModal("createEventModal");
}

function handleDeleteEvent(eventId) {
  if (confirm("Are you sure you want to delete this event?")) {
    deleteEvent(eventId);
    showToast("Event deleted successfully", "info");
    if (document.getElementById("clubHeadEventsView")) {
      initClubHeadEvents();
    } else {
      initClubHeadDashboard();
    }
  }
}

function openViewRegistrations(eventTitle, count) {
  const titleEl = document.getElementById("regModalEventTitle");
  if (titleEl) titleEl.textContent = `${eventTitle} (${count} Registrations)`;

  const listEl = document.getElementById("registrationsListBody");
  if (listEl) {
    const dummyStudents = [
      { name: "Student 101", dept: "Computer Engineering", year: "Third Year", prn: "ST2026101", date: "12 Oct 2026" },
      { name: "Student 102", dept: "Information Technology", year: "Third Year", prn: "ST2026102", date: "11 Oct 2026" },
      { name: "Student 103", dept: "Electronics", year: "Second Year", prn: "ST2026103", date: "10 Oct 2026" },
      { name: "Student 104", dept: "Computer Engineering", year: "Third Year", prn: "ST2026104", date: "09 Oct 2026" }
    ];

    listEl.innerHTML = dummyStudents.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.prn}</td>
        <td>${s.dept}</td>
        <td>${s.year}</td>
        <td><span class="badge badge-emerald">Attended ✓</span></td>
      </tr>
    `).join('');
  }
  openModal("registrationsModal");
}

/* --------------------------------------------------------------------------
   3. Manage Members Page
   -------------------------------------------------------------------------- */
function initClubHeadMembers() {
  const members = getMembers("club-1");
  renderHeadMembersTable(members, "headMembersTable");

  const addForm = document.getElementById("addMemberForm");
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("memberName").value;
      const dept = document.getElementById("memberDept").value;
      const year = document.getElementById("memberYear").value;
      const role = document.getElementById("memberRole").value;
      const email = document.getElementById("memberEmail").value;

      addMember({
        clubId: "club-1",
        name,
        dept,
        year,
        role,
        email
      });

      showToast("Member added successfully!", "success");
      closeModal("addMemberModal");
      addForm.reset();
      initClubHeadMembers();
    });
  }
}

function renderHeadMembersTable(membersList, tableId) {
  const container = document.getElementById(tableId);
  if (!container) return;

  container.innerHTML = membersList.map(mem => `
    <tr>
      <td>
        <strong style="color: var(--text-main); font-size: 0.95rem;">${mem.name}</strong>
        <div style="font-size: 0.775rem; color: var(--text-muted);">${mem.email}</div>
      </td>
      <td>${mem.dept}</td>
      <td>${mem.year}</td>
      <td><span class="badge badge-indigo">${mem.role}</span></td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="handleRemoveMember('${mem.id}')">Remove</button>
      </td>
    </tr>
  `).join('');
}

function handleRemoveMember(memberId) {
  if (confirm("Remove this member from the club?")) {
    removeMember(memberId);
    showToast("Member removed", "info");
    if (document.getElementById("clubHeadMembersView")) {
      initClubHeadMembers();
    } else {
      initClubHeadDashboard();
    }
  }
}

/* --------------------------------------------------------------------------
   4. Manage Announcements Page
   -------------------------------------------------------------------------- */
function initClubHeadAnnouncements() {
  renderAnnouncementsTable();

  const annForm = document.getElementById("postAnnouncementForm");
  if (annForm) {
    annForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("annTitle").value;
      const priority = document.getElementById("annPriority").value;
      const message = document.getElementById("annMessage").value;

      addAnnouncement({
        clubId: "club-1",
        club: "Astronomy Club",
        title,
        priority,
        message
      });

      showToast("Announcement published live!", "success");
      closeModal("postAnnouncementModal");
      annForm.reset();
      renderAnnouncementsTable();
    });
  }
}

function renderAnnouncementsTable() {
  const container = document.getElementById("headAnnouncementsTable");
  if (!container) return;

  const announcements = getAnnouncements();

  container.innerHTML = announcements.map(ann => `
    <tr>
      <td>
        <strong style="color: var(--text-main);">${ann.title}</strong>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${ann.message}</p>
      </td>
      <td><span class="badge ${ann.priority === 'High' ? 'badge-rose' : 'badge-sky'}">${ann.priority}</span></td>
      <td>📅 ${ann.date}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="handleDeleteAnn('${ann.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function handleDeleteAnn(annId) {
  if (confirm("Delete this announcement?")) {
    deleteAnnouncement(annId);
    showToast("Announcement removed", "info");
    renderAnnouncementsTable();
  }
}
