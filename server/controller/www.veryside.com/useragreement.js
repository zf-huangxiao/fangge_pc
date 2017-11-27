function useragreement(){
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
            'seo': 'store::/site/public?type=7',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo=data.seo;
            data.condition = this.req.__get;
            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            data._CSSLinks = ['h5/css/us'];
            data._JSLinks  = ['h5/min/useragreement'];
            data.pageTitle = '最新';
            mSelf.render('us/useragreement.html', data);
        });
    },

    index_apis: function(params){
        // var php = {
        //     'indexloadlist' : 'store::/site/advise'
        //
        // };
        // this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(useragreement , controlFns);
