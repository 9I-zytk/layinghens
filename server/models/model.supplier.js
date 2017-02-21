/**
 * Created by 9i on 2017/1/18.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const supplierSchema=new Schema({
  type:{
    type:String,
    required:true
  },
  typeName:{
    type:String,
    required:true
  },
  /*性质 0 - 供应商 1- 收购商*/
  nature:String,
  /* 类型 蛋鸡类型*/
  henType:{
    type: Schema.Types.ObjectId,
    ref: 'HenType'
  },
  /*供货商*/
  Origin:String,
  /*联系人*/
  Contacts:String,
  /*联系电话*/
  phone:String,
  /*联系地址*/
  Address:String
});

const supplierModel =  mongoose.model('supplier', supplierSchema);

export default supplierModel;
