var session_cookie_name = 'nsessid';
var handler;
switch (config.session.mode) {
    case 'memory':
        handler = require (config.path.base + '/sessStrorge/memory.js');
        break;
    case 'memcache':
        handler = require (config.path.base + '/sessStrorge/memcache.js');
        handler.init(config.session.path);
        break;
}

/*generate sessionid*/
function genSessID(n) {

    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-'];
    var ret = '';
    for(var i = 0; i < n ; i++) {
        var id = Math.ceil(Math.random()*62);
        ret += chars[id];
    }
    return ret;

}
/*
 create new session object
 note  should use callback param while not in memory mode ,it's async
 */
function session(id ,callBack){
    this.sid = id ;
    if (callBack) {
        var mSelf = this;
        this.data = {};
        handler.get(id , function(err ,result){
            if (!err )  mSelf.data =  result;
            callBack && callBack(mSelf);
        }) ;
    } else{
        this.data = handler.get(id);
    }
}

session.prototype = {
    get : function(key) {
        return this.data[key];
        //this.writeBack();
    },
    getAll : function() {
        return this.data;
    },
    set : function(key,value) {
        this.data[key] = value;
        this.writeBack();
    },
    reset : function ( s){
        this.data = s;
        this.writeBack();
    },
    remove : function(key){
        delete this.data[key];
        this.writeBack();
    },
    clear : function (){
        handler.remove (this.sid);
    },
    writeBack : function(){
        handler.set (this.sid , this.data);
    }
}
exports.getHandler = function(req , res){
    function start(callBack) {
        if (! req.__cookies) {
            //read cookie
            var cookies = {};
            req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
            });
            req.__cookies = cookies;
        } else {
            cookies = req.__cookies;
        }

        var sessid = cookies[session_cookie_name];

        if (!sessid) {
            sessid = genSessID(24);
            //write cookie;

            //有问题
            //res.setHeader('set-cookie' ,session_cookie_name + '=' + sessid + ';Path=/;domain=.'+ req.headers.referer.match(/[\w-]+\.(com|net|org|gov|cc|biz|info|cn|co)\b(\.(cn|hk|uk|jp|tw))*/)[0] +';');
            res.setHeader('set-cookie' ,session_cookie_name + '=' + sessid + ';Path=/;domain=.veryside.com;');

        }



        return new session( sessid , callBack);
    }
    return {start : start};
}
