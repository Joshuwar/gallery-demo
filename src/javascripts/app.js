/*
  behaviour:
  - increment through blocks of thumbnails based on whether they are currently on screen or not
  - left / right arrows on thumbnail gallery - click to kick off increment described above
  - left / right arrows on big images - click to swap out the big image for the next one; thumbnail gallery stays the same
*/
jQuery(document).ready(function($) {
	
	leftOffset     = 0;		// starting var
	gutterWidth    = 20;	// in px
	transitionTime = 300;   // in ms
	galleryWidth   = $('.image-wrapper').width();
	imgLink		   = "";
	
	var windowWidth = $(window).width();
	
	// Move thumbnail strip left or right to put the left (or right) most image up against the left of the sreen
	$('.gallery-strip .arrow').click(function(event) {
	  var direction = $(this).hasClass('right') ? 1 : -1; // direction = 1 for right and -1 for left, used as a multiplier later

    // figure out which image is half-on, half-off the side of the screen (in the direction we are scrolling)
    var edgeImage;
    
    $('.gallery-strip img').each(function(i, img) {
      var leftSidePos = $(img).offset().left,
        rightSidePos = leftSidePos + $(img).width();
      // the image is half-on, half-off (the invisible reflected window) if its left side offset is smaller than the negative width of the window
      // but its right side offset is larger than the negative width of the window
      if(leftSidePos < direction*windowWidth && rightSidePos >= direction*windowWidth) {
        edgeImage = img;
        return false;
      }
    });
    
    // if we haven't found a half-on, half-off image...
    if(!edgeImage) {
      if(direction < 0) {
        // scroll back to the first image in the gallery
        edgeImage = $('.gallery-strip img').eq(0);  
      } else {
        // don't scroll the gallery
        return false;
      }
    }
    // at this point, edgeImage is set to the image we need to move to the left of the screen
    // the place we want to move the image-wrapper to is the offset of the edgeImage minus the current offset of the image-wrapper i.e. the sum of them. Also allow for a gutter
    leftOffset = $(edgeImage).offset().left - $('.image-wrapper').offset().left - gutterWidth;
    $(this).siblings('.image-wrapper').css({"transform":"translate("+-leftOffset+"px,"+0+"px)"});	//- uses translate
	});

	// Open large image when clicking on thumbnail
	$('.image-wrapper a').click(function(event) {
		// Open big image in overlay
		event.preventDefault();
		// get address of linked file
		var imgLink = $(this).attr('href');
		var imgHtml = '<img src='+imgLink+'>';

		// add file to overlay div
		$('.overlay div.overlay-image-wrapper div').append(imgHtml);

		// add class to wrapper to transition overlay div
		$(this).parents('.wrapper').addClass('open');
	});

	// Close overlay
/*	$('.overlay').click(function(event) {
		event.preventDefault();
		
		setTimeout(function(){
			$('.overlay div.overlay-image-wrapper div').html("");
		},transitionTime);

		$(this).parents('.wrapper').removeClass('open');
		
	});*/

	// Overlay Image Next/Previous controls & transitions
	$('.overlay .arrow').click(function(event) {
		event.preventDefault();
		var direction = $(this).hasClass('right') ? 1 : -1; // direction = 1 for right and -1 for left, used as a multiplier later

		// get current image displayed
		currentImage = $(this).siblings('div').children('img').attr('src');


		// work out next image

		// get each image
		$('.image-wrapper a').each(function(i, imgLink) {
			
			// get imgLink href
			imgHref = $(imgLink).attr('href');

			// if imgLink.href matches currentImage		
			if (imgHref == currentImage) {
				// get href of next image, set nextImage var
				if (direction > 0) {
					nextImage = $(imgLink).next('a').attr('href');
				} else {
					nextImage = $(imgLink).prev('a').attr('href');
				}
			} 
		});

		// add file to overlay div after transition time
		$(this).parents('.wrapper').removeClass('open');

		setTimeout(function(){
			alert('running timeout');
			var imgHtml = '<img src='+nextImage+'>';
			$('.overlay div.overlay-image-wrapper div').append(imgHtml);
			$(this).parents('.wrapper').addClass('open');
		},transitionTime*1.1);



		


		



	});





	});