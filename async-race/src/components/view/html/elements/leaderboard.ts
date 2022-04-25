class HTMLElementsLeaderboard {
  popup = (inner: string): string => {
    return `<div class="popup" hidden>${inner}</div>`;
  };

  popupCloseWrap = (): string => {
    return `<label for="leaderboard" class="popup-close-wrap"></label>`;
  };

  popupWrap = (inner: string): string => {
    return `<div class="popup-wrap">${inner}</div>`;
  };

  leaderboard = (inner: string): string => {
    return `<div class="leaderboard">${inner}</div>`;
  };

  close = (): string => {
    return `<label for="leaderboard" class="close">╳</label>`;
  };

  leaderboardHeader = (inner: string): string => {
    return `<h2 class="leaderboard-header">Leaderboard (${inner})</h2>`;
  };

  leadersCount = (): string => {
    return `<span class="leaders-count">?</span>`;
  };

  table = (inner: string): string => {
    return `<div class="table">${inner}</div>`;
  };

  th = (inner: string): string => {
    return `<div class="th">${inner}</div>`;
  };

  lbNum = (): string => {
    return `<div class="lb-num">#</div>`;
  };

  lbCar = (): string => {
    return `<div class="lb-car">Car</div>`;
  };

  lbModel = (): string => {
    return `<div class="lb-model">Model</div>`;
  };

  lbWins = (inner: string): string => {
    return `<div class="lb-wins">Wins${inner}</div>`;
  };

  sortASCWins = (): string => {
    return `<button class="sort" data-sort="wins" data-order="ASC">↑</button>`;
  };

  sortDESCWins = (): string => {
    return `<button class="sort" data-sort="wins" data-order="DESC">↓</button>`;
  };

  lbBest = (inner: string): string => {
    return `<div class="lb-best">Best time (s)${inner}</div>`;
  };

  sortASCBest = (): string => {
    return `<button class="sort" data-sort="time" data-order="ASC">↑</button>`;
  };

  sortDESCBest = (): string => {
    return `<button class="sort" data-sort="time" data-order="DESC">↓</button>`;
  };

  lbItems = (): string => {
    return `<div class="lb-items"></div>`;
  };

  tr = (inner: string): string => {
    return `<div class="tr">${inner}</div>`;
  };

  carNum = (id: number): string => {
    return `<div class="car-num">${id}</div>`;
  };

  carImage = (inner: string): string => {
    return `<div class="car-image">${inner}</div>`;
  };

  car = (color: string): string => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 23" height="21" fill="${color}" class="car"><path d="M47,17.4V5.6C47,2.5,43.5,0,40.4,0L5.6,0C2.5,0,0,2.5,0,5.6v11.8C0,20.5,2.5,23,5.6,23h34.8C43.6,23,47,20.5,47,17.4z"/><g fill="#DFFDFF"><polygon points="32.8,22 21.2,22 20.8,19.3 25.6,19.3 "/><path d="M36.3,20.6c-3.9-1-8.5-2.2-8.5-2.2V4.6l8.5-2.2C36.3,2.4,39.3,11.3,36.3,20.6z"/><polygon points="25.3,3.7 20.8,3.7 21.2,1 32.5,1"/><polygon points="9.1,1 19.5,1 19.1,3.7 10.9,3.7"/><polygon points="6.1,2.6 9.5,4.8 9.5,18.6 6.2,20.8 "/><polygon points="11.2,19.3 19.1,19.3 19.5,22 9.4,22.1 "/></g></svg>`;
  };

  carModel = (name: string): string => {
    return `<div class="car-model" title="${name}">${name}</div>`;
  };

  carWins = (wins: number): string => {
    return `<div class="car-wins">${wins}</div>`;
  };

  carBest = (time: number): string => {
    return `<div class="car-best">${time}</div>`;
  };

  lbControls = (inner: string): string => {
    return `<div class="lb-controls">${inner}</div>`;
  };

  prevLb = (): string => {
    return `<button class="prev-lb">❰</button>`;
  };

  nextLb = (): string => {
    return `<button class="next-lb">❱</button>`;
  };

  lbCounter = (inner: string): string => {
    return `<div class="lb-counter">${inner}</div>`;
  };

  lbCur = (): string => {
    return `<span class="lb-cur">1</span>`;
  };

  lbTot = (): string => {
    return `<span class="lb-tot">?</span>`;
  };
}

export default HTMLElementsLeaderboard;
