//##include('../block/base.js');
//##include('../block/nav.js');
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


function checkUidToken(){
    return (base.cache.get_cookie('uid') != '' && base.cache.get_cookie('token') != '') ? true : false;
}


$(document).ready(function () {

    var wx_code = getQueryString('code');

    if(wx_code && wx_code != null && base.cache.get_cookie('lgtype') == 2 && checkUidToken()){

        $.ajax({
            type: "POST",
            url : '/user/index_apis/wxloginoauth',
            data : {
                code : wx_code,
                sessionid : base.cache.get_cookie('nsessid')

            },
            dataType: "json",
            success : function(data){
                if(data.code == 200){
                    window.location.href = base.cache.get_cookie('initurl');
                }

            }
        })

    }

});