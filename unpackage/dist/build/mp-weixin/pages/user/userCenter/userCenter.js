(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/userCenter/userCenter"],{"6ea8":function(n,t,e){"use strict";e.r(t);var u=e("b1f2"),a=e("9f91");for(var c in a)"default"!==c&&function(n){e.d(t,n,(function(){return a[n]}))}(c);e("ca06");var o,r=e("f0c5"),s=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,"c622c3c6",null,!1,u["a"],o);t["default"]=s.exports},"9bca":function(n,t,e){"use strict";(function(n){e("d774");u(e("66fd"));var t=u(e("6ea8"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"9f91":function(n,t,e){"use strict";e.r(t);var u=e("e6af"),a=e.n(u);for(var c in u)"default"!==c&&function(n){e.d(t,n,(function(){return u[n]}))}(c);t["default"]=a.a},b1f2:function(n,t,e){"use strict";var u;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return u}));var a=function(){var n=this,t=n.$createElement;n._self._c},c=[]},ca06:function(n,t,e){"use strict";var u=e("e1c5"),a=e.n(u);a.a},e1c5:function(n,t,e){},e6af:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=c(e("78ac")),a=c(e("8031"));c(e("9381"));function c(n){return n&&n.__esModule?n:{default:n}}var o=function(){e.e("components/userCenter/headContent").then(function(){return resolve(e("c816"))}.bind(null,e)).catch(e.oe)},r=function(){e.e("components/userCenter/actionBar").then(function(){return resolve(e("85bf"))}.bind(null,e)).catch(e.oe)},s={name:"",components:{headContent:o,actionBar:r},props:{},data:function(){return{user:{}}},methods:{add:function(t){var e=this;t.signout&&n.showModal({title:"您确定要退出吗",success:function(n){n.confirm&&(a.default.flush({success:function(){e.loadUserData()}}),e.user={})}})},loadUserData:function(){var t=this;a.default.doOnlyTokenValid({showModal:!0,keepSuccess:!1,success:function(){u.default.userDeta({data:{},fail:function(t){n.showToast({title:"网络错误",icon:"none"})},success:function(n){200==n.statusCode&&200==n.data.code&&(t.user=n.data.data)}})},fail:function(){n.switchTab({url:"/pages/index/index"})}})}},mounted:function(){},onLoad:function(n){},onShow:function(){this.loadUserData()},filters:{},computed:{},watch:{},directives:{}};t.default=s}).call(this,e("543d")["default"])}},[["9bca","common/runtime","common/vendor"]]]);