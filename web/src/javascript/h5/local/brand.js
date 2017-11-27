//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
//##include('../block/swiper.js');
//##include('../block/return-top.js');
//##include('../block/tooltipster.bundle.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');


var $doc,
    $win,
    $logos,
    $letters;

var _view = {
    init: function () {
        this.initTooltipster();
        // this.belowIE9style();
    },
    initTooltipster: function () {
        $('.tooltip').tooltipster({
            theme: 'tooltipster-shadow',
            delay: 200,
            position: 'right',
        });
    },
    belowIE9style: function () {
        var navStr = navigator.userAgent;
        if (navStr.indexOf('MSIE') > -1) {
            navStr.replace(/MSIE (\d+).\d+;/, function (a, b) {
                if (parseInt(b) < 9) {
                    var firstCol = document.createElement('div'),
                        secondCol = document.createElement('div'),
                        thirdCol= document.createElement('div'),
                        $oldDom = $logos.children('div'),
                        oFragment = document.createDocumentFragment(),
                        len=$logos.find('ul').find('li').length,
                        firstLen=parseInt(len/3),
                        secondLen=parseInt(len/3),
                        thirdLen=len-firstLen-secondLen;
                    firstCol.className='firstCol';
                    secondCol.className='secondCol';
                    thirdCol.className='thirdCol';
                    $oldDom.each(function (index,cur) {
                        var splitNum=0;
                        if($(this).find('li').length+$(this).prevAll().find('li').length<=firstLen){
                            $(this).clone().appendTo($(firstCol));
                            splitNum=firstLen-$(firstCol).find('li').length;
                            if(splitNum>0){
                                $(this).next().addClass('split').clone().appendTo($(firstCol));
                                $(firstCol).find('.split').find('li').each(function (i,c) {
                                    if(i>$(firstCol).find('.split').find('li').length-splitNum+1){
                                        $(this).remove()
                                    }
                                });
                            }
                        }else if($(this).find('li').length+$(this).prevAll().find('li').length>firstLen&&$(this).find('li').length+$(this).prevAll().find('li').length<=firstLen+secondLen){
                            if($(this).hasClass('split')){
                               $(this).clone().appendTo($(secondLen)).find('span').remove();
                                $(secondLen).find('.split').find('li').each(function (i,c) {
                                    if(i<1){

                                    }

                                })
                            }

                        }


                    })
                    $('body').append(firstCol)



                }
            })
        }
    },

};

var _event = {
    bind: function () {
        $letters.on('click', 'a', this.beRed);
        $letters.on('click', 'a[href]', this.contentsPlace);
    },

    beRed: function (e) {
        if ($(this).attr('href')) {
            $(this).parent().siblings().find('.current') ? $(this).parent().siblings().find('.current').removeClass('current').css({'color': '#000'}) : '';
            $(this).addClass('current').css('color', '#fe1313');
        }
    },
    contentsPlace: function () {
        var str = $(this).attr('href');
        $win.on('scroll.a', function () { //.a命名空间
            // console.log('aaaaaaaa');
            if ($win.scrollTop() == $(str).offset().top) {
                var scrollT = $win.scrollTop();
                $win.scrollTop(scrollT - 60);
            }
            $win.unbind('scroll.a');
        });
        $logos.find('span.active').length > 0 ? $logos.find('span.active').removeClass('active') : '';
        $(str).find('.letter').addClass('active');
    },
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function () {
    $doc = $(document);
    $win = $(window);
    $logos = $('.logos');
    $letters = $('.letters ul');
    init();
    updatewxlogin.init();
    updatewblogin.init();
});
