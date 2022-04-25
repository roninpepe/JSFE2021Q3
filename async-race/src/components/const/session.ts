import { Order, Sort } from '../types/async-race';
import Settings from './settings';

const settings: Settings = new Settings();

class Session {
  garagePage: number = settings.DEFAULT_INIT_VALUE;

  currentGarage: number[] = [];

  garageMaxPage: number = settings.DEFAULT_INIT_VALUE;

  leaderboardPage: number = settings.DEFAULT_INIT_VALUE;

  leaderboardMaxPage: number = settings.DEFAULT_INIT_VALUE;

  sort: Sort = settings.DEFAULT_SORT;

  order: Order = settings.DEFAULT_ORDER;
}

export default Session;
