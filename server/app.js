/**
 * Created by 9i on 2016/12/15.
 */
"use strict";
const config = require('./configs/default');

const path = require('path'),
  co = require('co'),
  Koa = require('koa');
const app =new Koa(),
  convert=require('koa-convert'),
  bodyParser = require('koa-bodyparser'),
  cors = require('koa-cors'),
  router = require('koa-router')({
    prefix:config.app.apiPath
  }),
  onerror = require('koa-onerror'),
  mongoose = require('mongoose'),
  controllers = require('./controllers/index.js'),
  utils =require('./utils/index.js');
co(function*() {
  mongoose.connect(config.mongoConfig.url,config.mongoConfig.opts);
  /**
   * 将config注入中间件的ctx
   * */
  app.context.config = config;

  app.use(convert(cors({
    maxAge: 7 * 24 * 60 * 60,
    // 7 days 预请求头有效期
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
  })))

  /**
   * error信息优化
   * */
  onerror(app);
  app.on('error',(err,ctx)=>{
    if((ctx.status === 404 && err.status === undefined) || err.status === 500){
      utils.logger.error('server error', err);
      utils.logger.error(ctx);
    }
    utils.print(err);
  })

  app.use(convert(bodyParser()));
  yield controllers.init(router);
  app.use(convert(router.routes()));

  app.listen(config.app.port, ()=>{
    console.log('app is listening on port '+config.app.port);
    utils.print('app is listening on port '+config.app.port);
  })
}).catch(function(err) {
  utils.print(err.stack);
});
