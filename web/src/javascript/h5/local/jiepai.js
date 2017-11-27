//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/idangerous.swiper.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/return-top.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');

var $loadMore,
    $contentList,
    $jingPin,
    endEleTime;
var _view = {
    init: function() {
        this.topScrollBanner();
        zoomPics.init();

    },
    topScrollBanner:function(){
        var topBannerSwiper = new Swiper('.swiper-top-banner',{
            direction:'horizontal',
            pagination: '.top-banner-pagination',
            paginationClickable:true,
            loop:true,
            autoplay:3000,
            autoplayDisableOnInteraction:false,
            // prevButton:'.swiper-button-prev',
            // nextButton:'.swiper-button-next',
            onInit: function(swiper){
                if(swiper.slides.length<=3){
                    // swiper.lockSwipes();
                    $('.top-banner-pagination').hide();
                    $('.swiper-button-prev').hide();
                    $('.swiper-button-next').hide();
                }
            }
        });
        $('.swiper-button-prev ').on('click', function(e){
            e.preventDefault();
            topBannerSwiper.swipePrev();
        });
        $('.swiper-button-next').on('click', function(e){
            e.preventDefault();
            topBannerSwiper.swipeNext();
        })
    }
};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $jingPin.hover(this.onJuanXuanJi,this.leaveJuanXuanJi);
    },
    loadIndexList : function(){

        if(!$contentList.children().last().attr('data-time') || $contentList.children().last().attr('data-time') == 'undefined'){
            endEleTime = 0;
        }else{
            endEleTime = $contentList.children().last().attr('data-time')
        }

        ajaxloadmore.init({
            el : $contentList,
            async : false,
            url : '/jiepai/index_apis/indexloadlist?id=2&p='+pageSize+'&time='+endEleTime,
            yCallback:function () {
                $('#content-list').find('div:nth-child(3n)').css({'margin-right':'0',})
                zoomPics.init();
            }
        });


    },
    onJuanXuanJi:function () {
        $(this).prev('a').find('img').css({ '-webkit-transform': 'scale(1.2)',
            '-ms-transform': 'scale(1.2)',
            '-moz-transform':'scale(1.2)',
            '-o-transform':'scale(1.2)',
            'transform': 'scale(1.2)',
            // 'zoom': '1.2',
            '-webkit-transition': '-webkit-transform .5s',
            '-moz-transition': '-moz-transform .5s',
            '-o-transition': '-o-transform .5s',
            'transition': 'transform .5s'})
    },
    leaveJuanXuanJi:function () {
        $(this).prev('a').find('img').css({ '-webkit-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-moz-transform':'scale(1.0)',
            '-o-transform':'scale(1.0)',
            'transform': 'scale(1.0)',
            // 'zoom': '1.0',
            '-webkit-transition': '-webkit-transform .5s',
            '-moz-transition': '-moz-transform .5s',
            '-o-transition': '-o-transform .5s',
            'transition': 'transform .5s'});
    },

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');
    $jingPin = $('.jingpinji').find('.down');
    init();
    updatewxlogin.init();
    updatewblogin.init();
});
