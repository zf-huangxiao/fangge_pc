//##include('../block/base.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
var $doc,
    $win,
    $tips,
    $contents,
    $button;

var _view = {
    init:function () {
        // this.showContent() ;
        // this.initActive();
    },

};

var _event = {
    bind: function() {

        $('.close').on('click',function(){
            window.opener=null;
            window.open('','_self');
            window.close();})
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
    $tips=$('.title').find('li');
    $contents=$('.content').find('li');
    $button=$('button');
    init();
    updatewxlogin.init();
    updatewblogin.init();

});
