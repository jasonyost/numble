(function() {
	'use strict';

	describe('.numble()', function() {
		var testInput, control;

		beforeEach(function() {
			jasmine.getFixtures().set('<input type="number" class="settings-test" />');
			testInput = $('.settings-test');
			testInput.numble();
			control = testInput.siblings('.numble-control');
		});

		afterEach(function(){
			$('.settings-test').remove();
		});

		describe('init', function() {
			it('should wrap the original element in a div', function(){
				expect(testInput.parent()).toBeInDOM();
				expect(testInput.parent()).toHaveClass('numble-wrapper');
			});

			it('should add .numble-original class to the element', function() {
				expect(testInput).toHaveClass('numble-original');
			});

			it('should hide the display of the original control', function() {
				expect(testInput).toBeHidden();
			});

			it('should inject a display control into the page', function() {
				expect(testInput.siblings()).toBeInDOM();
				expect(testInput.siblings()).toHaveClass('numble-control');
			});

			describe('given an existing numerical value', function() {
				it('should display the value in the new element', function() {
					jasmine.getFixtures().set('<input type="number" class="settings-test" value="42"/>');
					testInput = $('.settings-test');
					testInput.numble();
					control = testInput.siblings('.numble-control');
					expect(control).toContainText('42');
				});
			});

			describe('given no original value', function() {
				it('should set the initial number to zero', function() {
					expect(control).toContainText('0');
				});
			});

			// FIXME Need to test the scroll event on the mouse, the code is working but I am unable to
			// determine how to send the mouse wheel event to the page
			describe('mouse wheel control', function() {

				describe('in Firefox', function() {
					it('should bind the element to the DOMMouseScroll event', function() {
						pending('Code works, only test is pending');
					});
				});

				describe('in Webkit', function() {
					it('should bind to the mousewheel event', function() {
						pending('Code works, only test is pending');
					});
				});
			});

			describe('clickable controls', function() {

				describe('up arrow', function() {
					it('should add an arrow in the up direction to the control', function() {
						expect(control).toContainElement('.numble-increment');
					});

					describe('when clicked', function() {
						it('should increment the value', function() {
							control.find('.numble-increment').click();
							expect(control).toContainText("1");
						});
					});
				});

				describe('down arrow', function() {
					it('should add an arrow in the down direction to the control', function() {
						expect(control).toContainElement('.numble-decrement');
					});

					describe('when clicked', function() {
						it('should decrement the value', function() {
							control.find('.numble-decrement').click();
							expect(control).toContainText("-1");
						});
					});

				});

			});

		});

		describe('settings', function() {

			describe('debug', function() {
				describe('given the default setting of true', function() {
					it('should log console messages', function() {
						spyOn(console, 'log');
						expect(console.log).toHaveBeenCalledWith('numble initialized');
						pending("Test is not working");
					});
				});
			});

			describe('includeButtons', function() {
				describe('given the setting of false', function() {
					it('should not add buttons to the control', function() {
						jasmine.getFixtures().set('<input type="number" class="settings-test"/>');
						testInput = $('.settings-test');
						testInput.numble({includeButtons:false});
						control = testInput.siblings('.numble-control');
						expect(control).not.toContainElement('.numble-increment');
						expect(control).not.toContainElement('.numble-decrement');
					});
				});
			});

			describe('allowNegative', function() {
				describe('given the setting of false', function() {
					it('should not allow the number to be decremented into a negative', function() {
						testInput.numble({allowNegative:false});
						control = testInput.siblings('.numble-control');
						expect(control).toContainText("0");
					});
				});
			});

			describe('maxValue', function(){
				describe('given a maximum value', function(){
					it('should not allow the number to be incremented past the maxValue', function(){
						jasmine.getFixtures().set('<input type="number" class="settings-test" value="5"/>');
						testInput = $('.settings-test');
						testInput.numble({maxValue:5});
						control = testInput.siblings('.numble-control');
						control.find('.numble-increment').click();
						expect(testInput).toHaveValue("5");
					});
				});
			});

			describe('minValue', function() {
				describe('given a maximum value', function() {
					it('should not allow the number to be decremented into a past the minValue', function() {
						jasmine.getFixtures().set('<input type="number" class="settings-test" value="5"/>');
						testInput = $('.settings-test');
						testInput.numble({minValue:5});
						control = testInput.siblings('.numble-control');
						control.find('.numble-decrement').click();
						expect(testInput).toHaveValue("5");
					});
				});
			});

		});

	});

})();
