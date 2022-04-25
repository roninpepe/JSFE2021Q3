import './news.css';

export interface Article {
    urlToImage: string;
    author: string;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

class News {
    draw(data: Array<Article>): void {
        const news = data.length >= 10 ? data.filter((_item: Article, idx: number): boolean => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item: Article, idx: number): void => {
            const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

            newsClone
                .querySelector('.news__meta-photo')
                .setAttribute('style', `background-image: url(${CSS.escape(item.urlToImage || 'favicon.ico')});`);

            newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.source.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
