import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "mint-ui/lib/style.css";

// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import "./lib/mui/css/mui.css";
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import "./lib/mui/css/icons-extra.css";
import { Header, Swipe, SwipeItem } from "mint-ui";
//注册Header组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.config.productionTip = false;
//引入axios组件库
import axios from "axios";
//跨域保存session值
axios.defaults.withCredentials = true;
//注册组件
Vue.prototype.axios = axios;
//4.引入VueResource库
/*import VueResource from "vue-resource";
//5.注册VueResource库
Vue.use(VueResource);
//6.配置vue-resource常见属性
//6.1设置请求服务器根目录
Vue.http.options.root = "http://127.0.0.1:3060/";
//6.2:全局设置post 时候表单的数据组织格式为 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;*/
//6.3跨域访问保存session值选项
//Vue.http.options.withCredentials = true;
//导入日期选择器
import Calendar from "vue-mobile-calendar";
Vue.use(Calendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
