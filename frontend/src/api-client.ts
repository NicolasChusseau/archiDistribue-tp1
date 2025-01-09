import { TodoList, Item } from './api-types'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000';

export const apiClient = {
    getLists: async (): Promise<TodoList[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lists`);
            console.debug('-- getLists', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch lists', error);
            throw error;
        }
    },

    addList: async (list: { id: string, name: string, status: 'todo' | 'done' }): Promise<TodoList[]> => {
        try {
            await axios.post(`${API_BASE_URL}/lists`, list);
            const updatedLists = await apiClient.getLists();
            console.debug('-- addList', list, updatedLists);
            return updatedLists;
        } catch (error) {
            console.error('Failed to add list', error);
            throw error;
        }
    },

    updateListStatus: async (listId: string, status: 'todo' | 'done'): Promise<TodoList> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/lists/${listId}`, { status });
            console.debug('-- updateListStatus', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to update list status', error);
            throw error;
        }
    },

    deleteList: async (listId: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/lists/${listId}`);
            console.debug('-- deleteList', listId);
        } catch (error) {
            console.error('Failed to delete list', error);
            throw error;
        }
    },

    getTodos: async (listId: string): Promise<Item[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lists/${listId}`);
            console.debug('-- getTodos', response.data.items);
            return response.data.items || [];
        } catch (error) {
            console.error('Failed to fetch todos', error);
            throw error;
        }
    },

    addTodo: async (listId: string, todo: { id: string, name: string, status: 'todo' | 'done' }): Promise<Item[]> => {
        try {
            await axios.post(`${API_BASE_URL}/lists/${listId}/items`, todo);
            const updatedTodos = await apiClient.getTodos(listId);
            console.debug('-- addTodo', todo, updatedTodos);
            return updatedTodos;
        } catch (error) {
            console.error('Failed to add todo', error);
            throw error;
        }
    },

    updateItemStatus: async (listId: string, itemId: string, status: 'todo' | 'done'): Promise<Item[]> => {
        try {
            await axios.put(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, { status });
            return await apiClient.getTodos(listId);
        } catch (error) {
            console.error('Failed to update item status', error);
            throw error;
        }
    },

    deleteTodo: async (listId: string, itemId: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/lists/${listId}/items/${itemId}`);
            console.debug('-- deleteTodo', itemId);
        } catch (error) {
            console.error('Failed to delete todo', error);
            throw error;
        }
    },
};
