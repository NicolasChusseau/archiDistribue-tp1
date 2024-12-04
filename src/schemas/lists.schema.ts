import { Type } from '@sinclair/typebox';

export const itemSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
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
    status: Type.String(),
});

export const createListSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
});

export const updateListSchema = Type.Object({
    list: Type.Partial(listSchema),
});

export const createItemSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
});

export const updateItemSchema = Type.Object({
    item: Type.Partial(itemSchema),
});
