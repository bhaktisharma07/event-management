/* ==========================================================================
   CampusCloud - Centralized Mock Data & State Management
   Simple, Clean Data Architecture (No Personal Names)
   ========================================================================== */

const INITIAL_CLUBS = [
  {
    id: "club-1",
    name: "Astronomy Club",
    shortName: "Astros",
    category: "Science & Space",
    dept: "Science Department",
    members: 120,
    description: "Exploring the cosmos, stargazing sessions, astrophysics discussions, and telescope workshops.",
    head: "Club Coordinator",
    email: "astronomy@campuscloud.edu",
    logo: "🔭",
    established: "2021"
  },
  {
    id: "club-2",
    name: "Coding Club",
    shortName: "Hackers",
    category: "Technical",
    dept: "Computer Engineering",
    members: 210,
    description: "Mastering web development, algorithms, open-source projects, and participating in hackathons.",
    head: "Club Coordinator",
    email: "coding@campuscloud.edu",
    logo: "💻",
    established: "2019"
  },
  {
    id: "club-3",
    name: "Cultural Club",
    shortName: "Tarang",
    category: "Cultural",
    dept: "Student Council",
    members: 180,
    description: "Music, dance, theater, open mics, and annual college festival coordination.",
    head: "Club Coordinator",
    email: "cultural@campuscloud.edu",
    logo: "🎭",
    established: "2018"
  },
  {
    id: "club-4",
    name: "Robotics Club",
    shortName: "RoboTech",
    category: "Technical",
    dept: "Electronics Department",
    members: 95,
    description: "Building autonomous bots, IoT sensors, drone technology, and robotics competitions.",
    head: "Club Coordinator",
    email: "robotics@campuscloud.edu",
    logo: "🤖",
    established: "2020"
  },
  {
    id: "club-5",
    name: "Social Service Club",
    shortName: "Rotaract",
    category: "Social Service",
    dept: "Student Welfare",
    members: 140,
    description: "Driving community impact through donation drives, environmental cleanups, and youth programs.",
    head: "Club Coordinator",
    email: "social@campuscloud.edu",
    logo: "🌱",
    established: "2017"
  }
];

const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Astronomy Night & Telescope Stargazing",
    date: "15 Oct 2026",
    time: "6:00 PM - 9:30 PM",
    clubId: "club-1",
    club: "Astronomy Club",
    category: "Technical",
    venue: "Campus Ground & Observatory",
    registrations: 54,
    capacity: 100,
    fee: "Free",
    banner: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    description: "Join us for an awe-inspiring stargazing session! Observe planets, constellations, and celestial photography with high-power telescopes."
  },
  {
    id: "evt-2",
    title: "Web Development Workshop - Modern Frontend",
    date: "18 Oct 2026",
    time: "10:00 AM - 2:00 PM",
    clubId: "club-2",
    club: "Coding Club",
    category: "Technical",
    venue: "Computer Lab 4",
    registrations: 32,
    capacity: 60,
    fee: "Free",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on workshop on building modern web applications using HTML5, CSS3, and JavaScript."
  },
  {
    id: "evt-3",
    title: "HackCampus - 24hr Campus Hackathon",
    date: "25 Oct 2026",
    time: "9:00 AM Onwards",
    clubId: "club-2",
    club: "Coding Club",
    category: "Technical",
    venue: "Main Auditorium",
    registrations: 88,
    capacity: 120,
    fee: "Free",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "24-hour non-stop project building challenge! Build campus solutions with awards and certificates."
  },
  {
    id: "evt-4",
    title: "Acoustic Night & Open Jam Session",
    date: "28 Oct 2026",
    time: "5:30 PM - 8:30 PM",
    clubId: "club-3",
    club: "Cultural Club",
    category: "Cultural",
    venue: "Open Air Amphitheater",
    registrations: 110,
    capacity: 300,
    fee: "Free",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    description: "Live acoustic musical performances, open mic sessions, and cultural showcases."
  },
  {
    id: "evt-5",
    title: "Autonomous Line Follower Robo Race",
    date: "02 Nov 2026",
    time: "11:00 AM - 3:00 PM",
    clubId: "club-4",
    club: "Robotics Club",
    category: "Technical",
    venue: "Indoor Sports Hall",
    registrations: 45,
    capacity: 50,
    fee: "Free",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Race custom micro-bots through test tracks and obstacle courses with certificates for participants."
  }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Astronomy Night Registrations Closing Soon",
    clubId: "club-1",
    club: "Astronomy Club",
    date: "12 Oct 2026",
    priority: "High",
    message: "Spots are filling up quickly. Register in advance to confirm entry pass."
  },
  {
    id: "ann-2",
    title: "Internal Hackathon Teams Registration Open",
    clubId: "club-2",
    club: "Coding Club",
    date: "11 Oct 2026",
    priority: "High",
    message: "Coding Club is accepting team proposals for upcoming national hackathons."
  },
  {
    id: "ann-3",
    title: "Cultural Club Auditions Next Week",
    clubId: "club-3",
    club: "Cultural Club",
    date: "10 Oct 2026",
    priority: "Normal",
    message: "Singing, instrument, and drama auditions start next Monday at 4:00 PM."
  }
];

const INITIAL_MEMBERS = [
  { id: "mem-1", clubId: "club-1", name: "Student 101", dept: "Computer Engineering", year: "Third Year", role: "Active Member", joinedDate: "12 Aug 2024", email: "student101@campuscloud.edu" },
  { id: "mem-2", clubId: "club-1", name: "Student 102", dept: "Information Technology", year: "Third Year", role: "Active Member", joinedDate: "15 Aug 2024", email: "student102@campuscloud.edu" },
  { id: "mem-3", clubId: "club-1", name: "Student 103", dept: "Electronics", year: "Second Year", role: "Executive Member", joinedDate: "01 Sep 2024", email: "student103@campuscloud.edu" },
  { id: "mem-4", clubId: "club-1", name: "Student 104", dept: "Mechanical", year: "Fourth Year", role: "Technical Member", joinedDate: "10 Jul 2023", email: "student104@campuscloud.edu" },
  { id: "mem-5", clubId: "club-2", name: "Student 105", dept: "Computer Engineering", year: "Second Year", role: "Active Member", joinedDate: "20 Jan 2024", email: "student105@campuscloud.edu" }
];

const INITIAL_STUDENT_PROFILE = {
  name: "Student",
  email: "student@campuscloud.edu",
  dept: "Computer Engineering",
  year: "Third Year",
  prn: "ST2026001",
  phone: "",
  bio: "CampusCloud Student Account",
  joinedClubs: ["club-1", "club-2"],
  registeredEvents: ["evt-1", "evt-2"]
};

// Initialize LocalStorage Data
function initCampusCloudData() {
  if (!localStorage.getItem("cc_clubs")) {
    localStorage.setItem("cc_clubs", JSON.stringify(INITIAL_CLUBS));
  }
  if (!localStorage.getItem("cc_events")) {
    localStorage.setItem("cc_events", JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem("cc_announcements")) {
    localStorage.setItem("cc_announcements", JSON.stringify(INITIAL_ANNOUNCEMENTS));
  }
  if (!localStorage.getItem("cc_members")) {
    localStorage.setItem("cc_members", JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem("cc_student_profile")) {
    localStorage.setItem("cc_student_profile", JSON.stringify(INITIAL_STUDENT_PROFILE));
  }
}

// Data Getter Helpers
function getClubs() {
  initCampusCloudData();
  return JSON.parse(localStorage.getItem("cc_clubs")) || INITIAL_CLUBS;
}

function getEvents() {
  initCampusCloudData();
  return JSON.parse(localStorage.getItem("cc_events")) || INITIAL_EVENTS;
}

function getAnnouncements() {
  initCampusCloudData();
  return JSON.parse(localStorage.getItem("cc_announcements")) || INITIAL_ANNOUNCEMENTS;
}

function getMembers(clubId = null) {
  initCampusCloudData();
  const members = JSON.parse(localStorage.getItem("cc_members")) || INITIAL_MEMBERS;
  if (clubId) {
    return members.filter(m => m.clubId === clubId);
  }
  return members;
}

function getStudentProfile() {
  initCampusCloudData();
  return JSON.parse(localStorage.getItem("cc_student_profile")) || INITIAL_STUDENT_PROFILE;
}

// Data Mutator Helpers
function registerForEvent(eventId) {
  const events = getEvents();
  const profile = getStudentProfile();
  
  if (!profile.registeredEvents.includes(eventId)) {
    profile.registeredEvents.push(eventId);
    localStorage.setItem("cc_student_profile", JSON.stringify(profile));

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      events[eventIndex].registrations += 1;
      localStorage.setItem("cc_events", JSON.stringify(events));
    }
    return { success: true, message: "Successfully registered for the event!" };
  }
  return { success: false, message: "You are already registered for this event." };
}

function toggleJoinClub(clubId) {
  const profile = getStudentProfile();
  const clubs = getClubs();
  const index = profile.joinedClubs.indexOf(clubId);
  let isJoined = false;

  if (index === -1) {
    profile.joinedClubs.push(clubId);
    isJoined = true;
  } else {
    profile.joinedClubs.splice(index, 1);
    isJoined = false;
  }
  localStorage.setItem("cc_student_profile", JSON.stringify(profile));

  // Update club member count
  const clubIndex = clubs.findIndex(c => c.id === clubId);
  if (clubIndex !== -1) {
    clubs[clubIndex].members += (isJoined ? 1 : -1);
    localStorage.setItem("cc_clubs", JSON.stringify(clubs));
  }

  return { success: true, isJoined, club: clubs[clubIndex] };
}

function saveEvent(eventData) {
  const events = getEvents();
  if (eventData.id) {
    const idx = events.findIndex(e => e.id === eventData.id);
    if (idx !== -1) {
      events[idx] = { ...events[idx], ...eventData };
    }
  } else {
    const newEvent = {
      ...eventData,
      id: "evt-" + Date.now(),
      registrations: 0,
      banner: eventData.banner || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
    };
    events.unshift(newEvent);
  }
  localStorage.setItem("cc_events", JSON.stringify(events));
  return true;
}

function deleteEvent(eventId) {
  let events = getEvents();
  events = events.filter(e => e.id !== eventId);
  localStorage.setItem("cc_events", JSON.stringify(events));
  return true;
}

function addAnnouncement(announcementData) {
  const announcements = getAnnouncements();
  const newAnn = {
    ...announcementData,
    id: "ann-" + Date.now(),
    date: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })
  };
  announcements.unshift(newAnn);
  localStorage.setItem("cc_announcements", JSON.stringify(announcements));
  return newAnn;
}

function deleteAnnouncement(annId) {
  let announcements = getAnnouncements();
  announcements = announcements.filter(a => a.id !== annId);
  localStorage.setItem("cc_announcements", JSON.stringify(announcements));
  return true;
}

function addMember(memberData) {
  const members = getMembers();
  const newMem = {
    ...memberData,
    id: "mem-" + Date.now(),
    joinedDate: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })
  };
  members.unshift(newMem);
  localStorage.setItem("cc_members", JSON.stringify(members));
  return newMem;
}

function removeMember(memberId) {
  let members = getMembers();
  members = members.filter(m => m.id !== memberId);
  localStorage.setItem("cc_members", JSON.stringify(members));
  return true;
}

// User Session & Account Helpers
function getCurrentUser() {
  const user = localStorage.getItem("campus_cloud_user");
  if (user) {
    return JSON.parse(user);
  }
  return {
    name: "Student",
    role: "student",
    email: "student@campuscloud.edu",
    dept: "Computer Engineering",
    year: "Third Year"
  };
}

function setCurrentUser(userObj) {
  localStorage.setItem("campus_cloud_user", JSON.stringify(userObj));
}

function logoutUser() {
  localStorage.removeItem("campus_cloud_user");
  window.location.href = "../login.html";
}

// Auto init on load
initCampusCloudData();
