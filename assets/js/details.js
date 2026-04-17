const urlFetch = "https://striveschool-api.herokuapp.com/api/product/"
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGNlMzczOWY4NzAwMTU3YWIwN2QiLCJpYXQiOjE3NzY0MDk4MjcsImV4cCI6MTc3NzYxOTQyN30.GH1pMlCDPYkmPttQXXEGCLk7QmREprdwgxy5pPkaVKg"

const urlParameters = new URLSearchParams(location.search)
const gameID = urlParameters.get("id")
const detailsCard = document.getElementById("main-content")

fetch(urlFetch + gameID, {
  headers: {
    authorization: authKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error((response) => {
        console.log(response.status)
      })
    }
  })
  .then((data) => {
    detailsCard.innerHTML = `<div class="col-6 my-3">
            <div class="card border-0 rounded-0 shadow-lg">
              <img src="${data.imageUrl}" class="card-img-top rounded-0" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${data.brand}</h6>
                <p class="card-text">
                ${data.description}
                </p>
                <div class="btn-group bg-dark d-flex justify-content-between align-content-center p-1">
                <span class="d-flex align-items-center">
                <h6 class="m-2 me-3 card-subtitle text-white fw-light">${data.price}€</h6>
                </span>
                <a href="./backoffice.html?id=${data._id}" class="btn btn-success">Modifica</a>
                </div>
              </div>
            </div>
          </div>`
  })
  .catch((err) => console.log(err))
