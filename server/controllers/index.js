/**
 * Created by 9i on 2016/12/13.
 */
"use strict"
import * as henInfo from './info.js'
import * as henType from './henType'
import * as supplier from './supplier'
import * as daily from './daily'
import * as vaccine from './vaccine'
import * as mixedFeed from './mixedFeed'
import * as fullFeed from './fullPriceFeed'
import * as eggSale from './eggSale'
import * as loss from './loss'

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
supplier_Router.get('/',supplier.getSuppliers);
supplier_Router.post('/modify',supplier.editSupplier);
supplier_Router.post('/del',supplier.delSupplier);

router.use('/supplier', supplier_Router.routes(), supplier_Router.allowedMethods());
/*End supplier*/
/*日产蛋率跟踪*/
/**/
const daily_Router = Router();
daily_Router.post('/create',daily.create);
daily_Router.get('/:beginDate/:endDate/:pageNo/:pageSize',daily.getDaily);
daily_Router.get('/all',daily.getDailyAll);
daily_Router.post('/modify',daily.modify);
router.use('/daily', daily_Router.routes(), daily_Router.allowedMethods());
/*疫苗*/
const vaccine_Router = Router();
vaccine_Router.post('/create',vaccine.create);
vaccine_Router.get('/:pageNo/:pageSize/:beginDate/:endDate',vaccine.getRecord);
vaccine_Router.get('/all',vaccine.getRecordAll);
vaccine_Router.post('/modify',vaccine.modify);
router.use('/vaccine', vaccine_Router.routes(), vaccine_Router.allowedMethods());
/*预混料*/
const mixedFeed_Router = Router();
mixedFeed_Router.post('/create',mixedFeed.create);
mixedFeed_Router.get('/:pageNo/:pageSize/:beginDate/:endDate',mixedFeed.getRecord);
mixedFeed_Router.post('/modify',mixedFeed.modify);
router.use('/mixedFeed', mixedFeed_Router.routes(), mixedFeed_Router.allowedMethods());
/*全价*/
const fullPriceFeed_Router = Router();
fullPriceFeed_Router.post('/create',fullFeed.create);
fullPriceFeed_Router.get('/:pageNo/:pageSize/:beginDate/:endDate',fullFeed.getRecord);
fullPriceFeed_Router.post('/modify',fullFeed.modify);
router.use('/fullFeed', fullPriceFeed_Router.routes(), fullPriceFeed_Router.allowedMethods());
/*走蛋*/
const eggSale_Router = Router();
eggSale_Router.post('/create',eggSale.create);
eggSale_Router.get('/:pageNo/:pageSize',eggSale.getRecord);
eggSale_Router.post('/modify',eggSale.modify);
router.use('/eggSale', eggSale_Router.routes(), eggSale_Router.allowedMethods());
/*疫损*/
const loss_Router = Router();
loss_Router.post('/create',loss.create);
loss_Router.get('/:pageNo/:pageSize/:beginDate/:endDate',loss.getRecord);
loss_Router.post('/modify',loss.modify);
router.use('/loss', loss_Router.routes(), loss_Router.allowedMethods());
module.exports=router;

