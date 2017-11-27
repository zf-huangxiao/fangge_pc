
$(document).ready(function () {
    var  $wxPy = $('#vs-share').find('.wx_py'),
        $wxPyq = $('#vs-share').find('.wx_pyq');

    var clickWxShare = {
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
    };

    window._bd_share_config = {
        common: {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "1",
            // "bdSize": "16",
            onAfterClick:function (cmd,config) {
                if(cmd=='weixin'){
                }
            }
        },
        share:[],
        image:''
    };
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];

    //改变两个二维码字体提示
    $wxPy.on('click',clickWxShare.clickWxPy);
    $wxPyq.on('click',clickWxShare.clickWxPyq);

});
