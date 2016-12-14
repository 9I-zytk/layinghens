import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)
/* or
*Vue.component(Button.name, Button)
*Vue.component(Select.name, Select)
*/
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
