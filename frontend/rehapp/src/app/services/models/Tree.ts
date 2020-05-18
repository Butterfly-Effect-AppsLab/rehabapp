interface Property {
    id: string;
    name: string;
}

export interface Tree {
    'areas': object;
    'self-diagnose': object; 
}

export interface Area extends Property {
    options: Array<Option>;
}

export interface Diagnose extends Property {
    text: string;
}

export interface Question extends Property {
    color: {
        'background-color': string,
        'text-color': string
    };
    options: Array<Option>;
    prepend: string,
    text: string
}

export interface Option {
    id: number;
    label: string;
    ref: string;
}
