
// http://supports.jiaju.com/index.php?app=api&ctrl=Mt&act=signup&did=&stamp=1534129910&callback=jQuery17209081031806476814_1534132621738&channel=1&name=%E5%8F%91%E9%80%81%E5%88%B0&mobile=13716959875&callback=jsonp1&_=1534132644706
    $(function () {    
        var $signName = $('.signName'),
            $signPhone = $('.signPhone');
        // 点击报名
        $('.sign').click(function () {
            if (doValidation()) {
                var url = "http://supports.jiaju.com/index.php?app=api&ctrl=Mt&act=signup&did=&stamp=1534129910"
                data = {
                    name: $signName.val(), //姓名
                    mobile: $signPhone.val(), //手机号
                };
                $.ajax({
                    type: 'get',
                    url: url,
                    data: data,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.code == 1) {
                            alert('报名成功!');
                            //清空表单
                            $signName.val('')
                            $signPhone.val('')
                        } else {
                            alert(data.msg);
                        }
                    }
                })
            }

        })

        //验证手机号
        function checkMobile(str) {
            var _str = "/^1[34578]\\d{9}$/";
            var reg = eval(_str.replace(' ', ''));
            if (reg.test(str)) { return true; }
            alert('请填写正确的手机号');
            return false;
        }
        //验证姓名
        function checkName(str) {
            var maxlen = 4, minlen = 2;
            if ($('#s-name').length > 0) {
                maxlen = $('#s-name').attr('maxlen') || 4;
                minlen = $('#s-name').attr('minlen') || 2;
            }
            var _str = "/^[\u4E00-\u9FA5]+$/";
            var reg = eval(_str.replace(' ', ''));
            if (!reg.test(str)) {
                alert("请输入正确的中文姓名!");
                if ($('#s-name').length > 0) { $('#s-name').focus(); }
                return false;
            }
            if ($.trim(str).length < minlen || $.trim(str).length > maxlen) {
                alert("姓名长度应限制在" + minlen + "-" + maxlen + "个中文");
                if ($('#s-name').length > 0) { $('#s-name').focus(); }
                return false;
            }
            if (reg.test(str) && $.trim(str).length >= minlen && $.trim(str).length <= maxlen) {
                return true;
            }
        }
        //表单验证
        function doValidation() {
            if ($signName.val().length == 0) {
                alert('请填写姓名')
                return false;
            } else if ($signPhone.val().length == 0) {
                alert('请填写电话')
                return false;
            } else if (checkName($signName.val()) && checkMobile($signPhone.val())) {
                return true;
            }
        }
    })
