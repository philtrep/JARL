asyncCallback={
	all: function()
	{
		console.log("Done Loading!");
		window.startScript();
	},
	css: function()
	{
	
	},
	js: function()
	{
	
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
		return rv>-1  && rv<10?true:false;
	})();
	
	var fjs = d.getElementsByTagName(s)[0];
	a2l = 0;
	j2l = 0;
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
				if (!req) return;
				var method = (postData) ? "POST" : "GET";
				req.open(method,url,true);
				if (postData)
					req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				req.onreadystatechange = function () {
					if (req.readyState != 4) return;
					if (req.status != 200 && req.status != 304) {
						return;
					}
					callback(req);
				}
				if (req.readyState == 4) return;
				req.send(postData);
			},
			'XMLHttpFactories':
			[
				function () {return new XMLHttpRequest()},
				function () {return new ActiveXObject("Msxml2.XMLHTTP")},
				function () {return new ActiveXObject("Msxml3.XMLHTTP")},
				function () {return new ActiveXObject("Microsoft.XMLHTTP")}
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
			
			if (d.getElementsByClassName(i)[0] || !u || !i || !t) return;
			
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
					var _fn = function()
					{
						c && c();
						if(1 > --c2l)
						{
							asyncCallback['js']();
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
			
			if(b)
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
						var asynctext = req.responseText?req.responseText:"";
						ele.callscript = ele.callscript + asynctext;
						loader.script = loader.script + asynctext;
						ele.scriptsdone++;

						var ele = document.getElementsByClassName(loader.elementClass)[0];
						
						if(1 > --j2l)
						{
							asyncCallback['js']();
						}
						if (1 > --a2l)
						{	
							asyncCallback.all();
						}
						
						if(ele.scriptsdone == ele.scriptsnb && ele.loaded)
						{
							var _ele_ = document.createElement("script");
							_ele_.innerHTML = loader.script;
							fjs.parentNode.insertBefore(_ele_, fjs);
						}
					}
				});
				loader.addRequests(b);
			
				var finished = function(e){
					e.target.loaded = true;
					var ele = document.getElementsByClassName(loader.elementClass)[0];
					
					if(ele.scriptsdone == ele.scriptsnb && ele.loaded)
					{
						var _ele_ = document.createElement("script");
						_ele_.innerHTML = loader.script;
						fjs.parentNode.insertBefore(_ele_, fjs);
					}
				};
				ele.onerror = function(e)
				{
					finished(e);
					loader.fn();
				}
				ele.onload = function(e)
				{
					finished(e);
					loader.fn();
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
		'src': 'assets/style/styles.css',
		'class': '_stylesheet'
	},
	{
		'type': 'js',
		'src': 'assets/js/custom-plugins.js',
		'class': '_custom-plugins',
		'id': 'myplugins'
	},
	{
		'type': 'js',
		'src': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
		'class': '_jquery-script',
		'scripts': [
			{
				'src': 'assets/js/selectivizr-min.js',
			},
			{
				'src': 'assets/js/fancybox/jquery.fancybox.js',
			},
			{
				'src': 'assets/js/fancybox/jquery.fancybox.pack.js',
			}
		]
	},
]);
