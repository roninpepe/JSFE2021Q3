import './sources.css';

export interface Source {
    name: string;
    id: string;
}

class Sources {
    draw(data: Array<Source>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item?: Source): void => {
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

            sourceClone.querySelector('.source__item').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
