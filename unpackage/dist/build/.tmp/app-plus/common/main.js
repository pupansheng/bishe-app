(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"018a":function(e,t,o){},"0540":function(e,t,o){"use strict";o.r(t);var n=o("3668");for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);o("0da2");var a,r,s,c,u=o("f0c5"),l=Object(u["a"])(n["default"],a,r,!1,null,null,null,!1,s,c);t["default"]=l.exports},"0da2":function(e,t,o){"use strict";var n=o("018a"),i=o.n(n);i.a},"12df":function(e,t,o){"use strict";(function(e){o("65f7"),o("921b");var t=r(o("66fd")),n=r(o("0540")),i=r(o("fe76")),a=r(o("f973"));function r(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),n.forEach(function(t){c(e,t,o[t])})}return e}function c(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var u=o("6294")["default"],l={closed:!1,curOpenOpt:{},open:function(e){this.curOpenOpt=e,u.conn.open(e),this.closed=!1},reopen:function(){this.closed&&(u.conn.open(this.curOpenOpt),this.closed=!1)}};t.default.prototype.$im=u,t.default.prototype.$conn=l,t.default.prototype.$helper=i.default,t.default.config.productionTip=!1,t.default.prototype.$store=a.default,n.default.mpType="app";var d=new t.default(s({store:a.default},n.default));e(d).$mount()}).call(this,o("6e42")["createApp"])},3668:function(e,t,o){"use strict";o.r(t);var n=o("b16c"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=i.a},b16c:function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o("2f62"),a=r(o("9f9e"));function r(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),n.forEach(function(t){c(e,t,o[t])})}return e}function c(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o("6250");o("6007");var u=o("704e"),l=!1,d=!1,f={onLaunch:function(){var t=this;console.log(e("App Launch"," at App.vue:13"));var o=this;u.on("em.chat.saveHistory",function(e){var t={url:"/chatHistory/save"};t.data={id:o.user.phone,chatList:o.linkList},a.default.backPost(t).then(function(e){0==e.data.status&&n.showToast({icon:"none",title:"保存历史记录失败！",position:"bottom"})},function(e){n.showToast({icon:"none",title:"保存历史记录失败！",position:"bottom"})})}),u.on("em.main.ready",function(){}),u.on("em.chatroom.leave",function(){console.log(e("em.chatroom.leave"," at App.vue:54"))}),u.on("em.chat.session.remove",function(){}),u.on("em.chat.audio.fileLoaded",function(){}),u.on("em.main.deleteFriend",function(){}),u.on("em.chat.audio.fileLoaded",function(){}),this.$im.conn.listen({onOpened:function(e){t.$im.conn.setPresence(),d&&(d=!1)},onReconnect:function(){n.showToast({icon:"none",title:"重新连接环信IM中",position:"bottom"})},onSocketConnected:function(){n.showToast({icon:"none",title:"登录im成功",position:"bottom"})},onClosed:function(){n.showToast({icon:"none",title:"环信im已断开",position:"bottom"}),t.$conn.closed=!0,t.$im.conn.close()},onRoster:function(e){},onVideoMessage:function(t){console.log(e("onVideoMessage: ",JSON.stringify(t)," at App.vue:110"))},onAudioMessage:function(t){t.url;wx.downloadFile({url:t.url,header:{"X-Requested-With":"XMLHttpRequest",Accept:"audio/mp3",Authorization:"Bearer "+t.accessToken},success:function(e){for(var i=e.tempFilePath,a=!1,r=o.linkList,s=new Date,c=o.dateFormat("YYYY-mm-dd HH:MM",s),l={type:"user",msg:{id:0,time:c,type:"voice",userinfo:{uid:t.ext.id?t.ext.id:"admin",username:t.ext.id?t.ext.username:"系统通知",face:t.ext.id?t.ext.headimage:"/static/img/face.jpg"},content:{url:i,length:t.length}}},d=0,f=0;f<r.length;f++){var m=r[f];if(m.title==t.from){a=!0,d=m.history.length,l.msg.id=d,m.history.push(l),m.message="新消息[语言]",m.count=m.count+1,m.time=c,m.url=t.ext.id?[t.ext.headimage]:["/static/img/face.jpg"];break}}if(!a){var p={type:t.type,title:t.from,name:t.ext.id?t.ext.username:"系统通知",url:t.ext.id?[t.ext.headimage]:["/static/img/face.jpg"],history:[l],message:"新消息[语音]",time:c,count:1,stick:!1,disabled:!1,type2:2};r.push(p)}t.ext.id&&a||n.vibrateLong(),o.setLinkList(r),a&&u.fire("em.chat.reSuccess",d),u.fire("em.chat.saveHistory",1)},fail:function(t){console.log(e("downloadFile failed",t," at App.vue:197"))}})},onCmdMessage:function(t){console.log(e("onCmdMessage",t," at App.vue:206"))},onTextMessage:function(e){var t=!1,i=o.linkList,a=new Date,r=o.dateFormat("YYYY-mm-dd HH:MM",a);e.time=r;for(var s={type:"user",msg:{id:0,type:"text",time:r,userinfo:{uid:e.ext.id?e.ext.id:"admin",username:e.ext.id?e.ext.username:"系统通知",face:e.ext.id?e.ext.headimage:"/static/img/face.jpg"},content:{text:e.data,source:e}}},c=0,l=0;l<i.length;l++){var d=i[l];if(d.title==e.from){t=!0,c=d.history.length,s.msg.id=c,d.history.push(s),d.message=e.data.length>10?"新消息[文字]":e.data,d.count=d.count+1,d.time=r,d.url=e.ext.id?[e.ext.headimage]:["/static/img/face.jpg"];break}}if(!t){var f={type:e.type,title:e.from,name:e.ext.id?e.ext.username:"系统通知",url:e.ext.id?[e.ext.headimage]:["/static/img/face.jpg"],history:[s],message:e.data.length>10?"新消息[文字]":e.data,time:r,count:1,stick:!1,disabled:!1,type2:2};i.push(f)}e.ext.id&&t||n.vibrateLong(),o.setLinkList(i),t&&u.fire("em.chat.reSuccess",c),u.fire("em.chat.saveHistory")},onEmojiMessage:function(t){console.log(e("onEmojiMessage",t," at App.vue:287"))},onPictureMessage:function(e){for(var t=!1,i=o.linkList,a=new Date,r=o.dateFormat("YYYY-mm-dd HH:MM",a),s={type:"user",msg:{id:0,time:r,type:"img",userinfo:{uid:e.ext.id?e.ext.id:"admin",username:e.ext.id?e.ext.username:"系统通知",face:e.ext.id?e.ext.headimage:"/static/img/face.jpg"},content:{url:e.url,w:e.width,h:e.height}}},c=0,l=0;l<i.length;l++){var d=i[l];if(d.title==e.from){t=!0,c=d.history.length,s.msg.id=c,d.history.push(s),d.message="新消息[图片]",d.count=d.count+1,d.time=r,d.url=e.ext.id?[e.ext.headimage]:["/static/img/face.jpg"];break}}if(!t){var f={type:e.type,title:e.from,name:e.ext.id?e.ext.username:"系统通知",url:e.ext.id?[e.ext.headimage]:["/static/img/face.jpg"],history:[s],message:"新消息[图片]",time:r,count:1,stick:!1,disabled:!1,type2:2};i.push(f)}e.ext.id&&t||n.vibrateLong(),o.setLinkList(i),t&&u.fire("em.chat.reSuccess",c),u.fire("em.chat.saveHistory")},onFileMessage:function(t){console.log(e("onFileMessage",t," at App.vue:365"))},onError:function(o){if(console.log(e(o," at App.vue:370")),o.type==t.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED&&!l){if(t.$im.conn.autoReconnectNumTotal<t.$im.conn.autoReconnectNumMax)return;n.showToast({title:"服务器端关闭websocket连接 强制下线",duration:1500,position:"bottom"});var i=t;setTimeout(function(){n.removeStorage({key:"token"}),i.logout(),n.navigateTo({url:"pages/login/login"}),l=!0},1500)}o.type==t.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR&&n.showToast({icon:"none",title:"多重登录",position:"bottom"}),o.type==t.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR&&(u.fire("em.xmpp.error.passwordErr"),n.showToast({icon:"none",title:"登录im错误：密码用户不一致",position:"bottom"})),o.type==t.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR&&u.fire("em.xmpp.error.tokenErr"),"socket_error"==o.type&&(console.log(e("socket_errorsocket_error",o," at App.vue:420")),n.showToast({title:"网络已断开",icon:"none",duration:2e3,position:"bottom"}),u.fire("em.xmpp.error.sendMsgErr",o))}})},onShow:function(){console.log(e("App Show"," at App.vue:435"))},onHide:function(){console.log(e("App Hide"," at App.vue:438"))},onError:function(t){console.log(e("APP 异常！"," at App.vue:442")),console.log(e(t," at App.vue:443"))},computed:(0,i.mapState)(["forcedLogin","hasLogin","userName","serverUrl","user","linkList"]),methods:s({},(0,i.mapMutations)(["setLinkList","logout"]),{dateFormat:function(e,t){var o,n={"Y+":t.getFullYear().toString(),"m+":(t.getMonth()+1).toString(),"d+":t.getDate().toString(),"H+":t.getHours().toString(),"M+":t.getMinutes().toString(),"S+":t.getSeconds().toString()};for(var i in n)o=new RegExp("("+i+")").exec(e),o&&(e=e.replace(o[1],1==o[1].length?n[i]:n[i].padStart(o[1].length,"0")));return e},onLoginSuccess:function(){n.hideToast(),n.switchTab({url:"../chat/chat"})},ack:function(e){var t=e.id,o=new this.$im.message("read",this.$im.conn.getUniqueId());o.set({id:t,to:e.from}),this.$im.conn.send(o.body)},onMessageError:function(e){return"error"!==e.type||(n.showToast({title:e.errorText}),!1)},getCurrentRoute:function(){var e=getCurrentPages(),t=e[e.length-1];return t.route},calcUnReadSpot:function(e){}})};t.default=f}).call(this,o("0de9")["default"],o("6e42")["default"])}},[["12df","common/runtime","common/vendor"]]]);