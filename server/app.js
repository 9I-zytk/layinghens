/**
 * Created by 9i on 2016/12/15.
 */
"use strict";
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import cors from 'koa-cors'
import session from 'koa-generic-session'
import responseMiddleware from './middlewares/return'

const router = require('koa-router')();
const config = require('./configs/default'),
     logUtil = require('./utils/index.js');

  const app =new Koa()
  mongoose.Promise = global.Promise
  mongoose.connect(config.mongoConfig.url)
  /**
   * 将config注入中间件的ctx
   * */
  app.context.config = config;
  //关键字
  app.keys = ['keys', 'layingHen'];
  // middleware
  app.use(convert(cors()))
     .use(bodyParser())
     .use(convert(logger()))
     // .use(convert(session()))
     .use(responseMiddleware())
  //routes
  const api=require('./controllers/index')
  router.get('/test',function (ctx, next) {
    ctx.body = 'this a test response!';
  });
  router.use('/api',api.routes())
  app.use(router.routes())
     .use(router.allowedMethods());
  // logger
  app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
      //开始进入到下一个中间件
      await next();

      ms = new Date() - start;
      //记录响应日志
      logUtil.logResponse(ctx, ms);

    } catch (error) {

      ms = new Date() - start;
      //记录异常日志
      logUtil.logError(ctx, error, ms);
    }
  });
  //error
  app.on('error',(err,ctx)=>{
    if((ctx.status === 404 && err.status === undefined) || err.status === 500){
      logUtil.logError(ctx, err);
    }
    console.log('error==>',err)
    logUtil.logError(ctx, err);
  })
  app.listen(config.app.port, ()=>{
    console.log('app is listening on port '+config.app.port);
  })
