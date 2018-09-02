<template>
  <!-- 免费商品 -->
  <div class="trial" v-if='trialList.length'>
    <div class="tran"></div>
    <div class="coupon_title">
      <p>
        <span></span> &nbsp; 免费试用 &nbsp;
        <span></span>
      </p>
      <p>（优先体验新商品）</p>
    </div>
    <div class="trial_list">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide trial_swiper">
            <a href="javascript:;">
              <div class="trial_goods_img">
                <img src="../../../assets/images/1111.jpg" alt="">
              </div>
              <div class="goods_des">
                <p>产品名产品名产品名产品名</p>
                <p>产品介绍产品介绍产品介绍产品介绍</p>
              </div>
            </a>
          </div>
          <div class="swiper-slide trial_swiper">
            <a href="javascript:;">
              <div class="trial_goods_img">
                <img src="../../../assets/images/1111.jpg" alt="">
              </div>
              <div class="goods_des">
                <p>产品名产品名产品名产品名</p>
                <p>产品介绍产品介绍产品介绍产品介绍</p>
              </div>
            </a>
          </div>
          <div class="swiper-slide trial_swiper">
            <a href="javascript:;">
              <div class="trial_goods_img">
                <img src="../../../assets/images/1111.jpg" alt="">
              </div>
              <div class="goods_des">
                <p>产品名产品名产品名产品名</p>
                <p>产品介绍产品介绍产品介绍产品介绍</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="trial_bottom">滑动看更多
      <img src="../../../assets/images/jiantou.png" alt="">
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    data() {
      return {
        trialList:[]
      };
    },
    mounted: function () {

      var mySwiper = new Swiper('.swiper-container', {
        autoplay: false,
        loop: false,
        noSwiping: true,
        loopedSlides: 2,
        width: 140,
      });
      var swiperSlide = document.querySelector('.swiper-slide');
      //swiperSlide.style.width = '40%';
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
    background: #f7f7f7;
  }
.coupon_title p{
  margin: 0;
}
  .coupon_title span {
    display: inline-block;
    width: .4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
.coupon_title p:nth-child(2) {
    font-size: .26rem;
    color: rgba(133, 132, 132, 0.55);
    padding-top: .1rem;
}
  .trial.coupon_title,
  .trial.trial_list {
    background: #f7f7f7;
  }

  .trial_list a {
    display: inline-block;
    text-decoration: none;
    font-size: .26rem;
    width: 100%;
    color: #565656;
  }
.swiper-container {
  background: #f7f7f7;
}
  .swiper-slide {
    padding: .2rem;
    background: #f7f7f7;
  }

  .trial_list a .trial_goods_img {
    background: #fff;
    border-radius: .2rem;
    overflow: hidden;
    margin-bottom: .1rem;
  }

  .trial_list a p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: .15rem;
    margin: 0;
  }

  .trial_list a .goods_des p:nth-child(2) {
    font-size: .24rem;
    color: rgba(86, 86, 86, 0.4);
  }


  .trial .trial_bottom {
    background: #f7f7f7;
    font-size: .24rem;
    color: rgba(178, 178, 178, 0.73);
    text-align: center;
    padding-bottom: .2rem;
  }

  .trial .trial_bottom img {
    width: .24rem;
  }
</style>