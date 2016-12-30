/**
 * Created by 9i on 2016/12/13.
 */
"use strict"
import * as henInfo from './info.js'
const router = require('koa-router')()

/*henInfoRoute*/
router.post('/',henInfo.create)
router.get('/',henInfo.henBatch)

// router.get('/:id',henInfo.henDetail)
router.patch('/:id',henInfo.modify)
router.get('/:id',async function (ctx,next){
  return await henInfo.henDetail(ctx,next)
})

module.exports=router;

