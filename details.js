const urlFetch = "https://striveschool-api.herokuapp.com/api/product/"
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGNlMzczOWY4NzAwMTU3YWIwN2QiLCJpYXQiOjE3NzY0MDk4MjcsImV4cCI6MTc3NzYxOTQyN30.GH1pMlCDPYkmPttQXXEGCLk7QmREprdwgxy5pPkaVKg"

const urlParameters = new URLSearchParams(location.search)
const gameID = urlParameters.get("id")

const gameImageUrl = document.querySelector("#main-content img") // thumbnail
const gameName = document.querySelector("#main-content .card-title") // nome gioco
const gameBrand = document.querySelectorAll("#main-content .card-subtitle")[0] //brand
const gamePrice = document.querySelectorAll("#main-content .card-subtitle")[1] //prezzo
const gameDescription = document.querySelector("#main-content .card-text") //descrizione
const button = document.querySelector("#main-content button")

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
    console.log(data)
    gameImageUrl.setAttribute("src", data.imageUrl)
    gameName.innerText = data.name
    gameBrand.innerText = data.brand
    gamePrice.innerText = data.price + "€"
    gamePrice.style.fontWeight = "bold"
    gameDescription.innerText = data.description

    button.addEventListener("click", function () {
      window.location.replace(`./backoffice.html?id=${data._id}`)
    })
  })
  .catch((err) => console.log(err))
