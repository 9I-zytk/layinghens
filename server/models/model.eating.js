/**
 * Created by 9i
 * @Date 2017/3/30
 * @GitHub git@github.com:9I-zytk/layinghens.git
 * 进食管理--- 记录
 */
'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const eatingSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*日期*/
  date: String,
  /*进食量*/
  weight:Number,
  /*备注字段*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const eatingModel =  mongoose.model('eating', eatingSchema);

export default eatingModel;
