/**
 * Created by 9i on 2016/12/27.
 */

const router = require('koa-router')(),
     info= require('./info')

router.use('/henInfo', info.routes(), info.allowedMethods());

module.exports=router;
