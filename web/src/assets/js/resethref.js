(function(){

    var pathIndex = {
        type1 : '/pedia/encycovercontent/',
        type2 : '/pedia/encycovercontent/',
        type3 : '/pedia/encycovercontent/',
        type4 : '/pedia/encycovercontent/',
        type5 : '/pedia/encycovercontent/',
        type6 : '/pedia/encycovercontent/',
        type7 : '/hot/cluelist/',
        type8 : '/pedia/',
        type9 : '/author/',
        type10 : '/article/',
        type11 : '/photoview/',
        type12 : '/photoviewarticle/',
        type100 : '/pedia/filterbrand/',
        type101 : '/hot/jeancontent/',
        type102 : '/hot/jeanscontent/',
        type103 : '/pedia/filterbrand/',
        type104 : '/pedia/filterbrand/'

    };


    function resethref(me,ev){

        var url = false;
        if (me.prop('tagName').toUpperCase() != 'A' && me.parents('a').length <= 0) {
            return;
        }

        var link = me.prop('tagName').toUpperCase() == 'A' ? me : $(me.parents('a')[0]);
        if(link.attr("href")){
            url = (link.attr("href"));
        }
        if(url && url.indexOf("veryside://link")!=-1){
            var parobj = hrefsplice(url);

            if(parobj.type == '100') {

                url = pathIndex['type' + parobj.type] + 'id_' + parobj.t;//筛选

            }else if(parobj.type == '101') {
                url = pathIndex['type'+parobj.type] + parobj.t + '_' + parobj.id + '_' + parobj.p;//百科综合页图片预览页
            }else if(parobj.type == '102') {
                url = pathIndex['type'+parobj.type];//百科综合页

            }else if(parobj.type == '103') {
                //图片下载按钮,暂不做处理
            }else if(parobj.type == '104') {
                //文章页图片预览页&文章页精品图集预览页的返回按钮,暂不做处理

            }else if (parobj.type == 1 || parobj.type == 2 || parobj.type == 3 || parobj.type == 4 || parobj.type == 5 || parobj.type == 6){
                url = pathIndex['type' + parobj.type] + parobj.type + '_' + parobj.id;//百科封面页
            }else{

                if(parobj.i){

                    //url = pathIndex['type'+parobj.type] + parobj.id + '_1_' + parobj.i;//查看图片href
                    return false;

                }else{

                    url = pathIndex['type'+parobj.type] + 'id_' + parobj.id;//正常href

                }
            }

            if(link.attr("target")=="_self"){
                window.location.href = url;
            }else{
                window.open(url);
            }

            if ( ev && ev.preventDefault ) {
                ev.preventDefault();
            }
            else{
                window.event.returnValue = false;
                return false;
            }
        }
    }

    function hrefsplice(href){
        var hrefparams = href.split('?')[1];
        var paramsArr = hrefparams.split('&');
        var paramsobj = {};

        for(var i = 0; i < paramsArr.length; i++){
            paramsobj[paramsArr[i].split('=')[0]] = paramsArr[i].split('=')[1];
        }

        return paramsobj;
    }

    $(document).on('click', function(e) {
        var me = $(e.target);
        if (me.prop('tagName').toUpperCase() != 'A' && me.parents('a').length <= 0) {
            return;
        }
        resethref(me,e);
    });
}());