<template>
  <div class="appShopping">
    <div class="shoppingTop">
      <h4>购物车</h4>
      <p>喜欢就赶紧下单吧</p>
    </div>
    <!-- 用户没登录 -->
    <div v-show="this.$store.state.isLogout || this.$store.getters.optCartList.length == 0" class="noThing">
      <p>你的购物车空空如也 !</p>
    </div>
    <!-- 购物车清单 -->
    <div class="shoppingCart" v-show="this.$store.state.isLogin">
      <div class="container">
        <div class="shoppingList"> 
          <div class="shoppingTitle" v-show="cartData.length!=0">
            <input type="checkbox" class="cbox" v-model="checkall">
            <p>酒店</p>
          </div>
          <!-- 购物车内容 -->
          <div class="shoppingContent" v-for="(item,index) of cartData" :key="index">
            <div class="shoppingCheck">
              <input type="checkbox" class="cbox" v-model="item.ischeck" ref="ischecked" @click="ischeck">
            </div>
            <div class="shoppingDesc">
              <div class="product">
                <!-- 商品左边 -->
                <img :src="item.subImg_url" alt="商品图片">
                <!-- 商品右边 -->
                <div class="productName">
                  <div class="productNameTop">{{item.subName}}<span @click="closeGood(index)"></span></div>
                  <div class="setInDate" >
                    入住：<input type="text" v-model="item.getInDate" @click="chooseInDate()">
                    <!-- <calendar v-model="calendarShow1" :defaultDate="new Date()" @change="handleChange1($event)" ref="handleIndate"></calendar> -->
                  </div>
                  <div class="setOutDate">
                    离店：<input type="text" v-model="item.getOutDate" @click="chooseOutDate()">
                    <!-- <calendar v-model="calendarShow2" :defaultDate="new Date()" @change="handleChange2($event)" ref="handleOutdate"></calendar> -->
                  </div>
                </div>
              </div>
              <!-- 选择数量 -->
              <div class="shoppingChoise">
                <div class="shoppingCount">
                  <button @click="goodSub(index)">-</button>
                  <input type="text" v-model="item.subCount">
                  <button @click="goodAdd(index)">+</button>
                  张
                </div>
                <!-- 优惠卷 -->
                <div class="shoppingCoupon" @click="getCoupon">
                  <span>请选择优惠卷</span>
                  <div></div>
                </div>
              </div>
              <!-- 价钱 -->
              <div class="shoppingPrice">
                <ul>
                  <li>
                    <span>单价</span>
                    <span class="price">{{item.subPrice}}元</span>
                  </li>
                  <li>
                    <span>合计</span>
                    <span class="price">{{item.subCount*item.subPrice}}元</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结算 -->
    <div class="payment">
      <div class="paymentBar">
        <div class="barLeft">
          <input type="checkbox" id="allCheck" class="cbox" v-model="checkall">
          <label for="allCheck">全选</label>
        </div>
        <div class="payMoney">
          <p>应付金额</p><span>￥{{cartTotal}}元</span>
        </div>
      </div>
      <a href="javascript:;" class="submitTotal" @click="submitTotal">去结算</a>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  created() {
    this.getCartData();
  },
  data() {
    return {
      calendarShow1: false,
      calendarShow2: false,
      cartData: [],
      checkall: false,
      sum: 0
    };
  },
  methods: {
    //选入住日期
    /*handleChange1(eve,index) {
      console.log(eve.index)
      var opt = { eve: eve ,index:index};
      // this.$store.commit("chooseInDate", opt);
    },
    //选离店日期
    handleChange2(eve) {
      //console.log(eve);
      var opt = { eve: eve };
      this.$store.commit("chooseOutDate", opt);
    },*/
    chooseInDate() {
      if (this.calendarShow1 == false) {
        this.calendarShow1 = true;
      } else {
        this.calendarShow1 = false;
      }
    },
    chooseOutDate() {
      if (this.calendarShow2 == false) {
        this.calendarShow2 = true;
      } else {
        this.calendarShow2 = false;
      }
    },
    //优惠卷
    getCoupon() {
      Toast({
        message: "该商品无优惠卷",
        duration: 800
      });
    },
    //提交总价
    submitTotal() {
      this.$store.commit("submitTotal");
    },
    //减少数量
    goodSub(idx) {
      //console.log(count);
      //console.log(idx);
      this.$store.commit("substract", idx);
    },
    //增加数量
    goodAdd(idx) {
      //console.log(idx);
      this.$store.commit("increment", idx);
    },
    //删除商品
    closeGood(idx) {
      this.$store.commit("deleteGood", idx);
    },
    //获得商品
    getCartData() {
      this.cartData = this.$store.state.cartList;
      //console.log(this.cartData);
    },
    //单选，反选
    ischeck() {
      //console.log(this.$refs.ischecked);
      var ischecked = this.$refs.ischecked;
      var sum = 0;
      for (var i in ischecked) {
        if (ischecked[i].checked == true) {
          sum += 1;
          this.sum = sum;
        } else {
          sum -= 1;
          this.sum = sum;
        }
      }
      if (this.sum == this.cartData.length) {
        this.checkall = true;
      } else {
        this.checkall = false;
      }
    }
  },
  watch: {
    //全选、全不选
    checkall() {
      if (this.checkall) {
        this.cartData.forEach(ele => {
          ele.ischeck = true;
        });
      } else {
        this.cartData.forEach(ele => {
          ele.ischeck = false;
        });
      }
    }
  },
  computed: {
    //计算总价
    cartTotal() {
      var totalPrice = 0;
      for (var i = 0; i < this.cartData.length; i++) {
        var cartPrice = this.cartData[i].subPrice;
        var cartCount = this.cartData[i].subCount;
        //console.log(this.cartData);
        if (this.cartData[i].ischeck == true) {
          totalPrice += cartPrice * cartCount;
        }
      }
      return totalPrice;
    }
  }
};
</script>
<style>
.appShopping {
  margin-bottom: 110px;
}
/*购物车头部*/
.shoppingTop {
  width: 90%;
  height: 65px;
  border-bottom: 1px solid #ddd;
}
.shoppingTop h4,
.shoppingTop p {
  text-align: center;
}
.shoppingTop h4 {
  margin-top: 20px;
  font-size: 23px;
  font-weight: normal;
  background: url("../assets/img/shopping-cart-title.png") left center no-repeat;
  background-size: 23px 23px;
  width: 100px;
  padding-left: 25px;
  letter-spacing: 0.8px;
}
.shoppingTop p {
  width: 200px;
  font-size: 8px;
}
/*购物清单*/
.noThing {
  padding: 20px;
}
.noThing p {
  font-size: 20px;
  text-align: center;
}
.container {
  padding: 0 15px;
}
input.cbox {
  width: 20px;
  height: 20px;
  -webkit-appearance: none;
  background: url("../assets/img/check.png") left no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
input.cbox:checked {
  background: url("../assets/img/checked.png") left no-repeat;
  background-size: 100%;
  -webkit-appearance: none;
}
.shoppingTitle {
  width: 100%;
  height: 71px;
  padding: 25px 0;
  display: flex;
}
.shoppingTitle p {
  width: 40px;
  margin: 0;
  font-size: 18px;
  color: #000;
}
.shoppingContent {
  width: 100%;
  display: flex;
  padding-bottom: 20px;
}
.shoppingCheck {
  margin: 0;
}
.shoppingDesc {
  width: 90%;
  margin: 0;
}
/*商品左边*/
.product {
  display: flex;
}
.product img {
  width: 140px;
  height: 100px;
  margin: 0 10px 0 0;
  /* border: 1px solid red; */
}
/*商品右边*/
.productName {
  margin-left: 0px;
}
.productNameTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.productNameTop span {
  background: url("../assets/img/close.png") no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  display: block;
  margin-right: 0;
}
.setInDate,
.setOutDate {
  font-size: 16px;
  color: #7e808a;
  margin-top: 10px;
}
.productName div input {
  color: #2a2a2f;
  font-size: 16px;
  outline: none;
  height: auto;
  margin: 0;
  padding: 0;
  width: 110px;
  border: none;
  background: url("../assets/img/format1.png") right center no-repeat;
  background-size: 15px;
  padding-right: 15px;
}
/* 数量 */
.shoppingChoise {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}
.shoppingCount {
  width: 47%;
  height: 40px;
  margin: 0;
}
.shoppingContent .shoppingCount input {
  width: 40px;
  height: 40px;
  text-align: center;
}
.shoppingCount button {
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 0;
}
/* 优惠卷 */
.shoppingCoupon {
  width: 50%;
  display: flex;
  height: 40px;
  border: 1px solid #d5dae1;
  margin: 0;
}
.shoppingCoupon span {
  background: #f3f4f8;
  color: #7e808a;
  width: 80%;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}
.shoppingCoupon div {
  width: 40px;
  height: 40px;
  background: url("../assets/img/format2.png") center center no-repeat;
  background-size: 20px;
  margin: 0;
}
/* 价格 */
.shoppingPrice {
  padding-top: 20px;
}
.shoppingPrice li {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
}
.shoppingPrice li span {
  width: 50%;
}
.price {
  text-align: right;
}
/* 购物车结算 */
.payment {
  padding-left: 15px;
  display: flex;
  position: fixed;
  bottom: 50px;
  width: 100%;
  background: #fff;
}
.paymentBar {
  display: flex;
  align-items: center;
  margin-left: 0;
}
.barLeft {
  margin: 0 20px 0 0;
  height: 30px;
  line-height: 30px;
}
.barLeft input {
  vertical-align: middle;
}
.barLeft label {
  font-size: 17px;
  vertical-align: middle;
}
.payMoney {
  margin: 0;
  display: flex;
  justify-content: center;
}
.payMoney p {
  font-size: 17px;
  margin: 0;
}
.payMoney span {
  margin-left: 10px;
  font-weight: bold;
}
.submitTotal,
.submitTotal:hover {
  text-decoration: none;
  background: #f00;
  display: inline-block;
  width: 30%;
  height: 60px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  margin: 0;
}
</style>
