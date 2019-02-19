const express = require("express");
const pool=require("./pool");
const cors=require("cors");
//引入第三方模块：处理请求
const session=require("express-session");

var app=express();

app.listen(3060);
app.use(cors({
	origin:["http://127.0.0.1:8080","http://localhost:8080"],
	credentials:true// 是否带cookie
}))
app.use(express.static(__dirname+"/public"));
app.use(session({
	secret:"128位随机字符",//安全字符串
	resave:false,//请求保存
	saveUninitialized:true,//初始化保存
	cookie:{
		maxAge:1000*60*60*24
	}
}));
//首页轮播
app.get("/bannerlist",(req,res)=>{
	var obj=[
		{id:1,img_url:"http://127.0.0.1:3060/banner/01.jpg"},	
		{id:2,img_url:"http://127.0.0.1:3060/banner/02.jpg"},	
		{id:3,img_url:"http://127.0.0.1:3060/banner/03.jpg"},	
		{id:4,img_url:"http://127.0.0.1:3060/banner/04.jpg"},	
	];
	res.send(obj);
})
//用户登录
app.get("/login",(req,res)=>{
	//1.获取参数
	var uname=req.query.uname;
	var upwd=req.query.upwd;
	//console.log(uname,upwd);
	//2.创建正则表达式进行验证
	var sql="SELECT count(uid) as c,uid,uname FROM wz_user WHERE uname=? AND upwd=md5(?)";
	pool.query(sql,[uname,upwd],(err,result)=>{
		//console.log(result);
		if(err) throw err;
		var obj=result[0].c;
		//console.log(result);
		if(obj==1){ 
			//将用户名保存session对象中
			req.session.uname=uname;
			res.send({data:result[0],code:1,msg:"登录成功！"});
		}else{
			res.send({code:-1,msg:"用户名或密码有误"})
		}
	})
})

//推荐
app.get("/commend",(req,res)=>{
	var obj=[
		{id:1,title:"套餐",img_url:"http://127.0.0.1:3060/commend/product1.png",del:"每一款套餐，都是不一样的玩法",child:[
			{cid:1,img_url:"http://127.0.0.1:3060/commend/meal01.jpg",del:"乌村一价全包",oprice:1960,nprice:1360,},
			{cid:2,img_url:"http://127.0.0.1:3060/commend/meal02.jpg",del:"西栅临暮(临水民宿)",oprice:1560,nprice:1060,},
			{cid:3,img_url:"http://127.0.0.1:3060/commend/meal03.jpg",del:"乐享美食",oprice:1070,nprice:1836,},
			{cid:4,img_url:"http://127.0.0.1:3060/commend/meal04.jpg",del:"乌村休闲游",oprice:380,nprice:230,},
		]},	
		{id:2,title:"酒店",img_url:"http://127.0.0.1:3060/commend/product2.png",del:"每一个酒店，都是一次心灵的依靠",child:[
			{cid:1,img_url:"http://127.0.0.1:3060/commend/hotal01.jpg",del:"锦堂行馆",oprice:"",nprice:1310,},
			{cid:2,img_url:"http://127.0.0.1:3060/commend/hotal02.jpg",del:"望津里精品酒店",oprice:"",nprice:650,},
			{cid:3,img_url:"http://127.0.0.1:3060/commend/hotal03.jpg",del:"通安客栈",oprice:"",nprice:650,},
			{cid:4,img_url:"http://127.0.0.1:3060/commend/hotal04.jpg",del:"乌镇民宿",oprice:"",nprice:210,},
		]},
		{id:3,title:"游记",img_url:"http://127.0.0.1:3060/commend/product3.png",del:"来过，便不曾离开",child:[
			{cid:1,img_url:"http://127.0.0.1:3060/commend/traval01.png",del:"乌村，此心安处是吾乡",desc:"导读 :苏东坡在定风波里问，试问岭南应不好？ 却道：此心安处是吾乡。"},
			{cid:2,img_url:"http://127.0.0.1:3060/commend/traval02.png",del:"乌村有多好玩？一般人我不...",desc:"导读 :乌镇里面有个乌托邦，她的名字叫乌村。"}
		]},
	];
	res.send(obj);
})
//酒店列表
app.get("/hotal",(req,res)=>{
	var pno=req.query.pno;//页码
	var pageSize=req.query.pageSize;//页大小
	//2.设置默认值
	if(!pno){pno=1}
	if(!pageSize){pageSize=6}
	//3.创建正则表达式验证用户输入验证
	var reg=/^[0-9]{1,3}$/;
	//4.如果错误停止函数运行
	if(!reg.test(pno)){
		res.send({code:-1,msg:"页码格式不正确"});
		return;
	}
	if(!reg.test(pageSize)){
		res.send({code:-2,msg:"页大小格式不正确"});
		return;
	}
	pno=parseInt(pno);
	pageSize=parseInt(pageSize);
	var obj=[
		{hid:1,hname:"锦堂行馆",score:5,mixprice:1310,comment:0,scale:5,img_url:"http://127.0.0.1:3060/hotal/hotal1.jpg",child:[
			{cid:1,cname:"锦堂豪华客房",price:2760,count:2,desc:"房间内设一张2米大床，带客厅",type:"套房",area:"60-80"},
			{cid:2,cname:"锦堂高级大床房",price:1310,count:2,desc:"房间内设一张1.8米大床，不规则房型",type:"大床",area:"35"},
			{cid:3,cname:"锦堂豪华大床房",price:1730,count:0,desc:"房间内设一张2米大床，窗外围龙形田",type:"大床",area:"60-80"}
		]},
		{hid:2,hname:"望津里精品酒店",score:5,mixprice:650,comment:0,scale:64,img_url:"http://127.0.0.1:3060/hotal/hotal2.jpg",child:[
			{cid:1,cname:"望津里十二星座情侣房",price:2580,count:3,desc:"12件独立水屋，一张1.8米大床",type:"大床",area:"80"},
			{cid:2,cname:"望津里标间A",price:1310,count:3,desc:"房间内设两张1.2米小床，无烟房",type:"标间",area:"36-50"},
			{cid:3,cname:"望津里标间B",price:1200,count:3,desc:"房间内设两张1.2米小床，无烟房",type:"标间",area:"36-38"},
			{cid:4,cname:"望津里标间C",price:1030,count:3,desc:"房间内设两张1.2米小床，无烟房",type:"标间",area:"30"},
			{cid:5,cname:"望津里大床房C",price:1310,count:3,desc:"房间内设一张1.8米大床，不规则房型",type:"大床",area:"30-40"},
			{cid:6,cname:"望津里大床房D",price:1200,count:3,desc:"房间内设一张1.8米大床，外景为望白莲塔",type:"大床",area:"30-40"},
			{cid:7,cname:"望津里套房B",price:2080,count:3,desc:"房间内一张2米大床，带客厅",type:"套房",area:"80"},
			{cid:8,cname:"望津里1.2米单间",price:650,count:3,desc:"房间内设一张1.2米小床",type:"单人间",area:"25"},
			{cid:9,cname:"望津里阳台大床房",price:1530,count:0,desc:"房间内一张2米大床，临水，带阳台",type:"大床",area:"55"},
			{cid:10,cname:"望津里大床B",price:1550,count:0,desc:"房间内设一张2米大床，临水",type:"大床",area:"55-63"}
		]},
		{hid:3,hname:"通安客栈",score:5,mixprice:650,comment:0,scale:199,img_url:"http://127.0.0.1:3060/hotal/hotal3.jpg",child:[
			{cid:1,cname:"通安1号楼沿河一房套A",price:1140,count:3,desc:"楼下客厅，楼上1.8米大床，临水带阳台",type:"套房",area:"50"},	
			{cid:2,cname:"通安贵宾楼标间A",price:700,count:3,desc:"房间内设两张1.2米小床",type:"标间",area:"32-35"},	
			{cid:3,cname:"通安2号楼阳台大床房",price:870,count:3,desc:"房间内设一张1.8或2米大床，均带阳台",type:"大床",area:"31-35"},	
			{cid:4,cname:"通安贵宾楼标间B",price:650,count:3,desc:"房间内设两张1.2米小床",type:"标间",area:"30"},	
			{cid:5,cname:"通安1号楼沿河二房套",price:1250,count:3,desc:"楼下1米2床，楼上1.8米大床房",type:"套房",area:"50"},	
			{cid:6,cname:"通安1号楼家庭房B",price:920,count:3,desc:"房间内设一张1.8米大床和一张1.2米小床",type:"家庭房",area:"25"},	
			{cid:7,cname:"通安2号楼家庭房",price:1090,count:3,desc:"房间内设一张1.8米大床和一张1.25米小床",type:"家庭房",area:"35"},	
			{cid:8,cname:"通安1号楼沿河一房套B",price:1090,count:0,desc:"楼下客厅，楼下1.8米大床，临水",type:"套房",area:"50"},	
			{cid:9,cname:"通安贵宾楼露台标间",price:700,count:0,desc:"房间内设两张1.2米小床，带露天天台",type:"标间",area:"25"},	
			{cid:10,cname:"通安贵宾楼大床房A",price:700,count:0,desc:"房间内设一张2米大床房，房间宽敞，带浴缸",type:"大床",area:"46"},	
			{cid:11,cname:"通安1号楼标间A",price:870,count:0,desc:"房间内设两张1.2米小床",type:"标间",area:"25"},	
			{cid:12,cname:"通安2号楼大床房",price:650,count:0,desc:"房间内设一张1.8米或2米大床，房间宽敞，带浴缸",type:"大床",area:"31-46"},	
			{cid:13,cname:"通安1号楼标间B",price:650,count:0,desc:"房间内设两张1.2米小床",type:"标间",area:"25"},	
			{cid:14,cname:"通安1号楼大床C",price:650,count:0,desc:"房间内设一张1.8米大床",type:"大床",area:"20-25"},	
			{cid:15,cname:"通安2号楼标间",price:870,count:0,desc:"房间内设两张1.2米小床",type:"小床",area:"31"},	
			{cid:16,cname:"通安贵宾楼大床房B",price:650,count:0,desc:"房间内设一张1.8米大床",type:"大床",area:"20-25"}
		]},
		{hid:4,hname:"乌镇民宿",score:5,mixprice:210,comment:0,scale:1070,img_url:"http://127.0.0.1:3060/hotal/hotal4.jpg",child:[
			{cid:1,cname:"民宿乌将军1.8米大床房",price:700,count:3,desc:"房间内设一张1.8米大床，望水，非主河道",type:"大床",area:"20-23"},	
			{cid:2,cname:"民宿书院标间C",price:480,count:3,desc:"房间内设两张1.1米小床。望湿地",type:"小床",area:"15-20"},	
			{cid:3,cname:"民宿乌将军阳台家庭房",price:1540,count:3,desc:"一张2米大床和一张1.3米小床，临水",type:"家庭房",area:"35-40"},	
			{cid:4,cname:"民宿唐泷居1.8米大床A",price:810,count:3,desc:"房间内设一张1.8米大床，房间较宽敞",type:"大床",area:"25-30"},	
			{cid:5,cname:"民宿庙西街标间A",price:700,count:3,desc:"房间内设两张1.2米小床，房间隔音较好",type:"标间",area:"30-35"},	
			{cid:6,cname:"民宿乌将军2米大床房",price:700,count:3,desc:"房间内设一张2米大床，望水或临水",type:"大床",area:"20-24"},	
			{cid:7,cname:"民宿1.8米大床B",price:540,count:3,desc:"房间内设一张1.8米大床B",type:"大床",area:"15-20"},	
			{cid:8,cname:"民宿似水1.5米大床",price:540,count:3,desc:"房间内一张1.5米大床，望水",type:"大床",area:"15-20"},	
			{cid:9,cname:"民宿庙西街标间B",price:590,count:3,desc:"房间内设两张1.2米小米，房间隔音较好",type:"标间",area:"25-30"},	
			{cid:10,cname:"民宿似水标间B",price:590,count:3,desc:"房间内设两张1.2米小床，望水",type:"标间",area:"15-20"},	
			{cid:11,cname:"民宿似水标间A",price:650,count:3,desc:"房间内设两张1.2米小床，望水",type:"标间",area:"20-25"},	
			{cid:12,cname:"民宿标间B",price:430,count:3,desc:"房间内设两张1.2米小床，窗外街景或庭院景",type:"标间",area:"20-25"},	
			{cid:13,cname:"民宿望水标间B",price:540,count:3,desc:"房间内两张1.2米小床，可远望到水",type:"标间",area:"20-25"},	
			{cid:14,cname:"民宿三人间B",price:540,count:3,desc:"房间内设三张1.2米小床",type:"三人间",area:"25-30"},	
			{cid:15,cname:"民宿1.5米大床A",price:540,count:3,desc:"房间内设一张1.5米大床，临水",type:"大床",area:"15-20"},	
			{cid:16,cname:"民宿望水标间A",price:590,count:3,desc:"房间内设两张1.2米小床，可远望到水",type:"标间",area:"15-20"},	
			{cid:17,cname:"民宿书院三人房",price:590,count:3,desc:"房间内设三张1.1米小床，望湿地",type:"三人间",area:"25-30"},	
			{cid:18,cname:"民宿阳台标间",price:480,count:3,desc:"房间内设两张1.2米小床，带阳台",type:"标间",area:"15-20"},	
			{cid:19,cname:"民宿乌将军2米阳台房",price:810,count:3,desc:"房间内设一张2米床，临水，非主河道",type:"大床",area:"25-30"},	
			{cid:20,cname:"民宿三人房A",price:650,count:3,desc:"房间内设三张1.2米小床，临水",type:"三人间",area:"20-25"},	
			{cid:21,cname:"民宿书院1.5米大床",price:480,count:3,desc:"房间内设一张1.5米小床，望湿地",type:"大床",area:"15-20"},	
			{cid:22,cname:"民宿1.5米大床B",price:430,count:3,desc:"房间内设一张1.5米大床，窗外街景或庭院景",type:"大床",area:"15-20"},	
			{cid:23,cname:"民宿书院标间A",price:540,count:3,desc:"房间内设两张1.1米小床，望湿地",type:"标间",area:"20-25"},	
			{cid:24,cname:"民宿1.5米阳台房",price:700,count:3,desc:"房间内设一张1.5米大床,临水，带阳台",type:"大床",area:"15-20"},	
			{cid:25,cname:"民宿1.8米阳台房",price:760,count:3,desc:"房间内设一张1.8米大床，临水，带阳台",type:"大床",area:"15-20"},	
			{cid:26,cname:"民宿1.8米大床A",price:590,count:3,desc:"房间内设一张1.8米大床，临水",type:"大床",area:"15-20"},	
			{cid:27,cname:"民宿1.5米大床C",price:370,count:3,desc:"房间内设一张1.5米大床",type:"大床",area:"15-20"},	
			{cid:28,cname:"民宿标间A",price:540,count:3,desc:"房间内设两张1.1米或1.2米小床，临水",type:"标间",area:"20-25"},	
			{cid:29,cname:"民宿庙西街1.8米大床",price:590,count:3,desc:"房间内设一张1.8米大床，房间隔音较好",type:"大床",area:"15-20"},	
			{cid:30,cname:"民宿唐泷居1.5米大床",price:540,count:3,desc:"房间内设一张1.5米大床，窗外为庭院景",type:"大床",area:"15-20"},	
			{cid:31,cname:"民宿唐泷居标间B",price:540,count:3,desc:"房间内设两张1.1米小床，窗外围庭院景",type:"标间",area:"20-25"},	
			{cid:32,cname:"民宿乌将军家庭房",price:810,count:3,desc:"房间内设一张大床和一张小床",type:"家庭房",area:"30-39"},	
			{cid:33,cname:"民宿唐泷居连通房",price:810,count:3,desc:"一个1.8米大床及一个标间",type:"套房",area:"40"},	
			{cid:34,cname:"民宿1.2米单间B",price:210,count:0,desc:"房间内设一张1.2米小床，房间较小",type:"单人间",area:"10-15"},	
			{cid:35,cname:"民宿家庭房H",price:590,count:0,desc:"每套客房可入住3人，卫生间公用，无客厅",type:"家庭房",area:"25-30"},	
			{cid:36,cname:"民宿标间C",price:370,count:0,desc:"房间内设两张1.2米小床，不临水",type:"标间",area:"20-25"},	
			{cid:37,cname:"民宿红线弄标间",price:590,count:0,desc:"房间内设两张1.2米小床",type:"标间",area:"20-25"},	
			{cid:38,cname:"民宿文昌阁1.8米望水房",price:590,count:0,desc:"房间内设一张1.8米大床，可远望到水",type:"标间",area:"15-20"},	
		]},
		{hid:5,hname:"枕水度假酒店",score:5,mixprice:870,comment:0,scale:52,img_url:"http://127.0.0.1:3060/hotal/hotal5.jpg",child:[
			{cid:1,cname:"枕水标间",price:870,count:3,desc:"房间内设两张1.3米古典架子床",type:"小床",area:"31"},
			{cid:2,cname:"枕水民宿标间",price:980,count:3,desc:"房间内设两张1.2米小床，共用客厅",type:"小床",area:"31"},
			{cid:3,cname:"枕水民宿二套房",price:2090,count:0,desc:"一楼客厅，二楼一标间一大床",type:"套房",area:"40"}
		]},
		{hid:6,hname:"宜园精品酒店",score:5,mixprice:2140,comment:0,scale:3,img_url:"http://127.0.0.1:3060/hotal/hotal6.jpg",child:[
			{cid:1,cname:"园林大床房",price:2140,count:3,desc:"房间内设2米大床，部分房间临水",type:"大床",area:"25-30"},
			{cid:2,cname:"豪华大床房",price:3280,count:3,desc:"房间内设2米大床，临水带天窗",type:"大床",area:"31"},
			{cid:3,cname:"双人浪漫套房",price:3720,count:0,desc:"房间内1.8米大床，临水带天窗，带阁楼",type:"套房",area:"50"}
		]},
		{hid:7,hname:"昭明书舍",score:5,mixprice:700,comment:0,scale:16,img_url:"http://127.0.0.1:3060/hotal/hotal7.jpg",child:[
			{cid:1,cname:"昭明标间",price:700,count:3,desc:"房间内设两张1.2米架子床小单间，带小客厅",type:"小床",area:"25-30"}
		]},
		{hid:8,hname:"两府客栈",score:5,mixprice:260,comment:0,scale:41,img_url:"http://127.0.0.1:3060/hotal/hotal8.jpg",child:[
			{cid:1,cname:"两府普通标间",price:260,count:3,desc:"房间内设两张1.2米小床",type:"小床",area:"15-20"},
			{cid:2,cname:"两府豪华标间",price:310,count:3,desc:"房间内设两张1.2米小床，房间较宽敞",type:"小床",area:"20-25"}
		]},
	];
	var arr=[];
	var pageCount = Math.ceil(obj.length/pageSize);
	if(pno<pageCount){
		arr=obj.slice((pno-1)*pageSize,pno*pageSize);
	}else{
		arr=obj.slice((pno-1)*pageSize);
	}
	res.send({data:arr,oname:"酒店",count:pageCount,hocount:obj.length});
})


