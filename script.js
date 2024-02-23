const rickyUrl = "https://rickandmortyapi.com/api/character/";
const cardsContainer = document.querySelector(".cards-container");
const paginationUp = document.querySelector(".right-page");
const paginationDown = document.querySelector(".left-page");
const aliveFilter = document.querySelector("#alive-radio");
const deadFilter = document.querySelector("#dead-radio");
const unknownFilter = document.querySelector("#unknown-radio");
const nameFilterInput = document.querySelector("#name-filter");
let page = 1;
let allCharacters = [];

async function fetchAndDisplayData(filter = "") {
  const response = await fetch(`${rickyUrl}?page=${page}&${filter}`);
  const data = await response.json();
  allCharacters = data.results;
  displayCharacters(allCharacters);
}

async function rickyApi() {
  await fetchAndDisplayData();
}

paginationUp.addEventListener("click", () => {
  if (page >= 1) {
    page += 1;
    fetchAndDisplayData(getSelectedFilter());
  }
});

paginationDown.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    fetchAndDisplayData(getSelectedFilter());
  }
});

aliveFilter.addEventListener("change", () => {
  page = 1;
  fetchAndDisplayData(getSelectedFilter());
});

deadFilter.addEventListener("change", () => {
  page = 1;
  fetchAndDisplayData(getSelectedFilter());
});

unknownFilter.addEventListener("change", () => {
  page = 1;
  fetchAndDisplayData(getSelectedFilter());
});

nameFilterInput.addEventListener("input", () => {
  const filterValue = nameFilterInput.value.trim().toLowerCase();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(filterValue)
  );
  displayCharacters(filteredCharacters);
});

const displayCharacters = (characters) => {
  cardsContainer.innerHTML = "";
  characters.forEach((character) => {
    createCard(
      character.image,
      character.name,
      character.status,
      character.species
    );
  });
};

const getSelectedFilter = () => {
  if (aliveFilter.checked) return "status=alive";
  if (deadFilter.checked) return "status=dead";
  if (unknownFilter.checked) return "status=unknown";
  return "";
};

const createCard = (img, name, status, origin) => {
  const card = document.createElement("div");
  card.className = "card";
  const imgOfCard = document.createElement("img");
  imgOfCard.src = img;
  const nameOfCard = document.createElement("h5");
  nameOfCard.innerHTML = name;
  const statusOfCard = document.createElement("span");
  statusOfCard.innerHTML = `Status: ${status}`;
  statusOfCard.className = "status";
  const originOfCard = document.createElement("span");
  originOfCard.innerHTML = `Origin: ${origin}`;
  cardsContainer.appendChild(card);
  card.appendChild(imgOfCard);
  card.appendChild(nameOfCard);
  card.appendChild(statusOfCard);
  card.appendChild(originOfCard);
};

rickyApi();
