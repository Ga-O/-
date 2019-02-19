<template>
  <div class="appHome">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img_url" alt="图片已丢失">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 列表 -->
    <ul class="menu">
      <li>
        <a>
          <div class="all meal">
            <img src="../assets/img/meal.png" alt="套餐">
          </div>
          <div>套餐</div>
        </a>
      </li>
      <li>
        <router-link to="/hotal">
          <div class="all hotal">
            <img src="../assets/img/hotal.png" alt="酒店">
          </div>
          <div>酒店</div>
        </router-link>
      </li>
      <li>
        <a>
          <div class="all ticket">
            <img src="../assets/img/ticket.png" alt="票务">
          </div>
          <div>票务</div>
        </a>
      </li>
      <li>
        <a>
          <div class="all food">
            <img src="../assets/img/food.png" alt="美食">
          </div>
          <div>美食</div>
        </a>
      </li>
      <li>
        <a>
          <div class="all we">
            <img src="../assets/img/we.png" alt="美食">
          </div>
          <div>关于我们</div>
        </a>
      </li>
      <li>
        <a>
          <div class="all tel">
            <img src="../assets/img/tel.png" alt="美食">
          </div>
          <div>联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  created() {
    this.getbanner();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getbanner() {
      var url = "http://localhost:3060/bannerlist";
      this.axios.get(url).then(res => {
        //console.log(res);
        this.list = res.data;
      });
    }
  }
};
</script>
<style>
/*轮播图*/
.appHome .mint-swipe {
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}
/*9宫格*/
.menu {
  width: 100%;
  height: 420px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 50px;
  background: #fff;
}
.menu li {
  width: 50%;
  height: 140px;
}
.all {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.meal {
  background: #1296db;
}
.hotal {
  background: #f00;
}
.ticket {
  background: #ff6600;
}
.food {
  background: #d4237a;
}
.we {
  background: #00f;
}
.tel {
  background: #ff0;
}
.menu div:nth-child(2) {
  height: 40px;
  line-height: 40px;
}
.menu li img {
  width: 60px;
}
.menu li a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
}
</style>
