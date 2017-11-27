function verysidetest(){
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

        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){


            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'veryside_test';

            data._CSSLinks = ['h5/css/verysidetest'];
            data._JSLinks  = ['h5/min/verysidetest'];
            data.pageTitle = 'verysidetest';
            mSelf.render('dotTest/test1.html', data);
        });
    }
};
exports.__create = controller.__create(verysidetest , controlFns);
