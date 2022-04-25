class HTMLElementsGarage {
  header = (inner: string): string => {
    return `<div class="header">${inner}</div>`;
  };

  controls = (inner: string): string => {
    return `<div class="controls">${inner}</div>`;
  };

  create = (inner: string): string => {
    return `<div class="create">${inner}</div>`;
  };

  name = (): string => {
    return `<input type="text" class="name">`;
  };

  color = (): string => {
    return `<input type="color" class="color">`;
  };

  createCar = (): string => {
    return `<button class="create-car">Create</button>`;
  };

  raceAll = (inner: string): string => {
    return `<div class="race-all">${inner}</div>`;
  };

  startRace = (): string => {
    return `<button class="start-race">Race start</button>`;
  };

  resetRace = (): string => {
    return `<button class="reset-race">Reset</button>`;
  };

  generateCars = (): string => {
    return `<button class="generate">Generate cars</button>`;
  };

  leaderboardButton = (): string => {
    return `<label for="leaderboard" title="Leaderboard" class="leaderboard-btn">🏆</button>`;
  };

  grass = (inner: string): string => {
    return `<div class="grass">${inner}</div>`;
  };

  garageInfo = (inner: string): string => {
    return `<div class="garage-info">${inner}</div>`;
  };

  garageTitle = (inner: string): string => {
    return `<h2 class="garage-title">Garage (${inner})</h2>`;
  };

  carsCount = (): string => {
    return `<span class="cars-count">?</span>`;
  };

  garageControls = (inner: string): string => {
    return `<div class="garage-controls">${inner}</div>`;
  };

  prevGarage = (): string => {
    return `<button class="prev-garage">❰</button>`;
  };

  nextGarage = (): string => {
    return `<button class="next-garage">❱</button>`;
  };

  garageCounter = (inner: string): string => {
    return `<div class="garage-counter">${inner}</div>`;
  };

  garageCur = (): string => {
    return `<span class="garage-cur">1</span>`;
  };

  garageTot = (): string => {
    return `<span class="garage-tot">?</span>`;
  };

  race = (inner: string): string => {
    return `<div class="race">${inner}</div>`;
  };

  finish = (): string => {
    return `<div class="finish"></div>`;
  };

  roads = (): string => {
    return `<div class="roads"></div>`;
  };

  road = (num: number, inner: string): string => {
    return `<div class="road" data-id="${num}">${inner}</div>`;
  };

  raceButtons = (id: number, inner: string): string => {
    return `<div class="race-buttons" data-id="${id}">${inner}</div>`;
  };

  raceButtonStart = (id: number): string => {
    return `<button class="start" data-id="${id}"></button>`;
  };

  raceButtonStop = (id: number): string => {
    return `<button class="stop" data-id="${id}" disabled></button>`;
  };

  roadWrap = (inner: string): string => {
    return `<div class="road-wrap">${inner}</div>`;
  };

  info = (inner: string): string => {
    return `<div class="info">${inner}</div>`;
  };

  carData = (inner: string): string => {
    return `<div class="car-data">${inner}</div>`;
  };

  i = (): string => {
    return `<span class="i">i</span>`;
  };

  deletaCar = (id: number): string => {
    return `<button title="Delete" data-id="${id}" class="delete-car">🗑</button>`;
  };

  carName = (name: string): string => {
    return `<span class="car-name">${name}</span>`;
  };

  editCar = (inner: string): string => {
    return `<div class="edit-car">${inner}</div>`;
  };

  newCarName = (): string => {
    return `<input type="text" class="new-car-name">`;
  };

  carColor = (): string => {
    return `<input type="color" class="car-color">`;
  };

  updateCar = (id: number): string => {
    return `<button data-id="${id}" class="update-car">Update</button>`;
  };

  car = (color: string): string => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 23" height="46" fill="${color}" class="car"><path d="M47,17.4V5.6C47,2.5,43.5,0,40.4,0L5.6,0C2.5,0,0,2.5,0,5.6v11.8C0,20.5,2.5,23,5.6,23h34.8C43.6,23,47,20.5,47,17.4z"/><g fill="#DFFDFF"><polygon points="32.8,22 21.2,22 20.8,19.3 25.6,19.3 "/><path d="M36.3,20.6c-3.9-1-8.5-2.2-8.5-2.2V4.6l8.5-2.2C36.3,2.4,39.3,11.3,36.3,20.6z"/><polygon points="25.3,3.7 20.8,3.7 21.2,1 32.5,1"/><polygon points="9.1,1 19.5,1 19.1,3.7 10.9,3.7"/><polygon points="6.1,2.6 9.5,4.8 9.5,18.6 6.2,20.8 "/><polygon points="11.2,19.3 19.1,19.3 19.5,22 9.4,22.1 "/></g></svg>`;
  };

  garage = (): string => {
    return `<div class="garage"></div>`;
  };

  lastWinner = (): string => {
    return `<div class="last-winner"></div>`;
  };
}

export default HTMLElementsGarage;
