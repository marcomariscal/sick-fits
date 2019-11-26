const Mutations = {
	async createItem(parent, args, ctx, info) {
		// todo: check if they are logged in
		// access the db with ctx.db
		const item = ctx.db.mutation.createItem(
			{
				data: {
					...args
				}
			},
			info
		);

		return item;
	},
	updateItem(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		// remove the id from the update, since we don't want to update/edit the id
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},

	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		const item = await ctx.db.query.item({ where }, `{id title}`);
		// find the item
		// check if they own the item/have permissions
		//TODO
		// delete item
		return ctx.db.mutation.deleteItem({ where }, info);
	}
};

module.exports = Mutations;
