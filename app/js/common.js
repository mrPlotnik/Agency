$(document).ready(function() {

	
	function pro() {
		$(".right-col ul li img").hide();

		$(".right-col ul li").hover(
			function() {
				$(this).find("img").removeClass("fadeOutLeft").show().addClass("fadeInLeft").css("animation-delay", ".1s");	
			},
			function() {
				$(this).find("img").removeClass("fadeInLeft").addClass("fadeOutLeft").css("animation-delay", ".1s");			
			}
		);
	};
	




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

	function heightDetect() {
		var height = $("html").height();
		$(".fixed-text").css("width", height);
	};

	heightDetect();


	// УРОВНИ САЙТА	

	$(document).ready(function() {
		
		function show() {
			$.ajax({
				url: "../main.html",
				cache: false,
				success: function(html) {
					$(".content").html(html);
				}
			});
		}
		show();
		
	
	});

	$("#social").click(function() {
		
		function show() {
			$.ajax({
				url: "../social.html",
				cache: false,
				success: function(html) {
					$(".content").html(html);
				}
			});
		}
		show();
		
	
	});

	$("#offer").click(function() {
		
		function show() {
			$.ajax({
				url: "../offer.html",
				cache: false,
				success: function(html) {
					$(".content").html(html);
				}
			}).done(function() { // Если успешно
				pro();
			});
		}
		show();

			
	});	

	

});  	
		

