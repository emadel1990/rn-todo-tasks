import { ConvexError, v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export interface IConvexTodo {
	_id: Id<'todos'>;
	_creationTime: number;
	text: string;
	isCompleted: boolean;
	from?: string;
	to?: string;
}

export const getTodos = query({
	handler: async (ctx): Promise<IConvexTodo[]> => {
		try {
			const todos: IConvexTodo[] | undefined = await ctx.db.query('todos').order('desc').collect();
			return todos;
		} catch (e) {
			console.error('Error fetching todos:', e);
			throw new ConvexError('Failed to fetch todos');
		}
	},
});

export const addTodo = mutation({
	args: { text: v.string(), from: v.optional(v.string()), to: v.optional(v.string()) },
	handler: async (ctx, { text, from, to }) => {
		try {
			const id = await ctx.db.insert('todos', { text, isCompleted: false, from, to });
			return id;
		} catch (e) {
			console.error('Error adding todo:', e);
			throw new ConvexError('Failed to add todo');
		}
	},
});

export const toggleTodo = mutation({
	args: { id: v.id('todos') },
	handler: async (ctx, { id }) => {
		try {
			const todo = await ctx.db.get(id);
			if (!todo) {
				throw new ConvexError('Todo not found');
			}
			await ctx.db.patch(id, { isCompleted: !todo.isCompleted });
		} catch (e) {
			console.error('Error toggling todo:', e);
			throw new ConvexError('Failed to toggle todo');
		}
	},
});

export const deleteTodo = mutation({
	args: { id: v.id('todos') },
	handler: async (ctx, { id }) => {
		try {
			await ctx.db.delete(id);
		} catch (e) {
			console.error('Error deleting todo:', e);
			throw new ConvexError('Failed to delete todo');
		}
	},
});

export const updateTodo = mutation({
	args: { id: v.id('todos'), text: v.string() },
	handler: async (ctx, { id, text }) => {
		try {
			await ctx.db.patch(id, { text });
		} catch (e) {
			console.error('Error updating todo:', e);
			throw new ConvexError('Failed to update todo');
		}
	},
});

export const clearAllTodos = mutation({
	handler: async (ctx) => {
		try {
			const todos = await ctx.db.query('todos').collect();
			const deletePromises = todos.map((todo) => ctx.db.delete(todo._id));
			const res = await Promise.allSettled(deletePromises);
			const deleteCount = res.filter((result) => result.status === 'rejected').length;
			return { total: todos.length, deleted: res.length - deleteCount, failed: deleteCount };
		} catch (e) {
			console.error('Error clearing todos:', e);
			throw new ConvexError('Failed to clear todos');
		}
	},
});
