//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/swiper.js');
//##include('../block/return-top.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
//##include('../block/share.js');


var $doc,
    $win,
    $contentList,
    $loadMore,
    $articles,
    $articlesOT,
    $advert,
    endEleTime;

var _view = {
    init: function() {
        zoomPics.init();
        this.initShare();
    },
    initShare:function () {
        window._bd_share_config.common.bdText=$('.editor span').text().replace(/ +/g,'');
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
    initAdvert:function () {
        if($win.scrollTop()<$articlesOT-60){
            $advert.removeClass('fixed').addClass('posTop');
        }else if($win.scrollTop()<=$articles.height()+$articlesOT-640-60&&$win.scrollTop()>=$articlesOT-60){
            $advert.removeClass('posTop').removeClass('posBottom').addClass('fixed');
        }else {
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
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');
    $articles=$('.articles');
    $articlesOT=$articles.offset().top;
    $advert=$('.advert');
    init();
    updatewxlogin.init();
    updatewblogin.init();
});
