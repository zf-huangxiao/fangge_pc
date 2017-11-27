$(document).ready(function(){
    var $doc = $(document),
        $win = $(window),
        $returnTop = $('.return-top'),
        $oFriend=$('.friendslink'),
        $oWhiteSpace=$('.white-space'),
        $oFooter=$('#footer');
    $win.on('scroll',function(){
        if($(this).scrollTop() >= $(this).height() * 2){
            $returnTop.show();
        }else{
            $returnTop.hide();
        }
    });

    // $doc.on('click','.return-top',function(){
    //     $("html,body").animate({scrollTop:0}, 200);
    // })
    $win.on('scroll',function () {
        if($oFriend.length>0){
            var offT=$oFriend.offset().top,
                oHeight=offT-$(this).scrollTop();
            if(oHeight<=$win.height()-50){
                $returnTop.css({'bottom':$win.height()-oHeight});
            }else{
                $returnTop.css({'bottom':50});
            }
        }else if($oWhiteSpace.length>0){
            var offT=$oWhiteSpace.offset().top,
                oHeight=offT-$(this).scrollTop();
            if(oHeight<=$win.height()-50){
                $returnTop.css({'bottom':$win.height()-oHeight});
            }else{
                $returnTop.css({'bottom':50});
            }
        }else{
            var offT=$oFooter.offset().top,
                oHeight=offT-$(this).scrollTop();
            if(oHeight<=$win.height()-50){
                $returnTop.css({'bottom':$win.height()-oHeight});
            }else{
                $returnTop.css({'bottom':50});
            }
        }
    });
});