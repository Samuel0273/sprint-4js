let td1 = document.getElementById("td1");
let upEvent = document.getElementById("upEvent");
let pastEvent = document.getElementById("pastEvent");
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    let currentDate = data.currentDate;
    let upcomingEvents = data.events.filter(
      (event) => event.date > currentDate
    );
    let pastEvents = data.events.filter((event) => event.date < currentDate);
    let upcomingEventCategories = [
      ...new Set(upcomingEvents.map((event) => event.category)),
    ];
    let pastEventsCategories = [
      ...new Set(pastEvents.map((event) => event.category)),
    ];
    let assistanceAndPercentage = filteredAssistanceAndPercentage(data.events);
    let eventsCapacity = filteredCapacity(data.events);
    let pastValues = filteredRevenues(pastEventsCategories, pastEvents);
    let upcomingValues = filteredRevenues(
      upcomingEventCategories,
      upcomingEvents
    );
    cargarTd1(assistanceAndPercentage, eventsCapacity, td1);
    cargarTd2(pastValues, pastEvent);
    cargarTd2(upcomingValues, upEvent);
  });
// Function capacity
function filteredCapacity(events) {
  return events.sort((a, b) => a.capacity - b.capacity);
}
// Function asistance and percentage
function filteredAssistanceAndPercentage(events) {
  return events
    .filter((event) => event.assistance)
    .map((event) => ({
      event: event.name,
      percentage: ((event.assistance * 100) / event.capacity).toFixed(2),
    }))
    .sort((a, b) => a.percentage - b.percentage);
}
// Function revenues
function filteredRevenues(arrayA, arrayB) {
  return arrayA.map((category) => {
    const categoryFilter = arrayB.filter(
      (event) => event.category === category
    );
    const revenues = categoryFilter.reduce((accumulator, event) => {
      const attendance = event.assistance || event.estimate;
      return accumulator + attendance * event.price;
    }, 0);
    const percentages = (
      categoryFilter.reduce((accumulator, event) => {
        const attendance = event.assistance || event.estimate;
        return accumulator + (attendance * 100) / event.capacity;
      }, 0) / categoryFilter.length
    ).toFixed(2);
    return {
      category: category,
      revenue: revenues,
      percentage: percentages,
    };
  });
}
// Function cargar
function cargarTd1(arrayA, arrayB, table) {
  const highPercent = arrayA[arrayA.length - 1];
  const lowPercent = arrayA[0];
  const highCapacity = arrayB[arrayB.length - 1];
  table.innerHTML = `
    <th colspan="3">Event statistics</th>
    <tr> 
      <td>Events with the highest Percentage of attendance</td>
      <td>Events with the lowest Percentage of attendance</td>
      <td>Event with larger capacity</td>
    </tr>
    <tr>
      <td>${highPercent.event} ${highPercent.percentage}%</td>
      <td>${lowPercent.event} ${lowPercent.percentage}%</td>
      <td>${highCapacity.name} ${highCapacity.capacity.toLocaleString()}</td>
    </tr>
  `;
}
// Function cargar td2-3
function cargarTd2(array, element) {
  const table2 = array.map(
    (event) => `
    <tr>
      <td>${event.category}</td>
      <td>$ ${event.revenue.toLocaleString()}</td>
      <td>${event.percentage}%</td>
    </tr>
  `
  );
  element.innerHTML = table2.join("");
}
