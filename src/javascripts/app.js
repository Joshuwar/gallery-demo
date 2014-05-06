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
	
	var windowWidth = $(window).width();
	
	// Move thumbnail strip left or right to put the left (or right) most image up against the left of the sreen
	$('.gallery-strip .arrow').click(function(event) {
	  var direction = $(this).hasClass('right') ? 1 : -1;

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
	$('.gallery-strip a').click(function(event) {
		// Open big image in overlay
		event.preventDefault();
		// get address of linked file
		var imgLink = $(this).attr('href');
		var imgHtml = '<img src='+imgLink+'>';

		// add file to overlay div
		$('.overlay a').append(imgHtml);

		// add class to wrapper to transition overlay div
		$(this).parents('.wrapper').addClass('open');
	});

	// Close overlay
	$('.overlay').click(function(event) {
		event.preventDefault();
		
		setTimeout(function(){
			$('.overlay a').html("");
		},transitionTime);

		$(this).parents('.wrapper').removeClass('open');
		
	});




	});