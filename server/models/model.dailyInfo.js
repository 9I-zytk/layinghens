/**
 * Created by 9i on 2017/1/22.
 * dailyInfo 日产量跟踪
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const dailyInfoSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*鸡蛋数*/
  eggs:Number,
  /*日期*/
  date:String,
  /*备注字段*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const dailyInfoModel =  mongoose.model('dailyInfo', dailyInfoSchema);

export default dailyInfoModel;
