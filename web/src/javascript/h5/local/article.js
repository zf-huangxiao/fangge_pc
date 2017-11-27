//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/ajaxloadmorecomments.js');
//##include('../block/return-top.js');
//##include('../block/share.js');
//##include('../block/zoomPics.js');
//##include('../block/audio.js');
//##include('../block/phonelogin.js');
//##include('../block/wxlogin.js');
//##include('../block/wblogin.js');
//##include('../block/qqlogin.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');




var $doc,
    $win,
    $contentList,
    $loadMore,
    endEleTime,
    $paragraphEnd,
    $topPic,
    $topPicImg,
    $advertContainer,
    $advert,
    $advertOne,
    $articleAdvert,
    $articleContainer,
    $articleTag,
    startScrollT,
    oHeight,
    $article,
    $wxPy2,
    $wxPyq2,
    $commentsLogin,
    $comments,
    $commentsList,
    $publishContent,
    $publishBtn,
    $actionBtn,
    $totalNum,
    $moreComments,
    $comments_login_btn,
    $login_pop_layer;

var _view = {
    init: function () {
        _view.initSlideSwipe();
        this.initSmallSwiper();
        zoomPics.init();
        this.initScrollTop();
        this.initCommentsLogin();
        this.initDelBtn();
        this.initShare();
    },

    initSlideSwipe: function () {
        var wiperAtlas = new Swiper('.swiper-container', {
            direction: 'horizontal',
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            loop: true,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            onInit: function (swiper) {
                if (swiper.slides.length == 3) {
                    swiper.lockSwipes();
                    $('.swiper-button-prev').hide();
                    $('.swiper-button-next').hide();
                }
            }
        });
    },
    initSmallSwiper: function () {
        var smallSwiper = new Swiper('.small-swiper', {
            loop: false,
            direction: 'horizontal',
            pagination: '.swiper-pagination',
            paginationType: 'bullets',
            paginationClickable: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            effect: 'fade',
            fade: {
                crossFade: true,
            },

            onSlideChangeEnd: function (swiper) {
                swiper.container.find('.slideDesc p').removeClass('currentP');
                swiper.container.find('.slideDesc p').eq(swiper.activeIndex).addClass('currentP');
            }
        });

    },
    initScrollTop: function () {
        // var $topPicH=$topPicImg.height();
        var $topPicH = 650;
        $articleTag.css('margin', $topPicH + 'px 20px 0');
        $win.scrollTop($topPicH - 496);
        //496是文章标题块离顶部的距离
    },
    isLogged:function () {
        var cookieArr = document.cookie.split(';');
        var uid,uToken;
        cookieArr.forEach(function (cur,index) {
            if(cur.indexOf('uid=') > -1){
                uid = cur.split('=')[1];
            }else if( cur.indexOf('token=') > -1){
                uToken = cur.split('=')[1];
            }
        });
        if(uid && uToken){//用户登录了
            return true;
        }else{//未登录
            return false;
        }
    },
    initCommentsLogin:function () {
        if(this.isLogged()){//已登录
            $commentsLogin.hide();
            $comments.find('.welcomeuser').show();
        }
    },
    initDelBtn:function () {
        var uid = base.cache.get_cookie('uid');
        $actionBtn.each(function (index,cur) {
            var speakerId = $(this).attr('uid');
            if(uid == speakerId && speakerId){
                $(this).find('.reply').hide();
                $(this).find('.del').show();
            }

        })


    },
    initShare:function () {
        window._bd_share_config.common.bdText=$('.article-title').text().replace(/ +/g,'');
        $('.article-wrapper').find('img').each(function (index,ele) {
            window._bd_share_config.common.bdPic+='||'+ele.src;
        });
    }
};

var _event = {
    bind: function () {
        $loadMore.on('click', this.loadIndexList);
        $win.on('scroll', this.advertStyle)
            .on('scroll', this.topPicOpacity);
        $('.return-top').on('click', this.recoveryAdvert);
        $wxPy2.on('click',this.clickWxPy);
        $wxPyq2.on('click',this.clickWxPyq);
        $publishBtn.on('click',this.publishComment);
        $commentsList.on('click','span.del',this.deleteComment);
        $commentsList.on('click','span.reply',this.replySomeone);
        $moreComments.on('click',this.loadMoreComment);
        $('#phone_num').keyup(this.changeLoginBtnColor);
        $('#code_num').keyup(this.changeLoginBtnColor);
        $comments_login_btn.on('click',function () {
            $login_pop_layer.fadeIn();
        });
        $login_pop_layer.on('click',function (e) {
            // e.stopPropagation();
            if($(e.target).attr('id') == 'login_pop_layer'){
                $login_pop_layer.fadeOut();
            }
        });
        $publishContent.on('focus',function () {
            if(!_view.isLogged()){
                $login_pop_layer.fadeIn();
            }
        });
        $('#login-close').on('click',function () {
            $login_pop_layer.fadeOut();
        });

    },
    loadIndexList: function () {

        if (!$contentList.children().last().attr('data-time') || $contentList.children().last().attr('data-time') == 'undefined') {
            endEleTime = 0;
        } else {
            endEleTime = $contentList.children().last().attr('data-time')
        }

        ajaxloadmore.init({  
            el: $contentList,
            async: false,
            url: '/welcome/index_apis/indexloadlist?p=' + pageSize + '&time=' + endEleTime,
            yCallback: function () {
                $('#content-list').find('div:nth-child(3n)').css({'margin-right': '0'});
                zoomPics.init();
            }
        });


    },
    advertStyle: function () {
        var articleAdvertT = $articleAdvert.offset().top,
            scrollT = $win.scrollTop();
        if (scrollT <= startScrollT) {
            $advertContainer.removeClass('posTop').css('top', '').addClass('fixedR');

        } else if (scrollT > startScrollT) {
            $advertContainer.removeClass('fixedR').addClass('posTop').css('top', startScrollT);
            if (scrollT < oHeight + startScrollT) {
                $advert.removeClass('posF').removeClass('posB').css('bottom', '');
            } else if (scrollT >= oHeight + startScrollT && scrollT <= articleAdvertT - $advert.height() - 60) {
                $advert.removeClass('posB').css('bottom', '').addClass('posF');

            } else {
                $advert.removeClass('posF').addClass('posB').css('bottom', startScrollT);
            }

        }

    },
    topPicOpacity: function () {
        var winScrollT = $win.scrollTop();
        if (0 <= winScrollT && winScrollT <= startScrollT) {
            $topPicImg.css('opacity', 1);
        } else if (winScrollT > startScrollT && winScrollT <= 650) {
            var topPicImgOpacity = 1 - (winScrollT - startScrollT) * 1 / (650 - startScrollT);
            $topPicImg.css('opacity', topPicImgOpacity);
        } else {
            $topPicImg.css('opacity', 0);
        }
    },
    recoveryAdvert: function () {
        $advertContainer.removeClass('posTop').css('top', '').removeClass('fixedR');
        $advert.removeClass('posF').removeClass('posB').css('bottom', '');
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
    addCommentDom:function (data) {
      var avatarSrc = $('#comments-user-avatar').text(),
          nickName = $('#comments-user-nickname').text(),
          id = data.data.id,
          content = $publishContent.val().replace(/^回复[\s\S]+：/,"");
      var oCommentDiv = $('<div></div>'),
          oComment = $("<div class='reviewer noresponse'></div>").attr('comment_id',id);

      $('<img class="avatar">').attr('src',avatarSrc).appendTo(oCommentDiv);
      $('<div class="action-btn"><span class="del" style="display:block;">删除</span></div>').appendTo(oCommentDiv);
      $('<span class="name"></span>').text(nickName).appendTo(oComment);
      $('<span class="time">刚刚</span>').appendTo(oComment);
      $('<p class="reviewer-text"></p>').text(content).appendTo(oComment);
      oComment.appendTo(oCommentDiv);
      oCommentDiv.insertAfter($commentsList.children('h1'));
      oCommentDiv=null;
    },
    addReplyDom:function (data) {
        var avatarSrc = $('#comments-user-avatar').text(),
            nickName = $('#comments-user-nickname').text(),
            id = data.data.id,
            content = $publishContent.val().replace(/^回复[\s\S]+：/,""),
            replyWho,
            replyWhat;
        var oCommentDiv = $('<div></div>'),
            oReply = $('<div class="responder"></div>').attr('comment_id',id),
            oComment = $("<div class='reviewer'></div>");
        replyWho = $commentsList.find('div>div[comment_id='+$publishBtn.attr('replyid')+']').find('.name').text()||"";
        replyWhat = $commentsList.find('div>div[comment_id='+$publishBtn.attr('replyid')+']').find('p').text()||"";

        $('<img class="avatar">').attr('src',avatarSrc).appendTo(oCommentDiv);
        $('<div class="action-btn"><span class="del" style="display:block;">删除</span></div>').appendTo(oCommentDiv);
        $('<span class="name"></span>').text(nickName).appendTo(oReply);
        $('<span class="time">刚刚</span>').appendTo(oReply);
        $('<p class="reviewer-text"></p>').text(content).appendTo(oReply);
        $('<span class="name"></span>').text(replyWho).appendTo(oComment);
        $('<p class="reviewer-text"></p>').text(replyWhat).appendTo(oComment);
        oReply.appendTo(oCommentDiv);
        oComment.appendTo(oCommentDiv);
        oCommentDiv.insertAfter($commentsList.children('h1'));
        oCommentDiv=null;
    },
    ajaxComment:function (opts) {
        $.ajax({
            type:opts.type||'GET',
            url:opts.url,
            data:opts.data,
            dataType:'json',
            success:opts.success
        })

    },
    publishComment:function () {
        if(_view.isLogged()){
            if($publishContent.val() && !/^ +$/.test($publishContent.val())){
               var dataId =/\/(\d+).html/.exec(window.location.pathname)[1];
               var replyId = 0;
               var content = $publishContent.val();
               var type = 10;
               //测试阶段拼接这三个参数;
                var uid = base.cache.get_cookie('uid');
                var token = base.cache.get_cookie('token');
                var sessionid = base.cache.get_cookie('nsessid');
                var totalNum = parseInt($totalNum.text());
                if(/^回复[\s\S]+：/.test(content)){//回复某人的
                    content = content.replace(/^回复[\s\S]+：/,"");
                    if(/^ +$/.test(content)||!content){
                        alert('输入点内容再提交吧~')
                    }else{
                        replyId = $(this).attr('replyId');
                        _event.ajaxComment({
                            type:'POST',
                            url:'/article/index_apis/comment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                            data:{
                                data_id:dataId,
                                reply_id:replyId,
                                content:content,
                                type:type,
                            },
                            success:function (data) {
                                if(data.code == '200'){
                                    _event.addReplyDom(data);
                                    $totalNum.text(totalNum+1);
                                    $publishContent.val('');
                                }else{
                                    alert(data.msg);
                                }
                            }
                        })

                    }

                }else{//只是评论
                    _event.ajaxComment({
                        type:'POST',
                        url:'/article/index_apis/comment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                        data:{
                            data_id:dataId,
                            reply_id:replyId,
                            content:content,
                            type:type,
                        },
                        success:function (data) {
                            if(data.code == '200'){
                                _event.addCommentDom(data);
                                $totalNum.text(totalNum+1);
                                $publishContent.val('');
                                $('.nocomment').length>0?$('.nocomment').hide():"";
                            }else{
                                alert(data.msg);
                            }

                        }
                    })
                }

            }else{
                alert('请填写评论内容~');
                $publishContent.focus();
            }
        }else{
            $login_pop_layer.fadeIn();
        }

    },
    deleteComment:function () {
        var r = confirm('确认删除此次评论吗?');
        if(!r) return;
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        var sessionid = base.cache.get_cookie('nsessid');
        var respond = $(this).parent().siblings('.responder');
        var reviewer = $(this).parent().siblings('.reviewer');
        var dataId,type;
        var totalNum =  parseInt($totalNum.text());

        if(respond.length > 0){//删除自己的回复
            dataId  = respond.attr('comment_id'),
            type = 10;
            _event.ajaxComment({
                type:'GET',
                url:'/article/index_apis/deletecomment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                data:{
                    id:dataId,
                    type:type,
                },
                success:function (data) {
                    if(data.code == '200'){
                        respond.parent().remove();
                        $totalNum.text(totalNum-1);
                    }else{
                        alert(data.msg);
                    }
                }
            })
        }else{//删除自己的文章评论
            dataId  =reviewer.attr('comment_id'),
            type = 10;
            _event.ajaxComment({
                type:'GET',
                url:'/article/index_apis/deletecomment'+'?uid='+uid+'&token='+token+'&sessionid='+sessionid,
                data:{
                    id:dataId,
                    type:type,
                },
                success:function (data) {
                    if(data.code == '200'){
                        reviewer.parent().remove();
                        $totalNum.text(totalNum-1);
                        var $noConment = $('.nocomment'),
                            totalNow = $totalNum.text();
                        if($noConment.length > 0 && totalNow == 0){
                            $noConment.show();
                        }else if($noConment.length == 0 && totalNow == 0){
                            $comments.append('<div class="nocomment">暂无，来分享看法吧!</div>');
                        }
                    }else{
                        alert(data.msg);
                    }
                }
            })

        }
    },
    replySomeone:function () {
        var needScrollTo = $comments.offset().top-80;
        $win.scrollTop(needScrollTo);
        if(_view.isLogged()){//已登录
            var retBackName,contentId;

            if($(this).parent().siblings('.responder').length>0){//B回复了A，此次是某人回复B
               retBackName = $(this).parent().siblings('.responder').find('.name').text(),
               contentId = $(this).parent().siblings('.responder').attr('comment_id');
            }else{
               retBackName = $(this).parent().siblings('.reviewer').find('.name').text(),
               contentId = $(this).parent().siblings('.reviewer').attr('comment_id');
            }

            $publishContent.val('回复'+retBackName+'：').focus();
            $publishBtn.attr('replyId',contentId);


        }else{
            $login_pop_layer.fadeIn();
        }

    },
    loadMoreComment:function(){
        var id = window.location.pathname.match(/\/(\d+).html/)[1];
        loadMoreComments.init({
            el: $commentsList,
            async: false,
            url: '/article/index_apis/loadmorecomment?id=' + id + '&type=10&p=' + commentsPage,
            yCallback: function () {
                var uid = base.cache.get_cookie('uid');
                $('.action-btn').each(function (index,cur) {
                    var speakerId = $(this).attr('uid');
                    if(uid == speakerId && speakerId){
                        $(this).find('.reply').hide();
                        $(this).find('.del').show();
                    }

                });
            }
        });
    },
    changeLoginBtnColor:function () {
        var phoneVal = $('#phone_num').val(),
            codeVal = $('#code_num').val();
        if(/^1[3458]\d{9}$/.test(phoneVal)&& /^\d{4}$/.test(codeVal)){
            $('#phone_login_btn').addClass('canClick');
        }else{
            $('#phone_login_btn').removeClass('canClick');
        }
    },
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function () {
    $doc                 = $(document);
    $win                 = $(window);
    $loadMore            = $('#load-more-btn');
    $contentList         = $('#content-list');
    $paragraphEnd        = $('.end-flag').closest('p');
    $article             = $('.article-wrapper');
    $topPic              = $('.top-pic');
    $advertContainer     = $('.advertContainer_right');
    $articleAdvert       = $('.article_advert');
    $advert              = $advertContainer.find('.advert');
    $advertOne           = $('.advert_one');
    $articleContainer    = $('.article-container');
    $topPicImg           = $topPic.find('img');
    $articleTag          = $article.find('.article-tag');
    startScrollT         = 650 - 496;
    oHeight              = $advert.offset().top - 60;
    $wxPy2                = $('.fengxiang2').find('.wx_py');
    $wxPyq2              = $('.fengxiang2').find('.wx_pyq');
    $comments            = $('#comments');
    $commentsList        = $comments.find('.comments-lists');
    $commentsLogin       = $('.comments-login');
    $publishContent      = $('#comments-input');
    $publishBtn          = $('.comments-publish').find('input');
    $actionBtn           = $('.action-btn');
    $totalNum            = $commentsList.find('h1>span');
    $moreComments        = $('#comments-checkMore-btn');
    $comments_login_btn  = $commentsLogin.find('.comment-login-btn');
    $login_pop_layer     =$('#login_pop_layer');

    init();
    updatewxlogin.init();
    updatewblogin.init();

});
