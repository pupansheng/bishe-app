(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cmd-page-body/cmd-page-body"],{"548d":function(t,e,o){"use strict";o.r(e);var n=o("a640"),u=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=u.a},"7d7d":function(t,e,o){"use strict";o.r(e);var n=o("ee13"),u=o("548d");for(var a in u)"default"!==a&&function(t){o.d(e,t,function(){return u[t]})}(a);o("e221");var c,r=o("f0c5"),d=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=d.exports},a640:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"cmd-page-body",props:{type:{type:String,default:"top"},backgroundColor:{type:String,default:""}},data:function(){return{bodyHeight:0}},computed:{setBodyClass:function(){var t=["cmd-page-body","cmd-page-body-top-bottom"];return"top"==this.type&&(t.splice(1),t.push("cmd-page-body-top")),"bottom"==this.type&&(t.splice(1),t.push("cmd-page-body-bottom")),t},setBackgroundColor:function(){var t="background: #ffffff;";return this.backgroundColor&&(t="background: ".concat(this.backgroundColor,";")),t}},mounted:function(){var e=t.getSystemInfoSync().windowHeight;e-=t.getSystemInfoSync().statusBarHeight,"top"==this.type&&(e-=t.upx2px(88)),"bottom"==this.type&&(e-=t.upx2px(118)),"top-bottom"==this.type&&(e-=t.upx2px(206)),this.bodyHeight="min-height:".concat(e,"px")}};e.default=o}).call(this,o("6e42")["default"])},e03a:function(t,e,o){},e221:function(t,e,o){"use strict";var n=o("e03a"),u=o.n(n);u.a},ee13:function(t,e,o){"use strict";var n,u=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",function(){return u}),o.d(e,"c",function(){return a}),o.d(e,"a",function(){return n})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cmd-page-body/cmd-page-body-create-component',
    {
        'components/cmd-page-body/cmd-page-body-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("7d7d"))
        })
    },
    [['components/cmd-page-body/cmd-page-body-create-component']]
]);
