import '../../../../css/nouislider.css';
import '../../../../css/style.css';
import { app } from '../../../..';
import loadImages from '../../../loader/image-loader';
import { selfAssessment } from '../../../utils/utils';

class GlobalController {
  draw(): void {
    const song: HTMLAudioElement = new Audio(),
      playSong = (): void => {
        if (app.lsi.ls.settings.audio && song.paused) song.play();
        if (!app.lsi.ls.settings.audio && !song.paused) song.pause();
      };
    loadImages;
    song.src = './assets/audio/audio.mp3';
    selfAssessment();
    globalThis.addEventListener('beforeunload', app.lsi.save);
    globalThis.addEventListener('click', playSong);
  }
}

const globalController = new GlobalController();

export default globalController;
