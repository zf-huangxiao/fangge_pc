var updatewblogin = {
    init:function(){
        var wx_code = base.tools.getQueryString('code');

        if(wx_code && wx_code != null && base.cache.get_cookie('lgtype') == 3){

            $.ajax({
                type: "POST",
                url : '/user/index_apis/wbloginoauth',
                data : {
                    code : wx_code,
                    sessionid : base.cache.get_cookie('nsessid'),
                    redirect_uri : base.cache.get_cookie('initurl')

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

