JARL
============

## [DEPRECATED]

JavaScript Asynchronous Resource Loader

### Usage

At the end of the *head* tag:
```javascript

//JARL script
(function(e,t,n){window.isOldIE=function(){var e=-1;if(n.appName=="Microsoft Internet Explorer"){if((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(n.userAgent)!=null)e=parseFloat(RegExp.$1)}return e>-1&&e<10?true:false}();String.prototype.removeComments=function(){var e=("__"+this+"__").split("");var t={singleQuote:false,doubleQuote:false,regex:false,blockComment:false,lineComment:false,condComp:false};for(var n=0,r=e.length;n<r;n++){if(t.regex){if(e[n]==="/"&&e[n-1]!=="\\"){t.regex=false}continue}if(t.singleQuote){if(e[n]==="'"&&e[n-1]!=="\\"){t.singleQuote=false}continue}if(t.doubleQuote){if(e[n]==='"'&&e[n-1]!=="\\"){t.doubleQuote=false}continue}if(t.blockComment){if(e[n]==="*"&&e[n+1]==="/"){e[n+1]="";t.blockComment=false}e[n]="";continue}if(t.lineComment){if(e[n+1]==="\n"||e[n+1]==="\r"){t.lineComment=false}e[n]="";continue}if(t.condComp){if(e[n-2]==="@"&&e[n-1]==="*"&&e[n]==="/"){t.condComp=false}continue}t.doubleQuote=e[n]==='"';t.singleQuote=e[n]==="'";if(e[n]==="/"){if(e[n+1]==="*"&&e[n+2]==="@"){t.condComp=true;continue}if(e[n+1]==="*"){e[n]="";t.blockComment=true;continue}if(e[n+1]==="/"){e[n]="";t.lineComment=true;continue}t.regex=true}}return e.join("").slice(2,-2)};var r=e.getElementsByTagName(t)[0];a2l=0,j2l=0,c2l=0;Loader=function(){var n=function(e){this.elementClass=e.elementClass;this.callback=e.callback;this.script="";this.fn=e.fn};n.prototype={addRequests:function(e){var t=this;for(var n in e){a2l++;j2l++;t.sendRequest(e[n]["src"],this.callback.bind(this))}},sendRequest:function(e,t,n){var r=this;var i=r.createXMLHTTPObject();if(!i){return}var s=n?"POST":"GET";i.open(s,e,true);if(n){i.setRequestHeader("Content-type","application/x-www-form-urlencoded")}i.onreadystatechange=function(){if(i.readyState!=4){return}if(i.status!=200&&i.status!=304){return}t(i)};if(i.readyState==4){return}i.send(n)},XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createXMLHTTPObject:function(){var e=this;var t=false;for(var n=0;n<e.XMLHttpFactories.length;n++){try{t=e.XMLHttpFactories[n]()}catch(r){continue}break}return t},finished:function(n){var i=e.getElementsByClassName(this.elementClass)[0];if(i.scriptsdone==i.scriptsnb&&i.loaded){var o=e.createElement(t);o.innerHTML+=this.script+"\r\n;(function(){";o.innerHTML+="for(i = 0; i<"+i.scriptsnb+"; i++){if(1 > --j2l){asyncCallback['js']();}if (1 > --a2l){asyncCallback.all();}}";o.innerHTML+="}());";r.parentNode.insertBefore(o,r)}}};return n}();async=function(){if(!arguments.length){return}if(isOldIE){var n=[],r=[];for(_o in arguments){var i=arguments[_o];var o=i["id"],u=i["src"],a=i["type"],f=i["cb"],l=i["scripts"];if(i["notOldIE"]){continue}if(!u||!a){console.error("Invalid options in resource",i);continue}if(a=="js"){var c=e.createElement(t);c.src=u;if(o){c.id=o}if(f){c.onload=f}r.push(c);for(_s in l){c=e.createElement(t);c.src=l[_s]["src"];r.push(c)}}else{var c=e.createElement("link");c.rel="stylesheet";c.href=u;if(o){c.id=o}n.push(c)}}var h=e.createElement("script"),p=e.createElement("script"),v=e.createElement("script");h.text="window.asyncCallback.js();";p.text="window.asyncCallback.css();";v.text="window.asyncCallback.all();";n.push(p);r.push(h);r.push(v);for(ss in n){e.getElementsByTagName(t)[0].parentNode.appendChild(n[ss])}for(sc in r){e.getElementsByTagName(t)[0].parentNode.appendChild(r[sc])}return}var m=[];for(_o in arguments){var i=arguments[_o];var g=function(){},o=i["id"],u=i["src"],a=i["type"],f=i["cb"],l=i["scripts"];if(i["onlyOldIE"]){continue}if(!u||!a){console.error("Invalid options in asynchronous resource",i);continue}switch(a){case"js":var c=e.createElement(t);c.async=true;c.src=u;a2l++;j2l++;var g=function(){f&&f();if(1>--j2l){asyncCallback["js"]()}if(1>--a2l){asyncCallback.all()}};break;case"css":var c=e.createElement("link");c.rel="stylesheet";c.href=u;a2l++;c2l++;var g=function(e){if(!e){f&&f()}if(1>--c2l){asyncCallback["css"]()}if(1>--a2l){asyncCallback.all()}};break;default:continue;break}if(o){c.id=o}var y="async"+String(Math.random()*9007199254740992);c.setAttribute("class",y);if(typeof l=="object"&&l.length){c.scriptsnb=l.length;c.scriptsdone=0;c.loaded=false;loader=new Loader({elementClass:y,fn:g,callback:function(t){var n=e.getElementsByClassName(loader.elementClass)[0];var r=t.responseText.removeComments()||"";n.callscript=n.callscript+r;loader.script=loader.script+r;n.scriptsdone++;this.finished()}});loader.addRequests(l);c.onload=c.onerror=function(e){loader.fn(true);e.target.loaded=true;loader.finished()}}else{c.onerror=c.onload=g}m.push(c)}for(_e in m){e.getElementsByTagName(t)[0].parentNode.insertBefore(m[_e],e.getElementsByTagName(t)[0])}}})(document,"script",navigator)


window.asyncCallback = {	//Define in global scope BEFORE calling the "async" method
	all: function()
	{
		//Callback on all resources
	},
	css: function()
	{
		//Callback on css resources
	},
	js: function()
	{
		//Callback on javascript resources
	}
};


/**
 * Function name: async
 * Description: Import resources asynchronously and provide callbacks
 * @params Resources (objects)
 	* {Object} Contains information about the resource to be called asynchronously
 		* type
 			* {String} 'css' or 'js'
 		* src
 			* {String} Path to resource
 		* notOldIE [optional, defaults to false]
 			* {Boolean} Don't import if old IE version
 		* onlyOldIE [optional, defaults to false]
 			* {Boolean} Only import if old IE version
 		* id [optional]
 			* {String} Unique id for element
 		* cb [optional, js only]
 			* {Function} Function to call after resource execution
 		* scripts [optional, js only]
 			* {Array} Contains paths to secondary resources
 				* {String} Path to resource
 * @return {undefined} undefined
 */

async(
	{
		'type': 'css',
		'src': '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.css',
	},
	{
		'type': 'js',
		'src': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
		'id': '_jquery-script',
		'scripts': [
			{
				'src': '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.js',
			},
		],
		'cb': function()
		{
			console.log("jQuery callback");
		}
	}
);
```
