//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/jquery.mCustomScrollbar.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/return-top.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
//##include('../block/share.js');




var $doc,
    $win,
    $introduceScroll,
    $contentList,
    $loadMore,
    endEleTime,
    $advert,
    $articles;

var _view = {
    init: function() {
        // this.showCheckmore();
        zoomPics.init();
        this.initScrollbar();
        this.initShare();
    },
    showCheckmore:function () {
        if($desc.height()>310){
            $desc.css({'height':'310px'});
            $('.checkmore').show();
        }
    },
    initScrollbar:function () {
        // $introduce.mCustomScrollbar();
        $introduceScroll.on('mouseenter',function () {
            if($('#mCSB_1_container').height()>=$('.mCustomScrollbar').height()){
                $('body').css({'overflow-y':'hidden'});
            }
        });
        $introduceScroll.on('mouseleave',function () {
            $('body').css({'overflow-y':''});
        });

    },
    initShare:function () {
        window._bd_share_config.common.bdText=$('.introduce .hgroup h1').text().replace(/ +/g,'');
        $('.articles').find('img').each(function (index,ele) {
            window._bd_share_config.common.bdPic+='||'+ele.src;
        });

    },
};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $win.on('scroll',this.initAdvert);
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
                $('#content-list').find('div:nth-child(3n)').css({'margin-right':'0',})
                zoomPics.init();
            }
        });


    },
    showMoreDesc:function () {
        if($('.checkmore').find('a').html()=='查看更多'){
            $desc.css({'height': 'auto'});
            $('.checkmore').find('a').html('收起');
            $('.checkmore').find('p').addClass('more');
        }else{
            $desc.css({'height': '310px'});
            $('.checkmore').find('a').html('查看更多');
            $('.checkmore').find('p').removeClass('more');
        }
    },
    initAdvert:function () {
        if($win.scrollTop()<$articles.offset().top-60){
            $advert.removeClass('fixed').addClass('posTop');
        }else if($win.scrollTop()<=$articles.height()+$articles.offset().top-640-60&&$win.scrollTop()>=$articles.offset().top-60){
            $advert.removeClass('posTop').removeClass('posBottom').addClass('fixed');
        }else{
            $advert.removeClass('fixed').addClass('posBottom');
        }

    },
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $doc = $(document);
    $win = $(window);
    $introduceScroll=$('.introduce').find('.articleInt');
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');
    $advert=$('.advert');
    $articles= $('.articles');
    init();
    updatewxlogin.init();
    updatewblogin.init();

});
