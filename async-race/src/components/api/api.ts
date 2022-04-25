import APIEngine from './resources/engine';
import APIGarage from './resources/garage';
import APIWinners from './resources/winners';

class API {
  garage: APIGarage = new APIGarage();

  engine: APIEngine = new APIEngine();

  winners: APIWinners = new APIWinners();
}

export default API;
