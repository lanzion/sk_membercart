<template>
  <!-- 优惠券列表 -->
  <div class="coupon" v-if='CouponList.length'>
    <div class="tran"></div>
    <div class="coupon_title">
      <p>
        <span></span> &nbsp; 专属优惠券 &nbsp;
        <span></span>
      </p>
      <p>（优惠叠加更优惠）</p>
    </div>
    <div class="coupon_list clearfix">
      <a href="javascript:;">
        <img src="../../../assets/images/couponbg.png" alt="">
        <div class="coupon_list_txt">
          <div class="coupon_money">
            <span>￥</span>50
          </div>
          <div class="conpon_des">智利帕克洛斯葡萄酒</div>
        </div>
      </a>
      <a href="javascript:;">
        <img src="../../../assets/images/couponbg.png" alt="">
        <div class="coupon_list_txt">
          <div class="coupon_money">
            <span>￥</span>50
          </div>
          <div class="conpon_des">智利帕克洛斯葡萄酒就旧</div>
        </div>
      </a>
      <a href="javascript:;">
        <img src="../../../assets/images/couponbg.png" alt="">
        <div class="coupon_list_txt">
          <div class="coupon_money">
            <span>￥</span>50
          </div>
          <div class="conpon_des">智利帕克洛斯葡萄酒</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        CouponList: []
      };
    },
    methods: {
      getCouponList() {
        
      }
    }
  };
</script>

<style scoped>
  .tran {
    background: #e6e6e6;
    height: .16rem;
  }

  .coupon_title {
    font-size: .36rem;
    text-align: center;
    color: #2a2a2a;
    padding: .2rem 0;
  }

  .coupon_title span {
    display: inline-block;
    width: .4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .coupon_title p {
    margin: 0;
  }

  .coupon_title p:nth-child(2) {
    font-size: .26rem;
    color: rgba(133, 132, 132, 0.55);
    padding-top: .1rem;
  }

  .coupon_list a {
    display: block;
    text-decoration: none;
    float: left;
    width: 46%;
    font-size: .2rem;
    color: #806f5b;
    text-align: center;
    padding: .22rem 0;
    margin: 0 .11rem;
    position: relative;
    overflow: hidden;
  }

  .coupon_list a .coupon_list_txt {
    position: absolute;
    top: 0;
    width: 65%;
    height: 100%;
    padding: .3rem 0;
    left: 50%;
    transform: translateX(-50%)
  }

  .coupon_list a .coupon_money {
    font-size: .6rem;
  }

  .coupon_list a .coupon_money span {
    font-size: .3rem;
  }

  .coupon_list a .conpon_des {
    font-size: .25rem;
  }
</style>