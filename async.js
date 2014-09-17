asyncCallback={
	all: function()
	{
		console.log("ALL good!");
		jQuery(function(){
			jQuery("#status").text("Script finished!");
		})
	},
	css: function()
	{
		console.log("CSS good!");
	},
	js: function()
	{
		console.log("JS good!");
	}
};

;(function(d,s){
	window.isOldIE = (function(){	
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)
				rv = parseFloat( RegExp.$1 );
		}	
		return rv > -1 && rv < 10 ? true : false;
	})();

	String.prototype.removeComments = function() {
	    var str = ('__' + this + '__').split('');
	    var mode = {
	        singleQuote: false,
	        doubleQuote: false,
	        regex: false,
	        blockComment: false,
	        lineComment: false,
	        condComp: false 
	    };
	    for (var i = 0, l = str.length; i < l; i++) {
	 
	        if (mode.regex) {
	            if (str[i] === '/' && str[i-1] !== '\\') {
	                mode.regex = false;
	            }
	            continue;
	        }
	 
	        if (mode.singleQuote) {
	            if (str[i] === "'" && str[i-1] !== '\\') {
	                mode.singleQuote = false;
	            }
	            continue;
	        }
	 
	        if (mode.doubleQuote) {
	            if (str[i] === '"' && str[i-1] !== '\\') {
	                mode.doubleQuote = false;
	            }
	            continue;
	        }
	 
	        if (mode.blockComment) {
	            if (str[i] === '*' && str[i+1] === '/') {
	                str[i+1] = '';
	                mode.blockComment = false;
	            }
	            str[i] = '';
	            continue;
	        }
	 
	        if (mode.lineComment) {
	            if (str[i+1] === '\n' || str[i+1] === '\r') {
	                mode.lineComment = false;
	            }
	            str[i] = '';
	            continue;
	        }
	 
	        if (mode.condComp) {
	            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
	                mode.condComp = false;
	            }
	            continue;
	        }
	 
	        mode.doubleQuote = str[i] === '"';
	        mode.singleQuote = str[i] === "'";
	 
	        if (str[i] === '/') {
	 
	            if (str[i+1] === '*' && str[i+2] === '@') {
	                mode.condComp = true;
	                continue;
	            }
	            if (str[i+1] === '*') {
	                str[i] = '';
	                mode.blockComment = true;
	                continue;
	            }
	            if (str[i+1] === '/') {
	                str[i] = '';
	                mode.lineComment = true;
	                continue;
	            }
	            mode.regex = true;
	        }
	    }
	    return str.join('').slice(2, -2);
	}

	var fjs = d.getElementsByTagName(s)[0];
		a2l = 0,
		j2l = 0,
		c2l = 0;
	
	Loader = (function(){
		var child = function(options){
			this.elementClass = options.elementClass;
			this.callback = options.callback;
			this.script = '';
			this.fn = options.fn;
		};
		child.prototype = {
			'addRequests': function(list)
			{
				var self = this;
				for(var l in list)
				{
					a2l++;
					j2l++;
					self.sendRequest(list[l]['src'],this.callback.bind(this));
				}
			},
			'sendRequest': function (url,callback,postData)
			{
				var self = this;
				var req = self.createXMLHTTPObject();
				if(!req)
				{
					return;
				}
				var method = (postData) ? "POST" : "GET";
				req.open(method,url,true);
				if(postData)
				{
					req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				}
				req.onreadystatechange = function () {
					if(req.readyState != 4)
					{
						return;
					}
					if(req.status != 200 && req.status != 304)
					{
						return;
					}
					callback(req);
				}
				if(req.readyState == 4)
				{
					return;
				}
				req.send(postData);
			},
			'XMLHttpFactories':
			[
				function(){ return new XMLHttpRequest() },
				function(){ return new ActiveXObject("Msxml2.XMLHTTP") },
				function(){ return new ActiveXObject("Msxml3.XMLHTTP") },
				function(){ return new ActiveXObject("Microsoft.XMLHTTP") }
			],
			'createXMLHTTPObject': function()
			{
				var self = this;
				var xmlhttp = false;
				for (var i=0;i<self.XMLHttpFactories.length;i++) {
					try {
						xmlhttp = self.XMLHttpFactories[i]();
					}
					catch (e) {
						continue;
					}
					break;
				}
				return xmlhttp;
			},
		}
		return child;
	}());
	
	
	async = function(obj) {
	
		if(!obj.length)
		{
			console.error("Error: Empty array as parameter");
			return;
		}
	
		var ele_list = [];
	
		for(_o in obj)
		{
			var _obj = obj[_o];
			
			var _fn = function(){},
				u = _obj['src'],
				i = _obj['class'],
				t = _obj['type'],
				c = _obj['cb'],
				b = _obj['scripts'];
			
			if(d.getElementsByClassName(i)[0] || !u || !i || !t)
			{
				console.error("Invalid options in asynchronous resource", _obj);
				continue;
			}
			
			switch(t)
			{
				case 'js':
					var ele = d.createElement(s);
					if(!isOldIE)
						ele.async="";
					ele.src = u;
					a2l++;
					j2l++;
					var _fn = function()
					{
						c && c();
						
						if(1 > --j2l)
						{
							asyncCallback['js']();
						}
						if (1 > --a2l)
						{	
							asyncCallback.all();
						}
					};
					
				break;
				case 'css':
					var ele = d.createElement("link");
					ele.rel = "stylesheet"
					ele.href = u;
					a2l++;
					c2l++;
					var _fn = function(dont_skip_callback)
					{
						if(!dont_skip_callback)
						{
							c && c();
						}
						if(1 > --c2l)
						{
							asyncCallback['css']();
						}
						if (1 > --a2l)
						{	
							asyncCallback.all();
						}
					};
					
				break;
				default:
					continue;
				break;
			}
			if(_obj['id'])
			{
				ele.id = _obj['id'];
			}
			ele.setAttribute('class',i);
			if(typeof b == "object" && b.length)
			{
				ele.scriptsnb = b.length;
				ele.scriptsdone = 0;
				ele.loaded = false;

				loader = new Loader({
					'elementClass':i,
					'fn': _fn,
					'callback': function(req)
					{
					
						var ele = document.getElementsByClassName(loader.elementClass)[0];
						var asynctext = req.responseText.removeComments() || "";
						ele.callscript = ele.callscript + asynctext;
						loader.script = loader.script + asynctext;
						ele.scriptsdone++;

						var ele = document.getElementsByClassName(loader.elementClass)[0];
						
					}
				});
				loader.addRequests(b);
			
				var finished = function(e){
					e.target.loaded = true;
					var ele = document.getElementsByClassName(loader.elementClass)[0];
					
					if(ele.scriptsdone == ele.scriptsnb && ele.loaded)
					{
						var _ele_ = document.createElement("script");
						_ele_.innerHTML += loader.script+"\r\n;(function(){";
						_ele_.innerHTML += "for(i = 0; i<"+ele.scriptsnb+"; i++){if(1 > --j2l){asyncCallback['js']();}if (1 > --a2l){asyncCallback.all();}}";
						_ele_.innerHTML += "}());";
						fjs.parentNode.insertBefore(_ele_, fjs);
						console.log("Added JS L2 scripts");
					}
				};
				ele.onerror = function(e)
				{
					finished(e);
					loader.fn(true);
				}
				ele.onload = function(e)
				{
					finished(e);
					loader.fn(true);
				}
			}
			else
			{
				ele.onerror = _fn;
				ele.onload = _fn;
			}
			ele_list.push(ele);	
		}
		for(_e in ele_list)
		{
			document.getElementsByTagName('script')[0].parentNode.insertBefore(ele_list[_e], document.getElementsByTagName('script')[0]);
		}
	};
}(document, 'script'));

async([
	{
		'type': 'css',
		'src': '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.css',
		'class': '_jquery-mobile'
	},
	{
		'type': 'css',
		'src': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.css',
		'class': '_jquery-ui'
	},
	{
		'type': 'js',
		'src': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
		'class': '_jquery-script',
		'scripts': [
			{
				'src': '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.js',
			},
			{
				'src': 'js/jqueryui.js',
			},
		],
		'cb': function()
		{
			console.log("jQuery callback");
		}
	}
]);