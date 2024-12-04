import { FastifyReply, FastifyRequest } from "fastify";
import { Item, List, User } from "../interfaces";

interface AssignItemParams {
    id: string;
}

interface AssignItemBody {
    itemId: string;
    listId: string;
}

export const listUsers = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const userIter = this.level.usersdb.iterator();
    const users: User[] = [];

    for await (const [, value] of userIter) {
        users.push(JSON.parse(value) as User);
    }

    const listIter = this.level.listsdb.iterator();
    const lists: List[] = [];
    for await (const [, value] of listIter) {
        lists.push(JSON.parse(value) as List);
    }

    const enrichedUsers = users.map((user) => {
        const userItems = lists.flatMap((list) =>
            list.items?.filter(
                (item) =>
                    item.assignedTo &&
                    item.assignedTo.some((assignedUser) => assignedUser.id === user.id)
            ).map((item) => ({
                id: item.id,
                name: item.name,
                status: item.status
            })) || []
        );
        return { id: user.id, name: user.name, items: userItems };
    });

    reply.send(enrichedUsers);
};

export const getUser = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const userParam = request.params as { id: string };
    const user = JSON.parse(await this.level.usersdb.get(userParam.id)) as User;

    if (!user) {
        reply.status(404).send({ message: "User not found" });
        return;
    }

    const listIter = this.level.listsdb.iterator();
    const lists: List[] = [];
    for await (const [, value] of listIter) {
        lists.push(JSON.parse(value) as List);
    }

    const userItems = lists.flatMap((list) =>
        list.items?.filter(
            (item) =>
                item.assignedTo &&
                item.assignedTo.some((assignedUser) => assignedUser.id === user.id)
        ).map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status
        })) || []
    );

    reply.send({ id: user.id, name: user.name, items: userItems });
};

export const createUser = async function (request: FastifyRequest, reply: FastifyReply) {
    const newUser: User = request.body as User;

    try {
        await this.level.usersdb.put(newUser.id, JSON.stringify(newUser));
        reply.send(newUser);
    } catch (error) {
        reply.status(500).send({ message: "Failed to create user" });
    }
};

export const updateUser = async function (request: FastifyRequest, reply: FastifyReply) {
    const userParam = request.params as { id: string };
    const updatedUser = request.body as User;

    try {
        updatedUser.id = userParam.id;
        await this.level.usersdb.put(userParam.id, JSON.stringify(updatedUser));
        reply.send(updatedUser);
    } catch (error) {
        reply.status(404).send({ message: "User not found" });
    }
};

export const deleteUser = async function (request: FastifyRequest, reply: FastifyReply) {
    const userParam = request.params as { id: string };

    try {
        await this.level.usersdb.del(userParam.id);
        reply.send({ message: "User deleted" });
    } catch (error) {
        reply.status(404).send({ message: "User not found" });
    }
};

export const assignItemToUser = async function (
    request: FastifyRequest<{ Params: AssignItemParams; Body: AssignItemBody }>,
    reply: FastifyReply
) {
    const userId = request.params.id;
    const { itemId, listId } = request.body;

    const user = JSON.parse(await this.level.usersdb.get(userId)) as User;
    if (!user) {
        return reply.status(404).send({ message: "User not found" });
    }

    const list = JSON.parse(await this.level.listsdb.get(listId)) as List;
    if (!list || !list.items) {
        return reply.status(404).send({ message: "List or items not found" });
    }

    const itemIndex = list.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
        return reply.status(404).send({ message: "Item not found" });
    }

    const item = list.items[itemIndex];

    if (!item.assignedTo) {
        item.assignedTo = [];
    }

    if (!item.assignedTo.some((assignedUser) => assignedUser.id === user.id)) {
        item.assignedTo.push(user);
    }

    list.items[itemIndex] = item;
    await this.level.listsdb.put(listId, JSON.stringify(list));

    const itemResponse = {
        id: item.id,
        name: item.name,
        status: item.status,
    };

    reply.send({ message: "User assigned to item", item: itemResponse });
};
