/**
 * Created by 9i on 2017/1/18.
 */
"use strict"
import supplier from '../models/model.supplier'

const supplierType=[
  {
    type:1,
    nature:0,
    typeName:'雏鸡'
  },
  {
    type:2,
    nature:0,
    typeName:'疫苗'
  },
  {
    type:3,
    nature:0,
    typeName:'原料'
  },
  {
    type:4,
    nature:0,
    typeName:'全价料'
  },
  {
    type:5,
    nature:1,
    typeName:'淘汰鸡'
  },
  {
    type:6,
    nature:1,
    typeName:'鸡蛋'
  },
  {
    type:0,
    nature:0,
    typeName:'其他'
  },
]

export async function getSupplier (ctx) {
  const type = ctx.params.type;
  let query={};
  if(type) query={type: type};
  const Suppliers = await supplier.find(query).exec();
  const total = await supplier.find({}).exec();
  ctx.status = 200;
  ctx.body = {
    data: Suppliers,
    supplierType:supplierType,
    total:total
  }
}
export async function create (ctx) {
  const Supplier = new supplier(ctx.request.body)

  if(Supplier.type === '') {
    ctx.throw('类型不能为空!', 400)
  }
  const response = await Supplier.save();
  ctx.status = 200;
  ctx.body = {
    data: response
  }
}

export async function editSupplier (ctx) {
  const Supplier = new supplier(ctx.request.body);
  const id = ctx.request.body.id;
  delete ctx.request.body.id;
  try {
    const response = await supplier.findByIdAndUpdate(id, {$set: ctx.request.body}, {new: true}).exec();
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
