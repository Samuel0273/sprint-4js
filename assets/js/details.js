const box = document.getElementById("details-box");

const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    cardEvents = data.events;
    const idEncontrado = data.events.find((event) => event._id == id);
    box.innerHTML = `<div class="card mb-3 bg-primary" style="max-width: 840px">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="${idEncontrado.image}"
                class="detail img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${idEncontrado.name}</h5>
                <p class="card-text">${idEncontrado.date}</p>
                <p class="card-text">
                  Enjoy your favorite dishes from different countries in a
                  unique event for the whole family.
                </p>
                <p class="card-text">Category: ${idEncontrado.category}</p>
                <p class="card-text">Place: ${idEncontrado.place}</p>
                <p class="card-text">Capacity: ${idEncontrado.capacity}</p>
                <p class="card-text">Price: ${idEncontrado.price}</p>
              </div>
            </div>
          </div>
        </div>`;
  })
  .catch((err) => console.log(err));
