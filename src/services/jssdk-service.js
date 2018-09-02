import wxService from './weixin-service';

class JssdkService {
  apiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'closeWindow',
    'chooseWXPay',
    'getLocalImgData'
  ];
  IntData(debug) {
    if (!window.wx) {
      var scriptElement = document.createElement('script');
      scriptElement.src = "//res.wx.qq.com/open/js/jweixin-1.3.0.js";
      document.body.appendChild(scriptElement);
      scriptElement.addEventListener("load", e => {
        this._promise(debug);
      })
    } else {
      this._promise(debug);
    }

  }
  _promise(debug) {
    return new Promise(async (resolve, reject) => {
      if (!(window.__wxjs_environment === 'miniprogram' || window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 || window.navigator.wxuserAgent)) {
        return reject('need wechat dev');
      }

      return new wxService().getScriptSign({ Url: window.location.href.split('#')[0] })
        .then(res => {
          wx.config({
            debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.Data.appId, // 必填，公众号的唯一标识
            timestamp: res.Data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.Data.nonceStr, // 必填，生成签名的随机串
            signature: res.Data.signature, // 必填，签名，见附录1
            jsApiList: this.apiList
          });
          wx.ready(function () {
            return resolve(res);
          });
        }, err => { return reject(err) });
    });
  }

}

export default JssdkService