import HTMLElementsControls from './controls';
import HTMLElementsGarage from './garage';
import HTMLElementsLeaderboard from './leaderboard';

class HTMLElements {
  controls: HTMLElementsControls = new HTMLElementsControls();

  garage: HTMLElementsGarage = new HTMLElementsGarage();

  leaderboard: HTMLElementsLeaderboard = new HTMLElementsLeaderboard();
}

export default HTMLElements;
