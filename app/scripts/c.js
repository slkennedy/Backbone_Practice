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

		defaults: {
			title: '',
			body: '...'
		}
	});

////////////////Routers///////
/////////////////////////////

	App.Router = Backbone.Router.extend ({
		initialize: function (){
			this.collection = new App.Collections.BlogPosts();
			this.collectionFetch = this.collection.fetch();

			new App.Views.BlogListView({
				collection: this.collection
			});
		},

		routes: {
			':id': 'showPost'
		},

		showPost: function (id){
			console.log('hey');
			$('.post-view').empty();
			console.log(this.collection);
			var self = this;
			console.log(self.collection);
			this.collectionFetch.done(function (posts){
				var post = self.collection.get(id);
				new App.Views.BlogDetailView ({
					model: post,
					$container: $('.post-view')
				});
			});
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
			this.$el.append('<a href = "#/'+this.model.get("_id")+'">'+this.model.get("title")+'</a>');
		}
	});

	App.Views.BlogDetailView = Backbone.View.extend ({
		template: _.template($('#templates-blog-detail').text()),

		initialize: function (opts){
			var options = _.defaults({}, opts, {
				$container: $('.post-view')
			});
			
			options.$container.append(this.el);

			this.render();
		},

		render: function (){
			this.$el.html(this.template(this.model.toJSON()));
		}
	});


////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		new App.Router();
		Backbone.history.start();
	});
})();