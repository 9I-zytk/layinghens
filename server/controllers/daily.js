/**
 * Created by 9i
 * @Date 2017/3/19
 * @GitHub git@github.com:9I-zytk/layinghens.git
 * 日产蛋记录
 */
'use strict'
import daily from '../models/model.dailyInfo'

export async function getDaily (ctx) {
  const pageSize = ~~ctx.params.pageSize||25
  const pageNo = ~~ctx.params.pageNo||1
  const beginDate = ctx.params.beginDate
  const endDate = ctx.params.endDate
  const data = await daily.where('date').gt(beginDate).lt(endDate).sort({date : -1})
    .limit(pageSize).skip((pageNo-1)*pageSize).populate('batchName').exec();
  const total = await daily.where('date').gt(beginDate).lt(endDate).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: data,
    total:total
  }
}

export async function getDailyAll (ctx) {
  const pageSize = ~~ctx.params.pageSize||25
  const pageNo = ~~ctx.params.pageNo||1
  const data = await daily.find({}).sort({date : -1})
    .limit(pageSize).skip((pageNo-1)*pageSize).populate('batchName').exec();
  const total = await daily.find({}).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: data,
    total:total
  }
}

export async function create (ctx) {
  const dailyInfo = new daily(ctx.request.body);

  if(dailyInfo.batchName === '') {
    ctx.throw('批次不能不能为空!', 400)
  }
  const response = await dailyInfo.save();
  ctx.status = 200;
  ctx.body = {
    data: response
  }
}

export async function modify (ctx) {
  const id = ctx.request.body.id;
  delete ctx.request.body.id;
  try {
    const response = await daily.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
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
      ctx.throw('服务器内部错误!',500)
    }
  }
}
