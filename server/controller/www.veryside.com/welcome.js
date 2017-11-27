function welcome(){
	return this;
}
var controlFns = {
	index : function(){
		var mSelf = this;
		this.home();
	},
	home : function(arg){
		//var page = this.readData('page',this.req.__get, 0)||0;
		var php = {
			'indexlist' : 'store::/site/index',
			// 'filterlist' : 'store::/topic/index'
		};
		var mSelf = this;
		this.setSDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){


			//seo信息
			data._seo = data.indexlist.seo;

			data.condition = this.req.__get;
			//console.log(data.condition);

			data.status = 'welcome';

			data._CSSLinks = ['h5/css/welcome'];
			data._JSLinks  = ['h5/min/welcome'];
			data.pageTitle = '最新';
			mSelf.render('welcome/index.html', data);
		});
	},
	index_apis: function(params){
		var php = {
			'indexloadlist' : 'store::/site/ajax',
			'searchkeywords' : 'store::/search/keywords',

		};
		this.ajaxTo(php[params]);
	}
};
exports.__create = controller.__create(welcome , controlFns);
