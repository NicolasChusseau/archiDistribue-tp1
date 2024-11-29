export interface List {
    id: string;
    name: string
    items?: Item[]
}

type ItemStatus = "todo" | "done";

export interface Item {
    id: string;
    name: string;
    status: ItemStatus;
}

