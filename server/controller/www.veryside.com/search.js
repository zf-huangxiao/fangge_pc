function search(){
    return this;
}
var controlFns = {
    index : function(){
        var mSelf = this;

        // var checkUrl = /\.html/.dotTest(this.req.url);
        // if(checkUrl){
        //     var choiceUrl = this.req.url.substring(this.req.url.lastIndexOf('/')+1,this.req.url.indexOf('.html'));
        //     this[choiceUrl]();
        // }else{
        //     this.searchindex();
        // }

        this.searchindex();

    },
    searchindex : function(arg){
        var keyword = this.readData('keyword',this.req.__get, 0)||0;
        var exact = this.readData('exact',this.req.__get, 0)||0;
        var p = this.readData('p',this.req.__get, 0)||0;

        var php = {
            'indexlist' : 'store::/search/index',
            'filterlist' : 'store::/topic/index',
            'searchresult' : 'store::/search/result?keyword='+encodeURIComponent(keyword)+'&exact='+exact,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo = this.req.url=='/search/'?data.indexlist.seo:data.searchresult.seo;
            data.isDefault = keyword ? '1' : '0';
            data._searchKeyword = keyword;
            // console.log(keyword,'=======000');
            data.condition = this.req.__get;
            data.status = 'search';
            data._CSSLinks = ['h5/css/search'];
            data._JSLinks  = ['h5/min/search'];
            data.pageTitle = '最新';
            mSelf.render('search/index.html', data);
        });
    },
    searchindex1 : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;

        var php = {
            'indexlist' : 'store::/site/index',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data.seo = {};
            data.seo.title = '关键词综合搜索-方格网';
            data.seo.description = '方格网综合搜索中心为用户提供准确的[关键词]搜索结果,为你了解穿衣搭配提供参考.';
            data.seo.keywords = '关键词';

            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/search'];
            data._JSLinks  = ['h5/min/search'];
            data.pageTitle = '最新';
            mSelf.render('search/testsearch.html', data);
        });
    },
    index_apis: function(params){
        var php = {
            'indexloadlist' : 'store::/site/list',
            'searchkeywords' : 'store::/search/keywords',
            'searchresult' : 'store::/search/result'

        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(search , controlFns);
