(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/classification/deliciousFood/deliciousFood"], {
    "55db": function (i, t, a) {
      "use strict";
      a.r(t);
      var o = a("c29e"),
        e = a.n(o);
      for (var s in o) "default" !== s && function (i) {
        a.d(t, i, (function () {
          return o[i]
        }))
      }(s);
      t["default"] = e.a
    },
    "940d": function (i, t, a) {
      "use strict";
      a.r(t);
      var o = a("a638"),
        e = a("55db");
      for (var s in e) "default" !== s && function (i) {
        a.d(t, i, (function () {
          return e[i]
        }))
      }(s);
      a("abf4");
      var c, n = a("f0c5"),
        l = Object(n["a"])(e["default"], o["b"], o["c"], !1, null, "5bd94a00", null, !1, o["a"], c);
      t["default"] = l.exports
    },
    a638: function (i, t, a) {
      "use strict";
      var o;
      a.d(t, "b", (function () {
        return e
      })), a.d(t, "c", (function () {
        return s
      })), a.d(t, "a", (function () {
        return o
      }));
      var e = function () {
          var i = this,
            t = i.$createElement;
          i._self._c
        },
        s = []
    },
    abf4: function (i, t, a) {
      "use strict";
      var o = a("f854"),
        e = a.n(o);
      e.a
    },
    c29e: function (i, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = function () {
          a.e("components/sub-class/subclass").then(function () {
            return resolve(a("ece8"))
          }.bind(null, a)).catch(a.oe)
        },
        e = {
          name: "",
          components: {
            subclass: o
          },
          props: {},
          data: function () {
            return {
              till: ["全部", "火锅", "烧烤", "快餐小吃"],
              idx: 0,
              getData: [],
              locadata: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo1.png",
                name: "大鱼海塘纸包烤鱼（海昌路店）",
                score: "4.2",
                Price: "￥49/人",
                Views: "5624人浏览",
                titel: " 烤鱼    ",
                address: " 天府新区",
                label: "掌柜说：全家都能吃的“经典蒜香”烤鱼。"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo2.png",
                name: "乡村基（华阳家乐福店）",
                score: "3.2",
                Price: "￥60/人",
                Views: "5587人浏览",
                titel: " 快餐简餐   ",
                address: " 华阳",
                tag: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/tag1.png"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo3.png",
                name: "安德鲁森（复地御香山店）",
                score: "3.0",
                Price: "￥20/人",
                Views: "87865人浏览",
                titel: " 面包蛋糕   ",
                address: "    华阳    ",
                label: "从这边出去比较方便"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo4.png",
                name: "锅首老火锅（华阳店）",
                score: "5.0",
                Price: "暂无均价",
                Views: "2896人浏览",
                titel: " 火锅  ",
                address: " 高新区",
                label: "主要价格很合理"
              }],
              locadata1: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo5.png",
                name: "稳拈市井老灶火锅",
                score: "4.0",
                Price: "￥49/人",
                Views: "5024人浏览",
                titel: " 四川火锅     ",
                address: " 华阳",
                label: "“餐厅环境优美，每处细节都特别用心”"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo6.png",
                name: "牛杂火锅",
                score: "3.2",
                Price: "￥60/人",
                Views: "5587人浏览",
                titel: " 火锅     ",
                address: " 华阳",
                label: "“只能用软嫩耙糯来形容，安逸得板”"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo4.png",
                name: "锅首老火锅（华阳店）",
                score: "5.0",
                Price: "暂无均价",
                Views: "2896人浏览",
                titel: " 火锅 ",
                address: " 高新区",
                label: "主要价格很合理"
              }],
              locadata2: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo7.png",
                name: "宜宾把把烧",
                score: "4.0",
                Price: "￥19/人",
                Views: "524人浏览",
                titel: " 烧烤烤串      ",
                address: " 华阳",
                label: "“只能用软嫩耙糯来形容，安逸得板”"
              }, {
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo8.png",
                name: "乐山刘记烧烤（华阳店）",
                score: "3.2",
                Price: "￥26/人",
                Views: "557人浏览",
                titel: " 烧烤     ",
                address: " 华阳",
                label: "“走在门口很有礼貌的们你吃烧烤吗”"
              }],
              locadata3: [{
                image: "https://oss.kuaitongkeji.com/static/img/app/classification/deliciousFood/logo9.png",
                name: "炸小明",
                score: "4.0",
                Price: "￥39/人",
                Views: "324人浏览",
                titel: " 小吃快餐       ",
                address: "  天府新区",
                label: "“小龙虾推荐香辣味，48元一斤，很实在”"
              }]
            }
          },
          methods: {
            add: function (i) {
              this.idx = i, 0 == i && (this.getData = this.locadata), 1 == i && (this.getData = this.locadata1), 2 == i && (this.getData = this.locadata2), 3 == i && (this.getData = this.locadata3)
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
      t.default = e
    },
    d0ae: function (i, t, a) {
      "use strict";
      (function (i) {
        a("d774");
        o(a("66fd"));
        var t = o(a("940d"));

        function o(i) {
          return i && i.__esModule ? i : {
            default: i
          }
        }
        i(t.default)
      }).call(this, a("543d")["createPage"])
    },
    f854: function (i, t, a) {}
  },
  [
    ["d0ae", "common/runtime", "common/vendor"]
  ]
]);