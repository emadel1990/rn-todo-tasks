import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values';

const schema = defineSchema({
	todos: defineTable({
		text: v.string(),
		isCompleted: v.boolean(),
		from: v.optional(v.string()),
		to: v.optional(v.string()),
	}),
});

export default schema;
