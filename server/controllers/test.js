/**
 * Created by 9i on 2016/12/28.
 */
const router = require('koa-router')();
router.get('/',async function (ctx, next) {
  ctx.body = 'this a test response!';
});

module.exports = router;
