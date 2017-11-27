//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/return-top.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');


var $loadMore,
    $contentList,
    endEleTime;


var _view = {
    init: function() {
        this.nameStyle();
       zoomPics.init();
        this.ieStyle();
    },
    nameStyle:function () {
      $('.content').find('.pic').find('span').each(function (cur,index) {
          if($(this).find('i').length == 1){
              /[a-zA-Z]/.test($(this).find('i').text())? $(this).find('i').css({'height':'80px','line-height':'80px','font-family':'Charter'}):$(this).find('i').css({'height':'80px','line-height':'80px'});
              // console.log($(this).children.length)
          }else if($(this).find('i').length == 2){
              $(this).css({'padding':'16px 0'});
              $(this).find('i').eq(1).css({'font-family':'Charter'});
          }

      })
    },
    ieStyle:function () {
        var navStr=navigator.userAgent;
        if(navStr.indexOf('MSIE')>-1){
            navStr.replace(/MSIE (\d+).\d+;/,function(a,b){
                if(parseInt(b)< 9){
                    $('.content').find('ul').find('li').css('margin-right','60px');
                    $('.content').find('ul').find('li:nth-child(3n)').css('margin-right','0');
                }
            })
        }
    }

};

var _event = {
    bind: function() {
        $loadMore.on('click',this.loadIndexList);
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

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $loadMore = $('#load-more-btn');
    $contentList = $('#content-list');
    init();
    updatewxlogin.init();
    updatewblogin.init();
});
