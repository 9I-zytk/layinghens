/**
 * Created by 9i on 2016/12/13.
 */
"use strict"
import * as henInfo from './info.js'
import * as henType from './henType'
import * as supplier from './supplier'
const Router = require('koa-router');

const router = Router();
/*begin henInfoRoute*/
const henInfo_Router = Router();
henInfo_Router.post('/create',henInfo.create)
henInfo_Router.get('/',henInfo.henBatch)
henInfo_Router.post('/modify',henInfo.modify)
henInfo_Router.get('/:id',async function (ctx,next){
  return await henInfo.henDetail(ctx,next)
});
router.use('/info', henInfo_Router.routes(), henInfo_Router.allowedMethods());
/*End henInfoRoute*/
/*henType*/
const henType_Router = Router();
henType_Router.get('/',async function (ctx,next) {
  return await henType.getHenType(ctx)
});
router.use('/henType', henType_Router.routes(), henType_Router.allowedMethods());

router.get('/stage',async function (ctx) {
  return await henType.getStage(ctx)
});
/*供应商路由*/
/*begin supplier*/
const supplier_Router = Router();
supplier_Router.post('/create',supplier.create);
supplier_Router.get('/:type',supplier.getSupplier);
supplier_Router.post('/modify',supplier.editSupplier);

router.use('/supplier', supplier_Router.routes(), supplier_Router.allowedMethods());

/*End supplier*/
module.exports=router;

