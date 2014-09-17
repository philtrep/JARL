CARL
============

**C**allbacks with **A**synchronous **R**esource **L**oader

### Usage

At the end of the *head* tag:
```javascript
////
//CARL script goes here
///

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
