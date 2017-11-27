function shizhuang(){
    return this;
}
var controlFns = {
    index : function(args){
        var mSelf = this;

        if(args && !isNaN(parseInt(args.split('.')[0]))){

            this.articlecontent(args);

        }else if(args.indexOf('picture_') != -1){

            this.photoview(args);

        }else if(args.indexOf('good_') != -1){

            this.photoviewgoods(args);

        }else{

            this.content();
        }

    },
    content : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/news/channel?id=1',
            // 'filterlist' : 'store::/topic/index'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){


            //seo信息
            data._seo = data.indexlist.seo;

            data.condition = this.req.__get;

            data.status = 'shizhuang';

            data._CSSLinks = ['h5/css/shizhuang'];
            data._JSLinks  = ['h5/min/shizhuang'];
            data.pageTitle = '时装';
            mSelf.render('shizhuang/index.html', data);
        });
    },
    articlecontent:function(args){

        var php = {
            'filterlist' : 'store::/topic/index',
            'indexlist' : 'store::/news/info?id='+args.split('.')[0]
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;

            data.condition = this.req.__get;

            data.status = 'test';

            data._CSSLinks = ['h5/css/article'];
            data._JSLinks  = ['h5/min/article'];
            data.pageTitle = '时装内容';
            mSelf.render('article/article.html', data);
        });
    },

    photoview:function(args){
        var id=args.split('_')[1].split('.')[0];
        var i= this.readData('i',this.req.__get, 0) || 0;
        var php = {
            'photolist' : 'store::/news/tu?id='+id+'&i='+i,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.photolist.seo;
            data._news = data.photolist.news;

            data.condition = this.req.__get;

            data.status = 'photoview';

            data._CSSLinks = ['h5/css/photoview'];
            data._JSLinks  = ['h5/min/photoview'];
            data.pageTitle = '图片预览';
            mSelf.render('photoview/picture.html', data);
        });
    },

    photoviewgoods:function(args){
        var id=args.split('_')[1].split('.')[0];
        var i= this.readData('i',this.req.__get, 0) || 0;
        var php = {
            'photolist' : 'store::/news/good?id='+id+'&i='+i,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.photolist.seo;
            data._news = data.photolist.news;

            data.condition = this.req.__get;

            data.status = 'photoviewgoods';

            data._CSSLinks = ['h5/css/photoview'];
            data._JSLinks  = ['h5/min/photoview'];
            data.pageTitle = '图片预览';
            mSelf.render('photoview/good.html', data);
        });
    },
    jiepai:function(args){
        var p;
        if(!args){
            p = 1;
        }else if(/p(\d+).html/.test(args)){
            p = args.split('.html')[0].replace('p','');
        }
        var php = {
            // 'filterlist' : 'store::/topic/index',
            'indexlist' : 'store::/news/column?type=1'+'&p='+p,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo = data.indexlist.seo;

            data.condition = this.req.__get;

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = data.indexlist.total||1;
            data.groupPg.page_size = data.indexlist.pageSize || 20;
            data.groupPg.current_page = p;
            data._CSSLinks = ['h5/css/jiepaizonghe'];
            data._JSLinks  = ['h5/min/jiepaizonghe'];
            data.pageTitle = '街拍综合页';
            mSelf.render('shizhuang/jiepai.html', data);
        });
    },
    shizhuangzhou:function(args){
        var p;
        if(!args){
            p = 1;
        }else if(/p(\d+).html/.test(args)){
            p = args.split('.html')[0].replace('p','');
        }
        var php = {
            // 'filterlist' : 'store::/topic/index',
            'indexlist' : 'store::/news/column?type=2'+'&p='+p,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo = data.indexlist.seo;

            data.condition = this.req.__get;

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = data.indexlist.total||1;
            data.groupPg.page_size = data.indexlist.pageSize || 20;
            data.groupPg.current_page = p;
            data._CSSLinks = ['h5/css/jiepaizonghe'];
            data._JSLinks  = ['h5/min/jiepaizonghe'];
            data.pageTitle = '时装周综合页';
            mSelf.render('shizhuang/jiepai.html', data);
        });
    },

    index_apis: function(params){
        var php = {
            'indexloadlist' : 'store::/news/ajax',
            'itemlist_article' : 'store::/news/tu',
            'itemlist_good' : 'store::/news/good'

        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(shizhuang , controlFns);
