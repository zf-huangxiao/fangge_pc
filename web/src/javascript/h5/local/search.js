//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/swiper.js');
//##include('../block/zoomPics.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');

var $doc,
    $win,
    $contentList,
    $loadMore,
    $searchInput,
    $searchHide,
    $searchMain,
    $searchBtn,
    $searchTmpl,
    $searchResult,
    $searchDefault,
    $noSearchResult,
    $loadMoreWrapper,
    $searchTmplHide,
    $defaultList,
    $resultList,
    $noTips,
    $advert;

var _view = {
    init: function() {
        zoomPics.init();
        this.initPlaceholder();
    },
    initPlaceholder:function () {
        var input=document.createElement('input'),
            supportPlaceholder='placeholder' in input;
        if(!supportPlaceholder){ //不支持
            $searchInput.val()==''?$('.search-placeholdder').css('display','block'):'';
            $('.search-placeholdder').on('click',function (e) {
                $searchInput.focus();
            });
            $searchInput.on({
                focus:function () {
                    $('.search-placeholdder').css('display')=='block'?$('.search-placeholdder').hide():'';
                },
                blur:function () {
                    $(this).val()==''? $('.search-placeholdder').css('display','block'):$('.search-placeholdder').css('display','none');
                }
            })
        }
    },
};

var _event = {
    bind: function() {
        $searchInput.on('input',this.initSearchList);
        $('body').on('click',this.hideSearchTmpl);
        $searchTmpl.on('click','a',this.choiceResultNew);
        $searchTmpl.on('mouseenter','a',this.searchListMouseenter);
        $searchTmpl.on('mouseleave','a',this.searchListMouseleave);
        $searchBtn.on('click',this.noAutoCompleteSearchResultNew);
        $loadMore.on('click',this.loadResultList);
        $searchInput.on('keydown',this.keydownSearch);
        $win.on('scroll',this.initAdvert);

    },
    initSearchList : function(){

        if($searchInput.val() == ''){
            $searchTmpl.html('');
            $searchTmpl.hide();
        }else{
            var url ='/search/index_apis/searchkeywords';
            var data = {
                'keyword':$searchInput.val()
            };
            var callback = function(data){
                var len = data.length;

                if(len > 0){

                    var temID = $searchTmpl.attr('temId');
                    var tmpl = $("#"+temID).html();
                    var doTtmpl = doT.template(tmpl);

                    $searchTmpl.show();
                    $searchTmpl.html(doTtmpl(data));
                    62*len>690?$searchTmpl.css({'height':'690px','overflow-y':'scroll'}):$searchTmpl.css({'height':'','overflow-y':'hidden'});

                }else{
                    $searchTmpl.html('');
                    $searchTmpl.hide();
                }
            };
            $.get(url , data , callback ,'json');
        }
    },

    choiceResultNew : function(){
        // var _this = this;
        var _val = $(this).html();
        $searchTmpl.find('a').removeClass('red');
        $(this).addClass('red');
        $searchTmplHide.val(_val);
        pageSize = 2;
        setSearchParams(_val,true);
    },

    noAutoCompleteSearchResultNew : function(){
        $noSearchResult.show();
        setSearchParams($searchInput.val());

    },

    resetLoadStatus : function(){
        $loadMoreWrapper.children().removeClass('active');
        $loadMore.addClass('active');
    },

    loadResultList : function(){

        var keyword = null;
        if($searchTmplHide.val() != ''){
            keyword = $searchTmplHide.val();
        }else{
            keyword = $searchInput.val();
        }


        ajaxloadmore.init({
            el : $('#result-list'),
            loadNum : 10,
            async : false,
            url : '/search/index_apis/searchresult?keyword='+ keyword +'&p='+pageSize ,
            yCallback:function () {
                zoomPics.init();
            }
        });
    },
    hideSearchTmpl:function (e) {
        var e=e||window.event;
        if(e.target.id == 'search-input'){
            $searchTmpl.css('display')=='none'?$searchTmpl.show():'';
        }else{
            $searchTmpl.hide();
        }

    },
    searchListMouseenter:function () {
        $(this).prevAll().removeClass('hover');
        $(this).nextAll().removeClass('hover');
        $(this).addClass('hover');
    }
    ,
    searchListMouseleave:function (e) {
        $searchTmpl.children().removeClass('hover');
    },
    keydownSearch:function (e) {
      e=e||window.event;
        if($searchInput.val()!=''){
           switch (e.keyCode){
               case 13:
                   e.preventDefault();
                   var tag1;
                   $searchTmpl.children().each(function (index,current) {
                       if($(this).hasClass('hover')){
                           tag1=1;
                           return false;
                       }else{
                           tag1=0;
                       }
                   });

                   if(tag1){
                       $searchInput.val($searchTmpl.find('.hover').html());
                       _event.noAutoCompleteSearchResultNew();
                   }else{
                       _event.noAutoCompleteSearchResultNew() ;
                   }

                   break;
               case 38:
                   e.preventDefault();
                   var tag2;
                   $searchTmpl.children().each(function (index, current) {

                       if($(this).hasClass('hover')){
                           $(this).removeClass('hover');
                           $(this).prev().addClass('hover');
                           tag2=1;
                           return false;
                       }else{
                           tag2=0;
                       }
                   });
                   tag2?'':$searchTmpl.children().last().addClass('hover');
                   break;
               case 40:
                   e.preventDefault();
                   var tag3;
                   $searchTmpl.children().each(function (index, current) {

                       if($(this).hasClass('hover')){
                           $(this).removeClass('hover');
                           $(this).next().addClass('hover');
                           tag3=1;
                           return false;
                       }else{
                           tag3=0;
                       }
                   });
                   tag3?'':$searchTmpl.children().first().addClass('hover');
           }
        }
    },
    initAdvert:function () {
        if($('.result-list').length>0){
            if($win.scrollTop()>=$('#footer').offset().top-640-60-142){
                $advert.removeClass('fixed').addClass('posBottom');
            }else{
                $('.advert').removeClass('posTop').removeClass('posBottom').addClass('fixed');
            }
        }else{
            if($win.scrollTop()>=$('#footer').offset().top-640-60-70){
                $advert.removeClass('fixed').addClass('posBottom');
                $('.posBottom').css('bottom','70px')
            }else{
                $('.advert').removeClass('posTop').removeClass('posBottom').addClass('fixed');
            }
        }
    },
};

function setSearchParams(param,bool){
    var _pathname = window.location.pathname;
    if(bool){
        window.location = _pathname + '?keyword=' + encodeURIComponent(param) + '&exact=1';
    }else{
        window.location = _pathname + '?keyword=' + encodeURIComponent(param);
    }

}

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
    $searchMain = $('.search-main');
    $searchInput = $('#search-input');
    $searchBtn = $('#search-btn');
    $searchHide =$('#search-hide');
    $searchDefault = $('#search-default');
    $defaultList = $('#default-list');
    $searchResult = $('#search-result');
    $searchTmpl = $('#search-tmpl');
    $noSearchResult = $('#no-search-result');
    $loadMoreWrapper = $('.load-more-wrapper');
    $searchTmplHide = $('#search-tmpl-hide');
    $resultList = $('#result-list');
    $noTips = $('#no-tips');
    $advert = $('.advert');

    init();
    updatewxlogin.init();
    updatewblogin.init();
});