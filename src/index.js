// DOM CONTENT
const dogImageContainer = document.querySelector("#dog-image-container")
const dropdownSelector = document.querySelector("#breed-dropdown")
const dogBreedUl = document.querySelector("#dog-breeds")
const dogBreeds = []

// EVENT LISTENERS
dropdownSelector.addEventListener("change", event => {
    const selectedLetter = event.target.value
    clearBreedsList()
    sortBreeds(selectedLetter)
})

// EVENT HANDLERS
function loadImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(dogs => {
            displayDogs(dogs.message)
        }
    )
}

function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            const breeds = data.message
            console.log("data: ", data)
            console.log("data.message: ", data.message)
            for (const key in breeds) {
                dogBreeds.push(key)
            }
            dogBreeds.forEach(breed => displayBreed(breed))
        }
    )
}

function clearBreedsList() {
    dogBreedUl.innerHTML = ""
    // const listItems = document.querySelectorAll("#dog-breeds li")
    // listItems.forEach (li => li.remove())
}

function sortBreeds(character) {
    const sortedBreeds = dogBreeds.filter((breed) => breed.startsWith(character))
    //forEach iteration
    sortedBreeds.forEach(breed => {
        displayBreed(breed)
    })
    // for..of loop iteration
    // for (const breed of sortedBreeds) {
    //     displayBreed(breed)
    // }
}

function displayDogs(dogImages) {
    for (const dogUrl of dogImages) {
        const img = document.createElement("img")
        img.src = dogUrl
        dogImageContainer.append(img)
    }
}

function displayBreed(breed) {
    const li = document.createElement("li")
    li.textContent = breed
    dogBreedUl.append(li)
    li.addEventListener("click", () => li.style.color = "red")
}

loadImages()
loadBreeds()