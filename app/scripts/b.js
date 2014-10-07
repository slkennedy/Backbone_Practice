(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models////////	
/////////////////////////////
	App.Models.Person = Backbone.Model.extend ({
		validate: function (attributes){
			if (! attributes.first){
				return "First Name is required";
			}
			if (! attributes.last){
				return "Last Name is required";				
			}
			if (! attributes.address){
				return "Address is required";
			}
			if (! attributes.phone){
				return "Phone is required";				
			}
		},

		defaults: {
			first: '',
			last: '',
			address: '',
			phone: ''
		},

		url:"http://tiny-pizza-server.herokuapp.com/collections/people",
	});

////////////////Collections///
/////////////////////////////


////////////////Views////////	
////////////////////////////

	App.Views.FormViewCreate = Backbone.View.extend ({
		tagName: 'form',
		className: 'person-form',
		template: _.template($('#templates-person-form').html()),

		events: {
			'submit':'submitPerson'
		},

		initialize: function (){
			console.log(this.model);
			$('body').prepend(this.el);
			this.render();
			this.listenTo(this.model, 'invalid', this.invalidPerson);
		},

		render: function (){
			this.$el.html(this.template);
		},

		invalidPerson: function (model, error){
			this.$('form').addClass('invalid');
			alert(error);
		},

		submitPerson: function (e){
			e.preventDefault();
			var first = $('.first').val();
			var last = $('.last').val();
			var address = $('.address').val();
			var phone = $('.phone').val();
			
			this.model.save({
				first: first,
				last: last,
				address: address,
				phone: phone
			});

			$('.first').val('');
			$('.last').val('');
			$('.address').val('');
			$('.phone').val('');
		}
	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		new App.Views.FormViewCreate({
			model: new App.Models.Person
		});
	});
})();