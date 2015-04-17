/* --------------------------------------------------------
Uses CodeKit compiler - http://incident57.com/codekit

IMPORTS
@codekit-prepend "jquery-1.11.1.min.js"; 

-------------------------------------------------------- */ 

jQuery(document).ready(function($) {

    // No-JS 
	$('html').removeClass('no-js').addClass('js');
	
	// Add article tag wrappers around blocks based on the H1 tags Hologram outputs.	
	$('.main-content > h1').each(function() {
    	$(this).nextUntil('h1, .styleguide-footer').addBack().wrapAll('<article class="styleguide-block" />');
    	
	});
	
	
	
});	
	