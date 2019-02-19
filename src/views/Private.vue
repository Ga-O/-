<template>
  <div class="appPrivate">
    <!-- 用户未登录界面 -->
    <div class="loginTop">
      <table></table>
      <h4>用户登录</h4>
      <p>开启乌镇之旅</p>
      <div class="loginTap">
        <div @click="handleTab(0)" :class="{active:istab===0}">
          <a href="javascript:;" class="border">账户登录</a>
        </div>
        <div @click="handleTab(1)" :class="{active:istab===1}">
          <a href="javascript:;">手机动态码登录</a>
        </div>
      </div>
    </div> 
    <div class="loginBottom">
      <div class="loginContainer">
        <!-- 密码登录 -->
        <div class="loginForm" v-show="istab===0">
          <!-- <form action="#"> -->
            <p>账号</p>
            <input type="text" placeholder="手机号/用户名/邮箱" name="uname" v-model="uname">
            <p>密码</p>
            <input type="password" placeholder="密码(6-18位数字加字母)" name="upwd" v-model="upwd">
            <p>验证码</p>
            <div class="code">
              <input type="text" placeholder="输入右图显示的验证码" name="yzm" v-model="yzm">
              <canvas width="110" height="50" @click="changeyzm" class="yzmbg">{{code}}</canvas>
            </div>
            <button class="loginBtn" @click="subbtn">登录</button>
          <!-- </form> -->
        </div>
        <!-- 动态码登录 -->
        <div class="loginForm"  v-show="istab===1">
          <!-- <form action="#"> -->
            <p>手机号</p>
            <input type="text" placeholder="请输入您的手机号码" name="uphone" v-model="uphone">
            <p>验证码</p>
            <div class="code">
              <input type="text" placeholder="输入右图显示的验证码" name="yzm" v-model="yzm">
              <canvas width="110" height="50" @click="changeyzm" class="yzmbg">{{code}}</canvas>
            </div>
            <p>动态码</p>
            <div class="code">
              <input type="text" placeholder="输入获取的动态码" name="dtm" v-model="dtm">
              <span class="dtmbg">获取动态验证码</span>
            </div>
            <button class="loginBtn" @click="subbtn">登录</button>
          <!-- </form> -->
        </div>
        <div class="loginLink">
          <div>
            <a href="javascript:;" class="border1">忘记密码</a>
          </div>
          <div>
            <router-link to="/register">免费注册</router-link>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
import { Toast } from "mint-ui";
//import { mapState, mapMutations, mapActions } from "vuex";
//console.log(mapActions);
export default {
  created() {},
  mounted() {
    this.changeyzm();
  },
  data() {
    return {
      istab: 0,
      uname: "",
      upwd: "",
      uphone: "",
      yzm: "",
      dtm: "",
      code: ""
    };
  },
  methods: {
    handleTab(e) {
      this.istab = e;
    },
    subbtn() {
      var uname = this.uname;
      var upwd = this.upwd;
      //var uphone = this.uphone;
      var yzm = this.yzm.toLowerCase();
      //var dtm = this.dtm;
      var code = this.code.toLowerCase();
      if (this.istab == 0) {
        var url = "http://localhost:3060/login";
        if (yzm == "" || yzm != code) {
          Toast("验证码错误");
        } else {
          this.axios.get(url, { params: { uname, upwd } }).then(res => {
            //console.log(res);
            if (res.data.code == 1) {
              this.$store.commit("setUser", res.data.data);
              this.$router.push("/userCenter");
            } else {
              Toast("用户名或密码有误");
            }
          });
        }
      }
    },
    changeyzm() {
      this.code = "";
      var ca = document.getElementsByTagName("canvas");
      var c3 = ca[0];
      var c4 = ca[1];
      var ctx1 = c3.getContext("2d");
      var ctx2 = c4.getContext("2d");
      ctx1.fillStyle = rc(180, 230);
      ctx2.fillStyle = rc(180, 230);
      ctx1.fillRect(0, 0, 110, 50);
      ctx2.fillRect(0, 0, 110, 50);
      var pool =
        "ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789";
      for (var i = 0; i < 4; i++) {
        var c = pool[rn(0, pool.length)];
        this.code += c;
        ctx1.textBaseline = "top";
        ctx2.textBaseline = "top";
        var fs = rn(30, 40);
        ctx1.font = fs + "px SimHei";
        ctx2.font = fs + "px SimHei";
        ctx1.fillStyle = rc(30, 80);
        ctx2.fillStyle = rc(30, 80);
        ctx1.fillText(c, 30 * i, 0);
        ctx2.fillText(c, 30 * i, 0);
      }
      for (var i2 = 0; i2 < 5; i2++) {
        ctx1.beginPath();
        ctx2.beginPath();
        ctx1.strokeStyle = rc(0, 230);
        ctx2.strokeStyle = rc(0, 230);
        ctx1.moveTo(rn(0, 110), rn(0, 50));
        ctx2.moveTo(rn(0, 110), rn(0, 50));
        ctx1.lineTo(rn(0, 110), rn(0, 50));
        ctx2.lineTo(rn(0, 110), rn(0, 50));
        ctx1.stroke();
        ctx2.stroke();
      }
      //4:创建50多个干扰点
      for (var i3 = 0; i3 < 50; i3++) {
        ctx1.fillStyle = rc(0, 255);
        ctx2.fillStyle = rc(0, 255);
        ctx1.beginPath();
        ctx2.beginPath();
        ctx1.arc(rn(0, 110), rn(0, 50), 1, 0, 2 * Math.PI);
        ctx2.arc(rn(0, 110), rn(0, 50), 1, 0, 2 * Math.PI);
        ctx1.fill();
        ctx2.fill();
      }
      function rn(min, max) {
        var n = Math.random() * (max - min) + min;
        return Math.floor(n);
      }
      function rc(min, max) {
        var r = rn(min, max);
        var g = rn(min, max);
        var b = rn(min, max);
        return `rgb(${r},${g},${b})`;
      }
    }
  }
};
</script>
<style>
.appPrivate {
  margin-bottom: 50px;
}
.loginTop {
  background: url("../assets/login-top-bg.png") no-repeat;
  background-size: cover;
  height: 170px;
  text-align: center;
}
.loginTop h4 {
  background: url("../assets/login-title.png") left center no-repeat;
  background-size: 30px 30px;
  color: #fff;
  padding-left: 40px;
  margin-top: 30px;
  display: inline-block;
  font-size: 30px;
  font-weight: normal;
}
.loginTop p {
  color: #fff;
  margin-top: 10px;
}
.border {
  border-right: 1px solid #fff;
}
.loginTap {
  width: 100%;
  height: 72px;
  display: flex;
  overflow: hidden;
}
.loginTap div {
  width: 50%;
  text-align: center;
  height: auto;
  line-height: 30px;
}
.loginTap div a {
  display: inline-block;
  width: 100%;
  height: 30px;
  color: #fff;
}
.active {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.active::after {
  content: "";
  background: #fff;
  height: 15px;
  width: 15px;
  transform: rotate(45deg);
}
.loginBottom {
  background: #fff;
  padding-top: 15px;
  width: 100%;
  height: auto;
}
.loginContainer {
  padding: 0 15px;
}
.loginForm p {
  font-size: 16px;
  color: #000;
  margin: 0;
  padding: 10px 0;
}
.loginContainer .loginForm input {
  height: 50px;
  background: #f3f4f8;
}
.code {
  display: flex;
  height: 50px;
  margin-bottom: 15px;
}
.yzmbg {
  margin: 0;
  border: 1px solid #ccc;
}
.dtmbg {
  margin: 0;
  height: 50px;
  width: 110px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
  font-size: 12px;
}
.loginForm .code input {
  width: 235px;
}
.loginBtn {
  background: #26a2ff;
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
}
.loginLink {
  display: flex;
  height: 81px;
}
.loginLink div {
  width: 50%;
  text-align: center;
  line-height: 80px;
}
.loginLink a {
  color: #000;
  display: inline-block;
  height: 30px;
  width: 100%;
  line-height: 30px;
}
.border1 {
  border-right: 1px solid #aaa;
}
</style>
