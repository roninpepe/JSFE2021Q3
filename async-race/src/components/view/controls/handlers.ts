import { EventHandler } from '../../types/utils';
import { EventCallbackBuilder } from '../../utils/utils';
import Controls from './controls';

const controls: Controls = new Controls();

class Handlers {
  initPage: EventHandler = EventCallbackBuilder(controls.initPage);

  createCar: EventHandler = EventCallbackBuilder(controls.createCar, 'create-car');

  generateCars: EventHandler = EventCallbackBuilder(controls.generateCars, 'generate');

  nextGarage: EventHandler = EventCallbackBuilder(controls.nextGarage, 'next-garage');

  prevGarage: EventHandler = EventCallbackBuilder(controls.prevGarage, 'prev-garage');

  deleteCar: EventHandler = EventCallbackBuilder(controls.deleteCar, 'delete-car');

  updateCar: EventHandler = EventCallbackBuilder(controls.updateCar, 'update-car');

  driveCar: EventHandler = EventCallbackBuilder(controls.driveCar, 'start');

  stopCar: EventHandler = EventCallbackBuilder(controls.stopCar, 'stop');

  startRace: EventHandler = EventCallbackBuilder(controls.startRace, 'start-race');

  resetRace: EventHandler = EventCallbackBuilder(controls.resetRace, 'reset-race');

  sortLeaderboard: EventHandler = EventCallbackBuilder(controls.sortLeaderboard, 'sort');

  nextLeaderboard: EventHandler = EventCallbackBuilder(controls.nextLeaderboard, 'next-lb');

  prevLeaderboard: EventHandler = EventCallbackBuilder(controls.prevLeaderboard, 'prev-lb');
}

export default Handlers;
