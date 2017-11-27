function captcha(){
    return this;
}
var svgCaptcha = require('svg-captcha');
var code = '';
var controlFns = {
    index : function(){
        var captcha = svgCaptcha.createMathExpr({
            color: true,
            noise: 1
        });
        code = captcha.text;
        this.res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        this.res.end(captcha.data);
    },
    index_apis: function(params){
        var php = {
            'getcode' : 'store::/login/code?sidecodeverythe='+code,
        };
        this.ajaxTo(php[params]);
        code = '';
    }
};
exports.__create = controller.__create(captcha , controlFns);