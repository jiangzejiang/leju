$(document).ready(function() {

 	



 	var olLiLength=$('#tab-bannner li').length;
 	
	var winW=$(window).width();
	$('#tab-bannner li').width(winW);
	for (var i = 0; i < olLiLength; i++) {
		
		$('.focal-tab').append('<li></li>');

		
		var thisUrl=$('.scroll-wrap-inner img').eq(i).attr('src')
			$('.scroll-wrap-inner li>a').eq(i).css({'backgroundImage':'url('+thisUrl+')'});
	
	
		

	};
	
	var a = {
        init: function() {
            this.lunbo();
        },
        lunbo: function() {
             
            dj.get("ui.focusimg", ["ui.gun"],
            function() {
                 $(".scroll-wrap-inner>ul").focusimg({
                    item: "li",
                    index: 0,
                      //视口元素数
                    auto: true,
                    interval: 5000,
                    vertical: false,
                    circle: true,
                   
                    smallimg:  $(".focal-tab li"),
                    smallevent: "mouseover",
                    smallSelectedClass: "active"
                });
                 
            });
        
        }
	};

    a.init(); 




    $('.focal-tab li').removeClass('active');
    $('.focal-tab li').eq(0).removeClass('active');
    setTimeout(function(){
    		var lengthLi=$('#tab-bannner li').length-$('.focal-tab li').length
    		
    	if(lengthLi<0){
    		$('.focal-tab li:last-child').hide();
    	}
    	
    },300)


    $('.nav li').mouseover(function(){
        $('.nav li').removeClass('active');
         $(this).addClass('active');
    })
    
    //大板瓷抛砖大讲堂
    var djtIndex=0;
    $('.djt-box .left-box .btn').click(function(){
    	if(!$(this).hasClass('on')){
    		
    		return false;
    	}
    	
    	$('.djt-box .left-box .btn').addClass('on');
    	if($(this).hasClass('left-btn')){
    		djtIndex--;
    		
    		if(djtIndex==0){
    			$(this).removeClass('on');
    		}
    	}
    	if($(this).hasClass('right-btn')){
    		djtIndex++;
    		
    		if(djtIndex==$('.djt-box .left-box li').length-1){
    			$(this).removeClass('on');
    		}

    		
    	}

		$('.djt-box .left-box li').removeClass('active');
		$('.djt-box .right-box li').removeClass('active');
		$('.djt-box .left-box li').eq(djtIndex).addClass('active');
		$('.djt-box .right-box li').eq(djtIndex).addClass('active');

    })
    //艺墅生活
    function tab(obj,isOk){
    	var liLeng=obj.parent('.btn-box').siblings('ul').find('li').length;
    	var index=obj.parent('.btn-box').siblings('ul').find('.active').index()
    	
    	if(obj.hasClass('right-btn')){

    		index++;
    	}else{
    		index--;
    	}
    	if(index>=liLeng){
    		index=0;
    	}

    	if(index<0){
    		index=liLeng-1;
    	}

    	obj.parent('.btn-box').siblings('ul').find('li').removeClass('active');
    	obj.parent('.btn-box').siblings('ul').find('li').eq(index).addClass('active');
    	if(isOk){
    	
    		obj.parent('.btn-box').siblings('ol').find('li').removeClass('active');
    		obj.parent('.btn-box').siblings('ol').find('li').eq(index).addClass('active');
    	}
    }
    $('.yysh-box .btn-box .btn').click(function(){
    	tab($(this))
    	
    })

    //
    //聚焦实验室
    $('.sys-box .btn').click(function(){
    	tab($(this),true)
    })
    $('.sys-box ol li').mouseover(function(){
    	var index=$(this).index();
    	$('.sys-box ol li').removeClass('active');
    	$(this).addClass('active');

    	$(this).parent('ol').siblings('ul').find('li').removeClass('active');

    	$(this).parent('ol').siblings('ul').find('li').eq(index).addClass('active');
    });


    $('.news-box .right-box li').mouseover(function(){
    	$('.news-box .right-box li').removeClass('active');
    	$(this).addClass('active');
    })

    $('.news-box .left-box ol li').mouseover(function(){
    	$('.news-box .left-box ol li').removeClass('active');
    	$('.news-box .left-box ul li').removeClass('active');
    	$(this).addClass('active');
    	$('.news-box .left-box ul li').eq($(this).index()).addClass('active');

    });

    


    //精选案例;
    var thislast=$('.jxal-box .tab-gun-box li').eq(0).clone();
    var thisFirst=$('.jxal-box .tab-gun-box li').eq($('.jxal-box .tab-gun-box li').length-1).clone();

    $('.jxal-box .tab-gun-box ul').append(thislast);
    thisFirst.insertBefore($('.jxal-box .tab-gun-box li').eq(0));
    $('.jxal-box .tab-gun-box li').eq(1).addClass('active');
 	var jxalIndex=0;
 	var widthLi=$('.jxal-box .tab-gun-box li').outerWidth(true);
 	var jxalLiLength=$('.jxal-box .tab-gun-box li').length;
 	$('.jxal-box .btn-box .left-btn').click(function(){
 		jxalIndex--;

 		
 		if(jxalIndex <= 0){
 			jxalIndex=$('.jxal-box .tab-gun-box li').length-2;
 			$('.jxal-box .tab-gun-box ul').css({left:-widthLi*(jxalIndex)})
 		};
 		$('.jxal-box .tab-gun-box li').removeClass('active');
 		$('.jxal-box .tab-gun-box li').eq(jxalIndex).addClass('active');

 		$('.jxal-box .tab-gun-box ul').stop(true).animate({left:-widthLi*(jxalIndex-1)},300);
 	})

 	$('.jxal-box .btn-box .right-btn').click(function(){
 		jxalIndex++;
 		if(jxalIndex>=jxalLiLength-2){
 			jxalIndex=0;
 			$('.jxal-box .tab-gun-box ul').css({left:widthLi})
 		}
 		$('.jxal-box .tab-gun-box li').removeClass('active');
 		$('.jxal-box .tab-gun-box li').eq(jxalIndex+1).addClass('active');

 		$('.jxal-box .tab-gun-box ul').stop(true).animate({left:-widthLi*(jxalIndex)},300)
 	

 	});



 })