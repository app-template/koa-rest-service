const Validator = require('jsonschema').Validator;
const V = new Validator();

const validate = module.exports = options => {
    async function schemaValidator (ctx, next){
        if(options.params) {
            const errors = V.validate(ctx.params, options.params).errors;
            if(errors.length > 0) {
                ctx.throw(400, errors);
            }
        }

        if(options.body) {

            const errors = V.validate(ctx.request.body, options.body).errors;
            if(errors.length > 0) {
                ctx.throw(400, errors);
            }
        }
        await next();
    };
    schemaValidator.params = options.params;
    schemaValidator.body = options.body;
    return schemaValidator;
};