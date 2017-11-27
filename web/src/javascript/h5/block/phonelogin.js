$(document).ready(function () {

    //初始元素
    var $verification_code = $('#getVerCode'),
        $phone_login_btn   = $('#phone_login_btn'),
        $phone_num         = $("#phone_num"),
        $code_num          = $("#code_num"),
        $user_agreement    = $('#user_agreement'),
        $err_msg_box       = $('#err_msg_box'),
        $verCode_num       = $('#vercode-num'),
        $verCode_pic       = $('#vercode-pic');


    //防刷新：检测是否存在cookie
    // if(base.cache.get_cookie("captcha")){
        // var count = base.cache.get_cookie("captcha");
        // var count = 1;

        // if(count == 1){
        //     $verification_code.val('获取动态码').removeClass('disabled').removeAttr('disabled style');
        // }else{
        //     $verification_code.val(count+'s').attr('disabled',true).css('cursor','not-allowed');
        // }

        // var resend = setInterval(function(){
        //     count--;
        //     if (count > 0){
        //         $verification_code.val(count+'s').attr('disabled',true).css('cursor','not-allowed');
        //         base.cache.set_cookie("captcha", count, (1/86400)*count);
        //     }else {
        //         clearInterval(resend);
        //         $verification_code.val('获取动态码').removeClass('disabled').removeAttr('disabled style');
        //     }
        // }, 1000);
    // }

    //点击改变按钮状态，ajax发送短信验证
    $verification_code.on('click',function(){
        if(/^1[3|4|5|6|7|8|9]\d{9}$/.test($phone_num.val())){

            if($verCode_pic.parent().css('display') == 'none'){
                //让验证码图片出现
                $verCode_pic.parent().show();
                $verCode_pic.click();
                $verCode_num.val('').focus();
                $phone_num.attr('disabled',true).css('cursor','not-allowed');
                $code_num.attr('disabled',true).css('cursor','not-allowed');
            }else{
                if( /^[0-9]{1,2}$/.test($verCode_num.val())){
                    var btn = $(this);
                    $err_msg_box.text('');
                    ajaxFn({
                        url : '/captcha/index_apis/getcode',
                        data : {
                            phone:$phone_num.val(),
                            code :$verCode_num.val(),
                        },
                        success : function(data){
                            if(data.code == '200'){
                                $phone_num.attr('disabled',true).css('cursor','not-allowed');
                                $code_num.attr('disabled',false).css('cursor','text').focus();
                                $verCode_num.attr('disabled',true).css('cursor','not-allowed');
                                $verCode_num.parent().hide();
                                var count = 60;
                                var resend = setInterval(function(){
                                    count--;
                                    if (count > 0){
                                        btn.val(count+"s");
                                        // base.cache.set_cookie("captcha", count, (1/86400)*count);
                                    }else {
                                        clearInterval(resend);
                                        btn.val("获取动态码").removeAttr('disabled style');
                                        $phone_num.attr('disabled',false).css('cursor','text');
                                        $verCode_num.attr('disabled',false).css('cursor','text');
                                    }
                                }, 1000);
                                btn.attr('disabled',true).css('cursor','not-allowed');
                            }else{
                                $err_msg_box.text(data.msg);
                                $verCode_num.val('').focus();
                                $verCode_pic.click();
                            }
                        }
                    })


                }
                else {
                    $err_msg_box.text('请输入/更正验证码！');
                    $verCode_num.focus();
                }
            }

        }else{
            //简单校验
            $err_msg_box.text('请输入/更正手机号码！');
            $phone_num.addClass('warning-border').focus();
            return false;
        }
    });

    $phone_num.on('blur',function(){
        $phone_num.removeClass('warning-border');
    });

    //手机登录
    $phone_login_btn.on('click',function(){
         if(!/^1[3456789]\d{9}$/.test($phone_num.val())){
            $err_msg_box.text('请输入/更正手机号码！');
            $phone_num.focus();

        }else if(!/^\d{4}$/.test($code_num.val())){
             $err_msg_box.text('请输入/更正动态码！');
             $code_num.focus();

        }else if($user_agreement.attr('checked') != 'checked'){
            $err_msg_box.text('请同意用户协议！');

        }else{
            ajaxFn({
                url : '/user/index_apis/phonelogin',
                data : {
                    phone:$phone_num.val(),
                    vcode:$code_num.val()
                },
                success : function(data){
                    data.code == 200 ? getUserMsg(data) : $err_msg_box.html(data.msg);
                }
            })
        }

    });

    $user_agreement.on('click',function(){
        if(!$(this).attr('checked')){
            $(this).attr('checked','checked');
        }else{
            $(this).removeAttr("checked");
        }
    });
    //点击换数字码
    $verCode_pic.on('click',function(){
        $(this).get(0).src = '/captcha?' + new Date().getTime();
    });


    //获取用户信息
    function getUserMsg(msg){
        ajaxFn({
            url : '/user/index_apis/getusermsg',
            data : {
                uid:msg.data.uid,
                token:msg.data.token

            },
            success : function(data){
                setUserCookie(data);
                upDateUserMsg();

            }
        })
    }

    //设置用户信息cookie
    function setUserCookie(data){
        base.cache.set_cookie('user_msg',data,15);
    }

    //跳转回登录之前的页面
    function upDateUserMsg(){
        var urlStr = window.location.href;
        if(/user\/?$/.test(urlStr)){
            //直接输入路径'user/'到登录页面登录成功后，跳转首页
            window.location.href = '/';
        }else if(base.tools.getQueryString('url')){
            //点击的导航中的登录按钮进行登录
            window.location.href = base.tools.getQueryString('url');
        }else{
            //文章评论区域的登录
            window.location.reload();
        }
    }

    //请求
    function ajaxFn(opts){
        $.ajax({
            type: opts.type || "GET",
            url: opts.url,
            data: opts.data,
            dataType: "json",
            success: opts.success
        });
    }
});
