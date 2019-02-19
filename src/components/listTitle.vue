<template>
  <div class="appListTitle">
    <div class="listTop">
      <div class="titleTop">
        <h4>{{hoName}}</h4>
        <p>{{hoCount}}件产品</p>
      </div>
      <div class="titleMid">
        <!-- 选择日期 -->
        <div class="titleMidLeft">
          <p>入住时间</p>
          <input type="text" @click="dateChoose1" v-model="inDate">
          <calendar v-model="calendarShow1" :defaultDate="defaultDate1" @change="handleChange1($event)"></calendar>
        </div>
        <div class="titleMidRight">
          <p>离店时间</p>
          <input type="text" @click="dateChoose2" v-model="outDate">
          <calendar v-model="calendarShow2" :defaultDate="defaultDate1" @change="handleChange2($event)"></calendar>
        </div>
      </div>
      <!-- 酒店筛选 -->
      <div  class="titleBottom">
        <ul>
          <li>
            <span>酒店类别</span>
            <span class="listIcon"></span>
          </li>
          <li>
            <span>综合排序</span>
            <span class="listIcon"></span>
          </li>
          <li>
            <span>更多筛选</span>
            <span class="listIcon"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.date();
  },
  data() {
    return {
      calendarShow1: false,
      calendarShow2: false,
      defaultDate1: new Date(),
      inDate: "",
      outDate: ""
    };
  },
  methods: {
    date() {
      var data = this.defaultDate1;
      var y = data.getFullYear();
      var m = data.getMonth() + 1;
      var d = data.getDate();
      //7.3月日格式判断
      m < 10 && (m = "0" + m);
      d < 10 && (d = "0" + d);
      //7.4拼接字符串返回
      var indate = `${y}-${m}-${d}`;
      //console.log(indate);
      this.inDate = indate;
      var d1 = new Date(indate);
      var d2 = new Date(d1);
      var d3 = d2.getDate() + 1;
      d2.setDate(d3);
      var yy = d2.getFullYear();
      var mm = d2.getMonth() + 1;
      var dd = d2.getDate();
      //7.3月日格式判断
      mm < 10 && (mm = "0" + mm);
      dd < 10 && (dd = "0" + dd);
      //7.4拼接字符串返回
      //var outdate = `${y}-${m}-${d}`;
      //this.outDate = d2.toLocaleDateString();
      this.outDate = `${yy}-${mm}-${dd}`;
    },
    dateChoose1() {
      this.calendarShow1 = true;
      //console.log(this.defaultDate1);
    },
    dateChoose2() {
      this.calendarShow2 = true;
      //console.log(this.defaultDate);
    },
    handleChange1(e) {
      var y1 = e.getFullYear();
      var m1 = e.getMonth() + 1;
      var d1 = e.getDate();
      //7.3月日格式判断
      m1 < 10 && (m1 = "0" + m1);
      d1 < 10 && (d1 = "0" + d1);
      //7.4拼接字符串返回
      var indate = `${y1}-${m1}-${d1}`;
      this.inDate = indate;
    },
    handleChange2(e) {
      var y2 = e.getFullYear();
      var m2 = e.getMonth() + 1;
      var d2 = e.getDate();
      //7.3月日格式判断
      m2 < 10 && (m2 = "0" + m2);
      d2 < 10 && (d2 = "0" + d2);
      //7.4拼接字符串返回
      var indate1 = `${y2}-${m2}-${d2}`;
      this.outDate = indate1;
    }
  },
  props: ["hoName", "hoCount"]
};
</script>
<style>
.listTop {
  padding: 0 15px;
}
.titleTop {
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.titleTop h4 {
  background: url("../assets/product2.png") left center no-repeat;
  background-size: 25px;
  font-size: 28px;
  font-weight: normal;
  display: inline-block;
  padding-left: 25px;
}
.titleTop p {
  text-align: center;
  margin: 0;
}
.titleMid {
  display: flex;
  padding: 10px 0;
}
.title div {
  width: 50%;
}
.titleMid > div > p {
  text-align: center;
}
.titleMid > div > input {
  margin: 0;
  text-align: center;
}
.titleBottom {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.titleBottom ul {
  display: flex;
  font-size: 18px;
}
.listIcon {
  background: url("../assets/img/format1.png") no-repeat;
  background-size: cover;
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-left: 5px;
}
</style>
