import News, { Article } from './news/news';
import Sources, { Source } from './sources/sources';

export interface NewsData {
    articles: Array<Article>;
    sources: Array<Source>;
}

class AppView {
    news: News = new News();
    sources: Sources = new Sources();

    drawNews<T extends NewsData>(data: T): void {
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources<T extends NewsData>(data: T): void {
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
