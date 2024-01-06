import * as fs from 'fs/promises';
import { AnnotatedItem } from './types';
import config from './config';

function createMarkdownFromItem(annotatedItem: AnnotatedItem) {
    const { title, author, annotations } = annotatedItem;
    let markdownContent = `# ${title}\n\nAuthor: ${author}`;

    for (const annotation of annotations) {
        const { header, highlight } = annotation;
        if (!highlight || highlight === '') continue;
        markdownContent = `${markdownContent}\n\n**${header}**\n\n${highlight}`;
    }

    return markdownContent;
}

export async function outputMarkdown(annotatedItem: AnnotatedItem): Promise<void> {
    const markdownContent = createMarkdownFromItem(annotatedItem);

    const [shortHandTitle] = annotatedItem.title.split(':');
    const fileName = `${shortHandTitle}.md`;

    await fs.writeFile(`${config.outputFolderPath}/${fileName}`, markdownContent);
    console.log(`markdown file "${fileName}" generated successfully.`);
}

export async function makeOutputDirectory(): Promise<void> {
    const { outputFolderPath: outputPath } = config;
    try {
        await fs.access(outputPath);
    } catch (error) {
        // Directory doesn't exist, create it
        await fs.mkdir(outputPath, { recursive: true });
        console.log(`directory "${outputPath}" created successfully.`);
    }
}
