(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"06ab":function(t,e,n){"use strict";var i=n("25d6"),o=n.n(i);o.a},"15c4":function(t,e,n){"use strict";n.r(e);var i=n("d2b1"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},2248:function(t,e,n){"use strict";n.r(e);var i=n("e545"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},"25d6":function(t,e,n){},"2f17":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i})},"4d59":function(t,e,n){"use strict";(function(t){n("65f7"),n("921b");i(n("66fd"));var e=i(n("78ef"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"688f":function(t,e,n){"use strict";n.r(e);var i=n("2f17"),o=n("2248");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("06ab");var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=u.exports},"78ef":function(t,e,n){"use strict";n.r(e);var i=n("c31b"),o=n("15c4");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("f34b");var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6b8bd763",null,!1,i["a"],s);e["default"]=u.exports},c31b:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i})},d2b1:function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),a=(s(n("688f")),s(n("9f9e")));function s(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){u(t,e,n[e])})}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(){return n.e("components/wuc-tab/wuc-tab").then(n.bind(null,"ee0c"))},l=function(){return Promise.all([n.e("common/vendor"),n.e("components/QS-inputs-split/elements/QS-input/index")]).then(n.bind(null,"8603"))},d=function(){return Promise.all([n.e("common/vendor"),n.e("components/QS-inputs-split/elements/QS-textarea/index")]).then(n.bind(null,"8789"))},f=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup").then(n.bind(null,"e635"))},p=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list").then(n.bind(null,"2d2b"))},g=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item").then(n.bind(null,"62e7"))},h=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-drawer/uni-drawer").then(n.bind(null,"e9c7"))},m=function(){return Promise.all([n.e("common/vendor"),n.e("components/QS-inputs-split/elements/QS-pics/index")]).then(n.bind(null,"3cd9"))},v=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons").then(n.bind(null,"2439"))},b=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box").then(n.bind(null,"62d2"))},y={computed:(0,o.mapState)(["forcedLogin","hasLogin","userName","serverUrl","user"]),components:{wucTab:c,QSInput:l,QSTextarea:d,uniPopup:f,uniList:p,uniListItem:g,uniDrawer:h,QSPics:m,uniIcons:v,uniNumberBox:b},data:function(){var t;return{visible:!1,curStep:0,step:[!0,!1,!1],step2:[!1,!1],title:"map",phoneReg:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,latitude:39.909,longitude:116.39742,cargoImage:[{name:"cargoImage"},{name:"cargoImage2"},{name:"cargoImage3"}],covers:[{id:1,title:"当前位置",latitude:39,longitude:116,iconPath:"../../static/img/location_self.png"}],circles:[{id:1,latitude:39,longitude:116,radius:1e3,fillColor:"#FFFFF00"}],wH:"",addressList1:[],addressList2:[],carList:[{name:"我要寄货",url:"../../static/img/car/ji.jpg",startPrice:50,startDistance:500,averagePrice:10,desc:"注册要到某地的信息，等顺路人拿走您的包裹，送到你的目的地"},{name:"我要带货",url:"../../static/img/car/na.jpg",startPrice:50,startDistance:500,averagePrice:10,desc:"前往到某地，顺便帮助途中路径的包裹，收取一定费用"}],TabCur:0,aroundTime:"",imageArray:[],userPoint:(t={consignee:{name:"",phone:""},goods:{name:"",volume:"",weight:"",detail:""},tbuser:{},distance:"",address:"",toaddress:"",money:""},u(t,"distance",""),u(t,"cargoImage",""),u(t,"location",{type:"",coordinates:[]}),u(t,"location2",{type:"",coordinates:[]}),t),entity:{},tempEntity:{address:"",latitude:"",longitude:""}}},methods:r({},(0,o.mapMutations)(["login","updateUser","setToken","setLinkList"]),{bindChange1:function(t){this.userPoint.goods.volume=t},bindChange2:function(t){this.userPoint.goods.weight=t},chooseToAddress:function(){var e=this;t.chooseLocation({success:function(t){var n=t.latitude,i=t.longitude,o=t.address,a="";for(var s in o)void 0!=o[s]&&(a+=o[s]);e.tempEntity.address=a,e.tempEntity.latitude=n,e.tempEntity.longitude=i}})},uploadImage:function(t,e){this.imageArray.push(e)},markClick:function(e){var n=e.markerId;t.navigateTo({url:"../cargo/cargo/cargo?id="+n})},searAddress:function(e){var n={};if(1==e)this.userPoint.address;else this.userPoint.toaddress;var i=this;t.chooseLocation({success:function(t){n.name=t.name,n.address=t.address,n.latitude=t.latitude,n.longitude=t.longitude;var o=t.address,a="";for(var s in o)void 0!=o[s]&&(a+=o[s]);if(1==e){i.userPoint.address=a;var r={type:"Point"};r.coordinates=[n.longitude,n.latitude],i.latitude=n.latitude,i.longitude=n.longitude,i.covers[0].longitude=n.longitude,i.covers[0].latitude=n.latitude,i.circles[0].longitude=n.longitude,i.circles[0].latitude=n.latitude,i.userPoint.location=r}if(2==e){i.userPoint.toaddress=a;r={type:"Point"};r.coordinates=[n.longitude,n.latitude],i.userPoint.location2=r}}})},nextStep:function(){var e=this;if(1==this.user.status){if(2!=this.curStep)if(1==this.curStep){if(0==this.TabCur){if(!this.checkInput())return;t.hideLoading();var n=this,i={mode:"driving",key:"LHYBZ-SYJLJ-VDKFC-F2KAI-WACOK-S6FMJ",from:n.userPoint.location.coordinates[1]+","+n.userPoint.location.coordinates[0],to:n.userPoint.location2.coordinates[1]+","+n.userPoint.location2.coordinates[0],output:"JSON"};t.request({url:"https://apis.map.qq.com/ws/distance/v1/",method:"GET",data:i,header:{},success:function(t){var i=t.data.result.elements[0].distance,o=t.data.result.elements[0].duration;n.aroundTime=o,n.userPoint.distance=i,i>n.carList[n.TabCur].startDistance?n.userPoint.money=n.carList[n.TabCur].startPrice+(i-n.carList[n.TabCur].startDistance)*n.carList[n.TabCur].averagePrice:n.userPoint.money=n.carList[n.TabCur].startPrice,e.curStep++;for(var a=0;a<3;a++)a==e.curStep?e.step[a]=!0:e.step[a]=!1},fail:function(n){t.showToast({icon:"none",title:"请求距离失败,仅支持10公里计算距离"}),e.curStep++;for(var i=0;i<3;i++)i==e.curStep?e.step[i]=!0:e.step[i]=!1}})}}else{this.curStep++;for(var o=0;o<3;o++)o==this.curStep?this.step[o]=!0:this.step[o]=!1}}else t.showToast({icon:"none",title:"暂未通过审核，请前往填写个人资料以备工作人员审核"})},preStep:function(){if(0!=this.curStep){this.curStep--;for(var t=0;t<3;t++)t==this.curStep?this.step[t]=!0:this.step[t]=!1}},tabChange:function(t){this.TabCur=t},swiperChange:function(t){var e=t.target.current;this.TabCur=e},toLogin:function(){var e=this;console.log(i("是否强制登录？------"+this.forcedLogin," at pages\\main\\main.vue:503")),this.forcedLogin?t.reLaunch({url:"../login/login"}):t.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!this.forcedLogin,success:function(n){n.confirm&&(e.forcedLogin?t.reLaunch({url:"../login/login"}):t.navigateTo({url:"../login/login"}))}})},searchCargo:function(){if(this.tempEntity.latitude&&this.longitude){var e=this;e.covers.splice(1,e.covers.length-1);var n=e.tempEntity.longitude,i=e.tempEntity.latitude,o=1e4,s={};s.url="/user/userPoint/getNearCargo/"+i+"/"+n+"/"+o,s.data=e.userPoint,s.title="检索数据中",a.default.postWithNoStatus(s).then(function(n){var i=n.data.content;i.forEach(function(t){var n=t.content.location,i={id:t.content.id,title:t.content.goods.name,latitude:n.coordinates[1],longitude:n.coordinates[0],iconPath:"../../static/img/car/cargo.png"};e.covers.push(i)}),t.showToast({icon:"none",title:"请求成功！检索到与你目的地一致的包裹："+i.length+"  请查看地图查看包裹所在地"}),e.curStep=0,e.step[1]=!1,e.step[2]=!1,e.step[0]=!0},function(e){t.showToast({icon:"none",title:"请求失败："+e})})}else t.showToast({icon:"none",title:"请先选择目的地"})},searchCar:function(){if(this.checkInput()){var e=this;t.showModal({title:"提示",content:"确认提交订单?提交后将可能被顺路者申请交易,请注意及时回复",success:function(n){if(n.confirm){e.userPoint.user_id=e.user.id,e.userPoint.tbUser=e.user,e.userPoint.cargoImage=JSON.stringify(e.imageArray),e.userPoint.status=1;var o={url:"/user/userPoint/save"};o.data=e.userPoint,o.title="提交中",a.default.postWithNoStatus(o).then(function(n){n.data.status?(t.showToast({icon:"none",title:"提交成功"}),e.curStep=0,e.step[1]=!1,e.step[2]=!1,e.step[0]=!0,e.userPoint={},console.log(i(n.data.data," at pages\\main\\main.vue:690"))):t.showToast({icon:"none",title:"请求失败"})},function(e){t.showToast({icon:"none",title:"网络请求失败:"+e})})}else if(n.cancel)return}})}},checkInput:function(){return""==this.userPoint.goods.name?(t.showToast({icon:"none",title:"请填写货物名"}),!1):""==this.userPoint.goods.weight?(t.showToast({icon:"none",title:"请填写货物重量"}),!1):""==this.userPoint.goods.volume?(t.showToast({icon:"none",title:"请填写货物体积"}),!1):0==this.imageArray.length?(t.showToast({icon:"none",title:"至少上传一张物品图片"}),!1):""==this.userPoint.consignee.name?(t.showToast({icon:"none",title:"请填写收货人姓名"}),!1):""==this.userPoint.consignee.phone?(t.showToast({icon:"none",title:"请填写收货人联系电话"}),!1):this.phoneReg.test(this.userPoint.consignee.phone)?""==this.userPoint.toaddress?(t.showToast({icon:"none",title:"请填写目的地址"}),!1):""!=this.userPoint.address||(t.showToast({icon:"none",title:"请填写寄件地址"}),!1):(t.showToast({icon:"none",title:"联系电话格式错误"}),!1)}}),onLoad:function(){var e=this,n=t.getSystemInfoSync(),o=n.windowHeight;if(this.wH=o/2,this.hasLogin){var s=this,r={url:"/chatHistory/get"};r.data={id:s.user.phone},a.default.backPost(r).then(function(e){if(1==e.data.status){if(e.data.data){var n=e.data.data;s.setLinkList(n)}console.log(i("tim开始登陆 else分支--------------------"," at pages\\main\\main.vue:1081"));var o=s.user;s.$conn.open({apiUrl:s.$im.config.apiURL,user:o.phone,pwd:o.phone,grant_type:"password",appKey:s.$im.config.appkey})}else{t.showToast({icon:"none",title:"获取聊天记录失败"}),console.log(i("tim开始登陆 else分支--------------------"," at pages\\main\\main.vue:1099"));var a=s.user;s.$conn.open({apiUrl:s.$im.config.apiURL,user:a.phone,pwd:a.phone,grant_type:"password",appKey:s.$im.config.appkey})}},function(e){t.showToast({icon:"none",title:"获取聊天记录失败"}),console.log(i("tim开始登陆 else分支--------------------"," at pages\\main\\main.vue:1117"));var n=s.user;s.$conn.open({apiUrl:s.$im.config.apiURL,user:n.phone,pwd:n.phone,grant_type:"password",appKey:s.$im.config.appkey})})}else try{var u=t.getStorageSync("token"),c=this;if(u){this.setToken(u);var l={url:"/user/login/getUserInfo",title:"自动登陆中"};a.default.getWithNoStatus(l).then(function(n){if(1==n.data.status){console.log(i(n.data," at pages\\main\\main.vue:873"));var o=n.data.data;e.login(o.username),c.updateUser(o);var s={url:"/chatHistory/get"};s.data={id:o.phone},a.default.backPost(s).then(function(e){if(1==e.data.status){if(e.data.data){var n=e.data.data;c.setLinkList(n)}var a=c.user.username;console.log(i("tim开始登陆--------------------有token分支：username="+a," at pages\\main\\main.vue:893")),c.$conn.open({apiUrl:c.$im.config.apiURL,user:o.phone,pwd:o.phone,grant_type:"password",appKey:c.$im.config.appkey})}else{t.showToast({icon:"none",title:"获取聊天记录失败"});var s=c.user.username;console.log(i("tim开始登陆--------------------有token分支：username="+s," at pages\\main\\main.vue:911")),c.$conn.open({apiUrl:c.$im.config.apiURL,user:o.phone,pwd:o.phone,grant_type:"password",appKey:c.$im.config.appkey})}},function(e){t.showToast({icon:"none",title:"获取聊天记录失败"});var n=c.user.username;console.log(i("tim开始登陆--------------------有token分支：username="+n," at pages\\main\\main.vue:929")),c.$conn.open({apiUrl:c.$im.config.apiURL,user:o.phone,pwd:o.phone,grant_type:"password",appKey:c.$im.config.appkey})})}else 200==n.statusCode?t.showToast({icon:"none",title:"登陆已过期，请重新登录"}):t.showToast({icon:"none",title:"网络错误：网络连接失败"}),setTimeout(function(){c.toLogin()},1e3)},function(e){t.showToast({icon:"none",title:"自动登录失败：网络超时"}),setTimeout(function(){c.toLogin()},1e3)})}else t.showToast({icon:"none",title:"请先登录"}),setTimeout(function(){c.toLogin()},1e3)}catch(d){t.showToast({icon:"none",title:"请先登录"}),setTimeout(function(){c.toLogin()},1e3)}},onReady:function(){var e=this,n={};n=this.user,n.password="",this.userPoint.tbuser=n,t.getLocation({type:"gcj02",geocode:!0,success:function(t){console.log(i("当前位置的经度："+t.longitude," at pages\\main\\main.vue:1145")),console.log(i("当前位置的纬度："+t.latitude," at pages\\main\\main.vue:1146")),e.longitude=t.longitude,e.latitude=t.latitude,e.covers[0].longitude=t.longitude,e.covers[0].latitude=t.latitude,e.circles[0].longitude=t.longitude,e.circles[0].latitude=t.latitude;var n={type:"Point"};n.coordinates=[t.longitude,t.latitude],e.userPoint.location=n;var o=t.address,a="";for(var s in o)void 0!=o[s]&&(a+=o[s]);e.userPoint.address=a}})}};e.default=y}).call(this,n("6e42")["default"],n("0de9")["default"])},e545:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniSegmentedControl",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}}};e.default=i},f34b:function(t,e,n){"use strict";var i=n("fffd"),o=n.n(i);o.a},fffd:function(t,e,n){}},[["4d59","common/runtime","common/vendor"]]]);