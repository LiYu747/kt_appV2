(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    ["components/sub-botn/subbotn"], {
        "090f": function (t, n, o) {
            "use strict";
            var u = o("550a"),
                e = o.n(u);
            e.a
        },
        "36b6": function (t, n, o) {
            "use strict";
            (function (t) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }), n.default = void 0;
                var o = {
                    name: "",
                    components: {},
                    props: {
                        ids: {
                            type: String
                        }
                    },
                    data: function () {
                        return {
                            icondata: [{
                                icon: "https://oss.kuaitongkeji.com/static/img/app/forum/home2.png",
                                titel: "论坛主页"
                            }, {
                                icon: "https://oss.kuaitongkeji.com/static/img/app/forum/photo1.png",
                                url: '/pages/communityForum/release/release'
                            }, {
                                icon: "https://oss.kuaitongkeji.com/static/img/app/forum/my1.png",
                                titel: "我的",
                                url: "/pages/communityForum/myforum/forum"
                            }]
                        }
                    },
                    methods: {
                        add: function (n, o) {
                            n.url && t.redirectTo({
                                url: n.url + `?id=${this.ids}`
                            })
                        }
                    },
                    mounted: function () {
                        // console.log(this.ids)
                    },
                    onLoad: function () {},
                    filters: {},
                    computed: {},
                    watch: {},
                    directives: {}
                };
                n.default = o
            }).call(this, o("543d")["default"])
        },
        "550a": function (t, n, o) {},
        7569: function (t, n, o) {
            "use strict";
            var u;
            o.d(n, "b", (function () {
                return e
            })), o.d(n, "c", (function () {
                return i
            })), o.d(n, "a", (function () {
                return u
            }));
            var e = function () {
                    var t = this,
                        n = t.$createElement;
                    t._self._c
                },
                i = []
        },
        b84d: function (t, n, o) {
            "use strict";
            o.r(n);
            var u = o("36b6"),
                e = o.n(u);
            for (var i in u) "default" !== i && function (t) {
                o.d(n, t, (function () {
                    return u[t]
                }))
            }(i);
            n["default"] = e.a
        },
        e15b: function (t, n, o) {
            "use strict";
            o.r(n);
            var u = o("7569"),
                e = o("b84d");
            for (var i in e) "default" !== i && function (t) {
                o.d(n, t, (function () {
                    return e[t]
                }))
            }(i);
            o("090f");
            var c, a = o("f0c5"),
                r = Object(a["a"])(e["default"], u["b"], u["c"], !1, null, "32439152", null, !1, u["a"], c);
            n["default"] = r.exports
        }
    }
]);;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sub-botn/subbotn-create-component',
    {
        'components/sub-botn/subbotn-create-component': (function (module, exports, __webpack_require__) {
            __webpack_require__('543d')['createComponent'](__webpack_require__("e15b"))
        })
    },
    [
        ['components/sub-botn/subbotn-create-component']
    ]
]);