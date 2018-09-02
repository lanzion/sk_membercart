<template>
  <div>
    <div class="speed clearfix">
      <div class="subSpeed active">
        <span class="active"></span>
        <p>姓名性别</p>
      </div>
      <div class="subSpeed">
        <span></span>
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
      <span></span> &nbsp; 性 &nbsp; 别 &nbsp;
      <span></span>
    </div>
    <div class="portrait clearfix">
      <div class="por_left por active" @click='IsMen'>
        <div class="por_img">
          <img src="../../../assets/images/men.png" alt="">
          <img class="gou" src="../../../assets/images/gou.png" alt="" v-if='isPortrait==1'>
        </div>
        <div>男</div>
      </div>
      <div class="por_right por" @click='IsGirl'>
        <div class="por_img">
          <img src="../../../assets/images/girl.png" alt="">
          <img class="gou" src="../../../assets/images/gou.png" alt="" v-if='isPortrait==2'>
        </div>
        <div>女</div>
      </div>
    </div>
    <div class="title">
      <span></span> &nbsp; 性 &nbsp; 名 &nbsp;
      <span></span>
    </div>
    <div class="input">
      <input type="text" name="menName" placeholder="请输入姓名" v-model="isName" value="isName">
    </div>
    <div class="btn">
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
        isPortrait: 1,
        isName: '',
        infoData: 'info'
      }
    },
    methods: {
      IsMen() {
        this.isPortrait = 1;
      },
      IsGirl() {
        this.isPortrait = 2;
      },
      emitName() {
        this.$emit('tellMyName', {
          Sex: this.isPortrait,
          Name: this.isName
        })
      },
      nextStep() {
        if (!this.isName) {
          alert('请输入姓名');
          return
        }
        this.emitName();
        this.$router.push({ path: '/info/birthday' })
      }

    },
    watch: {
      isPortrait: function (isPortrait) {
        var a = document.querySelector('.por_left');
        var b = document.querySelector('.por_right');
        if (isPortrait == 1) {
          a.classList.add('active');
          b.classList.remove('active');
        };
        if (isPortrait == 2) {
          b.classList.add('active');
          a.classList.remove('active');
        }
      },

    },
    created() {
      this.isPortrait = this.info.Sex ? this.info.Sex : 1
      this.isName = this.info.Name ? this.info.Name : ''
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

  .portrait {
    padding-top: .8rem;
    position: relative;
  }

  .portrait::before {
    content: '';
    position: absolute;
    width: 1px;
    height: .4rem;
    background: #e3c39f;
    top: 1.5rem;
    left: 50%;
  }

  .portrait .por {
    width: 50%;
    float: left;
    font-size: .32rem;
    text-align: center;
    color: #b5b5b5;
  }

  .portrait .por_img {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: #b5b5b5;
    margin: 0 auto;
    padding: .3rem;
    margin-bottom: .3rem;
    position: relative;
  }

  .portrait .por.active .por_img {
    background: #e3c39f;
  }

  .portrait .por.active {
    color: #e3c39f;
  }

  .portrait .por_img .gou {
    position: absolute;
    bottom: .05rem;
    right: .05rem;
    width: .5rem;
  }

  .input {
    padding: .5rem 1rem;
    font-size: .26rem;
  }

  .input input {
    width: 100%;
    height: .8rem;
    border-radius: .2rem;
    padding-left: .1rem;
    border: none;
  }

  .btn {
    width: 3rem;
    height: .8rem;
    margin: 0 auto;
    font-size: .34rem;
    padding-bottom: .5rem;
  }

  .btn button {
    width: 100%;
    height: 100%;
    border: none;
    background: #eacaa7;
    color: #766656;
    border-radius: .2rem;
  }
</style>