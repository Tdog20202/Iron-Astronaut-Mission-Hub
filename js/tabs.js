document.querySelectorAll(".tabs").forEach(tabBar => {
  const tabs = tabBar.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const parentSection = tabBar.parentElement;
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      parentSection.querySelectorAll(".tab-body").forEach(body => {
        body.classList.toggle("active", body.id === "tab-" + target);
      });
    });
  });
});