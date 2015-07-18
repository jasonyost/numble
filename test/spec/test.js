(function() {
	'use strict';

	describe('.numble()', function() {

		describe('init', function() {
			it('should add .numble-original class to the element', function() {
				expect($('.numble-original')).toBeInDOM();
			});

			it('should hide the display of the original control', function() {
				expect($('.numble-original')).toBeHidden();
			});

			it('should inject a display control into the page', function() {
				expect($('.numble-control')).toBeInDOM();
			});

			describe('given an existing numerical value', function() {
				it('should display the value in the new element', function() {
					// expect($('.value')).toContainText('42');
          pending();
				});
			});

      describe('given no original value', function(){
        it('should set the initial number to zero', function(){
          expect($('.no-value')).toContainText('0');
        });
      });

      // FIXME Need to test the scroll event on the mouse, the code is working but I am unable to
      // determine how to send the mouse wheel event to the page
			describe('mouse wheel control', function() {

				describe('in Firefox', function() {
					it('should bind the element to the DOMMouseScroll event', function() {

            // var scrollEvent = spyOnEvent('.numble-control', 'DOMMouseScroll');
						// window.ChromeWheel = function() {
						// 	var evt = document.createEvent("MouseEvents");
						// 	evt.initMouseEvent(
						// 		'DOMMouseScroll', // in DOMString typeArg,
						// 		true, // in boolean canBubbleArg,
						// 		true, // in boolean cancelableArg,
						// 		window, // in views::AbstractView viewArg,
						// 		120, // in long detailArg,
						// 		0, // in long screenXArg,
						// 		0, // in long screenYArg,
						// 		0, // in long clientXArg,
						// 		0, // in long clientYArg,
						// 		0, // in boolean ctrlKeyArg,
						// 		0, // in boolean altKeyArg,
						// 		0, // in boolean shiftKeyArg,
						// 		0, // in boolean metaKeyArg,
						// 		0, // in unsigned short buttonArg,
						// 		null // in EventTarget relatedTargetArg
						// 	);
						// 	$('.numble-control').dispatchEvent(evt);
						// }
            // $('.numble-control').trigger("DOMMouseScroll");
            // expect("DOMMouseScroll").toHaveBeenTriggeredOn('.numble-control');
            // expect(scrollEvent).toHaveBeenTriggered();
            pending();
					});
				});

        describe('in Webkit', function(){
          it('should bind to the mousewheel event', function(){
            pending();
          });
        });

			});
		});

	});
})();
