/**
 * Created by 9i on 2016/12/11.
 */
"use strict"
const moment = require('moment');

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
    type: Schema.Types.ObjectId,
    ref: 'HenType'
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
    type: Schema.Types.ObjectId,
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
  /*批次雏蛋鸡总价*/
  totalPrice:{
    type:Number,
    required:true
  },
  /*批次疫损数*/
  lossAmount:{
    type:Number,
    required:true
  },
  /*淘汰鸡总数*/
  sellAmount:{
    type:Number
  },
  /*淘汰鸡总价格*/
  sellPrice:{
    type:Number,
  },
  /*淘汰鸡总价格*/
  sellTotalPrice:{
    type:Number,
  },
  /*淘汰鸡总重量*/
  sellTotalWeight:{
    type:Number,
  },
  //创建人
  createdBy: {
    type: String,
    required: true,
    ref: 'User'
  }
});

henInfoSchema.virtual('createdDay').get(function () {
  return moment(this.createTime).format('YYYY-MM-DD');
});

henInfoSchema.virtual('finishDay').get(function () {
  return this.finishTime?moment(this.finishTime).format('YYYY-MM-DD'):'';
});

henInfoSchema.set('toJSON', { virtuals: true })

henInfoSchema.set('toObject', { virtuals: true })

const henInfo =  mongoose.model('henInfo', henInfoSchema);
module.exports = henInfo;
