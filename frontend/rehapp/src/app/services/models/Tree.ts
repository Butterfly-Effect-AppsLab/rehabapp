export interface TreeComponent {
    type: string
}

export class Area implements TreeComponent {
    name: string
    x: number
    y: number
    width: number
    height: number
    tree: {
        name: string
        text: string
    }
    options: Array<Option>
    type: string
    first: boolean = false
}

export class Diagnose implements TreeComponent {
    id: number
    name: string
    type: string
    definition: string = "Informácie budú doplnené neskôr"
    symptoms: string = "Informácie budú doplnené neskôr"
    cause: string = "Informácie budú doplnené neskôr"
    diagnostic: String = "Informácie budú doplnené neskôr"
    cure: string = "Informácie budú doplnené neskôr"
    prevention: string = "Informácie budú doplnené neskôr"
}

export class Question implements TreeComponent {
    prepend: string
    text: string
    style: {
        'background-color': string
        'color': string
    }
    options: Array<Option>
    type: string
}

export class Option {
    id: number
    label: string
    ref: string 
    text: string
    side: string = null;
} 
