(function() {
	'use strict';

	describe('.numble()', function() {

		jasmine.getFixtures().fixturesPath = 'test/spec/fixtures';

		var testInput, testControl;

		beforeEach(function() {
			loadFixtures('numblefixture.html');
			testInput = $('.default-test');
			testInput.numble();
			testControl = testInput.siblings('.numble-control');
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
					expect(testControl).toContainText('0');
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

		});

	});

})();
