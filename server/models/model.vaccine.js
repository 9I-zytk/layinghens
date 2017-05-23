/**
 * Created by 9i on 2017/1/6.
 * vaccine 疫苗/药物
 * 主要记录疫苗 药物采购记录
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const vaccineSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*疫苗/药物名称*/
  name:{
    type:String,
    required:true
  },
  /*作用*/
  effect:String,
  /*单价*/
  price:Number,
  /*数量*/
  quantity:Number,
  /*总金额*/
  amount:Number,
  /*单位*/
  unit:String,
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

const vaccineModel =  mongoose.model('vaccine', vaccineSchema);

export default vaccineModel;
