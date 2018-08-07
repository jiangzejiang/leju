$(function () {
    console.log(myCount);
    function doFunction(item) {
        var img = $('<img />').attr({
            src: item.attrinfo.personal_photo
        });

        var tiaoZhuan = $('<a></a>').attr({
            href: "http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424558512323758194.html?" + item.oid
        }).html(img);
        var report_portrait = $('<div class="report_portrait"></div>').html(tiaoZhuan)

        // report_right
        var name = $('<p></p>').html(item.attrinfo.name);
        var company = $('<p></p>').html(item.attrinfo.sub_company);
        var report_msg = $('<div class="report_msg"></div>').append(name, company)

        //report_poll
        var zhichicount = $('<span></span>').html(item.count['count'])
        var report_poll = $('<div class="report_poll"></div>').append(zhichicount);

        // report_support
        // var supportClick = $('<a></a>').attr({href: 'http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424558512323758194.html?' + item.oid});
        var supportClick = $('<a></a>').attr({
            href: 'http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424558512323758194.html?' + item.oid
        });

        var report_support = $('<div class="report_support"></div>').html(supportClick);

        var report_right = $('<div class="report_right"></div>').append(report_msg, report_poll, report_support)
        var li = $('<li></li>').append(report_portrait).append(report_right)
        $('.report_list').append(li);

    }

    function renderData(report_list) {
        $('.report_list').html('');
        report_list.map(function (item) {
            $.getJSON("http://api.survey.leju.com/index.php?c=interface&a=get_survey&sur_id=2156&type=result&callback=?", function (myCount) {
                console.log('获取总数')
                console.log(myCount);
                for (var countItem in myCount.data) {
                    if (countItem.toString() === item.oid.toString()) {
                        item.count = myCount.data[item.oid];
                    }
                }
                doFunction(item);
               
            });
           
            console.log(item);
            // report_portrait
        })
    }

    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function(data){
        console.log(data);
        renderData(data.data.question[0].option);
    });
   
})