
export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export interface Option {
    label: string;
    ref: string;
}