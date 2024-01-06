export interface Item {
    title: string;
    author: string;
}

export interface Annotation {
    header: string;
    highlight: string;
}

export interface AnnotatedItem extends Item {
    annotations: Annotation[];
}
