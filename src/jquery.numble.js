// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; // jshint ignore:line
(function($, window, document, undefined) {

	"use strict";

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn"t really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "numble",
		defaults = {
			debug: false,
			includeButtons: true,
			allowNegative: true,
			maxValue: undefined,
			minValue: undefined,
			initialValue: undefined
		};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don"t want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function() {
			var numble = this;
			numble.debugMessage("numble initialized");
			numble.setupControls(numble.element, numble.settings);
		},
		setupControls: function(element, settings) {

			// Add a wrapper for the control
			$(element).wrap("<div class=\"numble-wrapper\"></div>");

			var numble = this;
			// Hide the original control to prevent default browser styling interference
			$(element).addClass("numble-original");
			$(element).hide();

			// Inject a new element into the page to handle the display control of the numbers
			$(element).after("<div class=\"numble-control\"></div>");
			var control = $(element).siblings(".numble-control");

			// bind to change event of the input to update the new control
			$(element).change(function() {
				numble.debugMessage("change detected: " + $(this).val());
				var control = $(this).siblings(".numble-control");
				control.text($(this).val());
				// replace the controls on change
				numble.addButtons(this, numble.settings);
			});

			// Display the original value of the control
			var originalValue = this.getIntialValue(element, settings);
			numble.debugMessage("original value " + originalValue);
			$(element).val(originalValue);
			$(element).change();

			// bind the mouse wheel to the control
			control.bind("mousewheel DOMMouseScroll", function(e) {
				if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
					numble.debugMessage("received scroll up event");
					numble.incrementValue(element);
				} else {
					numble.debugMessage("received scroll down event");
					numble.decrementValue(element, settings);
				}
				e.preventDefault();
			});

			// add up and down arrows
			this.addButtons(this.element, this.settings);

		},
		addButtons: function(element, settings) {
			var numble = this;
			if(settings.includeButtons){
				var n = $(element).siblings(".numble-control");
				n.append("<span class=\"numble-increment numble-arrow\">&#x25B2;</span>");
				n.append("<span class=\"numble-decrement numble-arrow\">&#x25BC;</span>");

				n.find(".numble-increment").click(function(){
					numble.incrementValue(element);
				});

				n.find(".numble-decrement").click(function(){
					numble.decrementValue(element, settings);
				});
			}
		},
		incrementValue: function(element) {
			var val = parseInt($(element).val()) || 0;
			if(this.settings.maxValue){
				if(val < this.settings.maxValue){
					val++;
					$(element).val(val).trigger("change");
					this.debugMessage("incrementing to " + val);
				}else{
					this.debugMessage("maxValue set to " + this.settings.maxValue);
				}
			}else{
				val++;
				$(element).val(val).trigger("change");
				this.debugMessage("incrementing to " + val);
			}
		},
		decrementValue: function(element, settings) {
			var val = parseInt($(element).val()) || 0;
			// can we decrement?
			var canDecrement = false;

			if(settings.minValue){
				if(val > settings.minValue){
					canDecrement = true;
				}else{
					canDecrement = false;
					this.debugMessage("minValue set to " + settings.minValue);
				}
			}else{
				if(val === 0){
					if(!settings.allowNegative){
						canDecrement = false;
						this.debugMessage("allowNegative set to false");
					}else{
						canDecrement = true;
					}
				}else{
					canDecrement = true;
				}
			}

			if(canDecrement){
				val--;
				$(element).val(val).trigger("change");
				this.debugMessage("decrementing to " + val);
			}

		},
		getIntialValue: function(element, settings){
			var val = parseInt($(element).val()) || 0;
			if(val === 0){
				val = parseInt(settings.initialValue) || 0;
			}
			return val;
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
