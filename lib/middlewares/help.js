const _ = require('underscore');

module.exports = api =>  async (ctx, next) => {
	if(process.env.NODE_ENV !== 'production') {
		const help = api.stack.filter(layer => layer.methods.length > 0).map(layer => {
			const schemaValidator = _(layer.stack).find({name:'schemaValidator'}) || {};
			return {
				path : layer.path,
				methods: layer.methods, 
				params: schemaValidator.params,
				body:schemaValidator.body
			};
		})
		api.get('/', ctx => ctx.body = help);
	}
	
	await next();
} 