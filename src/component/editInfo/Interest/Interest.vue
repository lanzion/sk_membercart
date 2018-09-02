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
      <div class="subSpeed active">
        <span class="active"></span>
        <p>感兴趣</p>
      </div>
    </div>
    <div class="title">
      <span></span> &nbsp; 感 &nbsp; 兴 &nbsp; 趣 &nbsp;
      <span></span>
      <div>( 可 多 选 )</div>
    </div>
    <div class="inte_list clearfix">
      <div class="inte" v-for="item in inteList" :key="item.Recid">
        <div class="inte_img">
          <img :src="item.imgUrl" alt="">
          <img class="gou" src="../../../assets/images/gou.png" alt="">
        </div>
        <div class="text">{{item.Title}}</div>
        <input type="checkbox" name="gan" id="" @click='IsInterst' :data-recid='item.Recid'>
      </div>

    </div>
    <div class="edit">
      <button @click='theLastStep'>上一步</button>
      <button @click='nextStep'>完 成</button>
    </div>
  </div>
</template>
<script>
  import MbrService from "../../../services/mbrservice.js";
  import tagService from "../../../services/tag-service.js";


  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        IsGou: false,
        inteList: [],
        IsInterest: [],
        infoData: {}
      }
    },
    watch: {

    },
    methods: {
      // 选择
      IsInterst(e) {
        var gou = document.querySelector('.gou');
        var recid = e.target.getAttribute('data-recid')
        this.gatIsInterest()
        if (e.target.checked) {
          e.target.parentNode.classList.add('active');
          e.target.parentNode.firstChild.lastChild.style.display = 'block';
        } else {
          e.target.parentNode.classList.remove('active');
          e.target.parentNode.firstChild.lastChild.style.display = 'none';
        }
      },
      gatIsInterest() {
        let inpt = document.getElementsByTagName('input');
        this.IsInterest = []
        for (let i = 0; i < inpt.length; i++) {
          if (inpt[i].checked) {
            this.IsInterest.push(inpt[i].getAttribute('data-recid'))
          }

        }
      },
      LoadTagInfo() {
        new tagService().getTagInfo({}).then(res => {
          if (res.ErrorCode == 0) {
            for (let i = 0; i < res.Data.length; i++) {
              res.Data[i].imgUrl = JSON.parse(res.Data[i].ImageUrl)[0].ServerUrl + JSON.parse(res.Data[i].ImageUrl)[0].FilePath
            }
            this.inteList = res.Data;
            this.isSelect()
          }
        })
      },
      // 默认选中
      isSelect() {
        new MbrService().LaodMemberInfo({}).then(res=>{
          if (res.ErrorCode == 0){
            this.IsInterest = res.Data.TagId;
            var arr = res.Data.TagId.split(',');
            arr.pop();
            arr.shift();
            this.IsInterest = arr
            let inpt = document.getElementsByTagName('input');
            if (arr.length <= 0) {
              return
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < inpt.length; j++) {
                if (parseInt(arr[i]) == inpt[j].getAttribute('data-recid')) {
                  inpt[j].checked = true
                  inpt[j].parentNode.classList.add('active')
                  inpt[j].parentNode.firstChild.lastChild.style.display = 'block';
                }
              }

            }
          }
        })
        
      },
      emitMyTag() {
        this.$emit('tallMyTag', {
          TagId: this.IsInterest
        })
      },
      // 上一步
      theLastStep() {
        window.history.go(-1);
      },
      // 完成
      nextStep() {
        if (this.IsInterest.length == 0) {
          alert('请选择您感兴趣的')
        } else {
          // this.emitMyTag();
          this.infoData.TagId = ',' + this.IsInterest.join(',') + ',';
          new MbrService().BindMemberInfo(this.infoData).then(res => {
            if (res.ErrorCode == 0) {
              this.$router.push({ path: '/home' })
            }
          })
        }
      }
    },
    created() {
      this.LoadTagInfo()
      this.infoData = this.info;
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

  .title div {
    font-size: .28rem;
    padding-top: .2rem;
  }

  .inte {
    width: 25%;
    float: left;
    color: #b5b5b5;
    font-size: .3rem;
    text-align: center;
    margin-top: .3rem;
    position: relative;
  }

  .inte input[type=checkbox] {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0;
    opacity: 0;
  }

  .inte .text {
    padding-top: .1rem;
  }

  .inte .inte_img {
    width: .5rem;
    height: .5rem;

    border-radius: 50%;
    padding: .2rem;
    background: #b5b5b5;
    margin: 0 auto;
    position: relative;
  }

  .inte .inte_img img {
    width: 80%;
    /* height: 100%; */
  }

  .inte .inte_img .gou {
    position: absolute;
    width: .4rem;
    bottom: .01rem;
    right: .01rem;
    display: none;
  }

  .inte.active {
    color: #debd99;
  }

  .inte.active .inte_img {
    background: #debd99;
  }

  .edit {
    padding-top: .3rem;
    padding-bottom: .3rem;
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