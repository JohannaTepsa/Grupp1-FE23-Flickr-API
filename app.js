const accesKey = "8bf5e204c2a024aeef79b46cca481f05";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input"); // Hämta sök ruta
const imgContainer = document.querySelector(".img-container");
const searchButton = document.getElementById("search-button"); // Hämta sökknappen
const showMoreButton = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;
let imageCount = 0;

//searchImages funkar som en main function.
async function searchImages() {
  inputData = inputElement.value;

  //Skapar en url variabel där vi har lagt till accesKey, inputData och page som queryParam. Lagt även till att jag endast vill ha 12 bilder i taget(per_page)
  const url = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${accesKey}&text=${inputData}&page=${page}&per_page=12&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();

  //variabeln results blir själva bilden. (Hämtad från json)
  const results = data.photos.photo;

  // Här skapar vi imageElement och skapar en funktion till den med hjälp av map för att lägga till saker.
  const imageElements = results.map((result) => {
    const imageUrl = `https://live.staticflickr.com/${result.farm}/${result.server}/${result.id}_${result.secret}_z.jpg`; //imageUrl innehåller server, id och secret enl. json fil.

    //Vi skapar en ny variabel som heter imageWrapper för att läga till en html div (img-card)
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("img-card");

    //Variabeln image skapar vi för att skapa ett nytt element där den nya bilden baserat på det vi söker skall ersättas.
    const image = document.createElement("img");
    image.src = imageUrl;

    //skapar en länk under bilden.
    const titleParagraph = document.createElement("p"); //Öppnar en ny p-tagg för att lägga till ankaretagg
    const titleLink = document.createElement("a");
    titleLink.href = `https://www.flickr.com/photos/${result.owner}/${result.id}`;
    titleLink.target = "_blank";
    titleLink.textContent = " Go to image link";
    titleParagraph.appendChild(titleLink);
    titleLink.style.textDecoration = "none";

    imageWrapper.appendChild(image); //Här pushar vi upp med hjälp av appendChild.
    imageWrapper.appendChild(titleParagraph); //Här pushar vi upp med hjälp av appendChild.

    return imageWrapper;
  });

  imageElements.forEach((imageElements) => {
    imgContainer.appendChild(imageElements); //  // Lägg till alla bild-element i imgContainer med for each och en "callback".
    imageCount++;
    showMoreButton.style.display = "block"; //Visar knappen efter sökning
  });

  showMoreButton.addEventListener("click", () => {
    searchImages(); // vid klick så anropar vi search funktionen.
  });
} /*************************************Här tar search funktionen slut.**************************************** */

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  imageCount = 0; // Återställer räknaren till för visade bilder. Url:en är inställd på att det ska finnas 12 bilder vid varje sökning.
  //Vill vi att show more knappen skall ladda upp 12 bilder till måste vi därför få den att börja räkna om.
  imgContainer.innerHTML = "";
  searchImages();
  showMoreButton.style.display = "none";
});

searchButton.addEventListener("click", () => {
  imageCount = 0; // Återställer räknaren till för visade bilder
  imgContainer.innerHTML = "";
  page = 1;
  imageElements();
});

//Jens lightbox.*****************************************************************************************'
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

function createLightbox(imageSrc) {
  const img = document.createElement("img");
  img.src = imageSrc;
  lightbox.appendChild(img);
  lightbox.classList.add("active");
}

// Funktion för att visa lightboxen när musen sveper över bilden
function showLightbox(event) {
  if (event.target.tagName === "IMG") {
    createLightbox(event.target.src);
    event.preventDefault();
  }
}

// Funktion för att dölja lightboxen när användaren klickar utanför den
function hideLightbox(event) {
  if (event.target.id === "lightbox") {
    lightbox.classList.remove("active");
    lightbox.innerHTML = "";
  }
}

// Lägger till händelselyssnare för att visa lightboxen när en bild klickas
imgContainer.addEventListener("click", showLightbox);

// Lägger till händelselyssnare för att dölja lightboxen när användaren klickar utanför den
lightbox.addEventListener("click", hideLightbox);
