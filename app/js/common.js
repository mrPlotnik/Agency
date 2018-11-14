$(document).ready(function() {

	$(".right-col ul li img").hide();

	$(".right-col ul li").hover(
		function() {
			$(this).find("img").removeClass("fadeOutLeft").show().addClass("fadeInLeft").css("animation-delay", ".1s");			
		},
		function() {
			$(this).find("img").removeClass("fadeInLeft").addClass("fadeOutLeft").css("animation-delay", ".1s");
			
		}
	);

	$(".toggle_mnu").toggleClass("not-active");	

	$(".toggle_mnu").click(function() {
		$(this).toggleClass("active");
	});

	$(".top_m a").click(function() {
		$(".top_mnu").fadeOut(600);		
	});

	$(".toggle_mnu").click(function() {
		if ($(".top_mnu").is(":visible")) {			
			$(".top_mnu").fadeOut(600);			
			$(".r-mid div").removeClass("fadeIn animated");
			$(".top_mnu li a").removeClass("fadeInRight animated");
		} else {			
			$(".top_mnu").fadeIn(600);
			$(".r-mid div").addClass("fadeIn animated");
			$(".top_mnu li a").addClass("fadeInRight animated");
			
		};
	});
});  	
		

