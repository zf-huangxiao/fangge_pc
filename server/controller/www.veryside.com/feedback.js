function us(){
    return this;
}
var controlFns = {
    index : function(args){
        var mSelf = this;
        this.aboutus();
    },
    aboutus : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/site/index',
            'friendlinks' : 'store::/site/link',
            'seo':'store::/site/public?type=5',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            // data.seo = {};
            // data.seo.title = '解析风格造型,推荐时尚搭配物件,品味格调生活的平台-方格网';
            // data.seo.description = '方格网为网友甄选真正有品质和设计感的时髦好物推荐，提供独一无二的时尚型格知识体系“型百科”，为追求品质生活但更注重内外兼修的你提供原创干货,呈现解析全球高品位风格造型，为网友提供实用搭配参考.';
            // data.seo.keywords = '风格服饰,时尚女装,时尚潮流';
            data._seo=data.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/us'];
            data._JSLinks  = ['h5/min/feedback'];
            data.pageTitle = '最新';
            mSelf.render('us/feedback.html', data);
        });
    },

    index_apis: function(params){
        var php = {
            'indexloadlist' : 'store::/site/advise'
        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(us , controlFns);
