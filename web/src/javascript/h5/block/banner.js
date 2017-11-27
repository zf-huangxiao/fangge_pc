
;(function (){

    var $banner,$close,$zhanwei;

    function getCookie(name){
        var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/");
        return reg.test(document.cookie) ? RegExp.$1 : "";
    }
    $(window).ready(function () {
        $banner=$('.banner');
        $close=$banner.find('i');
        $zhanwei=$('.zhanwei');
        if(window.localStorage.cookie&&window.localStorage.cookie.indexOf('lastTime=')>-1){
            var lastTime=window.localStorage.cookie.split('=')[1];
            var nowTime=new Date().getTime();
            if(nowTime-lastTime>24*60*60*1000){
                $banner.show();
            }else{
                $banner.hide();
            }
        } else{

        }
        $close.on('click',function () {
            $banner.hide();
            window.localStorage.cookie='lastTime='+new Date().getTime();

        });

        $(window).on('scroll',function () {

            if($('html').height()-$(window).scrollTop()-$(window).height()<=$('footer').height()){
                $('.banner').css({'position':'relative','bottom':'','left':''})
                $zhanwei.css({'display':'none'});
            } else{
                $banner.css({'position':'fixed','bottom':'0','left':'0'});
                $zhanwei.css({'display':'block','height':''+$banner.height()});
            }
        })

    })


})() ;


