const saveImport = document.getElementById("saveImport");

saveImport.innerHTML = `
  <div class="card">
    <p>Import SFS JSON save file.</p>
    <input type="file" id="saveFile" accept=".json">
    <button class="btn" id="saveImportBtn">Import</button>
    <div class="calc-output" id="saveOutput"></div>
  </div>
`;

document.getElementById("saveImportBtn").addEventListener("click", () => {
  const file = document.getElementById("saveFile").files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      saveOutput.textContent = "Save loaded: " + (data.name || "Unnamed Save");
    } catch {
      saveOutput.textContent = "Invalid save file.";
    }
  };
  reader.readAsText(file);
});