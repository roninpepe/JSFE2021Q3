import { NewsData } from '../view/appView';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data?: NewsData) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: NewsData) => void): void {
        const selector = <HTMLSelectElement>e.currentTarget;
        const newsContainer = <Element>selector[selector.selectedIndex];
        const sourceId = newsContainer.getAttribute('data-source-id');
        super.getResp(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            callback
        );

        return;
    }
}

export default AppController;
