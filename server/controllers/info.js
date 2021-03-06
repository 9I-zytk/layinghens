/**
 * Created by 9i on 2016/12/12.
 */
"use strict"
import user from '../models/user'
const utils = require('../utils/index');
const henInfo = require('../models/model.info.js');

const Admin=[{
  name: 'admin',
  password: '888888',
  state: 'active'
  }];
/**新增批次*
 * @api {post} /users Create a new batch
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup henInfo
 *
 * @apiExample Example usage:

 * @apiParam {Object} henInfo          henInfo object (required)
 * @apiParam {batchName} henInfo.batchName 批次号.
 * @apiParam {type} henInfo.type 类型.
 * @apiParam {henAmount} henInfo.password 母鸡总数.
 * @apiParam {total} henInfo.total 总数.
 *
 * @apiSuccess {Object}   henInfo           User object
 *
 */

export async function create (ctx) {
  const HenInfo = new henInfo(ctx.request.body)
  const userAdmin = new user(Admin)

  if(HenInfo.type === ''){
    ctx.throw('类型不能为空!',400)
  }else if(!HenInfo.total&&!HenInfo.henAmount){
    ctx.throw('总数不能为0!',400)
  }
  HenInfo.createdBy=userAdmin
  const response = await HenInfo.save()
  ctx.status = 200
  ctx.body = {
    data: response
  }
}
/*查询所有批次信息*/
export async function henBatch(ctx,next) {
  /**
   * @param page 批次列表页码 从1开始
   * @param limit 分页数量
   * */

  const limit = ~~ctx.query.limit || 20,
    page = ~~ctx.query.page||1;
  let skip;
  if(page === 0){
    skip = 0
  }else{
    skip = limit * (page - 1)
  }
  try {
    const {henBatchArr, totalNumber} = {
      henBatchArr: await henInfo.find({})
        .sort({createTime: -1})
        .limit(limit).skip(skip)
        .populate('type')
        .populate('stage')
        .exec().catch(err => {
          utils.logger.error(err);
          ctx.throw(500, '内部错误')
        }),
      totalNumber: await henInfo.count().exec().catch(err => {
        utils.logger.error(err);
        ctx.throw(500, '内部错误')
      })
    };
    const resultArr = [];
    if (henBatchArr.length) {
      henBatchArr.forEach((henInfo, index, arr) => {
        henInfo = henInfo.toObject();
        resultArr.push(henInfo);
      })
    }
    ctx.status = 200
    ctx.body = {
      henBatch: resultArr,
      total: totalNumber
    }
    console.log('finish===>henBatch',totalNumber);
  }
  catch (err)
  {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }
    // ctx.success(ret,200)
    if (next) { return next() }
}
/*测试*/
export async function apiTest (ctx)  {
  console.log('mod===>apiTest');
  ctx.status = 200
  ctx.body = {
     message:'这是一个测试~!'
  }
}
/*查询某一批次信息*/
export async function henDetail(ctx,next) {
  const id = ctx.params.id;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      ctx.throw(400, '无效ID');
    }
    let henBatch = (await henInfo.findOne({_id: id})
      .exec().catch(err => {
        // utils.logger.error(err);
        ctx.throw(500, '内部错误')
      }));

    if (henBatch) {
      henBatch = henBatch.toObject();
      ({nextHenBatch: henBatch.nextHenBatch, prevHenBatch: henBatch.prevHenBatch} = await {
        nextHenBatch: henInfo.findOne({_id: {$gt: henBatch._id}}, 'batchName _id').exec().catch(err => {
          utils.logger.error(err);
          ctx.throw(500, '内部错误')
        }),
        prevArticle: henInfo.findOne({_id: {$lt: henBatch._id}}, 'batchName _id').sort({_id: -1}).exec().catch(err => {
          utils.logger.error(err);
          ctx.throw(500, '内部错误')
        })
      })
    }
    ctx.status = 200
    ctx.body = {
      data: henBatch,
    }
    if (next) { return next() }
  }
  catch (e)
  {
    if(e===400)
    {
      ctx.throw('无效ID!',400)
      if (next) { return next() }
    }else {

      ctx.throw('服务器遇到内部错误!', 500)
      if (next) {
        return next()
      }
    }
  }
}
/*修改批次信息*/
export async function modify(ctx,next){
  const id = ctx.request.body.id;
  delete ctx.request.body.id;
  try {
    let henBatch = await henInfo.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
    if(!henBatch)
    {
      ctx.throw(404)
    }
    ctx.status = 200
    ctx.body = {
      data: henBatch,
    }
  }
  catch (err)
  {
    if (err.name === 'CastError'|| err===404) {
      ctx.throw('id不存在',400)
    } else {
      console.log(err)
      ctx.throw('服务器内部错误!',500)
    }
  }
}
