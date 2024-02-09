const accesKey = "8bf5e204c2a024aeef79b46cca481f05";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const imgContainer = document.querySelector(".img-container");
const searchButton = document.getElementById("search-button"); // Hämta sökknappen

let inputData = "";

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${accesKey}&text=${inputData}&page=${page}&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const results = data.photos.photo;

  results.map((result) => {
    const imageUrl = `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`;
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("img-card");
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = result.alt_description;

    const imageId = result.id;
    const ownerId = result.owner;
    const imageLink = document.createElement("a");
    imageLink.href = `https://www.flickr.com/photos/${ownerId}/${imageId}`;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    imgContainer.appendChild(imageWrapper);
  });

  page++;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

searchButton.addEventListener("click", () => {
  page = 1;
  searchImages();
});
