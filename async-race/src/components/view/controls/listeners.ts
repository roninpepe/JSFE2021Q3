import Handlers from './handlers';

const handlers: Handlers = new Handlers();

class Listeners {
  init = () => {
    globalThis.addEventListener('load', handlers.initPage);
    document.addEventListener('click', handlers.createCar);
    document.addEventListener('click', handlers.generateCars);
    document.addEventListener('click', handlers.nextGarage);
    document.addEventListener('click', handlers.prevGarage);
    document.addEventListener('click', handlers.deleteCar);
    document.addEventListener('click', handlers.updateCar);
    document.addEventListener('click', handlers.driveCar);
    document.addEventListener('click', handlers.stopCar);
    document.addEventListener('click', handlers.startRace);
    document.addEventListener('click', handlers.resetRace);
    document.addEventListener('click', handlers.sortLeaderboard);
    document.addEventListener('click', handlers.nextLeaderboard);
    document.addEventListener('click', handlers.prevLeaderboard);
  };
}

export default Listeners;
