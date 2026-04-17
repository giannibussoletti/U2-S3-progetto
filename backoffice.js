const urlFetch = "https://striveschool-api.herokuapp.com/api/product/"
const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGNlMzczOWY4NzAwMTU3YWIwN2QiLCJpYXQiOjE3NzY0MDk4MjcsImV4cCI6MTc3NzYxOTQyN30.GH1pMlCDPYkmPttQXXEGCLk7QmREprdwgxy5pPkaVKg"

const urlParameters = new URLSearchParams(location.search)
const gameID = urlParameters.get("id")

const deleteFunc = function (idIdentifier) {
  fetch(urlFetch + idIdentifier, {
    method: "DELETE",
    headers: {
      authorization: authKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(idIdentifier)
        return
      } else {
        throw new Error(() => response.status)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

class GameObject {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

/* #region   */
const gameName = document.getElementById("name")
const gameDescription = document.getElementById("description")
const gameBrand = document.getElementById("brand")
const gameImageUrl = document.getElementById("imageUrl")
const gamePrice = document.getElementById("price")
const buttonInvia = document.getElementById("invia-form")
const buttonCancella = document.getElementById("cancella-gioco")
const buttonReset = document.getElementById("cancella-database")
const form = document.querySelector("form")
/* #endregion */

// Se il link ha un id vengono recuperati i dati del gioco per modificarlo
if (gameID) {
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
        throw new Error(() => response.status)
      }
    })
    .then((data) => {
      gameName.value = data.name
      gameDescription.value = data.description
      gameBrand.value = data.brand
      gameImageUrl.value = data.imageUrl
      gamePrice.value = data.price
    })
    .catch((err) => {
      console.log(err)
    })
}

// Modifica o Inserimento di nuovo Gioco
buttonInvia.addEventListener("click", function (e) {
  e.preventDefault()
  const newGame = new GameObject(
    gameName.value,
    gameDescription.value,
    gameBrand.value,
    gameImageUrl.value,
    gamePrice.value,
  )
  let urlChoice
  if (gameID) {
    urlChoice = urlFetch + gameID
  } else {
    urlChoice = urlFetch
  }

  fetch(urlChoice, {
    method: gameID ? "PUT" : "POST",
    body: JSON.stringify(newGame),
    headers: {
      authorization: authKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Gioco Salvato!")
      } else {
        throw new Error((response) => {
          console.log(response.status)
        })
      }
    })

    .catch((err) => console.log(err))
  form.reset()
})

buttonCancella.addEventListener("click", function (e) {
  e.preventDefault()
  deleteFunc(gameID)
  alert("Gioco cancellato")
  form.reset()
})

buttonReset.addEventListener("click", function (e) {
  e.preventDefault()

  fetch(urlFetch, {
    headers: {
      authorization: authKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error((response) => console.log(response.status))
      }
    })
    .then((data) =>
      data.forEach((id) => {
        deleteFunc(id._id)
      }),
    )

    .catch((err) => console.log(err))
  form.reset()
  alert("DATABASE Svuotato")
})
