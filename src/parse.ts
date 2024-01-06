import * as cheerio from 'cheerio';
import { Annotation, Item } from './types';

export function parse(htmlString: string) {
    const $ = cheerio.load(htmlString);

    const items: Item[] = [];

    $('#kp-notebook-library > div').each((index, item) => {
        const title = $(item).find('h2').text();
        const author = $(item).find('p').text();
        items.push({ title, author });
    });

    return items;
}

export function parseAnnotations(htmlString: string) {
    const $ = cheerio.load(htmlString);

    const annotations: Annotation[] = [];

    $('#kp-notebook-annotations > div').each((index, item) => {
        const header = $(item).find('#annotationHighlightHeader').text();
        const highlight = $(item).find('#highlight').text();
        annotations.push({ header, highlight });
    });

    return annotations;
}
