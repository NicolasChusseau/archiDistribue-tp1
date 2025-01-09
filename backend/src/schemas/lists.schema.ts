import { Type } from '@sinclair/typebox';

const StatusEnum = Type.Enum({
    todo: 'todo',
    done: 'done'
}, { description: "Status" });

export const itemSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: StatusEnum,
    assignedTo: Type.Array(
        Type.Object({
            id: Type.String(),
            name: Type.String(),
        })
    ),
});

export const listSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    items: Type.Optional(Type.Array(itemSchema)),
    status: StatusEnum,
});

export const createListSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
});

export const updateListSchema = Type.Object({
    list: Type.Optional(listSchema),
});

export const createItemSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
});

export const updateItemSchema = Type.Object({
    item: Type.Optional(itemSchema),
});
