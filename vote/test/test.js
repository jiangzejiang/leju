! function (e) {
    e.cookieUtil = function () {
        var e = {};
        return e.get = function (e) {
                e = e.replace(/([\.\[\]\$])/g, "\\$1");
                var t = new RegExp(e + "=([^;]*)?;", "i"),
                    n = document.cookie + ";",
                    o = n.match(t);
                return o ? unescape(o[1]) || "" : ""
            },
            e.set = function (e, t, n, o, i, a) {
                var d = [];
                if (d.push(e + "=" + escape(t)),
                    n) {
                    var c = new Date;
                    if ("today" == n)
                        c.setHours(23),
                        c.setMinutes(59),
                        c.setSeconds(59),
                        c.setTime(c.getTime());
                    else {
                        var s = c.getTime() + 36e5 * n;
                        c.setTime(s)
                    }
                    d.push("expires=" + c.toGMTString())
                }
                o && d.push("path=" + o),
                    i && d.push("domain=" + i),
                    a && d.push(a),
                    document.cookie = d.join(";")
            },
            e["delete"] = function (e) {
                document.cookie = e + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;"
            },
            e
    }()
}(window),
function (e, t) {
    e.tncode = {
        _obj: null,
        _img: null,
        _isdrawBg: !1,
        _block_start_x: 0,
        _block_start_y: 0,
        _doing: !1,
        _loading: !1,
        _mark_w: 50,
        _mark_h: 50,
        _mark_offset: 0,
        _img_w: 240,
        _img_h: 150,
        _result: !1,
        _msgTimer: null,
        surid: "",
        startMove: function (e) {
            e.preventDefault();
            var t = window.event || e;
            t.touches && (t = t.touches[0]),
                tncode._block_start_x = t.clientX,
                tncode._block_start_y = t.clientY,
                tncode._doing = !0
        },
        onMove: function (e) {
            e.preventDefault();
            var n = window.event || e;
            if (n.touches && (n = n.touches[0]), !tncode._doing)
                return !0;
            if (!tncode._loading) {
                var o = n.clientX - tncode._block_start_x;
                0 > o && (o = 0);
                var i = tncode._img_w - tncode._mark_w;
                o > i && (o = i),
                    t(".slide_block_text").hide(),
                    t(".slide_block").css({
                        "-webkit-transform": "translate3d(" + o + "px, 0, 0)",
                        "-moz-transform": "translate3d(" + o + "px, 0, 0)",
                        transform: "translate3d(" + o + "px, 0, 0)"
                    }),
                    tncode._mark_offset = o / i * (tncode._img_w - tncode._mark_w),
                    tncode.drawMark()
            }
        },
        moveEnd: function (e) {
            var t = window.event || e;
            return t.touches && (t = t.touches[0]),
                tncode._doing ? void(tncode._loading || (tncode._doing = !1,
                    tncode.sendVote())) : !0
        },
        sendVote: function () {
            var e = this;
            e._result = !1,
                e.vote && e.vote(e._mark_offset, this)
        },
        success: function () {
            tncode.showMsg("√验证成功", 1),
                tncode._result = !0,
                t(".hgroup").show(),
                setTimeout(tncode.hide, 1e3)
        },
        failure: function (e) {
            e = e || "验证失败";
            var n = t(".tncode_div");
            n.addClass("dd"),
                setTimeout(function () {
                    n.removeClass("dd")
                }, 200),
                tncode._result = !1,
                tncode.showMsg(e)
        },
        drawFullBg: function () {
            var e = t(".tncode_canvas_bg")[0],
                n = e.getContext("2d");
            n.drawImage(tncode._img, 0, 2 * tncode._img_h, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h)
        },
        drawBg: function () {
            if (!tncode._isdrawBg) {
                tncode._isdrawBg = !0;
                var e = t(".tncode_canvas_bg")[0],
                    n = e.getContext("2d");
                n.drawImage(tncode._img, 0, 0, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h)
            }
        },
        drawMark: function () {
            var e = t(".tncode_canvas_mark")[0],
                n = e.getContext("2d"),
                o = null;
            n.clearRect(0, 0, e.width, e.height),
                n.drawImage(tncode._img, 0, tncode._img_h, tncode._mark_w, tncode._img_h, tncode._mark_offset, 0, tncode._mark_w, tncode._img_h),
                o = n.getImageData(0, 0, tncode._img_w, tncode._img_h);
            for (var i = o.data, a = tncode._img_h, d = tncode._img_w, c = 0; a > c; c++)
                for (var s = 1, r = -1, _ = 0; d > _ && _ >= 0 && _ > r;) {
                    var l = 4 * (c * d + _);
                    _ += s;
                    var u = i[l],
                        h = i[l + 1],
                        m = i[l + 2];
                    if (200 > u + h + m)
                        i[l + 3] = 0;
                    else {
                        var g = [1, -5],
                            f = [250, 0];
                        for (l = 1; l < g[0] - g[1]; l++) {
                            var v = g[0] - 1 * l,
                                w = parseInt(f[0] - (f[0] - f[1]) / (g[0] - g[1]) * l),
                                p = 4 * (c * d + _ + v * s);
                            i[p + 3] = w
                        }
                        if (-1 == s)
                            break;
                        r = _,
                            _ = d - 1,
                            s = -1
                    }
                }
            n.putImageData(o, 0, 0),
                tncode.hideLoading()
        },
        reset: function () {
            t(".slide_block").css({
                    "-webkit-transform": "translate3d(0, 0, 0)",
                    "-moz-transform": "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0)"
                }),
                tncode._mark_offset = 0,
                tncode.refresh()
        },
        show: function () {
            var e = t(".hgroup");
            e[0] && e.hide();
            var n = t(".tncode_canvas_mark")[0],
                o = t(".tncode_canvas_bg")[0],
                i = n.getContext("2d"),
                a = o.getContext("2d");
            i.clearRect(0, 0, n.width, n.height),
                a.clearRect(0, 0, o.width, o.height),
                tncode.refresh(),
                t("#tncode_div_wrap").css("display", "block")
        },
        hide: function () {
            t("#tncode_div_wrap").hide()
        },
        showLoading: function () {
            var e = t(".tncode_canvas_mark")[0],
                n = t(".tncode_canvas_bg")[0],
                o = e.getContext("2d"),
                i = n.getContext("2d");
            o.clearRect(0, 0, e.width, e.height),
                i.clearRect(0, 0, n.width, n.height),
                tncode._loading = !0,
                t(".tncode_loading").show()
        },
        hideLoading: function () {
            tncode._loading = !1,
                t(".tncode_loading").hide()
        },
        showMsg: function (e, n) {
            var o = null;
            n ? o = t(".tncode_msg_ok") : (n = 0,
                    o = t(".tncode_msg_error")),
                o.text(e),
                o.show(),
                clearTimeout(tncode._msgTimer),
                tncode._msgTimer = setTimeout(function () {
                    o.hide(),
                        n || tncode.reset()
                }, 1e3)
        },
        insertHtml: function () {
            var e = t("#tncode_div_wrap");
            if (!e[0]) {
                var n = '<div id="tncode_div_wrap"><div class="tncode_div_bg"></div><div class="tncode_div" id="tncode_div"><div class="tncode_loading">loading...</div><canvas class="tncode_canvas_bg"></canvas><canvas class="tncode_canvas_mark"></canvas><div class="hgroup"></div><div class="tncode_msg_error"></div><div class="tncode_msg_ok"></div><div class="slide"><div class="slide_block"></div><div class="slide_block_text">拖动左边滑块完成上方拼图</div></div><div class="tools"><div class="tncode_close"></div><div class="tncode_refresh"></div></div></div></div>';
                t("body").append(n)
            }
        },
        refresh: function () {
            var e;
            tncode.showLoading(),
                tncode._isdrawBg = !1,
                tncode._result = !1,
                tncode._mark_offset = 0,
                tncode._img = new Image,
                e = "http://m.survey.leju.com/img_checkcode/" + tncode.surid + "/?t=" + Math.random(),
                tncode._img.onload = function () {
                    var e = t(".tncode_canvas_mark")[0],
                        n = e.getContext("2d");
                    n.clearRect(0, 0, e.width, e.height),
                        tncode.drawBg(),
                        tncode.drawMark()
                },
                tncode._img.src = e,
                t(".slide_block").css({
                    "-webkit-transform": "translate3d(0, 0, 0)",
                    "-moz-transform": "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0)"
                }),
                t(".slide_block_text").show()
        },
        init: function (e, n) {
            tncode.insertHtml(),
                t(".slide_block").css({
                    "-webkit-transform": "translate3d(0, 0, 0)",
                    "-moz-transform": "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0)"
                }),
                t(".slide_block").off("touchstart").on("touchstart", tncode.startMove),
                t(document).off("touchmove").on("touchmove", tncode.onMove),
                t(document).off("touchend").on("touchend", tncode.moveEnd),
                t(".tncode_close").off("touchstart").on("touchstart", function (e) {
                    e.preventDefault(),
                        tncode.hide()
                }),
                t(".tncode_refresh").off("touchstart").on("touchstart", tncode.refresh),
                e && n ? (tncode.surid = e,
                    tncode.vote = n) : console.log("vote error"),
                tncode.show()
        }
    }
}(window, Zepto),
function () {
    function e(e, t) {
        var n = document.createElement("script");
        n.setAttribute("type", "text/javascript"),
            n.setAttribute("src", e),
            "undefined" != typeof n && "function" == typeof t && (n.onload = t),
            document.getElementsByTagName("head")[0].appendChild(n)
    }

    function t() {
        var t = "http://m.leju.com/index.php?site=api&ctl=initjssdk&act=index&url=" + encodeURIComponent(location.href);
        wxShareData.weixin_house_id && (t += "&weixin_house_id=" + wxShareData.weixin_house_id);
        var n = "wx_" + (new Date).getTime().toString(36);
        t += "&callback=" + n,
            window[n] = o,
            e(t, function () {
                delete window[n]
            })
    }

    function n(e, t) {
        e.config({
                debug: wxShareData.debug ? wxShareData.debug : !1,
                appId: t.appid,
                timestamp: t.timestamp,
                nonceStr: t.noncestr,
                signature: t.signature,
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

    function o(t) {
        window.wx ? n(window.wx, t) : e("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function () {
            n(wx, t)
        })
    }
    window.weixinInit = function (e) {
        wxShareData = e,
            t()
    }
}(),
$(function () {
    var e = $(".wtceo_ttyp"),
        t = $(".zyts_pop"),
        n = $(".zyts_btn"),
        o = $(".zyts_know"),
        i = $(".wt_alert"),
        a = $(".close"),
        d = function (e, t) {
            1 == e ? (i.find("span").remove(),
                i.show().find("p").text(t)) : (i.find("p").remove(),
                i.find(".close").after("<span style=\"margin: 2rem 0 0 0.15625rem; font-size: 1rem; font-family: 'Microsoft YaHei'; line-height: 1.625rem; color: #977b51; display: block; padding: 0 0.5rem;\"></span>"),
                i.show().find("span").text(t))
        };
    cookieUtil.get("VOTE_STATUS_" + $(".oidval").val()) && e.addClass("wtceo_zhihui"),
        e.on("touchend", function (t) {
            t.preventDefault();
            var n = $(".suridval").val(),
                o = "qid" + $(".qidval").val(),
                i = $(".oidval").val(),
                a = {};
            $(this).hasClass("wtceo_zhihui") || cookieUtil.get("VOTE_STATUS_" + i) || (a.sur_id = n,
                a[o] = i,
                tncode.init(n, function (t) {
                    var n = this;
                    a.tn_r = t,
                        a.num = cookieUtil.get("num") || "",
                        $.ajax({
                            url: "http://survey.leju.com/sub_attr/",
                            type: "POST",
                            data: a,
                            dataType: "json",
                            success: function (t) {
                                1 == t.status ? (n.success(),
                                    e.addClass("wtceo_zhihui"),
                                    cookieUtil.set("VOTE_STATUS_" + i, "1", "today", "/"),
                                    d(1, "投票成功!")) : -1 == t.status ? n.failure(t.msg) : (-2 == t.status && (cookieUtil.set("VOTE_STATUS_" + i, "1", "today", "/"),
                                        e.addClass("wtceo_zhihui")),
                                    n.hide(),
                                    d(2, t.msg))
                            },
                            error: function () {
                                n.hide(),
                                    d(2, json.msg)
                            }
                        })
                }))
        }),
        n.on("touchend", function (e) {
            e.preventDefault(),
                t.show()
        }),
        o.on("touchend", function (e) {
            e.preventDefault(),
                t.hide()
        }),
        a.on("click", function (e) {
            e.preventDefault(),
                i.hide()
        }),
        weixinInit({
            desc: "",
            imgUrl: wxConfig.imgUrl,
            link: wxConfig.link,
            title: wxConfig.title
        })
});