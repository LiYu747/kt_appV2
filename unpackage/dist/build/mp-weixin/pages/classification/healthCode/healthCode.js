(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/classification/healthCode/healthCode"], {
    1371: function (e, t, n) {
      "use strict";
      var o = n("7571"),
        a = n.n(o);
      a.a
    },
    "18df": function (e, t, n) {
      "use strict";
      (function (e) {
        n("d774");
        o(n("66fd"));
        var t = o(n("712a"));

        function o(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }
        e(t.default)
      }).call(this, n("543d")["createPage"])
    },
    6869: function (e, t, n) {
      "use strict";
      (function (e) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = void 0;
        var o = u(n("597d")),
          a = u(n("8031")),
          c = u(n("78ac"));

        function u(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }
        var i = function () {
            n.e("components/sub-class/subclass").then(function () {
              return resolve(n("ece8"))
            }.bind(null, n)).catch(n.oe)
          },
          d = function () {
            Promise.all([n.e("common/vendor"), n.e("components/qrcode/tki-qrcode/tki-qrcode")]).then(function () {
              return resolve(n("c7ca"))
            }.bind(null, n)).catch(n.oe)
          },
          r = {
            name: "",
            components: {
              subclass: i,
              tkiQrcode: d
            },
            props: {},
            data: function () {
              return {
                val: o.default.host + "?_t=675679454564354356",
                size: 500,
                unit: "upx",
                background: "#ffffff",
                foreground: "#057C0B",
                pdground: "#057C0B",
                icon: "",
                iconsize: 40,
                lv: 2,
                onval: !0,
                loadMake: !0,
                username: "",
                IDcard: "",
                timer: ""
              }
            },
            methods: {
              getTime: function () {
                var e = new Date,
                  t = e.getFullYear(),
                  n = e.getMonth() + 1,
                  o = e.getDate(),
                  a = e.getHours() < 10 ? "0" + e.getHours() : e.getHours(),
                  c = e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes();
                e.getSeconds(), e.getSeconds();
                n >= 1 && n <= 9 && (n = "0" + n), o >= 0 && o <= 9 && (o = "0" + o), this.timer = t + "-" + n + "-" + o + " " + a + ":" + c
              },
              loadUserData: function () {
                var t = this;
                e.showLoading({
                  title: "加载中..."
                }), a.default.doOnlyTokenValid({
                  showModal: !0,
                  keepSuccess: !1,
                  success: function () {
                    c.default.userDeta({
                      data: {},
                      fail: function () {
                        e.hideLoading(), e.showToast({
                          title: "网络错误",
                          icon: "none"
                        })
                      },
                      success: function (n) {
                        if (e.hideLoading(), 200 == n.statusCode && 200 == n.data.code) {
                          var o = n.data.data;
                          t.username = o.username, t.IDcard = o.id_card_no.slice(0, 3) + "**********" + o.id_card_no.slice(o.id_card_no.length - 4, o.id_card_no.length)
                        }
                      }
                    })
                  },
                  fail: function () {
                    e.hideLoading(), e.switchTab({
                      url: "/pages/index/index"
                    })
                  }
                })
              }
            },
            mounted: function () {},
            onShow: function () {
              this.loadUserData(), this.getTime()
            },
            onLoad: function () {},
            filters: {},
            computed: {},
            watch: {},
            directives: {}
          };
        t.default = r
      }).call(this, n("543d")["default"])
    },
    "712a": function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("aa98"),
        a = n("a2d7");
      for (var c in a) "default" !== c && function (e) {
        n.d(t, e, (function () {
          return a[e]
        }))
      }(c);
      n("1371");
      var u, i = n("f0c5"),
        d = Object(i["a"])(a["default"], o["b"], o["c"], !1, null, "2e4ff9d0", null, !1, o["a"], u);
      t["default"] = d.exports
    },
    7571: function (e, t, n) {},
    a2d7: function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n("6869"),
        a = n.n(o);
      for (var c in o) "default" !== c && function (e) {
        n.d(t, e, (function () {
          return o[e]
        }))
      }(c);
      t["default"] = a.a
    },
    aa98: function (e, t, n) {
      "use strict";
      var o;
      n.d(t, "b", (function () {
        return a
      })), n.d(t, "c", (function () {
        return c
      })), n.d(t, "a", (function () {
        return o
      }));
      var a = function () {
          var e = this,
            t = e.$createElement;
          e._self._c
        },
        c = []
    }
  },
  [
    ["18df", "common/runtime", "common/vendor"]
  ]
]);