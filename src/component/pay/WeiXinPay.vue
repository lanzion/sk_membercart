<template>
  <div class="weixinPay"></div>
</template>

<script>
  import weixinService from "../../services/weixin-service.js";
  import jssdkService from "../../services/jssdk-service.js";
  import httpService from "../../services/http-service.js";

  export default {
    data() {
      return {
        payData: {},
        PayNo: ''
      }
    },
    methods: {
      pay() {
        var _this = this
        wx.error(function (res) {
          alert('错误：' + res);
        });
        wx.ready(function () {

          _this.doPay();
        });
      },
      doPay() {
        var _this = this
        console.log(this.payData);
        wx.chooseWXPay({
          timestamp: _this.payData.Timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: _this.payData.NonceStr, // 支付签名随机串，不长于 32 位
          package: _this.payData.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: _this.payData.SignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: _this.payData.Signature, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
            // location.replace('/CheckPayStatus/CheckWeiXinPay?payno=');
            new weixinService().CheckWeiXinPay({ PayNo: _this.PayNo }).then(res => {
              if(res.Data == 1){
                alert('支付成功');
                 _this.$router.push({ path: '/home' })
              }else if(res.Data == 0){
                alert('支付异常，请联系客服')
                _this.$router.push({ path: '/home' })
              }
            })
          },
          complete: function (res) {
          },
          cancel: function (res) {
            //alert("支付失败,请联系客服");
            _this.$router.push({ path: '/home' })
          },
          trigger: function (res) {

          },
          fail: function (res) {
            //可能遇到跨号支付
            //alert("支付失败,请联系客服");
            _this.$router.push({ path: '/home' })
          }
        });
      }
    },
    created() {
      new jssdkService().IntData()
      this.PayNo = new httpService().search('payno')
      new weixinService().getPaymentSgin({ PayNo: this.PayNo }).then(res => {
        this.payData = res.Data
        this.pay()
      }, err => {
        alert('支付异常，请联系客服')
        this.$router.push({ path: '/home' })
      })
    }
  }
</script>

<style scoped>
  .weixinPay {
    font-size: .16rem;
    padding: .1rem;
  }
</style>