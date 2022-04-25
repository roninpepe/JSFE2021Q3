import { Drive, Engine, EngineStatus, Method, Status } from '../../types/async-race';
import Templates from '../tmp/templates';

const tmp: Templates = new Templates();

class APIEngine {
  res: string = tmp.res.engine;

  start = async (id: number): Promise<Engine> => {
    return (
      await fetch(`${this.res}?${tmp.id(id)}&${tmp.status(EngineStatus.START)}`, { method: Method.PATCH })
    ).json();
  };

  stop = async (id: number): Promise<Engine> => {
    return (await fetch(`${this.res}?${tmp.id(id)}&${tmp.status(EngineStatus.STOP)}`, { method: Method.PATCH })).json();
  };

  drive = async (id: number): Promise<Drive> => {
    const response = await fetch(`${this.res}?${tmp.id(id)}&${tmp.status(EngineStatus.DRIVE)}`, {
      method: Method.PATCH,
    }).catch();
    if (response.status === Status.OK) {
      return { ...(await response.json()) };
    }
    return { success: false };
  };
}

export default APIEngine;
