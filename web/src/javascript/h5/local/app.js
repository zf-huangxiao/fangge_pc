//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
var $doc,
    $win,
    $ios,
    $android,
    $erweima;

var _view = {
    init: function() {

    },
};

var _event = {
    bind: function() {
          $android.on('click',function () {
              $erweima.show();
              // $erweima.find('.inner').removeClass('ios_downP').find('div').addClass('android_downP');
          });
        $ios.on('click',function () {
            $erweima.show();
            // $erweima.find('.inner').find('div').removeClass('android_downP').addClass('ios_downP');
        });
        $erweima.on('click',function () {
            $(this).hide();
        })
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
    $ios = $('.ios');
    $android = $('.android');
    $erweima = $('.erweima');
    init();
    $('nav').find('a').eq(0).removeClass('active');
});
