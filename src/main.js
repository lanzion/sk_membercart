import Vue from "vue";

import App from "./component/App.vue";

import vueRouter from "./router"; //自动导入该目录下的index.js

import { Cell, DatetimePicker, Picker} from 'mint-ui';
import "mint-ui/lib/style.css"
Vue.component(Cell.name, Cell);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);


import 'normalize.css';

import axios from "axios";

// 全局引入 添加到vue实例中 全局使用
import Util from "./services/util";
Vue.prototype.$util = Util;

// import API from "./services/command";

import "./less/index.css";
import "./less/media.css";

// const loginUrl = 'http://localhost:1954';
// const telUrl = 'http://192.168.0.120:8000'

// 配置默认域名, 这样请求的时候就不用在url里加域名了
// axios.defaults.baseURL = 'http://localhost:1954';
// 因为我们调用的接口跨域了，默认情况下接口给我们设置的cookie无效，为了有效，我们要设置
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;
axios.defaults.changeOrigin=true;
// 为了使用方便，把axios和pai添加到Vue原型，将来Vue组件可以直接使用

Vue.prototype.$http = axios;

// Vue.prototype.$loginUrl = loginUrl;
// Vue.prototype.$telUrl = telUrl;

// axios.get(domain+api.logout).then(()=>console.log('登出'))

new Vue({
    el:'#app',
    render: creaeElement => creaeElement(App),
    router: vueRouter

})
