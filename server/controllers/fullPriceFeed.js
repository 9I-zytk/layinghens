/**
 * Created by 9i
 * @Date 2017/3/26
 * @GitHub git@github.com:9I-zytk/layinghens.git
 * 记录全价料采购记录
 */
'use strict'
import fullPriceFeed from '../models/model.fullPriceFeed'

export async function getRecord (ctx) {
  const pageSize = ~~ctx.params.pageSize||25
  const pageNo = ~~ctx.params.pageNo||1
  const beginDate = ctx.params.beginDate
  const endDate = ctx.params.endDate
  const data = await fullPriceFeed.where('saleDate').gt(beginDate).lt(endDate).sort({saleDate : -1})
    .limit(pageSize).skip((pageNo-1)*pageSize).populate('batchName').populate('Origin').exec();
  const total = await fullPriceFeed.where('saleDate').gt(beginDate).lt(endDate).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: data,
    total:total
  }
}


export async function create (ctx) {
  const record = new fullPriceFeed(ctx.request.body);

  if(record.batchName === '') {
    ctx.throw('批次不能不能为空!', 400)
  }
  if(record.Origin === '') {
    ctx.throw('供应商不能为空!', 400)
  }
  const response = await record.save();
  ctx.status = 200;
  ctx.body = {
    data: response
  }
}

export async function modify (ctx) {
  const id = ctx.request.body.id;
  delete ctx.request.body.id;
  try {
    const response = await fullPriceFeed.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
    if(!response)
    {
      ctx.throw('未找到该记录!',404)
    }
    ctx.status = 200;
    ctx.body = {
      data: response
    }
  }
  catch (err)
  {
    if (err.name === 'CastError'|| err===404) {
      ctx.throw('id不存在',400)
    } else {
      ctx.throw(err,500)
    }
  }
}
