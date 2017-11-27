//##include('../block/base.js');
//##include('../block/lazyload.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/return-top.js');
//##include('../block/ajaxloadmore.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
var $photo,
    $desc,
    $win,
    $thumbnails,
    $tool,
    $tool1,
    $arrowLeft,
    $arrowRight,
    $nomore;

var _view = {
    init: function () {
        this.initDesc();
        this.initThumbnails();
        this.initTool1();
    },

    initDesc: function () {
        var descH = $desc.height();
        $desc.css({'bottom': -descH,});
        $photo.on({
            'mouseenter': function () {
                $desc.css({'visibility': 'visible', 'bottom': '0'});
            },
            'mouseleave': function () {
                $desc.css({'bottom': -descH});
            }
        })
    },
    initThumbnails: function () {

        $('.thumbnail').on('click', function () {
            $thumbnails.toggle();
            if($thumbnails.css('display')=='block'){
                $thumbnails.find('img').each(function (index,cur) {
                    $(this).width()>$(this).height() ? $(this).css('height','100%') : $(this).css('width','100%');
                });
            }
        });
        $('.thumbnail1').on('click', function () {
            $thumbnails.toggle();
            if($thumbnails.css('display')=='block'){
                $thumbnails.find('img').each(function (index,cur) {
                    $(this).width()>$(this).height() ? $(this).css('height','100%') : $(this).css('width','100%');
                });
            }
            if ($thumbnails.css('display') == 'block') {
                $('.tool1').hide();
            } else {
                $('.tool1').show();
            }
        })
    },
    initTool1:function () {
      if($win.width ()<=890){
          $tool1.show();
      }else{
          $tool1.hide();
      }
    },
};

var _event = {
    bind: function () {
        $('.close').on('click', this.close);
        $(document).on('keydown', this.switchPicture);
        $photo.find('img').on({
            'click': this.clickPicture,
            'mouseenter': this.enterPicture,
            'mouseleave': this.leavePicture
        });
        $win.resize(this.hideTool1);
        $thumbnails.on('click', 'img', this.clickThumbnails);
        $arrowRight.on('click', this.nextPic);
        $arrowLeft.on('click', this.prevPic);
    },
    close: function () {
        window.opener = null;
        window.open('', '_self');
        window.close();
    },
    switchPicture: function (e) {
        e = e || window.event;
        if (e.keyCode == 37) {

            if( $nomore.css('display')=='block'){
              return false;

            }else{
                $thumbnails.find('.active').parent().index() == 0 ? '' : _event.prevPic();
            }
        } else if (e.keyCode == 39) {
            $nomore.css('display')=='block'?'' : _event.nextPic();
        }

    },
    clickPicture: function (e) {
        e = e || window.event;
        if (e.clientX >= $photo.find('img').offset().left + $photo.find('img').width() / 2) {
            _event.nextPic();
        } else {
            _event.prevPic();
        }
    },
    enterPicture: function (e) {
        e = e || window.event;
        if (e.clientX >= $(window).width() / 2) {
            $(this).css({'cursor': 'pointer'});
        } else {
            $(this).css({'cursor': 'pointer'})
        }
    },
    leavePicture: function (e) {
        $(this).css({'cursor': 'default'});
    },
    clickThumbnails: function (e) {
        $nomore.css('display') == 'block' ? $nomore.hide() : '';
        $(this).parent().siblings().find('img').removeClass('active');
        $(this).parent().index() == 0 ? $arrowLeft.hide() : $arrowLeft.show();
        $(this).addClass('active');
        $photo.find('img').attr({'src': $(this).attr('src')});
        $desc.html($thumbnails.find('.active').next('.pic_title').html());
        $tool.find('span').eq(0).html(parseInt($(this).parent().index()) + 1);
        $tool1.find('span').eq(0).html(parseInt($(this).parent().index()) + 1);
        try {
            var href = location.href.substring(0, location.href.indexOf('?')) + '?i=' + $thumbnails.find('.active').attr('id');
            history.replaceState('', '', href);
        } catch (e) {
            console.log(e)
        }
        $thumbnails.fadeOut();
        $win.width()<=890?$thumbnails.hide():'';
        $win.width()<=890?$tool1.show():'';
    },
    nextPic: function () {
        $arrowLeft.css('display') == 'none' ? $arrowLeft.show() : '';
        if ($thumbnails.find('.active').parent().next().length != 0) {
            var nextActive = $thumbnails.find('.active').parent().next().find('img');
            nextActive.parent().siblings().find('img').removeClass('active');
            nextActive.addClass('active');
            $photo.find('img').attr({'src': $thumbnails.find('.active').attr('src')});
            $desc.html($thumbnails.find('.active').next('.pic_title').html());
            $tool.find('span').eq(0).html($thumbnails.find('.active').parent().index() + 1);
            $tool1.find('span').eq(0).html($thumbnails.find('.active').parent().index() + 1);
            try {
                var href = location.href.substring(0, location.href.indexOf('?')) + '?i=' + $thumbnails.find('.active').attr('id');
                history.replaceState('', '', href);
            } catch (e) {
                console.log(e)
            }
        } else {
            $nomore.show();
            $nomore.on('click','.again',function () {
                $nomore.hide();
                $thumbnails.find('img').removeClass('active');
                $thumbnails.find('img').eq(0).addClass('active');
                $arrowLeft.hide();
                $photo.find('img').attr('src',$thumbnails.find('img').eq(0).attr('src'));
                $desc.html($thumbnails.find('.active').next('.pic_title').html());
                $tool.find('span').eq(0).html('1');
                $tool1.find('span').eq(0).html('1');
                try {
                    var href = location.href.substring(0, location.href.indexOf('?')) + '?i=' + $thumbnails.find('.active').attr('id');
                    history.replaceState('', '', href);
                } catch (e) {
                    console.log(e)
                }
            })
        }
    },
    prevPic: function () {
        var prevActive = $thumbnails.find('.active').parent().prev().find('img');
        prevActive.parent().siblings().find('img').removeClass('active');
        prevActive.addClass('active');
        $photo.find('img').attr({'src': $thumbnails.find('.active').attr('src')});
        $desc.html($thumbnails.find('.active').next('.pic_title').html());
        $tool.find('span').eq(0).html($thumbnails.find('.active').parent().index() + 1);
        $tool1.find('span').eq(0).html($thumbnails.find('.active').parent().index() + 1);
        prevActive.parent().index() == 0?$arrowLeft.hide():'';
        try {
            var href = location.href.substring(0, location.href.indexOf('?')) + '?i=' + $thumbnails.find('.active').attr('id');
            history.replaceState('', '', href);
        } catch (e) {
            console.log(e)
        }
    },
    hideTool1: function () {
        if ($win.width() >= 890) {
            $('.tool1').hide();
        } else if ($win.width() <= 890 && $thumbnails.css('display') == 'block') {
            $('.tool1').hide();
        } else if ($win.width() <= 890 && $thumbnails.css('display') == 'none') {
            $('.tool1').show();
        }
    },
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function () {
    $photo = $('.photo');
    $desc = $('.desc');
    $win = $(window);
    $thumbnails = $('.thumbnails');
    $arrowLeft = $('.arrowLeft');
    $arrowRight = $('.arrowRight');
    $nomore = $('.nomore');
    $tool = $('.tool');
    $tool1=$('.tool1');

    init();
    updatewxlogin.init();
    updatewblogin.init();
});
