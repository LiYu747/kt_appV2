(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/communityForum/myforum/forum"], {
    "01da": function (t, n, e) {
      "use strict";
      var a;
      e.d(n, "b", (function () {
        return i
      })), e.d(n, "c", (function () {
        return o
      })), e.d(n, "a", (function () {
        return a
      }));
      var i = function () {
          var t = this,
            n = t.$createElement,
            e = (t._self._c, t.lists.length > 0 ? t.__map(t.lists, (function (n, e) {
              var a = t.__get_orig(n),
                i = n.album.slice(0, 3),
                o = n.created_at.slice(0, 16);
              return {
                $orig: a,
                l0: i,
                g0: o
              }
            })) : null);
          t.$mp.data = Object.assign({}, {
            $root: {
              l1: e
            }
          })
        },
        o = []
    },
    5676: function (t, n, e) {
      "use strict";
      var a = e("7d76"),
        i = e.n(a);
      i.a
    },
    7227: function (t, n, e) {
      "use strict";
      e.r(n);
      var a = e("01da"),
        i = e("7e32");
      for (var o in i) "default" !== o && function (t) {
        e.d(n, t, (function () {
          return i[t]
        }))
      }(o);
      e("5676");
      var s, c = e("f0c5"),
        u = Object(c["a"])(i["default"], a["b"], a["c"], !1, null, "17efac54", null, !1, a["a"], s);
      n["default"] = u.exports
    },
    "7d76": function (t, n, e) {},
    "7e32": function (t, n, e) {
      "use strict";
      e.r(n);
      var a = e("a4d5"),
        i = e.n(a);
      for (var o in a) "default" !== o && function (t) {
        e.d(n, t, (function () {
          return a[t]
        }))
      }(o);
      n["default"] = i.a
    },
    a4d5: function (t, n, e) {
      "use strict";
      (function (t) {
        Object.defineProperty(n, "__esModule", {
          value: !0
        }), n.default = void 0;
        var a = s(e("db9d")),
          i = (s(e("9381")), s(e("78ac"))),
          o = s(e("8031"));

        function s(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        }
        var c = function () {
            e.e("components/sub-unit/subunit").then(function () {
              return resolve(e("e864"))
            }.bind(null, e)).catch(e.oe)
          },
          u = function () {
            e.e("components/sub-botn/submy").then(function () {
              return resolve(e("4525"))
            }.bind(null, e)).catch(e.oe)
          },
          d = {
            name: "",
            components: {
              subunit: c,
              submy: u
            },
            props: {},
            data: function () {
              return {
                id: "",
                til: ["我发布的", "我参与的"],
                scrollTop: 0,
                idx: 0,
                username: "",
                lists: [],
                page: 1,
                text: "",
                isLoding: !1,
                hasMore: !0,
                code: 1,
                data1: [],
                page1: 1,
                text1: "",
                isLoding1: !1,
                hasMore1: !0,
                code1: 1,
                clientX: ""
              }
            },
            methods: {
              add: function (n) {
                this.idx = n, t.pageScrollTo({
                  scrollTop: 0,
                  duration: 0
                })
              },
              start: function (t) {
                this.clientX = t.changedTouches[0].clientX
              },
              end: function (n) {
                var e = n.changedTouches[0].clientX - this.clientX;
                if (e > 100) {
                  if (0 == this.idx) return;
                  this.idx = 0, t.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                  })
                } else if (e < -100) {
                  if (1 == this.idx) return;
                  this.idx = 1, t.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                  })
                }
              },
              loadPageData: function () {
                var n = this;
                this.isLoding = !0, o.default.doOnlyTokenValid({
                  keepSuccess: !1,
                  showModal: !0,
                  fail: function () {
                    n.isLoding = !1, t.navigateBack({
                      delta: 1
                    })
                  },
                  success: function () {
                    a.default.SelfComments({
                      data: {
                        villageId: n.id,
                        page: n.page
                      },
                      fail: function (e) {
                        n.isLoding = !1, t.showToast({
                          title: "网络错误",
                          icon: "none"
                        })
                      },
                      success: function (t) {
                        if (n.isLoding = !1, 200 == t.statusCode && 200 == t.data.code) {
                          n.code = t.data.code;
                          var e = t.data.data;
                          n.page = e.current_page + 1, n.hasMore = !!e.next_page_url, n.lists = n.lists.concat(e.data)
                        }
                      }
                    })
                  }
                })
              },
              SelfPost: function () {
                var n = this;
                this.isLoding1 = !0, o.default.doOnlyTokenValid({
                  keepSuccess: !1,
                  showModal: !0,
                  fail: function () {
                    n.isLoding1 = !1
                  },
                  success: function () {
                    a.default.SelfPost({
                      data: {
                        page: n.page1
                      },
                      fail: function (e) {
                        n.isLoding1 = !1, t.showToast({
                          title: "网络错误",
                          icon: "none"
                        })
                      },
                      success: function (t) {
                        if (n.isLoding1 = !1, 200 == t.statusCode && 200 == t.data.code) {
                          var e = t.data.data;
                          n.page1 = e.from + 1, n.hasMore1 = !!e.next_page_url, n.data1 = n.data1.concat(e.data)
                        }
                      }
                    })
                  }
                })
              },
              gotoD: function (n) {
                t.navigateTo({
                  url: "/components/forum/forumdils?id=".concat(n.id)
                })
              },
              reply: function (n) {
                t.navigateTo({
                  url: "/components/forum/forumdils?id=".concat(n.tribune_id)
                })
              },
              Userdata: function () {
                var n = this;
                i.default.userDeta({
                  data: {},
                  fail: function (n) {
                    t.showToast({
                      title: "网络错误",
                      icon: "none"
                    })
                  },
                  success: function (t) {
                    if (200 == t.statusCode && 200 == t.data.code) {
                      var e = t.data.data;
                      n.username = e.username
                    }
                  }
                })
              }
            },
            mounted: function () {},
            onReachBottom: function () {
              if (0 == this.idx) {
                if (this.text = "没有更多了~", 1 == this.isLoding || 0 == this.hasMore) return;
                this.loadPageData()
              } else if (1 == this.idx) {
                if (this.text1 = "没有更多了~", 1 == this.isLoding1 || 0 == this.hasMore1) return;
                this.SelfPost()
              }
            },
            onLoad: function (t) {
              this.id = t.id
            },
            onShow: function () {
              this.loadPageData(), this.data1 = [], this.page1 = 1, this.SelfPost(), this.Userdata()
            },
            filters: {},
            computed: {},
            watch: {},
            directives: {}
          };
        n.default = d
      }).call(this, e("543d")["default"])
    },
    c4ac: function (t, n, e) {
      "use strict";
      (function (t) {
        e("d774");
        a(e("66fd"));
        var n = a(e("7227"));

        function a(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        }
        t(n.default)
      }).call(this, e("543d")["createPage"])
    }
  },
  [
    ["c4ac", "common/runtime", "common/vendor"]
  ]
]);