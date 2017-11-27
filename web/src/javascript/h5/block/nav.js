var $search_btn,
    $search_box,
    $search_input,
    $search_plaholder,
    $search_close,
    $nav_SearchTmpl,
    $login_out,//退出按钮
    $nav;
var nav_view={
     init:function () {
         this.initPlaceholder();
     },
    initPlaceholder:function () {
        var input=document.createElement('input'),
            supportPlaceholder='placeholder' in input;
        if(!supportPlaceholder){ //不支持
            $search_plaholder.css('display','block');
            $search_plaholder.on('click',function (e) {
                $search_input.focus();
            });
            $search_input.on({
                focus:function () {
                    $search_plaholder.css('display')=='block'?$search_plaholder.hide():'';
                },
                blur:function () {
                    $(this).val()==''? $search_plaholder.css('display','block'):$search_plaholder.css('display','none');
                }
            })
        }
    }

};
var nav_event={
    init:function () {
        $search_btn.on('click',this.clickSearchBtn);
        $search_close.on('click',this.closeSearchBox);
        $search_input.on('keyup',this.searching);
        $search_input.on('keydown',this.disDefault);
        $nav_SearchTmpl.on('mouseenter','span',this.beColor);
        $nav_SearchTmpl.on('click','span',this.clickSearchTmpl);
        $('body').on('click',this.hideSearchTmpl);
        $search_input.on('focus',this.showSearchTmpl);
        $nav.children('div').each(function (index,cur) {
            $(cur).on('mouseenter',nav_event.mouseoverNavList);
            $(cur).on('mouseleave',nav_event.mouseleaveNavList);
        });

        //退出
        $login_out.on('click',this.logout);
    },
    clickSearchBtn:function (e) {
        e=e||window.event;
        e.preventDefault();
        $search_box.show();
        $search_box.find('input').focus();
        $search_box.find('.searchWord').animate({'width':'390px'},500);
    },
    closeSearchBox:function () {
        $search_box.find('.searchWord').animate({'width':'0'},500,function () {
            $search_box.hide();
        });
        $nav_SearchTmpl.children().length>0?$nav_SearchTmpl.empty():'';
        $search_input.val()!=''?$search_input.val(''):'';
    },
    searching:function (e) {
        $nav_SearchTmpl.show();
        e=e||window.event;
        var boolean1=$(this).val()!='' && !/^ +$/.test($(this).val())?1:0;
        var spanLen=$nav_SearchTmpl.find('span').length;
        if(e.keyCode==13&&boolean1){ //回车
                var cur= $nav_SearchTmpl.find('span.hasColor');
                if(cur.length>0){
                    $(this).val(cur.html());
                    window.open('/search/?keyword='+cur.html()+'&exact=1');
                }else{
                    window.open('/search/?keyword='+$(this).val()+'&exact=0');
                }

        }else if(e.keyCode==38 && boolean1 && spanLen){   //shang
            var cur= $nav_SearchTmpl.find('span.hasColor');
            if(cur.length>0){
                var prev=cur.prev();
                if(prev.length>0){
                    cur.removeClass('hasColor');
                    prev.addClass('hasColor');
                }else{
                    cur.removeClass('hasColor');
                    $nav_SearchTmpl.find('span').last().addClass('hasColor');
                }

            }else{
                $nav_SearchTmpl.find('span').last().addClass('hasColor');
            }

        }else if(e.keyCode==40&&boolean1&&spanLen){  //xia
            var cur=$nav_SearchTmpl.find('span.hasColor');
            if(cur.length>0){
                var next=cur.next();
                if(next.length>0){
                    cur.removeClass('hasColor');
                    next.addClass('hasColor');
                }else{
                    cur.removeClass('hasColor');
                    $nav_SearchTmpl.find('span').first().addClass('hasColor');
                }
            }else{
                $nav_SearchTmpl.find('span').first().addClass('hasColor');
            }

        }else{
            if(boolean1){
                var url ='/search/index_apis/searchkeywords';
                var data = {
                    'keyword':$(this).val()
                };
                var callback = function(data){
                    var len = data.length;
                    if(len > 0){

                        var temID = $nav_SearchTmpl.attr('temId');
                        var tmpl = $("#"+temID).html();
                        var doTtmpl = doT.template(tmpl);
                        $nav_SearchTmpl.html(doTtmpl(data));

                    }else{
                        $nav_SearchTmpl.html('');
                    }
                };
                $.get(url , data , callback ,'json');

            }else{
                $nav_SearchTmpl.html('');
            }
        }

    },
    disDefault:function (e) {
        e=e||window.event;
        e.keyCode==38||e.keyCode==40? e.preventDefault():'';
    },
    beColor:function () {
        $(this).siblings().removeClass('hasColor');
        $(this).addClass('hasColor');
    },
    clickSearchTmpl:function(){
        $search_input.val($(this).text());
        window.open('/search/?keyword='+$(this).text()+'&exact=1');
    },
    hideSearchTmpl:function (e) {
        e=e||window.event;
        var $target=$(e.target);
        // console.log($target.parents('.search-box').length);
        if($target.parents('.search-box').length==0&&$nav_SearchTmpl.children().length>0&&$nav_SearchTmpl.css('display')=='block'){
            $nav_SearchTmpl.hide();
        }
    },
    showSearchTmpl:function () {
        if($nav_SearchTmpl.children().length>0&&$nav_SearchTmpl.css('display')=='none'){
            $nav_SearchTmpl.show();
        }
    },
    mouseoverNavList:function () {
        $(this).siblings().each(function (index,cur) {
            $(this).find('ul').stop(true,true).hide();
        });
        $(this).find('ul').show(600);
    },
    mouseleaveNavList:function () {
        $(this).find('ul').hide();
    },

    //退出
    logout:function(){
        base.cache.clear_cookie('token');
        base.cache.clear_cookie('uid');
        base.cache.clear_cookie('nsessid');
        base.cache.clear_cookie('lgtype');

        if(!nav_event.getQueryString('url') || nav_event.getQueryString('url') == null){
            window.location.reload();
        }else{
            window.location.href = nav_event.getQueryString('url');
        }


    },

    getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }


};
function navInit(){
    nav_view.init();
    nav_event.init();
};
$(document).ready(function () {
    $search_btn = $('.search');
    $search_box = $('.search-box');
    $search_input = $search_box.find('input');
    $search_close = $('.search-close');
    $nav_SearchTmpl = $('.nav-search-tmpl');
    $search_plaholder = $('.placeholder');
    $nav = $('.top-menu-box .nav');
    $login_out = $('#logout');
    navInit();
});