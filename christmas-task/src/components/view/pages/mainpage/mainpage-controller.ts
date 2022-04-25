import { app } from '../../../..';
import $ from '../../../utils/utils';

export function updateFavCounter() {
  $('.header__fav-count').innerHTML = app.lsi.ls.toys.length.toString();
}
