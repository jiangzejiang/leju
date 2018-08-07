
$(function () {
    console.log('ready');
    var test = window.location.href;;
    console.log(test)

    var oid = (function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        console.log(url)
        var theRequest;
        if (url.indexOf("?") != -1) {
            theRequest = url.slice(url.indexOf("?") + 1);
        }
        return theRequest;
    })();
    console.log(oid)
    console.log('这是我获取到的' + oid);

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject();
    xhr.open('GET', 'http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156', true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200){
            var obj = JSON.parse(xhr.response);
            var report_list = obj.data.question[0].option;
            console.log(report_list); 
            $('.details').html('');
            report_list.map(function(item, index) {
                if(item.oid === oid) {
                    console.log(oid + ',   ' + index)
                    console.log(report_list[index]);
                    var data = report_list[index];
                    // left
                    var img = $('<img />').attr({src: data.attrinfo['个人照']});
                    var wt_huangk = $('<div class="wt_huangk"></div>')
                    var left = $('<div class="left"></div>').append(img, wt_huangk);
                    
                    // right
                    var right = $('<div class="right"><span class="details_man"></span><div class="shelter"></div></div>')
                    // right_name
                    var right_name = $('<div class="right_name"></div>').append($('<h2></h2>').html(data.attrinfo['姓名'])).append($('<p></p>').html(data.attrinfo['姓名拼音']));

                    //right_company
                    var right_company = $('<div class="right_company"></div>').append($('<p></p>').html('公司：' + data.attrinfo['分公司名'])).append($('<p></p>').html('职位：'+data.attrinfo['职位']));

                    //right_details
                    var right_details = $('<div class="right_details"></div>').html($('<p></p>').html(data.attrinfo['个人介绍']));
                    right.append(right_name, right_company, right_details);

                    // click_button
                    var left_button = $('<div class="left_button"></div>').append($('<a></a>').attr({href: '#'}));
                    var right_button = $('<div class="right_button"></div>').append($('<a></a>').attr({href: '#'}));
                    
                    var click_button = $('<div class="click_button"></div>').append(left_button, right_button);
                    $('.details').append(left, right, click_button);

                    left_button.click(function() {
                        $.ajax({
                            url: "http://survey.leju.com/sub_attr/",
                            type: "POST",
                            data: a,
                            dataType: "json",
                            success: function (t) {
                                alert('投票成功')
                                // 1 == t.status ? (n.success(),
                                //     e.addClass("wtceo_zhihui"),
                                //     cookieUtil.set("VOTE_STATUS_" + i, "1", "today", "/"),
                                //     d(1, "投票成功!")) : -1 == t.status ? n.failure(t.msg) : (-2 == t.status && (cookieUtil.set("VOTE_STATUS_" + i, "1", "today", "/"),
                                //         e.addClass("wtceo_zhihui")),
                                //     n.hide(),
                                //     d(2, t.msg))
                            },
                            error: function (e) {
                               alert("请求错误")
                            }
                        })
                        
                    })
                }
            })
            $.getJSON("zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&act=subAttr&sur_id=2156&qid13762=62085", function (data) {
                console.log('这是sfa')
                console.log(data);
                // renderData(data.data.question[0].option);
            });
        }
    }
  
})