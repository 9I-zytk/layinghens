/**
 * Created by 9i on 2016/12/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const henTypeSchema=new Schema({
  typeId:Number,
  typeName:String,
  /*供货商*/
  Origin:String,
  /*联系电话*/
  phone:String,
  /*联系人*/
  Contacts:String
});
const stageSchema=new Schema({
  stageId:Number,
  stageName:String
});

const henTypeModel =  mongoose.model('HenType', henTypeSchema);
const stageModel =  mongoose.model('stage', stageSchema);

const model={};
model.stage = stageModel;
model.henType = henTypeModel;
module.exports = model;

