// $(function () {
//     // 鍥剧墖鎳掑姞杞�
//     (function lazyload() {
//         var ImgList = $('img');
//         ImgList.each(function (index, item) {
//             var dataSrc = $(this).attr('src')
//             $(this).attr({ 'data-src': dataSrc }).removeAttr('src').attr('src', 'http://src.leju.com/imp/imp/deal/03/93/5/051d77fcc8cf466e760f4c60_p24_mk24.png');
//         })
//         $(window).scroll(lazyload);
//         function lazyload() {
//             var wtop = $(window).scrollTop();
//             var wheight = $(window).height();
//             ImgList.each(function (index, item) {
//                 var imgTop = ImgList.eq(0).offset().top;
//                 if (imgTop - wtop < wheight) {
//                     var src = ImgList.eq(0).attr('data-src');
//                     ImgList.eq(0).attr('src', src)
//                     ImgList.splice(0, 1);
//                 }
//             })
//         }
//         lazyload();
//     })();
// });
$(function () {
    // 寰櫠澶у璇�
    var famous_person_banner = new Swiper('#famous_person_banner', {
        autoplay: true,
        loop: true,
        // 濡傛灉闇€瑕佸墠杩涘悗閫€鎸夐挳
        speed: 300,
        // effect: 'fade',
        navigation: {
            prevEl: '.color-left-famous',
            nextEl: '.color-right-famous',
            hideOnClick: true,
        },
    });

    // 寰櫠鍏堢敓娲�
    var swiper_microlite_live1 = new Swiper('#swiper_microlite_live1', {
        autoplay: true,
        loop: true,
        // 濡傛灉闇€瑕佸垎椤靛櫒
        pagination: {
            el: '.microlite_live_banner1',
            clickable: true,
        },
        // 濡傛灉闇€瑕佸墠杩涘悗閫€鎸夐挳
        navigation: {
            prevEl: '.live-left-color1',
            nextEl: '.live-right-color1',
            hideOnClick: true,
        },
    })
    var swiper_microlite_live2 = new Swiper('#swiper_microlite_live2', {
        autoplay: true,
        loop: true,
        // 濡傛灉闇€瑕佸垎椤靛櫒
        pagination: {
            el: '.microlite_live_banner2',
            clickable: true,
        },
        // 濡傛灉闇€瑕佸墠杩涘悗閫€鎸夐挳
        navigation: {
            prevEl: '.live-left-color2',
            nextEl: '.live-right-color2',
            hideOnClick: true,
        },
    })

    var swiper_microlite_live3 = new Swiper('#swiper_microlite_live3', {
        autoplay: true,
        loop: true,
        // 濡傛灉闇€瑕佸垎椤靛櫒
        pagination: {
            el: '.microlite_live_banner3',
            clickable: true,
        },
        // 濡傛灉闇€瑕佸墠杩涘悗閫€鎸夐挳
        navigation: {
            prevEl: '.live-left-color3',
            nextEl: '.live-right-color3',
            hideOnClick: true,
        },
    })
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
    // 鐐瑰嚮鍙充晶li鑱斿姩banner
    li.click(function () {
        var index = $(this).index();
        swiper_microlite_live.slideTo(index + 1, 300, false);
    })
    */

    li.click(function () {
        li.removeClass('active_li');
        $(this).addClass('active_li');
        var index = $(this).index();
        var swiper = $('#my_live .swiper-container');
        swiper.removeClass('block').addClass('none');
        swiper.eq(index).removeClass('none').addClass('block')
        // swiper_microlite_live.slideTo(index + 1, 300, false);
    })


    // 鎼滅储
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
        $(".focal,.focal ul li,.focal ul li a,.focal img").css({
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