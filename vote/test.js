/***2018-06-27 10:54:21***/
function getElementTop(e) {
    for (var t = e.offsetTop, s = e.offsetParent; null !== s;) t += s.offsetTop, s = s.offsetParent;
    return t
}
var sub = LJ.$(".js-survey-sub"),
    ques = LJ.$("#js-survey-content li"),
    erCode = LJ.$("#js-imageCode"),
    sur_id = document.getElementById("sur_id").value,
    url = "/captcha/" + sur_id + "/",
    oImg = document.getElementById("js-survey-code"),
    type, inputs, hasChecked, must, most, hasSelected, txt, pass, theCode;
document.getElementById("js-change-code") && (document.getElementById("js-change-code").onclick = function () {
    oImg.src = url + (new Date).getTime()
}), sub.bind("click", function (e) {
    return e.preventDefault ? e.preventDefault() : e.returnValue = !1, pass = !0, LJ.each(ques, function (e) {
        if (type = this.getAttribute("chk_type"), must = this.getAttribute("mast_chk"), "alone" == type) {
            if ("1" == must) {
                hasChecked = !1, inputs = this.getElementsByTagName("input");
                for (var t = 0; t < inputs.length; t++)
                    if (inputs[t].checked) {
                        hasChecked = !0;
                        break
                    }
            } else hasChecked = !0;
            if (!hasChecked) return pass = !1, alert("必选项最少选择一项"), document.body.scrollTop ? document.body.scrollTop = getElementTop(this) : document.documentElement.scrollTop = getElementTop(this), !1
        } else if ("more" == type) {
            most = parseInt(this.getAttribute("mostop")), must = this.getAttribute("mast_chk"), inputs = this.getElementsByTagName("input"), hasSelected = 0;
            for (var s = 0; s < inputs.length; s++) inputs[s].checked && hasSelected++;
            if (hasSelected > most) return pass = !1, alert("多选项不可超过最多可选数量"), document.body.scrollTop ? document.body.scrollTop = getElementTop(this) : document.documentElement.scrollTop = getElementTop(this), !1;
            if ("1" == must && 0 === hasSelected) return pass = !1, alert("必选项最少选择一项"), document.body.scrollTop ? document.body.scrollTop = getElementTop(this) : document.documentElement.scrollTop = getElementTop(this), !1
        } else if ("answer" == type && (must = this.getAttribute("mast_chk"), txt = this.getElementsByTagName("textarea")[0], "1" == must && 0 === txt.value.replace(/\s+/g, "").length)) return pass = !1, alert("必答题答案不可为空"), document.body.scrollTop ? document.body.scrollTop = getElementTop(this) : document.documentElement.scrollTop = getElementTop(this), !1
    }), pass ? 1 == erCode.length && 0 === erCode[0].value.replace(/\s+/g, "").length ? (pass = !1, alert("请填写验证码"), !1) : void(pass && (sub[0].value = "提交中 . . .", sub[0].disabled = "disabled", 1 == erCode.length ? (theCode = erCode[0].value.replace(/\s+/g, ""), LJ.ajax({
        url: "//survey.leju.com/check_code/",
        method: "POST",
        data: {
            sur_id: sur_id,
            check_num: theCode
        },
        completeListener: function (e) {
            var t = JSON.parse(this.responseText);
            0 === t.status ? (img.src = url + (new Date).getTime(), alert(t.msg), sub[0].value = "提交", sub[0].disabled = "") : document.getElementById("form1").submit()
        }
    })) : document.getElementById("form1").submit())) : !1
});