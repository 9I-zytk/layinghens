/**
 * Created by 9i on 2017/1/18.
 * @tableName supplier
 * @
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const supplierSchema=new Schema({
  /*供货商ID*/
  OriginId:String,
  /*供应商名称*/
  Origin:
    {
      type:String,
      required:true
    },
  /*联系人*/
  Contacts:String,
  /*联系电话*/
  phone:String,
  /*联系地址*/
  Address:String,
  /*性质 0 - 供应商 1- 收购商*/
  nature:Number,
  /*供应商类型*/
  tag:String,
  /*备注字段*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const supplierModel =  mongoose.model('supplier', supplierSchema);

export default supplierModel;
