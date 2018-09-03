
/*  依赖于jquery，适用于一长条的精灵图
    三个参数
    width：所创建的图片的宽度 
    bg_hui: 默认背景图片url
    bg_hover: 鼠标移入时的背景图片url，可选，如果有就有hover效果
*/
; $(function () {
    $.fn.setBg = function (width, bg_hui, bg_hover) {
        //如果有bg_hover这第三个参数
        if (bg_hover) {
            this.each(function (index, item) {
                bg.call(this, width, bg_hui, index);
                $(this).hover(function (event) {
                    bg.call(this, width, bg_hover, index);
                }, function (event) {
                    bg.apply(this, [width, bg_hui, index]);
                })
            })
        }
        // 如果没有第三个参数
        else {
            this.each(function (index) {
                bg.call(this, width, bg_hui, index);
            })
        }
        function bg(width, url, index) {
            return $(this).css({
                'background': 'url(' + url + ') no-repeat',
                'background-position': -index * width + 'px 0px'
            });
        }
    }
});
