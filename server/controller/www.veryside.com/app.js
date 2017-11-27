function app(){
    return this;
}
var controlFns = {
    index : function(){
        var mSelf = this;
        this.content();
    },
    content : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/site/public?type=1',
            'filterlist' : 'store::/topic/index'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){


            //seo信息
            // data._seo={
            //
            //     title: "VerySide(方格)APP下载-方格时尚网",
            //     keywords:'',
            //     description: "VerySide (方格) iOS版和安卓版，扫二维码立刻下载。365天随时随地陪伴你，在VerySide APP了解关于时尚的一切吧。有型有趣有惊喜，希望你会爱上这里。"
            // },
            data._seo = data.indexlist;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'welcome';

            data._CSSLinks = ['h5/css/app'];
            data._JSLinks  = ['h5/min/app'];
            data.pageTitle = '下載';
            mSelf.render('app/app.html', data);
        });
    },
    index_apis: function(params){
        // var php = {
        //     'indexloadlist' : 'store::/site/list'
        //
        // };
        // this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(app , controlFns);
