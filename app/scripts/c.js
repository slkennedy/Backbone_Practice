(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models////////	
/////////////////////////////

	App.Models.BlogPost = Backbone.Model.extend ({
		idAttribute: '_id'

		defaults: {
			title: ''
		}
	});

////////////////Routers///////
/////////////////////////////

	App.Router = Backbone.Router.extend ({
		initialize: function (){
			Var collection = new App.Collections.BlogPosts();
			this.collectionFetch = collection.fetch();

			new App.Views.BlogListView({
				collection: collection
			});
		},

		routes: {
			'#/:id': 'showPost'
		},

		showPost: function (id){
			$('.post-view').empty();
			var self = this;
			this.collectionFetch.done(function (posts){
				var post = self.collection.get(id);
				new BlogDetailView ({
					model: post,
					$container: $('.post-view')
				})
			})
		}
	});

////////////////Collections///
/////////////////////////////

	App.Collections.BlogPosts = Backbone.Collection.extend ({
		model: App.Models.BlogPost,
		url:'http://tiny-pizza-server.herokuapp.com/collections/posts',
	});
	
////////////////Views////////	
////////////////////////////

	App.Views.BlogListView = Backbone.View.extend ({
		tagName:'ul',
		className: 'post-list',

		initialize: function (){
			$('.sidebar').append(this.el);
			this.render();
			this.listenTo(this.collection, "sync", this.render);

		},

		render: function (){
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (post){
			new App.Views.BlogPostsView({
				model: post
			});
		}
	});
	
	App.Views.BlogPostsView = Backbone.View.extend({
		tagName: 'li',
		className: 'blog-post',

		initialize: function(){
			$('.post-list').append(this.el);
			this.render();
		},

		render: function (){
			console.log(this.model);
			this.$el.append(this.model.get('title'));
		}
	});


////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		Backbone.history.start();
	});
})();