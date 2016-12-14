/**
 * Created by 9i on 2016/12/10.
 */
"use strict";
const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot,'../'),
  staticDir = path.join(root, 'static'),
  dev = require('./dev.js'),
  fs = require('fs'),
  _ = require('lodash');
//默认生产环境
let config = {
  app: {
    name:'layingHens',
    port: 8001,
    apiPath: '/api' // 后台路径
  },
  debug:false,
  env:'production',
  mongoConfig: { // 数据库配置
    url: 'mongodb://localhost:27017/layingHens',
    opts:{
      user:'',
      pass:''
    }
  },
  'jwt': {
    'cert': 'layingHens'
  },
  dir: { // 目录配置
    root,
    log: path.join(__dirname,'..', 'logs'),
    server:serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource')
  }
};
//本地调试环境
if(process.env.NODE_ENV === 'development'){
  config = _.merge(config,dev);
}
//生产环境配置
if(process.env.NODE_ENV === 'production'){
  if(fs.existsSync(__dirname+'/production.js')){
    config = _.merge(config,require('./production.js'));
  }
}

module.exports = config;
