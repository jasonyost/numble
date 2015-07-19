// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

	"use strict";

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "numble",
		defaults = {
			debug: false
		};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function() {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			this.debugMessage("numble initialized");
			this.setupControls(this.element, this.settings);
		},
		setupControls: function(element, settings) {
			var numble = this;
			// Hide the original control to prevent default browser styling interference
			$(element).addClass('numble-original');
			$(element).hide();

			// Inject a new element into the page to handle the display control of the numbers
			$(element).after('<div class="numble-control"></div>');
			var control = $(element).siblings('.numble-control');

			// Display the original value of the control
			var originalValue = parseInt($(element).val()) || 0;
			this.debugMessage("original value " + originalValue);
			control.text(originalValue);

			// bind to change event of the input to update the new control
			$(element).change(function() {
				numble.debugMessage("change detected");
				var control = $(this).siblings('.numble-control');
				control.text($(this).val());

				// replace the controls on change
				numble.addButtons(this, numble.settings);

			});

			// bind the mouse wheel to the control
			control.bind('mousewheel DOMMouseScroll', function(event) {
				if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
					numble.incrementValue(element);
				} else {
					numble.decrementValue(element);
				}
			});

			// add up and down arrows
			this.addButtons(this.element, this.settings);

		},
		addButtons: function(element, settings) {
			var numble = this;
			var n = $(element).siblings('.numble-control');
			n.append('<span class="numble-increment numble-arrow">&#x25B2;</span>');
			n.append('<span class="numble-decrement numble-arrow">&#x25BC;</span>');

			n.find('.numble-increment').click(function(){
				numble.incrementValue(element);
			});

			n.find('.numble-decrement').click(function(){
				numble.decrementValue(element);
			});
		},
		incrementValue: function(element) {
			this.debugMessage('received scroll up event');
			var val = parseInt($(element).val()) || 0;
			val++;
			$(element).val(val).trigger('change');
			this.debugMessage('incrementing to ' + val);
		},
		decrementValue: function(element) {
			this.debugMessage('received scroll down event');
			var val = parseInt($(element).val()) || 0;
			val--;
			$(element).val(val).trigger('change');
			this.debugMessage('decrementing to ' + val);
		},
		debugMessage: function(message) {
			if (this.settings.debug) {
				console.log(message);
			}
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
