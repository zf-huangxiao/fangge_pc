var mem = require(config.path.base + '/sessStrorge/memcache.js');
mem.init('127.0.0.1:6060');
function tm(){
	this.t = 1;
	return this;	
}
var testFns = {
	getIncrease1 : function(evt,sessid){
		var id = 't1' + sessid;
		mem.get(id ,function(err  , d){
			d = (parseInt(d)||0) +1;
			mem.set(id,d);
			setTimeout(function(){
			return evt(d);
			} ,1);
			});
	},	
	getIncrease : function(evt,sessid){
		var id = 't' + sessid;
		mem.get(id ,function(err  , d){
			d = (parseInt(d)||0) +1;
			mem.set(id,d);
			setTimeout(function(){
			return evt(d);
			} ,1);
			});
		
		},
	getListData : function(evt ,times){
		var line =  ['sdsf' , 'sdds' ,'d222'];
		var data = [];
		while (times--){
			data.push(line);
		}
		return evt(data);
	} ,
	getListData1 : function(evt){
		return evt(['中文' , '小写' ,'大写']);
	}

}

exports.__create = mModel.__create(tm , testFns);


