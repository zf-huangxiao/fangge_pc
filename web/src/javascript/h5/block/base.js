var base = {
	manageapi: 'http://h5.veryside.com',
    redirect_host: 'http://www.veryside.com/',
	qqAppId: '101384575',
	wxAppId: 'wx7fbd27a1f8706423',
    wbClientId: '3945175064',
	cache: {
		get_domain:function(){
	        var matches = window.location.host.match(/([^\.]+).(com|net|me|org)/);
	        if(matches!=null){
	            return matches[1];
	        }else{
	            return null;
	        }
	    },
	    set_cookie:function(key,val,expires){
	        var _this=this;
	        var date = new Date();
	        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);          
	        document.cookie = key+'='+encodeURIComponent(val)+'; domain=.'+_this.get_domain()+'.com; path=/; expires='+date.toGMTString();
	    },
	    get_cookie:function(key){
	        var value = document.cookie.match('(?:^|;)\\s*' + key + '=([^;]*)');
	        return (value) ? decodeURIComponent(value[1]) : null;
	    },
	    clear_cookie:function(key){
	    	return this.set_cookie(key, '');
	    }


	},

	tools: {
        getQueryString:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
		rand:function(n){
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = '';
            for(var i = 0; i < n ; i++) {
                var id = Math.ceil(Math.random()*35);
                res += chars[id];
            }
            return res;
		}
	}
};
