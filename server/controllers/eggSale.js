/**
 * Created by 9i
 * @Date 2017/3/30
 * @GitHub git@github.com:9I-zytk/layinghens.git
 */
'use strict'
import eggSale from '../models/model.eggSale'

export async function getRecord (ctx) {
  const pageSize = ~~ctx.params.pageSize||25
  const pageNo = ~~ctx.params.pageNo||1
  const data = await eggSale.find({}).sort({date : -1})
    .limit(pageSize).skip((pageNo-1)*pageSize).populate('batchName').exec();
  const total = await eggSale.find({}).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: data,
    total:total
  }
}

export async function create (ctx) {
  const eggSaleInfo = new eggSale(ctx.request.body);

  if(eggSaleInfo.batchName === '') {
    ctx.throw('批次不能不能为空!', 400)
  }
  const response = await eggSaleInfo.save();
  ctx.status = 200;
  ctx.body = {
    data: response
  }
}

export async function modify (ctx) {
  const id = ctx.request.body.id;
  delete ctx.request.body.id;
  try {
    const response = await eggSale.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
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

export async function getRecordByBatch(ctx,next) {
  const id = ctx.params.batchId;
  try {
    const eggSaleRecord = await eggSale.find({batchName: id}).exec()
    ctx.status = 200
    ctx.body = {data: eggSaleRecord}
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

