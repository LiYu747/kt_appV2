(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/classification/motion/motion"], {
    1827: function (t, i, a) {
      "use strict";
      a.r(i);
      var o = a("3405"),
        s = a("9d4c");
      for (var e in s) "default" !== e && function (t) {
        a.d(i, t, (function () {
          return s[t]
        }))
      }(e);
      a("4b86");
      var n, c = a("f0c5"),
        l = Object(c["a"])(s["default"], o["b"], o["c"], !1, null, "cb9a1b8c", null, !1, o["a"], n);
      i["default"] = l.exports
    },
    1923: function (t, i, a) {},
    3405: function (t, i, a) {
      "use strict";
      var o;
      a.d(i, "b", (function () {
        return s
      })), a.d(i, "c", (function () {
        return e
      })), a.d(i, "a", (function () {
        return o
      }));
      var s = function () {
          var t = this,
            i = t.$createElement;
          t._self._c
        },
        e = []
    },
    "4b86": function (t, i, a) {
      "use strict";
      var o = a("1923"),
        s = a.n(o);
      s.a
    },
    "525f": function (t, i, a) {
      "use strict";
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.default = void 0;
      var o = function () {
          a.e("components/sub-class/subclass").then(function () {
            return resolve(a("ece8"))
          }.bind(null, a)).catch(a.oe)
        },
        s = {
          name: "",
          components: {
            subclass: o
          },
          props: {},
          data: function () {
            return {
              till: ["全部", "健身馆", "篮球", "羽毛球"],
              idx: 0,
              getData: [],
              locadata: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo1.png",
                name: "VIGOR LIFE健身训练中心（复地御香...）",
                score: "5.0",
                Price: "￥1035/人",
                Views: "5624人浏览",
                titel: " 私教工作室   ",
                address: " 华阳",
                label: "健身爱好者，力量训练爱好者的天堂",
                tag: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag1.png"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo2.png",
                name: "泳力健身游泳中心",
                score: "4.0",
                Price: "￥60/人",
                Views: "5587人浏览",
                titel: " 游泳 ",
                address: " 华阳",
                label: "去过恒温泳池数一数二的了"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo3.png",
                name: "99PARK篮球公园",
                score: "3.5",
                Price: "￥20/人",
                Views: "87865人浏览",
                titel: " 篮球    ",
                address: " 航空港",
                label: "免费停车"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo4.png",
                name: "弘羽羽毛球馆",
                score: "4.0",
                Price: "暂无均价",
                Views: "2896人浏览",
                titel: " 羽毛球  ",
                address: " 高新区",
                label: "健身爱好者，力量训练爱好者的天堂",
                tag: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag2.png"
              }],
              locadata1: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo5.png",
                name: "原始 Fitness",
                score: "4.0",
                Price: "￥60/人",
                Views: "2587人浏览",
                titel: " 私教工作室 ",
                address: " 华阳",
                label: "是周围数个健身房数一数二的质量了"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo1.png",
                name: "VIGOR LIFE健身训练中心（复地御香...）",
                score: "5.0",
                Price: "￥1035/人",
                Views: "5624人浏览",
                titel: " 私教工作室   ",
                address: " 华阳",
                label: "健身爱好者，力量训练爱好者的天堂",
                tag: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag1.png"
              }],
              locadata2: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo3.png",
                name: "99PARK篮球公园",
                score: "3.5",
                Price: "￥20/人",
                Views: "87865人浏览",
                titel: " 篮球    ",
                address: " 航空港",
                label: "免费停车"
              }],
              locadata3: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/logo4.png",
                name: "弘羽羽毛球馆",
                score: "4.0",
                Price: "暂无均价",
                Views: "2896人浏览",
                titel: " 羽毛球  ",
                address: " 高新区",
                label: "健身爱好者，力量训练爱好者的天堂",
                tag: "https://oss.kuaitongkeji.com/static/img/app/classification/motion/tag2.png"
              }]
            }
          },
          methods: {
            add: function (t) {
              this.idx = t, 0 == t && (this.getData = this.locadata), 1 == t && (this.getData = this.locadata1), 2 == t && (this.getData = this.locadata2), 3 == t && (this.getData = this.locadata3)
            }
          },
          onShow: function () {
            this.getData = this.locadata
          },
          mounted: function () {},
          onLoad: function () {},
          filters: {},
          computed: {},
          watch: {},
          directives: {}
        };
      i.default = s
    },
    "9d4c": function (t, i, a) {
      "use strict";
      a.r(i);
      var o = a("525f"),
        s = a.n(o);
      for (var e in o) "default" !== e && function (t) {
        a.d(i, t, (function () {
          return o[t]
        }))
      }(e);
      i["default"] = s.a
    },
    e6c4: function (t, i, a) {
      "use strict";
      (function (t) {
        a("d774");
        o(a("66fd"));
        var i = o(a("1827"));

        function o(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        }
        t(i.default)
      }).call(this, a("543d")["createPage"])
    }
  },
  [
    ["e6c4", "common/runtime", "common/vendor"]
  ]
]);