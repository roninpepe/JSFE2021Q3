import API from '../../api/api';
import Session from '../../const/session';
import Settings from '../../const/settings';
import { Car, Engine, GarageData, Order, Racer, Sort, Winner, WinnersData } from '../../types/async-race';
import { EventCallback } from '../../types/utils';
import $ from '../../utils/utils';
import HTMLTemplates from '../html/templates/html-templates';

const api: API = new API();
const settings: Settings = new Settings();
const session: Session = new Session();
const templates: HTMLTemplates = new HTMLTemplates();

class Controls {
  loadGarage: EventCallback = async (): Promise<void> => {
    const container: HTMLElement = $('.roads');
    const itemCount: HTMLElement = $('.cars-count');
    const currentPage: HTMLElement = $('.garage-cur');
    const totalPages: HTMLElement = $('.garage-tot');
    const prevPage: HTMLButtonElement = <HTMLButtonElement>$('.prev-garage');
    const nextPage: HTMLButtonElement = <HTMLButtonElement>$('.next-garage');
    const resp: GarageData | void = await api.garage
      .getAll(session.garagePage, settings.GARAGE_ITEMS_PER_PAGE)
      .catch(() => console.log(`Please, run API server on ${settings.SERVER}`));
    if (resp) {
      const { garage: items, total } = resp;
      Promise.all(
        session.currentGarage.map(
          async (id: number): Promise<Engine> => {
            const response: Engine = await api.engine.stop(id);
            return response;
          }
        )
      );
      session.currentGarage = items.map((car: Car): number => <number>car.id);
      session.garageMaxPage = Math.ceil(total / settings.GARAGE_ITEMS_PER_PAGE) || settings.DEFAULT_INIT_VALUE;
      currentPage.innerHTML = `${session.garagePage}`;
      totalPages.innerHTML = `${session.garageMaxPage}`;
      prevPage.disabled = session.garagePage < 2;
      nextPage.disabled = session.garagePage >= session.garageMaxPage;
      itemCount.innerHTML = `${total}`;
      container.innerHTML = '';
      items.forEach((car: Car): void => {
        container.innerHTML += templates.generated.road(<number>car.id, car.name, car.color);
      });
    }
  };

  loadLeaderboard: EventCallback = async (): Promise<void> => {
    const container: HTMLElement = $('.lb-items');
    const itemCount: HTMLElement = $('.leaders-count');
    const currentPage: HTMLElement = $('.lb-cur');
    const totalPages: HTMLElement = $('.lb-tot');
    const prevPage: HTMLButtonElement = <HTMLButtonElement>$('.prev-lb');
    const nextPage: HTMLButtonElement = <HTMLButtonElement>$('.next-lb');
    const resp: WinnersData | void = await api.winners
      .getAll(session.leaderboardPage, session.sort, session.order, settings.WINNERS_ITEMS_PER_PAGE)
      .catch(() => console.log(`Please, run API server on ${settings.SERVER}`));
    if (resp) {
      const { winners: items, total } = resp;
      session.leaderboardMaxPage = Math.ceil(total / settings.WINNERS_ITEMS_PER_PAGE) || settings.DEFAULT_INIT_VALUE;
      currentPage.innerHTML = `${session.leaderboardPage}`;
      totalPages.innerHTML = `${session.leaderboardMaxPage}`;
      prevPage.disabled = session.leaderboardPage < 2;
      nextPage.disabled = session.leaderboardPage >= session.leaderboardMaxPage;
      itemCount.innerHTML = `${total}`;
      container.innerHTML = '';
      items.forEach((winner: Winner): void => {
        container.innerHTML += templates.generated.winner(
          <number>winner.car?.id,
          <string>winner.car?.name,
          <string>winner.car?.color,
          <number>winner.wins,
          winner.time
        );
      });
    }
  };

  initPage: EventCallback = async (e: Event): Promise<void> => {
    document.body.innerHTML += templates.initial.template();
    this.loadGarage(e);
    this.loadLeaderboard(e);
  };

  createCar: EventCallback = async (e: Event): Promise<void> => {
    const name: string = (<HTMLInputElement>$('.name')).value;
    const color: string = (<HTMLInputElement>$('.color')).value;
    await api.garage.create({ name, color });
    this.loadGarage(e);
  };

  generateCars: EventCallback = async (e: Event): Promise<void> => {
    await api.garage.generate(settings.DEFAULT_ITEMS_PER_GENERATION);
    this.loadGarage(e);
  };

  nextGarage: EventCallback = async (e: Event): Promise<void> => {
    session.garagePage += 1;
    this.loadGarage(e);
  };

  prevGarage: EventCallback = async (e: Event): Promise<void> => {
    session.garagePage -= 1;
    this.loadGarage(e);
  };

  deleteCar: EventCallback = async (e: Event): Promise<void> => {
    await api.garage.delete(parseInt(<string>(<HTMLElement>e.target).dataset.id, 10));
    this.loadGarage(e);
  };

  updateCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(<HTMLElement>e.target).dataset.id, 10);
    const name: string = (<HTMLInputElement>$(`.road[data-id='${id}'] .new-car-name`)).value;
    const color: string = (<HTMLInputElement>$(`.road[data-id='${id}'] .car-color`)).value;
    await api.garage.update(id, { name, color });
    this.loadGarage(e);
    this.loadLeaderboard(e);
  };

  driveCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(<HTMLElement>e.target).dataset.id, 10);
    const car: HTMLElement = $(`.road[data-id='${id}'] .car`);
    const { velocity, distance } = await api.engine.start(id);
    const time: number = parseFloat(
      (distance / velocity / settings.ANIMATION_DURATION_COEFFICIENT).toFixed(settings.RACE_TIME_ORDER)
    );
    (<HTMLButtonElement>e.target).disabled = true;
    (<HTMLButtonElement>$(`.stop[data-id='${id}']`)).disabled = false;
    car.style.animationDuration = `${time}s`;
    car.classList.add('drive');
    const { success } = await api.engine.drive(id);
    if (!success) car.classList.add('crash');
  };

  stopCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(<HTMLElement>e.target).dataset.id, 10);
    (<HTMLButtonElement>e.target).disabled = true;
    (<HTMLButtonElement>$(`.start[data-id='${id}']`)).disabled = false;
    $(`.road[data-id='${id}'] .car`).classList.remove('drive', 'crash');
    await api.engine.stop(id);
  };

  getRacersInfo = async (id: number): Promise<Racer> => {
    const { velocity, distance } = await api.engine.start(id);
    return {
      id,
      time: parseFloat(
        (distance / velocity / settings.ANIMATION_DURATION_COEFFICIENT).toFixed(settings.RACE_TIME_ORDER)
      ),
    };
  };

  getRaceWinner = async (car: Racer): Promise<Racer> => {
    const { id, time } = car;
    const carImage: HTMLElement = $(`.road[data-id='${id}'] .car`);
    (<HTMLButtonElement>$(`.start[data-id='${id}']`)).disabled = true;
    (<HTMLButtonElement>$(`.stop[data-id='${id}']`)).disabled = false;
    carImage.classList.add('drive');
    const { success } = await api.engine.drive(id);
    if (!success) {
      carImage.classList.add('crash');
      throw Error(`Car #${id} crashed !!`);
    }
    return { id, time };
  };

  startRace: EventCallback = async (e: Event): Promise<void> => {
    const garage: number[] = session.currentGarage;
    await Promise.all(
      garage.map(
        async (id: number): Promise<Engine> => {
          const response: Engine = await api.engine.stop(id);
          return response;
        }
      )
    );
    document.querySelectorAll('.road').forEach((road: Element): void => {
      (<HTMLButtonElement>$('.start', <HTMLElement>road)).disabled = false;
      (<HTMLButtonElement>$('.stop', <HTMLElement>road)).disabled = true;
      $('.car', <HTMLElement>road).classList.remove('drive', 'crash');
    });
    const cars: Racer[] = await Promise.all(garage.map(this.getRacersInfo));
    cars.forEach((car: Racer): void => {
      const { id, time } = car;
      $(`.road[data-id='${id}'] .car`).style.animationDuration = `${time}s`;
    });
    const winner: Racer | void = await Promise.any(cars.map(this.getRaceWinner)).catch(() => {
      console.log('All cars crashed. ._.');
    });
    if (typeof winner === 'object') {
      const { id, time } = winner;
      const { name } = await api.garage.get(id);
      $('.last-winner').innerHTML = `Last winner: ${name} (${time}s)`;
      await api.winners.save(id, time);
      this.loadLeaderboard(e);
    }
  };

  resetRace: EventCallback = async (): Promise<void> => {
    await Promise.all(
      session.currentGarage.map(
        async (id: number): Promise<Engine> => {
          const response: Engine = await api.engine.stop(id);
          return response;
        }
      )
    );
    document.querySelectorAll('.road').forEach((v: Element): void => {
      (<HTMLButtonElement>$('.stop', <HTMLElement>v)).disabled = true;
      (<HTMLButtonElement>$('.start', <HTMLElement>v)).disabled = false;
      $('.car', <HTMLElement>v).classList.remove('drive', 'crash');
    });
  };

  sortLeaderboard: EventCallback = async (e: Event): Promise<void> => {
    const button: HTMLElement = <HTMLElement>e.target;
    const { sort, order } = button.dataset;
    session.sort = <Sort>sort;
    session.order = <Order>order;
    this.loadLeaderboard(e);
  };

  nextLeaderboard: EventCallback = async (e: Event): Promise<void> => {
    session.leaderboardPage += 1;
    this.loadLeaderboard(e);
  };

  prevLeaderboard: EventCallback = async (e: Event): Promise<void> => {
    session.leaderboardPage -= 1;
    this.loadLeaderboard(e);
  };
}

export default Controls;
