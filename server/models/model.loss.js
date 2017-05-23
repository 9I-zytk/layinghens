/**
 * Created by 9i
 * @Date 2017/3/30
 * @GitHub git@github.com:9I-zytk/layinghens.git
 * 疫损--记录蛋鸡 病死,热死等其他死因
 */
'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const lossSchema=new Schema({
  /*所属批次*/
  batchName:{
    type: Schema.Types.ObjectId,
    ref: 'henInfo',
    required:true
  },
  /*疫损*/
  quantity:Number,
  /*日期*/
  date: String,
  /*原因*/
  reason:String,
  /*备注字段*/
  Remark:String,
  /*冗余字段*/
  Redundancy:String
});

const lossModel =  mongoose.model('loss', lossSchema);

export default lossModel;



