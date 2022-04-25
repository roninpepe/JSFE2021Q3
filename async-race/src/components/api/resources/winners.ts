import Settings from '../../const/settings';
import {
  ContentType,
  Headers,
  Method,
  Order,
  Sort,
  Status,
  Winner,
  Winners,
  WinnersData,
} from '../../types/async-race';
import Templates from '../tmp/templates';

const tmp: Templates = new Templates();
const settings: Settings = new Settings();

class APIWinners {
  res: string = tmp.res.winners;

  getAll = async (
    page: number,
    sort: Sort = settings.DEFAULT_SORT,
    order: Order = settings.DEFAULT_ORDER,
    limit: number = settings.DEFAULT_WINNERS_ITEMS_PER_PAGE
  ): Promise<WinnersData> => {
    const response: Response = await fetch(
      `${this.res}?${tmp.page(limit, page)}&${tmp.sort(sort)}&${tmp.order(order)}`
    );
    const winners: Winners = await response.json();
    return {
      winners: <Winners>await Promise.all(
        winners.map(async (winner: Winner) => ({
          ...winner,
          car:
            (await fetch(`${tmp.res.garage}/${winner.id}`)).status === Status.NOT_FOUND
              ? { name: settings.DELETED_ITEM_NAME, color: settings.DELETED_ITEM_COLOR }
              : await (await fetch(`${tmp.res.garage}/${winner.id}`)).json(),
        }))
      ),
      total: parseInt(<string>response.headers.get(Headers.TOTAL_COUNT), 10),
    };
  };

  get = async (id: number): Promise<Winner> => {
    return (await fetch(`${this.res}/${id}`)).json();
  };

  status = async (id: number): Promise<Status> => {
    return (await fetch(`${this.res}/${id}`)).status;
  };

  delete = async (id: number): Promise<void> => {
    await fetch(`${this.res}/${id}`, { method: Method.DELETE });
  };

  create = async (body: Winner): Promise<Winner> => {
    return (
      await fetch(`${this.res}`, {
        method: Method.POST,
        body: JSON.stringify(body),
        headers: { [Headers.CONTENT_TYPE]: ContentType.JSON },
      })
    ).json();
  };

  update = async (id: number, body: Winner): Promise<Winner> => {
    return (
      await fetch(`${this.res}/${id}`, {
        method: Method.PUT,
        body: JSON.stringify(body),
        headers: { [Headers.CONTENT_TYPE]: ContentType.JSON },
      })
    ).json();
  };

  save = async (id: number, time: number): Promise<void> => {
    const status: Status = await this.status(id);
    if (status === Status.NOT_FOUND) {
      await this.create({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner: Winner = await this.get(id);
      await this.update(id, {
        id,
        wins: <number>winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };
}

export default APIWinners;
