import Settings from '../../const/settings';
import carModels from '../../data/cars';
import { Car, ContentType, Garage, GarageData, Headers, Method, Status } from '../../types/async-race';
import { getRandomNum } from '../../utils/utils';
import Templates from '../tmp/templates';

const tmp: Templates = new Templates();
const settings: Settings = new Settings();

class APIGarage {
  res: string = tmp.res.garage;

  getAll = async (page: number, limit: number = settings.DEFAULT_GARAGE_ITEMS_PER_PAGE): Promise<GarageData> => {
    const response: Response = await fetch(`${this.res}?${tmp.page(limit, page)}`);
    return {
      garage: await response.json(),
      total: parseInt(<string>response.headers.get(Headers.TOTAL_COUNT), 10),
    };
  };

  get = async (id: number): Promise<Car> => {
    return (await fetch(`${this.res}/${id}`)).json();
  };

  status = async (id: number): Promise<Status> => {
    return (await fetch(`${this.res}/${id}`)).status;
  };

  delete = async (id: number): Promise<void> => {
    await fetch(`${this.res}/${id}`, { method: Method.DELETE });
    if ((await fetch(`${tmp.res.winners}/${id}`)).status !== Status.NOT_FOUND) {
      await fetch(`${tmp.res.winners}/${id}`, { method: Method.DELETE });
    }
  };

  create = async (body: Car): Promise<Car> => {
    return (
      await fetch(`${this.res}`, {
        method: Method.POST,
        body: JSON.stringify(body),
        headers: { [Headers.CONTENT_TYPE]: ContentType.JSON },
      })
    ).json();
  };

  update = async (id: number, body: Car): Promise<Car> => {
    return (
      await fetch(`${this.res}/${id}`, {
        method: Method.PUT,
        body: JSON.stringify(body),
        headers: { [Headers.CONTENT_TYPE]: ContentType.JSON },
      })
    ).json();
  };

  generate = async (n: number = settings.DEFAULT_INIT_VALUE): Promise<Garage> => {
    const result: Garage = await Promise.all(
      new Array(n).fill(undefined).map(async () => {
        const car: Car = await this.create({
          name: carModels[getRandomNum(carModels.length)],
          color: `rgb(${getRandomNum(settings.MAX_RGB_CHANNEL_VALUE)},${getRandomNum(
            settings.MAX_RGB_CHANNEL_VALUE
          )},${getRandomNum(settings.MAX_RGB_CHANNEL_VALUE)})`,
        });
        return car;
      })
    );
    return result;
  };
}

export default APIGarage;
