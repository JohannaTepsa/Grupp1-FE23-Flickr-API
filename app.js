const accesKey = "8bf5e204c2a024aeef79b46cca481f05";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input"); // Hämta sök ruta
const imgContainer = document.querySelector(".img-container");
const searchButton = document.getElementById("search-button"); // Hämta sökknappen

let inputData = "";
let page = 1;

//searchImages funkar som en main function.
async function searchImages() {
  inputData = inputElement.value;

  //Skapar en url variabel där vi har lagt till accesKey, inputData och page som queryParam
  const url = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${accesKey}&text=${inputData}&page=${page}&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  //variabelm results blir själva bilden. (Hämtad från json)
  const results = data.photos.photo;

  // Här skapar vi imageElement och skapar en funktion till den med hjälp av map för att lägga till saker.
  const imageElements = results.map((result) => {
    const imageUrl = `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`; //imageUrl innehåller server, id och secret enl. json fil.

    //Vi skapar en ny variabel som heter imageWrapper för att läga till en html div (img-card)
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("img-card");

    //Vi skapar en imageLink för att vi skall kunna klicka på bilden och den ska ta oss vidare till ägarens sida.
    const imageLink = document.createElement("a");
    imageLink.href = `https://www.flickr.com/photos/${result.owner}/${result.id}`; //här hämtar vi ägen och dens id för att ta oss till hens sida.
    imageLink.target = "_blank";

    //Variabeln image skapar vi för att skapa ett nytt element där den nya bilden baserat på det vi söker skall ersättas.
    const image = document.createElement("img");
    image.src = imageUrl;

    //Här pushar vi upp med hjälp av appendChild.
    imageLink.appendChild(image);
    imageWrapper.appendChild(imageLink);

    return imageWrapper;
  });

  // Rensa imgContainer innan du lägger till nya bilder
  imgContainer.innerHTML = "";
  // Lägg till alla bild-element i imgContainer med for each och en "callback".
  imageElements.forEach((imageElement) => {
    imgContainer.appendChild(imageElement);
  });
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