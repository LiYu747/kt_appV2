(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    ["components/home/CommunityNews/CommunityNews"], {
        "141b": function (t, n, a) {
            "use strict";
            a.r(n);
            var e = a("a2f5"),
                o = a.n(e);
            for (var i in e) "default" !== i && function (t) {
                a.d(n, t, (function () {
                    return e[t]
                }))
            }(i);
            n["default"] = o.a
        },
        3510: function (t, n, a) {
            "use strict";
            a.r(n);
            var e = a("8632"),
                o = a("141b");
            for (var i in o) "default" !== i && function (t) {
                a.d(n, t, (function () {
                    return o[t]
                }))
            }(i);
            a("8afa");
            var u, c = a("f0c5"),
                s = Object(c["a"])(o["default"], e["b"], e["c"], !1, null, "1d7de277", null, !1, e["a"], u);
            n["default"] = s.exports
        },
        8632: function (t, n, a) {
            "use strict";
            a.d(n, "b", (function () {
                return o
            })), a.d(n, "c", (function () {
                return i
            })), a.d(n, "a", (function () {
                return e
            }));
            var e = {
                    uNoticeBar: function () {
                        return a.e("uview-ui/components/u-notice-bar/u-notice-bar").then(a.bind(null, "3cb5"))
                    }
                },
                o = function () {
                    var t = this,
                        n = t.$createElement;
                    t._self._c
                },
                i = []
        },
        "8afa": function (t, n, a) {
            "use strict";
            var e = a("adcc"),
                o = a.n(e);
            o.a
        },
        a2f5: function (t, n, a) {
            "use strict";
            (function (t) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }), n.default = void 0;
                var e = o(a("a6bb"));

                function o(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }
                var i = {
                    name: "",
                    components: {},
                    props: {},
                    data: function () {
                        return {
                            news: [],
                            list: []
                        }
                    },
                    methods: {
                        getData: function () {
                            var n = this;
                            e.default.CommunityNews({
                                data: {},
                                fail: function (n) {
                                    t.showToast({
                                        title: "网络错误",
                                        icon: "none"
                                    })
                                },
                                success: function (t) {
                                    if (200 == t.statusCode && 200 == t.data.code) {
                                        var a = t.data.data.data;
                                        n.news = a, a.map((function (t) {
                                            n.list.push(t.title)
                                        }))
                                    }
                                }
                            })
                        },
                        godils: function (n) {
                            var a = "";
                            this.news.map((function (t, e) {
                                n == e && (a = t.id)
                            })), e.default.NewsDils({
                                data: {
                                    id: a
                                },
                                fail: function (n) {
                                    t.showToast({
                                        title: "网络错误",
                                        icon: "none"
                                    })
                                },
                                success: function (n) {
                                    if (200 == n.statusCode && 200 == n.data.code) {
                                        var a = n.data.data.content,
                                            e = n.data.data.title;
                                            var app = getApp();
                                            app.globalData.id = a
                                        t.navigateTo({
                                            url: `/pages/InformationDetails/InformationDetails/InformationDetails?title=${e}`
                                        })
                                    }
                                }
                            })
                        }
                    },
                    mounted: function () {
                        this.getData()
                    },
                    onLoad: function () {},
                    filters: {},
                    computed: {},
                    watch: {},
                    directives: {}
                };
                n.default = i
            }).call(this, a("543d")["default"])
        },
        adcc: function (t, n, a) {}
    }
]);;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/home/CommunityNews/CommunityNews-create-component',
    {
        'components/home/CommunityNews/CommunityNews-create-component': (function (module, exports, __webpack_require__) {
            __webpack_require__('543d')['createComponent'](__webpack_require__("3510"))
        })
    },
    [
        ['components/home/CommunityNews/CommunityNews-create-component']
    ]
]);