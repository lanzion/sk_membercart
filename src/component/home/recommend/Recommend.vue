<template>
  <!-- 推荐商品 -->
  <div class="recommend" v-if='goodsList.length'>
    <div class="tran"></div>
    <div class="coupon_title">
      <p>
        <span></span> &nbsp; 为你推荐 &nbsp;
        <span></span>
      </p>
      <p>（为尊贵的你精挑细选）</p>
    </div>
    <div class="rec_list clearfix">
      <a :href="item.Url" v-for='item in goodsList' :key='item.ProductNo'>
        <div class="rec_goods_img">
          <img :src="item.imgurl" alt="">
        </div>
        <div class="rec_des">
          <p style='height:0.34rem' v-if='!item.ShortDesc'></p>
          <p><span class="mem_price" style="display:none">会员价</span> {{item.ProductName}}</p>
          <p  v-if='item.ShortDesc'>{{item.ShortDesc}}</p>
        </div>
        <div class="rec_price">
          <span class="nav_price">¥{{item.SalePrice}}</span> &nbsp;
          <span class="old_price" v-if="item.MarketPrice">¥{{item.MarketPrice}}</span>
        </div>
      </a>

    </div>
  </div>
</template>

<script>
import recommend from "../../../services/recommend.js";

export default {
  data() {
    return {
      goodsList: []
    };
  },
  methods: {
    getGoodsList() {
      var page = 1;
      var size = 8;
      new recommend()
        .GetReferenceProductList({
          ReferenceKind: "VCART_TJ",
          ReferenceCode: "395",
          PageIndex: page || 1,
          PageSize: size || 8
        })
        .then(res => {
          if (res.ErrorCode == 0) {
            for (var i = 0; i < res.Data.length; i++) {
              res.Data[i].imgurl =
                JSON.parse(res.Data[i].ProductImage)[0].ServerUrl +
                JSON.parse(res.Data[i].ProductImage)[0].FilePath;
            }
            this.goodsList = res.Data;
          }
        });
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped>
.tran {
  background: #e6e6e6;
  height: 0.16rem;
}

.coupon_title {
  font-size: 0.36rem;
  text-align: center;
  color: #2a2a2a;
  padding: 0.2rem 0;
  background: #f7f7f7;
}

.coupon_title p {
  margin: 0;
}

.coupon_title span {
  display: inline-block;
  width: 0.4rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.coupon_title p:nth-child(2) {
  font-size: 0.26rem;
  color: rgba(133, 132, 132, 0.55);
  padding-top: 0.1rem;
}

.recommend {
  background: #f7f7f7;
  padding-bottom: 0.3rem;
}

.recommend .rec_list a {
  display: block;
  float: left;
  width: 46%;
  background: #fff;
  text-decoration: none;
  font-size: 0.26rem;
  color: #565656;
  margin: 0.1rem;
  border-radius: 0.2rem;
  overflow: hidden;
  padding-bottom: 0.2rem;
}

.recommend .rec_list .rec_goods_img {
  position: relative;
  padding-top: 100%;
}

.recommend .rec_list .rec_goods_img img {
  position: absolute;
  top: 0;
}

.recommend .rec_list a .rec_des p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 0.1rem;
  padding-top: 0.1rem;
  margin: 0;
}

.recommend .rec_list a .rec_des p:nth-child(2) {
  font-size: 0.24rem;
  color: rgba(86, 86, 86, 0.4);
}

.recommend .rec_list a .rec_des p .mem_price {
  display: inline-block;
  background: #efdab0;
  color: #fff;
}

.recommend .rec_price {
  padding-left: 0.1rem;
}

.recommend .rec_price .nav_price {
  font-size: 0.3rem;
  color: #b4282d;
}

.recommend .rec_price .old_price {
  font-size: 0.24rem;
  color: #c7c7c7;
  text-decoration: line-through;
}
</style>