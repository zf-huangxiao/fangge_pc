var pageSize = 2;
var pendingRequests={},timer;

var $loadMoreWrapper = $('.load-more-wrapper'),
    $loadMoreMsg = $('.load-more-msg'),
    $dataLoading = $('.data-loading'),
    $noData = $('.no-data');

var ajaxloadmore = {
    init : function(opt){
        this.ajaxConfig();
        this.ajaxGetData(opt);
    },

    ajaxConfig:function(){
        $.ajaxSettings.beforeSend = function(xhr,options){
            //debugger;
            //当ajax快速提交时，如 url /platform/investor/info?CUSTOMER_ID=9A28E64C004655D9&investorId=32&_=1448593991155
            // 最后一位 是 ajax自动加的时间戳。
            // 需要 正则表达式 判断时间戳 然后 去掉&_=时间戳 这样的形式。
            var key = options.url,
                complete = options.complete,//暂存options的complete方法指针
                flag = options.abortOnRetry !== undefined ? !!options.abortOnRetry : true;
            //abortOnretry 属性 判定是否需要拦截重复ajax。
            if(/.+&_=[\d]{13}$/.test(key)){
                key = key.split('&_=')[0];
            }
            if( !flag ){
                //console.log('放行');
                return true;
            }
            else {
                if( pendingRequests[key] !== undefined) {
                    //console.log('阻断');
                    return false;
                    //xhr.abort();
                }
                else{
                    pendingRequests[key] = xhr;
                    // 放弃后触发的重复提交
                    //pendingRequests[key].abort(); // 放弃先触发的提交
                }
                timer = setTimeout(function(){
                    timer = null;
                    //console.dir(pendingRequests);
                    pendingRequests = {};
                },5000);
                //这个计时器，用来清空序列，5s后可以发送请求。
                options.complete = function(xhr, Status) {
                    //complete方法的默认形参
                    //重写complete方法

                    //console.log('complete');
                    pendingRequests[key] = null;
                    if ($.isFunction(complete)) {
                        complete.apply(this, arguments);//在options下执行。
                    }
                };
                //console.log('放行');
                return true;
            }

        }
    },

    ajaxGetData : function(opt){
        var _this = this;

        var _opt = {
            el : null,
            loadNum : 6,
            type : 'GET',
            url : null,
            data :{},
            async : true,
            abortOnRetry : true,
            dataType:'json',
            yCallback : function(){},
            nCallback : function(){}
        };

        var opt = opt || {};

        _this.extend(_opt, opt);

        $.ajax({
            type: _opt.type,
            url: _opt.url,
            data: _opt.data,
            async : _opt.async,
            dataType: _opt.dataType,

            success: function(data){

                var len = data.list.length;

                if(len > 0){

                    _this.loadlingActive();

                    setTimeout(function(){
                        var temID = _opt.el.attr('temId');
                        var tmpl = $("#"+temID).html();
                        var doTtmpl = doT.template(tmpl);

                        _opt.el.append(doTtmpl(data));
                        len < _opt.loadNum ? _this.noDataActive() : _this.initLoadActive();

                        pageSize++;
                        //_this.lazyimg();
                        //_this.initReadedStyle($newlist.find('.item'));
                        _opt.yCallback && _opt.yCallback(data);
                    },300);


                }else{
                    _this.noDataActive();
                    _opt.nCallback && _opt.nCallback(data);
                }
            },

            error: function(){
                console.log('Ajax error!');
            }
        });
    },

    initLoadActive : function(){
        $loadMoreWrapper.find('.msg').removeClass('active');
        $loadMoreMsg.addClass('active');
    },

    loadlingActive : function(){
        $loadMoreWrapper.find('.msg').removeClass('active');
        $dataLoading.addClass('active');
    },

    noDataActive : function(){
        $loadMoreWrapper.find('.msg').removeClass('active');
        $noData.addClass('active');
    },
    extend: function(o1, o2, preventOverwrite) {
        for (var prop in o2) {
            if (o2.hasOwnProperty(prop)) {
                if(preventOverwrite && o1.hasOwnProperty(prop)) {
                    continue;
                }
                o1[prop] = o2[prop];
            }
        }
    }
};

