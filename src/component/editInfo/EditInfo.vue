<template>
  <div class="info">
    <div class="top">
      <div class="title">V 卡 会 员 信 息</div>

    </div>
    <router-view @tellMyName='getName' @tellMyBirthday='getBirthday' @tallMyTele='getTele' @tallMyTag='getTag' :info='info'></router-view>
  </div>
</template>

<script>
  import MbrService from "../../services/mbrservice.js";

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
        },
      
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
        this.info.TagId = val.TagId.join(',')
         
      },
      getLaodMemberInfo(){
        new MbrService().LaodMemberInfo({}).then(res=>{
          if(res.ErrorCode == 0){
            this.info.Address = res.Data.Address;
            this.info.Area = res.Data.Area;
            this.info.Birthday = res.Data.Birthday.split(' ')[0];
            this.info.City = res.Data.City;
            this.info.Sex = res.Data.Sex;
            this.info.Name = res.Data.Name;
            this.info.Phone = res.Data.Phone;
            this.info.Province = res.Data.Province;
            this.info.TagId = res.Data.TagId;
          }
        })
      }
      
    },
    created() {
      this.getLaodMemberInfo()
    },

  };
</script>

<style scoped>
  .info{
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