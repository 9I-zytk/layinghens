/**
 * Created by 9i on 2016/12/13.
 */
"use strict"
const henInfo = require('./info.js');

module.exports.init = function* (router){
  henInfo.init(router);
}
