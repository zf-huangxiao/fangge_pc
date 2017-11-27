//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/masonry-docs.js');
//##include('../block/idangerous.swiper.js');
//##include('../block/jquery.mCustomScrollbar.js');
//##include('../block/return-top.js');
var $doc,
    $win,
    $container,
    $pictures,
    $wxPy,
    $wxPyq;
var _view = {
    init: function () {
        this.initShare();
        // this.addArrows();
        this.initGoodsSwipe();
        this.initShowPics();
    },
    addArrows: function () {
        if ($('.swiper-wrapper').find('a').length > 1) {
            $('.swiper-container').append("<div class='swiper-button-prev swiper-button-white'></div><div class='swiper-button-next swiper-button-white'></div>");
        }
    },
    initGoodsSwipe: function () {
        var goodSwiper = new Swiper('.swiper-goods', {
            direction:'horizontal',
            loop: true,
            autoplay:3000,
            autoplayDisableOnInteraction:false,
            onInit: function (swiper) {
            }
        });
        $('.swiper-button-prev ').on('click', function(e){
            e.preventDefault();
            goodSwiper.swipePrev();
        });
        $('.swiper-button-next').on('click', function(e){
            e.preventDefault();
            goodSwiper.swipeNext();
        })
    },
    initShare:function () {
        window._bd_share_config = {
            common: {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": "",
                "bdStyle": "1",
                "bdSize": "20"
            },
            share:[],
            image:''
        };
        with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];

        window._bd_share_config.common.bdText=$('.top-title').find('.name').text().replace(/ +/g,'');
        window._bd_share_config.common.bdDesc=$('.top_desc').text().substr(0,100)+'......';
        $('.pictures').find('img').each(function (index,ele) {
            window._bd_share_config.common.bdPic+='||'+ele.src;
        });
    },
    initShowPics:function () {
        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.box',
                gutter: 50,
                isAnimated: true,
            });
        });
    },


};

var _event = {
    bind: function () {
        $pictures.on('mouseenter','.picture',this.matchPosition);
        $wxPy.on('click',this.clickWxPy);
        $wxPyq.on('click',this.clickWxPyq);
    },
    matchPosition:function () {
        var height=$(this).find('.match').height(),
            innerHeight=$(this).find('.match_inner').height();
        $(this).find('.match').css({'top':'50%','margin-top':-height/2});
        $(this).find('.match_inner').css({'top':'50%','margin-top':-innerHeight/2});

    },
    clickWxPy:function () {
        var timer;
        timer=window.setInterval(function () {
            if($('#bdshare_weixin_qrcode_dialog').length > 0){
                $('#bdshare_weixin_qrcode_dialog').find('.bd_weixin_popup_head span').text('分享给微信好友');
                $('#bdshare_weixin_qrcode_dialog').find('.bd_weixin_popup_foot').html('打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享给微信好友。');
                window.clearInterval(timer);
                timer =null;
            }
        },100);
    },
    clickWxPyq:function () {
        var timer;
        timer=window.setInterval(function () {
            if($('#bdshare_weixin_qrcode_dialog').length > 0){
                $('#bdshare_weixin_qrcode_dialog').find('.bd_weixin_popup_head span').text('分享到微信朋友圈');
                $('#bdshare_weixin_qrcode_dialog').find('.bd_weixin_popup_foot').html('打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。');
                window.clearInterval(timer);
                timer =null;
            }
        },100);
    },
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function () {
    $doc = $(document);
    $win = $(window);
    $pictures=$('.pictures');
    $container=$('#masonry');
    $wxPy = $('.bdsharebuttonbox ').find('.wx_py');
    $wxPyq = $('.bdsharebuttonbox ').find('.wx_pyq');
    init();
});
