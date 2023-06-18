import {
  cargarDatos2,
  cargarCategory,
  filterForCheck,
  filterSearch,
} from "../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    let cardEvents = data.events;
    let currentDate = data.currentDate;
    cargarDatos2(cardEvents, currentDate);
    cargarCategory(cardEvents);
    let check = document.getElementById("check-box");
    check.addEventListener("change", () => {
      const filteredEvents = filterForCheck(cardEvents);
      cargarDatos2(filteredEvents);
      applyFilters();
    });

    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const filteredEvents = filterSearch(cardEvents);
      cargarDatos2(filteredEvents);
      applyFilters();
    });
    function applyFilters() {
      const filteredEvents = filterForCheck(cardEvents);
      const searchFilteredEvents = filterSearch(filteredEvents);
      cargarDatos2(searchFilteredEvents);
    }
  })
  .catch((err) => console.log(err));
