/**
 * Created by 9i on 2017/1/5.
 */
"use strict"
const henType = require('../models/dictionary');

export async function getHenType (ctx) {
  const henTypeArray=[{
    typeId:1,
    typeName:'洋鸡'
  },
    {
      typeId:2,
      typeName:'土鸡'
    }];
  const length = await henType.henType.count().exec()
  if(length===0) await henType.henType.create(henTypeArray)
  const henTypes = await henType.henType.find({}).exec()
  ctx.status = 200
  ctx.body = {
    data: henTypes
  }
}

export async function getStage (ctx) {
  // henType.stage.remove({}).exec()
  const stageArray=[{
    stageId:1,
    stageName:'育雏'
  },
    {
      stageId:2,
      stageName:'开产'
    },
    {
      stageId:3,
      stageName:'淘汰'
    }];
  const length = await henType.stage.count().exec()
  if(length===0) await henType.stage.create(stageArray)
  const stage =  await henType.stage.find({}).exec()
  ctx.status = 200
  ctx.body = {
    data: stage
  }
}
