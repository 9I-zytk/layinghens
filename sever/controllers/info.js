/**
 * Created by 9i on 2016/12/12.
 */
"use strict"
const utils = require('../utils/index');
const henInfo = require('../models/model.info.js');

module.exports.init = router => {
  router.post('/henInfo',create);
  router.get('/henInfo', henBatchs);
  router.get('/henInfo/:id', henDetail);
  router.patch('/henInfo/:id', modify);
};
/*新增批次*/
function* create(){
  /**
   * post body
   * {
    "batchName":"批次名称",
    "type":"类型",
    "total":"总数",
    "stage" :阶段,
    "henAmount":"母鸡总数"
    }
   */
  const batchName = this.request.body.batchName,
    createTime = new Date(),
    finishTime = null,
    type = this.request.body.type,
    total = this.request.body.total,
    stage = this.request.body.stage,
    henAmount = this.request.body.henAmount;

  if(type === ''){
    this.throw(400,'类型不能为空')
  }else if(!total&&!henAmount){
    this.throw(400,'总数不能为0')
  }

  const henInfo = new henInfo({
    batchName,
    type,
    createTime,
    finishTime,
    stage,
    total,
    henAmount
  });
  const result = yield henInfo.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data:{
      id:result._id
    }
  }
}
/*查询所有批次信息*/
function* henBatchs(next) {
  /**
   * @param page 批次列表页码 从1开始
   * @param limit 分页数量
   * */
  const limit = ~~this.query.limit || 10,
    page = ~~this.query.page;
  let skip;
  if(page === 0){
    skip = 0
  }else{
    skip = limit * (page - 1)
  }
  const {henBatchArr,totalNumber} = yield {
    henBatchArr: henInfo.find()
      .populate()
      .select('batchName type createTime finishTime stage total')
      .sort({ createTime: -1})
      .limit(limit).skip(skip).exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }),
    totalNumber: henInfo.count().exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
  };
  this.status = 200;
  const resultArr = [];
  if(henBatchArr.length){
    henBatchArr.forEach((henInfo,index,arr)=>{
      henInfo = henInfo.toObject();
      resultArr.push(henInfo);
      utils.print(henInfo);
    })
  }

  utils.print(resultArr);
  this.body = {
    success:true,
    data:{
      henBatch:resultArr,
      total:totalNumber
    }
  }
}
/*查询某一批次信息*/
function* henDetail(next) {
  const id = this.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    this.throw(400,'invalid id');
  }
  let henBatch = (yield henInfo.findOne({_id:id})
    .populate()
    .select('batchName type createTime finishTime stage total')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    }));

  this.status = 200;
  if(henBatch) {
    henBatch = henBatch.toObject();
    ({nextHenBatch: henBatch.nextHenBatch, prevHenBatch: henBatch.prevHenBatch} = yield {
      nextHenBatch: henInfo.findOne({_id: {$gt: henBatch._id}}, 'batchName _id').exec().catch(err => {
        utils.logger.error(err);
        this.throw(500, '内部错误')
      }),
      prevArticle: henInfo.findOne({_id: {$lt: henBatch._id}}, 'batchName _id').sort({_id: -1}).exec().catch(err => {
        utils.logger.error(err);
        this.throw(500, '内部错误')
      })
    })
  }
  this.body = {
    success:true,
    data:henBatch
  }
}
/*修改批次信息*/
function* modify(next){
  const id = this.params.id;
  let henBatch = yield henInfo.findByIdAndUpdate(id,{$set:this.request.body},{new:true}).exec()
    .catch(err => {
      if(err.name === 'CastError'){
        this.throw(400,'id不存在');
      }else{
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }
    });
  henBatch = henBatch.toObject();
  this.status = 200;
  utils.print(henBatch);
  this.body = {
    success:true,
    data:henBatch
  }
}
