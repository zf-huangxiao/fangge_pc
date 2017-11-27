
var zoomPics={
    fangdaPic:function () {
        $(this).find('img').css({ '-webkit-transform': 'scale(1.2)',
            '-ms-transform': 'scale(1.2)',
            '-moz-transform':'scale(1.2)',
            '-o-transform':'scale(1.2)',
            'transform': 'scale(1.2)',
            // 'zoom': '1.2',
            '-webkit-transition': '-webkit-transform .5s',
            '-moz-transition': '-moz-transform .5s',
            '-o-transition': '-o-transform .5s',
            'transition': 'transform .5s'});

    },
    suoxiaoPic:function () {
    $(this).find('img').css({ '-webkit-transform': 'scale(1.0)',
        '-ms-transform': 'scale(1.0)',
        '-moz-transform':'scale(1.0)',
        '-o-transform':'scale(1.0)',
        'transform': 'scale(1.0)',
        // 'zoom': '1.0',
        '-webkit-transition': '-webkit-transform .5s',
        '-moz-transition': '-moz-transform .5s',
        '-o-transition': '-o-transform .5s',
        'transition': 'transform .5s'})
},
    init:function () {
        _this=this;
        $('.pic').each(function (index,ele) {

            $(ele).mouseenter(_this.fangdaPic);
            $(ele).mouseleave(_this.suoxiaoPic);
        }) ;
    }
} ;