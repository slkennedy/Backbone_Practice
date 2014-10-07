(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Routers///////
/////////////////////////////

	App.Router = Backbone.Router.extend ({

		initialize: function (){
			new App.Views.CreateBookmarkForm(),
			new App.Views.BookmarksView(),
			new App.Views.TagsView()
		}
	});

////////////////Models////////	
/////////////////////////////

////////////////Collections///
/////////////////////////////

////////////////Views////////	
////////////////////////////

	App.Views.CreateBookmarkForm = Backbone.View.extend ({
		tagName: 'form',
		className: 'bookmark-form',
		template: _.template($('#templates-bookmark-form').html()),

		initialize: function (){
			$('.inputs').append(this.el);
			this.render();
		},

		render: function(){
			this.$el.html(this.template);
		}

	});

	App.Views.BookmarksView = Backbone.View.extend ({
		tagName: 'ul',
		className: 'bookmarks-view',

		initialize: function (){
			$('.lists').append(this.el);
			this.render();
		},

		render: function (){
		}
	});

	App.Views.TagsView = Backbone.View.extend ({
		tagName: 'ul',
		className: 'tags-view',

		initialize: function (){
			$('.lists').append(this.el);
			this.render();
		},

		render: function (){

		}
	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		new App.Router();
		Backbone.history.start();
	});
})();