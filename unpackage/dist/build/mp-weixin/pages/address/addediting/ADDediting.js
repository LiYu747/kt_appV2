(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/addediting/ADDediting"],{"0eab":function(e,t,a){},"0fb1":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("2cf7")),u=(i(a("9381")),i(a("78ac")));function i(e){return e&&e.__esModule?e:{default:e}}var o=function(){a.e("components/sub-unit/subunit").then(function(){return resolve(a("e864"))}.bind(null,a)).catch(a.oe)},l={name:"",components:{subunit:o},props:{},data:function(){return{titel:"地址详情",parameter:[{value:"",label:"姓名",disabled:!0},{value:"",label:"手机号码",disabled:!0},{value:"",label:"户型",disabled:!0},{value:"",label:"小区",disabled:!0},{value:"",label:"楼栋号",disabled:!0}],id:""}},methods:{goback:function(){e.navigateBack({delta:1})},getData:function(){var t=this;e.showLoading({title:"加载中..."}),n.default.listdetails({data:{id:this.id},fail:function(t){e.hideLoading(),e.showToast({title:"网络错误",icon:"none"})},success:function(a){if(e.hideLoading(),200==a.statusCode&&200==a.data.code){var n=a.data.data;1==n.type&&(t.parameter[2].value="户主"),2==n.type&&(t.parameter[2].value="家庭成员"),3==n.type&&(t.parameter[2].value="租户"),t.parameter[3].value=n.village_name,t.parameter[4].value=n.building_name+n.apartment_name+n.floor_name+n.room_name}}})},Userdata:function(){var t=this;u.default.userDeta({data:{},fail:function(t){e.showToast({title:"网络错误",icon:"none"})},success:function(e){if(200==e.statusCode&&200==e.data.code){var a=e.data.data;t.parameter[0].value=a.username,t.parameter[1].value=a.tel.slice(0,4)+"****"+a.tel.slice(7,11)}}})}},mounted:function(){},onShow:function(){this.Userdata(),this.getData()},onLoad:function(e){this.id=e.id},filters:{},computed:{},watch:{},directives:{}};t.default=l}).call(this,a("543d")["default"])},1910:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var n={uField:function(){return a.e("uview-ui/components/u-field/u-field").then(a.bind(null,"fb1c"))}},u=function(){var e=this,t=e.$createElement;e._self._c},i=[]},2503:function(e,t,a){"use strict";a.r(t);var n=a("0fb1"),u=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=u.a},3146:function(e,t,a){"use strict";(function(e){a("d774");n(a("66fd"));var t=n(a("c980"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"7f14":function(e,t,a){"use strict";var n=a("0eab"),u=a.n(n);u.a},c980:function(e,t,a){"use strict";a.r(t);var n=a("1910"),u=a("2503");for(var i in u)"default"!==i&&function(e){a.d(t,e,(function(){return u[e]}))}(i);a("7f14");var o,l=a("f0c5"),d=Object(l["a"])(u["default"],n["b"],n["c"],!1,null,"d619c67e",null,!1,n["a"],o);t["default"]=d.exports}},[["3146","common/runtime","common/vendor"]]]);