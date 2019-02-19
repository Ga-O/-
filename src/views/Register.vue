<template>
  <div class="appRegister">
    <div class="regTitle">
      <div>
        <router-link to="/private" class="loginUp">登录</router-link>
      </div>
      <h4>账户注册</h4>
      <p>开启乌镇之旅</p>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.don();
  },
  data() {
    return {};
  },
  methods: {
    don() {
      console.log(this.$router);
    }
  }
};
</script>
<style>
.appRegister {
  padding: 0 20px;
}
.loginUp {
  display: inline-block;
}
.regTitle h4 {
  background: url("../assets/img/register-title.png") left center no-repeat;
  background-size: 25px 25px;
  color: #2a2a2f;
  padding-left: 25px;
  margin-top: 30px;
  display: inline-block;
  font-size: 25px;
  font-weight: normal;
}
.regTitle p {
  margin-top: 10px;
}
</style>
