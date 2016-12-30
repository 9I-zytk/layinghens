/**
 * Created by 9i on 2016/12/16.
 */
export default function responseMiddleware () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        console.log(err)
        ctx.status = err.status || 500
        ctx.body = err.message
      }
    }
  // return async(ctx, next) => {
  //   // 默认失败状态
  //   const DEFAULT_ERROR_STATUS = 500;
  //   //验证参数失败状态
  //   const DEFAULT_VALIDATION_ERROR = -10;
  //   // 默认成功状态
  //   const DEFAULT_SUCCESS_STATUS = 1;
  //
  //   /**
  //    * 增加error方法，返回统一的error方法
  //    * @param error
  //    * @param status
  //    */
  //   ctx.error = (error, status) => {
  //     let message;
  //     if (error) {
  //       if (error instanceof Error) {
  //         message = error.message;
  //       }
  //       if (typeof error == 'string') {
  //         message = error;
  //       }
  //     }
  //     //fixme logger
  //     return ctx.body = {
  //       tag: 'error',
  //       status: status === undefined ? DEFAULT_ERROR_STATUS : status,
  //       message: message || '系统错误'
  //     };
  //   };
  //   /**
  //    * 增加success方法，直接返回统一的success结果
  //    * @param data
  //    * @param status
  //    * @returns {*}
  //    */
  //   ctx.success = (data, status) => {
  //     if (status === undefined) {
  //       status = DEFAULT_SUCCESS_STATUS;
  //     }
  //     return ctx.body = {
  //       flag: 'success',
  //       status: status === undefined ? DEFAULT_SUCCESS_STATUS : status,
  //       data: data
  //     };
  //   };
  //   await next();
  // }
};
