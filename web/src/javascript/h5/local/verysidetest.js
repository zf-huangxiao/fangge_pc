//##include('../block/base.js');
$(document).ready(function(){

    var oBtn = $('.m-download-ts');

    oBtn.on('click',function(){
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
        //
        //     console.log('is ios');
        //     if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))  {
        //         //Animation://com.yz.animation
        //         var isInstalled;
        //         //var gz = '{"comName":"${com.short_name}","comID":"${com.id}","comPhoneNum":"${com.phone_num}","type":"0"}';
        //         //var jsongz =JSON.parse(gz);
        //
        //         //下面是IOS调用的地址，自己根据情况去修改
        //         var ifrSrc = 'veryside://link?type=10&id=1083';
        //         var ifr = document.createElement('iframe');
        //         ifr.src = ifrSrc;
        //         ifr.style.display = 'none';
        //         ifr.onload = function() {
        //             // alert('Is installed.');
        //             isInstalled = true;
        //             alert(isInstalled);
        //             document.getElementById('openApp1').click();};
        //         ifr.onerror = function() {
        //             // alert('May be not installed.');
        //             isInstalled = false;
        //             alert(isInstalled);
        //         }
        //         document.body.appendChild(ifr);
        //         setTimeout(function() {
        //             document.body.removeChild(ifr);
        //         },1000);
        //     }
        // }

        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        //     var loadDateTime = new Date();
        //     window.setTimeout(function() {
        //             var timeOutDateTime = new Date();
        //             if (timeOutDateTime - loadDateTime < 5000) {
        //                 window.location = "/";
        //             } else {
        //                 window.close();
        //             }
        //     },25);
        //
        //     window.location = "veryside://link?type=10&id=1083";
        //
        // } else if (navigator.userAgent.match(/android/i)) {
        //     var state = null;
        //     try {
        //         state = window.open("veryside://link?type=10&id=1083", '_blank');
        //     } catch(e) {}
        //     if (state) {
        //         window.close();
        //     } else {
        //         window.location = "/";
        //     }
        // }

        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            location.href = 'veryside://link?type=10&id=1083';
            setTimeout(function() {
                location.href = '/verysidetest/';
            }, 250);

            setTimeout(function() {
                location.reload();
            }, 1000);
        }



    })

});
