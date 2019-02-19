<template>
  <div class="appUserCenter">
    <!-- 个人中心顶部 -->
    <div class="userCenterTop">
      <div class="centerTitle">
        <h4>个人中心</h4>
        <p>管理你的乌镇之家</p>
        <div>
          <a href="javascript:;">消息</a>
        </div>
      </div>
    </div>
    <!-- 个人中心内容 -->
    <div class="userCenterContent">
      <div class="centerContainer">
        <div class="centerHead">
          <!-- 头像 -->
          <div class="headImg">
            <a href="javascript:;">
              <img src="../assets/home-head.png" alt="个人头像">
            </a>
          </div>
          <!-- 用户名 -->
          <div class="headName">
            <p>{{this.$store.state.uname}}</p>
            <div>
              <a href="javascript:;" class="trueName">实名认证</a>
              <a href="javascript:;" class="qiandao">签到</a>
            </div>
          </div>
        </div>
        <!-- 全部订单，会员，积分 -->
        <div class="centerAlls">
          <div class="centerAllsOrder">
            <p>全部订单</p>
            <a href="javascript:;">点击查看</a>
          </div>
          <div class="centerAllsOrder">
            <p>普通会员</p>
            <a href="javascript:;">点击查看</a>
          </div>
          <div class="centerAllsLast">
            <p>200</p>
            <a href="javascript:;">现有积分</a>
          </div>
        </div>
        <!-- 付款 评价 售后 -->
        <div class="centerNav">
          <ul>
            <li>
              <a href="javascript:;">待付款</a>
              <span>0</span>
            </li>
            <li>
              <a href="javascript:;">已付款</a>
              <span>0</span>
            </li>
            <li>
              <a href="javascript:;">待评价</a>
              <span>0</span>
            </li>
            <li>
              <a href="javascript:;">退款/售后</a>
              <span>0</span>
            </li>
          </ul>
        </div>
        <!-- 菜单栏 -->
        <div class="centerList">
          <ul>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem1">收藏夹</a>
              <span>0件</span>
            </li>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem2">优惠卷</a>
              <span>0张</span>
            </li>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem3">一卡通</a>
              <span></span>
            </li>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem4">卡卷包</a>
              <span></span>
            </li>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem5">居民证</a>
              <span></span>
            </li>
            <li class="arrow">
              <a href="javascript:;" class="aitem arrItem6">会务中心</a>
              <span></span>
            </li>
            <li class="arrow" @click="logOut">
              <a href="javascript:;" class="aitem arrItem7">退出登录</a>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.commit("outUser");
      this.$router.push("/private");
    }
  }
};
</script>
<style>
.appUserCenter {
  margin-bottom: 50px;
}
/* 个人中心顶部 */
.userCenterTop {
  padding: 0 20px;
}
.centerTitle {
  padding: 20px 0;
  position: relative;
  text-align: center;
  border-bottom: 1px solid #7e808a;
}
.centerTitle h4 {
  width: 125px;
  background: url("../assets/img/product212.png") left center no-repeat;
  background-size: 25px;
  padding-left: 25px;
  font-size: 25px;
  font-weight: normal;
}
.centerTitle p {
  text-align: center;
  margin: 0;
}
.centerTitle div {
  position: absolute;
  right: 0;
  bottom: 22px;
}
.centerTitle div a {
  display: inline-block;
  background: url("../assets/img/home-news.png") center top no-repeat;
  background-size: 25px;
  padding-top: 25px;
  color: #7e808a;
}
/* 个人中心详情 */
.userCenterContent {
  padding-top: 20px;
}
.centerContainer {
  padding: 0 20px;
}
/*个人头像*/
.centerHead {
  display: flex;
}
.headImg {
  margin: 0 0 0 10px;
  width: 90px;
  height: 90px;
  border: 1px solid #7e808a;
  border-radius: 50%;
}
.headImg a {
  display: inline-block;
}
.headImg img {
  width: 100%;
}
/*用户名*/
.headName {
  margin-left: 20px;
}
.headName p {
  font-size: 25px;
  color: #2a2a2f;
  margin: 15px 0;
}
.headName a {
  display: inline-block;
  color: #2a2a2f;
  border: 1px solid #2a2a2f;
  font-size: 14px;
  border-radius: 18px;
  padding: 3px 5px;
  margin-right: 10px;
}
/*全部订单，会员，积分*/
.centerAlls {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #eaebf0;
}
.centerAlls p {
  font-size: 20px;
  color: #2a2a2f;
  margin: 0;
  text-align: center;
}
.centerAllsOrder {
  margin: 0;
  padding: 0 25px;
  border-right: 1px solid #d5dae1;
}
.centerAllsOrder a {
  font-size: 15px;
  color: #7e808a;
  background: url("../assets/img/right.png") right center no-repeat;
  background-size: 15px;
  padding-right: 20px;
}
.centerAllsLast a {
  font-size: 15px;
  color: #7e808a;
}
/*付款 评价 售后*/
.centerNav ul {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.centerNav ul li {
  width: 25%;
  position: relative;
}
.centerNav a {
  color: #2a2a2f;
  font-size: 16px;
  width: 100%;
  text-align: center;
}
/*数量*/
.centerNav ul li span {
  position: absolute;
  right: 0;
  top: -5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #ff1431;
  color: #fff;
  border-radius: 10px;
}
/*菜单栏*/
.centerList li {
  padding: 20px 5px;
  border-top: 1px solid #ddd;
}
.arrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.arrow::after {
  content: "";
  width: 12px;
  height: 12px;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  transform: rotate(45deg); /*旋转45度*/
}
.arrow .aitem {
  margin: 0;
  color: #2a2a2f;
  padding-left: 27px;
  background-size: 25px;
}
.arrow span {
  margin-right: 0;
}
.arrItem1 {
  background: url("../assets/img/home-list-b1.png") left center no-repeat;
}
.arrItem2 {
  background: url("../assets/img/home-list-b2.png") left center no-repeat;
}
.arrItem3 {
  background: url("../assets/img/home-list-b3.png") left center no-repeat;
}
.arrItem4 {
  background: url("../assets/img/home-list-b4.png") left center no-repeat;
}
.arrItem5 {
  background: url("../assets/img/home-list-b5.png") left center no-repeat;
}
.arrItem6 {
  background: url("../assets/img/home-list-b6.png") left center no-repeat;
}
.arrItem7 {
  background: url("../assets/img/login-out.png") left center no-repeat;
}
</style>
