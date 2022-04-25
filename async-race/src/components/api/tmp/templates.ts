import { EngineStatus, Order, Sort } from '../../types/async-race';
import Resources from './resources';

class Templates {
  res: Resources = new Resources();

  sort = (value: Sort): string => {
    return `_sort=${value}`;
  };

  order = (value: Order): string => {
    return `_order=${value}`;
  };

  page = (limit: number, index: number): string => {
    return `_limit=${limit}&_page=${index}`;
  };

  status = (status: EngineStatus): string => {
    return `status=${status}`;
  };

  id = (id: number): string => {
    return `id=${id}`;
  };
}

export default Templates;
