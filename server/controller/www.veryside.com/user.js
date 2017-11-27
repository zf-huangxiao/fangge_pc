function user(){
    return this;
}
var controlFns = {
    index : function(args){
        var mSelf = this;
        if(args == 'info'){
            this.userinfo();
        }else{

            this.usercontent();
        }
    },
    usercontent : function(args){
        //var page = this.readData('page',this.req.__get, 0)||0;
        if(args == 'wxguide'){
            this.wxguide();
        }else{
            var php = {
                'indexlist' : 'store::/site/index',
            };
            var mSelf = this;
            this.setSDefault(php);
            this.bridgeMuch(php);
            this.listenOver(function(data){

                if(data.user_info && data.user_info.nickname != undefined){
                    mSelf.redirectTo('/', false);
                }else{

                    //seo信息
                    data._seo = data.indexlist.seo;
                    data.condition = this.req.__get;
                    //console.log(data.condition);

                    data.status = 'login';

                    data._CSSLinks = ['h5/css/login'];
                    data._JSLinks  = ['h5/min/user'];
                    data.pageTitle = '登录';
                    mSelf.render('user/login.html', data);
                }
            });
        }
    },

    userinfo : function(){
        var php = {
            'indexlist' : 'store::/site/index',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            if(data.user_info && data.user_info.nickname){

                //seo信息
                data._seo = data.indexlist.seo;
                data.condition = this.req.__get;
                //console.log(data.condition);

                data.status = 'info';

                data._CSSLinks = ['h5/css/userinfo'];
                data._JSLinks  = ['h5/min/userinfo'];
                data.pageTitle = '个人资料';
                mSelf.render('user/info.html', data);
            }else{
                mSelf.redirectTo('/', false);
            }

        });
    },

    wxguide : function(){
        var php = {
            'indexlist' : 'store::/site/index',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){



            //seo信息
            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'wxguide';

            data._CSSLinks = ['h5/css/wxguide'];
            data._JSLinks  = ['h5/min/wxguide'];
            data.pageTitle = '微信引导';
            mSelf.render('user/wxguide.html', data);
        });
    },

    thirdtransfer :function () {
        var php = {
            'indexlist' : 'store::/site/index',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo = data.indexlist.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'login';

            data._CSSLinks = ['h5/css/thirdtransfer'];
            data._JSLinks  = ['h5/min/user'];
            data.pageTitle = '登录';
            mSelf.render('user/thirdtransfer.html', data);

        });

    },

    index_apis: function(params){

        var php = {
            'getcode' : 'store::/login/code',
            'phonelogin' : 'store::/login/login?sessionid=' + this.__session.start().sid,
            'getusermsg' : 'store::/user/info?sessionid=' + this.__session.start().sid,
            'qqloginoauth' : 'store::/login/oauth?sessionid=' + this.__session.start().sid,
            'wxloginoauth' : 'store::/login/weixin',
            'wbloginoauth' : 'store::/login/weibo',
            'userUpdate' : 'store::/user/update?sessionid=' + this.__session.start().sid,
            'userAvatar' : 'store::/user/avatar?sessionid=' + this.__session.start().sid,
        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(user , controlFns);
