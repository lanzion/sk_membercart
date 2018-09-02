import command from './command'
class WeiXinService {
  //初始化调用接口
  Command = new command()
  constructor() {
    //设置Token验证登录
    this.Command.headers.Token = localStorage.getItem('membertoken')
  }
  //获取jssdk的签名
  getScriptSign(param) {
    return this.Command.execute({ api: "/api/WeiXin/GetScriptSignature", param: param });
  }

  //获取微信支付的参数
  getPaymentSgin(param) {
    return this.Command.execute({ api: "/api/WeiXin/GetWxPaymentSign", param: param });
  }

  // 检测支付是否成功
  CheckWeiXinPay(param){
    return new command().execute({ api: "/api/WeiXin/CheckWeiXinPay", param: param})
  }
}

export default WeiXinService 