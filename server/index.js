/**
 * Created by 9i on 2016/12/13.
 */
require("babel-register")({
  plugins: ['transform-async-to-generator']
});
require("./app.js");
