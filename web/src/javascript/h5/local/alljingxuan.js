//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/return-top.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
var $loadMore,
    $contentList,
    $desc,
    $jingPinBox,
    endEleTime;
var _view = {
    init: function() {
        zoomPics.init();
        this.initDesc();
    },
    initDesc:function () {
       var userA=navigator.userAgent;
        if(userA.indexOf('MSIE')>-1){
           $desc.addClass('ie');
            if(userA.indexOf('MSIE 8.0')>-1||userA.indexOf('MSIE 7.0')>-1){
                $('.jingxuan-lists').children('li:nth-child(3n)').css({'margin-right':'0'})
            }
        }

    },
};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
        $jingPinBox.on('mouseenter','a.down',this.onJuanXuanJi);
        $jingPinBox.on('mouseleave','a.down',this.leaveJuanXuanJi);
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
    }
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');
    $desc = $('.jingxuan-lists').find('.desc');
    $jingPinBox = $('.jingxuan-lists');

    init();
    updatewxlogin.init();
    updatewblogin.init();
});

