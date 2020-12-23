(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/visitapplication/visit/visit"], {
    1214: function (e, n, t) {
      "use strict";
      var i = t("2145"),
        a = t.n(i);
      a.a
    },
    2145: function (e, n, t) {},
    "2de7": function (e, n, t) {
      "use strict";
      (function (e) {
        Object.defineProperty(n, "__esModule", {
          value: !0
        }), n.default = void 0;
        var i = r(t("db9d")),
          a = r(t("a6bb")),
          o = (r(t("9381")), r(t("78ac"))),
          l = r(t("8031"));

        function r(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }
        var s = function () {
            Promise.all([t.e("common/vendor"), t.e("components/lb-picker/index")]).then(function () {
              return resolve(t("3ee2"))
            }.bind(null, t)).catch(t.oe)
          },
          u = function () {
            t.e("components/sub-unit/subunit").then(function () {
              return resolve(t("e864"))
            }.bind(null, t)).catch(t.oe)
          },
          c = function () {
            t.e("components/checkIn/enclosure/enclosure").then(function () {
              return resolve(t("fcd5"))
            }.bind(null, t)).catch(t.oe)
          },
          d = function () {
            t.e("components/checkIn/remarks/remarks").then(function () {
              return resolve(t("5b4f"))
            }.bind(null, t)).catch(t.oe)
          },
          f = {
            name: "",
            components: {
              subunit: u,
              enclosure: c,
              remarks: d,
              LbPicker: s
            },
            props: {},
            data: function () {
              return {
                record: [{
                  label: "拜访人姓名",
                  value: "",
                  required: !0,
                }, {
                  label: "拜访人手机号",
                  value: "",
                  required: !0,
                  disabled: !0
                }, {
                  label: "拜访人身份证",
                  value: "",
                  required: !0,
                  disabled: !0
                }, {
                  label: "被访问人姓名",
                  value: "",
                  required: !0,
                  disabled: !0
                }, {
                  label: "地址",
                  value: "",
                  disabled: !0,
                  placeholder: "请选择地址",
                  required: !0
                }],
                orgVillageLists: [],
                renderVillageLists: [],
                id: [],
                show: !1,
                value: [],
                valuename:'' //被访人姓名
              }
            },
            methods: {
              Onshow: function (e) {
                e == this.record.length - 1 && (this.show = !0)
              },
              itemlabel: function (e) {
                e == this.record.length - 1 && (this.show = !0)
              },
              confirm: function (e) {
                this.id = e.value;
                var n = "",
                  t = [],
                  i = [];
                e.map((function (e) {
                  i.push(e.extra), null != e.label && (n += e.label), null == e.value && e.value, t.push(e.value)
                })), this.id = i, this.value = t, this.record.map((function (e, t) {
                  4 === t && (e.value = n)
                }))
              },
              goback: function () {
                e.navigateBack({
                  delta: 1
                })
              },
              Submit: function () {
                var n = this;
                if ("" != this.valuename)
                  if (0 != this.id.length) {
                    e.showLoading({
                      title: "提交中..."
                    });
                    var t = this.$refs.marks.value;
                    a.default.VisitApplication({
                      data: {
                        hostName: this.valuename,
                        villageId: this.id[0],
                        buildingId: this.id[1],
                        apartmentId: this.id[2],
                        floorId: this.id[3],
                        roomId: this.id[4],
                        visitorRemark: t
                      },
                      fail: function (n) {
                        e.hideLoading(), e.showToast({
                          title: "网络错误",
                          icon: "none"
                        })
                      },
                      success: function (t) {
                        e.hideLoading(), 200 == t.statusCode ? 200 == t.data.code ? (e.showToast({
                          title: t.data.msg,
                          duration: 2e3
                        }), n.$refs.marks.value = "", n.valuename = "", n.record[4].value = "") : e.showToast({
                          title: t.data.msg,
                          icon: "none"
                        }) : e.showToast({
                          title: "网络请求出错",
                          icon: "none"
                        })
                      }
                    })
                  } else e.showToast({
                    title: "请选择地址",
                    icon: "none"
                  });
                else e.showToast({
                  title: "请输入被拜访人姓名",
                  icon: "none"
                })
              },
              gorecord: function () {
                e.navigateTo({
                  url: "/pages/visitapplication/goRecord/goRecord"
                })
              },
              loadVillageLists: function () {
                var n = this;
                i.default.selectLists({
                  data: {},
                  fail: function (n) {
                    e.showToast({
                      title: "网络错误",
                      icon: "none"
                    })
                  },
                  success: function (e) {
                    200 == e.statusCode && 200 == e.data.code && (n.orgVillageLists = e.data.data, n.renderMSelect())
                  }
                })
              },
              renderMSelect: function () {
                if (this.orgVillageLists && 0 != this.orgVillageLists.length) {
                  var e = [];
                  this.orgVillageLists.forEach((function (n, t) {
                    var i = {
                      label: n.name,
                      value: t,
                      extra: n.id,
                      children: []
                    };
                    if (!n.buildings) return !0;
                    n.buildings.forEach((function (e, n) {
                      var t = {
                        label: e.name,
                        value: n,
                        extra: e.id,
                        children: []
                      };
                      if (!e.apartments) return !0;
                      e.apartments.forEach((function (e, n) {
                        var i = {
                          label: e.name,
                          value: n,
                          extra: e.id,
                          children: []
                        };
                        if (!e.floors) return !0;
                        e.floors.forEach((function (e, n) {
                          var t = {
                            label: e.name,
                            value: n,
                            extra: e.id,
                            children: []
                          };
                          if (!e.rooms) return !0;
                          e.rooms.forEach((function (e, n) {
                            t.children.push({
                              label: e.room_number,
                              value: n,
                              extra: e.id
                            })
                          })), i.children.push(t)
                        })), t.children.push(i)
                      })), i.children.push(t)
                    })), e.push(i)
                  })), this.renderVillageLists = e
                } else this.renderVillageLists = []
              },
              loadUserData: function () {
                var n = this;
                e.showLoading({
                  title: "加载中..."
                }), l.default.doOnlyTokenValid({
                  showModal: !0,
                  keepSuccess: !1,
                  success: function () {
                    o.default.userDeta({
                      data: {},
                      fail: function (n) {
                        e.hideLoading(), e.showToast({
                          title: "网络错误",
                          icon: "none"
                        })
                      },
                      success: function (t) {
                        if (e.hideLoading(), 200 == t.statusCode && 200 == t.data.code) {
                          var i = t.data.data;
                          n.record[0].value = i.username, n.record[1].value = i.tel.slice(0, 3) + "****" + i.tel.slice(7, 11), n.record[2].value = i.id_card_no.slice(0, 3) + "**********" + i.id_card_no.slice(i.id_card_no.length - 4, i.id_card_no.length)
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
            mounted: function () {
              this.loadVillageLists()
            },
            onShow: function () {
              this.loadUserData()
            },
            onLoad: function () {},
            filters: {},
            computed: {},
            watch: {},
            directives: {}
          };
        n.default = f
      }).call(this, t("543d")["default"])
    },
    "666c": function (e, n, t) {
      "use strict";
      t.r(n);
      var i = t("a166"),
        a = t("fe49");
      for (var o in a) "default" !== o && function (e) {
        t.d(n, e, (function () {
          return a[e]
        }))
      }(o);
      t("1214");
      var l, r = t("f0c5"),
        s = Object(r["a"])(a["default"], i["b"], i["c"], !1, null, "7bcf7010", null, !1, i["a"], l);
      n["default"] = s.exports
    },
    "6e5f": function (e, n, t) {
      "use strict";
      (function (e) {
        t("d774");
        i(t("66fd"));
        var n = i(t("666c"));

        function i(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }
        e(n.default)
      }).call(this, t("543d")["createPage"])
    },
    a166: function (e, n, t) {
      "use strict";
      t.d(n, "b", (function () {
        return a
      })), t.d(n, "c", (function () {
        return o
      })), t.d(n, "a", (function () {
        return i
      }));
      var i = {
          uField: function () {
            return t.e("uview-ui/components/u-field/u-field").then(t.bind(null, "fb1c"))
          },
          uSelect: function () {
            return t.e("uview-ui/components/u-select/u-select").then(t.bind(null, "1ce0"))
          }
        },
        a = function () {
          var e = this,
            n = e.$createElement;
          e._self._c
        },
        o = []
    },
    fe49: function (e, n, t) {
      "use strict";
      t.r(n);
      var i = t("2de7"),
        a = t.n(i);
      for (var o in i) "default" !== o && function (e) {
        t.d(n, e, (function () {
          return i[e]
        }))
      }(o);
      n["default"] = a.a
    }
  },
  [
    ["6e5f", "common/runtime", "common/vendor"]
  ]
]);