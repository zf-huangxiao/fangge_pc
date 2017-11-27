var querystring = require('querystring')
	,urlHandle = require('url')

var map = {
	"welcome/" : "m/welcome/"
}
exports.getUrl = function(mods , request){
	var getParam =	request.__get 
		,refer = request.headers.referer
	var wapHost = 'http://m.side.com'
	var full = mods.join('/')
	if (! mods[2] && full != 'welcome/') return false
	
	refer = refer && urlHandle.parse(refer)	
	var fromTabo = refer && (refer.hostname.indexOf('tmall.com')>-1 || refer.hostname.indexOf('taobao.com') > -1 )
	///console.log(refer , fromTabo)

	var ret = false
		,hadQ = false

	if (full in map) {
		if (!fromTabo && ('welcome/' == full)) full = 'm/welcome/'
		ret = wapHost + map[full] 
	}else{
		var pattern = mods[0] + '/' + mods[1]
		if (pattern in map) {
			hadQ = true
			ret = wapHost + map[pattern].replace('%s',mods[2]) 
		}
	}
	if (ret){
		var getQstr = querystring.stringify(getParam)
		if (getQstr.length) ret += (ret.indexOf('?') > -1? '&' :'?') + getQstr
	}

	return ret 
	
	}
