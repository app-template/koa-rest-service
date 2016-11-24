const router = require('koa-router')();

const UserService = require('../services/user-svc');
const {setNoEmpty} = require('../common/util');
const validate = require('../middlewares/validator');
const schema = require('./user.schm');


module.exports = api => {
    
    router.use(async (ctx, next) => {
        ctx.state.svc = new UserService(ctx.state);
        await next();
    });
    
    router.get('/', async (ctx, next) => {
        UserService.foo(123, 456);
        ctx.state.logger.info('this is resource log');
        ctx.body  = await ctx.state.svc.findAll(); 
    });

    router.post('/', validate(schema.create), async (ctx, next) => {
        const user = await ctx.state.svc.create(ctx.request.body);
        if(user) {
            ctx.status = 201;
            ctx.body = {};
        }
    });
    
    router.get('/:id', async(ctx, next) => {
        ctx.state.logger.info('get by id');
        setNoEmpty(ctx, 'body', await ctx.state.svc.findById(ctx.params.id));
    });
    
    router.put('/:id', validate(schema.update), async(ctx, next) => {
        const user = Object.assign({}, ctx.request.body, {id:ctx.params.id})
        setNoEmpty(ctx, 'body', await ctx.state.svc.update(user));
    });
    
    router.delete('/:id', async(ctx, next) => {
        setNoEmpty(ctx, 'body', await ctx.state.svc.remove(ctx.params.id));
    });
    
    api.use('/users', router.routes(), router.allowedMethods());
}