JARL
============

JavaScript Asynchronous Resource Loader

### Usage

At the end of the *head* tag:
```javascript

//JARL script
(function(e,t){window.isOldIE=function(){var e=-1;if(navigator.appName=="Microsoft Internet Explorer"){if((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)!=null)e=parseFloat(RegExp.$1)}return e>-1&&e<10?true:false}();String.prototype.removeComments=function(){var e=("__"+this+"__").split("");var t={singleQuote:false,doubleQuote:false,regex:false,blockComment:false,lineComment:false,condComp:false};for(var n=0,r=e.length;n<r;n++){if(t.regex){if(e[n]==="/"&&e[n-1]!=="\\"){t.regex=false}continue}if(t.singleQuote){if(e[n]==="'"&&e[n-1]!=="\\"){t.singleQuote=false}continue}if(t.doubleQuote){if(e[n]==='"'&&e[n-1]!=="\\"){t.doubleQuote=false}continue}if(t.blockComment){if(e[n]==="*"&&e[n+1]==="/"){e[n+1]="";t.blockComment=false}e[n]="";continue}if(t.lineComment){if(e[n+1]==="\n"||e[n+1]==="\r"){t.lineComment=false}e[n]="";continue}if(t.condComp){if(e[n-2]==="@"&&e[n-1]==="*"&&e[n]==="/"){t.condComp=false}continue}t.doubleQuote=e[n]==='"';t.singleQuote=e[n]==="'";if(e[n]==="/"){if(e[n+1]==="*"&&e[n+2]==="@"){t.condComp=true;continue}if(e[n+1]==="*"){e[n]="";t.blockComment=true;continue}if(e[n+1]==="/"){e[n]="";t.lineComment=true;continue}t.regex=true}}return e.join("").slice(2,-2)};var n=e.getElementsByTagName(t)[0];a2l=0,j2l=0,c2l=0;Loader=function(){var e=function(e){this.elementClass=e.elementClass;this.callback=e.callback;this.script="";this.fn=e.fn};e.prototype={addRequests:function(e){var t=this;for(var n in e){a2l++;j2l++;t.sendRequest(e[n]["src"],this.callback.bind(this))}},sendRequest:function(e,t,n){var r=this;var i=r.createXMLHTTPObject();if(!i){return}var s=n?"POST":"GET";i.open(s,e,true);if(n){i.setRequestHeader("Content-type","application/x-www-form-urlencoded")}i.onreadystatechange=function(){if(i.readyState!=4){return}if(i.status!=200&&i.status!=304){return}t(i)};if(i.readyState==4){return}i.send(n)},XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createXMLHTTPObject:function(){var e=this;var t=false;for(var n=0;n<e.XMLHttpFactories.length;n++){try{t=e.XMLHttpFactories[n]()}catch(r){continue}break}return t}};return e}();async=function(r){if(!r.length){console.error("Error: Empty array as parameter");return}var i=[];for(_o in r){var o=r[_o];var u=function(){},a=o["src"],f=o["class"],l=o["type"],c=o["cb"],h=o["scripts"];if(e.getElementsByClassName(f)[0]||!a||!f||!l){console.error("Invalid options in asynchronous resource",o);continue}switch(l){case"js":var p=e.createElement(t);if(!isOldIE)p.async="";p.src=a;a2l++;j2l++;var u=function(){c&&c();if(1>--j2l){asyncCallback["js"]()}if(1>--a2l){asyncCallback.all()}};break;case"css":var p=e.createElement("link");p.rel="stylesheet";p.href=a;a2l++;c2l++;var u=function(e){if(!e){c&&c()}if(1>--c2l){asyncCallback["css"]()}if(1>--a2l){asyncCallback.all()}};break;default:continue;break}if(o["id"]){p.id=o["id"]}p.setAttribute("class",f);if(typeof h=="object"&&h.length){p.scriptsnb=h.length;p.scriptsdone=0;p.loaded=false;loader=new Loader({elementClass:f,fn:u,callback:function(e){var t=document.getElementsByClassName(loader.elementClass)[0];var n=e.responseText.removeComments()||"";t.callscript=t.callscript+n;loader.script=loader.script+n;t.scriptsdone++;var t=document.getElementsByClassName(loader.elementClass)[0]}});loader.addRequests(h);var v=function(e){e.target.loaded=true;var t=document.getElementsByClassName(loader.elementClass)[0];if(t.scriptsdone==t.scriptsnb&&t.loaded){var r=document.createElement("script");r.innerHTML+=loader.script+"\r\n;(function(){";r.innerHTML+="for(i = 0; i<"+t.scriptsnb+"; i++){if(1 > --j2l){asyncCallback['js']();}if (1 > --a2l){asyncCallback.all();}}";r.innerHTML+="}());";n.parentNode.insertBefore(r,n);console.log("Added JS L2 scripts")}};p.onerror=function(e){v(e);loader.fn(true)};p.onload=function(e){v(e);loader.fn(true)}}else{p.onerror=u;p.onload=u}i.push(p)}for(_e in i){document.getElementsByTagName("script")[0].parentNode.insertBefore(i[_e],document.getElementsByTagName("script")[0])}}})(document,"script")



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
 * @param {Array} List of resources (objects)
 	* {Object} Contains information about the resource to be called asynchronously
 		* type
 			* {String} 'css' or 'js'
 		* src
 			* {String} Path to resource
 		* class
 			* {String} Unique class for script tag
 		* cb [optional, js only]
 			* {Function} Function to call after resource execution
 		* scripts [optional, js only]
 			* {Array} Contains paths to secondary resources
 				* {String} Path to resource
 * @return {undefined} undefined
 */

async([
	{
		'type': 'css',
		'src': '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.css',
		'class': '_jquery-mobile'
	},
	{
		'type': 'js',
		'src': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
		'class': '_jquery-script',
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
]);
```
