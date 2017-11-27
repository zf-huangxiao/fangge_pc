function baike(){
    return this;
}
var controlFns = {
    index : function(args){

        // console.log('uuuuuuu',args)
        var mSelf = this;
        if(args=='s2.html'){
           this.zuixin();
        }else if(args=='s1.html'){
            this.zuishouxihuan();
        }else{
           this.baikepindao(args);
        }

    },
    baikepindao: function(args){

        // var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            // 'filterlist' : 'store::/topic/index',//弹层
            'indexlist' : 'store::/wiki/index',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo =data.indexlist.seo;

            data.condition = this.req.__get;
            data.status = 'baikepindao';
            data.groupPg = {};

            data._CSSLinks = ['h5/css/baike'];
            data._JSLinks  = ['h5/min/baike'];
            data.pageTitle = '百科频道';
            mSelf.render('xingbaike/baike.html', data);
        });
    },
    brand: function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index' ,
            'indexlist':'store::/wiki/brand' ,

        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            data._CSSLinks = ['h5/css/brand'];
            data._JSLinks  = ['h5/min/brand'];
            data.pageTitle = '所有品牌';
            mSelf.render('xingbaike/brand.html', data);
        });
    },
    jingxuanji:function(arg){
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/topic/index',
        } ;

        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);
            data.status = 'test';

            data._CSSLinks = ['h5/css/alljingxuan'];
            data._JSLinks  = ['h5/min/alljingxuan'];
            data.pageTitle = '所有精选集';
            mSelf.render('xingbaike/alljingxuan.html', data);
        });

    },
    zuixin : function(args){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist' :'store::/wiki/new'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data._CSSLinks = ['h5/css/common'];
            data._JSLinks  = ['h5/min/common'];
            data.pageTitle = '最新';
            mSelf.render('xingbaike/zuixin.html', data);
        });
    },
    zuishouxihuan : function(args){
        //var page = this.readData('page',this.req.__get, 0)||0;
        if(args){

        }
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist' :'store::/wiki/love'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/common'];
            data._JSLinks  = ['h5/min/common'];
            data.pageTitle = '最受喜欢';
            mSelf.render('xingbaike/zuishouxihuan.html', data);
        });
    },
    gainian : function(){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist' :'store::/wiki/list/?type=3'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/common'];
            data._JSLinks  = ['h5/min/common'];
            data.pageTitle = '最受喜欢';
            mSelf.render('xingbaike/common.html', data);
        });
    },
    caizhi : function(){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist' :'store::/wiki/list/?type=4'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/common'];
            data._JSLinks  = ['h5/min/common'];
            data.pageTitle = '最受喜欢';
            mSelf.render('xingbaike/common.html', data);
        });
    },
    yizhuang_custom : function(arg){
        // console.log("aaa====0000",arg);

        if(/[a-z]+_[a-z]+/.test(arg.split('/')[0])){
            var str=arg.split('/')[0].split('_')[1];
            switch (str){
                case 'waitao':

                    var php = {
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=1',
                    } ;
                    break;
                case 'niuzai':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=2',
                    } ;
                    break;
                case 'kuzhuang':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=3',
                    } ;
                    break;
                case 'shangyi':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=4',
                    } ;
                    break;
                case 'qunzhuang':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=5',
                    } ;
                    break;
                case 'xielv':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=6',
                    } ;
                    break;
                case 'baodai':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=7',
                    } ;
                    break;
                case 'peishi':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=8',
                    } ;
                    break;
                case 'neiyi':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=12',
                    } ;
                    break;
                case 'zhengzhuang':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=2&s=9',
                    } ;
                    break;
                default:;

            }


            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';
                data.groupPg = {};
                data.groupPg.total_num = 2000;
                //data.groupPg.page_size = 10;
                //data.groupPg.current_page = page;

                data._CSSLinks = ['h5/css/common'];
                data._JSLinks  = ['h5/min/common'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/common.html', data);
            });

        }else{
            var id=arg.split('/')[0].split('_')[1];
            var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
            var php = {
                // 'indexlist' : 'store::/site/index',
                'filterlist' : 'store::/topic/index',
                'indexlist':'store::/wiki/info?type=2'+'&id='+id+'&p='+p,
            } ;

            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';

                data.groupPg = {};
                data.groupPg.total_num = data.indexlist.total||1;
                data.groupPg.page_size = data.indexlist.pageSize || 20;
                data.groupPg.current_page = p;

                data._CSSLinks = ['h5/css/details'];
                data._JSLinks  = ['h5/min/details'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/details.html', data);
            });
        }
    },
    gainian_custom : function(arg){
        // console.log("aaa====0000",arg);
        var id=arg.split('/')[0].split('_')[1];
        var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/wiki/info?type=3'+'&id='+id+'&p='+p,
        } ;

        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';

            data.groupPg = {};
            data.groupPg.total_num = data.indexlist.total||1;
            data.groupPg.page_size = data.indexlist.pageSize || 20;
            data.groupPg.current_page = p;
            data._CSSLinks = ['h5/css/details'];
            data._JSLinks  = ['h5/min/details'];
            data.pageTitle = '详情页';
            mSelf.render('xingbaike/details.html', data);
        });
    },
    caizhi_custom : function(arg){
        var id=arg.split('/')[0].split('_')[1];
        var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/wiki/info?type=4'+'&id='+id+'&p='+p,
        } ;

        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);
            data.status = 'test';

            data.groupPg = {};
            data.groupPg.total_num = data.indexlist.total||1;
            data.groupPg.page_size = data.indexlist.pageSize || 20;
            data.groupPg.current_page = p;

            data._CSSLinks = ['h5/css/details'];
            data._JSLinks  = ['h5/min/details'];
            data.pageTitle = '详情页';
            mSelf.render('xingbaike/details.html', data);
        });

    },
    xingren_custom : function(arg){
        if(/[a-z]+_[a-z]+/.test(arg.split('/')[0])){
            var str=arg.split('/')[0].split('_')[1];
            switch (str){
                case 'oumei':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=5&s=1',
                    } ;
                    break;
                case 'yazhou':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=5&s=2',
                    } ;
                    break;
                case 'mingxingmingliu':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=5&s=3',
                    } ;
                    break;
                case 'jiepaihongren':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=5&s=4',
                    } ;
                    break;
                case 'mote':
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=5&s=5',
                    } ;
                    break;
                default: ;

            }


            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';
                data.groupPg = {};
                data.groupPg.total_num = 2000;
                //data.groupPg.page_size = 10;
                //data.groupPg.current_page = page;

                data._CSSLinks = ['h5/css/common'];
                data._JSLinks  = ['h5/min/common'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/common.html', data);
            });

        }else{
            var id=arg.split('/')[0].split('_')[1];
            var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
            var php = {
                // 'indexlist' : 'store::/site/index',
                'filterlist' : 'store::/topic/index',
                'indexlist':'store::/wiki/info?type=5'+'&id='+id+'&p='+p,
            } ;

            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';

                data.groupPg = {};
                data.groupPg.total_num = data.indexlist.total||1;
                data.groupPg.page_size = data.indexlist.pageSize || 20;
                data.groupPg.current_page = p;

                data._CSSLinks = ['h5/css/details'];
                data._JSLinks  = ['h5/min/details'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/details.html', data);
            });
        }
    },
    brand_custom : function(arg){
        var id=arg.split('/')[0].split('_')[1];
        var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/wiki/info?type=1'+'&id='+id+'&p='+p,
        } ;

        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = data.indexlist.total||1;
            data.groupPg.page_size = data.indexlist.pageSize || 20;
            data.groupPg.current_page = p;


            data._CSSLinks = ['h5/css/details'];
            data._JSLinks  = ['h5/min/details'];
            data.pageTitle = '详情页';
            mSelf.render('xingbaike/details.html', data);
        });

    },
    gouwudi_custom : function(arg){
        if(/[a-z]+_[a-z]+/.test(arg.split('/')[0])){
            var str=arg.split('/')[0].split('_')[1];
            switch (str) {
                case 'wangzhan' :
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=6&s=1',
                    } ;
                    break;
                case 'shishangdian' :
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=6&s=2',
                    } ;
                    break;
                case 'jiequ' :
                    var php = {
                        // 'indexlist' : 'store::/site/index',
                        'filterlist' : 'store::/topic/index',
                        'indexlist':'store::/wiki/list?type=6&s=3',
                    } ;
                    break;
                default :

            }
            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';
                data.groupPg = {};
                data.groupPg.total_num = data.indexlist.total||1;
                data.groupPg.page_size = data.indexlist.pageSize || 20;
                data.groupPg.current_page = p;

                data._CSSLinks = ['h5/css/common'];
                data._JSLinks  = ['h5/min/common'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/common.html', data);
            });

        }else{
            var id=arg.split('/')[0].split('_')[1];
            var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;
            var php = {
                // 'indexlist' : 'store::/site/index',
                'filterlist' : 'store::/topic/index',
                'indexlist':'store::/wiki/info?type=6'+'&id='+id+'&p='+p,
            } ;

            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'test';

                data.groupPg = {};
                data.groupPg.total_num = data.indexlist.total||1;
                data.groupPg.page_size = data.indexlist.pageSize || 20;
                data.groupPg.current_page = p;


                data._CSSLinks = ['h5/css/details'];
                data._JSLinks  = ['h5/min/details'];
                data.pageTitle = '详情页';
                mSelf.render('xingbaike/details.html', data);
            });
        }
    },
    jingxuanji_custom : function(arg){
        var id=arg.split('/')[0].split('_')[1];
        var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;

        var php = {
            // 'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/topic/info?id='+id+'&p='+p,
        } ;

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

            data._CSSLinks = ['h5/css/jingxuan'];
            data._JSLinks  = ['h5/min/jingxuan'];
            data.pageTitle = '详情页';
            mSelf.render('xingbaike/jingxuan.html', data);
        });

    },
    zuozhe_custom : function(arg){
        var id=arg.split('/')[0].split('_')[1];
        var p = arg.split('/')[1].split('.')[0].replace('p', '')||1;

        var php = {
            'filterlist' : 'store::/topic/index',
            'indexlist':'store::/site/author?id='+id+'&p='+p,
        } ;
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

            data._CSSLinks = ['h5/css/author'];
            data._JSLinks  = ['h5/min/author'];
            data.pageTitle = '作者页';
            mSelf.render('xingbaike/author.html', data);

        });

    },


};
exports.__create = controller.__create(baike , controlFns);


