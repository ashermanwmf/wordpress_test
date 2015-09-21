<?php



/* ---------------------------------------------------- */
/* Slider Option                                        */
/* ---------------------------------------------------- */
function yp_get_slider_markup($cssName, $name, $default = 'inherit', $decimals, $pxv, $pcv, $emv,$note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}
    
    if ($default != false) {
        $defaultLink = "<a class='yp-btn-action yp-none-btn'>" . $default . "</a>";
    } else {
        $defaultLink = '';
    }

    $notice_last = null;
    if(!defined("WTFV")){
	    if($cssName == 'width' || $cssName == 'height' || $cssName == 'opacity'){
	    	$notice_last = "<p class='yp-alert-warning yp-notice-last'>".$name." property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>";
	    }
    }
    
    return "<div id='" . $cssName . "-group' class='yp-option-group yp-slider-option' data-css='" . $cssName . "' data-decimals='" . $decimals . "' data-pxv='" . $pxv . "' data-pcv='" . $pcv . "' data-emv='" . $emv . "'>
                
        <div class='yp-part'>
        
            <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: " . $defaultLink . " <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
            <div id='yp-" . $cssName . "'></div>
                
            <div class='yp-after'>
                <input type='text' id='" . $cssName . "-value' class='yp-after-css yp-after-css-val' />
                <input type='text' id='" . $cssName . "-after' class='yp-after-css yp-after-prefix' /><small>(px % em)</small>
            </div>
                    
            <div class='yp-after-disable'>
                Value: <span>" . $default . "</span>
            </div>
                    
            <div class='yp-after-disable-disable'>
                Value: <span>(nothing)</span>
            </div>
                
            </div>
            ".$notice_last."
    </div>";
    
}



/* ---------------------------------------------------- */
/* Select Option                                        */
/* ---------------------------------------------------- */
function yp_get_select_markup($cssName, $name, $values, $default = 'none',$note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}
    
    if ($default != false) {
        $defaultLink = "<a class='yp-btn-action yp-none-btn'>" . $default . "</a>";
    } else {
        $defaultLink = '';
    }

    $notice_last = null;
    if(!defined("WTFV")){
	    if($cssName == 'font-family' || $cssName == 'text-shadow'){
	    	$notice_last = "<p class='yp-alert-warning yp-notice-last'>".$name." property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>";
	    }
    }
    
    $return = "<div id='" . $cssName . "-group' class='yp-option-group yp-select-option' data-css='" . $cssName . "'>
                
                <div class='yp-part'>
                    <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: " . $defaultLink . " <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
                    
                    <select id='yp-" . $cssName . "' class='wqselect2-select'>";
    
    foreach ($values as $key => $value) {
        
        $return .= '<option value="' . $key . '">' . $value . '</option>';
        
    }
    
    $return .= "</select>
                
                
                <div class='yp-after-disable'>
                    Value: <span>" . $default . "</span>
                </div>
                
                <div class='yp-after-disable-disable'>
                    Value: <span>(nothing)</span>
                </div>
                
            </div>
            ".$notice_last."
            </div>";
    
    return $return;
    
}



/* ---------------------------------------------------- */
/* Radio Option                                         */
/* ---------------------------------------------------- */
function yp_get_radio_markup($cssName, $name, $values, $default = 'none',$note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}
    
    if ($default != false) {
        $defaultLink = "<a class='yp-btn-action yp-none-btn'>" . $default . "</a>";
    } else {
        $defaultLink = '';
    }

    $notice_last = null;
    if(!defined("WTFV")){
	    if($cssName == 'text-transform'){
	    	$notice_last = "<p class='yp-alert-warning yp-notice-last'>".$name." property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>";
	    }
    }
    
    $return = "<div id='" . $cssName . "-group' class='yp-option-group yp-radio-option' data-css='" . $cssName . "'>
                
                <div class='yp-part'>
                    <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: " . $defaultLink . " <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
                    
                    <div class='yp-radio-grid-" . count($values) . " yp-radio-content' id='yp-" . $cssName . "'>
                    ";
    
    foreach ($values as $key => $value) {
        
        if ($cssName != 'position' && $cssName != 'float' && $cssName != 'display' && $cssName != 'overflow-x' && $cssName != 'overflow-y' && $cssName != 'border-style' && $cssName != 'border-top-style' && $cssName != 'border-left-style' && $cssName != 'border-right-style' && $cssName != 'border-bottom-style') {
            $style_tag = 'style="' . $cssName . ':' . $key . '"';
        } else {
            $style_tag = '';
        }
        
        $return .= '<div class="yp-radio"><input type="radio" name="' . $cssName . '" value="' . $key . '" id="s-'.$cssName.'-' . $key . '"><label id="'.$cssName.'-' . $key . '" data-for="s-'.$cssName.'-' . $key . '" ' . $style_tag . ' class="yp-update">' . $value . '</label></div>';
        
    }
    
    $return .= "
                
                <div class='yp-clearfix'></div>
                
                </div>
                
                </div>
            ".$notice_last."
            </div>";
    
    return $return;
    
}



/* ---------------------------------------------------- */
/* Colorpicker Option                                    */
/* ---------------------------------------------------- */
function yp_get_color_markup($cssName, $name,$note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}

	$notice_last = null;
    if(!defined("WTFV")){
	    if($cssName == 'background-color' || $cssName == 'color'){
	    	$notice_last = "<p class='yp-alert-warning yp-notice-last'>".$name." property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>";
	    }
    }
    
    $return = "<div id='" . $cssName . "-group' class='yp-option-group yp-color-option' data-css='" . $cssName . "'>
                
                <div class='yp-part'>
                    <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: <a class='yp-btn-action yp-none-btn'>".__('transpa..','yp')."</a> <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
                    
                    <input id='yp-" . $cssName . "' type='text' maxlength='6' size='6' class='wqcolorpicker' value='' />
                
				<a class='yp-flat-colors'>".__('Flat','yp')."</a> <a class='yp-meterial-colors'>".__('Material','yp')."</a> <a class='yp-nice-colors'>".__('Nice','yp')."</a> <a class='yp-element-picker'>".__('Picker','yp')."</a>
				<div class='yp-clearfix'></div>
				
				<div class='yp_flat_colors_area'>
					<div class='yp-flat-c' data-color='#1abc9c' style='background:#1abc9c'></div>
					<div class='yp-flat-c' data-color='#2ecc71' style='background:#2ecc71'></div>
					<div class='yp-flat-c' data-color='#3498db' style='background:#3498db'></div>
					<div class='yp-flat-c' data-color='#9b59b6' style='background:#9b59b6'></div>
					<div class='yp-flat-c' data-color='#34495e' style='background:#34495e'></div>
					<div class='yp-flat-c' data-color='#16a085' style='background:#16a085'></div>
					<div class='yp-flat-c' data-color='#27ae60' style='background:#27ae60'></div>
					<div class='yp-flat-c' data-color='#2980b9' style='background:#2980b9'></div>
					<div class='yp-flat-c' data-color='#8e44ad' style='background:#8e44ad'></div>
					<div class='yp-flat-c' data-color='#2c3e50' style='background:#2c3e50'></div>
					<div class='yp-flat-c' data-color='#f1c40f' style='background:#f1c40f'></div>
					<div class='yp-flat-c' data-color='#e67e22' style='background:#e67e22'></div>
					<div class='yp-flat-c' data-color='#e74c3c' style='background:#e74c3c'></div>
					<div class='yp-flat-c' data-color='#ecf0f1' style='background:#ecf0f1'></div>
					<div class='yp-flat-c' data-color='#95a5a6' style='background:#95a5a6'></div>
					<div class='yp-flat-c' data-color='#f39c12' style='background:#f39c12'></div>
					<div class='yp-flat-c' data-color='#d35400' style='background:#d35400'></div>
					<div class='yp-flat-c' data-color='#c0392b' style='background:#c0392b'></div>
					<div class='yp-flat-c' data-color='#bdc3c7' style='background:#bdc3c7'></div>
					<div class='yp-flat-c' data-color='#7f8c8d' style='background:#7f8c8d'></div>
				</div>

				<div class='yp_meterial_colors_area'>
					<div class='yp-meterial-c' data-color='#F44336' style='background:#F44336'></div>
					<div class='yp-meterial-c' data-color='#E91E63' style='background:#E91E63'></div>
					<div class='yp-meterial-c' data-color='#9C27B0' style='background:#9C27B0'></div>
					<div class='yp-meterial-c' data-color='#673AB7' style='background:#673AB7'></div>
					<div class='yp-meterial-c' data-color='#3F51B5' style='background:#3F51B5'></div>
					<div class='yp-meterial-c' data-color='#2196F3' style='background:#2196F3'></div>
					<div class='yp-meterial-c' data-color='#03A9F4' style='background:#03A9F4'></div>
					<div class='yp-meterial-c' data-color='#00BCD4' style='background:#00BCD4'></div>
					<div class='yp-meterial-c' data-color='#009688' style='background:#009688'></div>
					<div class='yp-meterial-c' data-color='#4CAF50' style='background:#4CAF50'></div>
					<div class='yp-meterial-c' data-color='#8BC34A' style='background:#8BC34A'></div>
					<div class='yp-meterial-c' data-color='#CDDC39' style='background:#CDDC39'></div>
					<div class='yp-meterial-c' data-color='#FFEB3B' style='background:#FFEB3B'></div>
					<div class='yp-meterial-c' data-color='#FFC107' style='background:#FFC107'></div>
					<div class='yp-meterial-c' data-color='#FF9800' style='background:#FF9800'></div>
					<div class='yp-meterial-c' data-color='#FF5722' style='background:#FF5722'></div>
					<div class='yp-meterial-c' data-color='#795548' style='background:#795548'></div>
					<div class='yp-meterial-c' data-color='#9E9E9E' style='background:#9E9E9E'></div>
					<div class='yp-meterial-c' data-color='#607D8B' style='background:#607D8B'></div>
					<div class='yp-meterial-c' data-color='#BEC2C3' style='background:#BEC2C3'></div>
				</div>
				
				<div class='yp_nice_colors_area'>
					<div class='yp-nice-c' data-color='#69D2E7' style='background:#69D2E7'></div>
					<div class='yp-nice-c' data-color='#A7DBD8' style='background:#A7DBD8'></div>
					<div class='yp-nice-c' data-color='#E0E4CC' style='background:#E0E4CC'></div>
					<div class='yp-nice-c' data-color='#F38630' style='background:#F38630'></div>
					<div class='yp-nice-c' data-color='#FA6900' style='background:#FA6900'></div>
					<div class='yp-nice-c' data-color='#ECD078' style='background:#ECD078'></div>
					<div class='yp-nice-c' data-color='#D95B43' style='background:#D95B43'></div>
					<div class='yp-nice-c' data-color='#C02942' style='background:#C02942'></div>
					<div class='yp-nice-c' data-color='#542437' style='background:#542437'></div>
					<div class='yp-nice-c' data-color='#53777A' style='background:#53777A'></div>
					<div class='yp-nice-c' data-color='#CFF09E' style='background:#CFF09E'></div>
					<div class='yp-nice-c' data-color='#A8DBA8' style='background:#A8DBA8'></div>
					<div class='yp-nice-c' data-color='#79BD9A' style='background:#79BD9A'></div>
					<div class='yp-nice-c' data-color='#3B8686' style='background:#3B8686'></div>
					<div class='yp-nice-c' data-color='#0B486B' style='background:#0B486B'></div>
					<div class='yp-nice-c' data-color='#556270' style='background:#556270'></div>
					<div class='yp-nice-c' data-color='#4ECDC4' style='background:#4ECDC4'></div>
					<div class='yp-nice-c' data-color='#C7F464' style='background:#C7F464'></div>
					<div class='yp-nice-c' data-color='#FF6B6B' style='background:#FF6B6B'></div>
					<div class='yp-nice-c' data-color='#C44D58' style='background:#C44D58'></div>
					<div class='yp-nice-c' data-color='#490A3D' style='background:#490A3D'></div>
					<div class='yp-nice-c' data-color='#BD1550' style='background:#BD1550'></div>
					<div class='yp-nice-c' data-color='#E97F02' style='background:#E97F02'></div>
					<div class='yp-nice-c' data-color='#F8CA00' style='background:#F8CA00'></div>
					<div class='yp-nice-c' data-color='#8A9B0F' style='background:#8A9B0F'></div>
					<div class='yp-nice-c' data-color='#594F4F' style='background:#594F4F'></div>
					<div class='yp-nice-c' data-color='#547980' style='background:#547980'></div>
					<div class='yp-nice-c' data-color='#45ADA8' style='background:#45ADA8'></div>
					<div class='yp-nice-c' data-color='#9DE0AD' style='background:#9DE0AD'></div>
					<div class='yp-nice-c' data-color='#E5FCC2' style='background:#E5FCC2'></div>
					<div class='yp-nice-c' data-color='#00A0B0' style='background:#00A0B0'></div>
					<div class='yp-nice-c' data-color='#6A4A3C' style='background:#6A4A3C'></div>
					<div class='yp-nice-c' data-color='#CC333F' style='background:#CC333F'></div>
					<div class='yp-nice-c' data-color='#EB6841' style='background:#EB6841'></div>
					<div class='yp-nice-c' data-color='#EDC951' style='background:#EDC951'></div>
					
				</div>
				
				
                <div class='yp-after-disable'>
                    Value: <span>transparent</span>
                </div>
                
                <div class='yp-after-disable-disable'>
                    Value: <span>(nothing)</span>
                </div>
                
            </div>
            ".$notice_last."
            </div>";
    
    return $return;
    
}




/* ---------------------------------------------------- */
/* Input Option   		                                */
/* ---------------------------------------------------- */
function yp_get_input_markup($cssName, $name, $none = null, $note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}
    
    $return = "<div id='" . $cssName . "-group' class='yp-option-group yp-input-option' data-css='" . $cssName . "'>
                
                <div class='yp-part'>
                    <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: <a class='yp-btn-action yp-none-btn'>".$none."</a> <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
                    
                    <input autocomplete='off' id='yp-" . $cssName . "' type='text' class='yp-input' value='' />";
		
	
	if($cssName == "background-image"){
		$images = glob(WT_PLUGIN_DIR.'/assets/*.{png,jpg,jpeg}', GLOB_BRACE);
		$return .= "<div style='clear:both;'></div><a class='yp-gallery-btn yp-upload-btn'>".__('Upload','yp')."</a><a class='yp-bg-img-btn'>".__('Patterns','yp')."</a><a target='_blank' href='https://unsplash.com/grid' class='yp-gallery-btn'>".__('More Assets','yp')."</a><div style='clear:both;'></div>";
		$return .= "<div class='yp_background_assets'>";
		
		foreach ($images as $image) {
			$return .= '<div class="yp_bg_assets" data-url="'.WT_PLUGIN_URL.'assets/'.basename($image).'"></div>';
		}
		
		$return .= "</div>";
	}

	$notice_last = null;
    if(!defined("WTFV")){
	    if($cssName == 'background-image'){
	    	$notice_last = "<p class='yp-alert-warning yp-notice-last'>".$name." property not available for lite version. <a target='_blank' href='http://waspthemes.com/yellow-pencil/buy'>Upgrade?</a></p>";
	    }
    }
                
    $return .= "<div class='yp-after-disable'>
                    Value: <span>".$none."</span>
                </div>
                
                <div class='yp-after-disable-disable'>
                    Value: <span>(nothing)</span>
                </div>
                
            </div>
            ".$notice_last."
            </div>";
    
    return $return;
    
}




/* ---------------------------------------------------- */
/* Input Option   		                                */
/* ---------------------------------------------------- */
function yp_get_textarea_markup($cssName, $name, $none = null,$note = null)
{
	
	$tooltip = '';
	if($note != null && $note != false){
		$tooltip = " data-toggle='tooltip' data-placement='left' title='".$note."'";
	}
    
    $return = "<div id='" . $cssName . "-group' class='yp-option-group yp-input-option' data-css='" . $cssName . "'>
                
                <div class='yp-part'>
                    <label class='yp-option-label'><span".$tooltip.">" . strtoupper($name) . "</span>: <a class='yp-btn-action yp-none-btn'>".$none."</a> <a class='yp-btn-action yp-disable-btn'>".__('Disable','yp')."</a></label>
                    
                    <textarea autocomplete='off' id='yp-" . $cssName . "' type='text' class='yp-textarea'></textarea>";
                
    $return .= "<div class='yp-after-disable'>
                    Value: <span>".$none."</span>
                </div>
                
                <div class='yp-after-disable-disable'>
                    Value: <span>(nothing)</span>
                </div>
                
            </div>
            
            </div>";
    
    return $return;
    
}