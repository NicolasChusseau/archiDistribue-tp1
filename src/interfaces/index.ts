export interface List {
    id: string;
    name: string
    items?: Item[]
    status: ListStatus;
}

type ListStatus = "todo" | "done";

type ItemStatus = "todo" | "done";

export interface User {
    id: string;
    name: string;
    items?: Item[];
}

export interface Item {
    assignedTo?: User[];
    id: string;
    name: string;
    status: ItemStatus;
}

