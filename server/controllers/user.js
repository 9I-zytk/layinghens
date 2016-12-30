/**
 * Created by 9i on 2016/12/16.
 * 没准备做,直接用直接用现成的
 * copy from https://github.com/adrianObel/koa2-api-boilerplate
 */
import User from '../models/user'

/**
 * @api {post} /users Create a new user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{ "user": { "username": "johndoe", "password": "secretpasas" } }' localhost:5000/users
 *
 * @apiParam {Object} user          User object (required)
 * @apiParam {String} user.username Username.
 * @apiParam {String} user.password Password.
 *
 * @apiSuccess {Object}   users           User object
 * @apiSuccess {ObjectId} users._id       User id
 * @apiSuccess {String}   users.name      User name
 * @apiSuccess {String}   users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "_id": "56bd1da600a526986cf65c80"
 *          "name": "John Doe"
 *          "username": "johndoe"
 *       }
 *     }
 *
 * @apiError UnprocessableEntity Missing required parameters
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": 422,
 *       "error": "Unprocessable Entity"
 *     }
 */
export async function createUser (ctx) {
  const user = new User(ctx.request.body.user)
  try {
    await user.save()
  } catch (err) {
    ctx.error(err.message,422)
  }

  const token = user.generateToken()
  const response = user.toJSON()

  delete response.password

  ctx.success({
    user: response,
    token
  },200)
}

/**
 * @api {get} /users Get all users
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 *
 */
export async function getUsers (ctx) {
  const users = await User.find({}, '-password')
  ctx.success(users,200)
}

/**
 * @api {get} /users/:id Get user by id
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 *
 */
export async function getUser (ctx, next) {
  try {
    const user = await User.findById(ctx.params.id, '-password')
    if (!user) {
      ctx.throw(404)
    }
    ctx.success(user,200)
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.error('未找到指定用户!',404)
    }
    ctx.error('服务器遇到内部错误!',500)
  }

  if (next) { return next() }
}

/**
 * @api {put} /users/:id Update a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 *
 */
export async function updateUser (ctx) {
  const user = ctx.body.user

  Object.assign(user, ctx.request.body.user)

  await user.save()

  ctx.success(user,200)
}

/**
 * @api {delete} /users/:id Delete a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 */

export async function deleteUser (ctx) {
  const user = ctx.body.user

  await user.remove()

  ctx.success({
    success: true
  },200)
}
