//切割字符串转换参数表
function toParamMap(str){
    var map = {};
    var segs = str.split("&");
    for(var i in segs){
        var seg = segs[i];
        var idx = seg.indexOf('=');
        if(idx < 0){
            continue;
        }
        var name = seg.substring(0, idx);
        var value = seg.substring(idx+1);
        map[name] = value;
    }
    return map;
}

//隐式获取url响应内容(JSONP)
function openImplict(url){
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

//获得openid的回调
function callback(obj) {
    var openid = obj.openid;

    //跳转服务端登录url
    var resulturl = "/user/index_apis/qqloginoauth";
    var accessToken = base.cache.get_cookie('access_token');

    //向服务端传输access_token及openid参数
    $.ajax({
        type: "POST",
        url : resulturl,
        data : {
            access_token:accessToken,
            openid:openid,
            sessionid:base.cache.get_cookie('nsessid'),
            type:1

        },
        dataType: "json",
        success : function(data){

            if(data.code == 200){
                window.location.href = base.cache.get_cookie('initurl');
            }
        }
    })
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(document).ready(function () {

    //应用的APPID
    var appID = base.qqAppId;

    //初始请求地址
    var req_url = '';

    var initurl = window.location.href;
    if(base.tools.getQueryString('url')) {
        initurl = base.tools.getQueryString('url');
    }

    //登录授权后的回调地址，设置为当前url
    var redirectURI = encodeURIComponent(base.redirect_host + 'user/thirdtransfer/');

    //初始构造请求
    if (window.location.hash.length == 0 || window.location.hash.substring(1) == 'return-top-flag') {
        var path = 'https://graph.qq.com/oauth2.0/authorize?';
        var queryParams = ['client_id=' + appID,
            'redirect_uri=' + redirectURI,
            'scope=' + 'get_user_info,list_album,upload_pic,add_feeds,do_like',
            'response_type=token'];

        var query = queryParams.join('&');
        req_url = path + query;

        if(base.cache.get_cookie('lgtype') != 2 && base.cache.get_cookie('lgtype') != 3){
            base.cache.set_cookie('initurl',initurl,5);
        }

    }
    //在成功授权后回调时location.hash将带有access_token信息，开始获取openid
    else {
        //获取access token
        var accessToken = window.location.hash.substring(1);
        var map = toParamMap(accessToken);

        //记录accessToken
        base.cache.set_cookie('access_token',map.access_token,5)

        //使用Access Token来获取用户的OpenID
        var path = "https://graph.qq.com/oauth2.0/me?";
        var queryParams = ['access_token='+map.access_token, 'callback=callback'];
        var query = queryParams.join('&');
        var url = path + query;
        openImplict(url);
    }

    $('#qq_login').on('click',function(){
        window.location.href= req_url;
    })

});
