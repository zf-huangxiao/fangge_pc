//##include('../block/base.js');
//##include('../block/nav.js');
//##include('../block/doT.js');
//##include('../block/jquery-ui.js');
//##include('../block/updatewxlogin.js');
//##include('../block/avatar.js');
var $doc,
    $win,
    $login_out,
    $nickName,
    $sex,
    $city,
    $saveUserInfo,
    $uploadAvaFile,
    $userAvatar,
    $birthday;

var _view = {
    init: function() {
        this.initDatepicker();
    },
    initDatepicker:function () {
        var defaultDate = new Date($birthday.val());
        $birthday.datepicker({
            altField: "#birthday",
            altFormat: "yy/m/d",
            changeYear:'true',
            changeMonth:'true',
            constrainInput:'false',
            defaultDate:defaultDate,
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
            monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
            monthNamesShort:  ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
            weekHeader: '周',
            yearSuffix: '年',
            maxDate:'+20y',
            minDate:'-60y',
            yearRange:'1970:2050',
            showAnim:'slideDown',
        });
    },
};

var _event = {
    bind : function() {
        $login_out.on('click',this.logout);
        $saveUserInfo.on('click',this.saveUserInfo);
        $uploadAvaFile.prev().on('click',this.clickChangeAvat);
        $uploadAvaFile.on('change',this.upLoadAvatar);
        $nickName.on('blur',this.hasContent);
    },
    logout : function(){
        base.cache.clear_cookie('token');
        base.cache.clear_cookie('uid');
        base.cache.clear_cookie('nsessid');

        window.location.href = base.tools.getQueryString('url');
    },

    saveUserInfo : function(){
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        if(uid && token){
            var name = $nickName.val();
            if(!name || /^ +$/.test(name)) return false;
            $.ajax({
                type: "POST",
                url : '/user/index_apis/userUpdate',
                data : {
                    nickname:$nickName.val(),
                    area:$city.val(),
                    sex:$sex.val(),
                    birthday:$birthday.val()

                },
                dataType: "json",
                success : function(data){

                    if(data.code == 200){
                        var returnUrlStr = window.location.search.replace('?url=','');
                        window.location.href = unescape(returnUrlStr);
                    }else{
                        alert(data.msg);
                    }
                }
            })
        }else{
            window.location.href='/';
        }


    },
    upLoadAvatar : function() {
        var formData = new FormData(),
            oFile = $uploadAvaFile[0].files[0],
            imgSize = oFile.size;

        // if(imgSize < 256 * 1024){
        //     formData.append($uploadAvaFile, oFile);
        //     console.log('formData===',formData);
        //uploadPic(formData, picNum);
        //} else {    // 图片压缩处理
        var reader = new FileReader(),
            maxWidth = 500,
            maxHeight = 500,
            suffix = oFile.name.substring(oFile.name.lastIndexOf('.') + 1);

        if (imgSize > 2 * 1024 * 1024) {
            maxWidth = 500;
            maxHeight = 500;
        }

        reader.onload = function (e) {
            var base64Img = e.target.result;
            //resize。
            var _ir = ImageResizer({
                resizeMode: "auto",
                dataSource: base64Img,
                dataSourceType: "base64",
                maxWidth: maxWidth, //允许的最大宽度
                maxHeight: maxHeight, //允许的最大高度。
                onTmpImgGenerate: function (img) {
                },
                success: function (resizeImgBase64, canvas) {
                    //var blob = dataURLtoBlob(resizeImgBase64);
                    // formData.append($uploadAvaFile, blob, oFile['name']);
                    uploadPic(resizeImgBase64);
                }
            });
        };
        reader.readAsDataURL(oFile);
        //}
    },
    hasContent   : function () {
        var name = $(this).val();
        if(!name || /^ +$/.test(name)){
            $(this).siblings('.warning').text('请填写用户名!');
            $(this).focus();
        }else{
            $(this).siblings('.warning').text('');
        }
    },
    clickChangeAvat    :function () {
        var uid = base.cache.get_cookie('uid');
        var token = base.cache.get_cookie('token');
        if(!uid || !token){
            window.location.href='/';
            return false;
        }
        $uploadAvaFile.click();
    }

};

var _data = {};

function init() {
    _view.init();
    _event.bind();
}

function uploadPic(data) {
    $.ajax({
        type: "POST",
        url : '/user/index_apis/userAvatar',
        data : {
            avatar:data
        },
        dataType: "json",
        success : function(data){

            if(data.code == 200){
                $userAvatar.attr('src', data.data.avatar + '?t='+ Math.random());
            }else{
                alert(data.msg);
            }
        }
    })
}

$(document).ready(function(){
    $doc = $(document);
    $win = $(window);
    $birthday = $('#birthday');
    $login_out = $('#login_out');
    $nickName = $('#nickname');
    $sex = $('#gender');
    $city = $('#city');
    $saveUserInfo = $('#keep');
    $uploadAvaFile = $('#upload_ava_file');
    $userAvatar = $('#user_avatar');
    init();
    updatewxlogin.init();
});
