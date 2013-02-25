// globals
var maxDepth = 15;
var mouseX = Math.round($(window).width() * 0.5);
var mouseY = Math.round($(window).height() * 0.5);
var currentContainer;
var openContainerSize = '500px';
var animationDuration = 400;
var animationDelay = 100;

// methods
function generateFlake() {
	
	var x = -10 + Math.round(Math.random() * 110) + '%';
	var y = -10 + Math.round(Math.random() * 110) + '%';
	var depth = 1 + Math.ceil(Math.pow(Math.random(), 3) * maxDepth);
	var color = 200 + Math.round((1 - (depth / maxDepth)) * 50);
	var rgb = 'rgb(' + color + ', ' + color + ', ' + color + ')';
	var size = (depth / maxDepth) * 200;
	var flake = document.createElement('div');
	
	$(flake).addClass('flake');
	$(flake).css({
		'position':				'absolute',
		'left':					x,
		'top':					y,
		'z-index':				depth,
		'background-color':		rgb,
		'height':				size,
		'width':				size,
		'display':				'none',
		'opacity':				0.25,
		'border-radius':		'0px',
	});
	if (depth > 5 && Math.random() < 0.05) {
		$(flake).css({
		'background-color':		'#FC0',
		'opacity':				0.75,
	});
	}
	moveFlake(flake, mouseX, mouseY);
	$('body').append(flake);
	
	$(flake).fadeIn(1000);
	var movement = '-=' + (depth * 20);
	$(flake).animate({top: movement}, {duration: 15000, easing: 'linear', queue: false});
	$(flake).bind('click', function(event) {
		$(flake).css({
			'background-color': '#FC0',
			'opacity': 0.75,
		});
	});
	setTimeout(function() {
		$(flake).animate({opacity: 0}, {duration: 1000, queue: false, complete: function() {
			$(flake).remove();
		}});
	}, 15000 - 1000);
	
}

function moveFlake(flake, mouseX, mouseY) {
	
	var gazeX = 0 - ($(window).width() * 0.5 - mouseX) / ($(window).width() * 0.5);
	var gazeY = 0 - ($(window).height() * 0.5 - mouseY) / ($(window).height() * 0.5);
	
	var depth = $(flake).css('z-index');
	var shiftX = (maxDepth - depth) * maxDepth * 3 * gazeX;
	var shiftY = (maxDepth - depth) * maxDepth * 1.5 * gazeY;
	$(flake).css({
		'margin-left':	shiftX,
		'margin-top':	shiftY,
	});
	
}

function moveFlakes(flakes, mouseX, mouseY) {
	
	var gazeX = 0 - ($(window).width() * 0.5 - mouseX) / ($(window).width() * 0.5);
	var gazeY = 0 - ($(window).height() * 0.5 - mouseY) / ($(window).height() * 0.5);
	
	for (var i = 0; i < flakes.length; i++) {
		flake = flakes[i];
		var depth = $(flake).css('z-index');
		var shiftX = (maxDepth - depth) * maxDepth * 3 * gazeX;
		var shiftY = (maxDepth - depth) * maxDepth * 1.5 * gazeY;
		$(flake).css({
			'margin-left':	shiftX,
			'margin-top':	shiftY,
		});
	}
	
}

function switchContainer(newContainer) {
	
	if (currentContainer != null && $(currentContainer).attr('id') != $(newContainer).attr('id')) {
		
		// prepare
		var oldContainer = currentContainer;
		currentContainer = null;
		$(newContainer).removeClass('link');
		
		// fade out content
		$(oldContainer).children('div#back').animate({opacity: 0}, animationDuration, function() {
			$(oldContainer).children('div#back').css('display', 'none');
		});
		$(newContainer).children('div#front').animate({opacity: 0}, animationDuration, function() {
			$(newContainer).children('div#front').css('display', 'none');
		});
		
		// move and resize
		var oldContainerSize = $(oldContainer).attr('size') + 'px';
		setTimeout(function() {
			$(oldContainer).animate({
				width: oldContainerSize,
				height: oldContainerSize,
				left: $(newContainer).css('left'),
				top: $(newContainer).css('top'),
				zIndex: $(newContainer).css('z-index'),
				marginLeft: $(newContainer).css('margin-left'),
				marginTop: $(newContainer).css('margin-top'),
			}, {'duration': animationDuration, specialEasing: {
				width: 'swing',
				height: 'swing',
				left: 'easeInQuad',
				top: 'easeInQuad',
				zIndex: 'easeInQuad',
				marginLeft: 'easeInQuad',
				marginTop: 'easeInQuad',
			}});
			$(newContainer).animate({
				width: openContainerSize,
				height: openContainerSize,
				left: $(oldContainer).css('left'),
				top: $(oldContainer).css('top'),
				zIndex: $(oldContainer).css('z-index'),
				marginLeft: $(oldContainer).css('margin-left'),
				marginTop: $(oldContainer).css('margin-top'),
			}, {'duration': animationDuration, specialEasing: {
				width: 'swing',
				height: 'swing',
				left: 'easeInQuad',
				top: 'easeInQuad',
				zIndex: 'easeInQuad',
				marginLeft: 'easeInQuad',
				marginTop: 'easeInQuad',
			}});
			
			// fade int
			setTimeout(function() {
				$(oldContainer).children('div#front').css('display', 'block');
				$(newContainer).children('div#back').css('display', 'block');
				$(oldContainer).children('div#front').animate({opacity: 1}, animationDuration);
				$(newContainer).children('div#back').animate({opacity: 1}, animationDuration);
				
				// finalize
				setTimeout(function() {
					currentContainer = newContainer;
					$(oldContainer).addClass('link');
				}, animationDuration);
				
			}, animationDuration + animationDelay);
			
		}, animationDuration + animationDelay);
		
	}
}

function placeContainers() {
	
	var logoSize = parseInt($('div#logo').css('height'));
	var logoX = Math.round(($(window).width() * 0.15) - (logoSize * 0.5));
	var logoY = Math.round(($(window).height() * 0.25) - (logoSize * 0.5));
	$('div#logo').css({
		'left': logoX,
		'top': logoY,
	});
	$('div#logo').bind('click', function() {
		switchContainer($('div#logo').get());
	});
	
	var pitchSize = parseInt($('div#pitch').css('height'));
	var pitchX = Math.round(($(window).width() * 0.5) - (pitchSize * 0.5));
	var pitchY = Math.round(($(window).height() * 0.5) - (pitchSize * 0.5));
	$('div#pitch').css({
		'left': pitchX,
		'top': pitchY,
	});
	$('div#pitch div#front').css({'display': 'none', 'opacity': 0});
	$('div#pitch div#back').css({'display': 'block', 'opacity': 1});
	$('div#pitch').bind('click', function() {
		switchContainer($('div#pitch').get());
	});
	
	var contactSize = parseInt($('div#contact').css('height'));
	var contactX = Math.round(($(window).width() * 0.85) - (contactSize * 0.5));
	var contactY = Math.round(($(window).height() * 0.75) - (contactSize * 0.5));
	$('div#contact').css({
		'left': contactX,
		'top': contactY,
	});
	$('div#contact').bind('click', function() {
		switchContainer($('div#contact').get());
	});
	
	var showcaseSize = parseInt($('div#showcase').css('height'));
	var showcaseX = Math.round(($(window).width() * 0.1) - (showcaseSize * 0.5));
	var showcaseY = Math.round(($(window).height() * 0.85) - (showcaseSize * 0.5));
	$('div#showcase').css({
		'left': showcaseX,
		'top': showcaseY,
	});
	$('div#showcase').bind('click', function() {
		switchContainer($('div#showcase').get());
	});
	
}

function updateFlakeCounter() {
	var numFlakes = "" + $('.flake').get().length;
	$('div#flake_counter').text(numFlakes);
}

function bindProjectDescriptions() {
	$('div.project').bind('mouseover', function(event) {
		$(this).children('div.title').animate({'opacity': 0}, 300);
		$(this).children('div.description').animate({'opacity': 0.9}, 300);
	});
	$('div.project').bind('mouseout', function(event) {
		$(this).children('div.title').animate({'opacity': 0.9}, 300);
		$(this).children('div.description').animate({'opacity': 0}, 300);
	});
}

function bindFormWarnings() {
	$('form#contact_form input#contact_name').bind('blur', function() {
		if(!$(this).val()) {
			$(this).addClass('warning');
		} else {
			$(this).removeClass('warning');
		}
	});
	$('form#contact_form input#contact_email').bind('blur', function() {
		if(!$(this).val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i)) {
			$(this).addClass('warning');
		} else {
			$(this).removeClass('warning');
		}
	});
	$('form#contact_form textarea#contact_message').bind('blur', function() {
		if(!$(this).val()) {
			$(this).addClass('warning');
		} else {
			$(this).removeClass('warning');
		}
	});
}

function submitContactForm() {
	var valid = true;
	if (!$('form#contact_form input#contact_name').val()) {
		$('form#contact_form input#contact_name').addClass('warning');
		$('form#contact_form input#contact_name').effect('shake', {distance: 10, times: 2});
		valid = false;
	} if (!$('form#contact_form input#contact_email').val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i)) {
		$('form#contact_form input#contact_email').addClass('warning');
		$('form#contact_form input#contact_email').effect('shake', {distance: 10, times: 2});
		valid = false;
	} if (!$('form#contact_form textarea#contact_message').val()) {
		$('form#contact_form textarea#contact_message').addClass('warning');
		$('form#contact_form textarea#contact_message').effect('shake', {distance: 10, times: 2});
		valid = false;
	}
	
	if (valid) {
		$('form#contact_form').submit();
	}
}

// constructor
$(document).bind('ready', function() {
	
	placeContainers();
	currentContainer = $('div#pitch').get();
	
	bindProjectDescriptions();
	
	bindFormWarnings();
	
	setInterval(function() {
		generateFlake();
		updateFlakeCounter();
	}, 100);
	
	$(this).bind('mousemove', function(event) {
		mouseX = event.pageX;
		mouseY = event.pageY;
		moveFlakes($('div.flake').get(), mouseX, mouseY);
	});
	
});