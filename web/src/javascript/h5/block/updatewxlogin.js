var updatewxlogin = {
    init:function(){
        var wx_code = base.tools.getQueryString('code');

        if(wx_code && wx_code != null && base.cache.get_cookie('lgtype') == 2){

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
                    }else{
                        // console.log('errdata',data)
                    }

                }
            })

        }
    },
    checkUidToken:function(){
        return (base.cache.get_cookie('uid') != '' && base.cache.get_cookie('token') != '') ? true : false;
    }
}

