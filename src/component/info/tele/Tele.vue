<template>
  <div>
    <div class="speed clearfix">
      <div class="subSpeed active">
        <span class="active"></span>
        <p>姓名性别</p>
      </div>
      <div class="subSpeed active">
        <span class="active"></span>
        <p>生日</p>
      </div>
      <div class="subSpeed active">
        <span class="active"></span>
        <p>电话地址</p>
      </div>
      <div class="subSpeed">
        <span></span>
        <p>感兴趣</p>
      </div>
    </div>
    <div class="title">
      <span></span> &nbsp; 电 &nbsp; 话 &nbsp;
      <span></span>
    </div>
    <div class="phone">
      <input type="text" name="phone" placeholder="请输入电话号码" v-model="Phone">
    </div>
    <div class="title">
      <span></span> &nbsp; 地 &nbsp; 址 &nbsp;
      <span></span>
    </div>
    <div class="region">
      <div class="address" @click='openMtPicker'>{{address?address:'请选择地区'}}</div>
    </div>
    <div class="mtPicker" v-if='mtPicker'>
      <div class="mat">
        <div class="packerEdit" @click='closeMtPicker'>取消</div>
        <div class="packerEdit" @click='closeMtPicker'>确定</div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
      <div class="moade"></div>
    </div>
    <div class="region">
      <input type="text" name="region" placeholder="请输入详细地址" v-model="Address">
    </div>
    <div class="edit">
      <button @click='theLastStep'>上一步</button>
      <button @click='nextStep'>下一步</button>
    </div>
  </div>
</template>
<script>
  import myaddress from "../../../assets/json/address3.json";
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        slots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot3'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        mtPicker: false,
        address: '',
        Province: "",
        City: '',
        Area: '',
        Phone: '',
        Address: ''
      }
    },
    methods: {
      onValuesChange(picker, values) {
        if (myaddress[values[0]]) {  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
        this.Province = values[0];
        this.City = values[1] ? values[1] : '';
        this.Area = values[2] ? values[2] : '';
        this.address = this.Province + this.City + this.Area

      },
      openMtPicker() {
        this.mtPicker = true;
      },
      closeMtPicker() {
        this.mtPicker = false;
      },
      emitMyTele() {
        this.$emit('tallMyTele', {
          Phone: this.Phone,
          Address: this.Address,
          Province: this.Province,
          City: this.City,
          Area: this.Area
        })
      },
      // 上一步
      theLastStep() {
        window.history.go(-1);
      },
      // 下一步
      nextStep() {
        if (!this.Phone) {
          alert('请输入电话号码');
          return
        }
        if (!this.address) {
          alert('请选择地区');
          return
        }
        if (!this.Address) {
          alert('请输入详细');
          return
        }
        this.emitMyTele();
        this.$router.push({ path: '/info/interest' })
      },
    },
    created() {
      this.Phone = this.info.Phone ? this.info.Phone : '';
      this.address = this.info.Province ? this.info.Province + this.info.City + this.info.Area : '';
      this.Address = this.info.Address ? this.info.Address : '';
    }

  }
</script>

<style scoped>
  .speed {
    width: 80%;
    margin: 0 auto;
    position: relative;
    font-size: .28rem;
  }

  .speed::before {
    content: '';
    display: block;
    border: 1px solid #a0a1a1;
    width: 70%;
    position: absolute;
    top: .08rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

  .speed .subSpeed {
    width: 25%;
    float: left;

    color: #a0a1a1;
    text-align: center;
  }

  .speed .subSpeed.active {
    color: #e4c8a6;
  }

  .speed .subSpeed span {
    display: block;
    height: .2rem;
    width: .2rem;
    border-radius: 50%;
    background: #a0a1a1;
    margin: 0 auto;
  }

  .speed .subSpeed span.active {
    background: #e4c8a6;
  }

  .title {
    font-size: .36rem;
    color: #e7e7e7;
    text-align: center;
    padding-top: .3rem;
  }

  .title span {
    display: inline-block;
    width: .7rem;
    height: .1rem;
    border-top: 1px solid #fff;
  }

  .phone {
    width: 80%;
    margin: .1rem auto;

  }

  input {
    width: 100%;
    font-size: .34rem;
    padding-left: .1rem;
    height: .8rem;
    border: none;
    border-radius: .2rem;
  }

  .address {
    width: 100%;
    font-size: .34rem;
    padding-left: .1rem;
    height: .8rem;
    border: none;
    border-radius: .2rem;
    background: #fff;
    line-height: .8rem;
    margin-top: .2rem;
  }

  .region {
    width: 80%;
    margin: 0 auto;
  }

  .mat {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #fff;
    opacity: 1;
    z-index: 1000;
  }

  .moade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }

  .mtPicker .packerEdit {
    display: inline-block;
    color: #26a2ff;
    width: 40%;
    text-align: center;
    padding-top: .3rem;
    border-bottom: 1px solid #eee;
    font-size: .4rem;
  }

  .edit {
    padding-bottom: .2rem;
  }

  .edit button {
    font-size: .34rem;
    width: 2.2rem;
    height: .86rem;
    background: #bfbfbf;
    border: none;
    border-radius: .2rem;
    margin-left: .7rem;
    margin-top: .5rem;
    /* margin-bottom: 1rem; */
  }

  .edit button:nth-child(2) {
    background: #ebcba7;
  }
</style>