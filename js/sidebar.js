const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarChecklist = document.getElementById("sidebarChecklist");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const sections = document.querySelectorAll(".section");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.section;
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === "section-" + target);
    });
    sidebarLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});

const missionNames = [
  "1 Suborbital Hop","2 First Orbit","3 Controlled Reentry","4 First Satellite",
  "5 Mun Flyby","6 Mun Orbit","7 Mun Landing (Uncrewed)","8 Mun Landing + Return",
  "9 First Docking","10 LEO Station","11 GEO Satellite","12 Mars Flyby",
  "13 Mars Orbit","14 Mars Landing (Uncrewed)","15 Mars Landing + Return",
  "16 Venus Flyby","17 Asteroid Rendezvous","18 Jupiter Transfer","19 Jupiter Orbit",
  "20 Titan Landing (Uncrewed)","21 Mars Cargo Lander","22 Mars Surface Base",
  "23 High‑Orbit Station","24 Jupiter System Tour","25 Titan Landing + Return",
  "26 Saturn Orbit","27 Uranus Flyby","28 Neptune Flyby","29 Neptune Orbit",
  "30 Triton Landing","31 Triton Landing + Return","32 Neptune Capture + Return",
  "33 Outer Planets Sample Return","34 Grand Tour","35 Interstellar Precursor",
  "36 Crewed Neptune Landing","37 Crewed Grand Tour","38 Permanent Mars Colony",
  "39 Solar System Infrastructure","40 IRON ASTRONAUT MISSION"
];

missionNames.forEach((name, i) => {
  const key = "mission_" + i;
  const checked = localStorage.getItem(key) === "true";
  const div = document.createElement("div");
  div.className = "checklist-item";
  div.innerHTML = `<input type="checkbox" id="m${i}" ${checked ? "checked" : ""}> ${name}`;
  div.querySelector("input").addEventListener("change", e => {
    localStorage.setItem(key, e.target.checked);
  });
  sidebarChecklist.appendChild(div);
});