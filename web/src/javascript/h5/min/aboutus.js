function init(){_view.init(),_event.bind()}var base={manageapi:"http://h5.veryside.com",redirect_host:"http://www.veryside.com/",qqAppId:"101384575",wxAppId:"wx7fbd27a1f8706423",wbClientId:"3945175064",cache:{get_domain:function(){var e=window.location.host.match(/([^\.]+).(com|net|me|org)/);return null!=e?e[1]:null},set_cookie:function(e,n,o){var t=this,i=new Date;i.setTime(i.getTime()+2592e6),document.cookie=e+"="+encodeURIComponent(n)+"; domain=."+t.get_domain()+".com; path=/; expires="+i.toGMTString()},get_cookie:function(e){var n=document.cookie.match("(?:^|;)\\s*"+e+"=([^;]*)");return n?decodeURIComponent(n[1]):null},clear_cookie:function(e){return this.set_cookie(e,"")}},tools:{getQueryString:function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(n);return null!=o?unescape(o[2]):null},rand:function(e){for(var n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],o="",t=0;t<e;t++){var i=Math.ceil(35*Math.random());o+=n[i]}return o}}},updatewxlogin={init:function(){var e=base.tools.getQueryString("code");e&&null!=e&&2==base.cache.get_cookie("lgtype")&&$.ajax({type:"POST",url:"/user/index_apis/wxloginoauth",data:{code:e,sessionid:base.cache.get_cookie("nsessid")},dataType:"json",success:function(e){200==e.code&&(window.location.href=base.cache.get_cookie("initurl"))}})},checkUidToken:function(){return""!=base.cache.get_cookie("uid")&&""!=base.cache.get_cookie("token")}},updatewblogin={init:function(){var e=base.tools.getQueryString("code");e&&null!=e&&3==base.cache.get_cookie("lgtype")&&$.ajax({type:"POST",url:"/user/index_apis/wbloginoauth",data:{code:e,sessionid:base.cache.get_cookie("nsessid"),redirect_uri:base.cache.get_cookie("initurl")},dataType:"json",success:function(e){200==e.code&&(window.location.href=base.cache.get_cookie("initurl"))}})},checkUidToken:function(){return""!=base.cache.get_cookie("uid")&&""!=base.cache.get_cookie("token")}},$doc,$win,$tips,$contents,$button,_view={init:function(){}},_event={bind:function(){$(".close").on("click",function(){window.opener=null,window.open("","_self"),window.close()})}},_data={};$(document).ready(function(){$doc=$(document),$win=$(window),$tips=$(".title").find("li"),$contents=$(".content").find("li"),$button=$("button"),init(),updatewxlogin.init(),updatewblogin.init()});