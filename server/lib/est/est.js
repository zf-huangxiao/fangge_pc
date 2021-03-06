var fs = require('fs') 
	,path = require('path')
var md5 = require('crypto');
var _cacheArr = {};
var _watched = {};
var compiledFolder = '',
  watchingTpl = true;
var htmlend = '\\n',
  fuss = false;
var dataName = '_data',
  dataReg = new RegExp('\\b' + dataName + '\.', 'g');
var isWindows = process.platform === 'win32';


var extFnPath = __dirname.replace(/\\/g, '/') + '/extFn.js';
//console.log(__dirname, extFnPath);
var plug_sjt = require(__dirname + '/plugin/sjt.js');
var cache_sjt = {}

function watchTpl(tplname , compiledFile) {
  //var dir = path.dirname(tplname);
  //if (_watched[dir] ) {return;}
  if(_watched[tplname]) {
    return;
  }

  if(isWindows) fs.watch(tplname, {
    persistent: true,
    interval: 10
  }, onChg);
  else fs.watchFile(tplname, {
    persistent: true,
    interval: 10
  }, onChg);

  function onChg(event, filename) {
    //var tplname = dir + '/' + filename;
	compiledFile = path.resolve(compiledFile)
	delete require.cache[compiledFile]
    _cacheArr[tplname] && delete _cacheArr[tplname];

  }

  _watched[tplname] = true;
  //_watched[dir] = true;
}

function getCompiledName(tplname, tplPre) {
  return compiledFolder + (tplPre || '') + md5.createHash('md5').update(tplname).digest("hex") + '.est';
}

function jsRender(tpl, id) {
  if(!tpl) return
  var tplmd = getCompiledName(tpl, id)
  if(tplmd in cache_sjt) return cache_sjt[tplmd]
  if(id) {
    var tag_begin = '<script type="text/html" id="' + id + '">'
    var bp = tpl.indexOf(tag_begin)
    if(-1 == bp) return
    var ep = tpl.indexOf('</script>', bp)
    tpl = tpl.substring(bp + tag_begin.length, ep)
  }
  tpl = tpl.replace(/\$\.each/g, 'jqEach')
  cache_sjt[tplmd] = tpl = plug_sjt.compile(tpl)
  return tpl

}

function getErrorDetail(err , cbk){
	if (!err) return
	var stack = err.stack.split('\n')  
	var errDetail = stack[1].match(/getHtml \(([^\:]+)\:(\d+)\:(\d+)\)/) 
	if (!errDetail)
		errDetail = stack[1].match(/getHtml \[as html\] \(([^\:]+)\:(\d+)\:(\d+)\)/)
	if (!errDetail)
		errDetail = stack[1].match(/at (.*\.est):(\d+):(\d+)/)
	//console.log(stack)

	if (errDetail && fs.existsSync(errDetail[1]) ){
		var remaining = ''
			,lineNo = 0 
			,geted = false
		var rs = fs.createReadStream(errDetail[1] );	
		function cbDetail(errorSeg){
			var msg = errorSeg.slice(0,errDetail[3]) + '<<<' + errorSeg.slice(errDetail[3]) +'\n'
			msg += stack[1] + '\n'
			msg += stack[0] 
			cbk(msg)

			}
		rs.on('data' , function(data){
			remaining += data;
			var index = remaining.indexOf('\n');
			var last  = 0;
			while (index > -1) {
			  var line = remaining.substring(last, index);
			  last = index + 1;
			  lineNo++
			  index = remaining.indexOf('\n', last);
			  
			  if (lineNo == errDetail[2]) {
				geted = true
			   	cbDetail(line);
				break
				}
			}

			remaining = remaining.substring(last);
			
			})
		rs.on('end', function(){
			if(!geted)  cbDetail(remaining)
			})


		}else{
			console.log(stack)
			cbk (stack[0])	

		}
	}

function renderFile(tplpath, tplname, data, callBack, tplPre, requireFn) {

  tplname = tplpath + tplname;
  var compiledFile = getCompiledName(tplname, tplPre);
  //var compiledFile = tplname + '.est';
  if(watchingTpl) watchTpl(tplname , compiledFile);

  var _clearCache = function(file) {
    var _getHtml = require(file).html;
    if (typeof _getHtml !== 'function') {
        delete require.cache[file];
        _getHtml = require(file).html;
    }
    return _getHtml;
  }

  var fillTpl = function() {
      if(true === requireFn) return _clearCache(compiledFile);
      var html = false
	  try{
		  html = _clearCache(compiledFile)(data);
	  }catch(err){
		var splitLn = "\n------\n"
		data._Request_raw = data._Request_raw || {}
		process.nextTick(function(){
			getErrorDetail(err , function(errorMsg){
				var msg = "\n------>\n" + new Date() 
				+  splitLn + 'url:' + data._Request_raw.url 
				+ splitLn + 'msg:' +errorMsg 
				+ splitLn + 'tpl:' + tplname
				if ('INCFAIL' != err.code) {
				 msg += splitLn + 'ds:' +  JSON.stringify(data._Request_raw.dataSouce).replace(/,/g,',\n') 
				+ splitLn + 'cookie:' + JSON.stringify(data._Request_cookies) 
				}
				msg += "\n<------\n"
				base.dataErrLog(msg)
			})
		})
	  }
      _cacheArr[tplname] = true;
      if(callBack) {
        callBack(null, html);
      } else {
		if (false === html)
			throw base.exception("INCFAIL",tplname)
        return html;
      }
    }

  if(fs.existsSync(compiledFile)) {
    ///console.log(tplname , _cacheArr[tplname]);
    if(_cacheArr[tplname]) {
      return fillTpl();
    } else {
      var tplMtime = fs.statSync(tplname).mtime;
      var compileMtime = fs.statSync(compiledFile).mtime;
      //console.log('tplMtime' + tplMtime);
      return tplMtime < compileMtime ? fillTpl() : compile(tplpath, tplname, compiledFile, tplPre, fillTpl);
    }
  } else {
    return compile(tplpath, tplname, compiledFile, tplPre, fillTpl);

  }
}

function compile(tplpath, tplname, compiledFile, tplPre, callBack) {
  console.log('----------compile--', tplname);

  function trsTpl(err, data) {

    if(!data) return;
    //// function html_encode(str){return str.replace(/&/, '&amp;').replace(/</g, '&lt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;'); } ;\n \
    var comFileCon = "/*--" + tplname + "--*/ \n \
    var est = require(config.path.lib + 'est/est.js'); \n \
    var _extFn = require('" + extFnPath + "'); \n \
    function requireFn(tpl) { return est.renderFile('" + tplpath + "' ,tpl , null , null ,'" + tplPre + "' ,true); } ; \n \
    function __getHtml (" + dataName + ") { \n \
      function jsRender(tpl , id) { return est.jsRender(requireFn(tpl)(" + dataName + "), id  ); } ; \n \
      var __htm ='';\n";
    var funcCon;
    var pos = 0,
      posStart = 0,
      posEnd = 0;
    var bufferLen = data.length;

    var comments_mark = 0
    function fillCmpl(str , plainGram){
        if (comments_mark > 0 ) return
        if (plainGram ) comFileCon += str
        else comFileCon += "__htm += '" + stripBlank(str) + "';\n"
        }

    while(true) {
		pos = findTag(data, pos, 60, 37);
		if(pos > -1) {
			posEnd = findTag(data, pos + 2, 37, 62);
		} else {
			///comFileCon += "__htm += '" + stripBlank(buffer2String(data, posStart, bufferLen)) + "';\n";
			fillCmpl(buffer2String(data, posStart, bufferLen)) 
			break;
		}
		if((pos > -1) && posEnd) {
			fillCmpl(buffer2String(data, posStart, pos)) 
			///comFileCon += "__htm += '" + stripBlank(buffer2String(data, posStart, pos)) + "';\n";
			funcCon = data.toString('utf8', pos + 2, posEnd).replace(/\bthis\./g, dataName + '.').replace(/\$_ENGINE_SELF\./g, 'est.');
			switch(funcCon[0]) {
				case '*':
					switch (funcCon[1]){
                        case '{':
                            comments_mark++
                            break
                        case '}':
                            comments_mark--
							if (comments_mark < 0 ) comments_mark = 0
                            break
                        }	
					break;
				case '=':
					switch(funcCon[1]) {
						case '=':
							var _fn_name = '_extFn.html_encode',
								_func_stripted = stripBlank(funcCon.substr(2));

							fillCmpl( '__htm += ' + _fn_name + '(' + _func_stripted + ");\n" , true)
							///comFileCon += '__htm += ' + _fn_name + '(' + _func_stripted + ");\n";
							break;
						default:
							fillCmpl( '__htm +=' + stripBlank(funcCon.substr(1)) + ";\n" , true)
							///comFileCon += '__htm +=' + stripBlank(funcCon.substr(1)) + ";\n";
							break;
					}
					break;
				case '#':
					fillCmpl( '__htm += est.renderFile("' + tplpath + '" ,"' + funcCon.substr(1).trim() + '",' + dataName + ',null,"' + tplPre + '" )||"";\n' , true)
					///comFileCon += '__htm += est.renderFile("' + tplpath + '" ,"' + funcCon.substr(1).trim() + '",' + dataName + ',null,"' + tplPre + '" )||"";\n';
					/*
					   var subTpl = funcCon.substr(1).trim();
					   comFileCon += 'var subTplHtml = est.renderFile("' + tplpath + '" ,"' + subTpl + '",' + dataName + ',null,"' + tplPre + '" );\n';
					   comFileCon += 'if (false !== subTplHtml) {__htm += subTplHtml}else{throw est.exception("INCFAIL","'+subTpl+'")};\n';
					 */
					break;
				case '!':
					var code = getHereDoc(funcCon.substr(1)).trim();
					if(code.substr(-1) == ';') code = code.substr(0, code.length - 1);
					funcCon = '__htm += ' + stripBlank(code) + " || '';\n ";
				default:
					fillCmpl( funcCon + ';' , true)
					///comFileCon += funcCon;
			}

		}
		pos = posStart = posEnd + 2;
		posEnd = 0;
    };

    comFileCon += "return __htm;} \n exports.html = __getHtml; ";
    // console.log(comFileCon);

	function onWriteDone(e) {
		if(e) {} else {

			delete require.cache[compiledFile];
			_cacheArr[tplname] = true; //compiledFile;
			return callBack();
		}
	};
    console.log(compiledFile);
    fs.writeFileSync(compiledFile, comFileCon);
    return onWriteDone();
  };
	//fs.readFile(tplname , trsTpl);
	return trsTpl(null, fs.readFileSync(tplname));
}

function stripBlank(str) {
	if(fuss) {
		str = str.replace(/[  ]+/g, ' ');
	}
	return str;
}

function getHereDoc(str) {
  var herepos = str.indexOf('<<<');
  if(herepos < 0) return str;
  var hereTag = str.substring(herepos + 3, str.indexOf(':', herepos)) + ':';
  var tmpv = str.split(hereTag);
  tmpv[0] = tmpv[0].substr(0, herepos);
  tmpv[1] = tmpv[1].trim().replace(/"/g, '\\"')
			.replace(/[\r\n]+/g, '\\n')///.replace(/[\r\n]+/g, ';'+htmlend)	//	.replace(/[\r\n]+/g, htmlend)
			.replace(dataReg, 'this.')

  str = tmpv.join('');

  return getHereDoc(str);

}

function buffer2String(buffer, start, end) {
  return buffer.toString('utf8', start, end).replace(/<script[^>]*>[\s\S\r\n]*<\/script>/m, function(scriptStr) {
    scriptStr = scriptStr.split("\n");
    if(scriptStr[0].indexOf('type="text/html"') < 0) {
      var i = 0,
        j = scriptStr.length;
      for(; i < j; i++) {
        if('//' == scriptStr[i].trim().substr(0, 2)) scriptStr[i] = '';
      }
    }
    return scriptStr.join('\n');
  }).replace(/\\/g, '\\\\').replace(/[\n\r]+/g, htmlend).replace(/'/g, "\\'");
  //return  buffer.toString('utf8', start , end ).replace(/\\/g,'\\\\').replace(/[\n\r]+/g,"\\\n").replace(/'/g,"\\'")  ;
}

function findTag(buffer, start, char1, char2) {
  for(var i = start, j = buffer.length; i < j; i++) {
    // console.log(i+'|||'+buffer[i] +'||'+ buffer.toString('utf8' , i ,i+1));
    if(buffer[i] == char1 && buffer[i + 1] == char2) {
      return i;
    }
  }
  return -1;
}
var assigned = {}
exports.assignFn = function(fname, fncxt) {
  assigned[fname] = fncxt;
}
exports.callFn = function(fname) {
  return assigned[fname];
}

exports.renderFile = renderFile;
exports.jsRender = jsRender;
exports.setOption = function(options) {
  compiledFolder = options.compiledFolder || '';
  if(options.hasOwnProperty('watchingTpl')) watchingTpl = options.watchingTpl;
  if(options.hasOwnProperty('fuss')) {
    fuss = options.fuss;
    htmlend = options.fuss ? '' : htmlend;
  }
}
