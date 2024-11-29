import {Item, List} from "../interfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import * as repl from "node:repl";

const staticLists: List[] = [
    {id: "1", name: "List1"},
    {id: "2", name: "List2"},
    {id: "3", name: "List3"}
]

export const listLists = async function (
    request: FastifyRequest,
    reply: FastifyReply
){
    console.log("DB status : ", this.level.listsdb.status)
    const listIter = this.level.listsdb.iterator();

    const result: List[] = [];
    for await (const [key, value] of listIter) {
        result.push(JSON.parse(value) as List);
    }
    reply.send(result);
};

export const createList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const newList: List = request.body as List;
    await this.level.listsdb.put(newList.id, JSON.stringify(newList));
    reply.send(newList);
}

export const updateList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    const updatedList = request.body as List;
    updatedList.id = listParam.id;
    await this.level.listsdb.put(listParam.id, JSON.stringify(updatedList));
    reply.send(updatedList);
}

export const deleteList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    await this.level.listsdb.del(listParam.id);
    reply.send({message: "List deleted"});
}

export const createItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    const newItem = request.body as Item;
    const list = await this.level.listsdb.get(listParam.id) as List;
    if (!list.items) {
        list.items = [];
    }
    list.items.push(newItem);
    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send(newItem);
}


