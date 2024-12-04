import { FastifyInstance } from "fastify";
import * as UserController from "../../controllers/users.controller";
import {userSchema, createUserSchema, itemSchema, updateUserSchema} from "../../schemas/users.schema";

async function users(fastify: FastifyInstance) {
    fastify.get("/", {
        schema: {
            tags: ['users'],
            response: {
                200: {
                    type: "array",
                    items: userSchema,
                },
            },
        },
    }, UserController.listUsers);

    fastify.get("/:id", {
        schema: {
            tags: ['users'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            response: {
                200: userSchema,
                404: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, UserController.getUser);

    fastify.post("/", {
        schema: {
            tags: ['users'],
            body: createUserSchema,
            response: {
                201: userSchema,
            },
        },
    }, UserController.createUser);

    fastify.put("/:id", {
        schema: {
            tags: ['users'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            body: updateUserSchema,
            response: {
                200: userSchema,
                404: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, UserController.updateUser);

    fastify.delete("/:id", {
        schema: {
            tags: ['users'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
                404: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, UserController.deleteUser);

    fastify.post("/:id/items", {
        schema: {
            tags: ['users'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            body: {
                type: "object",
                properties: {
                    itemId: { type: "string" },
                    listId: { type: "string" },
                },
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        item: itemSchema,
                    },
                },
                404: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, UserController.assignItemToUser);
}

export default users;
