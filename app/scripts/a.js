(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models////////	
/////////////////////////////

	//Model for containing information received from the inputs
	App.Models.BlogPost = Backbone.Model.extend ({
		idAttribute:'_id',
		defaults: {
			title: '',
			body: '...'
		},
		url: "http://tiny-pizza-server.herokuapp.com/collections/posts"
	});

////////////////Collections///
/////////////////////////////

////////////////Views////////	
////////////////////////////

	//View for rendering inputs & submit button to the page
	//Creates DOM element of <form> w/class name of blog-form
	//template w/id of templates-blog-form is attached to the template property as a function 
	App.Views.CreateFormView = Backbone.View.extend({
		tagName: 'form',
		className: 'blog-form',
		template: _.template($('#templates-blog-form').html()),

		events: {
			'submit': 'submitBlog'
		},

		//on initialize - 
		//<form> is appended to the body element
		//render function is called
		initialize: function (){
			$('body').append(this.el);
			this.render();
		},

		//on render - 
		//the template property is called and ...
		//the established template is added to the <form> element
		//the template includes the input fields and submit button
		render: function (){
			this.$el.html(this.template);
		},

		submitBlog: function (e){
			e.preventDefault();
			var title = $('.title').val();
			var body = $('.body').val();
			this.model.set({
				title: title, 
				body: body
			});
			this.model.save();

		},

	});

////////////////Glue Code/////	
/////////////////////////////

})();

	$(document).ready(function (){
		new App.Views.CreateFormView({
			model: new App.Models.BlogPost()
		});
	});