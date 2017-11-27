$(document).ready(function () {
    var wbClientId = base.wbClientId;
    var redirect_uri = window.location.href.replace('#return-top-flag','');
    if(base.tools.getQueryString('url')) {
        redirect_uri = base.tools.getQueryString('url');

    }

    $('#wb_login').on('click',function(){

        //forcelogin=true
        base.cache.set_cookie('lgtype',3,5);
        base.cache.set_cookie('initurl',redirect_uri,5);

        window.location.href='https://api.weibo.com/oauth2/authorize?' + 'client_id=' + wbClientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&forcelogin=true&state=' + base.tools.rand(10);
    });

});