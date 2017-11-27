exports.bind = function(php){
    var mSelf = this;
    var c_url = mSelf.req.url || '';
    var isRedirect = mSelf.req.__get.__R || 0;
    mSelf.__session.start();
    if(mSelf.req.headers.cookie){
        var _cookieArr = mSelf.req.headers.cookie.split('; ');
        var _cookieJson = {};

        (function cookieArrToJson(_cookieArr){
            for(var i = 0; i < _cookieArr.length; i++){
                var tmpArr = _cookieArr[i].split('=');
                _cookieJson[tmpArr[0]] = tmpArr[1];
            }
        })(_cookieArr);
        php.user_info = 'store::/user/info?uid=' + _cookieJson.uid + '&token=' + _cookieJson.token + '&sessionid=' + _cookieJson.nsessid;
    }

    //this.eventHandle.onOver = function(data){
    //    if(c_url.match(/^\/user\/login\//)){
    //    return;
    //}
    //if(!c_url.match(/^\/welcome\/home\//)){
    //	if (data.id_info && data.id_info.code === 0) {
    //
    //	}
    //	else {
    //		if(c_url.match(/^\/user\/login\//)==null){
    //			//mSelf.redirectTo('/user/login/?back_url='+encodeURIComponent(c_url), false);
    //            mSelf.redirectTo('/user/login/', false);
    //			return false;
    //		}
    //	}
    //}
    //};
};
