function checkUidToken(){
    return (base.cache.get_cookie('uid') != '' && base.cache.get_cookie('token') != '') ? true : false;
}


$(document).ready(function () {

    var wxAppId = base.wxAppId;
    var redirect_uri = window.location.href.replace('#return-top-flag','');
    if(base.tools.getQueryString('url')) {
        redirect_uri = base.tools.getQueryString('url');
    }

    $('#wx_login').on('click',function(){
        base.cache.set_cookie('lgtype',2,5);
        base.cache.set_cookie('initurl',redirect_uri,5);

        if(base.cache.get_cookie('initurl')){
            window.location.href='https://open.weixin.qq.com/connect/qrconnect?' + 'appid=' + wxAppId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_login&state=' + base.tools.rand(10);
        }

    });

});