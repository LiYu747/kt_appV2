(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/classification/community/community"], {
    "0062": function (n, t, e) {
      "use strict";
      e.r(t);
      var c = e("5613"),
        u = e.n(c);
      for (var o in c) "default" !== o && function (n) {
        e.d(t, n, (function () {
          return c[n]
        }))
      }(o);
      t["default"] = u.a
    },
    "00be": function (n, t, e) {},
    4278: function (n, t, e) {
      "use strict";
      e.r(t);
      var c = e("d5f4"),
        u = e("0062");
      for (var o in u) "default" !== o && function (n) {
        e.d(t, n, (function () {
          return u[n]
        }))
      }(o);
      e("5aca");
      var a, r = e("f0c5"),
        i = Object(r["a"])(u["default"], c["b"], c["c"], !1, null, "d4a20b6e", null, !1, c["a"], a);
      t["default"] = i.exports
    },
    5613: function (n, t, e) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var c = function () {
          e.e("components/sub-class/subclass").then(function () {
            return resolve(e("ece8"))
          }.bind(null, e)).catch(e.oe)
        },
        u = {
          name: "",
          components: {
            subclass: c
          },
          props: {},
          data: function () {
            return {}
          },
          methods: {},
          mounted: function () {},
          onLoad: function () {},
          filters: {},
          computed: {},
          watch: {},
          directives: {}
        };
      t.default = u
    },
    "5aca": function (n, t, e) {
      "use strict";
      var c = e("00be"),
        u = e.n(c);
      u.a
    },
    c29b: function (n, t, e) {
      "use strict";
      (function (n) {
        e("d774");
        c(e("66fd"));
        var t = c(e("4278"));

        function c(n) {
          return n && n.__esModule ? n : {
            default: n
          }
        }
        n(t.default)
      }).call(this, e("543d")["createPage"])
    },
    d5f4: function (n, t, e) {
      "use strict";
      var c;
      e.d(t, "b", (function () {
        return u
      })), e.d(t, "c", (function () {
        return o
      })), e.d(t, "a", (function () {
        return c
      }));
      var u = function () {
          var n = this,
            t = n.$createElement;
          n._self._c
        },
        o = []
    }
  },
  [
    ["c29b", "common/runtime", "common/vendor"]
  ]
]);