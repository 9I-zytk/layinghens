/**
 * Created by 9i on 2017/1/22.
 * mixedFeed 混合料
 * 记录砂石 玉米 预混料，豆柏采购记录
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mixedFeedSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*0-砂石 1-玉米 2-豆柏 3-预混料*/
  typeId:{
    type:Number,
    required:true
  },
  typeName:{
    type:String,
    required:true
  },
  /*数量*/
  quantity:Number,
  /*重量*/
  weight:Number,
  /*单价*/
  price:Number,
  /*总金额*/
  amount:Number,
  /*交易日期*/
  saleDate:String,
  /*供货商*/
  Origin:{
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
  /*备注字段*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const mixedFeedModel =  mongoose.model('mixedFeed', mixedFeedSchema);

export default mixedFeedModel;
