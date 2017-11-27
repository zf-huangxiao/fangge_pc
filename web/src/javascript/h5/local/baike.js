//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
//##include('../block/idangerous.swiper.js');
//##include('../block/return-top.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');


var $doc,
    $loadMore,
    $contentList,
    endEleTime,
    $myscroll,
    $menu,
    $win;

var _view = {
    init: function() {
        this.topScrollBanner();
        // this.mybrandsSwiper();
        zoomPics.init();
        // this.initScrollbar();
    },


    topScrollBanner:function(){
        var topBannerSwiper = new Swiper('.swiper-top-banner',{
            direction:'horizontal',
            pagination : '.top-banner-pagination',
            autoplay:3000,
            paginationClickable:true,
            loop:true,
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
    },
    mybrandsSwiper:function () {
         var brandsSwiper=new Swiper('.swiper-brands',{
             direction:'horizontal',
             pagination:'.brands-pagination',
             // loop:true,
             autoplay:5000,
             paginationClickable:true,
             autoplayDisableOnInteraction:false,
             slidesPerView:5,
             slidesPerGroup:5,
             calculateHeight:true,
             cssWidthAndHeight:'width',
             // prevButton:'.swiper-button-prev',
             // nextButton:'.swiper-button-next',
             onInit: function(swiper){
                 if(swiper.slides.length<=5){
                     // swiper.lockSwipes();
                     $('.brands-pagination').hide();
                     // $('.swiper-button-prev').hide();
                     // $('.swiper-button-next').hide();
                 }
             }
         })

    },
    initScrollbar:function () {
        $myscroll.on('mouseenter',function () {

        });
        $myscroll.on('mouseleave',function (){
            $('body').css({'overflow-y':''});
        });

    },

};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $menu.on('click',this.showSecondList);
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
            url : '/welcome/index_apis/indexloadlist?p='+pageSize+'&time='+endEleTime ,
            yCallback:function () {
                $('#content-list').find('div:nth-child(3n)').css({'margin-right':'0'});
                zoomPics.init();
            }
        });


    },
    showSecondList:function (e) {
        if($(e.target).next('.second-list').length > 0){
            $(e.target).next('.second-list').animate({'left':'0'},300);
        }else if($(e.target).parent().hasClass('second-list')){
            $(e.target).parent().animate({'left':'300px'},300)
        }
    },


};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $doc          =  $(document);
    $win          =  $(window);
    $loadMore     =  $('#load-more-btn');
    $contentList  =  $('#content-list');
    $myscroll     =  $('.yizhuang').find('ul');
    $menu         =  $('#menu');
    init();

    updatewxlogin.init();
    updatewblogin.init();
});
