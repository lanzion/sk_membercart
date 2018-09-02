<template>
  <div class="pay">
    <div class="vip">
      <div class="vip-top">
        <img src="../../assets/images/1-1.png" alt="Alternate Text" />
      </div>
      <div class="vip-txt">
        <span></span>
        开通V卡会员 享专属特权
        <span></span>
      </div>
    </div>
    <div class="payment">
      <div class="pay-leb mode">
        购买权益
        <span>V卡会员</span>
      </div>
      <div class="pay-leb buyAge">
        使用年限
        <span class="recid">{{limitDate}}</span>
        <span>年</span>
      </div>
      <div class="pay-leb money">
        应付金额
        <span class="sheep">￥</span>
        <span class="salePrice">{{salePrice}}</span>
      </div>
      <div class="pay-but" @click='checkMemberInfo'>

        <a class="payBtn" href="javascript:;">立即支付</a>
      </div>
      <div class="clause">
        <span></span>
        <a href="http://gdtvshop.weixinmvp.com/Wap/Shop/docview.aspx?uid=308">开通则同意《V卡会员正式用户协议》</a>
      </div>
    </div>
    <div class="privilege">
      <img class="big-img" src="../../assets/images/2-1.png" alt="">
    </div>
    <div class="foot">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

</template>

<script>
  import MbrService from "../../services/mbrservice.js";
  import cardService from "../../services/card-service.js";


  export default {
    data() {
      return {
        limitDate: '',//年限
        salePrice: '',//会员价格
        payId: '',//支付方式
        ProductNo: '',//产品编码
        MemberAccount: '',//会员账号
        orderdisable: true,
        PayUrl: ''
      };
    },
    methods: {
      // 获取会员卡信息
      getCart() {
        new cardService().getCardInfo({}).then(res => {
          if (res.ErrorCode == -2) {
            //未登陆
          } else if (res.ErrorCode == 0) {
            this.salePrice = res.Data.SalePrice;
            this.limitDate = res.Data.LimitDate;
            this.ProductNo = res.Data.CartNo;
            this.orderdisable = false;
          }
        })
      },
      //判断是否且在有效期
      IsBuy() {
        new MbrService().isBind({}).then(res => {
          if (res.Data.IsBuy == 1) {
            //购买过了
            //判断是否过期
            if (new Date(res.Data.EndTime).getTime() > new Date().getTime()) {
              this.$router.push({ path: '/home' })
            }
          }
        })
      },
      // 判断是否有绑定信息
      checkMemberInfo() {
        new MbrService().isBind({}).then(res => {
          if (res.Data.IsBind == 0) {
            //未绑定
            this.$router.push({ path: '/info' })
          } else if (res.Data.IsBind == 1) {
            //绑定了
            this.summitOrder()
          } else {
            alert('支付异常，请联系客服')
          }
        })

      },
      //支付方式
      GetPaymentList() {
        new cardService().GetPaymentList({}).then(res => {
          if (res.ErrorCode == 0) {
            this.payId = res.Data.PaymentList[0].Id;
            this.PayUrl = res.Data.PaymentList[0].PayUrl;
            this.orderdisable = false;
          }
        })
      },
      //支付
      summitOrder() {
        // c创建订单
        new MbrService().CreateOrder({
          ProductNo: this.ProductNo,
          PayId: this.payId
        }).then(res => {
          var order = res.Data;
          // 支付
          new cardService().GetPaymentInfoCommand({ PayId: res.Data.PayId }).then(res => {
            if (res.ErrorCode == 0) {
              // location.href = res.Data.PayUrl + "?payno=" + order.PayNo;
              location.href = "/index.html#/weiXinpay?payno="+ order.PayNo;
            }
            if (res.ErrorCode == -1) {
              alert('支付方式不正确')
            }
          })
        })
      },
    },
    created() {
      this.getCart();
      this.GetPaymentList();
      this.IsBuy()
    }
  };
</script>

<style scoped>
  .pay {
    background: url('../../assets/images/1-2.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 0;
    height: 0;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    font-size: 0;
  }

  /* vip */

  .vip {
    padding: .2rem 0;
  }

  .vip-top {
    width: .59rem;
    height: .46rem;
    margin: 0 auto;
    position: relative;
  }

  .vip-top img {
    width: .59rem;
    height: .46rem;
    position: absolute;
    top: 0;
  }

  .vip .vip-txt {
    margin-top: .2rem;
    font-size: .28rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #ffd957;
    line-height: .2rem;
    height: .2rem;
    text-align: center;
  }

  .vip .vip-txt span {
    display: inline-block;
    height: 1px;
    width: .8rem;
    background-color: rgba(247, 219, 115, 0.8);
    opacity: 0.8;
    margin: .1rem;
  }

  /* 立即支付 */

  .payment {
    margin: .16rem;
    background: #fff url('../../assets/images/1-8.png') no-repeat;
    background-size: 3rem 1.9rem;
    background-position: 3.1rem 1.28rem;
    border-radius: .1rem;
    height: 4rem;
    box-shadow: -0.02rem 0.05rem 18px 0 #1a2a292b;
    margin-bottom: .33rem;
  }

  .payment .pay-leb {
    height: .8rem;
    border-bottom: 1px solid #eee;
    font-size: .26rem;
    line-height: .8rem;
    padding-left: .1rem;
    color: #3b3b3b;
  }

  .payment .pay-leb span {
    color: #bfa33d;
  }

  .payment .pay-leb .sheep {
    font-size: .16rem;
  }

  .payment .pay-leb .hint {
    color: #7b7777;
    font-size: .2rem;
  }

  .pay-but {
    padding: 0 .74rem;
    padding-top: .2rem;
  }

  .pay-but a {
    display: block;
    text-align: center;
    text-decoration: none;
    line-height: .68rem;
    width: 100%;
    height: .68rem;
    border: none;
    background: #e5ce78;
    font-size: .36rem;
    color: rgba(59, 59, 59, 0.9);
    border-radius: .34rem;
    box-shadow: -0.02rem 0.05rem 13px 0px #212a292b;
  }

  .payment .clause {
    text-align: center;
    position: relative;
  }

  .payment .clause a {
    display: block;
    text-align: center;
    width: 100%;
    text-decoration: none;
    color: rgba(59, 59, 59, 0.5);
    font-size: .18rem;
    position: absolute;
    top: .2rem;
  }

  .payment .pay-but .cue {
    font-size: .26rem;
    color: #7b7777;
    padding-bottom: .2rem;
    padding-left: .5rem;
  }

  .pay-but .cue span {
    display: inline-block;
    background-color: #e8c580;
    padding: .1rem;
    border-radius: 50%;
    margin-right: .1rem;
  }

  /* 特权 */

  .privilege {
    width: 100%;
    background: #fff;
  }

  .privilege .big-img {
    width: 100%;
  }

  .privilege .privilege-title {
    text-align: center;
    font-size: .34rem;
    color: #2a2a2a;
    padding: .3rem 0;
    position: relative;
  }

  .privilege .privilege-title img {
    width: .3rem;
    position: absolute;
    right: .24rem;
    top: .3rem;
    display: none;
  }

  .privilege .privilege-title span {
    display: inline-block;
    height: 1px;
    width: 1rem;
    background-color: rgba(0, 0, 0, 0.4);
    margin: .1rem;
  }

  .privilege .ser {
    height: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-left: .65rem;
  }

  .ser-img {
    width: .52rem;
  }

  .pre-img {
    width: .57rem;
  }

  .privilege-imgBox {
    float: left;
  }

  .pri-txt {
    float: left;
    padding-left: .3rem;
    padding-top: .3rem;
  }

  .privilege .pri-txt .pri-txt-top {
    font-size: .36rem;
    color: #2a2a2a;
  }

  .privilege .pri-txt .pri-txt-bottom {
    font-size: .24rem;
    color: rgba(42, 42, 42, 0.6);
  }

  .foot {
    margin-top: 1.3rem;
  }

  .foot div:nth-child(1) {
    height: .27rem;
    border-top: 1px solid #e5ce78;
  }

  .foot div:nth-child(2) {
    height: .44rem;
    background: #aeaeae;
  }

  .foot div:nth-child(3) {
    height: .62rem;
    background: #505050;
  }

  /* 信息 */
</style>