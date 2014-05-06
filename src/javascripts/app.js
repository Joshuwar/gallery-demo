
jQuery(document).ready(function($) {
	
	leftOffset     = 0;		// starting var
	gutterWidth    = 20;	// in px
	transitionTime = 300;   // in ms

	/*
	// set size of gallery-strip so we can start in the middle

	var galleryWidth = 0;
	
	// loop over the children of the strip, adding their widths to the var
	$('.gallery-strip').children('a').each(function() {
		galleryWidth += $(this).width() + gutterWidth;
	});
	*/
	galleryWidth = 0;
	galleryWidth = $('.image-wrapper').width();
	alert(galleryWidth);




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

			leftOffset += $(this).siblings('.open').width() + gutterWidth;
			//$(this).parents('.image-wrapper').css('left', - leftOffset); 									//- uses left
			$(this).parents('.image-wrapper').css({"transform":"translate("+-leftOffset+"px,"+0+"px)"});	//- uses translate
			$(this).siblings('.open').removeClass('open');
			$(this).addClass('open');
		}
	});

	// Close overlay
	$('.overlay').click(function() {
		event.preventDefault();
		
		setTimeout(function(){
			$('.overlay a').html("");
		},transitionTime);

		$(this).parents('.wrapper').removeClass('open');
		
	});




	});