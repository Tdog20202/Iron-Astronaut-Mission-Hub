fetch("data/engines.json")
  .then(r => r.json())
  .then(engines => {
    engineDBContainer.innerHTML = "";
    const list = document.createElement("div");
    engines.forEach(e => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <strong>${e.name}</strong> <span class="pill">${e.mod}</span><br>
        <small>Thrust: ${e.thrust} kN · Isp: ${e.isp_vac}/${e.isp_atm} s · Mass: ${e.mass} t</small>
      `;
      list.appendChild(div);
    });
    engineDBContainer.appendChild(list);

    const builderEngineList = document.getElementById("builderEngineList");
    if (builderEngineList) {
      engines.forEach(e => {
        const div = document.createElement("div");
        div.className = "pill";
        div.textContent = e.name;
        builderEngineList.appendChild(div);
      });
    }
  });