(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models////////	
/////////////////////////////

	App.Models.BlogPost = Backbone.Model.extend ({
		idAttribute: '_id',
		url:'http://tiny-pizza-server.herokuapp.com/collections/posts'
	});

////////////////Collections///
/////////////////////////////

////////////////Views////////	
////////////////////////////

	App.Views.BlogPostsView = Backbone.View.extend ({
		tagName:'ul',
		className: 'post-list',

		initialize: function (){
			$('.sidebar').append(this.el);
			this.render();
		},

		render: function (){

			//this.model isn't correct here... 
			console.log(this.model);
			this.$el.html('<li>'+this.model.get('title')+'</li>');
		}
	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		new App.Views.BlogPostsView({
			model: new App.Models.BlogPost
		});
	});
})();