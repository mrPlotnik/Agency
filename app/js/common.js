$(document).ready(function() {

	$(".right-col ul li img").hide();

	$(".right-col ul li").hover(
		function() {
			$(this).find("img").removeClass("fadeOutLeft").show().addClass("fadeInLeft").css("animation-delay", ".2s");			
		},
		function() {
			$(this).find("img").removeClass("fadeInLeft").addClass("fadeOutLeft").css("animation-delay", ".2s");
			
		}
	);

		
		


});

