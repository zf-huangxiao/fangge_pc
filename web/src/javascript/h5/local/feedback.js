//##include('../block/base.js');
//##include('../block/updatewxlogin.js');
//##include('../block/updatewblogin.js');
var $doc,
    $win,
    $tips,
    $contents,
    $suggestion,
    $contactWay,
    $button;

var _view = {
    init:function () {

    },

};

var _event = {
    bind: function() {
         $button.on('click',this.clickButton) ;
        $('.close').on('click',function(){
            window.opener=null;
            window.open('','_self');
            window.close();})
    },
    clickButton:function () {
        var message  = $suggestion.val();
        var contact  = $contactWay.val();
        var uid      = '0';
        var telReg   = /^1[34578]\d{9}$/;
        var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(message==''||/^ +$/.test(message)||/^\n+$/.test(message)){
            alert('请输入您的建议！');
            $(this).css('box-shadow','');
            $suggestion.focus().val('');
        }else if(telReg.test(contact)||emailReg.test(contact)){
            $.ajax({
                type:'post',
                url: '/feedback/index_apis/indexloadlist',
                data:{message:message,uid:uid,contact:contact},
                async : false,
                dataType: '',
                success: function(data){
                    if(data == '200'){
                        alert("感谢您的建议!");
                    }
                },
                error: function(){
                    console.log('Ajax error!');
                }
            });
            $(this).css('box-shadow','1px 1px 1px #989898');
            $suggestion.val('');
            $contactWay.val('');

        }else{
            alert('请输入正确的手机号或邮箱！');
            $(this).css('box-shadow','');
            $contactWay.focus();
        }

    }
};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

$(document).ready(function(){
    $doc        = $(document);
    $win        = $(window);
    $tips       = $('.title').find('li');
    $contents   = $('.content').find('li');
    $button     = $('button');
    $suggestion = $('.form').find('textarea');
    $contactWay = $('.form').find('.contact');
    init();
    updatewxlogin.init();
    updatewblogin.init();

});
