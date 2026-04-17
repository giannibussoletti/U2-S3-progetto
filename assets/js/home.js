const urlFetch = "https://striveschool-api.herokuapp.com/api/product/"
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGNlMzczOWY4NzAwMTU3YWIwN2QiLCJpYXQiOjE3NzY0MDk4MjcsImV4cCI6MTc3NzYxOTQyN30.GH1pMlCDPYkmPttQXXEGCLk7QmREprdwgxy5pPkaVKg"

fetch(urlFetch, {
  headers: {
    authorization: authKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      document.querySelector(".spinner-div").classList.add("d-none")

      return response.json()
    } else {
      throw new Error((response) => {
        console.log(response.status)
      })
    }
  })
  .then((data) =>
    data.forEach((element, i) => {
      const container = document.getElementById("main-content")
      container.innerHTML += `
        <div class="col my-3">
            <div class="card h-100 border-0 rounded-0 shadow-lg">
              <a href="./details.html?id=${data[i]._id}"><img src="${data[i].imageUrl}" class="card-img-top rounded-0" alt="${data[i].name}-cover" /></a>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${data[i].brand}</h6>
                <p class="card-text flex-grow-1">
                ${data[i].description}
                </p>
                <div class="btn-group bg-dark d-flex justify-content-between align-content-center p-1">
                <span class="d-flex align-items-center">
                <h6 class="m-2 me-3 card-subtitle text-white fw-light">${data[i].price}€</h6>
                </span>
                <a href="./details.html?id=${data[i]._id}" class="btn btn-success w-50">Dettagli</a>
                <a href="./backoffice.html?id=${data[i]._id}" class="btn btn-secondary">Modifica</a>
                </div>
              </div>
            </div>
          </div>`
    }),
  )
  .catch((err) => console.log(err))
