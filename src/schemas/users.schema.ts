import { Type } from '@sinclair/typebox';

export const userSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    items: Type.Optional(Type.Array(
        Type.Object({
            id: Type.String(),
            name: Type.String(),
            status: Type.String(),
        })
    )),
});

export const createUserSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
});

export const updateUserSchema = Type.Object({
    name: Type.String(),
});

export const itemSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
});
