import AppController from '../controller/controller';
import AppView, { NewsData } from '../view/appView';

class App {
    controller: AppController = new AppController();
    view: AppView = new AppView();

    start(): void {
        document
            .querySelector('.sources')
            .addEventListener('change', (e: Event): void =>
                this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data))
            );
        this.controller.getSources((data: NewsData): void => this.view.drawSources(data));
    }
}

export default App;
