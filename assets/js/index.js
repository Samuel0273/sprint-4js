import {
  cargarDatos,
  cargarCategory,
  filterForCheck,
  filterSearch,
} from "../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    let cardEvents = data.events;
    cargarDatos(cardEvents);
    cargarCategory(cardEvents);
    let check = document.getElementById("check-box");
    check.addEventListener("change", () => {
      const filteredEvents = filterForCheck(cardEvents);
      cargarDatos(filteredEvents);
      applyFilters();
    });

    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const filteredEvents = filterSearch(cardEvents);
      cargarDatos(filteredEvents);
      applyFilters();
    });
    function applyFilters() {
      const filteredEvents = filterForCheck(cardEvents);
      const searchFilteredEvents = filterSearch(filteredEvents);
      cargarDatos(searchFilteredEvents);
    }
  })
  .catch((err) => console.log(err));
