(function() {
	'use strict';

	describe('.numble()', function() {

		jasmine.getFixtures().fixturesPath = 'spec/fixtures';

		var testInput, testControl, testValue;

		beforeEach(function() {
			loadFixtures('numblefixture.html');
			testInput = $('.default-test');
			testInput.numble();
			testControl = testInput.siblings('.numble-control');
			testValue = testControl.find(".numble-value");
		});

		afterEach(function(){
			$('#test-container').remove();
		});

		describe('init', function() {
			it('should wrap the original element in a div.numble-wrapper', function(){
				expect(testInput.parent()).toBeInDOM();
				expect(testInput.parent()).toHaveClass('numble-wrapper');
			});

			it('should add .numble-original class to the element', function() {
				expect(testInput).toHaveClass('numble-original');
			});

			it('should hide the display of the original control', function() {
				expect(testInput).toBeHidden();
			});

			it('should inject a display control into .numble-wrapper', function() {
				expect(testInput.siblings()).toBeInDOM();
				expect(testInput.siblings()).toHaveClass('numble-control');
				expect(testControl.parent()).toHaveClass('numble-wrapper');
			});

			it("should inject a value control into .numble-control", function(){
				expect($('.numble-control')).toContainElement(".numble-value");
			});

			describe('given an existing numerical value', function() {
				it('should display the value in the new element', function() {
					testInput = $('.existing-test');
					testInput.numble();
					testControl = testInput.siblings('.numble-control');
					expect(testControl).toContainText('42');
				});
			});

			describe('given no original value', function() {
				it('should set the initial number to zero', function() {
					expect(testValue).toContainText('0');
				});
			});

			describe("given a disabled control", function(){
				("it should not allow the value to be changed", function(){
					testInput = $('.disabled-test');
					testControl = testInput.siblings('.numble-control');
					testValue = testControl.find(".numble-value");

					testControl.find('.numble-decrement').click();
					expect(testControl).toContainText("0");

					testControl.find('.numble-increment').click();
					expect(testControl).toContainText("0");

					expect(testValue).not.toHaveAttr("contenteditable");

					var scrollEvent = spyOnEvent(testControl, 'DOMMouseScroll');
					var e = jQuery.Event( "DOMMouseScroll",{originalEvent: {detail:-1}, type: "DOMMouseScroll", which: 1, target: testInput, currentTarget: testInput} );

					testControl.trigger(e);
					expect(testControl).toContainText("0");
				});
			});

			describe('mouse wheel control', function() {

				describe('in Firefox', function() {
					it('should bind the element to the DOMMouseScroll event', function() {
						var scrollEvent = spyOnEvent(testControl, 'DOMMouseScroll');
						var e = jQuery.Event( "DOMMouseScroll",{originalEvent: {detail:-1}, type: "DOMMouseScroll", which: 1, target: testInput, currentTarget: testInput} );

            testControl.trigger(e);
            expect("DOMMouseScroll").toHaveBeenTriggeredOn(testControl);
            expect(scrollEvent).toHaveBeenTriggered();
					});
				});

				describe('in Webkit', function() {
					it('should bind to the mousewheel event', function() {
						var scrollEvent = spyOnEvent(testControl, 'mousewheel');
						var e = jQuery.Event( "mousewheel",{originalEvent: {wheelDelta:1}, type: "mousewheel", which: 1, target: testInput, currentTarget: testInput} );

            testControl.trigger(e);
            expect("mousewheel").toHaveBeenTriggeredOn(testControl);
            expect(scrollEvent).toHaveBeenTriggered();
					});
				});
			});
		});

		describe('addButtons', function() {
			describe('up arrow', function() {
				it('should add an arrow in the up direction to the control', function() {
					expect(testControl).toContainElement('.numble-increment');
				});

				describe('when clicked', function() {
					it('should increment the value', function() {
						testControl.find('.numble-increment').click();
						expect(testControl).toContainText("1");
					});
				});
			});

			describe('down arrow', function() {
				it('should add an arrow in the down direction to the control', function() {
					expect(testControl).toContainElement('.numble-decrement');
				});

				describe('when clicked', function() {
					it('should decrement the value', function() {
						testControl.find('.numble-decrement').click();
						expect(testControl).toContainText("-1");
					});
				});

			});
		});

		describe("contenteditable", function(){
			it("should allow the value of .numble-control to be edited", function(){
				expect(testValue).toHaveAttr("contenteditable");

				var evt = spyOnEvent(testControl, 'keydown');
				var e = jQuery.Event( "keydown",{type: "keydown", keyCode: 49} );

				testValue.text("1");
				testValue.trigger(e);
				testValue.trigger("blur");

				expect("keydown").toHaveBeenTriggeredOn(testControl);
				expect(evt).toHaveBeenTriggered();
				expect(testInput).toHaveValue("1");
			});
		});

		describe('settings', function() {

			describe('includeButtons', function() {
				describe('given the setting of false', function() {
					it('should not add buttons to the control', function() {
						testInput = $('.settings-test');
						testInput.numble({includeButtons:false});
						testControl = testInput.siblings('.numble-control');
						expect(testControl).not.toContainElement('.numble-increment');
						expect(testControl).not.toContainElement('.numble-decrement');
					});
				});
			});

			describe('allowNegative', function() {
				describe('given the setting of false', function() {
					it('should not allow the number to be decremented into a negative', function() {
						testInput = $('.settings-test');
						testInput.numble({allowNegative:false});
						testControl = testInput.siblings('.numble-control');
						testControl = testInput.siblings('.numble-control');
						testControl.find('.numble-decrement').click();
						expect(testControl).toContainText("0");
					});
				});
			});

			describe('maxValue', function(){
				describe('given a maximum value', function(){
					it('should not allow the number to be incremented past the maxValue', function(){
						testInput = $('.minmax-val-test');
						testInput.numble({maxValue:5});
						testControl = testInput.siblings('.numble-control');
						testControl.find('.numble-increment').click();
						expect(testInput).toHaveValue("5");
					});
				});
			});

			describe('minValue', function() {
				describe('given a maximum value', function() {
					it('should not allow the number to be decremented into a past the minValue', function() {
						testInput = $('.minmax-val-test');
						testInput.numble({minValue:5});
						testControl = testInput.siblings('.numble-control');
						testControl.find('.numble-decrement').click();
						expect(testInput).toHaveValue("5");
					});
				});
			});

			describe('initalValue', function(){
				describe('given an intial value', function(){
					describe('given a field without an existing value', function(){
						it('should set the initial value of .numble-control to initialValue', function(){
							testInput = $('.settings-test');
							testInput.numble({initialValue:42});
							testControl = testInput.siblings('.numble-control');
							expect(testControl).toContainText("42");
							expect(testInput).toHaveValue("42");
						});
					});
				});
			});

			describe("given minimum and initial values", function(){
				it("should allow the decrement of the initial value to the minimum", function(){
					testInput = $('.settings-test');
					testInput.numble({initialValue:3,minValue:2,maxValue:4});
					testControl = testInput.siblings('.numble-control');

					testControl.find('.numble-decrement').click();
					expect(testInput).toHaveValue("2");

					testControl.find('.numble-decrement').click();
					expect(testInput).toHaveValue("2");

					testControl.find('.numble-increment').click();
					expect(testInput).toHaveValue("3");

					testControl.find('.numble-increment').click();
					expect(testInput).toHaveValue("4");

					testControl.find('.numble-increment').click();
					expect(testInput).toHaveValue("4");
				});
			});

			describe("allowScroll", function(){
				describe("given a value of false", function(){
					it("should not bind the control to a scroll event", function(){
						var scrollEvent = spyOnEvent(testControl, 'DOMMouseScroll');
						var e = jQuery.Event( "DOMMouseScroll",{originalEvent: {detail:-1}, type: "DOMMouseScroll", which: 1, target: testInput, currentTarget: testInput} );

						testInput = $('.settings-test');
						testInput.numble({allowScroll:false});
						testControl = testInput.siblings('.numble-control');
            testControl.trigger(e);
            expect("DOMMouseScroll").not.toHaveBeenTriggeredOn(testControl);
            expect(scrollEvent).not.toHaveBeenTriggered();
					})
				})
			});

			describe("incrementText", function(){
				describe("given the default value of &#x25B2;", function(){
					it("should dispay the default value", function(){
						expect(testControl.find(".numble-increment")).toHaveHtml("&#x25B2;");
					});
				});

				describe("given an alternate value", function(){
					it("should display the alternate value", function(){
						testInput = $('.settings-test');
						testInput.numble({incrementText:"up"});
						testControl = testInput.siblings('.numble-control');
						expect(testControl.find(".numble-increment")).not.toContainHtml("&#x25B2;");
						expect(testControl.find(".numble-increment")).toContainHtml("up");
					});
				});
			});

			describe("decrementText", function(){
				describe("given a default value of &#x25BC;", function(){
					it("should display the default value", function(){
						expect(testControl.find(".numble-decrement")).toHaveHtml("&#x25BC;");
					});
				});

				describe("given an alternate value", function(){
					it("should display the alternate value", function(){
						testInput = $('.settings-test');
						testInput.numble({decrementText:"down"});
						testControl = testInput.siblings('.numble-control');
						expect(testControl.find(".numble-decrement")).not.toContainHtml("&#x25BC;");
						expect(testControl.find(".numble-decrement")).toContainHtml("down");
					});
				});
			});

			describe("allowEdit", function(){
				describe("given a value of false", function(){
					it("should not set .numble-control to contenteditable", function(){
						testInput = $('.settings-test');
						testInput.numble({allowEdit:false});
						testControl = testInput.siblings('.numble-control');
						expect(testControl).not.toHaveAttr("contenteditable");
					});
				});
			});

			describe("hideControlsOnMinMax", function(){

				describe("given a value of false", function(){

					describe("given a control with a max value", function(){
						it("should not add display:none to the .numble-increment control", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({maxValue:5});
							testControl = testInput.siblings('.numble-control');
							expect(testControl.find('.numble-increment')).toBeVisible();
						});
					});

					describe("given a control with a min value", function(){
						it("should not add display:none to the .numble-decrement control", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({minValue:5});
							testControl = testInput.siblings('.numble-control');
							expect(testControl.find('.numble-decrement')).toBeVisible();
						});
					});

				});

				describe("given a value of true", function(){

					describe("given a control with a max value which is set to the max value", function(){

						it("should add display:none to the .numble-increment control", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({maxValue:5,hideButtonsOnMinMax:true});
							testControl = testInput.siblings('.numble-control');
							expect(testControl.find('.numble-increment')).not.toBeVisible();
						});

						it("should remove display:none on decrement", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({maxValue:5,hideButtonsOnMinMax:true});
							testControl = testInput.siblings('.numble-control');
							testControl.find('.numble-decrement').click();
							expect(testControl.find('.numble-increment')).toBeVisible();
						});

					});

					describe("given a control with a min value which is set to the min-value", function(){

						it("should add display:none to the .numble-decrement control", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({minValue:5,hideButtonsOnMinMax:true});
							testControl = testInput.siblings('.numble-control');
							expect(testControl.find('.numble-decrement')).not.toBeVisible();
						});

						it("should remove display:none on increment", function(){
							testInput = $('.minmax-val-test');
							testInput.numble({minValue:5,hideButtonsOnMinMax:true});
							testControl = testInput.siblings('.numble-control');
							testControl.find('.numble-increment').click();
							expect(testControl.find('.numble-decrement')).toBeVisible();
						});

					});

				});

			});

		});

		describe("api", function(){

			describe("incrementable", function(){
				it("should expose the canIncrement API", function(){
					var can = $('.default-test').data("plugin_numble").incrementable();
					expect(can).toBe(true);
				});
			});

			describe("decrementable", function(){
				it("should expose the canDecrement API", function(){
					testInput = $('.minmax-val-test');
					testInput.numble({minValue:5});
					var can = testInput.data("plugin_numble").decrementable();
					expect(can).toBe(false);
				});
			});

		});

	});

})();
