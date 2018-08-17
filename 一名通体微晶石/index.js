$(function () {
    // 遮罩
        var $evolution_img_text_div = $('.evolution_img_text>div');
        var $zhezhao = $('.zhezhao');
        $evolution_img_text_div.mouseover(function(item) {
            var index = $(this).index();
            $($zhezhao[index]).css({
                'z-index': '1'
            })
        })
        $evolution_img_text_div.mouseleave(function(item) {
            var index = $(this).index();
            $($zhezhao[index]).css({
                'z-index': '-1'
            })
        })
})


$(function () {
    console.log('ready');
    // banner
    var myBanner = new Swiper('#swiper-container-banner', {
        loop: false,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination-banner',
            clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            prevEl: '.color-left',
            nextEl: '.color-right',
            hideOnClick: true,
        },
    })
    // 微晶大家说
    var famous_person_banner = new Swiper('#famous_person_banner', {
        loop: false,
        // 如果需要前进后退按钮
        navigation: {
            prevEl: '.color-left-famous',
            nextEl: '.color-right-famous',
            hideOnClick: true,
        },
    });

    微晶先生活
    var swiper_microlite_live = new Swiper('#swiper_microlite_live', {
        loop: false,
        // 如果需要分页器
        pagination: {
            el: '.microlite_live_banner',
            clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            prevEl: '.live-left-color',
            nextEl: '.live-right-color',
            hideOnClick: true,
        },
    })
    var index = 0;
    setInterval(function () {
        console.log(swiper_microlite_live.activeIndex)
        var activeIndex = swiper_microlite_live.activeIndex
        var li = $('.live_thumbnail>ul>li');
        if (index != activeIndex) {
            console.log('fadfas')
            if (activeIndex == 0) {
                $(".live_thumbnail>ul").animate({
                    'top': 0
                }, 500);
            } else if (activeIndex >= li.length - 3) {
                $(".live_thumbnail>ul").animate({
                    'top': -167 * (li.length - 3)
                }, 500);
            } else {
                $(".live_thumbnail>ul").animate({
                    'top': -167 * activeIndex
                }, 500);
            }
            li.removeClass('active_li');
            $(li[activeIndex]).addClass('active_li');
            index = activeIndex;
        }
    }, 10)
    // 搜索
    $('.selected').click(function () {
        $('#selectUl').css({
            'display': 'block'
        })
    })

    $('#selectUl li').click(function () {
        var newli = $(this).html();
        $('.selected').html($(newli).attr('id', 'selectedText'));
        $('#selectUl').css({
            'display': 'none'
        });
        var index = $(this).index();
        $($('.sou form').css('display', 'none').get(index)).css('display', 'block');
    })
})
