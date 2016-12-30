/**
 * Created by 9i on 2016/12/16.
 */
import User from '../models/user'
import config from '../../config'
import getToken  from '../utils/auth'

module.exports= async (ctx, next)=>{
  const token = getToken(ctx)

  if (!token) {
    ctx.throw(401)
  }

  let decoded = null
  try {
    decoded = verify(token, config.token)
  } catch (err) {
    ctx.throw(401)
  }

  ctx.state.user = await User.findById(decoded.id, '-password')
  if (!ctx.state.user) {
    ctx.throw(401)
  }

  return next()
}
