export interface Question {
    id: number;
    text: string;
    answer: Answer;
}

export interface Answer {
    yes: number;
    no: number;
}