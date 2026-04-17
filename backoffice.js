fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGNlMzczOWY4NzAwMTU3YWIwN2QiLCJpYXQiOjE3NzY0MDk4MjcsImV4cCI6MTc3NzYxOTQyN30.GH1pMlCDPYkmPttQXXEGCLk7QmREprdwgxy5pPkaVKg",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
      console.log(response)
    } else {
      throw new Error((response) => {
        console.log(response.status)
      })
    }
  })
  .then((data) => {
    console.log()
  })
  .catch((err) => console.log(err))

// "name":
// "description":
// "brand":
// "imageUrl":
// "price":
