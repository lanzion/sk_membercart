// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' //这是基于Vue的一个插件

import Home from "../component/home/Home.vue";
import Pay from "../component/pay/Pay.vue";
import Info from "../component/info/Info.vue";
import EditInfo from "../component/editInfo/EditInfo.vue";
import WeiXinPay from "../component/pay/WeiXinPay.vue";

import Speed from "../component/info/speed/Speed.vue";
import Birthday from "../component/info/birthday/Birthday.vue";
import Interest from "../component/info/Interest/Interest.vue";
import Tele from "../component/info/tele/Tele.vue";

import EditSpeed from "../component/editInfo/speed/Speed.vue";
import EditBirthday from "../component/editInfo/birthday/Birthday.vue";
import EditInterest from "../component/editInfo/Interest/Interest.vue";
import EditTele from "../component/editInfo/tele/Tele.vue";


import Login from "../component/login/loginShop.vue";
import LoginSuccess from "../component/login/loginSuccess.vue";

let news = [
  { name: 'Speed', path: '/info/speed', component: Speed },
  { name: 'Birthday', path: '/info/birthday', component: Birthday },
  { name: 'Interest', path: '/info/interest', component: Interest },
  { name: 'Tele', path: '/info/tele', component: Tele },
]

let editNews = [
  { name: 'EditSpeed', path: '/editInfo/speed', component: EditSpeed },
  { name: 'EditBirthday', path: '/editInfo/birthday', component: EditBirthday },
  { name: 'EditInterest', path: '/editInfo/interest', component: EditInterest },
  { name: 'EditTele', path: '/editInfo/tele', component: EditTele },
]

Vue.use(VueRouter)


let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/info', redirect: '/info/speed' },
    { path: '/editinfo', redirect: '/editinfo/speed' },
    { path: '/home', component: Home, name: 'V卡会员', meta: { title: 'V卡会员' } },
    { path: '/pay', component: Pay, name: 'V卡会员支付', meta: { title: 'V卡会员支付' } },
    { path: '/weiXinpay', component: WeiXinPay},
    { path: '/info', component: Info, children: [...news], },
    { path: '/editinfo', component: EditInfo, children: [...editNews], },
    { path: '/login/loginShop', component: Login },
    { path: '/login/loginSuccess', component: LoginSuccess },

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title

  }
  next()

})


export default router;
