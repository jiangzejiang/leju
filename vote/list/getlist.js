!
    function (e) {
        e.cookieUtil = function () {
            var e = {};
            return e.get = function (e) {
                e = e.replace(/([\.\[\]\$])/g, "\\$1");
                var n = new RegExp(e + "=([^;]*)?;", "i"),
                    t = document.cookie + ";",
                    i = t.match(n);
                return i ? unescape(i[1]) || "" : ""
            },
                e.set = function (e, n, t, i, a, o) {
                    var u = [];
                    if (u.push(e + "=" + escape(n)), t) {
                        var r = new Date,
                            c = r.getTime() + 36e5 * t;
                        r.setTime(c),
                            u.push("expires=" + r.toGMTString())
                    }
                    i && u.push("path=" + i),
                        a && u.push("domain=" + a),
                        o && u.push(o),
                        document.cookie = u.join(";")
                },
                e["delete"] = function (e) {
                    document.cookie = e + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;"
                },
                e
        }()
    }(window),
    $(function () {
        function e(e, n) {
            var t = document.createElement("script");
            t.setAttribute("type", "text/javascript"),
                t.setAttribute("src", e),
                "undefined" != typeof t && "function" == typeof n && (t.onload = n),
                document.getElementsByTagName("head")[0].appendChild(t)
        }
        function n() {
            var n = "http://m.leju.com/index.php?site=api&ctl=initjssdk&act=index&url=" + encodeURIComponent(location.href);
            wxShareData.weixin_house_id && (n += "&weixin_house_id=" + wxShareData.weixin_house_id);
            var t = "wx_" + (new Date).getTime().toString(36);
            n += "&callback=" + t,
                window[t] = i,
                e(n,
                    function () {
                        delete window[t]
                    })
        }
        function t(e, n) {
            e.config({
                debug: wxShareData.debug ? wxShareData.debug : !1,
                appId: n.appid,
                timestamp: n.timestamp,
                nonceStr: n.noncestr,
                signature: n.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
            }),
                e.ready(function () {
                    e.onMenuShareTimeline(wxShareData),
                        e.onMenuShareAppMessage(wxShareData),
                        e.onMenuShareQQ(wxShareData),
                        e.onMenuShareWeibo(wxShareData),
                        e.onMenuShareQZone(wxShareData)
                })
        }
        function i(n) {
            window.wx ? t(window.wx, n) : e("http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
                function () {
                    t(wx, n)
                })
        }
        function a(e) {
            wxShareData = e,
                n()
        }
        a({
            desc: "",
            imgUrl: wxConfig.imgUrl,
            link: wxConfig.link,
            title: wxConfig.title
        });
        var o = function (e, n) {
            var t = "...";
            if (void 0 !== e) return e.length > n ? e.substring(0, n) + t : e
        };
        $(".area.ac").length && $(".area.ac").each(function (e, n) {
            $(n).text(o($(n).text(), 15))
        }),
            $(".adress").length && $(".adress").each(function (e, n) {
                $(n).text(o($(n).text(), 17))
            }),
            $(".wttpjs").length && $(document).on("touchmove",
                function (e) {
                    e.preventDefault()
                }),
            $(".zyts_btn").on("touchend",
                function (e) {
                    e.preventDefault(),
                        $(".zyts_pop").show()
                }),
            $(".zyts_know").on("touchend",
                function (e) {
                    e.preventDefault(),
                        $(".zyts_pop").hide()
                })
    });

