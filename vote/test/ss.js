$(function () {
    var test = window.location.href;
    // if(location.href.indexOf('#reloaded')==-1){
    //     location.href=location.href+"#reloaded"
    //     location.reload()
    // }
    var oid = (function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest;
        if (url.indexOf("?") != -1) {
            theRequest = url.slice(url.indexOf("?") + 1);
        }
        return theRequest;
    })();


    function renderData(report_list) {
        $('.details').html('');
        report_list.map(function (item, index) {
            if (item.oid === oid) {
                var data = report_list[index];
                // left
                var img = $('<img />').attr({
                    src: data.attrinfo.personal_photo
                }).css({
                    width: '6.6875rem',
                    height: '6.6875rem'
                });
                var wt_huangk = $('<div class="wt_huangk"></div>')
                var left = $('<div class="left"></div>').append(img, wt_huangk);

                // right
                var right = $('<div class="right"><span class="details_man"></span><div class="shelter"></div></div>')
                // right_name
                var right_name = $('<div class="right_name"></div>').append($('<h2></h2>').html(data.attrinfo.name)).append($('<p></p>').html(data.attrinfo.name_py));

                //right_company
                var right_company = $('<div class="right_company"></div>').append($('<p></p>').html('公司：' + data.attrinfo.sub_company)).append($('<p></p>').html('职位：' + data.attrinfo.postion));

                //right_details
                var right_details = $('<div class="right_details"></div>').html($('<p></p>').html(data.attrinfo.personal_desc));

                // click_button
                var left_button = $('<div class="left_button"></div>').append($('<a></a>').attr({
                    href: 'javascript:void(0)'
                }));
                var right_button = $('<div class="right_button"></div>').append($('<a></a>').attr({
                    // href: 'http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424557538326677564.html'
                    href: 'javascript:void(0)'
                    
                }));
                right_button.click(function() {
                    $('body').load('http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424557538326677564.html',function() {
                        console.log('load')
                    })
                })


                right.append(right_name, right_company, right_details);

                var click_button = $('<div class="click_button"></div>').append(left_button, right_button);
                $('.details').append(left, right, click_button);


                var inputs = $('<input type="radio"/>').attr({
                    name: "qid" + data.qid,
                    value: data.oid
                });
                $('#form1 li').append(inputs);

                left_button.click(function () {
                    // inputs.attr("checked","checked");
                    //$("#form1").submit();  
                    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&act=subAttr&sur_id=2156&qid13762=" + data.oid + "&callback=?", function (data) {
                        if (data.msg) {
                            alert(data.msg)
                        }
                    });
                })



            }
        })
    }
    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function (data) {
        renderData(data.data.question[0].option);
    });

})