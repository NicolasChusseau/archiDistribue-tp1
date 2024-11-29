export interface List {
    id: string;
    name: string
    items?: Item[]
}

export interface Item {
    id: string;
    name: string;
    status: "todo" | "done"
}

