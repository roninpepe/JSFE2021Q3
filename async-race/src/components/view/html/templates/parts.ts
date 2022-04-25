import HTMLElements from '../elements/html-elements';

const elements: HTMLElements = new HTMLElements();

class HTMLTemplatesParts {
  pageControls = (): string => {
    return `${elements.controls.leaderboard()}`;
  };

  create = (): string => {
    return elements.garage.create(`${elements.garage.name()}${elements.garage.color()}${elements.garage.createCar()}`);
  };

  raceAll = (): string => {
    return elements.garage.raceAll(
      `${elements.garage.startRace()}${elements.garage.resetRace()}${elements.garage.generateCars()}`
    );
  };

  controls = (): string => {
    return elements.garage.controls(`${this.create()}${this.raceAll()}`);
  };

  header = (): string => {
    return elements.garage.header(`${this.controls()}${elements.garage.leaderboardButton()}`);
  };

  garageTitle = (): string => {
    return elements.garage.garageTitle(`${elements.garage.carsCount()}`);
  };

  garageCounter = (): string => {
    return elements.garage.garageCounter(`${elements.garage.garageCur()} / ${elements.garage.garageTot()}`);
  };

  garageControls = (): string => {
    return elements.garage.garageControls(
      `${elements.garage.prevGarage()}${this.garageCounter()}${elements.garage.nextGarage()}`
    );
  };

  garageInfo = (): string => {
    return elements.garage.garageInfo(`${this.garageTitle()}${this.garageControls()}`);
  };

  race = (): string => {
    return elements.garage.race(`${elements.garage.finish()}${elements.garage.roads()}${elements.garage.garage()}`);
  };

  grass = (): string => {
    return elements.garage.grass(`${this.garageInfo()}${this.race()}${elements.garage.lastWinner()}`);
  };

  leaderboardHeader = (): string => {
    return elements.leaderboard.leaderboardHeader(`${elements.leaderboard.leadersCount()}`);
  };

  lbWins = (): string => {
    return elements.leaderboard.lbWins(`${elements.leaderboard.sortDESCWins()}${elements.leaderboard.sortASCWins()}`);
  };

  lbBest = (): string => {
    return elements.leaderboard.lbBest(`${elements.leaderboard.sortDESCBest()}${elements.leaderboard.sortASCBest()}`);
  };

  th = (): string => {
    return elements.leaderboard.th(
      `${elements.leaderboard.lbNum()}${elements.leaderboard.lbCar()}${elements.leaderboard.lbModel()}${this.lbWins()}${this.lbBest()}`
    );
  };

  table = (): string => {
    return elements.leaderboard.table(`${this.th()}${elements.leaderboard.lbItems()}`);
  };

  lbCounter = (): string => {
    return elements.leaderboard.lbCounter(`${elements.leaderboard.lbCur()} / ${elements.leaderboard.lbTot()}`);
  };

  lbControls = (): string => {
    return elements.leaderboard.lbControls(
      `${elements.leaderboard.prevLb()}${this.lbCounter()}${elements.leaderboard.nextLb()}`
    );
  };

  leaderboard = (): string => {
    return elements.leaderboard.leaderboard(
      `${elements.leaderboard.close()}${this.leaderboardHeader()}${this.table()}${this.lbControls()}`
    );
  };

  popupWrap = (): string => {
    return elements.leaderboard.popupWrap(this.leaderboard());
  };

  popup = (): string => {
    return elements.leaderboard.popup(`${elements.leaderboard.popupCloseWrap()}${this.popupWrap()}`);
  };

  raceButtons = (id: number): string => {
    return elements.garage.raceButtons(
      id,
      `${elements.garage.raceButtonStart(id)}${elements.garage.raceButtonStop(id)}`
    );
  };

  carData = (id: number, name: string): string => {
    return elements.garage.carData(
      `${elements.garage.i()}${elements.garage.deletaCar(id)}${elements.garage.carName(name)}`
    );
  };

  editCar = (id: number): string => {
    return elements.garage.editCar(
      `${elements.garage.newCarName()}${elements.garage.carColor()}${elements.garage.updateCar(id)}`
    );
  };

  info = (id: number, name: string): string => {
    return elements.garage.info(`${this.carData(id, name)}${this.editCar(id)}`);
  };

  roadWrap = (id: number, name: string, color: string): string => {
    return elements.garage.roadWrap(`${this.info(id, name)}${elements.garage.car(color)}`);
  };

  road = (id: number, name: string, color: string): string => {
    return elements.garage.road(id, `${this.raceButtons(id)}${this.roadWrap(id, name, color)}`);
  };

  carImage = (color: string): string => {
    return elements.leaderboard.carImage(elements.leaderboard.car(color));
  };

  tr = (id: number, name: string, color: string, wins: number, time: number): string => {
    return elements.leaderboard.tr(
      `${elements.leaderboard.carNum(id)}${this.carImage(color)}${elements.leaderboard.carModel(
        name
      )}${elements.leaderboard.carWins(wins)}${elements.leaderboard.carBest(time)}`
    );
  };
}

export default HTMLTemplatesParts;
