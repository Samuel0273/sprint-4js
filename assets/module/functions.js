//create home event
function datos(event) {
  return `<div class="card bg-primary" style="width: 18rem">
          <img src="${event.image}" class="card-img-top" alt="${event.name}" />
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}
            </p>
            <p>Price: ${event.price}</p>
            <a href="./assets/html/Details.html?id=${event._id}" class="btn btn-primary">More Info</a>
          </div>
        </div>`;
}
export function cargarDatos(events) {
  let card = document.getElementById("cards-box");
  let template = "";
  for (let event of events) {
    template += datos(event);
  }
  //console.log(template);
  card.innerHTML = template;
}
//create upcoming event
function datos2(event) {
  return `<div class="card bg-primary" style="width: 18rem">
          <img src="${event.image}" class="card-img-top" alt="${event.name}" />
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}
            </p>
            <p>Price: ${event.price}</p>
            <a href="./Details.html?id=${event._id}" class="btn btn-primary">More Info</a>
          </div>
        </div>`;
}
export function cargarDatos2(events) {
  let card = document.getElementById("cards-box");
  let template = "";
  for (let event of events) {
    if (event.date > "2023-03-10") {
      template += datos2(event);
    }
  }
  card.innerHTML = template;
}
//create past event
function datos3(event) {
  return `<div class="card bg-primary" style="width: 18rem">
          <img src="${event.image}" class="card-img-top" alt="${event.name}" />
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}
            </p>
            <p>Price: ${event.price}</p>
            <a href="./Details.html?id=${event._id}" class="btn btn-primary">More Info</a>
          </div>
        </div>`;
}
export function cargarDatos3(events) {
  let card = document.getElementById("cards-box");
  let template = "";
  for (let event of events) {
    if (event.date < "2023-03-10") {
      template += datos3(event);
    }
  }
  card.innerHTML = template;
}
//create check-box
let categoryRepeat = [];
function category(event) {
  if (categoryRepeat.includes(event.category)) {
    return "";
  }
  categoryRepeat.push(event.category);
  return `<label for="${event.category}">${event.category}</label>
  <input type="checkbox" name="category" id="${event.category}" value="${event.category}" />`;
}
export function cargarCategory(events) {
  let check = document.getElementById("check-box");
  let template2 = "";
  for (let event of events) {
    template2 += category(event);
  }
  //console.log(template2);
  check.innerHTML += template2;
}
//checked-event
export function filterForCheck(events) {
  const checkedCheckboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checked) => checked.value);

  if (checkedCheckboxes.length === 0) {
    return events;
  } else {
    const categoryFilter = events.filter((event) =>
      checkedCheckboxes.includes(event.category)
    );
    return categoryFilter;
  }
}
//search-event
function searchVacio() {
  return `<p>No events found</p>`;
}
export function filterSearch(events) {
  let noSearch = document.getElementById("noSearch");
  const searchString = searchInput.value.toLowerCase();
  const filteredEvents = events.filter((event) => {
    const eventName = event.name.toLowerCase();
    return eventName.includes(searchString);
  });
  if (filteredEvents.length === 0) {
    noSearch.innerHTML = searchVacio();
  } else if (searchString !== "") {
    noSearch.innerHTML = "";
  }
  return filteredEvents;
}
