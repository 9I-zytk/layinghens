/**
 * Created by 9i
 * @Date 2017/3/30
 * @GitHub git@github.com:9I-zytk/layinghens.git
 * 走蛋记录---记录鸡蛋每次售出交易-
 */
'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const eggSaleSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*走蛋件数*/
  quantity:Number,
  /*走蛋日期*/
  date: String,
  /*重量*/
  weight:String,
  /*总金额*/
  amount:Number,
  /*单价*/
  price:Number,
  /*计价方式 0--论斤 1--计件*/
  pricingMethod:String,
  /*备注*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const eggSaleModel =  mongoose.model('eggSale', eggSaleSchema);

export default eggSaleModel;
