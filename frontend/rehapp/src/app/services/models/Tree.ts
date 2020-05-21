export interface TreeComponent{
    text: string
}

export interface Area extends TreeComponent{
    tree: string
    area_detail:{
        x: number
        y: number
        width: number
        height: number
    },
    options: Array<Option>
}

export interface Diagnose extends TreeComponent{
    name: string
}

export interface Question extends TreeComponent{
    prepend: string
    style: {
        'background-color': string
        'color': string
    },
    options: Array<Option>
}

export interface Option {
    id: number
    label: string
    ref: string
}
