<template>
  <div class="appCommend">
    <div class="commendMeal" v-for="item in list" :key="item.id">
      <h4 :style="{'background':'url('+item.img_url+') left center no-repeat','background-size':'30px 30px'}">{{item.title}}</h4>
      <p>{{item.del}}</p>
      <ul v-if="item.id<3">
        <li v-for="citem in item.child" :key="citem.id">
          <a href="javascript:;" class="productLink">
            <img :src="citem.img_url" alt="图片丢失">
            <div class="productInfo">
              <h3>￥<span>{{citem.nprice}}</span>起</h3>
              <div v-if="citem.oprice">原价：￥{{citem.oprice}}</div>
              <p>{{citem.del}}</p>
            </div>
            <div class="zzbg">
              <img src="../assets/commbg.png" alt="遮罩背景">
            </div>
          </a>
        </li>
      </ul>
      <!-- <a href="#">更多</a> -->
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" v-if="item.id==3">
        <mt-swipe-item v-for="citem in item.child" :key="citem.id">
          <div>
            <img :src="citem.img_url" alt="游记">
            <div class="travalDesc">
              <p>{{citem.del}}</p>
              <p>{{citem.desc}}</p>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>	
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getcommend();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getcommend() {
      var url = "http://localhost:3060/commend";
      this.axios.get(url).then(res => {
        //console.log(res.body);
        //console.log(res)
        this.list = res.data;
      });
    }
  }
};
</script>
<style scoped>
.commendMeal {
  text-align: center;
}
.commendMeal h4 {
  color: #000;
  padding-left: 35px;
  margin-top: 30px;
  display: inline-block;
  font-size: 30px;
  font-weight: normal;
}
.productLink {
  display: block;
  position: relative;
  color: #fff;
  width: 100%;
}
.productLink img {
  width: 100%;
  vertical-align: top;
}
.productInfo {
  position: absolute;
  z-index: 5;
  bottom: 20px;
  padding-left: 20px;
}
.productInfo p {
  color: #fff;
}
.zzbg img {
  position: absolute;
  height: 220px;
  bottom: 0;
  left: 0;
}
.productInfo h3 {
  font-weight: normal;
}
.productInfo h3 span {
  font-size: 45px;
}
.productInfo div {
  font-size: 12px;
  text-align: left;
  line-height: 100%;
  text-decoration: line-through;
}
.productInfo p {
  font-size: 16px;
  text-align: left;
  margin: 0;
}
/*轮播图*/
.commendMeal .mint-swipe {
  height: 150px;
  margin-bottom: 60px;
}
.mint-swipe .mint-swipe-item > div {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
}
.mint-swipe img {
  width: 100px;
  height: 100px;
}
.travalDesc {
  width: 250px;
  height: 120px;
}
.travalDesc p {
  text-align: left;
}
.travalDesc p:first-child {
  color: #000;
  font-size: 18px;
}
.commendMeal .mint-swipe-indicator.is-active {
  background: #696969;
}
</style>
