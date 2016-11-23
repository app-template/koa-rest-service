const Koa = require('koa');
const app = module.exports = new Koa();
const timeout = require('koa-timeout-v2');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const xTime = require('koa-xtime');

const id = require('./lib/middlewares/state-id');
const appLogger = require('./lib/middlewares/app-logger');
const accLogger = require('./lib/middlewares/acc-logger');
const error = require('./lib/middlewares/error');
const etag = require('./lib/middlewares/etag');

const Router = require('koa-router');
const api = Router({prefix: '/api'});
require('./lib/resources/user-rs')(api);

app.proxy = true;
app.use(helmet());
app.use(etag());
app.use(accLogger());
app.use(id());
app.use(appLogger());
app.use(error());
app.use(xTime());
app.use(bodyParser());
app.use(compress());
app.use(timeout(500));
app.use(api.routes());
app.on('error', err => global.logger.error(err));

if (require.main === module ) {
    app.listen(process.env.PORT || 3000);    
}




