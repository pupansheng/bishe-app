(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/detail"],{"1de8":function(t,e,n){"use strict";n.r(e);var a=n("d74f"),o=n("b74c");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("2b82");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=c.exports},"2b82":function(t,e,n){"use strict";var a=n("7f4d"),o=n.n(a);o.a},3542:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62"),o=r(n("9f9e"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){i(t,e,n[e])})}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(){return n.e("components/cmd-nav-bar/cmd-nav-bar").then(n.bind(null,"36f6"))},s=function(){return n.e("components/cmd-page-body/cmd-page-body").then(n.bind(null,"7d7d"))},d=function(){return n.e("components/cmd-transition/cmd-transition").then(n.bind(null,"626f"))},l=function(){return n.e("components/cmd-cell-item/cmd-cell-item").then(n.bind(null,"f4bb"))},f=function(){return n.e("components/cmd-avatar/cmd-avatar").then(n.bind(null,"6d9c"))},m={components:{cmdNavBar:c,cmdPageBody:s,cmdTransition:d,cmdCelItem:l,cmdAvatar:f},computed:u({},(0,a.mapState)(["hasLogin","forcedLogin","serverUrl","user","token"])),data:function(){return{}},mounted:function(){t.startPullDownRefresh()},methods:u({},(0,a.mapMutations)(["login","updateUser"]),{fnClick:function(e){"modify"==e&&t.navigateTo({url:"/pages/pwd/modify"})},uploadHeadImage:function(){var e=this;t.chooseImage({success:function(n){var a=n.tempFilePaths,r=t.uploadFile({url:e.serverUrl+"/upload",filePath:a[0],header:{"shundi-token":e.token},name:"file",formData:{},success:function(n){var a=JSON.parse(n.data);e.user.headimage=a.url;var r={url:"/user/update/headimage"};r.data=e.user,r.title="更新中",o.default.postWithNoStatus(r).then(function(e){e.data.status?t.showToast({title:"更新成功：",image:"../../static/img/alert-2.png",duration:3e3}):t.showToast({title:"更新失败:"+e.data.message,image:"../../static/img/alert-3.png",duration:3e3})},function(e){t.showToast({title:"更新失败:"+e,image:"../../static/img/alert-3.png",duration:3e3})})}});t.showLoading({title:"上传中"}),r.onProgressUpdate(function(e){100==e.progress&&t.hideLoading()})}})}}),onLoad:function(t){},onPullDownRefresh:function(){var e=this;setTimeout(function(){o.default.get({url:"/user/getBasciInfo/"+e.user.id}).then(function(t){e.updateUser(t)},function(e){t.showToast({icon:"none",title:"获取基本信息失败"})}),t.stopPullDownRefresh()},100)}};e.default=m}).call(this,n("6e42")["default"])},"7f4d":function(t,e,n){},ab37:function(t,e,n){"use strict";(function(t){n("65f7"),n("921b");a(n("66fd"));var e=a(n("1de8"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b74c:function(t,e,n){"use strict";n.r(e);var a=n("3542"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=o.a},d74f:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return a})}},[["ab37","common/runtime","common/vendor"]]]);