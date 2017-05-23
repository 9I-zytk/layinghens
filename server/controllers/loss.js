/**
 * Created by 9i
 * @Date 2017/3/30
 * @GitHub git@github.com:9I-zytk/layinghens.git
 */
'use strict'
import loss from '../models/model.loss'
import henInfo from '../models/model.info'

export async function getRecord (ctx) {
  const pageSize = ~~ctx.params.pageSize||25
  const pageNo = ~~ctx.params.pageNo||1
  const beginDate = ctx.params.beginDate
  const endDate = ctx.params.endDate

  const data = await loss.where('date').gt(beginDate).lt(endDate).sort({date : -1})
    .limit(pageSize).skip((pageNo-1)*pageSize).populate('batchName').exec();
  const total = await loss.where('date').gt(beginDate).lt(endDate).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: data,
    total:total
  }
}

export async function create (ctx) {
  const lossInfo = new loss(ctx.request.body);
  const batchId = ctx.request.body.batchName;
  try {
    if (lossInfo.batchName === '') {
      ctx.throw('批次不能不能为空!', 400)
    }
    const response = await lossInfo.save();
    /*更新批次表*/
    const batch = await henInfo.findOne({_id: batchId}).exec();
    if (!batch) {
      ctx.throw('未找到该批次记录!', 404)
    }
    batch.lossAmount += lossInfo.quantity;
    const responseBatch =await henInfo.update({_id: batchId},{$set:{'lossAmount':batch.lossAmount}});
    console.log(responseBatch);
    if (!responseBatch) {
      await response.remove()
      ctx.throw('更新批次表失败!', 500)
    }
    ctx.status = 200;
    ctx.body = {
      data: response
    }
  }
  catch (err) {
    if (err.name === 'CastError'|| err===404) {
      ctx.throw('未找到该批次记录',400)
    } else {
      ctx.throw(err,500)
    }
  }
}

export async function modify (ctx) {
  const id = ctx.request.body.id;
  const batchId = ctx.request.body.batchName
  const original = ctx.request.body.original
  const quantity = ctx.request.body.quantity
  delete ctx.request.body.id
  delete ctx.request.body.original //删除原本疫损
  try {
    const response = await loss.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
    if(!response) {
      ctx.throw('未找到该记录!',404)
    }
    /*更新批次表*/
    const batch = await henInfo.findOne({_id: batchId}).exec();
    if (!batch) {
      ctx.throw('未找到该批次记录!', 404)
    }
    batch.lossAmount += quantity - original; //加上增量 现在值-更新前的值
    const responseBatch =await henInfo.update({_id: batchId},{$set:{'lossAmount':batch.lossAmount}});
    console.log(responseBatch);
    if (!responseBatch) {
      await response.remove()
      ctx.throw('更新批次表失败!', 500)
    }
    ctx.status = 200;
    ctx.body = {
      data: response
    }
  }
  catch (err)
  {
    if (err.name === 'CastError'|| err===404) {
      ctx.throw('未找到该批次记录',400)
    } else {
      ctx.throw(err,500)
    }
  }
}

export async function getRecordByBatch(ctx,next) {
  const id = ctx.params.batchId;
  try {
    const lossRecord = await loss.find({batchName: id}).exec()
    ctx.status = 200
    ctx.body = {data: lossRecord}
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
