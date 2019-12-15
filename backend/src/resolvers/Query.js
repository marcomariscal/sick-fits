const { forwardTo } = require("prisma-binding");

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
	}
};

module.exports = Query;
