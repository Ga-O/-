import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: sessionStorage.getItem("state")
    ? JSON.parse(sessionStorage.getItem("state"))
    : {
        isLogin: false, //登录
        isLogout: true, //注销
        uid: null, //用户id
        uname: null, //用户名
        cartList: [], //购物车清单
        buyList: []
      },
  mutations: {
    //用户登录
    setUser(state, privateMsg) {
      //登录
      //console.log(privateMsg);
      state.uid = privateMsg.uid;
      state.uname = privateMsg.uname;
      state.isLogin = true;
      state.isLogout = false;
      //console.log(state);
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    //用户注销
    outUser(state) {
      //注销登录
      state.uid = null;
      state.uname = null;
      state.isLogin = false;
      state.isLogout = true;
      //state.cartList = [];
      //console.log(state);
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    //购物车商品
    getShopList(state, hotalMsg) {
      //添加到购物车
      //console.log(hotalMsg)
      //购物车商品为0，加入购物车
      if (state.cartList.length == 0) {
        //console.log(1);
        state.cartList.push(hotalMsg);
      } else {
        //购物车不为0，判断是否添加同样商品
        var arrCart = state.cartList;
        for (var i = 0; i < state.cartList.length; i++) {
          //添加同样商品只增加数量
          if (
            state.cartList[i].mainId == hotalMsg.mainId &&
            state.cartList[i].subName == hotalMsg.subName
          ) {
            state.cartList[i].subCount++;
            //console.log(1);
            return;
          }
        }
        //如果不是同样商品，添加商品
        if (arrCart.length == state.cartList.length) {
          state.cartList.push(hotalMsg);
        }
        //console.log(state.cartList);
      }
      /*state.cartList.forEach((cart, index)=>{
        cart.index = index;
      });*/
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    //删除购物车
    deleteGood(state, shoppingMsg) {
      //console.log(shoppingMsg);
      state.cartList.splice(shoppingMsg, 1);
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    //添加数量
    increment(state, idx) {
      if (state.cartList.length > 0 && state.cartList[idx].subCount < 20) {
        state.cartList[idx].subCount++;
        sessionStorage.setItem("state", JSON.stringify(state));
      }
      //console.log(1);
    },
    //减少数量
    substract(state, idx) {
      if (state.cartList.length > 0 && state.cartList[idx].subCount > 1) {
        state.cartList[idx].subCount--;
        sessionStorage.setItem("state", JSON.stringify(state));
      }
    },
    //提交购物车
    submitTotal(state) {
      console.log(state.cartList.length)
      for (var i = state.cartList.length; i >= 0; i--) {
        console.log(i)
        if (state.cartList[i].ischeck == true) {
          //console.log(state.buyList)
          state.buyList.push(state.cartList[i]);
          state.cartList.splice(i, 1);
        }
      }
      sessionStorage.setItem("state", JSON.stringify(state));
    }
    //选择入住日期
    /*chooseInDate(state, Indate) {
      //console.log(Indate)
      var indate = Indate.eve;
      var indateIdx = Indate.idx;
      var y = indate.getFullYear();
      var m = indate.getMonth() + 1;
      var d = indate.getDate();
      //7.3月日格式判断
      m < 10 && (m = "0" + m);
      d < 10 && (d = "0" + d);
      //7.4拼接字符串返回
      //console.log(`${y}-${m}-${d}`)
      //console.log(state.cartList[indateIdx])
      //console.log(indateIdx);
      state.cartList[indateIdx].getInDate = `${y}-${m}-${d}`;
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    //选择离店日期
    chooseOutDate(state, Outdate) {
      //console.log(Outdate);
      var outdate =   Outdate.eve;
      var outdateIdx = Outdate.idx;
      var y = outdate.getFullYear();
      var m = outdate.getMonth() + 1;
      var d = outdate.getDate();
      //7.3月日格式判断
      m < 10 && (m = "0" + m);
      d < 10 && (d = "0" + d);
      //7.4拼接字符串返回
      //console.log(`${y}-${m}-${d}`)
      //console.log(state.cartList[outdateIdx])
      state.cartList[outdateIdx].getOutDate = `${y}-${m}-${d}`;
      sessionStorage.setItem("state", JSON.stringify(state));
    }*/
  },
  getters: {
    optCartList(state) {
      return state.cartList;
    }
  }
});
