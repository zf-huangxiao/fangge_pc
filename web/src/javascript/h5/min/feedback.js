function init(){_view.init(),_event.bind()}var base={manageapi:"http://h5.veryside.com",redirect_host:"http://www.veryside.com/",qqAppId:"101384575",wxAppId:"wx7fbd27a1f8706423",wbClientId:"3945175064",cache:{get_domain:function(){var e=window.location.host.match(/([^\.]+).(com|net|me|org)/);return null!=e?e[1]:null},set_cookie:function(e,t,o){var n=this,i=new Date;i.setTime(i.getTime()+2592e6),document.cookie=e+"="+encodeURIComponent(t)+"; domain=."+n.get_domain()+".com; path=/; expires="+i.toGMTString()},get_cookie:function(e){var t=document.cookie.match("(?:^|;)\\s*"+e+"=([^;]*)");return t?decodeURIComponent(t[1]):null},clear_cookie:function(e){return this.set_cookie(e,"")}},tools:{getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(t);return null!=o?unescape(o[2]):null},rand:function(e){for(var t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],o="",n=0;n<e;n++){var i=Math.ceil(35*Math.random());o+=t[i]}return o}}},updatewxlogin={init:function(){var e=base.tools.getQueryString("code");e&&null!=e&&2==base.cache.get_cookie("lgtype")&&$.ajax({type:"POST",url:"/user/index_apis/wxloginoauth",data:{code:e,sessionid:base.cache.get_cookie("nsessid")},dataType:"json",success:function(e){200==e.code&&(window.location.href=base.cache.get_cookie("initurl"))}})},checkUidToken:function(){return""!=base.cache.get_cookie("uid")&&""!=base.cache.get_cookie("token")}},updatewblogin={init:function(){var e=base.tools.getQueryString("code");e&&null!=e&&3==base.cache.get_cookie("lgtype")&&$.ajax({type:"POST",url:"/user/index_apis/wbloginoauth",data:{code:e,sessionid:base.cache.get_cookie("nsessid"),redirect_uri:base.cache.get_cookie("initurl")},dataType:"json",success:function(e){200==e.code&&(window.location.href=base.cache.get_cookie("initurl"))}})},checkUidToken:function(){return""!=base.cache.get_cookie("uid")&&""!=base.cache.get_cookie("token")}},$doc,$win,$tips,$contents,$suggestion,$contactWay,$button,_view={init:function(){}},_event={bind:function(){$button.on("click",this.clickButton),$(".close").on("click",function(){window.opener=null,window.open("","_self"),window.close()})},clickButton:function(){var e=$suggestion.val(),t=$contactWay.val(),o="0",n=/^1[34578]\d{9}$/,i=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;""==e||/^ +$/.test(e)||/^\n+$/.test(e)?(alert("请输入您的建议！"),$(this).css("box-shadow",""),$suggestion.focus().val("")):n.test(t)||i.test(t)?($.ajax({type:"post",url:"/feedback/index_apis/indexloadlist",data:{message:e,uid:o,contact:t},async:!1,dataType:"",success:function(e){"200"==e&&alert("感谢您的建议!")},error:function(){console.log("Ajax error!")}}),$(this).css("box-shadow","1px 1px 1px #989898"),$suggestion.val(""),$contactWay.val("")):(alert("请输入正确的手机号或邮箱！"),$(this).css("box-shadow",""),$contactWay.focus())}},_data={};$(document).ready(function(){$doc=$(document),$win=$(window),$tips=$(".title").find("li"),$contents=$(".content").find("li"),$button=$("button"),$suggestion=$(".form").find("textarea"),$contactWay=$(".form").find(".contact"),init(),updatewxlogin.init(),updatewblogin.init()});