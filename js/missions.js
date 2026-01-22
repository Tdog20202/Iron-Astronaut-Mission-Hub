const missionsListContainer = document.getElementById("missionsList");
const missionsSearchInput = document.getElementById("missionSearch");
const missionsSearchResults = document.getElementById("missionsSearchResults");
const timelineView = document.getElementById("timelineView");
const timelineFull = document.getElementById("timelineFull");

fetch("data/missions.json")
  .then(r => r.json())
  .then(missions => {
    missions.forEach(m => {
      const div = document.createElement("div");
      div.className = "mission-line";
      div.dataset.tags = (m.tags || []).join(" ");
      div.innerHTML = `<span class="mission-name">${m.id}. ${m.name}</span><span class="mission-dv">${m.dv}</span>`;
      missionsListContainer.appendChild(div);
    });

    missionsSearchInput.addEventListener("input", () => {
      const q = missionsSearchInput.value.toLowerCase();
      missionsSearchResults.innerHTML = "";
      missions.filter(m => {
        const text = (m.name + " " + (m.tags || []).join(" ")).toLowerCase();
        return !q || text.includes(q);
      }).forEach(m => {
        const div = document.createElement("div");
        div.className = "mission-line";
        div.innerHTML = `<span class="mission-name">${m.id}. ${m.name}</span><span class="mission-dv">${m.dv}</span>`;
        missionsSearchResults.appendChild(div);
      });
    });

    fetch("data/timeline.json")
      .then(r => r.json())
      .then(timeline => {
        timelineView.innerHTML = "";
        timelineFull.innerHTML = "";
        timeline.forEach(item => {
          const div = document.createElement("div");
          div.className = "timeline-item";
          div.innerHTML = `
            <span class="title">${item.label}</span>
            <span class="meta">${item.range}</span>
          `;
          timelineView.appendChild(div.cloneNode(true));
          timelineFull.appendChild(div);
        });
      });
  });