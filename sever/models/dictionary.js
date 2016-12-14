/**
 * Created by 9i on 2016/12/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const henTypeSchema=new Schema({
  typeId:Number,
  typeName:String
});
const stageSchema=new Schema({
  stageId:Number,
  stageName:String
});

const henTypeModel =  mongoose.model('henType', henTypeSchema);
const stageModel =  mongoose.model('stage', stageSchema);

const henTypeArray=[{
  typeId:1,
  typeName:'洋鸡'
},
{
  typeId:2,
  typeName:'土鸡'
}];
const stageArray=[{
  typeId:1,
  typeName:'育雏'
},
  {
    typeId:2,
    typeName:'开产'
  },
  {
    typeId:3,
    typeName:'淘汰'
  }];

const henType = new henTypeModel(henTypeArray);
const stage = new stageModel(stageArray);

module.exports.stage = stage;
module.exports.henType = henType;
