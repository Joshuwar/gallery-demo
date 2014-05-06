
jQuery(document).ready(function($) {

	
	leftOffset = 0;

	// Gallery behaviour
	$('.gallery-strip a').click(function() {

		if ($(this).hasClass('open')) {

			// Open big image in overlay

			event.preventDefault();
			// get address of linked file
			var imgLink = $(this).attr('href');
			var imgHtml = '<img src='+imgLink+'>';

			// add file to overlay div
			$('.overlay a').append(imgHtml);

			// add class to wrapper to transition overlay div
			$(this).parents('.wrapper').addClass('open');

		} else { 

			// move gallery to next image, change open class in strip

			event.preventDefault();

			leftOffset += $(this).siblings('.open').width() + 20;
			//$(this).parents('.image-wrapper').css('left', - leftOffset); 									//- uses left
			$(this).parents('.image-wrapper').css({"transform":"translate("+-leftOffset+"px,"+0+"px)"});	//- uses translate
			$(this).siblings('.open').removeClass('open');
			$(this).addClass('open');
		}
	});

	// Close overlay
	$('.overlay, .overlay a').click(function() {
		event.preventDefault();
		$(this).parents('.wrapper').removeClass('open');
		$('.overlay a').html("");
	});




	});