$(function (){
	var time = "2018-04-12 17:53:06";
    // var stamp = transdate(time);
    var stamp = 1523526786;
	var $userNum = $('.user_num p span');
	var $numImg = $('.switchimg span')
	var $username = $('.username input');
	var $tel = $('.tel input');
	var $area = $('.area input');
	var $submit_btn = $('.submit_btn');
	

	$submit_btn.on('click',onsubmit)

	getUserNum();
	//报名人数
	function getUserNum(){
		$.ajax({
			type:'get',
			url:'http://supports.jiaju.com/index.php?app=api&ctrl=mt&act=count_by_stamp&callback=json',
			data:{stamp:stamp},
			dataType:'jsonp',
			success:function (data){
				if(data.status == 1){
					$userNum.html(data.data.total)
				}
			}
		})
	}

	//数字切换
	var index = 0;
	setInterval(function (){
		index ++;
		$numImg.eq(index%$numImg.length).addClass('cur').siblings('span').removeClass('cur')
	},350)

	//表单提交
	function onsubmit (){
		
		
		if(!doValidation()){
			return false;
		}
		var url = "http://supports.jiaju.com/index.php?app=api&ctrl=Mt&act=signup"
		//var origin = GetQueryString('origin')==null ? '今日头条' : GetQueryString('origin');
		data = {
			stamp:stamp,
			name:$username.val(), //姓名
			mobile:$tel.val(), //手机号
			address:$area.val(), //面积
			remark:GetQueryString('origin'), //来源
		};
		$.ajax({
			type:'get',
			url:url,
			data:data,
			dataType:'jsonp',
			success:function (data){
				if(data.code == 1){
					alert('报名成功!');
					//清空表单
					$username.val('')
					$tel.val('')
					$area.val('')
					var _num = parseInt($userNum.html())
					$userNum.html(_num+1);
				}else{
					alert(data.msg);
				}
			}
		})
	}

	//表单验证
	function doValidation(){
		if($username.val().length == 0){
			alert('请填写姓名')
			return false;
		}else if($tel.val().length == 0){
			alert('请填写电话')
			return false;
		}else if($area.val().length == 0){
			alert('请填写面积')
			return false;
		}else if(checkName($username.val()) && checkMobile($tel.val()) && checkArea($area.val())){
			return true;
		}
	}

	//验证姓名
	function checkName(str){
		var maxlen = 4, minlen = 2;
	    if ( $('#s-name').length>0) {
	        maxlen = $('#s-name').attr('maxlen') || 4;
	        minlen = $('#s-name').attr('minlen') || 2;
	    }
	    var _str= "/^[\u4E00-\u9FA5]+$/";    ///^[\u4E00-\u9FA5]+$/
	    var reg = eval(_str.replace(' ',''));
	    if (!reg.test(str)) {
	      alert("请输入正确的中文姓名!");
	      if($('#s-name').length>0) {  $('#s-name').focus();}
	      return false;
	    }
	    if (   $.trim(str).length < minlen ||  $.trim(str).length > maxlen) {
	      alert("姓名长度应限制在"+minlen+"-"+maxlen+"个中文");
	      if($('#s-name').length>0) {  $('#s-name').focus();}
	      return false;
	    }
	    if (reg.test(str) &&   $.trim(str).length >= minlen &&   $.trim(str).length <= maxlen) {
	        return true;
	    }
	}

	//验证手机号
	function checkMobile(str){
		var _str= "/^1[34578]\\d{9}$/";
	    var reg = eval(_str.replace(' ',''));
	    if (reg.test(str)) { return true; }
	    alert('请填写正确的手机号');
	    return false;
	}

	//验证面积
	function checkArea(str){
		if(str>0 && str<=9999){
			return true;
		}else{
			alert('请填写正确的面积');
			return false;
		}
	}
 	
 	//时间戳
	function transdate(endTime){
		var date = new Date();
	    date.setFullYear(endTime.substring(0, 4));
	    date.setMonth(endTime.substring(5, 7) - 1);
	    date.setDate(endTime.substring(8, 10));
	    date.setHours(endTime.substring(11, 13));
	    date.setMinutes(endTime.substring(14, 16));
	    date.setSeconds(endTime.substring(17, 19));
	    return Date.parse(date) / 1000;
	}


	// function transdate(endTime){
	// 	var date = new Date(endTime);
	// 	return date.getTime() / 1000;
	// }

	//获取url参数
	function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null && decodeURI(r[2]) != '')
            return decodeURI(r[2]);
        return null;
    }
})