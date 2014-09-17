CARL
============

<span style="text-decoration: underline;">C</span><small>allbacks with </small><u>A</u><small>synchronous </small><u>R</u><small>esource </small><u>L</u><small>oader</small>

<h3>Usage</h3>

At the end of the <code>head</code> tag:
<pre>
////
//CARL script goes here
///

asyncCallback = {	//Define in global scope BEFORE calling the "async" method
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
</pre>
