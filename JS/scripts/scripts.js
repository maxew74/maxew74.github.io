$(document).ready(function() {

			// Ici, le DOM est entièrement défini
			$('#intro').click(function(){openMenu('#menu1_1','#intro')});
			$('#prog').click(function(){openMenu('#menu2_1','#prog')});
			$('#jquery').click(function(){openMenu('#menu3_1','#jquery')});
			$('#anim').click(function(){openMenu('#menu4_1','#anim')});
			$('#event').click(function(){openMenu('#menu5_1','#event')});
			$('#menuanim').click(function(){openMenu('#menu6_1','#menuanim')});
			//$('#links').click(function(){openMenu('#menu6_1','#links')});
			
				$('.back').each(function(i)
				{
					$(this).bind({
						click:function(){goBack()}
						})
				});
					
				$('.menu').each(function(i)
				{
					/*$(this).bind({
						mouseenter:function(){overMenu($(this))},
						mouseleave:function(){outMenu($(this))}
					})*/
					
					$(this).on("mouseenter", function(){overMenu($(this))});
					$(this).on("mouseleave", function(){outMenu($(this))});
					
					$(this).animate({"width":210}, 350, "easeInOutBack");
					
				});

				$('.item').each(function(i)
				{
					$(this).css("width", "200px");
					$(this).css("color", "#c3c3c3");
					$(this).css("padding", 4);
					$(this).css("paddingLeft",20);
					
					$(this).bind({
						mouseenter:function(){overItem($(this),25, 0,"#FFFFFF")},
						mouseleave:function(){overItem($(this),20,0,"#c3c3c3")},
						click:function(){openContent($(this).attr("id"))}
					});
				});
				
				/*$( "textarea" ).each(function( index ) {
				  console.log( "TEXTAREA " + index + $(this).height() + ": " + $(this).scrollHeight);
				  console.log($(this));
				 // $(this).attr("rows", 20);
				 // height($(this).height() + $(this).scrollHeight);
				});*/
								
				$("#btnPrev").css({"bottom":"50px", "right":"120px"});
				$("#numPage").css({"bottom":"50px", "right":"70px"});
				$("#btnNext").css({"bottom":"50px", "right":"20px"});
				
			/*	$(document).on("taphold", function(){
					
						var num = currentContent.substring(currentContent.length-1, currentContent.length);
						var theme = currentContent.substring(0, currentContent.length-2);
						var maxNum = parseInt($("#" + theme).attr("data-nbpage"));
						
						if(num < maxNum)
						{
							navigateNext();
						}else if(themeNum(theme)<(tabThemes.length-1)){
							
							if($('#menu' + (themeNum(theme)+1) + "_1").css("display") != "none")
							{
								openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + theme);
							}
							
							openContent(tabThemes[themeNum(theme)+1] + "_1");
						}
				});
				
				$(document).on("swipeleft", function(){
					
						var num = currentContent.substring(currentContent.length-1, currentContent.length);
						var theme = currentContent.substring(0, currentContent.length-2);
						var maxNum = parseInt($("#" + theme).attr("data-nbpage"));
						
						if(num < maxNum)
						{
							navigateNext();
						}else if(themeNum(theme)<(tabThemes.length-1)){
							
							if($('#menu' + (themeNum(theme)+1) + "_1").css("display") != "none")
							{
								openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + theme);
							}
							
							openContent(tabThemes[themeNum(theme)+1] + "_1");
						}
				});
				
				$(document).on("swiperight", function(){ 
					
					var num = currentContent.substring(currentContent.length-1, currentContent.length);
						var theme = currentContent.substring(0, currentContent.length-2);
						var maxNum = parseInt($("#" + theme).attr("data-nbpage"));
					if(num > 1)
						{
							navigatePrev();
						}else if(themeNum(theme)>0)
						{
							var prevTheme = tabThemes[themeNum(theme)-1];
							var maxNum = parseInt($("#" + prevTheme).attr("data-nbpage"));
							
							//alert($('#menu' + (themeNum(theme)+1) + "_1").css("display"));
							if($('#menu' + (themeNum(theme)+1) + "_1").css("display") != "none")
							{
								openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + prevTheme);
							}
							
							openContent(prevTheme + "_" + maxNum);
							
				}});*/
				
				$("#btnPrev").on("click", function(){ navigatePrev(); });
				$("#btnNext").on("click", function(){ navigateNext(); });
				$("#btnPrev").on("mouseenter", function(){ showTip(-1); });
				$("#btnNext").on("mouseenter", function(){ showTip(+1); });
				$("#btnPrev").on("mouseleave", function(){ hideTip(); });
				$("#btnNext").on("mouseleave", function(){ hideTip(); });
				
				$(window).resize(function() {
					onResize();
				});
				
				
				var currentContent = "intro_1";
				var currentPosY = 0;
				var currentPosX = 0;

				var tabThemes = ["intro", "prog", "jquery","anim","event","menuanim"];
				
				function themeNum( p_theme )
				{
					var i;
					for(i=0; i<tabThemes.length; i++)
					{
						if(tabThemes[i] == p_theme)
						{
							return i;
							break;
						}
					}
				}
				
				function navigatePrev(){
					
					var theme = currentContent.substring(0, currentContent.length-1);
					var num = currentContent.substring(currentContent.length-1, currentContent.length);
					var nextNum = (parseInt(num)-1);
					//alert(theme + " - "  + num + " -> " + (parseInt(num)-1));
					//alert(" page ? : " + theme + nextNum );
					
					openContent(theme + nextNum);
	
				}
				
				function navigateNext(){
					
					var theme = currentContent.substring(0, currentContent.length-2);
					var num = currentContent.substring(currentContent.length-1, currentContent.length);
					var nextNum = (parseInt(num)+1);
					//alert(theme + " - "  + num + " -> " + (parseInt(num)+1));
					openContent(theme + "_" + nextNum);
				}
				

				/*$(window).scroll(function(event)
				{
					// Valeur de dÃ©filement lors du chargement de la page
					//p_select.animate({left:p_padding +"px"}, 300);
					//alert(event);
					 onScrolling(event);
				});*/
			  
			  
			  //$(".menu").hover(function () {$(this).css('cursor','pointer');},function () {$(this).css('cursor','auto');});
			  //$(".sousMenu").hover(function () {$(this).css('cursor','pointer');},function () {$(this).css('cursor','auto');});

			
			/*
			function onScrolling(p_event)
			{
				//windowScroll = $(window).scrollTop();
				//alert(event);
			}
			*/
			function overItem(p_select, p_padding, p_margin, p_color)
			{
				if(!p_select.hasClass("itemSelect"))
				{
					p_select.css("color", p_color);
					p_select.stop().animate({left:p_padding +"px"}, 300);
				}
			}

			function overMenu(p_select)
			{
				p_select.stop().animate({width:"250px"},300);
			}
			function outMenu(p_select)
			{
				p_select.stop().animate({width:"210px"},200);
			}

			function overElmt(p_select)
			{
				$(p_select).stop().animate({width:100, height:100}, 'fast');
			}

			function outElmt(p_select)
			{
				$(p_select).stop().animate({width:60, height:60}, 'fast');
			}

			var tipVisible = false;
			var tipDir = -1;
			
			function showTip( p_dir )
			{
				tipVisible = true;
				tipDir = p_dir;
				
				var num = currentContent.substring(currentContent.length-1, currentContent.length);
				var theme = currentContent.substring(0, currentContent.length-2);
				var nextNum = (parseInt(num)+p_dir);

				var textTip = $("#" + theme + "_" + nextNum).html();
				if(p_dir==-1){
					textTip = " < " + textTip;
					$("#tip").css({right:115});
					$("#tip").stop().animate({opacity:1,right:120 + "px"}, 150);
				};
				if(p_dir==1){
					textTip = textTip + " > ";
					$("#tip").css({right:25});
					$("#tip").stop().animate({opacity:1, right:20 + "px"}, 150);
				};
				$("#tip").html(textTip);
				$("#tip").show();
				//$("#tip").css({right:20});
				//$("#tip").stop().fadeIn(300);
			}
			
			function hideTip()
			{
				tipVisible = false;
				//$("#tip").stop().animate({right:-$("#tip").widht() + "px"}, 300);
				//$("#tip").stop().fadeOut(300);
				
				var dest;
				
				if(tipDir==-1)
				{
					dest = 170;
				}
				if(tipDir==1)
				{
					dest = 0;
				}
				$("#tip").stop().animate({opacity:0, right:dest + "px"}, 150);
			}
			
			function openContent(p_id)
			{
				// $("#" + currentContent + "_content").hide();
				$("#" + currentContent).css("font-weight", "normal");
				$("#" + currentContent).removeClass("itemSelect");
				$("#" + currentContent).css("color", "c3c3c3");
				overItem($("#" + currentContent),20,0,"#c3c3c3");
								
				/* Modification de l'item courrant */
				currentContent = p_id;
				
				var theme = currentContent.substring(0, currentContent.length-2);
				//alert(theme);
				//alert($("#" + theme).css("background-color"));
				var bgcol = $("#" + theme).css("background-color");
				$("#btnPrev").css({"background-color":bgcol});
				$("#btnNext").css({"background-color":bgcol});
				$("#btnPrev").css({"border-color":bgcol});
				$("#btnNext").css({"border-color":bgcol});
				$("#numPage").css({"color":bgcol});
				$("#tip").css({"background-color":bgcol});
				
				// $("#" + currentContent + "_content").slideDown("fast");
				$("#" + currentContent).css("font-weight", "bold");
				$("#" + currentContent).css("color", "#FFFFFF");
				$("#" + currentContent).addClass("itemSelect");
				
				var newPosY;
				var newPosX;
				
				var num = currentContent.substring(currentContent.length-1, currentContent.length);
				var nextNum = (parseInt(num)-1);
				var maxNum = parseInt($("#" + theme).attr("data-nbpage"));
				
				if($('#menu' + (themeNum(theme)+1) + '_1').css("display")=="none")
				{
					openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + theme);
				}
				
				$("#numPage").html(num + "/" + maxNum);
				
				if(tipVisible)
				{
					showTip(tipDir);
				}
				
				if(num == 1){
					$("#btnPrev").stop().fadeOut(300);
					$("#tip").hide();
				}else{
					$("#btnPrev").stop().fadeIn(300);
				}
				
				if(num == maxNum){
					$("#btnNext").stop().fadeOut(300);
					$("#tip").hide();
				}else{
					$("#btnNext").stop().fadeIn(300);
				}
				
				//if(currentContent == "intro_1" && myResolutionMode!=2){newPosY = 0}
				//else{
					newPosY= $("#" + currentContent + "_content").offset().top;
					newPosX= $("#" + currentContent + "_content").offset().left - 350;//$("#sommaire").width();
					
					var durationScroll = ((newPosY-currentPosY) + (newPosX-currentPosX)/3); //alert(newPosY + " - " + currentPosY + " = " + durationScroll);				
					if(durationScroll<0){durationScroll = durationScroll*-1;}

					if(durationScroll>800){durationScroll = 800;}
					
					//alert(durationScroll);
					
				//}
				
				currentPosY = newPosY;
				currentPosX = newPosX;
				
				var bodyDoc = $("html, body");//(($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
				$(bodyDoc).stop().animate({scrollTop:newPosY, scrollLeft:newPosX}, durationScroll, "easeInOutBack");
				//$(documentBody).animate({scrollTop:newPosY-20}, 750, "easeOutBack");
				//$(documentBody).animate({scrollTop:newPosY}, durationScroll, "easeInOutBack").animate({scrollLeft:newPosX}, 500, "easeInOutBack");
				
				//$(documentBody).animate({scrollTop:newPosY}, durationScroll, "easeInOutBack");
				//$(document.body).animate("scroll", newPosY);
				//alert(bodyDoc);
			}
			
			
			function goBack()
			{
				var documentBody = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
				$(documentBody).animate({scrollTop:0}, 750, "easeOutBack");
			}
			

			var lastMenu;
			var lastTitle;
			
			function openMenu(p_select, p_titre)
			{
				var ulrImage = $(p_titre).css("background-image").split("/");
				var finUrl = ulrImage[ulrImage.length-1];
				var newUrl;
				
				if(finUrl == 'menu.png")'){newUrl = "menu2.png"}
				else if(finUrl == 'menu2.png")'){newUrl = "menu.png"}
				
				if(myResolutionMode==2 && lastMenu!=undefined && lastMenu!=$(p_select)) // Si la résolution est petite
				{
					lastMenu.stop().slideUp('fast', "easeOutBounce");
					lastTitle.css({"background-image":"url('images/menu.png')"});
				}
				
				$(p_titre).css("background-image", "url('images/" + newUrl + "')");
				$(p_select).stop().slideToggle('fast', "easeOutBounce");
				
				lastTitle=$(p_titre);
				lastMenu=$(p_select);
			}

			function closeMenu(p_select)
			{
				$(p_select).slideUp('fast');
			}
			
			myResolutionMode = 1;
			
			function onResize()
			{
				var wWidth = $(window).width();
				var dWidth = $(document).width();
				
				//var uWidth = $(document).width().offset().width -$("#sommaire").width();
				var minWidth=800;
				
				var screenHeight = $(window).height(); // - ($(document).height() - $("body").height());
				//alert("resize");
				//var documentBody = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
				
				//alert("Hauteurs (px) : \nwindow : " + $(window).height() + "\ndocument : " + $(document).height() + "\nbody : " + $("body").height() + "\nscreenHeight : " + screenHeight);	
				
				/*if( typeof( window.innerWidth ) == 'number' )
				{
					screenHeight = window.innerHeight;
				}
				else if( documentBody && documentBody.clientHeight )
				{
					screenHeight = documentBody.clientHeight;
				}*/
				
				//$(".content").css({"height":$(document).height()});
				
		
				//$(".content").css({"height":screenHeight +"px"});
				
				//$(".section_container").css({"left":$(".sommaire").width() +"px" });
				/*$("#btnPrev").css({"bottom":"80px", "left":"400px"});
				$("#btnNext").css({"bottom":"80px", "right":"50px"});*/
				
				$(".section_container").css({"height":screenHeight + "px"});
				$(".section_container").css({"top":"0px", "width":wWidth*5});
				
				$(".content").css("width", wWidth - 350);
				$(".content").css("height",screenHeight);
				
				$('.section_container').each(function(i)
				{
					$(this).css("position", "absolute");
					$(this).css("top", ((i)*(screenHeight)));
				});
				
				/*if((wWidth<=minWidth) && myResolutionMode==1)
				{
					// Changement de mode de résolution
					myResolutionMode=2;
					alert("petit");
					$(".content").css({"top":"0px", "padding":"5px", marginLeft:"0px", fontSize:"14px"});
					$("#header").css({"display":"none"});
					$("#sommaire").width(100).css({"position":"absolute", "top":"0px", "background-image":'none', "height":"500px", "padding":"0px"});
					$(".title_content").css({fontSize:"12pt", "padding":"2px"});
					$("strong").css({fontSize:"14px"});
					$("#intro_1_content").css({marginTop:"500px"});
					$("textarea").css({"width":"300px", fontSize:"12px"});
					$(".sousMenu").css({"display":"none"});
					$(".menu").css({"background-image":"url('images/menu.png')"});
					$("#ombre").css({"display":"none"});
					
					$(".back").css({"display":"block"});
				}*/
				
				//if($(window).width()>800 && myResolutionMode==2)
				if((wWidth>minWidth) && myResolutionMode==2)
				{
					// Changement de mode de résolution
					 myResolutionMode=1;
					//alert("grand");

					$(".content").css({"top":"0px", "padding":"30px", marginLeft:"350px", fontSize:"18pt"});
					$("#header").css({"display":"block"});
					//$("#sommaire").width(350).css({"position":"fixed", "top":"80px", "background-image":'url("../images/bande.png")', "height":"100%","padding-top":"30px"});
					$(".title_content").css({fontSize:"40px", "padding":"10px"});
					$("strong").css({fontSize:"20pt"});
					$("#intro_1_content").css({marginTop:"0px"});
					$("textarea").css({"width":"100%", fontSize:"20px"});
					$("#ombre").css({"display":"block"});
					
					$("#control").css({"width":"800px"});
					$("#masque").css({"width":"800px"});
			
					$('.thumb').each(function(i)
					{						
						$(this).css({"width":"800px", "height":"400px"});
					});
					
					$(".back").css({"display":"none"});
				}
				
				 if(myResolutionMode==2)
				 {
					$(".myMedia").css({"width":$(window).width()-50 + "px"});
					$("#control").css({"width":$(window).width()-50 + "px"});
					
					$("#masque").css({"width":$(window).width()-50 + "px"});
									
					$('.thumb').each(function(i)
					{
						var ratio = $("#img" + (i+1)).width()/$("#img" + (i+1)).height();
						
						var w = $(window).width()-50;
						var h = w/ratio;
						
						$(this).css({"width": w + "px", "height": h +"px"});
						$("#masque").css({"height": h +"px"});
					});
				 }
			}
		
			var keypressing = false;
			$(window).on("keyup", function(e)
			{
				//e.preventDefault();
				keypressing = false;
			});
			$(window).on("keydown", function(e)
			{
				//e.preventDefault();
				var num = currentContent.substring(currentContent.length-1, currentContent.length);
				var theme = currentContent.substring(0, currentContent.length-2);
				var maxNum = parseInt($("#" + theme).attr("data-nbpage"));
				
				if(!keypressing)
				{
					var key = e.keyCode;
					if(key == 37 || key == 38) // Haut ou gauche
					{
						if(num > 1)
						{
							navigatePrev();
						}else if(themeNum(theme)>0)
						{
							var prevTheme = tabThemes[themeNum(theme)-1];
							var maxNum = parseInt($("#" + prevTheme).attr("data-nbpage"));
							
							//alert($('#menu' + (themeNum(theme)+1) + "_1").css("display"));
							if($('#menu' + (themeNum(theme)+1) + "_1").css("display") != "none")
							{
								openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + prevTheme);
							}
							
							openContent(prevTheme + "_" + maxNum);
							
						}
					}
					if(key == 39 || key == 40)
					{
						if(num < maxNum)
						{
							navigateNext();
						}else if(themeNum(theme)<(tabThemes.length-1)){
							
							if($('#menu' + (themeNum(theme)+1) + "_1").css("display") != "none")
							{
								openMenu('#menu' + (themeNum(theme)+1) + '_1','#' + theme);
							}
							
							openContent(tabThemes[themeNum(theme)+1] + "_1");
						}
					}
					keypressing = true;
				}
				
			});
			

			/*    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
	
	alert(isMobile.Android());*/
			
			
			onResize();
			openContent(currentContent);
});

