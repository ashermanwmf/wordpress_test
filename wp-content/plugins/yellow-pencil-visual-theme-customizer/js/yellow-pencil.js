(function(a){

/* Jquery onscreen plugin. - Released under MIT license. */
a.expr[":"].onScreen=function(b){var c=(a('#iframe').contents()),d=c.scrollTop(),e=c.height(),f=d+e,g=a('#iframe').contents().find(b),h=g.offset().top,i=g.height(),j=h+i;return h>=d&&h<f||j>d&&j<=f||i>e&&h<=d&&j>=f}

a.expr[":"].onScreenQ=function(b){var c=(a(document)),d=c.scrollTop(),e=c.height(),f=d+e,g=a(document).find(b),h=g.offset().top,i=g.height(),j=h+i;return h>=d&&h<f||j>d&&j<=f||i>e&&h<=d&&j>=f}

})(jQuery);

// Yellow Pencil Begun..
;(function($) {
	
    "use strict";

	var editor = ace.edit("cssData");
	editor.setTheme("ace/theme/twilight");	
	editor.getSession().setUseWrapMode(true);
    editor.getSession().setMode("ace/mode/css");
	
	editor.setOptions({
		fontSize: "17px"
	});


	$('#iframe').on("load", function() {
	
	var $iframe = $($('#iframe').contents().get(0));
	var $iframeBody = $iframe.find("body");
	var $body = $(document.body).add($iframeBody);


	// Modal Close
	$(".yp-info-modal-close").click(function(){
		$(this).parent().parent().hide();
		$(".yp-popup-background").hide();
	});

	$(".yp-popup-background").click(function(){
		$(this).hide();
		$(".yp-info-modal").hide();
	});


	// SHORT KEYS
	$(document).add($iframe).keydown(function(e){

		var tag = e.target.tagName.toLowerCase();
		
		// Z KEY
		if (e.ctrlKey == false && e.keyCode == 90 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			editor.commands.exec("undo", editor);
			$("#cssData").trigger("keyup");
			return false;
		}

		// Y KEY
		if (e.ctrlKey == false && e.keyCode == 89 && tag != 'input' && tag != 'textarea'){
			editor.commands.exec("redo", editor);
			$("#cssData").trigger("keyup");
			return false;
		}

	});
	
	
	// SHORT KEYS
	$(document).add($iframe).on('keyup',function(e){

		var tag = e.target.tagName.toLowerCase();
		
		// ESC
		if (e.ctrlKey == false && e.keyCode == 27 && tag != 'input' && tag != 'textarea'){
			
			e.preventDefault();

			if($(".yp-select-open").length == 0 && $(".wqminicolors-panel:visible").length == 0){

				if(!$("body").hasClass("css-editor-close-by-editor")){
					if($("#cssEditorBar").css("display") == 'block'){
						$(".css-editor-btn").trigger("click");
						return false;
					}else if($("body").hasClass("yp-contextmenuopen")){
						$iframe.trigger("scroll");
						$("body").removeClass("yp-contextmenuopen");
						return false;
					}else if($("body").hasClass("yp-medium-device")){
						$(".yp-button-large-device").trigger("click");
						return false;
					}else if($("body").hasClass("yp-small-device")){
						$(".yp-button-large-device").trigger("click");
						return false;
					}else if($("body").hasClass("yp-content-selected")){
						yp_clean();
						yp_resize();
						return false;
					}
				}else{
					$("body").removeClass("css-editor-close-by-editor");
					return false;
				}

			}else{
				$body.removeClass("yp-select-open");
			}
			
		}
		
		// R KEY
		if (e.ctrlKey == false && e.keyCode == 82 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			$(".yp-button-reset").trigger("click");
			return false;
		}

		// H KEY
		if (e.ctrlKey == false && e.keyCode == 72 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			$("body").toggleClass("yp-clean-look");
			yp_resize();
			return false;
		}

		// L KEY
		if (e.ctrlKey == false && e.keyCode == 76 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			$iframeBody.toggleClass("yp-hide-borders-now");
			return false;
		}
		
		// S KEY
		if (e.ctrlKey == false && e.keyCode == 83 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			$(".yp-save-btn").removeClass("yp-disabled").trigger("click");
			return false;
		}
		
		// F KEY
		if (e.ctrlKey == false && e.keyCode == 70 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			toggleFullScreen(document.body);
			return false;
		}

		// C KEY
		if (e.ctrlKey == false && e.keyCode == 67 && tag != 'input' && tag != 'textarea'){
			e.preventDefault();
			$body.toggleClass("yp-metric-disable");
			$(this).tooltip('hide');
			return false;
		}

		// SHIFT
		if (e.ctrlKey == false && e.keyCode == 16 && tag != 'input' && tag != 'textarea' && $("body").hasClass("process-by-code-editor") == false){
			e.preventDefault();			
			$(".css-editor-btn").trigger("click");
			return false;
		}
		
	});


	// Close 
	editor.commands.addCommand({
		
		name: 'close',
		bindKey: {win: 'ESC', mac: 'ESC'},
		exec: function(editor) {
			
			$(".css-editor-btn").trigger("click");
			$("body").removeClass("process-by-code-editor");
			$("body").addClass("css-editor-close-by-editor");
			
		},
		
		readOnly: false
		
	});


    // Document Ready..
    $(document).ready(function() {

    	// Update Editor Area
    	editor.setValue(yp_get_clean_css());
    
		// Tooltip
		$('[data-toggle="tooltip"]').tooltip({container: ".yp-select-bar"});
		$('[data-toggle="popover"]').popover({trigger:'hover',container: ".yp-select-bar"});
		$(".yp-none-btn").tooltip({container: '.yp-select-bar', title: l18_none});
		$(".yp-disable-btn").tooltip({container: '.yp-select-bar', title: l18_disable});
		$(".yp-element-picker").tooltip({placement: 'bottom', container: '.yp-select-bar', title: l18_picker});

		// Call Scripts.
		$(document).CallCSSEngine(yp_get_clean_css());

        // Set Class to Body.
        $body.addClass("yp-yellow-pencil");
		$body.addClass("yp-yellow-pencil-loaded");
		
		// Draggable editor area
		$(".yp-select-bar").draggable({ axis: 'x',containment: "parent",handle:".yp-editor-top" });

        // Border Sub menus toggle script
        $(".yp-advanced-link").click(function() {

            $(".yp-on").not(this).removeClass("yp-on");

            $(".yp-advanced-option").not($(this).next(".yp-advanced-option")).hide(0);

            $(this).next(".yp-advanced-option").toggle(0);

            $(this).toggleClass("yp-on");
			
			yp_resize();

        });


        // If no selected, hide.
        $(".top-area-btn-group,.yp-select-bar,.metric").hover(function(){
        	if($body.hasClass("yp-content-selected") == false){
        		yp_clean();
        	}
        });

		
		// background assents toggle
		$(".yp-bg-img-btn").click(function(){
			
			$(this).toggleClass("active");
			$(".yp_background_assets").toggle();
			
		});


		// Background active for top bar.
		$(".top-area-btn:not(.undo-btn):not(.redo-btn):not(.css-editor-btn)").click(function(){
			$(this).toggleClass("active");
		});


		// Fullscreen
		$(".fullscreen-btn").click(function(){
			toggleFullScreen(document.body);
		});


		// Undo
		$(".undo-btn").click(function(){
			editor.commands.exec("undo", editor);
			$("#cssData").trigger("keyup");
		});

		// Redo
		$(".redo-btn").click(function(){

			editor.commands.exec("redo", editor);
			$("#cssData").trigger("keyup");
			
		});

		
		// Background assents loading images on scrolling.
		$(".yp_background_assets").scroll(function(){
			
			$(".yp_bg_assets").filter(":onScreenQ").each(function(){
				var $d = $(this).data("url");
				$(this).css("background-image","url("+$(this).data("url")+")");
			});
			
		});
		
		// Set background assents
		$(".yp-bg-img-btn:not(.yp-first-clicked)").click(function(){
			$(this).addClass("yp-first-clicked");
			
			$(".yp_bg_assets").filter(":onScreenQ").each(function(){
				var $d = $(this).data("url");
				$(this).css("background-image","url("+$(this).data("url")+")");
			});
		});
		
		// Flat color helper toggle
		$(".yp-flat-colors").click(function(){
			
			$(this).toggleClass("active");
			$(this).parent().find(".yp_flat_colors_area").toggle();
			
		});

		// Meterial color helper toggle
		$(".yp-meterial-colors").click(function(){
			
			$(this).toggleClass("active");
			$(this).parent().find(".yp_meterial_colors_area").toggle();
			
		});
		
		// Nice color helper toggle.
		$(".yp-nice-colors").click(function(){
			
			$(this).parent().find(".yp_nice_colors_area").toggle();
			$(this).toggleClass("active");
			
		});

		// Image Uploader
		$(".yp-upload-btn").click(function(){

			$('#image_uploader iframe').attr( 'src', function ( i, val ) { return val; });
			window.send_to_editor = function(output){
				
		    var imgurl = output.match(/src="(.*?)"/g);

		    imgurl = imgurl.toString().replace('src="','').replace('"','');

		    // Always get full size.
		    if(imgurl != ''){
		    	var y = imgurl.split("-").length-1;
		    	var imgNew = '';
		    	if(imgurl.split("-")[y].match(/(.*?)x(.*?)\./g) !== null){

		    		imgNew = imgurl.replace("-"+imgurl.split("-")[y],'');

					// format
					if(imgurl.split("-")[y].indexOf(".") != -1){
						imgNew = imgNew + "." + imgurl.split("-")[y].split(".")[1];
					}

		    	}

		    }

		    $("#yp-background-image").val(imgNew).trigger("keyup");
		    
		    window.send_to_editor = window.restore_send_to_editor;

		    $("#image_uploader").fadeToggle(150);
			$("#image_uploader_background").fadeToggle(150);
			
		}

			$("#image_uploader").fadeToggle(150);
			$("#image_uploader_background").fadeToggle(150);

		});


		// Image Uploader close
		$("#image_uploader_background").click(function(){
			$("#image_uploader").fadeToggle(150);
			$("#image_uploader_background").fadeToggle(150);
			$('#image_uploader iframe').attr( 'src', function ( i, val ) { return val; });
		});


		// Uploader callback
		window.restore_send_to_editor = window.send_to_editor;

		window.send_to_editor = function(html) {
		    var imgurl = $('img',html).attr('src');
		    $("#yp-background-image").val(imgurl);
		    
		    window.send_to_editor = window.restore_send_to_editor;

		    $("#image_uploader").fadeToggle(150);
			$("#image_uploader_background").fadeToggle(150);
			$('#image_uploader iframe').attr( 'src', function ( i, val ) { return val; });
		}


        // Trigger option saved.
        yp_option_update();


        // The title
        $("title").html("Yellow Pencil: " + $iframe.find("title").html());


        // Check before exit page.
        window.onbeforeunload = confirmExit;

        // exit confirm
        function confirmExit(){

            if ($(".yp-save-btn").hasClass("waiting-for-save")) {
                return l18_sure;
            }

        }

        // Save Button
        $(".yp-save-btn").on("click", function() {

            if ($(this).hasClass("yp-disabled")) {
                return false;
            }

            // Getting the id
            var $theID = window.location.href.split("&yp_id=");
            if (typeof $theID[1] !== typeof undefined && $theID[1] !== false) {
                $theID = $theID[1].split("&");
                $theID = $theID[0];
            } else {
                $theID = undefined;
            }
			
			// Getting Type
            var $type = window.location.href.split("&yp_type=");
            if (typeof $type[1] !== typeof undefined && $type[1] !== false) {
                $type = $type[1].split("&");
                $type = $type[0];
            } else {
                $type = undefined;
            }

			
            // Send Ajax
			if(!$("body").hasClass("yp-yellow-pencil-demo-mode")){

				var outputCSS = yp_get_clean_css();

				// lite version checking.
				var status = true;
				if($("body").hasClass("wtfv")){

					if(
						outputCSS.indexOf("font-family:") != -1 ||
						outputCSS.indexOf("text-shadow:") != -1 ||
						outputCSS.indexOf("text-transform:") != -1 ||
						outputCSS.indexOf("background-color:") != -1 ||
						outputCSS.indexOf("background-image:") != -1 ||
						outputCSS.indexOf("animation-name:") != -1 ||
						outputCSS.indexOf("filter:") != -1 ||
						outputCSS.indexOf("opacity:") != -1 ||
						outputCSS.indexOf("background-parallax:") != -1 ||
						outputCSS.indexOf("	width:") != -1 ||
						outputCSS.indexOf("	height:") != -1 ||
						outputCSS.indexOf("	color:") != -1){
						status = false;

						$(".wt-save-btn").html(save).removeClass("waiting-for-save").removeClass("wt-disabled");

						$(".yp-info-modal,.yp-popup-background").show();

					}else{

						// BeforeSend
	            		$(".yp-save-btn").html(saving).addClass("yp-disabled");

					}

				}else{

					// BeforeSend
	            	$(".yp-save-btn").html(saving).addClass("yp-disabled");

				}

				// CSS To Data and save.
				if($body.hasClass("yp-need-to-process")){

					if(status){
						yp_process(false,$theID,$type);
					}

				}else{

					if(status){
						var $posting = $.post(ajaxurl, {
							action: "yp_ajax_save",
							yp_id: $theID,
							yp_stype: $type,
							yp_data: yp_get_clean_css(),
							yp_editor_data: yp_get_styles_area()
						});
						
						// Done.
						$posting.complete(function(data) {
							$(".yp-save-btn").html(saved).addClass("yp-disabled").removeClass("waiting-for-save");
						});
					}

				}
				
			}else{
				
				alert(demo_alert);
				$(".yp-save-btn").html(saved).addClass("yp-disabled").removeClass("waiting-for-save");
				
			}


        });


        // Scroll callback.
        $iframe.scroll(function(){

            yp_tooltip_draw();

            if ($iframeBody.find(".context-menu-active").length > 0){
                $iframeBody.find(".yp-selected").contextMenu("hide");
            }
			
			yp_draw();

        });


        // Resize callback.
        $(window).resize(function() {

            yp_draw();
            yp_resize();

        });
		

		// iframe resize.
		$("#iframe").contents().resize(function() {

            yp_draw();
            yp_resize();

        });
		
		
		// Background images
		$(".yp_background_assets div").click(function() {
			$(".yp_background_assets div.active").removeClass("active");
			$(this).parent().parent().find(".yp-input").val($(this).data("url")).trigger("keyup");
			$(this).addClass("active");
			$("#background-repeat-group .yp-none-btn:not(.active)").trigger("click");
			$("#background-size-group .yp-none-btn:not(.active)").trigger("click");
		});
		
		
		// Flat Colors
		$(".yp_flat_colors_area div,.yp_meterial_colors_area div,.yp_nice_colors_area div").click(function() {
			$(this).parent().find(".active").removeClass("active");

			$(this).parent().parent().find(".wqminicolors-input").val("#FFFFFF").trigger("keyup");
			$(this).parent().parent().find(".wqminicolors-input").val($(this).data("color")).trigger("keyup");
			$(this).addClass("active");
		});
		
		// Close
		$(document).click(function(event){
			
			if($(event.target).is('.yp_bg_assets') == false && $(event.target).is('.yp-none-btn') == false && $(event.target).is('.yp-bg-img-btn') == false && $(".yp_background_assets:visible").length > 0){
				$(".yp_background_assets").hide();
				$(".yp-bg-img-btn").removeClass("active");
			}
			
			if($(event.target).is('.yp-flat-c') == false && $(event.target).is('.yp-flat-colors') == false && $(".yp_flat_colors_area:visible").length > 0){
				$(".yp_flat_colors_area").hide();
				$(".yp-flat-colors").removeClass("active");
			}

			if($(event.target).is('.yp-meterial-c') == false && $(event.target).is('.yp-meterial-colors') == false && $(".yp_meterial_colors_area:visible").length > 0){
				$(".yp_meterial_colors_area").hide();
				$(".yp-meterial-colors").removeClass("active");
			}
			
			if($(event.target).is('.yp-nice-c') == false && $(event.target).is('.yp-nice-colors') == false && $(".yp_nice_colors_area:visible").length > 0){
				$(".yp_nice_colors_area").hide();
				$(".yp-nice-colors").removeClass("active");
			}
			
		});


        // Selector Disable.
        $(".yp-button-target").click(function(){

            if ($(this).hasClass("active")) {

				$body.attr("data-clickable-select","body");
                $(this).removeClass("active");
                $body.addClass("yp-selector-disabled").removeClass("yp-content-selected").removeClass("yp-has-transform");
                $iframeBody.find(".yp-selected").removeClass("yp-selected");
                $iframeBody.find(".yp-selected-others").removeClass("yp-selected-others");

            } else {

                $(this).addClass("active");
                $body.removeClass("yp-selector-disabled");
				yp_clean();

            }


            // active body tagname or else.
            if (!$(this).hasClass("active")) {

                $body.removeClass("yp-content-selected").removeClass("yp-has-transform");
                $body.trigger("mousemove").trigger("click");
                $iframeBody.find(".yp-selected").removeClass("yp-selected");
                $body.addClass("yp-selected").removeClass("yp-selector-disabled");
                $body.addClass("yp-content-selected");
                $iframeBody.find(".yp-selected").removeClass("yp-selected-others");

                $(".yp-option-group").each(function() {
                    yp_set_default("body", $(this).attr("id").replace("-group", ""), false);
                });

            } else {

                $body.removeClass("yp-content-selected").removeClass("yp-has-transform");
                $body.removeClass("yp-selected").removeClass("yp-selector-disabled");
                $iframeBody.find(".yp-selected").removeClass("yp-selected-others");

                var $clickable = $body.attr("data-clickable-select");

                if (typeof $clickable !== typeof undefined && $clickable !== false) {

                    $body.addClass("yp-content-selected");

                    $($clickable).first().addClass("yp-selected").not(":first").addClass("yp-selected-others");

                    $(".yp-option-group").each(function() {
                        yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
                    });

                    // Send Update
                    yp_draw();

                }

                // Clean everything.
                if (!$body.hasClass("yp-content-selected")) {

                    yp_clean();

                }

            }

            yp_resize();

        });


        // minicolors plugin.
        $('.yp-select-bar .wqcolorpicker').wqminicolors({
			
            hide: function() {
                $body.removeClass("yp-disable-disable-yp");
            },

            show: function() {
                $body.addClass("yp-disable-disable-yp");
            },

            change: function(hex, opacity) {

                if (!hex) return false;

            },

            theme: 'bootstrap'

        });


        // Select2 Install
        $(".yp-select-bar .yp-this-content select").wqselect2({
            language: "en"
        });
		
		
		// Responsive helper: mobile
		$(".responsive-list .yp-button-small-device").click(function(){
		
			if($(this).hasClass("active")){
				return false;
			}
		
			$body.removeClass("yp-medium-device").addClass("yp-small-device");
			$(".responsive-list a").removeClass("active");
			$(this).addClass("active");

			$(".responsive-selector").removeClass("active");
			$(".responsive-selector.yp-button-small-device").addClass("active");
			
			$(".yp-option-group").each(function() {
				yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
			});

			yp_draw();
			yp_tooltip_draw();
		
		});
		

		// Responsive helper: tablet
		$(".responsive-list .yp-button-medium-device").click(function(){
		
			if($(this).hasClass("active")){
				return false;
			}
		
			$body.removeClass("yp-small-device").addClass("yp-medium-device");
			$(".responsive-list a").removeClass("active");
			$(this).addClass("active");
			
			$(".responsive-selector").removeClass("active");
			$(".responsive-selector.yp-button-medium-device").addClass("active");
			
			$(".yp-option-group").each(function() {
				yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
			});

			yp_draw();
			yp_tooltip_draw();

		});
		

		// Responsive helper: desktop
		$(".responsive-list .yp-button-large-device").click(function(){
		
			if($(this).hasClass("active")){
				return false;
			}
			
			$body.removeClass("yp-small-device").removeClass("yp-medium-device");
			$(".responsive-list a").removeClass("active");
			$(this).addClass("active");
			yp_draw();
			
			$(".responsive-selector").removeClass("active");
			$(".responsive-selector.yp-button-large-device").addClass("active");
			
			$(".yp-option-group").each(function() {
				yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
			});

		});
		

		$(".responsive-selector,.responsive-list").hover(function(){
			
			$(".responsive-list").toggle();
			
		});


        // Reset Button
        $(".yp-button-reset").click(function(){

            if (confirm(l18_reset)){
                $iframeBody.find(".yp_current_styles").remove();

                // Clean editor value.
				editor.setValue('');

				// Reset parallax.
				$iframe.find(".yp-parallax-disabled").removeClass("yp-parallax-disabled");

                // Update changes.
                if ($body.hasClass("yp-content-selected")){
                    yp_draw();
                    yp_tooltip_draw();

                    $(".yp-option-group").each(function(){
                        yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
                    });

                }

                // Option Changed
                yp_option_change();

            }

        });


        // Install All Options
        $(".yp-slider-option").each(function() {
            yp_slider_option($(this).attr("id").replace("-group", ""), $(this).data("decimals"), $(this).data("pxv"), $(this).data("pcv"), $(this).data("emv"));
        });

        $(".yp-radio-option").each(function() {
            yp_radio_option($(this).attr("id").replace("-group", ""));
        });

        $(".yp-select-option").each(function() {
            yp_select_option($(this).attr("id").replace("-group", ""));
        });

        $(".yp-color-option").each(function() {
            yp_color_option($(this).attr("id").replace("-group", ""));
        });

        $(".yp-input-option").each(function() {
            yp_input_option($(this).attr("id").replace("-group", ""));
        });


        function yp_update_slide_by_input(q){

        	var $real_value = $(q).attr("data-yp-val");
			var $tp = $(q).parent().parent().parent();
			var $prefix = $(q).parent().find(".yp-after-prefix").val();
			var $slide = $(q).parent().parent().find(".wqNoUi-target");
			
			// Update PX
			if ($prefix == 'px') {
                var $range = $tp.data("px-range").split(",");
            }

            // Update %.
            if ($prefix == '%') {
                var $range = $tp.data("pc-range").split(",");
            }

            // Update EM.
            if ($prefix == 'em') {
                var $range = $tp.data("em-range").split(",");
            }
			
			// min and max values
			var $min = parseInt($range[0]);
			var $max = parseInt($range[1]);
			
			if($real_value < $min){
				$min = $real_value;
			}
			
			if($real_value > $max){
				$max = $real_value;
			}

			if(isNaN(parseInt($min)) == false && isNaN(parseInt($max)) == false && isNaN(parseInt($real_value)) == false){

				$slide.wqNoUiSlider({
					range: {
						'min': parseInt($min),
						'max': parseInt($max)
					},
					start: $real_value
				}, true);

			}

        }


        // Keypress: Arrow keys up/down the value.
        $(".yp-after-css-val").keydown(function(e) {

            var code = e.keyCode || e.which;

            if (code == 38) {
                $(this).val(parseFloat($(this).val()) + parseFloat(1));
            }

            if (code == 40) {
                $(this).val(parseFloat($(this).val()) - parseFloat(1));
            }

        });

        // Keypress: Arrow keys up/down the prefix.
        $(".yp-after-prefix").keydown(function(e) {

            var code = e.keyCode || e.which;

            if (code == 40 || code == 38) {

            	// em -> % -> px 
                if($(this).val() == 'em'){
                	$(this).val("%");
                }else if($(this).val() == '%'){
                	$(this).val("px");
                }else if($(this).val() == 'px'){
                	$(this).val("em");
                }

            }

        });
		
		
		// Hide CSS Editor area.
        $(".css-editor-btn,.yp-css-close-btn").click(function(e) {
				
			if($("#leftAreaEditor").css("display") == 'none'){

				editor.focus();
				editor.execCommand("gotolineend");
				$("#cssData,#cssEditorBar,#leftAreaEditor").show();
				$("body").addClass("yp-css-editor-active");
				$iframeBody.trigger("scroll");
				
				// Update All.
				yp_draw();
				yp_tooltip_draw();
				
			}else{
				
				// CSS To data
				yp_process(true,false,false);
								
			}

        });



        // Keyup: Custom Slider Value
        $(".yp-after-css").keyup(function(e){

			$(this).attr("data-yp-val",$(this).val());
		
            yp_slide_action($(this).parent().parent().find(".wqNoUi-target"), $(this).parent().parent().find(".wqNoUi-target").attr("id").replace("yp-",""), false);

        });		
		

		// Update on Enter Key.
		$(".yp-after-css-val").keydown(function( e ){

			switch ( e.which ) {
				case 13:
					$(this).trigger("blur");
					return false;
					break;
			}
			
		});

		// Blur: Custom Slider Value
		$(".yp-after-css-val").blur(function(e){
		
			yp_update_slide_by_input(this);

        });


        // Keyup format.
        $(".yp-after-prefix").keyup(function(){

            var $tp = $(this).parent().parent().parent();

            var $slider = $(this).parent().parent().find(".wqNoUi-target");

            var $range = $tp.data("px-range").split(",");

            // Update PX.
            if ($(this).val() == 'px') {
                var $range = $tp.data("px-range").split(",");
            }

            // Update %.
            if ($(this).val() == '%') {
                var $range = $tp.data("pc-range").split(",");
            }

            // Update EM.
            if ($(this).val() == 'em') {
                var $range = $tp.data("em-range").split(",");
            }


            // Set slider.
            $slider.wqNoUiSlider({
                start: [0],
                range: {
                    'min': parseInt($range[0]),
                    'max': parseInt($range[1])
                }
            }, true);


        });

        // Call function.
        yp_resize();


    }); // Document Ready end.




    /* ---------------------------------------------------- */
    /* Set context menu options.							*/
    /* ---------------------------------------------------- */
    $.contextMenu({

        events: {

        	// Update everything on contextmenu hide.
            hide: function(opt) {

                yp_draw();

            },

            // if contextmenu show; update some options.
            show: function() {

                var $sp = ' > ';

                var $dir = yp_get_parents($iframe.find(".yp-selected"));

                var $p_length = $dir.split($sp).length;

                // BeforeShow.
                if ($p_length == 1) {
                    $(".yp-contextmenu-parent").addClass("yp-disable-contextmenu");
                } else if ($p_length > 1) {
                    $(".yp-contextmenu-parent").removeClass("yp-disable-contextmenu");
                }

                $body.addClass("yp-contextmenuopen");

            }

        },

        // Open context menu only if a element selected.
        selector: 'body.yp-content-selected .yp-selected',
        callback: function(key, options) {

            $body.removeClass("yp-contextmenuopen");

            var $sp = ' > ';

            var $dir = yp_get_parents($iframe.find(".yp-selected"));
            var $parentReal = $iframeBody.find(".yp-selected").parent();

            if (key == "parent") {

                if ($(".yp-contextmenu-parent").hasClass("yp-disable-contextmenu")) {
                    return false;
                }

                var $parentQ = $dir.split($sp).slice(0, -1);
                var $parent = '';
                var index, len;

                for (index = 0, len = $parentQ.length; index < len; ++index) {

                    if (index == 0) {
                        $parent = $parentQ[index];
                    } else {
                        $parent = $parent + $sp + $parentQ[index];
                    }

                }
	
				yp_clean();

                $body.removeAttr("data-clickable-select").removeAttr("data-yp-selector").removeClass("yp-selector-focus").removeClass("yp-selector-hover");

                $iframe.find($parent).trigger("mousemove").trigger("click");

                $parentReal.addClass("yp-selected");

                $body.addClass("yp-content-selected");

                $body.attr("data-clickable-select",yp_get_parents($iframe.find(".yp-selected")));

				yp_resize();

				yp_draw();

                $(".yp-disable-contextmenu").removeClass("yp-disable-contextmenu");
                $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");

				setTimeout(function(){
					$(".yp-option-group").each(function() {
						yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
					});

				},40);


            }

            // Hover
            if (key == "hover") {

                // Remove focus
                var attr = $body.attr('data-yp-selector');
                if (typeof attr !== typeof undefined && attr !== false) {
                    if (attr == ':focus') {
                        $body.removeAttr("data-yp-selector").removeClass("yp-selector-focus");
                        $iframeBody.find(".yp-selected-tooltip span").remove();
                    }
                }

                // If isset, remove.
                if ($body.attr("data-yp-selector") == ":hover") {

                    $body.removeAttr("data-yp-selector").removeClass("yp-selector-hover");

                    $iframeBody.find(".yp-selected-tooltip span").remove();

                    $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");

                } else {

                    $body.attr("data-yp-selector", ":hover").addClass("yp-selector-hover");

                    $iframeBody.find(".yp-selected-tooltip span").remove();

                    $iframeBody.find(".yp-selected-tooltip").append("<span>:hover</span>");

                    $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");
                    $(".yp-contextmenu-hover").addClass("yp-active-contextmenu");

                }
				
				setTimeout(function(){
					$(".yp-option-group").each(function() {
						yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
					});
				},40);

            }


            // Focus
            if (key == "focus") {

                // Remove hover
                var attr = $body.attr('data-yp-selector');
                if (typeof attr !== typeof undefined && attr !== false) {
                    if (attr == ':hover') {
                        $body.removeAttr("data-yp-selector").removeClass("yp-selector-hover");
                        $iframeBody.find(".yp-selected-tooltip span").remove();
                    }
                }

                // If isset, remove.
                if ($body.attr("data-yp-selector") == ":focus") {

                    $body.removeAttr("data-yp-selector").removeClass("yp-selector-focus");

                    $iframeBody.find(".yp-selected-tooltip span").remove();

                    $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");

                } else {

                    $body.attr("data-yp-selector", ":focus").addClass("yp-selector-focus");

                    $iframeBody.find(".yp-selected-tooltip span").remove();

                    $iframeBody.find(".yp-selected-tooltip").append("<span>:focus</span>");

                    $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");
                    $(".yp-contextmenu-focus").addClass("yp-active-contextmenu");

                }

				setTimeout(function(){
					$(".yp-option-group").each(function() {
						yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), false);
					});
				},40);

            }
			

			// Select just it
			if (key == 'selectjustit'){
					
				var t = 0;
				var s = 0;
					
				$iframe.find(yp_get_parents($iframe.find(".yp-selected"))).each(function(){
				
				t = t+1;
						
					if($(this).hasClass("yp-selected")){
						s = t;
					}
					
				});
				
				$body.attr("data-clickable-select",yp_get_parents($iframe.find(".yp-selected"))+":nth-child("+s+")");
				
				if($iframe.find($body.attr("data-clickable-select")).length > 0){
					
					if(!$iframe.find($body.attr("data-clickable-select")).hasClass("yp-selected")){
						$body.attr("data-clickable-select",$body.attr("data-clickable-select").split(":")[0]+":nth-child("+(s-1)+")");
					}
					
					if(!$iframe.find($body.attr("data-clickable-select")).hasClass("yp-selected")){
						$body.attr("data-clickable-select",$body.attr("data-clickable-select").split(":")[0]+":nth-child("+(s+1)+")");
					}
					
				}

				if($iframe.find($body.attr("data-clickable-select")).length != 1){
					
					var dir = $body.attr("data-clickable-select").split(":")[0];
					var dirP = dir.split(">");
					var l = dirP[dirP.length-1];
					var reg = new RegExp(" >"+l,"g");
					var dira = dir.replace(reg,"")+":nth-child("+(s-2)+")"+" >" + l;
					var dirb = dir.replace(reg,"")+":nth-child("+(s-1)+")"+" >" + l;
					var dirc = dir.replace(reg,"")+":nth-child("+s+")"+" >" + l;
					var dird = dir.replace(reg,"")+":nth-child("+(s+1)+")"+" >" + l;
					var dirf = dir.replace(reg,"")+":nth-child("+(s+2)+")"+" >" + l;
						
					if($iframe.find(dira).length == 1){

						if($iframe.find(dira).hasClass("yp-selected")){
							$body.attr("data-clickable-select",dira);
						}
						
					}
						
					if($iframe.find(dirb).length == 1){
					
						if($iframe.find(dirb).hasClass("yp-selected")){
							$body.attr("data-clickable-select",dirb);
						}
						
					}
						
					if($iframe.find(dirc).length == 1){
					
						if($iframe.find(dirc).hasClass("yp-selected")){
							$body.attr("data-clickable-select",dirc);
						}
						
					}
						
					if($iframe.find(dird).length == 1){
						
						if($iframe.find(dird).hasClass("yp-selected")){
							$body.attr("data-clickable-select",dird);
						}
						
					}
						
					if($iframe.find(dirf).length == 1){
						
						if($iframe.find(dirf).hasClass("yp-selected")){
							$body.attr("data-clickable-select",dirf);
						}
						
					}
					
				}
					
				if($iframe.find($body.attr("data-clickable-select")).length > 0){
					$iframe.find(".yp-selected-others").removeClass("yp-selected-others");
					$iframe.find(".yp-selected-others-top,.yp-selected-others-bottom,.yp-selected-others-left,.yp-selected-others-right").remove();
				}
				
			}
			
			if (key == 'close'){
				yp_clean();
				yp_resize();
			}


        },
        items: {
            "hover": {
                name: ":Hover",
                className: "yp-contextmenu-hover"
            },
            "focus": {
                name: ":Focus",
                className: "yp-contextmenu-focus"
            },
			"sep1": "---------",
            "parent": {
                name: "Parent Element",
                className: "yp-contextmenu-parent"
            },
			"selectjustit": {
                name: "Select just it",
                className: "yp-contextmenu-select-it"
            },
            "close": {
                name: "Close",
                className: "yp-contextmenu-close"
            }
        }

    });




    /* ---------------------------------------------------- */
    /* Resize.												*/
    /* ---------------------------------------------------- */
    function yp_resize() {

    	var topMargin = 0;
    	if(!$("body").hasClass("yp-metric-disable")){
    		topMargin = 31;
    	}

    	// Right menu.
    	if ($iframe.height() > $(window).height()){
    		$(".yp-select-bar").css("margin-right","26px");
    	}else{
    		$(".yp-select-bar").css("margin-right","10px");
    	}
		
		var $max = $(window).height()-24-topMargin;
		
		if($(window).height() > 790){
			var tli = 46;
		}else{
			var tli = 43;
		}
		
		var tliTo = (($(".yp-editor-list > li").length-2)*tli)+125;
		
        // Resize
		if($(".yp-no-selected").css("display") == "block"){
			
			var $height = $(".yp-no-selected").height();
			var $y = $height+140;
			
			if($y <= $max){
				$(".yp-select-bar").height($y);
				$(".yp-editor-list").height($y-45);
			}else{
				$(".yp-select-bar").height($max);
				$(".yp-editor-list").height($max-45);
			}
			
		}else if($(".yp-this-content:visible").length > 0){
			
			var $height = $(".yp-this-content:visible").parent().height();

			if($height <= $max){
				var $apply = $height+117;
				var $applys = $apply-45;
			}
			
	
			
			if($apply <= $max){
				$(".yp-select-bar").height($apply);
				$(".yp-editor-list").height($applys);
			}else{
				$(".yp-select-bar").height($max);
				$(".yp-editor-list").height($max-45);

			}
			
		}else{
			
			var $y = $(".yp-editor-top").height()+tliTo;
			
			if($y <= $max){
				$(".yp-select-bar").height($y);
				$(".yp-editor-list").height(tliTo);
			}else{
				$(".yp-select-bar").height($max);
				$(".yp-editor-list").height(tliTo);
			}
			
		}

    }


    $(".yp-element-picker").click(function(){
    	$("body").toggleClass("yp-element-picker-active");
    	$(this).toggleClass("active");
    });



    /* ---------------------------------------------------- */
    /* Element Selector Box Function						*/
    /* ---------------------------------------------------- */
	$iframe.on("mousemove", $iframe, function(evt){
		
		var $evtarget = $(evt.target);

		if($("body").hasClass("yp-element-picker-active") == true){
			$(".yp-element-picker.active").parent().parent().find(".wqminicolors-input").val(rgb2hex($evtarget.css("background-color"))).trigger("keyup");
		}

		if($evtarget[0].nodeName == "HTML" || $evtarget[0].nodeName == "BODY"){
			return false;
		}

		// Not show if p tag and is empty.
		if($evtarget.html() == '&nbsp;' && $evtarget[0].nodeName == 'P'){
			return false;
		}

		// if not null
		if($evtarget === null){
			return false;
		}

		// stop if not have
		if($evtarget.length == 0){
			return false;
		}
		
		// if not on screen
		if(!$evtarget.filter(":onScreen").length === 0){
			return false;
		}
	
		if ($body.hasClass("yp-selector-disabled")) {
            return false;
        }

        var $dirx = yp_get_parents($evtarget);

        // Be sure this is visible on screen
		if ($evtarget.css("display") == 'none' || $evtarget.css("visibility") == 'hidden' || $evtarget.css("opacity") == '0'){
			return false;
		}

		// Be sure this is visible on screen (For parent)
		if($evtarget.parent().length !== 0 && $evtarget.parent()[0].nodeName !== 'HTML' && $evtarget.parent()[0].nodeName !== 'BODY'){
			
			if ($evtarget.parent().css("display") == 'none' || $evtarget.parent().css("visibility") == 'hidden' || $evtarget.parent().css("opacity") == '0'){
				return false;
			}
		

			// Be sure this is visible on screen (For parent parent)
			if($evtarget.parent().parent().length !== 0 && $evtarget.parent().parent()[0].nodeName !== 'HTML' && $evtarget.parent().parent()[0].nodeName !== 'BODY'){
				if ($evtarget.parent().parent().css("display") == 'none' || $evtarget.parent().parent().css("visibility") == 'hidden' || $evtarget.parent().parent().css("opacity") == '0'){
					return false;
				}
			

				// Be sure this is visible on screen (For parent parent parent)
				if($evtarget.parent().parent().parent().length !== 0 && $evtarget.parent().parent().parent()[0].nodeName !== 'HTML' && $evtarget.parent().parent().parent()[0].nodeName !== 'BODY'){
					if ($evtarget.parent().parent().parent().css("display") == 'none' || $evtarget.parent().parent().parent().css("visibility") == 'hidden' || $evtarget.parent().parent().parent().css("opacity") == '0'){
						return false;
					}
				
					// Be sure this is visible on screen (For parent parent parent)
					if($evtarget.parent().parent().parent().parent().length !== 0 && $evtarget.parent().parent().parent().parent()[0].nodeName != 'HTML' && $evtarget.parent().parent().parent().parent()[0].nodeName != 'BODY'){
						if ($evtarget.parent().parent().parent().parent().css("display") == 'none' || $evtarget.parent().parent().parent().parent().css("visibility") == 'hidden' || $evtarget.parent().parent().parent().parent().css("opacity") == '0'){
							return false;
						}
					}

				}

			}

		}

        var $nodeName = $evtarget[0].nodeName;

        if ($dirx.indexOf(".yp") == -1 && $dirx.indexOf("wqselect2-container") == -1 && $dirx.indexOf(".wqcolorpicker") == -1 && $dirx.indexOf("context-menu") == -1){

			evt.stopPropagation();
			evt.preventDefault();

            if ($nodeName != 'BODY' && $nodeName != 'HTML' && $body.hasClass("yp-content-selected") == false) {

                // Remove all ex data.
                yp_clean();

                // Hover it
                $evtarget.addClass("yp-selected");
				
				// transform.
				if($evtarget.css("transform") != 'none' && $evtarget.css("transform") != 'inherit' && $evtarget.css("transform") != ''){
					$body.addClass("yp-has-transform");
				}
				
				if($evtarget.parent().length != 0){
					if($evtarget.parent().css("transform") != 'none' && $evtarget.parent().css("transform") != 'inherit' && $evtarget.parent().css("transform") != ''){
						$body.addClass("yp-has-transform");
					}
				}
				
				if($evtarget.parent().parent().length != 0){
					if($evtarget.parent().parent().css("transform") != 'none' && $evtarget.parent().parent().css("transform") != 'inherit' && $evtarget.parent().parent().css("transform") != ''){
						$body.addClass("yp-has-transform");
					}
				}

                var $sp = " > ";

                // For tooltip
                var previewDir = $dirx.split($sp);
                var lastDir = previewDir.length;
                var tagName = $iframe.find(".yp-selected")[0].nodeName;

                if (typeof previewDir[lastDir - 3] != 'undefined') {
                    var showDir = previewDir[lastDir - 3] + $sp + previewDir[lastDir - 2] + $sp + previewDir[lastDir - 1];
                } else if (typeof previewDir[lastDir - 2] != 'undefined') {
                    var showDir = previewDir[lastDir - 2] + $sp + previewDir[lastDir - 1];
                }else{
					var showDir = previewDir[lastDir - 1];
				}

                yp_draw_box(evt.target, 'yp-selected-boxed');

                // Element Tooltip
                $iframeBody.append("<div class='yp-selected-tooltip'><small>" + yp_tag_info(tagName, $dirx) + "</small> " + showDir + "</div>");

                yp_tooltip_draw();

                // Select Others.
                $iframe.find($dirx+":not(.yp-selected)").each(function(i) {
					
					$(this).addClass("yp-selected-others");
					yp_draw_box_other(this, 'yp-selected-others', i);

                });


            }

            // if body and html so clean.
            if ($nodeName == 'BODY' || $nodeName == 'HTML') {

                if ($body.hasClass("yp-content-selected") == false) {

                    // Remove all ex data.
                    yp_clean();

                }

            }

        }

    });



    /* ---------------------------------------------------- */
    /* Doing update the draw.		 						*/
    /* ---------------------------------------------------- */
    function yp_draw() {

    	if($iframeBody.find(".yp-selected").css("display") == 'none'){
			return false;
		}

        // selected boxed.
        yp_draw_box(".yp-selected", 'yp-selected-boxed');

        // Select Others.
        $iframeBody.find(".yp-selected-others").each(function(i) {
	
			yp_draw_box_other(this, 'yp-selected-others', i);

        });

        // tooltip
        yp_tooltip_draw();

    }


    /* ---------------------------------------------------- */
    /* use important if CSS not working without important 	*/
    /* ---------------------------------------------------- */
    function yp_insert_important_rule($dir, $id, $css, $value, $prefix) {

    	$value = $value.replace(/ !important/g, "").replace(/!important/g, "");

		// Remove ex.
        $iframeBody.find("." + yp_id($dir) + '-' + $id + '-style[data-size-mode="'+$(".responsive-selector.active").data("mode")+'"]').remove();

        // append style area if not have.
        if (!$iframe.find(".yp-styles-area").length > 0){
            $iframeBody.append("<div class='yp-styles-area'></div>");
        }
		
		// Responsive Settings
		var $mediaB = '';
		var $mediaF = '';
		
		if($(".responsive-selector.active").data("mode") == 'mobile'){
			$mediaB = '@media (max-width:767px){';
			$mediaF = '}';
		}
		
		if($(".responsive-selector.active").data("mode") == 'tablet'){
			$mediaB = '@media (min-width: 768px) and (max-width: 991px){';
			$mediaF = '}';
		}

		// Append.
		if(yp_id($dir) != ''){
			$iframe.find(".yp-styles-area").append('<style data-size-mode="'+$(".responsive-selector.active").data("mode")+'" data-style="' + yp_id($dir) + '" class="' + yp_id($dir) + '-' + $id + '-style yp_current_styles">'+$mediaB+'' + '' + $dir + '{' + $css + ':' + $value + $prefix + ' !important}' + ''+$mediaF+'</style>');
		}
		
    }
	
	
	// Keyup bind.
	$("#cssData").keyup(function(e){
		
		// Append all css to iframe.
		if($iframe.find("#yp-css-data-full").length == 0){
			$iframeBody.append("<style id='yp-css-data-full'></style>");
		}

		// Need to process.
		$body.addClass("yp-need-to-process");
		
		// Update css source.
		$iframe.find("#yp-css-data-full").html(editor.getValue());
		
		// Empty data.
		$iframe.find(".yp-styles-area").empty();
		
		// Remove ex.
		yp_clean();
		
		// Update
		$(".yp-save-btn").html("Save").removeClass("yp-disabled").addClass("waiting-for-save");
		
		// Update sceen.
		yp_resize();
		
	});
	
	
	// Return to data again.
	$(".yp-select-bar").hover(function(){
		
		// CSS To Data.
		yp_process(false,false);
		
	});

	// Hide borders while on nouiselect.
	$(document).on("mouseover", ".wqselect2-dropdown", function(){

		if($("body").hasClass("yp-selectors-hide") == false){

			$("body").addClass("yp-selectors-hide");

			// Opacity Selector
			if ($iframeBody.find(".context-menu-active").length > 0){
				$iframeBody.find(".yp-selected").contextMenu("hide");
			}

			$iframe.find(".yp-selected-handle,.yp-selected-tooltip,.yp-selected-boxed-margin-top,.yp-selected-boxed-margin-bottom,.yp-selected-boxed-margin-left,.yp-selected-boxed-margin-right,.yp-selected-boxed-top,.yp-selected-boxed-bottom,.yp-selected-boxed-left,.yp-selected-boxed-right,.yp-selected-others-top,.yp-selected-others-bottom,.yp-selected-others-left,.yp-selected-others-right").stop().animate({ opacity: 0},200);

		}

	});

	// Hide borders while editing.
	$(".yp-this-content").hover(function(event){

		if($("body").hasClass("yp-selectors-hide") == false){

			$("body").addClass("yp-selectors-hide");

			// Opacity Selector
			if ($iframeBody.find(".context-menu-active").length > 0){
				$iframeBody.find(".yp-selected").contextMenu("hide");
			}

			$iframe.find(".yp-selected-handle,.yp-selected-tooltip,.yp-selected-boxed-margin-top,.yp-selected-boxed-margin-bottom,.yp-selected-boxed-margin-left,.yp-selected-boxed-margin-right,.yp-selected-boxed-top,.yp-selected-boxed-bottom,.yp-selected-boxed-left,.yp-selected-boxed-right,.yp-selected-others-top,.yp-selected-others-bottom,.yp-selected-others-left,.yp-selected-others-right").stop().animate({ opacity: 0},200);

		}

	},function(){

		if($("body").hasClass("yp-selectors-hide")){

			$("body").removeClass("yp-selectors-hide");

			$iframe.find(".yp-selected-handle,.yp-selected-tooltip,.yp-selected-boxed-margin-top,.yp-selected-boxed-margin-bottom,.yp-selected-boxed-margin-left,.yp-selected-boxed-margin-right,.yp-selected-boxed-top,.yp-selected-boxed-bottom,.yp-selected-boxed-left,.yp-selected-boxed-right,.yp-selected-others-top,.yp-selected-others-bottom,.yp-selected-others-left,.yp-selected-others-right").stop().animate({ opacity: 1},200);

		}

	});
	
	
	// CSS To Yellow Pencil Data.
	function yp_cssToData(type){
		
		$body.addClass("process-by-code-editor");
		
		if(type == 'desktop'){		
		if($body.hasClass("yp-medium-device")){
			$body.attr("data-type-default",".yp-button-medium-device");
		}
		
		if($body.hasClass("yp-small-device")){
			$body.attr("data-type-default",".yp-button-small-device");
		}
		
		if($body.hasClass("yp-small-device") == false && $body.hasClass("yp-medium-device") == false){
			$body.attr("data-type-default",".yp-button-large-device");
		}
		}
		
		if($iframe.find("#yp-css-data-full").length == 0){
			return false;
		}

		// Source.
		var source = editor.getValue();
		
		// Clean.
		source = source.replace(/(\r\n|\n|\r)/g,"").replace(/\t/g, '');
		
		// Don't care rules in comment.
		source = source.replace(/\/\*(.*?)\*\//g,"");
		
		// if desktop, update.
		if(type == 'desktop'){
			$(".yp-button-large-device").trigger("click");
		}
		
		// Resposive media converter
		if(source.indexOf("@media") != -1){
			
			// Clean.
			source = source.replace(/\} \}/g,'}}').replace(/\}  \}/g,'}}').replace(/\}   \}/g,'}}').replace(/\}   \}/g,'}}').replace(/\}    \}/g,'}}').replace(/\}	\}/g,'}}').replace(/\}		\}/g,'}}').replace(/\}	 \}/g,'}}').replace(/\} 	\}/g,'}}');
			
			// if tablet.
			if(type == 'tablet'){
				source = source.match(/@media \(min(.*?)\}\}/g);
				if(source === null){
					$(".responsive-list").find(".active").removeClass("active");
					$($body.attr("data-type-default")).trigger("click").addClass("active");
					return false;
				}
				source = source.toString().replace("@media (min-width: 768px) and (max-width: 991px){","");
				source = source.toString().replace("}}","}");
				$(".yp-button-medium-device").trigger("click");
			}
			
			// if mobile.
			if(type == 'mobile'){
				source = source.match(/@media \(max(.*?)\}\}/g);
				if(source === null){
					$(".responsive-list").find(".active").removeClass("active");
					$($body.attr("data-type-default")).trigger("click").addClass("active");
					return false;
				}
				source = source.toString().replace("@media (max-width:767px){","");
				source = source.toString().replace("}}","}");
				$(".yp-button-small-device").trigger("click");
			}
		}
		
		// if no source, stop.
		if(source == ''){
			return false;
		}
		
		// if have a problem in source, stop.
		if(source.indexOf("{") == source.indexOf("}")){
			
			return false;
			
		}
		
		var CSSRules;
		var selector;
		
		// IF Desktop; Remove All Rules. (because first call by desktop)
		if(type == 'desktop'){
			$iframe.find(".yp-styles-area").empty();
		}
		
		// If mobile, remove CSS data area. (because last call by mobile)
		if(type == 'mobile'){
			$iframe.find("#yp-css-data-full").remove();
		}
		
		// Don't care rules in media query.
		source = source.replace(/@media(.*?)\}\}/g, '');
		
		// Getting All CSS Selectors.
		var allSelectors = yp_cleanArray(source.replace(/\{(.*?)\}/g,'|BREAK|').split("|BREAK|"));
		
		// Each All Selectors
		for (var i = 0; i < allSelectors.length; i++){
			
			// Get Selector.
			selector = $.trim(allSelectors[i]);
			
			if(selector != '}' && selector != '}}' && selector != '{' && selector != '' && selector != ' ' && selector != '  ' && selector != '	'){
			
				// Getting CSS Rules.
				CSSRules = source.match(new RegExp(selector+'{(.*)}'));
			
				if(CSSRules != null && CSSRules != ''){
			
					// Clean.
					CSSRules = CSSRules.toString().split("}")[0].split("{")[1].split(";");
					
					// Variables.
					var ruleAll;
					var ruleName;
					var ruleVal;
					
					// Each CSSRules.
					for (var iq = 0; iq < CSSRules.length; iq++){
						
						ruleAll = $.trim(CSSRules[iq]);
						
						if(typeof ruleAll != undefined && ruleAll.length >= 3 && ruleAll.indexOf(":") != -1){
						
							ruleName = ruleAll.split(":")[0];
							
							if(ruleName != ''){
							
								ruleVal = ruleAll.split(':').slice(1).join(':');

								ruleVal = ruleVal;
								
								if(ruleVal != '' && ruleName.indexOf("-webkit-filter") === -1 && ruleName.indexOf("-webkit-transform") === -1){
									
									if($(".yp_debug").css(ruleName) != undefined || ruleName != 'background-parallax' || ruleName != 'background-parallax-speed' || ruleName != 'background-parallax-x'){
										
										$(".yp_debug").removeAttr("style");

										$body.addClass("yp-css-converter"); // for not use important tag.

										// Adding classes.
										$iframe.find(selector).addClass("yp_selected").addClass("yp_onscreen").addClass("yp_hover").addClass("yp_focus").addClass("yp_click");

										// Update
										yp_insert_rule(selector, ruleName, ruleName, ruleVal, '');

										$body.removeClass("yp-css-converter"); // remove class after update.

										// Removing classes.
										$iframe.find(selector).removeClass("yp_selected").removeClass("yp_onscreen").removeClass("yp_hover").removeClass("yp_focus").removeClass("yp_click");
											
										// Update.
										$(".yp-save-btn").html("Save").removeClass("yp-disabled").addClass("waiting-for-save");
									
									}
								
								}
							
							}
						
						}
						
					}
				
				}
		
			}
			
		}
		
		if(type == 'mobile'){
			$(".responsive-list").find(".active").removeClass("active");
			$($body.attr("data-type-default")).trigger("click").addClass("active");
		}
		
	}



    /* ---------------------------------------------------- */
    /* Appy CSS To theme for demo	 						*/
    /* ---------------------------------------------------- */
    function yp_insert_rule($dir, $id, $css, $value, $prefix){

    	var $valCon = $.trim($value.replace(/!important/g,''));

    	// Background image fix.
 		if($id == 'background-image' && $value != 'disable' && $valCon != 'none' && $value != ''){
	    	if($value.replace(/\s/g,"") == 'url()' || $value.indexOf("//") == -1){
				$value = 'disable';
			}
		}

		// adding automatic relative.
		if($id == 'top' || $id == 'bottom' || $id == 'left' || $id == 'right'){
			
			$iframeBody.find($dir).removeClass("ready-for-drag");

			setTimeout(function(){
				if($iframeBody.find($dir).css("position") == 'static'){
					$("#position-relative").trigger("click");
				}
				$iframeBody.find($dir).addClass("ready-for-drag");
			},5);

		}

		if($id == 'position' && $valCon == 'static'){
			$body.addClass("yp-position-static");
		}else if($id == 'position'){
			$body.removeClass("yp-position-static");
		}

    	// Animation name settings.
		if($id == 'animation-name' && $body.hasClass("process-by-code-editor") == false){
			
			$dir = $dir.replace(/\.yp_onscreen/g,'').replace(/\.yp_hover/g,'').replace(/\.yp_focus/g,'').replace(/\.yp_click/g,'');
			
			var $diry = $dir.split(":");
			var $vay = "."+$("select#yp-animation-play").val();
			
			if($diry[1] != undefined){
				$dir = $diry[0]+$vay+":"+$diry[1];
			}else{
				$dir = $diry[0]+$vay;
			}
			
		}
	
		// Selection settings.
        var $selection = $('body').attr('data-yp-selector');

        if (typeof $selection === typeof undefined || $selection === false){
			
            var $selection = '';
			
        } else {
			
			$dir = $dir.replace("body ","")
			$dir.replace("body","");
			
            $dir = 'body.yp-selector-' + $selection.replace(':', '') + " " + $dir;
			
			$dir = $dir.replace('body.yp-selector-'+$selection.replace(':', '')+' body.yp-selector-'+$selection.replace(':', '')+' ','body.yp-selector-'+$selection.replace(':', '')+' ');
        
		}
		

		// Delete same data.
		var $ex = $iframeBody.find("." + yp_id($dir) + '-' + $id + '-style[data-size-mode="'+$(".responsive-selector.active").data("mode")+'"]');
		if($ex.length > 0){
			if($ex.html().split(":")[1].split("}")[0] == $value){
				return false;
			}else{
				$ex.remove(); // else remove.
			}
		}

		// Delete same data for filter and transform -webkit- prefix.
		var $ex = $iframeBody.find("." + yp_id($dir) + '-' + "-webkit-"+$id + '-style[data-size-mode="'+$(".responsive-selector.active").data("mode")+'"]');
		if($ex.length > 0){
			if($ex.html().split(":")[1].split("}")[0] == $value){
				return false;
			}else{
				$ex.remove(); // else remove.
			}
		}


		// Filter
		if($id == 'filter' || $id == 'transform'){

			if ($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
    			yp_insert_rule($dir, "-webkit-"+$id, "-webkit-"+$css, $value, $prefix);
    		}

    	}

    	// Transform and filter
		if($id.indexOf("-filter") == -1 || $id.indexOf("-transform") == -1){
			if ($value == 'disable' || $value == '' || $value == 'undefined' || $value == null){
				return false;
			}
		}else if($id == 'text-transform'){
			if ($value == 'disable' || $value == '' || $value == 'undefined' || $value == null){
				return false;
			}
		}

		// Append style area.
		if (!$iframe.find(".yp-styles-area").length > 0) {
			$iframeBody.append("<div class='yp-styles-area'></div>");
		}

		// No px em etc for this options.
		if ($id == 'z-index' || $id == 'opacity' || $id == 'background-parallax-speed' || $id == 'background-parallax-x' || $id == 'blur-filter' || $id == 'grayscale-filter' || $id == 'brightness-filter' || $id == 'contrast-filter' || $id == 'hue-rotate-filter' || $id == 'saturate-filter' || $id == 'sepia-filter' || $id.indexOf("-transform") != -1) {
			if($id != 'text-transform' && $id != '-webkit-transform'){
				$value = yp_num($value);
				$prefix = '';
			}
		}
		
		// Filter Default options.
		if($id == 'blur-filter' || $id == 'grayscale-filter' || $id == 'brightness-filter' || $id == 'contrast-filter' || $id == 'hue-rotate-filter' || $id == 'saturate-filter' || $id == 'sepia-filter'){
			
			if($iframe.find('.' + yp_id($dir) + '-filter-style').length > 0){

				var $filterBefore = $iframe.find('.' + yp_id($dir) + '-filter-style').html();

				// Fix responsive bug
				if($filterBefore.indexOf("@media") != -1){

					$filterBefore = $filterBefore.match(/{(.*)}/g).toString().replace(/{(.*)}/g,"$1").split(":")[1].split("}")[0];

				}else{

					$filterBefore = $filterBefore.split(":")[1].split("}")[0];

				}

			}else{
				var $filterBefore = '';
			}
			
			$prefix = '';
			
		}
		
		// Blur filter
		if($id == 'blur-filter'){
			if($filterBefore.indexOf("blur") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" blur("+yp_num($value)+"px)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/blur\((.*?)\)/g,'blur('+yp_num($value)+'px)');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ blur\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Grayscale filter
		if($id == 'grayscale-filter'){
			
			if($filterBefore.indexOf("grayscale") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" grayscale("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/grayscale\((.*?)\)/g,'grayscale('+yp_num($value)+')');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ grayscale\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Brightness Filter
		if($id == 'brightness-filter'){
			
			if($filterBefore.indexOf("brightness") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" brightness("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/brightness\((.*?)\)/g,'brightness('+yp_num($value)+')');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ brightness\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Contrast Filter
		if($id == 'contrast-filter'){
			
			if($filterBefore.indexOf("contrast") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" contrast("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/contrast\((.*?)\)/g,'contrast('+yp_num($value)+')');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ contrast\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Hue rotate filter
		if($id == 'hue-rotate-filter'){
			
			if($filterBefore.indexOf("hue-rotate") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" hue-rotate("+yp_num($value)+"deg)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/hue-rotate\((.*?)\)/g,'hue-rotate('+yp_num($value)+'deg)');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ hue-rotate\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Saturate filter
		if($id == 'saturate-filter'){
			
			if($filterBefore.indexOf("saturate") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" saturate("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/saturate\((.*?)\)/g,'saturate('+yp_num($value)+')');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ saturate\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Sepia Filter
		if($id == 'sepia-filter'){
			
			if($filterBefore.indexOf("sepia") == -1){
				// Add new
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore+" sepia("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$filterBefore = $filterBefore.replace(/sepia\((.*?)\)/g,'sepia('+yp_num($value)+')');
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'filter', 'filter', $filterBefore.replace(/ sepia\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Transform Settings
		if($id.indexOf("-transform") != -1 && $id != 'text-transform'){
			
			$body.addClass("yp-has-transform");
			
			if($iframe.find('.' + yp_id($dir) + '-transform-style').length > 0){
				var $transformBefore = $iframe.find('.' + yp_id($dir) + '-transform-style').html()
			
				// Fix responsive bug
				if($transformBefore.indexOf("@media") != -1){

					$transformBefore = $transformBefore.match(/{(.*)}/g).toString().replace(/{(.*)}/g,"$1").split(":")[1].split("}")[0];

				}else{

					$transformBefore = $transformBefore.split(":")[1].split("}")[0];

				}

			}else{
				var $transformBefore = '';
			}
			
			$prefix = '';
			
		}
		
		// Scale transfrom
		if($id == 'scale-transform'){
			if($transformBefore.indexOf("scale") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" scale("+yp_num($value)+")", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/scale\((.*?)\)/g,'scale('+yp_num($value)+')');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ scale\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Rotate Transform
		if($id == 'rotate-transform'){
			if($transformBefore.indexOf("rotate") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" rotate("+yp_num($value)+"deg)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/rotate\((.*?)\)/g,'rotate('+yp_num($value)+'deg)');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ rotate\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Translate transform
		if($id == 'translate-x-transform'){
			if($transformBefore.indexOf("translateX") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" translateX("+yp_num($value)+"px)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/translateX\((.*?)\)/g,'translateX('+yp_num($value)+'px)');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ translateX\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Translate transform
		if($id == 'translate-y-transform'){
			if($transformBefore.indexOf("translateY") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" translateY("+yp_num($value)+"px)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/translateY\((.*?)\)/g,'translateY('+yp_num($value)+'px)');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ translateY\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Skew transform
		if($id == 'skew-x-transform'){
			if($transformBefore.indexOf("skewX") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" skewX("+yp_num($value)+"deg)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/skewX\((.*?)\)/g,'skewX('+yp_num($value)+'deg)');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ skewX\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Skew transform
		if($id == 'skew-y-transform'){
			if($transformBefore.indexOf("skewY") == -1){
				// Add new
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore+" skewY("+yp_num($value)+"deg)", $prefix);
			}else if($value != 'disable' && $value != '' && $value != 'undefined' && $value != null){
				// Replace with ex.
				$transformBefore = $transformBefore.replace(/skewY\((.*?)\)/g,'skewY('+yp_num($value)+'deg)');
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore, $prefix);
			}else{
				yp_insert_rule($dir, 'transform', 'transform', $transformBefore.replace(/ skewY\((.*?)\)/g,''), '');
			}
			return false;
		}
		
		// Box Shadow
		if($id == 'box-shadow-inset' || $id == 'box-shadow-color' || $id == 'box-shadow-vertical' || $id == 'box-shadow-blur-radius' || $id == 'box-shadow-spread' || $id == 'box-shadow-horizontal'){
			
			if($iframe.find('.' + yp_id($dir) + '-box-shadow-style').length > 0){
				var $shadowBefore = $iframe.find('.' + yp_id($dir) + '-box-shadow-style').html();

				// Fix responsive bug
				if($shadowBefore.indexOf("@media") != -1){

					$shadowBefore = $shadowBefore.match(/{(.*)}/g).toString().replace(/{(.*)}/g,"$1").split(":")[1].split("}")[0];

				}else{

					$shadowBefore = $shadowBefore.split(":")[1].split("}")[0];

				}

			}else{
				var $shadowBefore = '0px 0px 0px 0px #000000';
			}
			
			$prefix = '';
			
		}
		
		// Box shadow options
		if($id.indexOf("box-shadow-") != -1){
			
			var shadowType = $id.replace("box-shadow-","");
			
			if(shadowType == "horizontal"){
				
				if($value != 'disable' && $valCon != 'none' && $value != '' && $value != null){
					
					var lastF = '';
					if($shadowBefore.indexOf("inset") != -1){
						lastF = ' inset';
					}

					$shadowBefore = $value+"px"+" "+$shadowBefore.split(" ")[1]+" "+$shadowBefore.split(" ")[2]+" "+$shadowBefore.split(" ")[3]+" "+$shadowBefore.split(" ")[4]+" "+$shadowBefore.split(" ")[5]+lastF;
					
					$shadowBefore = $shadowBefore.replace(/undefined/g,'');
					$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
					$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');
					
				}
				
				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
			if(shadowType == "vertical"){
				
				if($value != 'disable' && $valCon != 'none' && $value != '' && $value != null){

					var lastF = '';
					if($shadowBefore.indexOf("inset") != -1){
						lastF = ' inset';
					}
				
					$shadowBefore = $shadowBefore.split(" ")[0]+" "+$value+"px"+" "+$shadowBefore.split(" ")[2]+" "+$shadowBefore.split(" ")[3]+" "+$shadowBefore.split(" ")[4]+" "+$shadowBefore.split(" ")[5]+lastF;
					
					$shadowBefore = $shadowBefore.replace(/undefined/g,'');
					$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
					$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');
					
				}
				
				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
			if(shadowType == "blur-radius"){
				
				if($value != 'disable' && $valCon != 'none' && $value != '' && $value != null){
					
					var lastF = '';
					if($shadowBefore.indexOf("inset") != -1){
						lastF = ' inset';
					}
					
					$shadowBefore = $shadowBefore.split(" ")[0]+" "+$shadowBefore.split(" ")[1]+" "+$value+"px"+" "+$shadowBefore.split(" ")[3]+" "+$shadowBefore.split(" ")[4]+" "+$shadowBefore.split(" ")[5]+lastF;
					
					$shadowBefore = $shadowBefore.replace(/undefined/g,'');
					$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
					$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');
					
				}
				
				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
			if(shadowType == "spread"){
				
				if($value != 'disable' && $valCon != 'none' && $value != '' && $value != null){
					
					var lastF = '';
					if($shadowBefore.indexOf("inset") != -1){
						lastF = ' inset';
					}
					
					$shadowBefore = $shadowBefore.split(" ")[0]+" "+$shadowBefore.split(" ")[1]+" "+$shadowBefore.split(" ")[2]+" "+$value+"px"+" "+$shadowBefore.split(" ")[4]+" "+$shadowBefore.split(" ")[5]+lastF;
					
					$shadowBefore = $shadowBefore.replace(/undefined/g,'');
					$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
					$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');
					
				}
				
				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
			if(shadowType == "color"){
				
				if($value != 'disable' && $valCon != 'none' && $value != '' && $value != null){
					
					if($shadowBefore.indexOf("#") == -1){
						$shadowBefore = $shadowBefore + " " + $value;
					}else{
						
						var lastF = '';
						if($shadowBefore.indexOf("inset") != -1){
							lastF = ' inset';
						}
						
						$shadowBefore = $shadowBefore.split("#")[0] + " " + $value+lastF;
						
						$shadowBefore = $shadowBefore.replace(/undefined/g,'');
						$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
						$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');
						
					}
					
				}
				
				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
			if(shadowType == "inset"){
				
				if($value == 'inset' && $shadowBefore.indexOf("inset") == -1){
					$shadowBefore = $shadowBefore+" inset";
				}else{
					$shadowBefore = $shadowBefore.replace(" inset",'').replace(" inset",'');
				}
				
				$shadowBefore = $shadowBefore.replace(/undefined/g,'');
				$shadowBefore = $.trim($shadowBefore.replace(/  /g,' '));
				$shadowBefore = $shadowBefore.replace(/inset inset/g, 'inset');

				yp_insert_rule($dir, 'box-shadow', 'box-shadow', $shadowBefore, $prefix);
				return false;
			}
			
		}
		// Box shadow options end
		

		// Animation options
		if($id == 'animation-play'){
			
			$iframe.find("[data-style]").each(function(){
					
				var $class = null;
				var $style = null;
				var $data = null;
				
				// onscreen
				if($(this).data("style") == yp_id($dir)+"yp_onscreen"){
					$(this).remove();
				}
				
				// hover
				if($(this).data("style") == yp_id($dir)+"yp_hover"){
					$(this).remove();
				}
				
				// click
				if($(this).data("style") == yp_id($dir)+"yp_click"){
					$(this).remove();
				}
				
				// click
				if($(this).data("style") == yp_id($dir)+"yp_focus"){
					$(this).remove();
				}

			});
				
			yp_insert_rule($dir, 'animation-name', 'animation-name', $("#yp-animation-name").val(), $prefix);
			
			return false;
			
		}
		
		// Animation name
		if($id == 'animation-name'){

			yp_insert_rule($dir, 'animation-fill-mode', 'animation-fill-mode', 'both', $prefix);
			yp_insert_rule($dir, 'animation-duration', 'animation-duration', '1s', $prefix);
			
			if($valCon == 'bounce'){
				yp_insert_rule($dir, 'transform-origin', 'transform-origin', 'center bottom', $prefix);
			}else if($valCon == 'swing'){
				yp_insert_rule($dir, 'transform-origin', 'transform-origin', 'top center', $prefix);
			}else if($valCon == 'jello'){
				yp_insert_rule($dir, 'transform-origin', 'transform-origin', 'center', $prefix);
			}else{
				yp_insert_rule($dir, 'transform-origin', 'transform-origin', 'disable', $prefix);
			}
			
			if($valCon == 'flipInX'){
				yp_insert_rule($dir, 'backface-visibility', 'backface-visibility', 'visible', $prefix);
			}else{
				yp_insert_rule($dir, 'backface-visibility', 'backface-visibility', 'disable', $prefix);
			}
		
		}
		
		// Responsive setting
		var $mediaB = '';
		var $mediaF = '';
			
		if($(".responsive-selector.active").data("mode") == 'mobile'){
			$mediaB = '@media (max-width:767px){';
			$mediaF = '}';
		}
			
		if($(".responsive-selector.active").data("mode") == 'tablet'){
			$mediaB = '@media (min-width: 768px) and (max-width: 991px){';
			$mediaF = '}';
		}

		// Checking.
		if ($value == 'disable' || $value == '' || $value == 'undefined' || $value == null) {
			return false;
		}

		// New Value
		var $current = $value + $prefix;

		// Clean.
		if($body.hasClass("yp-css-converter") == false){
			$current = $current.replace(/ !important/g, "").replace(/!important/g, "");
		}

		// Append default value.
		if(yp_id($dir) != ''){
			$iframe.find(".yp-styles-area").append('<style data-size-mode="'+$(".responsive-selector.active").data("mode")+'" data-style="' + yp_id($dir) + '" class="' + yp_id($dir) + '-' + $id + '-style yp_current_styles">'+$mediaB+'' + '' + $dir + '{' + $css + ':' + $current + '}' + ''+$mediaF+'</style>');
			yp_draw();
			yp_tooltip_draw();
		}

		// If CSS converter, stop here.
		if($body.hasClass("yp-css-converter")){
			return false;
		}

		// Need to wait for test changes.
		// Edit2: No need to wait.
		//setTimeout(function(){

			// Current Value
			var $is_value = $iframe.find(".yp-selected").css($css);

			// If current value not undefined
			if($is_value !== undefined && $is_value !== null){
				
				// for color
				if ($is_value.indexOf("rgb") != -1) {
					$is_value = rgb2hex($is_value);
				}

				// Clean
				$is_value = $is_value.replace(" ","");

			}
				
			// Clean
			$current = $current.replace(" ","");
					
			// false/true
			var $is_important = false;
						
			// If has attr, use important.
			$iframeBody.find($dir).each(function(){
				
				var attr = $(this).attr('style');

				if (typeof attr !== typeof undefined && attr !== false){
					if($(this).attr("style").indexOf($css) >= 0){
						$is_important = true;
					}
				}
				
			});

			// If date mean same thing: stop.
			if(yp_id($current) == 'length' && yp_id($is_value) == 'autoauto'){
				return false;
			}

			if(yp_id($current) == 'inherit' && yp_id($is_value) == 'normal'){
				return false;
			}

			// No need important for parallax and filter.
			if($id == 'background-parallax' || $id == 'background-parallax-x' || $id == 'background-parallax-speed' || $id == 'filter' || $id == '-webkit-filter' || $id == '-webkit-transform'){
				return false;
			}

			// If value is similar.
			if (yp_num($current.replace(".00","").replace(".0","")) !== '' && yp_num($current.replace(".00","").replace(".0","")) !== ' ' && yp_num($current.replace(".00","").replace(".0","")).substring(0, 2) ==  yp_num($is_value.replace(".00","").replace(".0","")).substring(0, 2)){
				return false;
			}

			// if value is same, stop.
			if (($current) == ($is_value) && $is_important != true){
				return false;
			}

			// font-family bug.
			if (($current.replace(/'/g,'"').replace(/, /g,",")) == $is_value && $is_important != true){
				return false;
			}

			// background position fix.
			if($id == 'background-position'){

				if($current == 'lefttop' && $is_value == '0%0%'){
					return false;
				}

				if($current == 'leftcenter' && $is_value == '0%50%'){
					return false;
				}

				if($current == 'leftbottom' && $is_value == '0%100%'){
					return false;
				}

				if($current == 'righttop' && $is_value == '100%0%'){
					return false;
				}

				if($current == 'rightcenter' && $is_value == '100%50%'){
					return false;
				}

				if($current == 'rightbottom' && $is_value == '100%100%'){
					return false;
				}

				if($current == 'centertop' && $is_value == '50%0%'){
					return false;
				}

				if($current == 'centercenter' && $is_value == '50%50%'){
					return false;
				}

				if($current == 'centercenter' && $is_value == '50%50%'){
					return false;
				}

				if($current == 'centerbottom' && $is_value == '50%100%'){
					return false;
				}

				if($current == 'centerbottom' && $is_value == '50%100%'){
					return false;
				}

			}

			// DEBUG
			//$(".yp-li-about").html("current:"+ $current + "<br> value:" + $is_value);

			// Use important.
			yp_insert_important_rule($dir, $id, $css, $value, $prefix);

			// Update
			yp_draw();
			yp_tooltip_draw();

	
	}


    /* ---------------------------------------------------- */
    /* Setup Slider Option			 						*/
    /* ---------------------------------------------------- */
    function yp_slider_option($id, $decimals, $pxv, $pcv, $emv) {

        // Set Maximum and minimum values for custom prefixs.
        $("#" + $id + "-group").data("px-range", $pxv);
        $("#" + $id + "-group").data("pc-range", $pcv);
        $("#" + $id + "-group").data("em-range", $emv);

        // Default PX
        var $range = $("#" + $id + "-group").data("px-range").split(",");

        // Update PX.
        if ($("#" + $id + "-group .yp-after-prefix").val() == 'px') {
            var $range = $("#" + $id + "-group").data("px-range").split(",");
        }

        // Update %.
        if ($("#" + $id + "-group .yp-after-prefix").val() == '%') {
            var $range = $("#" + $id + "-group").data("pc-range").split(",");
        }

        // Update EM.
        if ($("#" + $id + "-group .yp-after-prefix").val() == 'em') {
            var $range = $("#" + $id + "-group").data("em-range").split(",");
        }
		

        // Setup slider.
        $('#yp-' + $id).wqNoUiSlider({

            start: [0],

            range: {
                'min': parseInt($range[0]),
                'max': parseInt($range[1])
            },

            format: wNumb({
                mark: '.',
                decimals: $decimals
            })


        }).Link('lower').to($('#' + $id + '-value')).on('slide', function() {

            yp_slide_action($(this), $id, true);

        });

    }


    /* ---------------------------------------------------- */
    /* Slider Event					 						*/
    /* ---------------------------------------------------- */
    function yp_slide_action($this, $id, $slider){

        var $css = $this.parent().parent().data("css");

        if ($slider == true) {

            var $val = $this.val();

            // If active, disable it.
            $this.parent().parent().find(".yp-btn-action.active").trigger("click");

        } else {

            var $val = $this.parent().find("#" + $css + "-value").val();

        }

        var $way = yp_get_parents($iframe.find(".yp-selected"));
        var $css_after = $this.parent().find("#" + $css + "-after").val();


        // Border Width Fix
        if ($id == 'border-width') {

 			// Set border width to all top, right..
			if($css_after != $("#border-top-width-after").val()){
				$("#border-top-width-after").val($css_after).trigger("keyup");
			}
			if($css_after != $("#border-right-width-after").val()){
				$("#border-right-width-after").val($css_after).trigger("keyup");
			}
			if($css_after != $("#border-bottom-width-after").val()){
				$("#border-bottom-width-after").val($css_after).trigger("keyup");
			}
			if($css_after != $("#border-right-width-after").val()){
				$("#border-right-width-after").val($css_after).trigger("keyup");
			}
			

            // Value
            $("#yp-border-top-width,#yp-border-bottom-width,#yp-border-left-width,#yp-border-right-width").val($val);

            // disable
            $("#border-top-width-group .yp-disable-btn.active,#border-right-width-group .yp-disable-btn.active,#border-bottom-width-group .yp-disable-btn.active,#border-left-width-group .yp-disable-btn.active").trigger("click");

            // update CSS
            yp_insert_rule($way, 'border-top-width', 'border-top-width', $val, $css_after);
            yp_insert_rule($way, 'border-bottom-width', 'border-bottom-width', $val, $css_after);
            yp_insert_rule($way, 'border-left-width', 'border-left-width', $val, $css_after);
            yp_insert_rule($way, 'border-right-width', 'border-right-width', $val, $css_after);

        }


        if ($id != 'border-width') {

            // Set for demo
            yp_insert_rule($way, $id, $css, $val, $css_after);

        }

        // Option Changed
        yp_option_change();


    }




    /* ---------------------------------------------------- */
    /* Getting radio val.									*/
    /* ---------------------------------------------------- */
    function yp_radio_value($the_id, $n, $data) {

        var $id_prt = $the_id.parent().parent();

        // for none btn
        $id_prt.find(".yp-btn-action.active").trigger("click");

        if ($data == $id_prt.find(".yp-none-btn").text()) {
            $id_prt.find(".yp-none-btn").trigger("click");
        }

        if ($data == 'auto auto') {
            $data = 'auto';
        }

        if ($data != '') {
			
			if($n == 'background-size' && typeof $data != 'undefined'){
				if($data.indexOf("auto") > 0){
					$data = 'auto';
				}
			}
			
			if($n == 'text-decoration' && typeof $data != 'undefined'){
				if($data.indexOf("none") > 0){
					$data = 'none';
				}
			}

            if ($("input[name=" + $n + "][value=" + $data + "]").length > 0) {

                $the_id.find(".active").removeClass("active");

                $("input[name=" + $n + "][value=" + $data + "]").prop('checked', true).parent().addClass("active");

            } else {

                $the_id.find(".active").removeClass("active");

                // Disable all.
                $("input[name=" + $n + "]").each(function() {

                    $(this).prop('checked', false);

                });

            }

        }

    }


    /* ---------------------------------------------------- */
    /* Radio Event					 						*/
    /* ---------------------------------------------------- */
    function yp_radio_option($id) {

        $("#yp-" + $id + " label").on('click', function() {

            var $way = yp_get_parents($iframe.find(".yp-selected"));
            var $css = $(this).parent().parent().parent().parent().data("css");

            // Disable none.
            $(this).parent().parent().parent().parent().find(".yp-btn-action.active").removeClass("active");

            $("#yp-" + $id).find(".active").removeClass("active");

            $(this).parent().addClass("active");

            $("#" + $(this).attr("data-for")).prop('checked', true);

            var $val = $("input[name=" + $id + "]:checked").val();

            // Border style fix.
            if ($id == 'border-style') {

                yp_radio_value($("#yp-border-top-style"), 'border-top-style', $val);
                yp_radio_value($("#yp-border-bottom-style"), 'border-bottom-style', $val);
                yp_radio_value($("#yp-border-left-style"), 'border-left-style', $val);
                yp_radio_value($("#yp-border-right-style"), 'border-right-style', $val);


                yp_insert_rule($way, 'border-top-style', 'border-top-style', $val, '');
                yp_insert_rule($way, 'border-bottom-style', 'border-bottom-style', $val, '');
                yp_insert_rule($way, 'border-left-style', 'border-left-style', $val, '');
                yp_insert_rule($way, 'border-right-style', 'border-right-style', $val, '');

            }


            if ($id != 'border-style') {

                // Set for demo
                yp_insert_rule($way, $id, $css, $val, '');

            }

            // Option Changed
            yp_option_change();


        });

    }


    /* ---------------------------------------------------- */
    /* Check if is safe font family.						*/
    /* ---------------------------------------------------- */
    function yp_safe_fonts(a) {

        if (a == 'Arial') {
            return true;
        } else if (a == 'Arial Black') {
            return true;
        } else if (a == 'Arial Narrow') {
            return true;
        } else if (a == 'Arial Rounded MT Bold') {
            return true;
        } else if (a == 'Avant Garde') {
            return true;
        } else if (a == 'Calibri') {
            return true;
        } else if (a == 'Candara') {
            return true;
        } else if (a == 'Century Gothic') {
            return true;
        } else if (a == 'Franklin Gothic Medium') {
            return true;
        } else if (a == 'Futura') {
            return true;
        } else if (a == 'Geneva') {
            return true;
        } else if (a == 'Gill Sans') {
            return true;
        } else if (a == 'Helvetica Neue') {
            return true;
        } else if (a == 'Impact') {
            return true;
        } else if (a == 'Lucida Grande') {
            return true;
        } else if (a == 'Optima') {
            return true;
        } else if (a == 'Segoe UI') {
            return true;
        } else if (a == 'Tahoma') {
            return true;
        } else if (a == 'Trebuchet MS') {
            return true;
        } else if (a == 'Verdana') {
            return true;
        } else if (a == 'Big Caslon') {
            return true;
        } else if (a == 'Bodoni MT') {
            return true;
        } else if (a == 'Book Antiqua') {
            return true;
        } else if (a == 'Calisto MT') {
            return true;
        } else if (a == 'Cambria') {
            return true;
        } else if (a == 'Didot') {
            return true;
        } else if (a == 'Garamond') {
            return true;
        } else if (a == 'Georgia') {
            return true;
        } else if (a == 'Goudy Old Style') {
            return true;
        } else if (a == 'Hoefler Text') {
            return true;
        } else if (a == 'Lucida Bright') {
            return true;
        } else if (a == 'Palatino') {
            return true;
        } else if (a == 'Perpetua') {
            return true;
        } else if (a == 'Rockwell') {
            return true;
        } else if (a == 'Rockwell Extra Bold') {
            return true;
        } else if (a == 'Baskerville') {
            return true;
        } else if (a == 'Times New Roman') {
            return true;
        } else if (a == 'Consolas') {
            return true;
        } else if (a == 'Courier New') {
            return true;
        } else if (a == 'Lucida Console') {
            return true;
        } else if (a == 'HelveticaNeue') {
			return true;
		} else {
            return false;
        }

    }

	
	/* ---------------------------------------------------- */
    /* Select li hover				 						*/
    /* ---------------------------------------------------- */
	var timerL;
	var delay = 160;
	$(document).on("mouseover", ".wqselect2-results__options li", function(){
		
		var $a = $(this);
			
		timerL = setTimeout(function() {
		
			// If not current.
			if(!$a.hasClass("wqselect2-results__option--highlighted")){
				return false;
			}
			
			// If not undefined.
			if(typeof $a.parent().attr("id") == 'undefined'){
				return false;
			}

			// Font weight
			if ($a.parent().attr("id").replace("wqselect2-", "").replace("-results", "").replace("yp-", "") == 'font-weight' && $a.text() != 'No results found') {

				// Remove test font-width style.
				$iframeBody.find("#yp-font-weight-test-style").remove();

				// Responsive
				var $mediaB = '';
				var $mediaF = '';
					
				if($(".responsive-selector.active").data("mode") == 'mobile'){
					$mediaB = '@media (max-width:767px){';
					$mediaF = '}';
				}
					
				if($(".responsive-selector.active").data("mode") == 'tablet'){
					$mediaB = '@media (min-width: 768px) and (max-width: 991px){';
					$mediaF = '}';
				}

				// Append
				$iframeBody.append("<style data-size-mode='"+$(".responsive-selector.active").data("mode")+"' id='yp-font-weight-test-style'>"+$mediaB+".yp-selected,.yp-selected-others,"+yp_get_parents($iframe.find(".yp-selected"))+"{font-weight:" + yp_num($a.text()).replace("-", "") + " !important;}"+$mediaF+"</style>");

			}

			
			// Font family
			if ($a.parent().attr("id").replace("wqselect2-", "").replace("-results", "").replace("yp-", "") == 'font-family' && $a.text() != 'No results found') {
		
				var $activeFont = $iframeBody.find(".yp-font-test-style").data("family");
				
				$iframe.find("#yp-font-test-style").remove();
					
				var $fid = yp_id($.trim($a.text().replace(/ /g, '+')));

					if (yp_safe_fonts($a.text()) == false && $iframeBody.find(".yp-font-test-" + $fid).length == 0 && $activeFont != $a.text()) {

						var $weight = yp_num($iframeBody.find("#yp-font-weight").val());

						var $normal = '';
							
						if ($weight != '400') {
							$normal = '400,400italic';
						}
							
						if ($weight != '600') {
							$normal += ',600,600italic';
						}
							
						if ($weight != '300') {
							$normal += ',300';
						}
							
						$weight = $weight+","+$weight+"italic,"+$normal;
							
						$weight = $weight.replace(/,,/g,",");
							
						if (!isFontAvailable($a.text())) {
							$iframeBody.append("<link rel='stylesheet' class='yp-font-test-" + $fid + "'  href='http://fonts.googleapis.com/css?family=" + $.trim($a.text().replace(/ /g, '+')) + ":"+$weight+"' type='text/css' media='all' />");
						}

						// Append always to body.
						$body.append("<link rel='stylesheet' class='yp-font-test-" + $fid + "'  href='http://fonts.googleapis.com/css?family=" + $.trim($a.text().replace(/ /g, '+')) + ":"+$weight+"' type='text/css' media='all' />");
							
					}
						
					// Responsive helper
					var $mediaB = '';
					var $mediaF = '';
						
					if($(".responsive-selector.active").data("mode") == 'mobile'){
						$mediaB = '@media (max-width:767px){';
						$mediaF = '}';
					}
						
					if($(".responsive-selector.active").data("mode") == 'tablet'){
						$mediaB = '@media (min-width: 768px) and (max-width: 991px){';
						$mediaF = '}';
					}

					// Append test font.
					$iframeBody.append("<style data-size-mode='"+$(".responsive-selector.active").data("mode")+"' id='yp-font-test-style' data-family='"+$a.text()+"'>"+$mediaB+".yp-selected,.yp-selected-others,"+yp_get_parents($iframe.find(".yp-selected"))+"{font-family:'" + $a.text() + "' !important;}"+$mediaF+"</style>");

					
					// Check font loaded.
					var $clearFix = setInterval(function() {

						// Send Update
						yp_draw();

					}, 150);

					setTimeout(function() {

						// clear.
						clearInterval($clearFix);

					}, 2000);
					

				$a.css("font-family", $a.text());

			}

			
		}, delay);

		// Font Weight
		if ($a.parent().attr("id").replace("wqselect2-", "").replace("-results", "").replace("yp-", "") == 'font-weight') {

			$(".wqselect2-results__options li").each(function() {
				$a.css("font-weight", yp_num($a.text()).replace(/-/g, ''));
			});

			$(".wqselect2-results__options li").css("font-family", $("#yp-font-family").val());
		}

		// Text shadow
		if ($a.parent().attr("id").replace("wqselect2-", "").replace("-results", "").replace("yp-", "") == 'text-shadow'){

			$(".wqselect2-results__options li").each(function(){

				if($(this).text() == 'Basic Shadow'){
					$(this).css("text-shadow", 'rgba(0, 0, 0, 0.3) 0px 1px 1px');
				}

				if($(this).text() == 'Shadow Multiple'){
					$(this).css("text-shadow", 'rgb(255, 255, 255) 1px 1px 0px, rgb(170, 170, 170) 2px 2px 0px');
				}

				if($(this).text() == 'Anaglyph'){
					$(this).css("text-shadow", 'rgb(255, 0, 0) -1px 0px 0px, rgb(0, 255, 255) 1px 0px 0px');
				}

				if($(this).text() == 'Emboss'){
					$(this).css("text-shadow", 'rgb(255, 255, 255) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px');
				}

				if($(this).text() == 'Neon'){
					$(this).css("text-shadow", 'rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 4px, rgb(255, 255, 255) 0px 0px 6px, rgb(255, 119, 255) 0px 0px 8px, rgb(255, 0, 255) 0px 0px 12px, rgb(255, 0, 255) 0px 0px 16px, rgb(255, 0, 255) 0px 0px 20px, rgb(255, 0, 255) 0px 0px 24px');
				}

				if($(this).text() == 'Outline'){
					$(this).css("text-shadow", 'rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) -1px 0px 1px');
				}

			});

		}

       });

	
	// If mouseout, stop clear time out.
	$(document).on("mouseout", ".wqselect2-results__options li", function(){
		
		clearTimeout(timerL);
	
	});

	
	// Toggle options.
	$(".wf-close-btn-link").click(function(e){
		if($(".yp-editor-list > li.active:not(.yp-li-about):not(.yp-li-footer)").length > 0){
			e.preventDefault();
			$(".yp-editor-list > li.active:not(.yp-li-about):not(.yp-li-footer) > h3").trigger("click");
		}
	});
	


    /* ---------------------------------------------------- */
    /* Select Event					 						*/
    /* ---------------------------------------------------- */
    function yp_select_option($id) {

    	// select on close
        $("#yp-" + $id).on("wqselect2:close", function() {

            if ($id == 'font-family') {
                $iframe.find("#yp-font-test-style").remove();
            }

            if ($id == 'font-weight') {
                $iframe.find("#yp-font-weight-test-style").remove();
            }

            setTimeout(function(){
            	$body.removeClass("yp-select-open");
        	},400);

        });

        // select on close
        $("#yp-" + $id).on("wqselect2:open", function() {

            $body.addClass("yp-select-open");

        });

        // Select on change
        $("#yp-" + $id).on('change', function(e) {
			
            if ($("#" + $id + "-group .yp-setted-default").length > 0) {
                $("#" + $id + "-group .yp-setted-default").removeClass("yp-setted-default");
                return false;
            }

            var $way = yp_get_parents($iframe.find(".yp-selected"))
            var $css = $(this).parent().parent().data("css");

            // Disable
            $(this).parent().parent().find(".yp-btn-action.active").trigger("click");


            // Import google font
            if ($id == 'font-family' && $(this).val() != null && $(".wqselect2-container--open").length > 0) {

                if ($("#" + yp_id($(this).val())).length == 0) {

                    if (!yp_safe_fonts($(this).val())) {

						if (!isFontAvailable($(this).text())) {
							$iframeBody.append("<link rel='stylesheet' class='yp-font-link' id='" + yp_id($(this).val()) + "' href='http://fonts.googleapis.com/css?family=" + $.trim($(this).val().replace(/ /g, '+')) + ":300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic' type='text/css' media='all' />");
						}
						
                        $iframe.find("#yp-font-test-style").remove();

                        // Check if font loaded.
						var $clearFix = setInterval(function() {

							// Send Update
							yp_draw();


						}, 150);

						setTimeout(function() {

							// clear.
							clearInterval($clearFix);


						}, 2000);

                    }

                }

            }

            // Font weight.
            if ($id == 'font-weight') {
                $("#" + $id + "-group .wqselect2-selection__rendered").css($id, $(this).val()).css("font-family", $("#yp-font-family").val());
            }


            // Font family
            if ($id == 'font-family') {
                $("#" + $id + "-group .wqselect2-selection__rendered").css($id, $(this).val());
                $("#font-weight-group .wqselect2-selection__rendered").css("font-family", $("#yp-font-family").val());
            }


            // Animation name play.
            if($id == 'animation-name'){

				// Add class.
				$iframeBody.addClass("yp-hide-borders-now");

				setTimeout(function() {

					// remove class.
					$iframeBody.removeClass("yp-hide-borders-now");

					// Update.
					yp_draw();

					// Tooltip update.
					yp_tooltip_draw();

				}, 1100);

			}


            // If open, update.
			if($(".wqselect2-container--open").length > 0){
				
				// Set for demo
				yp_insert_rule($way, $id, $css, $(this).val(), '');

				yp_option_change();
			
			}

        });

    }


    // Colorpicker helper
    $(".wqcolorpicker").click(function() {
        $(this).val($(this).val().replace("#", ""));
    });


    /* ---------------------------------------------------- */
    /* Color Event					 						*/
    /* ---------------------------------------------------- */
    function yp_color_option($id) {

    	// Color picker on blur
        $("#yp-" + $id).on("blur", function() {

            if ($(this).val() == '') {
                $(this).parent().parent().find(".yp-disable-btn").not(".active").trigger("click");
            }

        });

        // Color picker on change
        $("#yp-" + $id).on('change', function() {

            var $way = yp_get_parents($iframe.find(".yp-selected"));
            var $css = $(this).parent().parent().parent().data("css");
            var $val = $(this).val();

            if ($val.indexOf("#") == -1) {
                $val = "#" + $val;
            }

            // Disable
            $(this).parent().parent().find(".yp-btn-action.active").removeClass("active");

            $(this).parent().parent().find(".yp-after-disable,.yp-after-disable-disable").hide();


            // Border Color Fix
            if ($id == 'border-color') {

                $("#yp-border-top-color").val($val);
                $("#yp-border-bottom-color").val($val);
                $("#yp-border-left-color").val($val);
                $("#yp-border-right-color").val($val);

                // set color
                $("#border-top-color-group .wqminicolors-swatch-color,#border-bottom-color-group .wqminicolors-swatch-color,#border-left-color-group .wqminicolors-swatch-color,#border-right-color-group .wqminicolors-swatch-color").css("background-color", $val);

                // disable
            	$("#border-top-color-group .yp-disable-btn.active,#border-right-color-group .yp-disable-btn.active,#border-bottom-color-group .yp-disable-btn.active,#border-left-color-group .yp-disable-btn.active").trigger("click");

            	// none
            	$("#border-top-color-group .yp-none-btn.active,#border-right-color-group .yp-none-btn.active,#border-bottom-color-group .yp-none-btn.active,#border-left-color-group .yp-none-btn.active").trigger("click");

                yp_insert_rule($way, 'border-top-color', 'border-top-color', $val, '');
                yp_insert_rule($way, 'border-bottom-color', 'border-bottom-color', $val, '');
                yp_insert_rule($way, 'border-left-color', 'border-left-color', $val, '');
                yp_insert_rule($way, 'border-right-color', 'border-right-color', $val, '');

            }

            // If not border color.
            if ($id != 'border-color') {

                // Set for demo
                yp_insert_rule($way, $id, $css, $val, '');

            }

            // Option Changed
            yp_option_change();

		});

    }


    /* ---------------------------------------------------- */
    /* Input Event					 						*/
    /* ---------------------------------------------------- */
    function yp_input_option($id){

    	// Keyup
        $("#yp-" + $id).on('keyup', function() {

            var $way = yp_get_parents($iframe.find(".yp-selected"));
            var $css = $(this).parent().parent().data("css");
            var $val = $(this).val();

            // Disable
            $(this).parent().find(".yp-btn-action.active").trigger("click");


            if ($val == 'none') {
                $(this).parent().parent().find(".yp-none-btn").not(".active").trigger("click");
                $(this).val('');
            }

            if ($val == 'disable') {
                $(this).parent().parent().find(".yp-disable-btn").not(".active").trigger("click");
                $(this).val('');
            }

            if ($val == '') {
                $(this).parent().parent().find(".yp-disable-btn").not(".active").trigger("click");
            }

            $val = $val.replace(/\)/g,'').replace(/\url\(/g,'');
			$(this).val($val);
			
			if($id == 'background-image'){
				$val = 'url(' + $val + ')';
			}

            // Set for demo
            yp_insert_rule($way, $id, $css, $val, '');

            // Option Changed
            yp_option_change();

        });


    }


    /* ---------------------------------------------------- */
    /* Remove data											*/
    /* ---------------------------------------------------- */
    function yp_clean() {

    	$iframeBody.find(".yp-selected,.yp-selected-others").removeClass("ui-draggable ui-draggable-handle ui-draggable-handle");

    	/* this function remove selected element */
		if ($iframeBody.find(".context-menu-active").length > 0){
			$iframeBody.find(".yp-selected").contextMenu("hide");
		}
	
		$body.removeAttr("data-clickable-select");

        $body.removeClass("yp-content-selected").removeClass("yp-body-select-just-it").removeClass("yp-has-transform");

        $iframeBody.find(".yp-selected-others,.yp-selected").removeClass("yp-selected-others").removeClass("yp-selected").removeClass("ready-for-drag");

        $iframeBody.find(".yp-selected-handle,.yp-selected-others-top,.yp-selected-others-left,.yp-selected-others-right,.yp-selected-others-bottom,.yp-selected-tooltip,.yp-selected-boxed-top,.yp-selected-boxed-left,.yp-selected-boxed-right,.yp-selected-boxed-bottom,.yp-selected-boxed-margin-top,.yp-selected-boxed-margin-left,.yp-selected-boxed-margin-right,.yp-selected-boxed-margin-bottom").remove();
		
		$iframeBody.find(".yp_onscreen").removeClass("yp_onscreen");
		$iframeBody.find(".yp_hover").removeClass("yp_hover");
		$iframeBody.find(".yp_click").removeClass("yp_click");
		$iframeBody.find(".yp_focus").removeClass("yp_focus");

		$iframeBody.find("#yp-font-test-style").remove();
		$iframeBody.find("#yp-font-weight-test-style").remove();

		$body.removeClass("yp-position-static");

    }


    /* ---------------------------------------------------- */
    /* Getting Stylizer data								*/
    /* ---------------------------------------------------- */
    function yp_get_styles_area() {
        return $iframe.find(".yp-styles-area").html();
    }

	
	/* ---------------------------------------------------- */
    /* Getting CSS data										*/
    /* ---------------------------------------------------- */
	function yp_get_clean_css(){
		
		var $outputCSS = yp_get_css_data('desktop')+"@media (min-width: 768px) and (max-width: 991px){"+yp_get_css_data('tablet')+"}"+"@media (max-width:767px){"+yp_get_css_data('mobile')+"}";
		
		// remove blank lines.
		$outputCSS = $outputCSS.replace("@media (max-width:767px){}","");
		$outputCSS = $outputCSS.replace("@media (min-width: 768px) and (max-width: 991px){}","");
		
		// Adding break
		$outputCSS = $outputCSS.replace(/\)\{/g,"){\r");
		$outputCSS = $outputCSS.replace(/\)\{/g,"){\r");
		$outputCSS = $outputCSS.replace("@media (max-width:767px){","\r\r@media (max-width:767px){");
		
		// add notes
		$outputCSS = $outputCSS.replace("@media (max-width:767px){","/* Mobile responsive support */\r@media (max-width:767px){");
		
		$outputCSS = $outputCSS.replace("@media (min-width: 768px) and (max-width: 991px){","/* Tablet responsive support */\r@media (min-width: 768px) and (max-width: 991px){");
		
		// Fix some bugs
		return $outputCSS;
		
	}


    /* ---------------------------------------------------- */
    /* Create All Css Codes For current selector			*/
    /* ---------------------------------------------------- */
    function yp_get_css_data(size) {

        if ($iframe.find(".yp_current_styles").length <= 0) {
            return '';
        }

        var $totalcreated, $class, $selector;

        $totalcreated = '';

        $iframe.find(".yp_current_styles:not(.yp_step_end)[data-size-mode='"+size+"']").each(function() {

			if (!$(this).hasClass("yp_step_end")) {
				
				
				if(size == 'tablet' || size == 'mobile'){
					var data = $(this).first().html().split("{")[1]+"{"+$(this).first().html().split("{")[2].replace("}}","}");
				}
				
				if(size == 'desktop'){
					var data = $(this).first().html();
				}

				$selector = data.split("{")[0];

				$totalcreated += $selector + "{\r";

				$class = $(this).data("style");

				$iframe.find("style[data-style=" + $class + "][data-size-mode='"+size+"']").each(function() {
	
					if(size == 'tablet' || size == 'mobile'){
						var datai = $(this).first().html().split("{")[1]+"{"+$(this).first().html().split("{")[2].replace("}}","}");
					}
					
					if(size == 'desktop'){
						var datai = $(this).first().html();
					}

					$totalcreated += "\t" + datai.split("{")[1].split("}")[0] + ';\r';

					$(this).addClass("yp_step_end");

				});

				$totalcreated += "}\r\r";

				$(this).addClass("yp_step_end");

			}
				
        });

        $iframe.find(".yp_step_end").removeClass("yp_step_end");
		
        return $totalcreated;

    }



    /* ---------------------------------------------------- */
    /* Set Default Option Data								*/
    /* ---------------------------------------------------- */
    function yp_set_default(evt, $n, evt_status) {
		
		// element
        if (evt_status == true) {
            var $evt_t = $iframeBody.find(evt.target);
        } else {
			if(evt != "body"){
				var $evt_t = $iframeBody.find(evt);
			}else{
				var $evt_t = $iframeBody;
			}
        }

        // Remove Active colors:
        $(".yp-nice-c.active,.yp-flat-c.active,.yp-meterial-c.active").removeClass("active");

		// Adding animation helper classes
		if($n == 'animation-name' || $n == 'animation-iteration-count' || $n == 'animation-fill-mode' || $n == 'animation-duration' || $n == 'animation-iteration-count'){
			$iframe.find(".yp-selected,.yp-selected-others").addClass("yp_onscreen").addClass("yp_hover").addClass("yp_click").addClass("yp_focus");
		}
		
		setTimeout(function(){
		
		// data is default value
		if($n != 'animation-play'){
			var $data = $evt_t.css($n);
		}

		// Animation name play.
		if($n == 'animation-name' && $data != 'none'){

			// Add class.
			$iframeBody.addClass("yp-hide-borders-now");

			setTimeout(function() {

				// remove class.
				$iframeBody.removeClass("yp-hide-borders-now");

				// Update.
				yp_draw();

				// Tooltip update.
				yp_tooltip_draw();

			}, 1100);

		}
		
		// animation helpers: because need special data for animation rules.
		if($n == 'animation-play'){
			
			var $data;
			
			if($iframe.find('[data-style="'+yp_id($("body").attr("data-clickable-select"))+'yp_onscreen"]').length > 0){
				$data = 'yp_onscreen';
			}
			
			if($iframe.find('[data-style="'+yp_id($("body").attr("data-clickable-select"))+'yp_click"]').length > 0){
				$data = 'yp_click';
			}
			
			if($iframe.find('[data-style="'+yp_id($("body").attr("data-clickable-select"))+'yp_hover"]').length > 0){
				$data = 'yp_hover';
			}
			
			if($iframe.find('[data-style="'+yp_id($("body").attr("data-clickable-select"))+'yp_focus"]').length > 0){
				$data = 'yp_focus';
			}
			
			if($("body").hasClass("yp-selector-hover")){
				$data = 'yp_hover';
			}
			
			if($("body").hasClass("yp-selector-focus")){
				$data = 'yp_focus';
			}
			
			if($data === undefined || $data === null){
				return false;
			}

		}

		// Num: numberic data
        var $num = yp_num($evt_t.css($n));

        // filter = data of filter css rule.
        var filter = $evt_t.css("filter");
        if(filter == null || filter == 'none' || filter == undefined){
        	filter = $evt_t.css("-webkit-filter"); // for chrome.
        }
		

		// Special default values for filter css rule.
		if(filter != 'none' && filter !== null && filter !== undefined && $n.indexOf("-filter") != -1){
			
			if($n == 'blur-filter'){
				$data = filter.match(/blur\((.*?)\)/g);
			}
			
			if($n == 'brightness-filter'){
				$data = filter.match(/brightness\((.*?)\)/g);
			}
			
			if($n == 'grayscale-filter'){
				$data = filter.match(/grayscale\((.*?)\)/g);
			}
			
			if($n == 'contrast-filter'){
				$data = filter.match(/contrast\((.*?)\)/g);
			}
			
			if($n == 'hue-rotate-filter'){
				$data = filter.match(/hue-rotate\((.*?)\)/g);

				if($data !== null){
					$data = ($data.toString().replace("deg","").replace("hue-rotate(","").replace(")",""));
				}

			}
			
			if($n == 'saturate-filter'){
				$data = filter.match(/saturate\((.*?)\)/g);
			}
			
			if($n == 'sepia-filter'){
				$data = filter.match(/sepia\((.*?)\)/g);
			}
			
			if($data !== undefined && $data !== null){
				$data = yp_num($data.toString());
				$num = $data;
			}else{
				$num = 0;
				$data = 'disable';
			}
			
		}

		// Special default values for brightness and contrast.
		if($n.indexOf("-filter") != -1){
			if(filter == 'none' || filter == null || filter == undefined){
				$data = 'disable';
				$num = 0;

				if($n == 'brightness-filter'){
					$num = 1;
				}

				if($n == 'contrast-filter'){
					$num = 1;
				}

			}
		}
		
		
		// Getting transform value from HTML Source.
		if($iframe.find('.' + yp_id($("body").attr("data-clickable-select")) + '-' + 'transform-style').length > 0){
			var ht = $iframe.find('.' + yp_id($("body").attr("data-clickable-select")) + '-' + 'transform-style').html();
			var transform = ht.split(":")[1].split("}")[0];
		}else{
			var transform = 'none';
		}
		
		// Special Default Transform css rule value.
		if(transform != 'none' && transform !== null && transform !== undefined && $n.indexOf("-transform") != -1 && $n != 'text-transform'){
			
			if($n == 'scale-transform'){
				$data = transform.match(/scale\((.*?)\)/g);
			}
			
			if($n == 'rotate-transform'){
				$data = transform.match(/rotate\((.*?)\)/g);
			}
			
			if($n == 'translate-x-transform'){
				$data = transform.match(/translateX\((.*?)\)/g);
			}
			
			if($n == 'translate-y-transform'){
				$data = transform.match(/translateY\((.*?)\)/g);
			}
			
			if($n == 'skew-x-transform'){
				$data = transform.match(/skewX\((.*?)\)/g);
			}
			
			if($n == 'skew-y-transform'){
				$data = transform.match(/skewY\((.*?)\)/g);
			}
			
			if($data !== undefined && $data !== null){
				$data = yp_num($data.toString());
				$num = $data;
			}else{
				$num = 0;
				$data = 'disable';
			}
			
		}

		// be sure not text-transform.
		if($n.indexOf("-transform") != -1 && $n != 'text-transform'){
			if(transform == 'none' || transform === null || transform === undefined){
				$data = 'disable';
				$num = 0;

				if($n == 'scale-transform'){
					$num = 1;
				}

			}

		}

		if($n == 'position' && $evt_t.hasClass("ready-for-drag") == true){
			$data = 'static';
		}
	
		// Box Shadow.
		if($evt_t.css("box-shadow") != 'none' && $evt_t.css("box-shadow") !== null && $evt_t.css("box-shadow") !== undefined && $n.indexOf("box-shadow-") != -1){
			
			// Box shadow color default value.
			if($n == 'box-shadow-color'){
				if($evt_t.css("box-shadow").indexOf("#") != -1){
					if($evt_t.css("box-shadow").split("#")[1].indexOf("inset") == -1){
						$data = $.trim($evt_t.css("box-shadow").split("#")[1]);
					}else{
						$data = $.trim($evt_t.css("box-shadow").split("#")[1].split(' ')[0]);
					}
				}else{
					$data = $evt_t.css("box-shadow").match(/rgb\((.*?)\)/g).toString();
				}
			}
			
			// split all box-shadow data.
			var numbericBox = $evt_t.css("box-shadow").replace(/rgb\((.*?)\) /g,'').replace(/ rgb\((.*?)\)/g,'').replace(/inset /g,'').replace(/ inset/g,'');
			
			// shadow horizontal value.

			if($n == 'box-shadow-horizontal'){
				$data = numbericBox.split(" ")[0];
				$num = yp_num($data);
			}
			
			// shadow vertical value.
			if($n == 'box-shadow-vertical'){
				$data = numbericBox.split(" ")[1];
				$num = yp_num($data);
			}
			
			// Shadow blur radius value.
			if($n == 'box-shadow-blur-radius'){
				$data = numbericBox.split(" ")[2];
				$num = yp_num($data);
			}
			
			// Shadow spread value.
			if($n == 'box-shadow-spread'){
				$data = numbericBox.split(" ")[3];
				$num = yp_num($data);
			}
			
		}

		// if no info about inset, default is no.
		if($n == 'box-shadow-inset'){

			if($evt_t.css("box-shadow") === undefined){

				$data = 'no';

			}else{

				if($evt_t.css("box-shadow").indexOf("inset") == -1){
					$data = 'no';
				}else{
					$data = 'inset';
				}

			}

		}

		// Getting format: px, em, etc.
        var $format = yp_alfa($evt_t.css($n)).replace("-", "");

        // option element.
        var $the_id = $("#yp-" + $n);

        // option element parent of parent.
        var $id_prt = $the_id.parent().parent();

        // option element parent.
        var $id_prtz = $the_id.parent();


		// if special CSS, get css by CSS data.
		// ie for parallax. parallax not a css rule.
		// yellow pencil using css engine for parallax Property.
		if($evt_t.css($n) == undefined && $iframe.find('.'+yp_id($("body").attr("data-clickable-select"))+'-'+$n+'-style').length > 0){
			
			$data = $iframe.find('.'+yp_id($("body").attr("data-clickable-select"))+'-'+$n+'-style').html().split(":")[1].split('}')[0].replace(/;/g,'').replace(/!important/g,'');
			$num = yp_num($data);
			
		}else if($evt_t.css($n) == undefined) { // if no data, use "disable" for default.
			
			if($n == 'background-parallax'){
				$data = 'disable';
			}
			
			if($n == 'background-parallax-speed'){
				$data = 'disable';
			}
			
			if($n == 'background-parallax-x'){
				$data = 'disable';
			}
			
		}
		

        // IF THIS IS A SLIDER
        if ($the_id.hasClass("wqNoUi-target")) {


            // Border width Fix
            if ($n == 'border-width') {

                if ($iframeBody.find(".yp-selected").css("border-top-width") == $iframeBody.find(".yp-selected").css("border-bottom-width")) {

                    if ($iframeBody.find(".yp-selected").css("border-left-width") == $iframeBody.find(".yp-selected").css("border-right-width")) {

                        if ($iframeBody.find(".yp-selected").css("border-top-width") == $iframeBody.find(".yp-selected").css("border-left-width")) {

                            $num = yp_num($iframeBody.find(".yp-selected").css("border-top-width"));
                            $format = yp_alfa($iframeBody.find(".yp-selected").css("border-top-width"));

                        }

                    }

                }

            } // border width end.

 			
 			// Of no data, active none option.
            if ($data == 'none' || $data == 'auto') {
                $id_prt.find(".yp-none-btn").not(".active").trigger("click");
                $format = 'px';
            }else{
            	$id_prt.find(".yp-none-btn.active").trigger("click"); // else disable none option.
            }

            // be sure format is valid.
            if ($format == '' || $format == 'px .px' || $format == 'px px') {
                $format = 'px';
            }

            // Default value is 1 for transform scale.
            if ($num == '' && $n == 'scale-transform') {
            	$num = 1;
            }

            // default value is 1 for opacity.
            if ($num == '' && $n == 'opacity') {
            	$num = 1;
            }

            // If no data, set zero value.
            if ($num == '') {
                $num = 0;
            }

			var $range = $id_prt.data("px-range").split(",");
			
		
			var $min = parseInt($range[0]); // mininum value
			var $max = parseInt($range[1]); // maximum value
			
			// Check values.
			if($num < $min){
				$min = $num;
			}
			
			if($num > $max){
				$max = $num;
			}
			
			// Speacial max and min limits for CSS size rules.
			if($n == 'width' || $n == 'max-width' || $n == 'min-width' || $n == 'height' || $n == 'min-height' || $n == 'max-height'){
				$max = parseInt($max)+(parseInt($max)*1.5);
				$min = parseInt($min)+(parseInt($min)*1.5);
			}

			// if width is same with windows width, so set 100%!
			// Note: browsers always return value in PX format.
			if($n == 'width' && parseInt($(window).width()) == parseInt($num)){
				$num = '100';
				$format = '%';
			}

			// if  width is same with parent width, so set 100%!
			if($evt_t.parent().length > 0){
				if($n == 'width' && parseInt($evt_t.parent().width()) == parseInt($num)){
					$num = '100';
					$format = '%';
				}
			}

			// if  width is 50% of parent width, so set 50%!
			if($evt_t.parent().length > 0){
				if($n == 'width' && parseInt($evt_t.parent().width()) == (parseInt($num)*2)){
					$num = '50';
					$format = '%';
				}
			}

			// if  width is 25% of parent width, so set 25%!
			if($evt_t.parent().length > 0){
				if($n == 'width' && parseInt($evt_t.parent().width()) == (parseInt($num)*4)){
					$num = '25';
					$format = '%';
				}
			}

			// if  width is 20% of parent width, so set 20%!
			if($evt_t.parent().length > 0){
				if($n == 'width' && parseInt($evt_t.parent().width()) == (parseInt($num)*5)){
					$num = '20';
					$format = '%';
				}
			}


			// max and min for %.
			if($format == '%'){
				$min = 0;
				$max = 100;
			}


			// Okay now set nouislider.
			var slider = $the_id.wqNoUiSlider({
				range: {
					'min': parseInt($min),
					'max': parseInt($max)
				},
				start: parseFloat($num)
			}, true);

			// Set new value.
			$the_id.val($num);

			// set format of value. px, em etc.
			$("#" + $n + "-after").val($format);
			

		// IF THIS IS A SELECT TAG
        } else if ($the_id.hasClass("wqselect2-select")) {

        	// Checking font family settings.
            if ($n == 'font-family' && typeof $data != 'undefined') {

                if ($data.indexOf(",") >= 0) {

                    $data = $data.split(",");
					
					var fontAvailability = isFontAvailable($data);
					var founded = false;
					
					$.each( $data, function (i, v) {
						if(founded == false){
							//if (fontAvailability[i]) {
								$data = $.trim($data[i].replace(/"/g, "").replace(/'/g, ""));
								founded = true;
							//}
						}
					});

                }

            }

            if($data  !== undefined && $data  !== 'undefined' && $data !== '' && $data !== null){

				// Set CSS For this selected value. example: set font-family for this option.
	            $id_prt.find(".wqselect2-selection__rendered").css($n, $data);

	            // Append default font family to body. only for select font family.
	            if($(".yp-font-test-" + yp_id($.trim($data.replace(/ /g, '+')))).length == 0 && $n == 'font-family'){

		            var $weight = yp_num($iframeBody.find("#yp-font-weight").val());

					var $normal = '';
									
					if ($weight != '400') {
						$normal = '400,400italic';
					}
									
					if ($weight != '600') {
						$normal += ',600,600italic';
					}
									
					if ($weight != '300') {
						$normal += ',300';
					}
									
					$weight = $weight+","+$weight+"italic,"+$normal;
									
					$weight = $weight.replace(/,,/g,",");

		            // Append always to body.
					$body.append("<link rel='stylesheet' class='yp-font-test-" + yp_id($.trim($data.replace(/ /g, '+'))) + "'  href='http://fonts.googleapis.com/css?family=" + $.trim($data.replace(/ /g, '+')) + ":"+$weight+" type='text/css' media='all' />");

				}

	            // Adding class.
	            $the_id.addClass("yp-setted-default");

            	// If have data, so set!
				$the_id.wqselect2("val", $data);
			}
			
            // Active none button.
            $id_prt.find(".yp-btn-action.active").trigger("click");
			

			// If data is none, auto etc, so active none button.
            if ($data == $id_prt.find(".yp-none-btn").text()) {
                $id_prt.find(".yp-none-btn").trigger("click");
            }
			

			// If not have this data in select options, insert this data.
            if ($the_id.val() == null && $data != $id_prt.find(".yp-none-btn").text() && $data !== undefined) {
                $('<option>' + $data + '</option>').prependTo('#yp-' + $n);
                $the_id.wqselect2('val', $data);
                $the_id.wqselect2('close');
            }


        // IF THIS IS A RADIO TAG
        } else if ($the_id.hasClass("yp-radio-content")) {


            // Border style Fix
            if ($n == 'border-style' && $data == '') {

                if ($iframeBody.find(".yp-selected").css("border-top-style") == $iframeBody.find(".yp-selected").css("border-bottom-style")) {

                    if ($iframeBody.find(".yp-selected").css("border-left-style") == $iframeBody.find(".yp-selected").css("border-right-style")) {

                        if ($iframeBody.find(".yp-selected").css("border-top-style") == $iframeBody.find(".yp-selected").css("border-left-style")) {

                            $data = $iframeBody.find(".yp-selected").css("border-top-style");

                        }

                    }

                }

            }
		
			// Fix background size rule.
			if($n == 'background-size'){
				if($data == 'auto' || $data == '' || $data == ' ' || $data == 'auto auto'){
					$data = 'auto auto';
				}
			}
			
			// If disable, active disable button.
			if ($data == 'disable') {
                $id_prt.find(".yp-disable-btn").not(".active").trigger("click");
			}else{ 
				yp_radio_value($the_id, $n, $data); // else Set radio value.
			}


        // IF THIS IS COLORPICKER
        } else if ($the_id.hasClass("wqcolorpicker")) {
			
            // Border color Fix
            if ($n == 'border-color' && $data == '') {

                if ($iframeBody.find(".yp-selected").css("border-top-color") == $iframeBody.find(".yp-selected").css("border-bottom-color")) {

                    if ($iframeBody.find(".yp-selected").css("border-left-color") == $iframeBody.find(".yp-selected").css("border-right-color")) {

                        if ($iframeBody.find(".yp-selected").css("border-top-color") == $iframeBody.find(".yp-selected").css("border-left-color")) {

                            $data = $iframeBody.find(".yp-selected").css("border-top-color");

                        }

                    }

                }

            }
			
			// Convert to rgb and set value.
			var rgbd = rgb2hex($data);

			// browsers return value always in rgb format.
            $the_id.val(rgbd);

            $the_id.wqminicolors('settings', {
			    value: $data
			});

            // Set current color on small area.
            $the_id.parent().find(".wqminicolors-swatch-color").css("background-color", rgbd);

            // IF transparent
            if($data == 'transparent'){
            	$id_prt.find(".yp-disable-btn.active").trigger("click");
            	$id_prt.find(".yp-none-btn:not(.active)").trigger("click");
            }else{
            	$id_prt.find(".yp-none-btn.active").trigger("click");
            }

            // no data? so active disable button.
            if (rgbd == '' && $data != 'transparent') {
                $id_prt.find(".yp-disable-btn").not(".active").trigger("click");
            } else {
                $id_prt.find(".yp-disable-btn.active").trigger("click"); // else, remove active class from disable.
            }


        // IF THIS IS INPUT OR TEXTAREA
        } else if ($the_id.hasClass("yp-input") == true || $the_id.hasClass("yp-textarea")) {

        	// clean URL() prefix for background image.
			if(typeof $data != 'undefined' && $data != 'disable' && $n == "background-image"){
				$the_id.val($data.replace(/"/g, "").replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, ""));
			}

            // If no data, active none button.
            if ($data == 'none') {
                $id_prtz.find(".yp-none-btn").not(".active").trigger("click");
                $the_id.val(''); // clean value.
            } else {
                $id_prtz.find(".yp-none-btn.active").trigger("click");  // else disable.
            }
			
		 	// If no data, active disable button.
			if ($data == 'disable') {
                $id_prtz.find(".yp-disable-btn").not(".active").trigger("click");
                $the_id.val('');
            } else {
                $id_prtz.find(".yp-disable-btn.active").trigger("click"); // else disable.
            }

        }

		
	  },2);
		
    }



    /* ---------------------------------------------------- */
    /* Get Best Class Name									*/
    /* ---------------------------------------------------- */
    /*
    	the most important function in yellow pencil scripts
		this functions try to find most important class name
		in classes.

		If no class, using ID else using tag name.
	*/
    function yp_get_best_class($element) {

		var $elp = $($element);

        // Element Selectors
        var $classes = $elp.attr("class");

        if($classes != undefined && $classes != null){
        	$classes = $classes.replace("yp-parallax-disabled","");
        }

        var $id = $elp.attr("id");
        var $tag = $elp[0].nodeName.toLowerCase();


        // Default
        var $best_classes = '';
        var $nummeric_class = '';
        var $the_best = '';


		// If has an id
		if (typeof $id != 'undefined') {
			if ($.trim($id) != '' && $.trim($the_best) == '' && $elp.hasClass("widget") == false && $.trim($id).indexOf("menu-item-") == -1 && $.trim($id).indexOf("post-") == -1) {
				return '#' + $id;
			}
		}

        // If has class.
        if (typeof $classes != 'undefined') {

        	if($classes.indexOf("columns") != -1 && $classes.indexOf("small-") != -1){
        		$classes = $classes.replace(/columns/g,'');
        	}

        	if($classes.indexOf("columns") != -1 && $classes.indexOf("medium-") != -1){
        		$classes = $classes.replace(/columns/g,'');
        	}

        	if($classes.indexOf("columns") != -1 && $classes.indexOf("large-") != -1){
        		$classes = $classes.replace(/columns/g,'');
        	}

            var $Aclasses = $classes.split(" ");

            $($Aclasses).each(function(i, v) {
				
				// remove classes by customizer.
				v = v.replace(/yp-link-style-[0-9]/g,'');

                if (v.match(/\d+/g)) {
                    $nummeric_class = v;
                } else {

                    if (v != "yp-selected" && v != 'yp-selected-others' && v != 'context-menu-active') {

                        $best_classes += ' ' + v;

                    }


                }

            });

        }


        // If has best class
        if ($.trim($best_classes) != '') {


            $the_best = $.trim($best_classes).split(" ");

            var i;
            var return_the_best = '';
            var significant_classes = $.trim($.trim($best_classes).replace(/row\w/g, '').replace(/vc_row\w/g,'').replace(/col-(\w+)-[0-9]/g, '').replace(/col-(\w+)-offset-[0-9]/g, '').replace(/span[0-9]/g,'').replace(/ls-l-1/g,'').replace(/small-[0-9]/g,'').replace(/medium-[0-9]/g,'').replace(/large-[0-9]/g,'').replace(/small-push-[0-9]/g, '').replace(/small-pull-[0-9]/g, '').replace(/medium-push-[0-9]/g, '').replace(/medium-pull-[0-9]/g, '').replace(/large-push-[0-9]/g, '').replace(/large-pull-[0-9]/g, ''));

            for (i = 0; i < $the_best.length; i++) {

                if ($the_best[i] == 'current-menu-item' || $the_best[i] == 'active' || $the_best[i] == 'global-section' || $the_best[i] == 'current') {
                    return_the_best = $the_best[i];
                }

            }

            if (return_the_best != '') {
                $the_best = '.' + return_the_best;
            } else if (significant_classes != '') {
                significant_classes = significant_classes.split(" ");
                $the_best = '.' + significant_classes[0];
            } else {
                $the_best = '.' + $the_best[0];
            }

        } else {

            // If has any class
            if ($.trim($nummeric_class) != '') {
                $the_best = '.' + $nummeric_class;				
            }

            // If has an id
            if ($.trim($id) != '' && $.trim($the_best) == '') {
                $the_best = '#' + $id;
            }	
			
            // If notthing, use tag name.
            if ($.trim($tag) != '' && $.trim($the_best) == '') {
                $the_best = $tag;
            }

        }

        return $.trim($the_best);

    }




    /* ---------------------------------------------------- */
    /* Get All Parents 										*/
    /* ---------------------------------------------------- */
    function yp_get_parents($a) {
		
		var parentsv = $body.attr("data-clickable-select");
		
		if (typeof parentsv !== typeof undefined && parentsv !== false) {
			return parentsv;
		}
		
		if($a[0] === undefined || $a[0] === false || $a[0] === null){
			return false;
		}

        var $sp = " > ";		
		
        if ($a[0].tagName == 'BODY') {
            return 'body';
        }

        var parents = $a.parents(document);
        var selector = "body" + $sp;
        for (var i = parents.length - 1; i >= 0; i--) {

            if (parents[i].tagName != 'BODY' && parents[i].tagName != 'HTML') {

                if (i == parents.length - 1) {

                    selector += yp_get_best_class(parents[i]);

                } else {

                    selector += yp_get_best_class(parents[i]) + $sp;

                }

            }

        }

        // Last Element
		var $lastS = yp_get_best_class($a);
		if($lastS == ".alignnone"){
			selector += "img";
		}else if($lastS == ".alignleft"){
			selector += "img";
		}else if($lastS == ".alignright"){
			selector += "img";
		}else if($lastS == ".aligncenter"){
			selector += "img";
		}else if($lastS == ".size-full"){
			selector += "img";
		}else if($lastS == ".size-large"){
			selector += "img";
		}else if($lastS == ".size-medium"){
			selector += "img";
		}else if($lastS == ".size-thumbnail"){
			selector += "img";
		}else{
			selector += $lastS;
		}

        // Google map fix
        if (selector.indexOf(".gm-style") >= 0) {

            var $sp = ' > ';

            selector = selector.split($sp + ".gm-style");

            selector = selector[0];

        }
		
		if(selector.indexOf("#") >= 0 && selector.indexOf("yp-") == -1){
			selector = selector.split("#");
			selector = selector[(selector.length-1)];
			selector = "#"+selector;
		}

        return selector;

    }



    /* ---------------------------------------------------- */
    /* Draw Tooltip and borders.							*/
    /* ---------------------------------------------------- */
    function yp_draw_box($this, $class) {
		
		if(typeof $($this) === 'undefined'){
			var $this_p = $($this);
		}else{
			var $this_p = $iframeBody.find($this);
		}

		// Be sure this element have.
		if ($this_p.length > 0) {
				
			var $marginTop = $this_p.css("margin-top");
			var $marginBottom = $this_p.css("margin-bottom");
			var $marginLeft = $this_p.css("margin-left");
			var $marginRight = $this_p.css("margin-right");

			//Dynamic boxes variables
			var $topBoxes = $this_p.offset().top;
			var $leftBoxes = $this_p.offset().left;
			var $widthBoxes = $this_p.outerWidth(false);
			var $heightBoxes = $this_p.outerHeight(false);
			var $widthBoxesMargin = $this_p.outerWidth(true);
			var $heightBoxesMargin = $this_p.outerHeight(true);

			var $bottomBoxes = $topBoxes + $heightBoxes;
			var $rightBoxes = $leftBoxes + $widthBoxes - 1;

			var $windowWidth = $(window).width();
			var $documentHeight = $(document).height();

			// If right border left is more then screen
			if ($rightBoxes > $windowWidth) {
				$rightBoxes = $windowWidth - 2;
			}

			// If bottom border left is more then screen
			if ($leftBoxes + $widthBoxes > $windowWidth) {
				$widthBoxes = $windowWidth - $leftBoxes - 1;
			}
				
			if($heightBoxes > 1 && $widthBoxes > 1){
					
				// Dynamic Box
				if ($iframeBody.find("." + $class + "-top").length == 0) {
					$iframeBody.append("<div class='" + $class + "-top'></div><div class='" + $class + "-bottom'></div><div class='" + $class + "-left'></div><div class='" + $class + "-right'></div>");
				}
					
				if ($iframeBody.find("." + $class + "-margin-top").length == 0) {
					$iframeBody.append("<div class='" + $class + "-margin-top'></div><div class='" + $class + "-margin-bottom'></div><div class='" + $class + "-margin-left'></div><div class='" + $class + "-margin-right'></div>");
				}

				// Dynamic Boxes position
				$iframeBody.find("." + $class + "-top").css("top", $topBoxes).css("left", $leftBoxes).css("width", $widthBoxes);

				$iframeBody.find("." + $class + "-bottom").css("top", $bottomBoxes).css("left", $leftBoxes).css("width", $widthBoxes);

				$iframeBody.find("." + $class + "-left").css("top", $topBoxes).css("left", $leftBoxes).css("height", $heightBoxes);

				$iframeBody.find("." + $class + "-right").css("top", $topBoxes).css("left", $rightBoxes).css("height", $heightBoxes);
					
					
				// Top Margin
				$iframeBody.find("." + $class + "-margin-top").css("top", parseFloat($topBoxes)-parseFloat($marginTop)).css("left", parseFloat($leftBoxes)-parseFloat($marginLeft)).css("width", parseFloat($widthBoxes)+parseFloat($marginRight)+parseFloat($marginLeft)).css("height", $marginTop);
					
				// Bottom Margin
				$iframeBody.find("." + $class + "-margin-bottom").css("top", $bottomBoxes).css("left", parseFloat($leftBoxes)-parseFloat($marginLeft)).css("width", parseFloat($widthBoxes)+parseFloat($marginRight)+parseFloat($marginLeft)).css("height", $marginBottom);
					
				// Left Margin
				$iframeBody.find("." + $class + "-margin-left").css("top", $topBoxes).css("left", parseFloat($leftBoxes)-parseFloat($marginLeft)).css("height", $heightBoxes).css("width", $marginLeft);
					
				// Right Margin
				$iframeBody.find("." + $class + "-margin-right").css("top", $topBoxes).css("left", $rightBoxes).css("height", $heightBoxes).css("width", $marginRight);
				
			}

		}

    }


    /* ---------------------------------------------------- */
    /* Draw Tooltip and borders.							*/
    /* ---------------------------------------------------- */
    function yp_draw_box_other($this, $class, $i){
		
		var $this_p = $($this);

		if($this_p === null){
			return false;
		}

		if($this_p[0].nodeName == "HTML" || $this_p[0].nodeName == "BODY"){
			return false;
		}

		if($this_p.length == 0){
			return false;
		}

		// Be sure this is visible on screen
		if ($this_p.css("display") == 'none' || $this_p.css("visibility") == 'hidden' || $this_p.css("opacity") == '0'){
			return false;
		}

		// Not show if p tag and is empty.
		if($this_p.html() == '&nbsp;' && $this_p.prop("tagName") == 'P'){
			return false;
		}

		// Be sure this is visible on screen
		if ($this_p.css("display") == 'none' || $this_p.css("visibility") == 'hidden' || $this_p.css("opacity") == '0'){
			return false;
		}

		// Be sure this is visible on screen (For parent)
		if($this_p.parent().length !== 0 && $this_p.parent()[0].nodeName !== 'HTML' && $this_p.parent()[0].nodeName !== 'BODY'){
			
			if ($this_p.parent().css("display") == 'none' || $this_p.parent().css("visibility") == 'hidden' || $this_p.parent().css("opacity") == '0'){
				return false;
			}
		

			// Be sure this is visible on screen (For parent parent)
			if($this_p.parent().parent().length !== 0 && $this_p.parent().parent()[0].nodeName !== 'HTML' && $this_p.parent().parent()[0].nodeName !== 'BODY'){
				if ($this_p.parent().parent().css("display") == 'none' || $this_p.parent().parent().css("visibility") == 'hidden' || $this_p.parent().parent().css("opacity") == '0'){
					return false;
				}
			

				// Be sure this is visible on screen (For parent parent parent)
				if($this_p.parent().parent().parent().length !== 0 && $this_p.parent().parent().parent()[0].nodeName !== 'HTML' && $this_p.parent().parent().parent()[0].nodeName !== 'BODY'){
					if ($this_p.parent().parent().parent().css("display") == 'none' || $this_p.parent().parent().parent().css("visibility") == 'hidden' || $this_p.parent().parent().parent().css("opacity") == '0'){
						return false;
					}
				
					// Be sure this is visible on screen (For parent parent parent)
					if($this_p.parent().parent().parent().parent().length !== 0 && $this_p.parent().parent().parent().parent()[0].nodeName != 'HTML' && $this_p.parent().parent().parent().parent()[0].nodeName != 'BODY'){
						if ($this_p.parent().parent().parent().parent().css("display") == 'none' || $this_p.parent().parent().parent().parent().css("visibility") == 'hidden' || $this_p.parent().parent().parent().parent().css("opacity") == '0'){
							return false;
						}
					}

				}

			}

		}

		//Dynamic boxes variables
		var $topBoxes = $this_p.offset().top;
		var $leftBoxes = $this_p.offset().left;
		var $widthBoxes = $this_p.outerWidth(false);
		var $heightBoxes = $this_p.outerHeight(false);
		var $widthBoxesMargin = $this_p.outerWidth(true);
		var $heightBoxesMargin = $this_p.outerHeight(true);

		var $bottomBoxes = $topBoxes + $heightBoxes;			
					
				
		if($heightBoxes > 1 && $widthBoxes > 1){

		// Dynamic Box
			if ($iframeBody.find("." + $class + "-" + $i + "-top").length == 0) {
				$iframeBody.append("<div class='" + $class + "-top " + $class + "-" + $i + "-top'></div><div class='" + $class + "-bottom " + $class + "-" + $i + "-bottom'></div><div class='" + $class + "-left " + $class + "-" + $i + "-left'></div><div class='" + $class + "-right " + $class + "-" + $i + "-right'></div>");
			}

			// Dynamic Boxes position
			$iframeBody.find("." + $class + "-" + $i + "-top").css("top", $topBoxes).css("left", $leftBoxes).css("width", $widthBoxes);
			$iframeBody.find("." + $class + "-" + $i + "-bottom").css("top", $bottomBoxes).css("left", $leftBoxes).css("width", $widthBoxes);
			$iframeBody.find("." + $class + "-" + $i + "-left").css("top", $topBoxes).css("left", $leftBoxes).css("height", $heightBoxes);
			$iframeBody.find("." + $class + "-" + $i + "-right").css("top", $topBoxes).css("left", $leftBoxes + $widthBoxes).css("height", $heightBoxes);

		}
		
    }



    /* ---------------------------------------------------- */
    /* Visible Height in scroll.							*/
    /* ---------------------------------------------------- */
    function yp_visible_height($t, $check) {
        var top = $t.offset().top;
        var windowHeight = $iframe.height();
        var scrollTop = $iframe.scrollTop();
        var height = $t.outerHeight();

        if (top < scrollTop) {
            return height - (scrollTop - top);
        } else {
            return height;
        }

    }



    /* ---------------------------------------------------- */
    /* Draw Tooltip and borders.							*/
    /* ---------------------------------------------------- */
    function yp_tooltip_draw() {
		
		if($("body").attr("data-clickable-select") == "body"){
			return false;
		}


        var $topEl = parseFloat($iframeBody.find(".yp-selected-boxed-top").css("top")) - 24;

        if ($topEl < 30 || $topEl < ($iframe.scrollTop() + 30)) {

            $topEl = parseFloat($iframeBody.find(".yp-selected-boxed-bottom").css("top")) - parseFloat($iframeBody.find(".yp-selected-tooltip").outerHeight());
			
            if ($iframeBody.find('.yp-selected-boxed-bottom').filter(":onScreen").length === 0 && $iframeBody.find('.yp-selected-boxed-top').filter(":onScreen").length === 0) {
				
                $topEl = parseFloat($iframeBody.find(".yp-selected-boxed-bottom").css("top")) - parseFloat(yp_visible_height($iframeBody.find(".yp-selected")));

                $iframeBody.find(".yp-selected-tooltip").addClass("yp-fixed-tooltip");

            } else {

                $iframeBody.find(".yp-selected-tooltip").removeClass("yp-fixed-tooltip");

            }

            var $tooltip_ratio = ($iframeBody.find(".yp-selected-tooltip").outerHeight() * 100 / yp_visible_height($iframeBody.find(".yp-selected")));

            if ($tooltip_ratio > 10) {
                $iframeBody.find(".yp-selected-tooltip").addClass("yp-tooltip-bottom-outside");
                $topEl = parseFloat($iframeBody.find(".yp-selected-boxed-bottom").css("top")) - parseFloat($iframeBody.find(".yp-selected-tooltip").outerHeight()) + $iframeBody.find(".yp-selected-tooltip").outerHeight();
            } else {
                $iframeBody.find(".yp-selected-tooltip").removeClass("yp-tooltip-bottom-outside");
            }


        }

        var $leftEl = parseFloat($iframeBody.find(".yp-selected-boxed-top").css("left"));
		
		if($leftEl == 0){
			$leftEl = parseFloat($iframeBody.find(".yp-selected-boxed-top").offset().left);
		}
		
        $iframeBody.find(".yp-selected-tooltip").css("top", $topEl).css("left", $leftEl);
		
		if($iframeBody.find(".yp-selected-tooltip").height() > 16){
			
			 $iframeBody.find(".yp-selected-tooltip").css("top", $topEl-($iframeBody.find(".yp-selected-tooltip").height())+16);
			 
			 if($iframeBody.find(".yp-selected-tooltip").height() > ($iframeBody.find(".yp-selected").height()/2) || $iframeBody.find(".yp-selected-tooltip").width() > ($iframeBody.find(".yp-selected").width()/2)){
				$iframeBody.find(".yp-selected-tooltip").remove();
			 }
			
		}


		if ($tooltip_ratio > 10) {

		}else{
			$iframeBody.find(".yp-selected-tooltip").removeClass("yp-tooltip-bottom-outside");
		}

    }
	
	
	/* ---------------------------------------------------- */
    /* fix select2 bug.										*/
    /* ---------------------------------------------------- */
	$("html").click(function(e){
		
		if(e.target.nodeName == 'HTML' && $(".wqselect2-container--open").length === 0 && $(".wqminicolors-panel:visible").length === 0){
			yp_clean();
		}

		if($(".wqselect2-container--open").length > 0 && e.target.nodeName == 'HTML'){
			
			$("select").each(function(){
				$(this).wqselect2("close");
			});
			
		}
		
	});
	
	
	// if mouseup on iframe, trigger for document.
	$iframe.on("mouseup", $iframe, function(){
		
		$(document).trigger("mouseup");

	});


	/* ---------------------------------------------------- */
    /* Get Handler 											*/
    /* ---------------------------------------------------- */
    function yp_get_handler(){

    	// Element selected?
    	if(!$("body").hasClass("yp-content-selected")){
    		return false;
    	}

    	// Mover not working if has transform
    	if($("body").hasClass("yp-has-transform")){
    		return false;
    	}

    	// Dont append in image tag and some tags.
    	if($iframeBody.find(".yp-selected").prop("tagName") == 'IMG' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'AUDIO' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'VIDEO' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'BR' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'BUTTON' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'TRACK' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'PARAM' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'INPUT' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'TEXTAREA' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'SELECT' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'EMBED' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'OPTION' ||
    		$iframeBody.find(".yp-selected").prop("tagName") == 'IFRAME'
    	){
    		return false;
    	}

    	// If static, use relative.
    	if($iframeBody.find(".yp-selected").css("position") == 'static'){
    		$iframeBody.find(".yp-selected").addClass("ready-for-drag");
    	}

    	// Clean ex
		$iframeBody.find(".yp-selected-handle").remove();

		// Add new
		if($iframeBody.find(".yp-selected").height() > 30 && $iframeBody.find(".yp-selected").width() > 60){
			$iframeBody.find(".yp-selected").append("<div class='yp-selected-handle'></div>");
		}

		if($iframeBody.find(".yp-selected").css("position") == 'static'){
			$body.addClass("yp-position-static");
		}

		// Drag Drop Support.
		$iframe.on('mousemove', '.yp-selected-handle', function (e){

			$iframeBody.find(".yp-selected").draggable({
			  handle: '.yp-selected-handle',
			  containment: $iframeBody,
		      start: function() {

		        window.styleAttr = $iframeBody.find(".yp-selected").attr("style");

		        $iframeBody.find(".yp-selected").removeClass("ready-for-drag");

		        setTimeout(function(){
		        	window.stylePositionType = $iframeBody.find(".yp-selected").css("position");
		        	$iframeBody.find(".yp-selected").addClass("ready-for-drag");
		    	},2);

		    	$("body").addClass("yp-clean-look");

		      },
		      drag: function() {
		        yp_draw();
		        yp_tooltip_draw();
		      },
		      stop: function() {

		        yp_insert_rule($("body").attr("data-clickable-select"), "top", "top", $iframeBody.find(".yp-selected").css("top"), '');
		        yp_insert_rule($("body").attr("data-clickable-select"), "left", "left", $iframeBody.find(".yp-selected").css("left"), '');
		      	
		        // Set default values
                $("#top-group,#left-group").each(function() {
                    yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), true);
                });

                if(window.stylePositionType == 'static'){
	                $('#position-group').each(function(){
	                	yp_set_default(".yp-selected", $(this).attr("id").replace("-group", ""), true);
	                });
                }

                // Back to orginal style attr.
                if (typeof window.styleAttr !== typeof undefined && window.styleAttr !== false) {
				    $iframeBody.find(".yp-selected").attr("style",window.styleAttr);
				}else{
					$iframeBody.find(".yp-selected").removeAttr("style");
				}

				// Remove
                $iframeBody.find(".yp-selected,.yp-selected-others").removeClass("ui-draggable ui-draggable-handle ui-draggable-handle");

		        // Adding styles
				if(window.stylePositionType == 'static'){
					yp_insert_rule($("body").attr("data-clickable-select"), "position", "position", "relative", '');
				}

				// Remove default position relative.
				$iframeBody.find(".yp-selected").removeClass("ready-for-drag");

                // Update css.
                yp_option_change();

                $("body").removeClass("yp-clean-look");
				yp_resize();

		      }

			});
		});


    }


    /* ---------------------------------------------------- */
    /* Cancel Selected El. And Select The Element Function	*/
    /* ---------------------------------------------------- */
    $iframe.on("click", $iframe, function(evt) {

    	// Colorpicker for all elements.
    	if($("body").hasClass("yp-element-picker-active")){
    		$(".yp-element-picker-active").removeClass("yp-element-picker-active");
    		$(".yp-element-picker.active").removeClass("active");
    		return false;
    	}

		if($(".wqselect2-container--open").length != 0 || $(".wqminicolors-panel:visible").length != 0){
		
			$(".wqcolorpicker").each(function(){
				$(this).wqminicolors("hide");
			});
			
			$("select").each(function(){
				$(this).wqselect2("close");
			});
		
			return false;
			
		}
	
		var $evtarget = $(evt.target);
		
		if($evtarget.hasClass("yp-selected") == true && evt.which == 1){
			
			if ($iframeBody.find(".context-menu-active").length > 0){
				$iframeBody.find(".yp-selected").contextMenu("hide");
			}

		}
		
		if(!$evtarget.filter(":onScreen").length === 0){
			return false;
		}
		
		if ($body.hasClass("yp-selector-disabled")) {
            return false;
        }

        if ($body.hasClass("yp-disable-disable-yp")) {
            return false;
        }

        if (!$(".yp-button-target").hasClass("active") && yp_get_parents($evtarget).indexOf("yp-select-bar") == -1){
            return false;
        }
		
        var $dir = yp_get_parents($evtarget);
		
		if($(document).find(".wqselect2-container--open").length > 0 && $dir == 'body'){
			return false;
		}

        if (evt.which == 1) {

			evt.stopPropagation();
			evt.preventDefault();

            if ($evtarget.hasClass("yp-selected") == false) {

                if ($body.hasClass("yp-content-selected") == true && $evtarget.parents(".yp-selected").length != 1) {
					
                    // remove ex
                    yp_clean();
					
					$(".yp-editor-list > li.active > h3").not(".yp-li-about").not(".yp-li-footer").trigger("click");

                    $(".wqselect2-selection__rendered").removeAttr("style");

                    $body.removeAttr("data-clickable-select").removeAttr("data-yp-selector").removeClass("yp-selector-focus").removeClass("yp-selector-hover");

                    $(".yp-disable-contextmenu").removeClass("yp-disable-contextmenu");
                    $(".yp-active-contextmenu").removeClass("yp-active-contextmenu");

                    // Remove focus/hover.
                    if ($body.hasClass("yp-contextmenuopen")) {
                        $body.removeAttr("data-yp-selector").removeClass("yp-selector-focus").removeClass("yp-selector-hover");
                        $iframeBody.find(".yp-selected-tooltip span").remove();
                    }

                }

            } else {

                $body.addClass("yp-content-selected");
                
				if($evtarget.css("transform") != 'none' && $evtarget.css("transform") != 'inherit' && $evtarget.css("transform") != ''){
					$body.addClass("yp-has-transform");
				}
				
				if($evtarget.parent().length != 0){
					if($evtarget.parent().css("transform") != 'none' && $evtarget.parent().css("transform") != 'inherit' && $evtarget.parent().css("transform") != ''){
						$body.addClass("yp-has-transform");
					}
				
					if($evtarget.parent().parent().length != 0){
						if($evtarget.parent().parent().css("transform") != 'none' && $evtarget.parent().parent().css("transform") != 'inherit' && $evtarget.parent().parent().css("transform") != ''){
							$body.addClass("yp-has-transform");
						}

					}

				}

				// Set handler
				yp_get_handler();

				// Set selector as  body attr.
                $body.attr("data-clickable-select", $dir);

                // Set default values
                $(".yp-option-group").each(function() {
                    yp_set_default(evt, $(this).attr("id").replace("-group", ""), true);
                });

            }

        }
		
		yp_resize();

    });



    /* ---------------------------------------------------- */
    /* Option None / Disable Buttons						*/
    /* ---------------------------------------------------- */
    /*
		none and disable button api.
    */
    $(".yp-btn-action").click(function(e) {

        var $thisPP = $(this).parent().parent().parent();

        if ($(this).hasClass("yp-none-btn")) {

            if ($thisPP.find(".yp-disable-btn.active").length >= 0) {
                $thisPP.find(".yp-disable-btn.active").trigger("click");
            }

            var $prefix = '';

            // If slider
            if ($thisPP.hasClass("yp-slider-option")) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Show
                    $thisPP.find(".yp-after").show();

                    // Is Enable
                    $thisPP.find(".yp-after-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();
                    var $prefix = $("#" + $id + "-after").val();

                } else {

                    $(this).addClass("active");

                    // Hide
                    $thisPP.find(".yp-after").hide();

                    // Is Disable
                    $thisPP.find(".yp-after-disable").show();

                    // Value
                    var $value = $thisPP.find(".yp-none-btn").text();

                }

                // If is radio
            } else if ($thisPP.find(".yp-radio-content").length > 0) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Value
                    var $value = $("input[name=" + $id + "]:checked").val();

                } else {

                    $(this).addClass("active");

                    $thisPP.find(".yp-radio.active").removeClass("active");

                    // Value
                    var $value = $thisPP.find(".yp-none-btn").text();

                }

                // If is select
            } else if ($thisPP.find("select").length > 0) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();

                } else {

                    $(this).addClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable").show();

                    // Value
                    var $value = $thisPP.find(".yp-none-btn").text();

                }

            } else {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Is Disable
                    $thisPP.find(".yp-after-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();

                } else {

                    $(this).addClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable").show();

                    // Value
                    var $value = 'transparent';

                }

            }

            var $way = yp_get_parents($iframe.find(".yp-selected"));
            var $css = $("#" + $id + "-group").data("css");
			
			if($id == 'background-image'){

				if($value.indexOf("//") != -1){
					$value = "url("+$value+")";
				}

				if($value == 'transparent'){
					$value = 'none';
				}

			}

            if (e.originalEvent) {

                yp_insert_rule($way, $id, $css, $value, $prefix);
                yp_option_change();

            }else if($id == 'background-repeat' || $id == 'background-size'){
				
				if($(".yp_background_assets:visible").length > 0){
					yp_insert_rule($way, $id, $css, $value, $prefix);
					yp_option_change();
				}
				
			}

        } else {

            if ($thisPP.find(".yp-none-btn.active").length >= 0) {
                $thisPP.find(".yp-none-btn.active").trigger("click");
            }

            // Disable Btn
            var $prefix = '';

            // If slider
            if ($thisPP.hasClass("yp-slider-option")) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Show
                    $thisPP.find(".yp-after").show();

                    // Is Enable
                    $thisPP.find(".yp-after-disable-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();
                    var $prefix = $("#" + $id + "-after").val();

                } else {

                    $(this).addClass("active");

                    // Hide
                    $thisPP.find(".yp-after").hide();

                    // Is Disable
                    $thisPP.find(".yp-after-disable-disable").show();

                    // Value
                    var $value = 'disable';

                }

               // If is radio
            } else if ($thisPP.find(".yp-radio-content").length > 0) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Value
                    var $value = $("input[name=" + $id + "]:checked").val();

                } else {

                    $(this).addClass("active");

                    $thisPP.find(".yp-radio.active").removeClass("active");

                    // Value
                    var $value = 'disable';

                }

              // If is select
            } else if ($thisPP.find("select").length > 0) {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();

                } else {

                    $(this).addClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable-disable").show();

                    // Value
                    var $value = 'disable';

                }

            } else {

                var $id = $thisPP.attr("id").replace("-group", "");

                if ($(this).hasClass("active")) {

                    $(this).removeClass("active");

                    // Is Disable
                    $thisPP.find(".yp-after-disable-disable").hide();

                    // Value
                    var $value = $("#yp-" + $id).val();

                } else {

                    $(this).addClass("active");

                    // Is Enable
                    $thisPP.find(".yp-after-disable-disable").show();

                    // Value
                    var $value = 'disable';

                }

                if($id == 'background-image'){

					if($value.indexOf("//") != -1){
						$value = "url("+$value+")";
					}

					if($value == 'transparent'){
						$value = 'none';
					}

				}

            }

            // Fix border rule bugs.
            if ($id != 'border-style' && $id != 'border-width' && $id != 'border-color') {

                var $way = yp_get_parents($iframe.find(".yp-selected"));
                var $css = $("#" + $id + "-group").data("css");
				
				if (e.originalEvent) {
					yp_insert_rule($way, $id, $css, $value, $prefix);
				}

                yp_draw();

                if (e.originalEvent) {
                    yp_option_change();
                }

            }

        }

        yp_resize();

    });

	

    /* ---------------------------------------------------- */
    /* Collapse List 										*/
    /* ---------------------------------------------------- */
    $(".yp-editor-list > li > h3").click(function() {

        if ($(this).parent().hasClass("yp-li-about") || $(this).parent().hasClass("yp-li-footer")) {
            return '';
        }

        $(this).parent().addClass("current");

        // Disable.
        $(".yp-editor-list > li.active:not(.current)").each(function(){

			$(".yp-editor-list > li").show(0);
            $(this).find(".yp-this-content").hide(0).parent().removeClass("active");

        });


        if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
        } else {
            $(this).parent().addClass("active");
			$(".yp-editor-list > li:not(.active)").hide(0);
        }

        $(this).parent().find(".yp-this-content").toggle(0);
        $(this).parent().removeClass("current");
		
		if($(".yp-close-btn.dashicons-menu").length > 0){
			$(".yp-close-btn").removeClass("dashicons-menu").addClass("dashicons-no-alt");
		}
		
		if($(".yp-editor-list > li.active:not(.yp-li-about):not(.yp-li-footer) > h3").length > 0){
			$(".yp-close-btn").removeClass("dashicons-no-alt").addClass("dashicons-menu");
		}

		$('.yp-editor-list').scrollTop(0);
		
		yp_resize();

    });




    /* ---------------------------------------------------- */
    /* Filters		 										*/
    /* ---------------------------------------------------- */
    function yp_num(a) {
		if(typeof a !== "undefined" && a != ''){
			if(a.replace(/[^\d.-]/g, '') === null || a.replace(/[^\d.-]/g, '') === undefined){
				return 0;
			}else{
				return a.replace(/[^\d.-]/g, '');
			}
		}else{
			return 0;
		}
    }

    function yp_alfa(a) {
		if(typeof a !== "undefined" && a != ''){
			return a.replace(/\d/g, '').replace(".px", "px");
		}else{
			return '';
		}
    }

    var yp_id = function(str) {
		if(typeof str !== "undefined" && str != ''){
			str = str.replace(/\W+/g, "");
			return str;
		}else{
			return '';
		}
    }
	
	function yp_cleanArray(actual){
	  var newArray = new Array();
	  for(var i = 0; i<actual.length; i++){
		  if (actual[i]){
			newArray.push(actual[i]);
		}
	  }
	  return newArray;
	}



    /* ---------------------------------------------------- */
    /* Info About class or tagName							*/
    /* ---------------------------------------------------- */
    function yp_tag_info($a, $selector) {

        var $sp = " > ";

        var $length = $selector.split($sp).length - 1;
        var $no = $selector.split($sp)[$length].toUpperCase();
        var $n = $selector.split($sp)[$length].toUpperCase().replace(/[^\w\s]/gi, '');

        if ($length > 1) {
            var $Pname = $selector.split($sp)[$length - 1].toUpperCase().replace(/[^\w\s]/gi, '')
        } else {
            var $Pname = '';
        }

        if ($length > 2) {
            var $PPname = $selector.split($sp)[$length - 2].toUpperCase().replace(/[^\w\s]/gi, '')
        } else {
            var $PPname = '';
        }


        // Parrent Class
        if ($PPname == 'LOGO' || $PPname == 'SITETITLE' || $Pname == 'LOGO' || $Pname == 'SITETITLE') {
            return l18_logo;
        } else if ($n == 'MAPCANVAS') {
            return l18_google_map;
        }
        if ($Pname == 'ENTRYTITLE' && $a == 'A') {
            return l18_entry_title_link;
        } else if ($Pname == 'CATLINKS' && $a == 'A') {
            return l18_category_link;
        } else if ($Pname == 'TAGSLINKS' && $a == 'A') {
            return l18_tag_link;
        }

        // Current Class
        if ($n == 'WIDGET') {
            return l18_widget;
        } else if ($n == 'FA' || $no.indexOf("FA-") >= 0) {
            return l18_font_awesome_icon;
        } else if ($n == 'SUBMIT' && $a == 'INPUT') {
            return l18_submit_button;
        } else if ($n == 'MENUITEM') {
            return l18_menu_item;
        } else if ($n == 'ENTRYMETA' || $n == 'ENTRYMETABOX' || $n == 'POSTMETABOX') {
            return l18_post_meta_division;
        } else if ($n == 'COMMENTREPLYTITLE') {
            return l18_comment_reply_title;
        } else if ($n == 'LOGGEDINAS') {
            return l18_login_info;
        } else if ($n == 'FORMALLOWEDTAGS') {
            return l18_allowed_tags;
        } else if ($n == 'LOGO') {
            return l18_logo;
        } else if ($n == 'ENTRYTITLE' || $n == 'POSTTITLE') {
            return l18_post_title;
        } else if ($n == 'COMMENTFORM') {
            return l18_comment_form;
        } else if ($n == 'WIDGETTITLE') {
            return l18_widget_title;
        } else if ($n == 'TAGCLOUD') {
            return l18_tag_cloud;
        } else if ($n == 'ROW') {
            return l18_row;
        } else if ($n == 'BUTTON') {
            return l18_button;
        } else if ($n == 'BTN') {
            return l18_button;
        } else if ($n == 'LEAD') {
            return l18_lead;
        } else if ($n == 'WELL') {
            return l18_well;
        } else if ($n == 'ACCORDIONTOGGLE') {
            return l18_accordion_toggle;
        } else if ($n == 'PANELBODY') {
            return l18_accordion_content;
        } else if ($n == 'ALERT') {
            return l18_alert_division;
        } else if ($n == 'FOOTERCONTENT') {
            return l18_footer_content;
        } else if ($n == 'GLOBALSECTION') {
            return l18_global_section;
        } else if ($n == 'MORELINK') {
            return l18_show_more_link;
        } else if ($n == 'CONTAINER') {
            return l18_wrapper;
        } else if ($n == 'DEFAULTTITLE') {
            return l18_article_title;


            // Bootstrap Columns
        } else if ($n == 'COLMD1' || $n == 'MEDIUM1' || $n == 'LARGE1' || $n == 'SMALL1') {
            return l18_column + ' 1/12';
        } else if ($n == 'COLMD2' || $n == 'MEDIUM2' || $n == 'LARGE2' || $n == 'SMALL2') {
            return l18_column + ' 2/12';
        } else if ($n == 'COLMD3' || $n == 'MEDIUM3' || $n == 'LARGE3' || $n == 'SMALL3') {
            return l18_column + ' 3/12';
        } else if ($n == 'COLMD4' || $n == 'MEDIUM4' || $n == 'LARGE4' || $n == 'SMALL4') {
            return l18_column + ' 4/12';
        } else if ($n == 'COLMD5' || $n == 'MEDIUM5' || $n == 'LARGE5' || $n == 'SMALL5') {
            return l18_column + ' 5/12';
        } else if ($n == 'COLMD6' || $n == 'MEDIUM6' || $n == 'LARGE6' || $n == 'SMALL6') {
            return l18_column + ' 6/12';
        } else if ($n == 'COLMD7' || $n == 'MEDIUM7' || $n == 'LARGE7' || $n == 'SMALL7') {
            return l18_column + ' 7/12';
        } else if ($n == 'COLMD8' || $n == 'MEDIUM8' || $n == 'LARGE8' || $n == 'SMALL8') {
            return l18_column + ' 8/12';
        } else if ($n == 'COLMD9' || $n == 'MEDIUM9' || $n == 'LARGE9' || $n == 'SMALL9') {
            return l18_column + ' 9/12';
        } else if ($n == 'COLMD10' || $n == 'MEDIUM10' || $n == 'LARGE10' || $n == 'SMALL10') {
            return l18_column + ' 10/12';
        } else if ($n == 'COLMD11' || $n == 'MEDIUM11' || $n == 'LARGE11' || $n == 'SMALL11') {
            return l18_column + ' 11/12';
        } else if ($n == 'COLMD12' || $n == 'MEDIUM12' || $n == 'LARGE12' || $n == 'SMALL12') {
            return l18_column + ' 12/12';
        } else if ($n == 'COLXS1') {
            return l18_column + ' 1/12';
        } else if ($n == 'COLXS2') {
            return l18_column + ' 2/12';
        } else if ($n == 'COLXS3') {
            return l18_column + ' 3/12';
        } else if ($n == 'COLXS4') {
            return l18_column + ' 4/12';
        } else if ($n == 'COLXS5') {
            return l18_column + ' 5/12';
        } else if ($n == 'COLXS6') {
            return l18_column + ' 6/12';
        } else if ($n == 'COLXS7') {
            return l18_column + ' 7/12';
        } else if ($n == 'COLXS8') {
            return l18_column + ' 8/12';
        } else if ($n == 'COLXS9') {
            return l18_column + ' 9/12';
        } else if ($n == 'COLXS10') {
            return l18_column + ' 10/12';
        } else if ($n == 'COLXS11') {
            return l18_column + ' 11/12';
        } else if ($n == 'COLXS12') {
            return l18_column + ' 12/12';
        } else if ($n == 'COLSM1') {
            return l18_column + ' 1/12';
        } else if ($n == 'COLSM2') {
            return l18_column + ' 2/12';
        } else if ($n == 'COLSM3') {
            return l18_column + ' 3/12';
        } else if ($n == 'COLSM4') {
            return l18_column + ' 4/12';
        } else if ($n == 'COLSM5') {
            return l18_column + ' 5/12';
        } else if ($n == 'COLSM6') {
            return l18_column + ' 6/12';
        } else if ($n == 'COLSM7') {
            return l18_column + ' 7/12';
        } else if ($n == 'COLSM8') {
            return l18_column + ' 8/12';
        } else if ($n == 'COLSM9') {
            return l18_column + ' 9/12';
        } else if ($n == 'COLSM10') {
            return l18_column + ' 10/12';
        } else if ($n == 'COLSM11') {
            return l18_column + ' 11/12';
        } else if ($n == 'COLSM12') {
            return l18_column + ' 12/12';
        } else if ($n == 'COLLG1') {
            return l18_column + ' 1/12';
        } else if ($n == 'COLLG2') {
            return l18_column + ' 2/12';
        } else if ($n == 'COLLG3') {
            return l18_column + ' 3/12';
        } else if ($n == 'COLLG4') {
            return l18_column + ' 4/12';
        } else if ($n == 'COLLG5') {
            return l18_column + ' 5/12';
        } else if ($n == 'COLLG6') {
            return l18_column + ' 6/12';
        } else if ($n == 'COLLG7') {
            return l18_column + ' 7/12';
        } else if ($n == 'COLLG8') {
            return l18_column + ' 8/12';
        } else if ($n == 'COLLG9') {
            return l18_column + ' 9/12';
        } else if ($n == 'COLLG10') {
            return l18_column + ' 10/12';
        } else if ($n == 'COLLG11') {
            return l18_column + ' 11/12';
        } else if ($n == 'COLLG12') {
            return l18_column + ' 12/12';
        } else if ($n == 'POSTBODY') {
            return l18_post_division;
        } else if ($n == 'POST') {
            return l18_post_division;
        } else if ($n == 'CONTENT' || $n == 'DEFAULTCONTENT') {
            return l18_content_division;
        } else if ($n == 'ENTRYTITLE') {
            return l18_entry_title;
        } else if ($n == 'ENTRYCONTENT') {
            return l18_entry_content;
        } else if ($n == 'ENTRYFOOTER') {
            return l18_entry_footer;
        } else if ($n == 'ENTRYHEADER') {
            return l18_entry_header;
        } else if ($n == 'ENTRYTIME') {
            return l18_entry_time;
        } else if ($n == 'POSTEDITLINK') {
            return l18_post_edit_link;
        } else if ($n == 'POSTTHUMBNAIL') {
            return l18_post_thumbnail;
        } else if ($n == 'THUMBNAIL') {
            return l18_thumbnail;
        } else if ($n.indexOf("ATTACHMENT") >= 0) {
            return l18_thumbnail_image;
        } else if ($n == 'EDITLINK') {
            return l18_edit_link;
        } else if ($n == 'COMMENTSLINK') {
            return l18_comments_link_division;
        } else if ($n == 'SITEDESCRIPTION') {
            return l18_site_description;
        } else if ($n == 'POSTCLEAR' || $n == 'POSTBREAK') {
            return l18_post_break;
        }		

        // TAG NAME START
        if ($a == 'P') {
            return l18_paragraph;
        } else if ($a == 'BR') {
            return l18_line_break;
        } else if ($a == 'HR') {
            return l18_horizontal_rule;
        } else if ($a == 'A') {
            return l18_link;
        } else if ($a == 'LI') {
            return l18_list_item;
        } else if ($a == 'UL') {
            return l18_unorganized_list;
        } else if ($a == 'OL') {
            return l18_unorganized_list;
        } else if ($a == 'IMG') {
            return l18_image;
        } else if ($a == 'B') {
            return l18_bold_tag;
        } else if ($a == 'I') {
            return l18_italic_tag;
        } else if ($a == 'STRONG') {
            return l18_strong_tag;
        } else if ($a == 'Em') {
            return l18_italic_tag;
        } else if ($a == 'BLOCKQUOTE') {
            return l18_blockquote;
        } else if ($a == 'PRE') {
            return l18_preformatted;
        } else if ($a == 'TABLE') {
            return l18_table;
        } else if ($a == 'TR') {
            return l18_table_row;
        } else if ($a == 'TD') {
            return l18_table_data;
        } else if ($a == 'HEADER' || $n == 'HEADER') {
            return l18_header_division;
        } else if ($a == 'FOOTER' || $n == 'FOOTER') {
            return l18_footer_division;
        } else if ($a == 'SECTION' || $n == 'SECTION') {
            return l18_section;
        } else if ($a == 'FORM') {
            return l18_form_division;
        } else if ($a == 'BUTTON') {
            return l18_button;
        } else if ($a == 'CENTER') {
            return l18_centred_block;
        } else if ($a == 'DL') {
            return l18_definition_list;
        } else if ($a == 'DT') {
            return l18_definition_term;
        } else if ($a == 'DD') {
            return l18_definition_description;
        } else if ($a == 'H1') {
            return l18_header + ' (' + l18_level + ' 1)';
        } else if ($a == 'H2') {
            return l18_header + ' (' + l18_level + ' 2)';
        } else if ($a == 'H3') {
            return l18_header + ' (' + l18_level + ' 3)';
        } else if ($a == 'H4') {
            return l18_header + ' (' + l18_level + ' 4)';
        } else if ($a == 'H5') {
            return l18_header + ' (' + l18_level + ' 5)';
        } else if ($a == 'H6') {
            return l18_header + ' (' + l18_level + ' 6)';
        } else if ($a == 'SMALL') {
            return l18_smaller_text;
        } else if ($a == 'TEXTAREA') {
            return l18_text_area;
        } else if ($a == 'TBODY') {
            return l18_body_of_table;
        } else if ($a == 'THEAD') {
            return l18_head_of_table;
        } else if ($a == 'TFOOT') {
            return l18_foot_of_table;
        } else if ($a == 'U') {
            return l18_underline_text;
        } else if ($a == 'SPAN') {
            return l18_span;
        } else if ($a == 'Q') {
            return l18_quotation;
        } else if ($a == 'CITE') {
            return l18_citation;
        } else if ($a == 'CODE') {
            return l18_expract_of_code;
        } else if ($a == 'NAV' || $n == 'NAVIGATION' || $n == 'NAVIGATIONCONTENT') {
            return l18_navigation;
        } else if ($a == 'LABEL') {
            return l18_label;
        } else if ($a == 'TIME') {
            return l18_time;
        } else if ($a == 'DIV') {
            return l18_division;
        } else if ($a == 'CAPTION') {
            return l18_caption_of_table;
        } else if ($a == 'INPUT') {
            return l18_input;
        } else {
            return $a.toLowerCase();
        }

    }

	
	// disable jquery plugins. // Parallax.
	$("#yp-background-parallax .yp-radio").click(function(){

		var v = $(this).find("input").val();
		
		if(v == 'disable'){
			$iframe.find($body.attr("data-clickable-select")).addClass("yp-parallax-disabled");
		}else{
			$iframe.find($body.attr("data-clickable-select")).removeClass("yp-parallax-disabled");
		}

	});
	

    // Update saved btn
    function yp_option_change() {
		
        $(".yp-save-btn").html(save).removeClass("yp-disabled").addClass("waiting-for-save");
		
		var caller = setTimeout(function(){
			
			// Call CSS Engine.
			$(document).CallCSSEngine(yp_get_clean_css());
			
		},200);
		
		setTimeout(function(){
		editor.setValue(yp_get_clean_css());
		},200);
		
    }


    // Update saved btn
    function yp_option_update() {
        $(".yp-save-btn").html(saved).addClass("yp-disabled").removeClass("waiting-for-save");
    }


    // Wait until CSS process.
       function yp_process(close,id,type){

       	// close css editor with process..
		if(close == true){

			$("#cssData,#cssEditorBar,#leftAreaEditor").hide();
			$iframeBody.trigger("scroll");
			$("body").removeClass("yp-css-editor-active");
				
			// Update All.
			yp_draw();
			yp_tooltip_draw();

		}

		// IF not need to process, stop here.
       	if($body.hasClass("yp-need-to-process") == false){
       		return false;
       	}

       	// Remove class.
       	$body.removeClass("yp-need-to-process");


       	// Processing.
		if($body.find(".yp-processing").length == 0){
			$body.addClass("yp-processing-now");
			$body.append("<div class='yp-processing'><span></span></div>");
		}else{
			$body.addClass("yp-processing-now");
			$body.find(".yp-processing").show();
		}

		setTimeout(function(){

			yp_cssToData('desktop');
			yp_cssToData('tablet');
			yp_cssToData('mobile');
			$body.removeClass("process-by-code-editor");

			setTimeout(function(){
				$body.removeClass("yp-processing-now");
				$body.find(".yp-processing").hide();
				editor.setValue(yp_get_clean_css());
			},5);

			// Save
			if(id != false){
				var $posting = $.post(ajaxurl, {
					action: "yp_ajax_save",
					yp_id: id,
					yp_stype: type,
					yp_data: yp_get_clean_css(),
					yp_editor_data: yp_get_styles_area()
				});
				
				// Done.
				$posting.complete(function(data) {
					$(".yp-save-btn").html(saved).addClass("yp-disabled").removeClass("waiting-for-save");
				});
			}

		},5);

	}


    //Function to convert hex format to a rgb color
    function rgb2hex(rgb) {
		if(typeof rgb !== 'undefined'){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
		}else{
			return '';
		}
    }
	

	// Check if font available
	function isFontAvailable (font) {
		var testString  = '~iomwIOMW';
		var containerId = 'is-font-available-container';
		
		var fontArray = font instanceof Array;
		
		if (!fontArray) {
			font = [ font ];
		}
		
		var fontAvailability = [];
		
		var containerSel = '#' + containerId;
		var spanSel      = containerSel + ' span';
			
		var familySansSerif = 'sans-serif';
		var familyMonospace = 'monospace, monospace';
		// Why monospace twice? It's a bug in the Mozilla and Webkit rendering engines:
		// http://www.undermyhat.org/blog/2009/09/css-font-family-monospace-renders-inconsistently-in-firefox-and-chrome/

		// DOM:
		$iframeBody.append('<div id="' + containerId + '"></div>');
		$iframeBody.find(containerSel).append('<span></span>');
		$iframeBody.find(spanSel).append(document.createTextNode(testString));
		
		// CSS:
		$iframeBody.find(containerSel).css('visibility', 'hidden');
		$iframeBody.find(containerSel).css('position', 'absolute');
		$iframeBody.find(containerSel).css('left', '-9999px');
		$iframeBody.find(containerSel).css('top', '0');
		$iframeBody.find(containerSel).css('font-weight', 'bold');
		$iframeBody.find(containerSel).css('font-size', '200px !important');
		
		jQuery.each( font, function (i, v) {
			$iframeBody.find(spanSel).css('font-family', v + ',' + familyMonospace );
			var monospaceFallbackWidth = $iframeBody.find(spanSel).width();
			var monospaceFallbackHeight = $iframeBody.find(spanSel).height();
			
			$iframeBody.find(spanSel).css('font-family', v + ',' + familySansSerif );
			var sansSerifFallbackWidth = $iframeBody.find(spanSel).width();
			var sansSerifFallbackHeight = $iframeBody.find(spanSel).height();
			
			fontAvailability[i] = true
				&& monospaceFallbackWidth == sansSerifFallbackWidth
				&& monospaceFallbackHeight == sansSerifFallbackHeight;
		} );
		
		$iframeBody.find(containerSel).remove();
		
		if (!fontArray && fontAvailability.length == 1) {
			fontAvailability = fontAvailability[0];
		}
		
		return fontAvailability;
	}


	// Browser fullscreen
	function toggleFullScreen(elem) {
	    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
	        if (elem.requestFullScreen) {
	            elem.requestFullScreen();
	        } else if (elem.mozRequestFullScreen) {
	            elem.mozRequestFullScreen();
	        } else if (elem.webkitRequestFullScreen) {
	            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	        } else if (elem.msRequestFullscreen) {
	            elem.msRequestFullscreen();
	        }
	        $body.addClass("yp-fullscreen");
	    } else {
	        if (document.cancelFullScreen) {
	            document.cancelFullScreen();
	        } else if (document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if (document.webkitCancelFullScreen) {
	            document.webkitCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	            document.msExitFullscreen();
	        }
	        $body.removeClass("yp-fullscreen");
	    }
	}

	
});
	
}(jQuery));