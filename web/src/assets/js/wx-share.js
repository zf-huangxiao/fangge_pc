function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

wx.config({
    debug: false,
    appId: 'wx1256a44ccfd29bb9',
    timestamp: new Date().getTime(),
    nonceStr: randomString(32),
    signature: 'c61a8a89ebb58ac24ddb7bc3db09aa5e',
    jsApiList: [
    // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
]
});
var share_title="方格时尚title-test";
var share_desc="方格时尚content-test";
var share_image="http://www.veryside.com/assets/images/gallery/thumb-3.jpg";
var share_link="http://www.veryside.com";
wx.ready(function () {


    // 在这里调用 API
    wx.onMenuShareAppMessage({
        title: share_title, // 分享标题
        desc: share_desc, // 分享描述
        link: share_link, // 分享链接
        imgUrl: share_image, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数

        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareTimeline({
        title: share_title, // 分享标题
        link: share_link, // 分享链接
        imgUrl: share_image, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数



        },
        cancel: function () {
            // 用户取消分享后执行的回调函数

        }
    });

});