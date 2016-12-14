/**
 * Created by 9i on 2016/12/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const henInfoSchema=new Schema({
  /* 批次名称
   *---自动生成,非空
   * */
  batchName:{
    type:String,
    required:true
  },
  /* 类型 蛋鸡类型*/
  type:{
    id: Schema.Types.ObjectId,
    ref: 'henType'
  },
  /*批次开始时间*/
  createTime: {
    type: Date,
    default: Date.now
  },
  /*批次完结时间*/
  finishTime: {
    type: Date
  },
  /*批次所处阶段
  * 育雏,开产,淘汰*/
  stage: {
    id: Schema.Types.ObjectId,
    ref: 'stage'
  },
  /*批次雏鸡总数*/
  total:{
    type:Number,
    required:true
  },
  /*批次雏蛋鸡总数*/
  henAmount:{
    type:Number,
    required:true
  },
});
henInfoSchema.path('createTime').get(function (d) {
  return new Date(d).format('yyyy-MM-dd hh:mm:ss');
});
henInfoSchema.path('finishTime').get(function (d) {
  return new Date(d).format('yyyy-MM-dd hh:mm:ss');
});
const henInfo =  mongoose.model('henInfo', henInfoSchema);
module.exports = henInfo;
