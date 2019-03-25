$(document).ready(function() {

	/////////////////////////////////////////
	// ПОВЕДЕНИЕ МЕНЮ	
	/////////////////////////////////////////
	$(".toggle_mnu").toggleClass("not-active");	

	$(".toggle_mnu").click(function() {
		$(this).toggleClass("active");	
		$(this).toggleClass("not-active");	
	});
	
	$(".mnu a").click(function() {
		$(".mnu").fadeOut(600);		
		$(".toggle_mnu").toggleClass("active");
		$(".toggle_mnu").toggleClass("not-active");
	});

	$(".toggle_mnu").click(function() {
		if ($(".mnu").is(":visible")) {			
			$(".mnu").fadeOut(600);					
		} else {			
			$(".mnu").fadeIn(600);			
			$(".mnu li a").addClass("fadeInRight animated");			
			$(".r-bot").addClass("fadeIn animated");			
		};
	});

	/////////////////////////////////////////
	// 	ПОВЕДЕНИЕ СТРАНИЦ САЙТА	
	/////////////////////////////////////////
		// При загрузке
		$(document).ready(function() {		
			function show() {
				$.ajax({
					url: "1-main.html",
					cache: false,
					success: function(html) {
						$(".content").html(html);
					}
				}).done(function() { // Если успешно	
					mainPageAnimation();
					load();
				});
			}
			show();						
		});

		// При клике по LOGO
		$("#logo").click(function() {		
			function show() {
				$.ajax({
					url: "1-main.html",
					cache: false,
					success: function(html) {
						$(".content").html(html);
					}
				}).done(function() { // Если успешно							
					mainPageAnimation()
					load();
				});
			}
			show();		
		});	

		// При клике по ссылке OFFER 
		$("#offer").click(function() {		
			function show() {
				$.ajax({
					url: "2-offer.html",
					cache: false,
					success: function(html) {
						$(".content").html(html);
					}
				}).done(function() { // Если успешно
					offerPageLiHover();
					fixedTextWidth();
					load();
				});
			}
			show();		
		});	

		// При клике по ссылке SOCIAL 
		$("#social").click(function() {		
			function show() {
				$.ajax({
					url: "3-social.html",
					cache: false,
					success: function(html) {
						$(".content").html(html);
					}
				}).done(function() { // Если успешно				
					fixedTextWidth();
					load();
				});
			}
			show();	
		});

		// При клике по ссылке CONTACT
		$("#contact").click(function() {		
			function show() {
				$.ajax({
					url: "4-contact.html",
					cache: false,
					success: function(html) {
						$(".content").html(html);
					}
				}).done(function() { // Если успешно				
					fixedTextWidth();
					load();
				});
			};			
      show();	
		});		

	 // Прелоадер
	function load() {		
		$(".loader").fadeOut('slow');	
	};		

	// Анимация Main Page
	function mainPageAnimation() {
		$(".main h2").addClass("fadeIn animated");
	 	$(".main h1").addClass("zoomIn animated");					 	
	 	$(".main p").addClass("bounceInLeft animated");		
	 };

	// Ширина .fixed-text равна высоте документа
	function fixedTextWidth() {
		var top = $(".fixed-text").width()/3;
		$(".fixed-text").css("top", top);		
	};	

	// Всплывающие треугольники при наведении
	function offerPageLiHover() {
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

}); 