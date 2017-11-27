function model(){
	return this;
}
var controlFns = {
	index : function(arg){
		var mSelf = this;
		if(/\d+.html/.test(arg)) {
			this.content(arg);
		}

	},
	content: function(arg){

		var id=arg.split('.')[0];
		var tokenkey = this.req.__get.tokenkey;
		if(tokenkey){
			var php = {
				'indexlist' : 'store::news/modelinfo'+'?id='+id+'&tokenkey='+tokenkey,
				'filterlist' : 'store::/topic/index',
			};
		}else{
			var php = {
				'indexlist' : 'store::/news/modelinfo'+'?id='+id,
				'filterlist' : 'store::/topic/index',
			};
		}

		var mSelf = this;
		this.setSDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//seo信息
			data.statistical =  tokenkey;
			data._seo = data.indexlist.seo;

			data.condition = this.req.__get;
			//console.log(data.condition);
			// data.status = 'welcome';
			data._CSSLinks = ['h5/css/model'];
			data._JSLinks  = ['h5/min/model'];
			data.pageTitle = 'model';
			mSelf.render('model/model.html', data);
		});
	},
	index_apis: function(params){
		var php = {
			// 'indexloadlist' : 'store::/site/list'
		};
		this.ajaxTo(php[params]);
	}
};
exports.__create = controller.__create(model, controlFns);
