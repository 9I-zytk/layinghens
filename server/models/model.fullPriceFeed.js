/**
 * Created by 9i on 2017/1/22.
 * fullPriceFeed 全价料
 * 注意记录全价料采购记录
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const fullPriceFeedSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
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

const fullPriceFeedModel =  mongoose.model('fullPriceFeed', fullPriceFeedSchema);

export default fullPriceFeedModel;
