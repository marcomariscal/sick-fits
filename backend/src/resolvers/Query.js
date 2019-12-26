const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
	items: forwardTo("db"),
	item: forwardTo("db"),
	itemsConnection: forwardTo("db"),
	me(parent, args, ctx, info) {
		// check if there is a current userId
		if (!ctx.request.userId) {
			// we want null here because we still want to return the query, even if there is no use logged in
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	},

	async users(parent, args, ctx, info) {
		// 1. check if they are logged in
		if (!ctx.request.userId) {
			throw new Error("You must be logged in!");
		}
		// 2. check if the user has permission to  query all users
		hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
		// 3. if they do have permission, then query all the users
		return ctx.db.query.users({}, info);
	}
};

module.exports = Query;
