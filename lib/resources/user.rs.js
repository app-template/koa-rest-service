const router = require('koa-router')();

const {setNoEmpty} = require('../common/util');
const validate = require('../middlewares/validator');
const UserService = require('../services/user.svc');
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
    
    api.use('/users', router.routes(), router.allowedMethods());
}