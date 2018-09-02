<template>
  <div class="home">
    <app-member></app-member>
    <app-coupon></app-coupon>
    <app-trial></app-trial>
    <app-recommend></app-recommend>
  </div>
</template>

<script>
  import Member from "./member/Member.vue";
  import Coupon from "./coupon/Coupon.vue";
  import Trial from "./trial/Trial.vue";
  import Recommend from "./recommend/Recommend.vue";

  export default {
    // 注册组件
    components: {
      appMember: Member,
      appCoupon: Coupon,
      appTrial: Trial,
      appRecommend: Recommend
    },
    created () {
      // let body = document.querySelector('body');
      // body.style.background = 'none'
    }
  }

</script>

<style scoped>

  img{
    width: 100%;
  }
  .home{
    overflow: hidden;
    background: url('../../assets/images/bodybg.png') no-repeat;
    background-size: 100%;
    background-position: top;
  }
</style>