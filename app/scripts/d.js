(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models////////	
/////////////////////////////

////////////////Collections///
/////////////////////////////

////////////////Views////////	
////////////////////////////

	App.Views.CreateBookmarkFrom = Backbone.View.extend ({
		tagName: 'form',
		className: 'bookmark-form',
		template: _.template

	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){

	});
})();