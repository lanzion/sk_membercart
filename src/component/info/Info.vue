<template>
  <div class="info">
    <div class="top">
      <div class="title">V 卡 会 员 信 息</div>

    </div>
    <router-view 
    @tellMyName='getName' 
    @tellMyBirthday='getBirthday' 
    @tallMyTele='getTele' 
    @tallMyTag='getTag'
    :info='info'
    ></router-view>
  </div>
</template>

<script>
  import mbrservice from "../../services/mbrservice.js";
  import cardService from "../../services/card-service.js";
  export default {
    
    data() {
      return {
        info: {
          Sex: '',
          Name: '',
          Birthday: '',
          Phone: '',
          Address: '',
          Area: '',//县
          City: '',//市
          Province: '',//省
          TagId: '',
          // MemberAccount: ''
        },
        payId: '',
        PayUrl: ''
      }
    },
    methods: {
      getName(val) {
        this.info.Sex = val.Sex;
        this.info.Name = val.Name;
      },
      getBirthday(val) {
        this.info.Birthday = val.Birthday
      },
      getTele(val) {
        this.info.Phone = val.Phone;
        this.info.Address = val.Address;
        this.info.Area = val.Area;
        this.info.City = val.City;
        this.info.Province = val.Province;
      },
      getTag(val) {
        this.info.TagId = ','+val.TagId.join(',')+','
        new mbrservice().BindMemberInfo(this.info).then(res=>{
          if(res.ErrorCode == 0){
            this.summitOrder()
          }
        })
      },
      //支付
      summitOrder() {
        new mbrservice().CreateOrder({
          ProductNo: this.ProductNo,
          PayId: this.payId
        })
        .then(res=>{
            if(res.ErrorCode == 0){
              new cardService().GetPaymentInfoCommand({ 
                PayId: res.Data.PayId
              })
              .then(res => {
                location.href = res.Data.PayUrl + "?payno=" + order.PayNo;
              })
            }
            if (res.ErrorCode == -1) {
            alert('支付方式不正确')
          }
          })
      },
      //支付方式
      GetPaymentList() {
        new cardService().GetPaymentList({}).then(res=>{
          if(res.ErrorCode == 0){
            this.payId = res.Data.PaymentList[0].Id;
            this.PayUrl = res.Data.PaymentList[0].PayUrl;
          }
        })
      },

    },
    created() {
      this.GetPaymentList()
    },

  };
</script>

<style scoped>
  .info {
    height: 100%;
    overflow-x: scroll;
    background: url('../../assets/images/infobg.png');
  }

  .info .top .title {
    color: #e4c8a6;
    font-size: .32rem;
    text-align: center;
    padding: .5rem 0;
  }
</style>