import Vue from "vue";
import axios from 'axios';
import loginUtil from './login'
import apiService from "./api-service";

class Command {
  headers = {
    'Content-Type': 'application/json',
  }
  execute(option = { api, param, method }) {
    if (option.method == null) option.method = 'POST';
    if (option.param == null) option.param = {};

    //Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成)和Rejected(已失败)
    return new Promise(async (resolve, reject) => {
      return axios({
        method:option.method,
        headers: this.headers,
        url: option.api,
        data: option.param,
        baseURL: new apiService().ApiRoot,
        withCredentials: true
      }).then(response => {
        if (response.data.ErrorCode == 0) {//请求成功
          return resolve(response.data);
        } else if (response.data.ErrorCode == -2 || response.data.ErrorCode == -3) {
          //用户未登录，或者未授权em('membe
          localStorage.setItem('gotoUrl', location.href);
          new loginUtil().loginShop();
          return reject(response.data)
        } else {
          return reject(response.data);
        }
      })
    })
  }
}

export default Command