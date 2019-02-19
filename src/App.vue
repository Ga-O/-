<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <mt-header fixed title="乌镇旅游"></mt-header>
    <router-view></router-view>
    <nav class="mui-bar mui-bar-tab">
      <!-- <a :class="['mui-tab-item',{'mui-active':idx==1}]" @click="handle(1)" to="/"> -->
      <router-link class='mui-tab-item' to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <!-- </a> -->
      <!-- <a :class="['mui-tab-item',{'mui-active':idx==2}]" @click="handle(2)" to="/commend"> -->
      <router-link class='mui-tab-item' to="/commend">
        <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
        <span class="mui-tab-label">推荐</span>
      </router-link>
      <!-- </a> -->
      <!-- <a :class="['mui-tab-item',{'mui-active':idx==3}]" @click="handle(3)" to="/hotal"> -->
      <router-link class='mui-tab-item' to="/shopping">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">{{this.$store.state.isLogin?this.$store.state.cartList.length:0}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <!-- </a> -->
      <!-- <a :class="['mui-tab-item',{'mui-active':idx==4}]" @click="handle(4)" to="/private"> -->
      <router-link class='mui-tab-item' :to="this.$store.state.uid?'/userCenter':'/private'">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
      <!-- </a> -->
	  </nav>
  </div>
</template>
<script>
export default {
  mounted() {
    //this.handle(this.idx);
  },
  data() {
    return {
      idx: 1
    };
  },
  methods: {
    /*handle(n) {
      this.idx = n;
      if (n == 1) {
        this.$router.push("/home");
        this.idx = 1;
      } else if (n == 2) {
        this.$router.push("/commend");
        this.idx = 2;
      } else if (n == 3) {
        this.$router.push("/Shopping");
        this.idx = 3;
      } else if (n == 4 && this.$store.state.uid) {
        this.$router.push("/userCenter");
        this.idx = 4;
      } else {
        this.$router.push("/private");
        this.idx = 4;
      }
    }*/
  }
};
</script>
<style>
* {
  margin: 0 auto;
  padding: 0;
}
html body {
  background: #fff;
}
#app {
  padding-top: 40px;
  overflow-x: hidden;
  width: 100%;
  background: #fff;
}
#app .mint-header.is-fixed {
  z-index: 10;
}
ul {
  list-style: none;
}
/* 截取字符*/
.ell {
  overflow: hidden; /*超过范围隐藏*/
  white-space: nowrap; /**不允许换行*/
  text-overflow: ellipsis; /**超出部分添加。。。*/
}
a {
  display: inline-block;
}
/*tabbar的样式*/
.mui-tab-item.router-link-exact-active.router-link-active {
  color: #007aff;
}
</style>
