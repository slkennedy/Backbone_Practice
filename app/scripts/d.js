(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Routers///////
/////////////////////////////

	App.Router = Backbone.Router.extend ({
		// validate: function (attributes){
		// 	if (! attributes.url){
		// 		return "url is required";
		// 	}
		// 	if (! attributes.title){
		// 		return "title is required";				
		// 	}
		// 	if (! attributes.tags){
		// 		return "a tag is required";
		// 	}
		// },
		initialize: function (){
			var model = new App.Models.BookmarkModel();
			var collection = new App.Collections.BookmarksCollection;
			new App.Views.CreateBookmarkForm({
				collection: collection,
				model: model
			})
			new App.Views.BookmarksView({
				collection: collection,
				model:model
			}),
			new App.Views.TagsView({
				collection: collection,
				model:model
			})
		},

		routes: {
			':id': 'bookmarkTags'
		},

		

	});

////////////////Models////////	
/////////////////////////////

	App.Models.BookmarkModel = Backbone.Model.extend ({
		defaults: {
			url: '',
			title: '',
			tags: ''
		},

		urlRoot: "http://tiny-pizza-server.herokuapp.com/collections/bookmarks"

	});

////////////////Collections///
/////////////////////////////

	App.Collections.BookmarksCollection = Backbone.Collection.extend ({
		model: App.Models.BookmarkModel,
		url: "http://tiny-pizza-server.herokuapp.com/collections/bookmarks"

	});

////////////////Views////////	
////////////////////////////

	App.Views.CreateBookmarkForm = Backbone.View.extend ({
		tagName: 'form',
		className: 'bookmark-form',
		template: _.template($('#templates-bookmark-form').html()),

		events: {
			'click .submit' : 'submitForm'
		},

		submitForm: function (e){
			e.preventDefault();
			var url = $('.url').val();
			var title = $('.title').val();
			var tags = $('.tags').val();
			this.collection.create({url:url, title:title, tags:tags});
		},

		initialize: function (){
			$('.inputs').append(this.el);
			this.render();
			// this.listenTo(this.model, 'invalid', this.invalidBookmark);
		},

		render: function(){
			this.$el.html(this.template);
		}

		// invalidBookmark: function (){
		// 	this.$('form').addClass('invalid');
		// 	alert(error);
		// }

	});

	App.Views.BookmarksView = Backbone.View.extend ({
		tagName: 'ul',
		className: 'bookmarks-view',

		initialize: function (){
			$('.lists').prepend(this.el);
			this.render();
			this.listenTo(this.collection, 'add', this.render);
		},

		render: function (){
			this.$el.empty();
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (post){
			new App.Views.BookmarkView({
				model: post
			});
		}
	});

	App.Views.BookmarkView = Backbone.View.extend ({
		tagName: 'li',
		className: 'bookmark',

		initialize: function(){
			$('.bookmarks-view').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append('<a href = "#/'+this.model.get("_id")+'">'+this.model.get("title")+'</a>');
		}
	})

	App.Views.TagsView = Backbone.View.extend ({
		tagName: 'ul',
		className: 'tags-view',

		initialize: function (){
			$('.lists').append(this.el);
			this.render();
			this.listenTo(this.collection, 'add', this.render);
		},

		render: function (){
			this.$el.empty();
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (post){
			new App.Views.TagView({
				model: post
			});
		}
	});

	App.Views.TagView = Backbone.View.extend ({
		tagName: 'li',
		className: 'tag',

		initialize: function(){
			$('.tags-view').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append('<a href = "#/'+this.model.get("_id")+'">'+this.model.get("tags")+'</a>');
		}
	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		new App.Router();
		Backbone.history.start();
	});
})();