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
			this.debugMessage("numble initialized", this.settings);
			this.setupControls(this.element, this.settings);
		},
		setupControls: function(element, settings) {

			// Hide the original control to prevent default browser styling interference
			$(element).addClass('numble-original');
			$(element).hide();

			// Inject a new element into the page to handle the display control of the numbers
			$(element).after('<div class="numble-control"></div>');
			var control = $(element).siblings('.numble-control');

			// Display the original value of the control
			var originalValue = parseInt($(element).val()) || 0;
			this.debugMessage("original value " + originalValue, this.settings);
			control.text(originalValue);

			// bind the mouse wheel to the control
			control.bind('mousewheel DOMMouseScroll', function(event) {
				var val = parseInt($(element).val()) || 0;
				if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
					console.log('received scroll up event');
					val++;
					$(this).text(val);
					$(element).val(val);
					console.log('incrementing to ' + val);
				} else {
					console.log('received scroll down event');
					val--;
					$(this).text(val);
					$(element).val(val)
					console.log('decrementing to ' + val);
				}
			});

		},
		debugMessage: function(message, settings) {
			if (settings.debug) {
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
