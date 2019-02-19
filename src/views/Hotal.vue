<template>
  <div class="appHotal">
    <listTitle :hoName="honame" :hoCount="hocount" ref="hotalDate"></listTitle>
    <div class="hotalInfo" v-for="(item,index) in list" :key="item.hid">
      <!-- 酒店名 -->
      <div class="hotalTop">
        <div class="hotalContent">
          <div class="contentLeft">
            <a href="javascript:;">
              <img :src="item.img_url" :alt="item.name">
              <div class="hotalScore">{{item.score}}分</div>
            </a>
          </div>
          <div class="contentRight">
            <div class="contentLink">
              <a href="javascript:;">
                <h4>{{item.hname}}</h4>
              </a>
              <span></span>
            </div>
            <h5>￥<span>{{item.mixprice}}</span>起</h5>
            <p>{{item.comment}}条评价</p>
            <p>已售{{item.scale}}</p>
          </div>
        </div>
      </div>
      <!-- 酒店房型 -->
      <div class="hotaltBottom">
        <div class="showList">
          <ul :class="item.child.length<3?'hideHotal':(idx===index?'hideHotal':'showHotal')">
            <li v-for="showItem in item.child" :key="showItem.cid">
              <div class="typeName">
                <a href="javascript:;">
                  <p class="ell">{{showItem.cname}}</p>
                </a>
                <p>{{showItem.desc}}</p>
              </div>
              <div class="hotalPrice">
                <p>￥<span>{{showItem.price}}</span></p>
              </div>
              <div class="buyHotal">
                <a href="javascript:;" class="addCar" @click="addCart(item.hid,showItem.cname,showItem.price,item.img_url)">加入购物车</a>
                <a href="javascript:;" class="goBuy" v-if="showItem.count>0">立即购买</a>
                <a href="javascript:;" class="noBuy" v-else :disable="showItem.count<1">预订已满</a>
              </div>
            </li>
          </ul>
          <div class="showMore" @click="changeDown(index)" v-show="item.child.length>2">
            <span v-show="!(idx===index)">展开</span>
            <span v-show="idx===index">收起</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListTitle from "../components/listTitle";
import { Indicator, Toast } from "mint-ui";
export default {
  created() {
    this.getHotal();
  },
  data() {
    return {
      list: [],
      istrue: true,
      idx: "",
      pno: 0,
      pageSize: 6,
      pageCount: 1,
      honame: "酒店",
      hocount: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.moreScroll, false);
    //console.log(this.$refs.hotalDate);
  },
  methods: {
    moreScroll() {
      var that = this;
      //function addScroll() {
      //console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
      //console.log(document.documentElement.scrollTop); // 滚动高度
      //console.log(document.body.offsetHeight); // 文档高度
      // 判断是否滚动到底部
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.offsetHeight
      ) {
        that.getHotal();
      }
      //}
      //window.addEventListener("scroll", addScroll, false);
    },
    getHotal() {
      this.pno++;
      if (this.pno <= this.pageCount) {
        Indicator.open({
          text: "加载中",
          spinnerType: "fading-circle"
        });
        setTimeout(function() {
          Indicator.close();
        }, 500);
      } else {
        Toast({
          message: "没有更多了",
          duration: 500
        });
        return;
      }
      var url = "http://localhost:3060/hotal";
      this.axios
        .get(url, { params: { pno: this.pno, pageSize: this.pageSize } })
        .then(res => {
          //console.log(res);
          this.hocount = res.data.hocount;
          var rows = this.list.concat(res.data.data);
          this.list = rows;
          this.pageCount = res.data.count;
        });
    },
    changeDown(e) {
      /* 下拉菜单*/
      //console.log(e);
      if (this.istrue == true) {
        this.idx = e;
        this.istrue = false;
      } else {
        this.istrue = true;
        this.idx = "";
      }
    },
    addCart(mainId, subName, subPrice, subImg_url) {
      if (!this.$store.state.uid) {
        var myToast = Toast({
          message: "请先【登录】后再操作"
        });
        setTimeout(() => {
          myToast.close();
          this.$router.push("/private");
        }, 1500);
      } else {
        var successToast = Toast({
          message: "成功加入购物车"
        });
        setTimeout(() => {
          successToast.close();
          var shopList = {
            hotalName: this.honame,
            mainId: mainId,
            subName: subName,
            getInDate: this.$refs.hotalDate.inDate,
            getOutDate: this.$refs.hotalDate.outDate,
            subPrice: subPrice,
            subImg_url: subImg_url,
            ischeck: false,
            subCount: 1
          };
          this.$store.commit("getShopList", shopList);
        }, 1000);
      }
    }
  },
  components: {
    listTitle: ListTitle
  },
  destroyed() {
    window.removeEventListener("scroll", this.moreScroll, false);
    //console.log(12);
  }
};
</script>
<style>
.appHotal {
  margin-bottom: 50px;
}
/*酒店*/
.hotalInfo {
  padding-top: 15px;
}
.hotalTop {
  padding: 0 20px 10px;
}
.hotalContent {
  display: flex;
  justify-content: space-between;
}
.contentLeft,
.contentRight {
  margin: 0;
}
/*左边酒店信息*/
.contentLeft a {
  display: inline-block;
  position: relative;
}
.contentLeft img {
  width: 150px;
  height: 150px;
}
.contentLeft .hotalScore {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  right: 0;
  top: 0;
  font-size: 20px;
  /*z-index: 2;*/
}
/*右边酒店信息*/
.contentRight {
  width: 54%;
}
.contentRight h4,
.contentRight h5 {
  font-weight: normal;
}
.contentLink {
  display: flex;
  justify-content: space-between;
}
.contentLink a {
  color: #000;
  margin: 0;
}
.contentLink a:hover {
  color: #000;
}
.contentLink span {
  width: 25px;
  height: 25px;
  background: url("../assets/img/collection.png") no-repeat;
  background-size: cover;
  display: inline-block;
  margin-right: 0;
}
.contentRight h5 {
  font-size: 15px;
  margin-bottom: 30px;
}
.contentRight h5 span {
  font-size: 30px;
  color: #000;
  margin: 0 5px;
}
.contentRight p {
  font-size: 15px;
}
/*酒店房间类型*/
.hotaltBottom {
  background: #f3f4f8;
}
.showList {
  padding: 0 20px;
}
.showHotal {
  height: 210px;
  overflow: hidden;
}
.hideHotal {
  height: auto;
}
.showHotal li,
.hideHotal li {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #d5daf1;
}
.typeName {
  width: 40%;
  margin-left: 0;
}
.typeName a {
  display: block;
}
.typeName a p {
  color: #2a2a2f;
  font-size: 18px;
  /* letter-spacing: 2px; */
}
.typeName > p {
  margin: 0;
}
.hotalPrice {
  margin-left: 0;
}
.hotalPrice p {
  color: #2a2a2f;
  font-size: 15px;
}
.hotalPrice p span {
  font-size: 22px;
  font-weight: bold;
}
/*购物车*/
.buyHotal {
  margin-right: 0;
}
.buyHotal a {
  display: block;
  width: 100px;
  height: 30px;
  text-align: center;
  padding: 5px 0;
  font-size: 5px;
}
.addCar {
  margin-bottom: 10px;
  border: 1px solid #7e808a;
  color: #2a2a2f;
}
.addCar:hover {
  color: #2a2a2f;
}
.goBuy,
.goBuy:hover {
  background: #ff1431;
  color: #fff;
}
.noBuy,
.noBuy:hover {
  background: gray;
  color: #fff;
}
.showMore {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.showMore span:first-child {
  background: url("../assets/img/down.png") right center no-repeat;
  background-size: 15px;
  padding-right: 15px;
}
.showMore span:last-child {
  background: url("../assets/img/up.png") right center no-repeat;
  background-size: 15px;
  padding-right: 15px;
}
</style>
