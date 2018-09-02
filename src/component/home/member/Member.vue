<template>
  <div class="menber">
    <!-- 头部 -->
    <div class="top">
      <div class="header">
        <a href="https://gdtvshop.weixinmvp.com/wap/shop/MemberDefault.aspx" class="h_portrait">
          <img :src="menImg" :onerror='errorImg' alt="">
        </a>
        <a href="https://gdtvshop.weixinmvp.com/wap/shop/MemberDefault.aspx" class="uname"> {{menName}}</a>
        <div class="menber_date" v-if="endTime">V卡会员到期日：{{endTime}}</div>
        <div class="info_edit">
          <router-link to="/editinfo">
            <img src="../../../assets/images/edit.png" alt="">
            <p>信息修改</p>
          </router-link>
        </div>
      </div>
      <div class="open_btn" @click="IsPay">
        <button>
          <span class="open_txt">{{openTxt}}</span>
          <span class="open_money" v-if='isMoney'>¥{{Price}}/年</span>
        </button>
      </div>
    </div>
    <!-- 会员特权 -->
    <div class="privilege">
      <img src="../../../assets/images/privilege.png"  alt="">
    </div>

  </div>
</template>

<script>
import MbrService from "../../../services/mbrservice.js";
import cardService from "../../../services/card-service.js";
export default {
  data() {
    return {
      Price: "",
      openTxt: "立即开通",
      endTime: "",
      menName: "",
      menImg: "",
      isMoney: true,
      errorImg: 'this.src="' + require('../../../assets/images/HeadPortrait.jpg') + '"'
    };
  },
  methods: {
    getMembershipPrice() {
      new cardService().getCardInfo({}).then(res => {
        if (res.ErrorCode == 0) {
          this.Price = res.Data.SalePrice;
        }
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + "" + month + "" + strDate;

      return currentdate;
    },
    IsBind() {
      var _this = this;
      new MbrService().isBind().then(res => {
        if (res.ErrorCode == -2) {
          //未登录
        } else if (res.ErrorCode == 0) {
          //登录过
          this.LaodMemberInfo();
          if (res.Data.IsBuy == 0) {
            //没有购买
            //判断有没有绑定信息
            if (res.Data.IsBind == 0) {
            }
          } else if (res.Data.IsBuy == 1) {
            //购买过了
            //判断是否过期
            var timeSrc = res.Data.EndTime.replace(" ", "T");
            if (new Date(timeSrc).getTime() < new Date().getTime()) {
              this.openTxt = "续费";
              this.endTime = res.Data.EndTime;
            } else {
              this.openTxt = "已开通";
              this.endTime = res.Data.EndTime;
              var newData = this.getNowFormatDate();
              this.isMoney = false;
            }
          }
        }
      });
    },
    IsPay() {
      if (this.openTxt != "已开通") {
        this.$router.push({ path: "/pay" });
      }
    },
    // 获取会员信息
    LaodMemberInfo() {
      var _this = this;
      new MbrService().LaodMemberInfo().then(res => {
        if (res.ErrorCode == 0) {
          this.menName = res.Data.Name;
          this.menImg = "";
          this.menImg=this.$util(res.Data.PhotoUrl)
          if(!this.menImg){
            this.menImg = '../../../assets/images/HeadPortrait.jpg'
          }
        }
      });
    }
  },
  created: function() {
    this.getMembershipPrice();
    this.IsBind();
  }
};
</script>

<style scoped>
.top {
  position: relative;
}

.header {
  background: url("../../../assets/images/headerbg.png") no-repeat;
  background-size: cover;
  margin: 0.3rem;
  overflow: hidden;
  box-shadow: -0.02rem 0.05rem 18px 0px #1a2a292b;
  border-radius: 0.2rem;
  padding-bottom: 1rem;
  position: relative;
}

.header .h_portrait {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0.3rem auto;
  display: block;
}

.header .uname {
  text-align: center;
  font-size: 0.38rem;
  color: rgba(255, 226, 177, 0.82);
  text-decoration: none;
  display: block;
}

.header .menber_date {
  text-align: center;
  font-size: 0.24rem;
  color: #6d6d6d;
  margin-top: 0.1rem;
}

.header .info_edit {
  position: absolute;
  text-align: center;
  font-size: 0.2rem;
  top: 0.2rem;
  right: 0.3rem;
}

.header .info_edit a {
  color: rgba(238, 217, 175, 0.8);
  text-decoration: none;
  display: block;
}

.header .info_edit img {
  width: 0.5rem;
}

.top .open_btn {
  position: absolute;
  width: 100%;
  bottom: -0.45rem;
  height: 0.9rem;
}

.top .open_btn button {
  width: 75%;
  height: 0.9rem;
  background: #f1d3a1;
  color: #fff;
  font-size: 0.32rem;
  border: none;
  border-radius: 0.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: -0.02rem 0.05rem 18px 0px #1a2a292b;
}

.privilege {
  padding: 0.5rem 0.2rem;
  background: #fff;
}
</style>