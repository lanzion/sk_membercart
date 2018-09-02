<template>
  <div class="bir">
    <div class="speed clearfix">
      <div class="subSpeed active">
        <span class="active"></span>
        <p>姓名性别</p>
      </div>
      <div class="subSpeed active">
        <span class="active"></span>
        <p>生日</p>
      </div>
      <div class="subSpeed">
        <span></span>
        <p>电话地址</p>
      </div>
      <div class="subSpeed">
        <span></span>
        <p>感兴趣</p>
      </div>
    </div>
    <div class="title">
      <span></span> &nbsp; 生 &nbsp; 日 &nbsp;
      <span></span>
    </div>
    <div class="date">
      <div class="inp">
        <div class="address" @click='openPicker'>{{date?date:'请输入出生日期'}}</div>
      </div>
      <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" :startDate='startDate'>
      </mt-datetime-picker>
    </div>
    <div class="edit">
      <button @click='theLastStep'>上一步</button>
      <button @click='nextStep'>下一步</button>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        pickerValue: new Date(),
        startDate: new Date(1945, 0, 1),
        date: '',
      }

    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      formatDate(date) {
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      },
      handleConfirm() {
        let a = this.pickerValue
        this.pickerValue = this.formatDate(this.$refs.picker.value)
        this.date = this.formatDate(this.$refs.picker.value)
      },
      emitBirthday() {
        this.$emit('tellMyBirthday', {
          Birthday: this.date,
        })
      },
      // 下一步
      nextStep() {
        if (!this.date) {
          alert('请输入生日');
          return
        }
        this.emitBirthday();
        this.$router.push({ path: '/info/tele' })
      },
      // 上一步
      theLastStep() {
        window.history.go(-1);
      }
    },
    created() {
      this.date = this.info.Birthday ? this.info.Birthday : ''
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
    padding-top: 1rem;
  }

  .title span {
    display: inline-block;
    width: .7rem;
    height: .1rem;
    border-top: 1px solid #fff;
  }

  .date .inp {
    width: 80%;
    margin: 0 auto;
    padding-top: 1rem;
  }

  .date .inp input {
    width: 100%;
    height: .8rem;
    border-radius: .2rem;
    font-size: .32rem;
    padding-left: .1rem;
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

  .edit {}

  .edit button {
    font-size: .34rem;
    width: 2.2rem;
    height: .86rem;
    background: #bfbfbf;
    border: none;
    border-radius: .2rem;
    margin-left: .7rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .edit button:nth-child(2) {
    background: #ebcba7;
  }
</style>