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
  quantity:String,
  /*重量*/
  weight:String,
  /*单价*/
  price:String,
  /*总金额*/
  amount:String,
  /*交易日期*/
  saleDate:String,
  /*供货商*/
  Origin:{
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
});

const fullPriceFeedModel =  mongoose.model('fullPriceFeed', fullPriceFeedSchema);

export default fullPriceFeedModel;