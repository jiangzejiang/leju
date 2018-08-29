
$(function () {
    // 微晶大家说
    var famous_person_banner = new Swiper('#famous_person_banner', {
        autoplay: true,
        loop: true,
        // 如果需要前进后退按钮
        speed: 300,
        // effect: 'fade',
        navigation: {
            prevEl: '.color-left-famous',
            nextEl: '.color-right-famous',
            hideOnClick: true,
        },
    });

    // 微晶先生活
    dj.get("ui.focusimg", ["ui.gun"], function () {
        jQuery("#swiper_microlite_live1 .scroll-wrap-inner>ul").focusimg({
            item: "li",
            index: 0,
            auto: true,
            interval: 3000,
            vertical: false,
            circle: true,
            prev: "#swiper_microlite_live1 .focal-btn-lt",
            next: "#swiper_microlite_live1 .focal-btn-rt",
            smallimg: $("#swiper_microlite_live1 ol li"),
            smallevent: "mouseover",
            smallSelectedClass: "focal_active",

        });
    });
    dj.get("ui.focusimg", ["ui.gun"], function () {
        jQuery("#swiper_microlite_live2 .scroll-wrap-inner>ul").focusimg({
            item: "li",
            index: 0,
            auto: true,
            interval: 3000,
            vertical: false,
            circle: true,
            prev: "#swiper_microlite_live2 .focal-btn-lt",
            next: "#swiper_microlite_live2 .focal-btn-rt",
            smallimg: $("#swiper_microlite_live2 ol li"),
            smallevent: "mouseover",
            smallSelectedClass: "focal_active",

        });
    });
    dj.get("ui.focusimg", ["ui.gun"], function () {
        jQuery("#swiper_microlite_live3 .scroll-wrap-inner>ul").focusimg({
            item: "li",
            index: 0,
            auto: true,
            interval: 3000,
            vertical: false,
            circle: true,
            prev: "#swiper_microlite_live3 .focal-btn-lt",
            next: "#swiper_microlite_live3 .focal-btn-rt",
            smallimg: $("#swiper_microlite_live3 ol li"),
            smallevent: "mouseover",
            smallSelectedClass: "focal_active",

        });
    });
    var index = 0;
    var li = $('.live_thumbnail>ul>li');
    var bannerLi = $('#swiper-container-banner>ul>li');
    /*
    setInterval(function () {
        var activeIndex = swiper_microlite_live.activeIndex
        //console.log(activeIndex)
        if (index != activeIndex) {
            li.removeClass('active_li');
            if (activeIndex == 1) {
                $(".live_thumbnail>ul").animate({
                    'top': 0
                }, 500);
                $(li[activeIndex - 1]).addClass('active_li');

            } else if (activeIndex >= li.length - 2 && activeIndex < li.length + 1) {
                $(".live_thumbnail>ul").animate({
                    'top': -167 * (li.length - 3)
                }, 500);
                $(li[activeIndex - 1]).addClass('active_li');

            } else if (activeIndex == li.length + 1) {
                $(".live_thumbnail>ul").animate({
                    'top': 0
                }, 500);
                $(li[0]).addClass('active_li');
            }
            else if (activeIndex == 0) {
                $(".live_thumbnail>ul").animate({
                    'top': -167 * (li.length - 3)
                }, 500);
                $(li[li.length-1]).addClass('active_li');
            }
            else {
                $(".live_thumbnail>ul").animate({
                    'top': -167 * (activeIndex - 1)
                }, 500);
                $(li[activeIndex - 1]).addClass('active_li');

            }
            index = activeIndex;
        }
        if (index == li.length + 1) {
            $(li[0]).addClass('active_li');
        }

    }, 10)
    // 点击右侧li联动banner
    li.click(function () {
        var index = $(this).index();
        swiper_microlite_live.slideTo(index + 1, 300, false);
    })
    */

    li.click(function () {
        li.removeClass('active_li');
        $(this).addClass('active_li');
        var index = $(this).index();
        var swiper = $('.all_swiper_microlite_live .focal');
        swiper.removeClass('block').addClass('none');
        swiper.eq(index).removeClass('none').addClass('block')
        // swiper_microlite_live.slideTo(index + 1, 300, false);
    })


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





    var resetFocusSize = function () {
        var width = $(window).width();
        $("#focal01.focal,#focal01.focal ul li,#focal01.focal ul li a,#focal01.focal img").css({
            width: width,
            height: width * 688 / 1920
        });
    }

    var changeFn = function () {
        var index = $("#focal01 li[class=focal_active]").index();
        var text = $("#focal01 ul>li").eq(index).find("img").attr("alt");
        $("#intro").text(text)
    }

    resetFocusSize();
    changeFn();
    dj.get("ui.focusimg", ["ui.gun"], function () {
        jQuery("#focal01 .scroll-wrap-inner>ul").focusimg({
            item: "li",
            index: 0,
            auto: true,
            interval: 5000,
            vertical: false,
            circle: true,
            prev: "#focal01 .focal-btn-lt",
            next: "#focal01 .focal-btn-rt",
            smallimg: $("#focal01 ol li"),
            smallevent: "mouseover",
            smallSelectedClass: "focal_active",
            onFocusimgChanged: changeFn
        });
    });

    $(window).resize(function () {
        resetFocusSize();
    })

})