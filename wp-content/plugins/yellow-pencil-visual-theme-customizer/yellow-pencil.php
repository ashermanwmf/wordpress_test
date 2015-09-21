<?php
/*
Plugin Name: WaspThemes - Yellow Pencil Lite
Plugin URI: http://waspthemes.com/yellow-pencil
Description: Easily customize WordPress themes, live. Google Fonts, Backgrounds, Animations and more! The best wordpress customizer plugin. 
Version: 4.6.2
Author: WaspThemes
Author URI: http://www.waspthemes.com
*/


/* ---------------------------------------------------- */
/* Basic 												*/
/* ---------------------------------------------------- */
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

// Editor uri.
function yp_uri(){
	if(current_user_can("edit_theme_options") == true){
		return admin_url('admin.php?page=yellow-pencil-editor');
	}elseif(defined('WT_DEMO_MODE')){
		return add_query_arg(array('yellow_pencil' => 'true'),get_home_url().'/');
	}
}



/* ---------------------------------------------------- */
/* Define 												*/
/* ---------------------------------------------------- */
define( 'WT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );


/* ---------------------------------------------------- */
/* Adding info to header								*/
/* ---------------------------------------------------- */
function yp_info_in_header(){
	echo '<meta name="generator" content="Yellow Pencil WordPress Plugin" />' . "\n";
}
add_action( 'wp_head', 'yp_info_in_header' );



/* ---------------------------------------------------- */
/* Load Translation Text Domain							*/
/* ---------------------------------------------------- */
function yp_plugin_lang() {
	load_plugin_textdomain( 'yp', false, dirname(plugin_basename( __FILE__ )) . '/languages' ); 
}
add_action( 'plugins_loaded', 'yp_plugin_lang' );



/* ---------------------------------------------------- */
/* Getting font familys by CSS OUTPUT					*/
/* ---------------------------------------------------- */
function yp_get_font_families(){
	
	$css = yp_get_css(true);
	
	$protocol = is_ssl() ? 'https' : 'http';
	
	preg_match_all('/font-family:(.*?);/', $css, $r);

	foreach($r['1'] as &$k){
		$k = yp_font_name($k);
	}
	
	foreach(array_unique($r['1']) as $family){
		
		// Getting fonts from google api.
		wp_enqueue_style(strtolower($family), esc_url(''.$protocol.'://fonts.googleapis.com/css?family='.$family.':300,300italic,400,400italic,500,500italic,600,600italic,700,700italic'));	
		
	}
	
}



/* ---------------------------------------------------- */
/* Getting Only Font Name From CSS Source				*/
/* ---------------------------------------------------- */
function yp_font_name($k){
	
	$k = str_replace("font-family:","",$k);
	
	$k = str_replace('"',"",$k);
	$k = str_replace("'","",$k);
	
	$k = str_replace(" ","+",$k);
	
	$k = str_replace("+!important","",$k);
	
	$k = str_replace("!important","",$k);
	
	if(strstr($k,",")){
		$array = explode(",",$k);
		return $array[0];
	}else{
		return $k;
	}

}



/* ---------------------------------------------------- */
/* Checking true or false								*/
/* ---------------------------------------------------- */
function yp_check_let(){
	
	// If Demo Mode
	if(defined("WT_DEMO_MODE") == true && isset($_GET['yellow_pencil_frame']) == true){
		return true;
	}
	
	// If user can.
	if(current_user_can("edit_theme_options") == true){
		return true;
	}else{
		return false;
	}
	
}


/* ---------------------------------------------------- */
/* Checking true or false								*/
/* ---------------------------------------------------- */
function yp_check_let_frame(){
	
	// If Demo Mode
	if(defined("WT_DEMO_MODE") == true && isset($_GET['yellow_pencil_frame']) == true){
		return true;
	}
	
	// Be sure, user can.
	if(current_user_can("edit_theme_options") == true && isset($_GET['yellow_pencil_frame']) == true){
		return true;
	}else{
		return false;
	}
	
}



/* ---------------------------------------------------- */
/* Register Admin Script								*/
/* ---------------------------------------------------- */
function yp_enqueue_admin_pages($hook){

	// Options page.
	if('settings_page_yp-options' == $hook){
		wp_enqueue_style('yellow-pencil-admin', plugins_url( 'css/options.css' , __FILE__ ));
	}
	
	// Post pages.
    if ( 'post.php' == $hook ) {
        wp_enqueue_script('yellow-pencil-admin', plugins_url( 'js/admin.js' , __FILE__ ), 'jquery', '1.0', TRUE);
		wp_enqueue_style('yellow-pencil-admin', plugins_url( 'css/admin.css' , __FILE__ ));
    }
	
}
add_action( 'admin_enqueue_scripts', 'yp_enqueue_admin_pages' );




/* ---------------------------------------------------- */
/* Register Plugin Styles For Iframe					*/
/* ---------------------------------------------------- */
function yp_styles_frame() {
		
	$protocol = is_ssl() ? 'https' : 'http';

	// Google web fonts.
	wp_enqueue_style('yellow-pencil-font', ''.$protocol.'://fonts.googleapis.com/css?family=Open+Sans:400,600');	
	
	wp_enqueue_style('yellow-pencil-frame', plugins_url( 'css/frame.css' , __FILE__ ));
	
	// animate library.
	wp_enqueue_style('yellow-pencil-animate', plugins_url( 'library/css/animate.css' , __FILE__ ));
	
}




/* ---------------------------------------------------- */
/* Adding Link To Admin Appearance Menu					*/
/* ---------------------------------------------------- */
function yp_menu() {
	add_theme_page('Yellow Pencil', 'Yellow Pencil', 'edit_theme_options', 'yellow-pencil', 'yp_menu_function',999);
}



/* ---------------------------------------------------- */
/* Appearance page Loading And Location					*/
/* ---------------------------------------------------- */
function yp_menu_function(){

	$yellow_pencil_uri = yp_uri();
	
	// Background
	echo '<div class="yp-bg"></div>';
	
	// Loader
	echo '<div class="yp-spinner"><div class="yp-dot1"></div><div class="yp-dot2"></div></div>';
	
	// Background and loader CSS
	echo '<style>.yp-bg{position:fixed;top:0px;left:0px;width:100%;height:100%;background:#FFF;z-index:999998;}html,body{overflow:hidden;}.yp-spinner{width: 40px;height: 40px;position: fixed;text-align: center;z-index:999999;-webkit-animation: yp_rotate 2.0s infinite linear;animation: yp_rotate 2.0s infinite linear;top: 50%;left: 50%;margin-top: -20px;margin-left: -20px;}.yp-dot1, .yp-dot2{width: 60%;height: 60%;display: inline-block;position: absolute;top: 0;background-color: #F2D308;border-radius: 100%;-webkit-animation: yp_bounce 2.0s infinite ease-in-out;animation: yp_bounce 2.0s infinite ease-in-out;}.yp-dot2{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes yp_rotate{100%{-webkit-transform:rotate(360deg)}}@keyframes yp_rotate{100%{transform:rotate(360deg);-webkit-transform:rotate(360deg)}}@-webkit-keyframes yp_bounce{0%,100%{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes yp_bounce{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}</style>';
	
	// Location..
	echo '<script type="text/javascript">window.location = "'.add_query_arg(array('href' => urlencode(get_home_url('/'))),$yellow_pencil_uri).'";</script>';
	
	// Die
	exit;
	
}

add_action('admin_menu', 'yp_menu');



/* ---------------------------------------------------- */
/* Register Yellow Pencil 								*/
/* ---------------------------------------------------- */
function yp_yellow_penci_bar() {

	$yellow_pencil_uri = yp_uri();
	
    echo "<div class='yp-select-bar yp-disable-cancel'>
		<div class='yp-editor-top'>
		
			<a href='".esc_url($_GET['href'])."' class='wf-close-btn-link'><span class='dashicons dashicons-no-alt yp-close-btn'></span></a>

			<a class='yp-button yp-save-btn'>".__('Save','yp')."</a>
			
			<a data-toggle='tooltip' data-placement='bottom' title='".__('Select Body Tag','yp')."' class='yp-button-target active'></a>
			
			<a data-toggle='tooltip' data-placement='bottom' title='".__('Reset Options','yp')."' class='yp-button-reset'></a>
			
			<a title='".__('Desktop Mode','yp')."' data-mode='desktop' class='yp-button-large-device active responsive-selector'><i class='icon-desktop'></i></a>
			
			<a title='".__('Tablet Mode','yp')."' data-mode='tablet' class='yp-button-medium-device responsive-selector'><i class='icon-tablet'></i></a>
			
			<a title='".__('Mobile Mode','yp')."' data-mode='mobile' class='yp-button-small-device responsive-selector'><i class='icon-mobile'></i></a>
			
			<ul class='responsive-list'>
				<a title='".__('Desktop Mode','yp')."' class='yp-button-large-device active'><i class='icon-desktop'></i></a>
				<li><a title='".__('Tablet Mode','yp')."' class='yp-button-medium-device'><i class='icon-tablet'></i></a></li>
				<li><a title='".__('Mobile Mode','yp')."' class='yp-button-small-device'><i class='icon-mobile'></i></a></li>
			</ul>
			
			<div class='yp-clearfix'></div>
			
		</div>";
		
		// Set variables.
		$tag_id = null;
		$category_id = null;
		$last_post_id = null;
		$last_portfolio_id = null;
		$last_page_id = null;
		
		// Getting tags
		$tags = get_tags(array('orderby' => 'count', 'order' => 'DESC','number'=> 1 ));
		if(empty($tags) == false){
			$tag_id = $tags[0];
		}
		
		// Getting categories
		$categories = get_categories(array('orderby' => 'count', 'order' => 'DESC','number'=> 1 ));
		if(empty($categories) == false){
			$category_id = $categories[0];
		}
		
		// Set null to variables.
		$category_page = '';
		$is_type = '';
		$is_id = '';
		$all_singles = '';
		$all_pages = '';
		
		// Checking if its is a type
		if(isset($_GET['yp_type'])){
			$is_type = $_GET['yp_type'];
		}
		
		// Checking if its id.
		if(isset($_GET['yp_id'])){
			$is_id = $_GET['yp_id'];
		}
		
		// Getting current URL
		if(is_ssl()){
			$current_url = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		}else{
			$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		}
	
		// Category Page
		if($category_id != '' && $category_id != null){
			
			$url = add_query_arg(array('href' => urlencode(get_term_link($category_id))),$yellow_pencil_uri);
			
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			
			$category_page = '<li'.$active.'><a href="'.esc_url($url).'">Category Page</a></li>';
			
		}

		// tag Page
		if($tag_id != '' && $tag_id != null){
			
			$url = add_query_arg(array('href' => urlencode(get_term_link($tag_id))),$yellow_pencil_uri);
			
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			
			$tag_page = '<li'.$active.'><a href="'.esc_url($url).'">Tag Page</a></li>';
			
		}
		
		// Home Page
		$url = add_query_arg(array('href' => urlencode(esc_url(get_home_url().'/'))),$yellow_pencil_uri);
			
		$active = '';
		if($current_url == $url){
			$active = ' class="active" ';
		}
			
		$homepage = '<li'.$active.'><a href="'.esc_url($url).'">Home</a></li>';

		
		// Getting pages with custom templates.
		$args = array(
			'posts_per_page' => 8,
		    'post_type' => 'page',
		    'meta_query' => array(
		        array(
		            'key' => '_wp_page_template',
		            'value' => 'default',
					'compare' => '!='
				)
			)
		);

		$other_pages = get_posts($args);
		$c = 0;
		foreach($other_pages as $page){

			$c++;
			
			$url = add_query_arg(array('href' => urlencode(get_permalink($page->ID)), 'yp_id' => $page->ID),$yellow_pencil_uri);
			
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			
			$all_pages .= '<li'.$active.'><a href="'.esc_url($url).'">'.ucfirst($page->post_title).'</a></li>';
			
		}

		// First get pages with templates,
		// if there not more 8 page templates,
		// so show normal pages.
		if($c < 8){

			// Getting all pages.
			$args = array(
				'posts_per_page' => (8-$c),
			    'post_type' => 'page',
			    'meta_query' => array(
			        array(
			            'key' => '_wp_page_template',
			            'value' => 'default',
						'compare' => '='
					)
				)
			);

			$other_pages = get_posts($args);

			foreach($other_pages as $page){

				$url = add_query_arg(array('href' => urlencode(get_permalink($page->ID)), 'yp_id' => $page->ID),$yellow_pencil_uri);
				
				$active = '';
				if($current_url == $url){
					$active = ' class="active" ';
				}
				
				$all_pages .= '<li'.$active.'><a href="'.esc_url($url).'">'.ucfirst($page->post_title).'</a></li>';
				
			}

		}


		// Search Page.
		$url = add_query_arg(array('href' => urlencode(esc_url(get_home_url())).'/?s=and&yp_type=search'),$yellow_pencil_uri);
		$active = '';
		if($current_url == $url){
			$active = ' class="active" ';
		}
		$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">Search Pages</a></li>';

		// 404 Page.
		$url = add_query_arg(array('href' => urlencode(esc_url(get_home_url())).'/?p=987654321&yp_type=404'),$yellow_pencil_uri);
		$active = '';
		if($current_url == $url){
			$active = ' class="active" ';
		}
		$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">404 Pages</a></li>';

		// tag Page.
		if($tag_id != '' && $tag_id != null){
			$url = add_query_arg(array('href' => urlencode(esc_url(get_term_link($tag_id))).'/&yp_type=tag'),$yellow_pencil_uri);
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">Tag Pages</a></li>';
		}

		// Category Page.
		if($category_id != '' && $category_id != null){
			$url = add_query_arg(array('href' => urlencode(esc_url(get_term_link($category_id))).'/&yp_type=category'),$yellow_pencil_uri);
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">Category Pages</a></li>';
		}

		// Author Page.
		$url = add_query_arg(array('href' => urlencode(esc_url(get_author_posts_url("1"))).'&yp_type=author'),$yellow_pencil_uri);
		$active = '';
		if($current_url == $url){
			$active = ' class="active" ';
		}
		$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">Author Pages</a></li>';


		// Home Page.
		$frontpage_id = get_option('page_on_front');
		if($frontpage_id == 0 || $frontpage_id == null){
			$url = add_query_arg(array('href' => urlencode(esc_url(get_home_url().'/')).'&yp_type=home'),$yellow_pencil_uri);
			$active = '';
			if($current_url == $url){
				$active = ' class="active" ';
			}
			$all_pages .= '<li'.$active.'><a href="'.esc_url($url).'">Home Page</a></li>';
		}


		$post_types = get_post_types(array(
		   'public'   => true,
		   '_builtin' => false
		));

		foreach ($post_types as $post_type){

				if($post_type == 'page'){
					$last_post = wp_get_recent_posts(array("meta_key" => "_wp_page_template", "meta_value" => "default", "numberposts" => 1, "post_type" => $post_type));
				}else{
					$last_post = wp_get_recent_posts(array("numberposts" => 1, "post_type" => $post_type));
				}

				if(empty($last_post) == false){

					$last_post_id = $last_post['0']['ID'];

					$url = add_query_arg(array('href' => urlencode(get_permalink($last_post_id)), 'yp_type' => $post_type),$yellow_pencil_uri);

					$active = '';
					if($current_url == $url){
						$active = ' class="active" ';
					}

					$all_singles .= '<li'.$active.'><a href="'.esc_url($url).'">Single '.ucfirst($post_type).'s</a></li>';

				}

		}
		

		// Markup For Global Page Links etc.
		$other_pages = '<div class="yp-other-pages">
		<span data-toggle="popover" title="'.__("Customize Theme","yp").'" data-placement="left" data-content="'.__("Apply global style if you want customize any element that showing on every pages 'Header', 'Navigation', 'Footer' etc. Global styles will show on all pages.","yp").'">'.__('Apply Global Style to theme','yp').':</span>
		
		<ul>'.$category_page.''.$homepage.''.$tag_page.'</ul>';
		
		if($all_pages != '' && $all_pages != null){
		$other_pages .= '<span class="yp-other-other-pages" data-toggle="popover" title="'.__("Customize Pages","yp").'" data-placement="left" data-content="'.__("Use this links if you want customize only some pages. For example if you customize 'Abc' page, this changes will work only this page.","yp").'">'.__('Apply style to pages','yp').':</span>
		
		<ul>'.$all_pages.'</ul>'; }
		
		$other_pages .= '<span data-toggle="popover" title="'.__("Customize Similar Pages","yp").'" data-placement="left" data-content="'.__("Use this links if you want customize all Similar pages. For example if you customize any category page, this changes will only work on all category pages.","yp").'" class="yp-other-other-pages">'.__('Apply Style to all similar pages','yp').':</span>
		
		<ul>'.$all_singles.'</ul></div>';
		

		// Default.
		echo '<div class="yp-no-selected"><div class="yp-hand"></div><div class="yp-hand-after"></div>'.__('Click on any element that you want customize!','yp').' '.$other_pages.'</div>';
		

		// Options
		include( WT_PLUGIN_DIR . 'options.php' );
		
		
	echo "</div>";
	
}


/* ---------------------------------------------------- */
/* Getting CSS Codes									*/
/* ---------------------------------------------------- */
/*
	
	yp_get_css(false) : echo output CSS
	yp_get_css(true) : return just CSS Codes.

*/
function yp_get_css($r = false){
	
	global $post;
	
	$return = '<style id="yellow-pencil">';
	$onlyCSS = '';
	
	$get_type_option = '';
	$get_post_meta = '';
	
	global $wp_query;
	if(isset($wp_query->queried_object)){
		$id = @$wp_query->queried_object->ID;
	}else{
		$id = null;
	}
	
	$get_option = get_option("wt_css");
	if($id != null){
		$get_type_option = get_option("wt_".get_post_type($id)."_css");
		$get_post_meta = get_post_meta($id, 'wt_css', true);
	}
	
	if($get_option == 'false'){
		$get_option = false;
	}
	
	if($get_type_option == 'false'){
		$get_type_option = false;
	}
	
	if($get_post_meta == 'false'){
		$get_post_meta = false;
	}
	
	if(empty($get_option) == false){
		$return .= "\r\n\r\n/* CSS Created by 'Yellow Pencil' Plugin */ \r\n".$get_option;
		$onlyCSS .= $get_option;
	}
	
	if(empty($get_type_option) == false){
		$return .= $get_type_option;
		$onlyCSS .= $get_type_option;
	}
	
	if(empty($get_post_meta) == false){
		$return .= $get_post_meta;
		$onlyCSS .= $get_post_meta;
	}

	if(is_author()){
		$return .= get_option("wt_author_css");
		$onlyCSS .= get_option("wt_author_css");
	}elseif(is_tag()){
		$return .= get_option("wt_tag_css");
		$onlyCSS .= get_option("wt_tag_css");
	}elseif(is_category()){
		$return .= get_option("wt_category_css");
		$onlyCSS .= get_option("wt_category_css");
	}elseif(is_404()){
		$return .= get_option("wt_404_css");
		$onlyCSS .= get_option("wt_404_css");
	}elseif(is_search()){
		$return .= get_option("wt_search_css");
		$onlyCSS .= get_option("wt_search_css");
	}

	// home.
	if(is_front_page() && is_home()){
		$return .= get_option("wt_home_css");
		$onlyCSS .= get_option("wt_home_css");
	}
	
	$return .= '</style>';
	
	
	if($return != '<style></style>' && $r == false){
		echo stripslashes(yp_css_prefix(yp_animation_prefix(yp_hover_focus_match($return))));
	}
	
	if($r == true){
		return $onlyCSS;
	}
	
}

// Don't load if editor page.
if(isset($_GET['yellow_pencil_frame']) == false){
	add_action('wp_head','yp_get_css');
}



/* ---------------------------------------------------- */
/* Hover/Focus System									*/
/* ---------------------------------------------------- */
/*
	Replace 'body.yp-selector-hover' to hover.
	replace 'body.yp-selector-focus' to focus.
*/
function yp_hover_focus_match($data){

	preg_match_all('@body.yp-selector-(.*?){@si',$data,$keys);
	
	foreach($keys[1] as $key){
		$dir = 'body.yp-selector-'.$key;

		
		$dirt = 'body.yp-selector-'.$key.':'.substr($key, 0, 5);		
		
		$dirt = str_replace('body.yp-selector-hover','body',$dirt);
		$dirt = str_replace('body.yp-selector-focus','body',$dirt);
		$data = (str_replace($dir,$dirt,$data));
	}
	
	$data = str_replace('.yp-selected','',$data);
	
	return $data;
	
}



/* ---------------------------------------------------- */
/* Adding Prefix To Some CSS Rules						*/
/* ---------------------------------------------------- */
function yp_css_prefix($outputCSS){
	
	$outputCSS = preg_replace('@-webkit-(.*?):(.*?);@si',"",$outputCSS);

	// Adding automatic prefix to output CSS.
	$CSSPrefix = array(
		"border-radius",
		"border-top-left-radius",
		"border-top-right-radius",
		"border-bottom-left-radius",
		"border-bottom-right-radius",
		"animation-fill-mode",
		"animation-duration",
		"animation-name",
		"filter",
		"box-shadow",
		"box-sizing",
		"transform",
		"transition"
	);
		
	foreach($CSSPrefix as $prefix){
		$outputCSS = preg_replace('@'.$prefix.':(.*?);@si',"".$prefix.":$1;\r	-moz-".$prefix.":$1;\r	-webkit-".$prefix.":$1;",$outputCSS);
	}
	
	return $outputCSS;
	
}


/* ---------------------------------------------------- */
/* Prefix for Animations								*/
/* ---------------------------------------------------- */
function yp_animation_prefix($outputCSS){
	
	$outputCSS = str_replace(".yp_focus:focus",":focus",$outputCSS);
	$outputCSS = str_replace(".yp_focus:hover",":focus",$outputCSS);
		
	$outputCSS = str_replace(".yp_hover:hover",":hover",$outputCSS);
	$outputCSS = str_replace(".yp_hover:focus",":hover",$outputCSS);
		
	$outputCSS = str_replace(".yp_onscreen:hover",".yp_onscreen",$outputCSS);
	$outputCSS = str_replace(".yp_onscreen:focus",".yp_onscreen",$outputCSS);
		
	$outputCSS = str_replace(".yp_click:hover",".yp_click",$outputCSS);
	$outputCSS = str_replace(".yp_click:focus",".yp_click",$outputCSS);
	
	$outputCSS = str_replace(".yp_hover",":hover",$outputCSS);
	$outputCSS = str_replace(".yp_focus",":focus",$outputCSS);
	
	return $outputCSS;
	
}



/* ---------------------------------------------------- */
/* Showing CSS data	Backend								*/
/* ---------------------------------------------------- */
function yp_get_css_backend(){
	
	global $post;
	
	$get_type_option = '';
	$get_post_meta = '';
	
	global $wp_query;
	if(isset($wp_query->queried_object)){
		$id = @$wp_query->queried_object->ID;
	}else{
		$id = null;
	}
	
	$id_is = isset($_GET['yp_id']);
	$type_is = isset($_GET['yp_type']);
	
	$return = '<style>';
	
	$get_option = get_option("wt_css");
	if($id != null){
		$get_type_option = get_option("wt_".get_post_type($id)."_css");
		$get_post_meta = get_post_meta($id, 'wt_css', true);
	}
	
	if($get_option == 'false'){
		$get_option = false;
	}
	
	if($get_type_option == 'false'){
		$get_type_option = false;
	}
	
	if($get_post_meta == 'false'){
		$get_post_meta = false;
	}
	
	if(empty($get_option) == false){
		
		if($id_is == true){
			$return .= $get_option;
		}
		
	}
	
	if(empty($get_type_option) == false){
		
		if($type_is == false){
			$return .= $get_type_option;
		}
		
	}
	
	if(empty($get_post_meta) == false){
		
		if($id_is == false){
			$return .= $get_post_meta;
		}
		
	}

	if($type_is == false){

		if(is_author()){
			$return .= get_option("wt_author_css");
		}elseif(is_tag()){
			$return .= get_option("wt_tag_css");
		}elseif(is_category()){
			$return .= get_option("wt_category_css");
		}elseif(is_404()){
			$return .= get_option("wt_404_css");
		}elseif(is_search()){
			$return .= get_option("wt_search_css");
		}

		// home.
		if(is_front_page() && is_home()){
			$return .= get_option("wt_home_css");
		}

	}
	
	$return .= '</style>';
	
	
	if($return != '<style></style>'){
		echo stripslashes($return);
	}
	
}


if(isset($_GET['yellow_pencil_frame']) == true){
	add_action('wp_head','yp_get_css_backend');
}




/* ---------------------------------------------------- */
/* Backend CSS Codes									*/
/* ---------------------------------------------------- */
function yp_editor_styles(){
		
	global $post;
	
	$get_type_option = '';
	$get_post_meta = '';
	
	global $wp_query;
	if(isset($wp_query->queried_object)){
		$id = @$wp_query->queried_object->ID;
	}else{
		$id = null;
	}
	
	$id_is = isset($_GET['yp_id']);
	$type_is = isset($_GET['yp_type']);
	
	$return = '<div class="yp-styles-area">';
	
	$get_option = get_option("wt_styles");
	if($id != null){
		$get_type_option = get_option("wt_".get_post_type($id)."_styles");
		$get_post_meta = get_post_meta($id, 'wt_styles', true);
	}
	
	if(empty($get_option) == false){
		
		if($id_is == false && $type_is == false){
			$return .= $get_option;
		}
		
	}
	
	if(empty($get_type_option) == false){
		
		if($type_is == true){
			$return .= $get_type_option;
		}
		
	}
	
	if(empty($get_post_meta) == false){
		
		if($id_is == true){
			$return .= $get_post_meta;
		}
		
	}

	if($type_is == true){

		$type = $_GET['yp_type'];

		if($type == 'author'){
			$return .= get_option("wt_author_styles");
		}

		if($type == 'tag'){
			$return .= get_option("wt_tag_styles");
		}

		if($type == 'category'){
			$return .= get_option("wt_category_styles");
		}

		if($type == '404'){
			$return .= get_option("wt_404_styles");
		}

		if($type == 'search'){
			$return .= get_option("wt_search_styles");
		}

		if($type == 'home'){
			$return .= get_option("wt_home_styles");
		}


	}

	$return .= '</div>';

	if($return != '<div class="yp-styles-area"></div>'){
		echo stripslashes($return);
	}
	
}

// Load just if editor page.
if(isset($_GET['yellow_pencil_frame']) == true){
	add_action('wp_footer','yp_editor_styles');
}



/* ---------------------------------------------------- */
/* Include options Library								*/
/* ---------------------------------------------------- */
include_once( WT_PLUGIN_DIR . 'base.php' );




/*-------------------------------------------------------*/
/*	Ajax Save											 */
/*-------------------------------------------------------*/
function yp_ajax_save(){
	
	if(current_user_can("edit_theme_options") == true){

		$css = wp_strip_all_tags($_POST['yp_data']);
		
		$styles = $_POST['yp_editor_data'];
		
		$id = '';
		
		$type = '';
		
		if(isset($_POST['yp_id'])){
			$id = $_POST['yp_id'];
		}
		
		if(isset($_POST['yp_stype'])){
			$type = $_POST['yp_stype'];
			if(count(explode("#",$type)) == 2){
				$type = explode("#",$type);
				$type = $type[0];
			}
		}
		
		if($id == 'undefined'){$id = '';}
		if($type == 'undefined'){$type = '';}
		if($css == 'undefined'){$css = '';}
		
		if($id == '' && $type == ''){
			
			// CSS Data
			if(empty($css) == false){
				if(!update_option ('wt_css', $css)){
					add_option('wt_css',$css);
				}
			}else{
				delete_option('wt_css');
			}
			
			// Styles
			if(empty($css) == false){
				if(!update_option ('wt_styles', $styles)){
					add_option('wt_styles',$styles);
				}
			}else{
				delete_option('wt_styles');
			}
			
		}elseif($type == ''){
		
			// CSS Data
			if(empty($css) == false){
				if(!update_post_meta ($id, 'wt_css', $css)){
					add_post_meta($id,'wt_css',$css, true);
				}
			}else{
				delete_post_meta($id,'wt_css');
			}
			
			// Styles
			if(empty($css) == false){
				if(!update_post_meta ($id, 'wt_styles', $styles)){
					add_post_meta($id,'wt_styles',$styles, true);
				}
			}else{
				delete_post_meta($id,'wt_styles');
			}
			
		}else{

			// CSS Data
			if(empty($css) == false){
				if(!update_option ('wt_'.$type.'_css', $css)){
					add_option('wt_'.$type.'_css',$css);
				}
			}else{
				delete_option('wt_'.$type.'_css');
			}
			
			// Styles
			if(empty($css) == false){
				if(!update_option ('wt_'.$type.'_styles', $styles)){
					add_option('wt_'.$type.'_styles',$styles);
				}
			}else{
				delete_option('wt_'.$type.'_styles');
			}
			
		}
	
	}
	
	die();
	
}

add_action( 'wp_ajax_yp_ajax_save', 'yp_ajax_save' );



/* ---------------------------------------------------- */
/* Getting arrow icon markup							*/
/* ---------------------------------------------------- */
function yp_arrow_icon(){
	return "<span class='dashicons yp-arrow-icon dashicons-arrow-up'></span><span class='dashicons yp-arrow-icon dashicons-arrow-down'></span>";
}


/* ---------------------------------------------------- */
/* Getting theme name or page name						*/
/* ---------------------------------------------------- */
function yp_customizer_name(){
	
	if(isset($_GET['yp_id']) == true){
		
		// The id.
		$id = $_GET['yp_id'];
		
		$title = get_the_title($id);
		$slug = ucfirst(get_post_type($id));
		
		if(strlen($title) > 14){
			return '"'.substr($title,0,14).'..'.'" '.$slug.'';
		}else{
			return '"'.$title.'" '.$slug.'';
		}
		
	}elseif(isset($_GET['yp_type']) == true){
		
		// The id.
		$type = ucfirst($_GET['yp_type']);
		
		if($type == 'Page'){
			$title = 'All '.$type.'s';
		}else{
			$title = 'All Single '.$type.'s';
		}
		
		return $title;
		
	}else{
		
		$yp_theme = wp_get_theme();

		// Replace 'theme' word from theme name.
		$name = str_replace(' theme', '', $yp_theme->get('Name'));
		$name = str_replace(' Theme', '', $name);
		$name = str_replace('theme', '', $name);
		$name = str_replace('Theme', '', $name);

		// Keep it short.
		if(strlen($name) > 14){
			return '"'.substr($name,0,14).'.." Theme';
		}else{
			return '"'.$name.'" Theme';
		}
		
	}
	
}



/* ---------------------------------------------------- */
/* Adding style for wp-admin-bar						*/
/* ---------------------------------------------------- */
function yp_yellow_pencil_style() {
  echo '<style>#wp-admin-bar-yellow-pencil > .ab-item:before{content: "\f309";top:2px;}#wp-admin-bar-yp-update .ab-item:before{content: "\f316";top:3px;}</style>';
}



/* ---------------------------------------------------- */
/* Adding link to wp-admin-bar							*/
/* ---------------------------------------------------- */
function yp_yellow_pencil_edit_admin_bar( $wp_admin_bar ){
	
	$id = null;
	global $wp_query;
	$yellow_pencil_uri = yp_uri();
	
	if(isset($_GET['page_id'])){
		$id = $_GET['page_id'];
	}elseif(isset($_GET['post']) && is_admin() == true){
		$id = $_GET['post'];
	}elseif(isset($wp_query->queried_object) == true){
		$id = @$wp_query->queried_object->ID;
	}
	
	$args = array(
		'id'    => 'yellow-pencil',
		'title' => 'Edit In Yellow Pencil',
		'href'  => '',
		'meta'  => array( 'class' => 'yellow-pencil' )
	);
	$wp_admin_bar->add_node( $args );

	$args = array();

	// Edit theme
	array_push($args,array(
		'id'		=>	'yp-edit-theme',
		'title'		=>	'Edit Theme',
		'href'		=>	add_query_arg(array('href' => urlencode(get_home_url('/'))),$yellow_pencil_uri),
		'parent'	=>	'yellow-pencil',
	));

	// Since 4.5.2
	// category,author,tag, 404 and archive page support.
	$status = get_post_type($id);
	$key = get_post_type($id);
	$go_link = get_permalink($id);

	if(is_author()){
		$status = 'Author Page';
		$key = 'author';
		$id = $wp_query->query_vars['author'];
		$go_link = get_author_posts_url($id);
	}elseif(is_tag()){
		$status = 'Tag Page';
		$key = 'tag';
		$id = $wp_query->query_vars['tag_id'];
		$go_link = get_tag_link($id);
	}elseif(is_category()){
		$status = 'Category Page';
		$key = 'category';
		$id = $wp_query->query_vars['cat'];
		$go_link = get_category_link($id);
	}elseif(is_404()){
		$status = '404 Page';
		$key = '404';
		$go_link = esc_url(get_home_url().'/?p=987654321');
	}elseif(is_archive()){
		$status = 'Archive Page';
		$key = 'archive';
	}elseif(is_search()){
		$status = 'Search Page';
		$key = 'search';
		$go_link = esc_url(get_home_url().'/?s=and');
	}

	// Blog
	if(is_front_page() && is_home()){
		$status = 'Home Page';
		$key = 'home';
		$go_link = esc_url(get_home_url().'/');
	}elseif ( is_front_page() == false && is_home() == true ) {
		$status = 'Page';
	}

	// fix a small bug.
	if($id == 0){
		$id = null;
	}


	// Edit All similar
	if($key != 'home' && $key != 'archive'){

		if($key != '404' && $key != 'search'){
			$s = '\'s';
			$all = 'All ';
		}else{
			$s = '';
			$all = '';
		}

		array_push($args,array(
			'id'     	=> 'yp-edit-all',
			'title'		=>	'Edit All '.ucfirst($status).'\'s',
			'href'		=>	add_query_arg(array('href' => urlencode($go_link), 'yp_type' => $key),$yellow_pencil_uri),
			'parent' 	=> 'yellow-pencil',
			'meta'   	=> array( 'class' => 'first-toolbar-group' ),
		));

	}
	
	// Edit it.
	if($key != 'search' && $key != 'archive' && $key != 'tag' && $key != 'category' && $key != 'author' && $key != '404'){
		
		if($key == 'home'){

			array_push($args,array(
				'id'		=>	'yp-edit-it',
				'title'		=>	'Edit Only '.ucfirst($status).'',
				'href'		=>	add_query_arg(array('href' => urlencode($go_link), 'yp_type' =>  $key),$yellow_pencil_uri),
				'parent'	=>	'yellow-pencil',
			));
		}else{
			
			array_push($args,array(
				'id'		=>	'yp-edit-it',
				'title'		=>	'Edit This '.ucfirst($status).'',
				'href'		=>	add_query_arg(array('href' => urlencode($go_link), 'yp_id' =>  $id),$yellow_pencil_uri),
				'parent'	=>	'yellow-pencil',
			));

		}

		
	}
		
	// Add to wpadminbar
	for($a=0;$a<sizeOf($args);$a++){
		$wp_admin_bar->add_node($args[$a]);
	}
	

}


/* ---------------------------------------------------- */
/* Adding body class									*/
/* ---------------------------------------------------- */
function yp_body_class($classes) {
	
	$classes[] = 'yp-yellow-pencil wt-yellow-pencil';

	if(current_user_can("edit_theme_options") == false){
		if(defined("WT_DEMO_MODE")){
			$classes[] = 'yp-yellow-pencil-demo-mode';
		}
	}
	
	if(defined("WT_DISABLE_LINKS")){
		$classes[] = 'yp-yellow-pencil-disable-links';
	}

	if(!defined('WTFV')){
		$classes[] = 'wtfv';
	}

	return $classes;
	
}


/* ---------------------------------------------------- */
/* Install the plugin									*/
/* ---------------------------------------------------- */
function yp_init(){
	
	// See Developer Documentation for more info.
	if(defined("WT_DEMO_MODE")){
		include( WT_PLUGIN_DIR . 'demo_mode.php' );
	}
	
	// Iframe Settings.
	// Disable admin bar in iframe
	// Add Classes to iframe body.
	// Add Styles for iframe.
	if(yp_check_let_frame()){
		show_admin_bar(false);
		add_filter('body_class', 'yp_body_class');
		add_action( 'wp_enqueue_scripts', 'yp_styles_frame' );
	}
	
	// If yellow pencil is active and theme support;
	// Adding Link to #wpadminbar.
	if(yp_check_let()){

		// If not admin page, Add Customizer link.
		if(is_admin() === false){
			add_action( 'admin_bar_menu', 'yp_yellow_pencil_edit_admin_bar', 999 );

			// Adding CSS helper for admin bar link.
			add_action('wp_head', 'yp_yellow_pencil_style');

		}

	}
	
	// Getting Current font families.
	if(is_admin() === false){
		add_action('wp_enqueue_scripts','yp_get_font_families');
	}

}

add_action("init","yp_init");



/* ---------------------------------------------------- */
/* Uploader Style 										*/
/* ---------------------------------------------------- */
function yp_uploader_style(){

	echo '<style>
		tr.url,tr.post_content,tr.post_excerpt,tr.field,tr.label,tr.align,tr.image-size,tr.post_title,tr.image_alt,.del-link,#tab-type_url{display:none !important;}
		.media-item-info > tr > td > p:last-child,.savebutton,.ml-submit{display:none !important;}
		#filter{display:none !important;}
		.media-item .describe input[type="text"], .media-item .describe textarea{width:334px;}
		#sidemenu a{
			border-width:0px !important;
			color:#FFF !important;
			background:#289D5E !important;
			position:relative;
			top:-1px;
		}
		#sidemenu a.current{
			background:#27AE60 !important;
		}
		div#media-upload-header{
			background:#2C3E50 !important;
			border-width:0px !important;
		}

		div#media-upload-header{
			padding-top:10px !important;
		}
	</style>';

}

if(isset($_GET['yp_uploader'])){
	if($_GET['yp_uploader'] == 1){
		add_action('admin_head','yp_uploader_style');
	}
}



/* ---------------------------------------------------- */
/* CSS library for Yellow Pencil						*/
/* ---------------------------------------------------- */
function yp_register_styles() {

	// Animate library.
	if(strstr(yp_get_css(true),"animation-name:")){
		wp_enqueue_style('yellow-pencil-animate', plugins_url( 'library/css/animate.css' , __FILE__ ));
	}
	
}



/* ---------------------------------------------------- */
/* Jquery plugins for CSS Engine						*/
/* ---------------------------------------------------- */
function yp_register_scripts() {
	
	$outputCSS = yp_get_css(true);
	$needCSSEngine = false;
	
	// Yellow Pencil Library Helper.
	if(strstr($outputCSS,"animation-name:") == true || isset($_GET['yellow_pencil_frame']) == true){
		wp_enqueue_script('yellow-pencil-library', plugins_url( 'library/js/yellow-pencil-library.js' , __FILE__ ), 'jquery', '1.0', TRUE);
		$needCSSEngine = true;
	}
	
	// Background Parallax
	if(strstr($outputCSS,"background-parallax:") == true || isset($_GET['yellow_pencil_frame']) == true){
		wp_enqueue_script('yellow-pencil-background-parallax', plugins_url( 'library/js/parallax.js' , __FILE__ ), 'jquery', '1.0', TRUE);
		$needCSSEngine = true;
	}
	
	// CSS Engine for special CSS rules.
	// example: my-css-rule:data("value");
	if($needCSSEngine == true){
		wp_enqueue_script('yellow-pencil-css-engine', plugins_url( 'library/js/css-engine.js' , __FILE__ ), 'jquery', '1.0', TRUE);
	}
	
	// Jquery
	if($needCSSEngine == true){
		wp_enqueue_script( 'jquery' );
	}
	
}
add_action( 'wp_enqueue_scripts', 'yp_register_styles' );
add_action( 'wp_enqueue_scripts', 'yp_register_scripts' );


/* ---------------------------------------------------- */
/* Scripts area for YP									*/
/* ---------------------------------------------------- */
function yp_scripts_areas() {
    
	if(isset($_GET['yellow_pencil_frame']) == true){
		
		// script area enough for yellow pencil.
		for ($i = 1; $i <= 100; $i++) {
			echo "<script class='yellow-pencil-scripts'></script>\r";
		}
		
	}

}
add_action( 'wp_footer', 'yp_scripts_areas', 9999999);



/* ---------------------------------------------------- */
/* Iframe Admin Page									*/
/* ---------------------------------------------------- */
/* Since V4.3.6 */
function yp_yellow_pencil_editor() {

    $hook = add_submenu_page(null, 'Yellow Pencil Editor', 'Yellow Pencil Editor', 'edit_theme_options', 'yellow-pencil-editor', function() {});
    add_action('load-' . $hook, function(){

    	yp_frame_output();
    
    });
}

add_action('admin_menu', 'yp_yellow_pencil_editor');


/* ---------------------------------------------------- */
/* Iframe Source 										*/
/* ---------------------------------------------------- */
function yp_frame_output(){

$protocol = is_ssl() ? 'https' : 'http';

$protocol = $protocol.'://';

?><!DOCTYPE html><html lang="en-US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
	<title>Yellow Pencil</title>
	<link rel='stylesheet' href='<?php echo esc_url(includes_url( 'css/dashicons.min.css' , __FILE__ )); ?>' type='text/css' />
	<link rel='stylesheet' href='<?php echo $protocol; ?>fonts.googleapis.com/css?family=Open+Sans:400,300,600&subset=latin,latin-ext' type='text/css' />
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/contextmenu.css' , __FILE__ )); ?>' type='text/css' />
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/nouislider.css' , __FILE__ )); ?>' type='text/css' />
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/select2.css' , __FILE__ )); ?>' type='text/css' />
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/minicolors.css' , __FILE__ )); ?>' type='text/css' />
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/bootstrap-tooltip.css' , __FILE__ )); ?>' type='text/css' />	
	<link rel='stylesheet' href='<?php echo esc_url(plugins_url( 'css/yellow-pencil.css' , __FILE__ )); ?>' type='text/css' />	
	<script src='<?php echo esc_url(includes_url( 'js/jquery/jquery.js' , __FILE__ )); ?>'></script>
	<script type="text/javascript">
	var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
	var saving = "<?php _e('Saving','yp'); ?>";
	var save = "<?php _e('Save','yp'); ?>";
	var saved = "<?php _e('Saved','yp'); ?>";
	var demo_alert = "<?php _e('Not Saved because this is only demo!','yp'); ?>";
	
	var l18_logo = "<?php _e('Logo','yp'); ?>";
	var l18_google_map = "<?php _e('Google Map','yp'); ?>";
	var l18_entry_title_link = "<?php _e('Entry Title Link','yp'); ?>";
	var l18_category_link = "<?php _e('Category Link','yp'); ?>";
	var l18_tag_link = "<?php _e('Tag Link','yp'); ?>";
	var l18_widget = "<?php _e('Widget','yp'); ?>";
	var l18_font_awesome_icon = "<?php _e('Font Awesome Icon','yp'); ?>";
	var l18_submit_button = "<?php _e('Submit Button','yp'); ?>";
	var l18_menu_item = "<?php _e('Menu Item','yp'); ?>";
	var l18_post_meta_division = "<?php _e('Post Meta Division','yp'); ?>";
	var l18_comment_reply_title = "<?php _e('Comment Reply Title','yp'); ?>";
	var l18_login_info = "<?php _e('Login Info','yp'); ?>";
	var l18_allowed_tags = "<?php _e('Allowed Tags','yp'); ?>";
	var l18_post_title = "<?php _e('Post Title','yp'); ?>";
	var l18_comment_form = "<?php _e('Comment Form','yp'); ?>";
	var l18_widget_title = "<?php _e('Widget title','yp'); ?>";
	var l18_tag_cloud = "<?php _e('Tag Cloud','yp'); ?>";
	var l18_row = "<?php _e('Row','yp'); ?>";
	var l18_button = "<?php _e('Button','yp'); ?>";
	var l18_lead = "<?php _e('Lead','yp'); ?>";
	var l18_well = "<?php _e('Well','yp'); ?>";
	var l18_accordion_toggle = "<?php _e('Accordion Toggle','yp'); ?>";
	var l18_accordion_content = "<?php _e('Accordion Content','yp'); ?>";
	var l18_alert_division = "<?php _e('Alert Division','yp'); ?>";
	var l18_footer_content = "<?php _e('Footer Content','yp'); ?>";
	var l18_global_section = "<?php _e('Global Section','yp'); ?>";
	var l18_show_more_link = "<?php _e('Show More Link','yp'); ?>";
	var l18_wrapper = "<?php _e('Wrapper','yp'); ?>";
	var l18_article_title = "<?php _e('Article title','yp'); ?>";
	var l18_column = "<?php _e('Column','yp'); ?>";
	var l18_post_division = "<?php _e('Post Division','yp'); ?>";
	var l18_content_division = "<?php _e('Content Division','yp'); ?>";
	var l18_entry_title = "<?php _e('Entry Title','yp'); ?>";
	var l18_entry_content = "<?php _e('Entry Content','yp'); ?>";
	var l18_entry_footer = "<?php _e('Entry Footer','yp'); ?>";
	var l18_entry_header = "<?php _e('Entry Header','yp'); ?>";
	var l18_enter_time = "<?php _e('Entry Time','yp'); ?>";
	var l18_post_edit_link = "<?php _e('Post Edit Link','yp'); ?>";
	var l18_post_thumbnail = "<?php _e('Post Thumbnail','yp'); ?>";
	var l18_thumbnail = "<?php _e('Thumbnail','yp'); ?>";
	var l18_thumbnail_image = "<?php _e('Thumbnail Image','yp'); ?>";
	var l18_edit_link = "<?php _e('Edit Link','yp'); ?>";
	var l18_comments_link_division = "<?php _e('Comments Link Division','yp'); ?>";
	var l18_site_description = "<?php _e('Site Description','yp'); ?>";
	var l18_post_break = "<?php _e('Post Break','yp'); ?>";
	var l18_paragraph = "<?php _e('Paragraph','yp'); ?>";
	var l18_line_break = "<?php _e('Line Break','yp'); ?>";
	var l18_horizontal_rule = "<?php _e('Horizontal Rule','yp'); ?>";
	var l18_link = "<?php _e('Link','yp'); ?>";
	var l18_list_item = "<?php _e('List Item','yp'); ?>";
	var l18_unorganized_list = "<?php _e('Unorganized List','yp'); ?>";
	var l18_image = "<?php _e('Image','yp'); ?>"; 
	var l18_bold_tag = "<?php _e('Bold Tag','yp'); ?>";
	var l18_italic_tag = "<?php _e('Italic Tag','yp'); ?>";
	var l18_strong_tag = "<?php _e('Strong Tag','yp'); ?>";
	var l18_blockquote = "<?php _e('Block Quote','yp'); ?>";
	var l18_preformatted = "<?php _e('Preformatted','yp'); ?>";
	var l18_table = "<?php _e('Table','yp'); ?>";
	var l18_table_row = "<?php _e('Table Row','yp'); ?>";
	var l18_table_data = "<?php _e('Table Data','yp'); ?>";
	var l18_header_division = "<?php _e('Header Division','yp'); ?>";
	var l18_footer_division = "<?php _e('Footer Division','yp'); ?>";
	var l18_section = "<?php _e('Section','yp'); ?>";
	var l18_form_division = "<?php _e('Form Division','yp'); ?>";
	var l18_centred_block = "<?php _e('Centred block','yp'); ?>";
	var l18_definition_list = "<?php _e('Definition list','yp'); ?>";
	var l18_definition_term = "<?php _e('Definition term','yp'); ?>";
	var l18_definition_description = "<?php _e('Definition description','yp'); ?>";
	var l18_header = "<?php _e('Header','yp'); ?>";
	var l18_level = "<?php _e('Level','yp'); ?>";
	var l18_smaller_text = "<?php _e('Smaller text','yp'); ?>";
	var l18_text_area = "<?php _e('Text Area','yp'); ?>";
	var l18_body_of_table = "<?php _e('Body Of Table','yp'); ?>";
	var l18_head_of_table = "<?php _e('Head Of Table','yp'); ?>";
	var l18_foot_of_table = "<?php _e('Foot of table','yp'); ?>";
	var l18_underline_text = "<?php _e('Underline text','yp'); ?>";
	var l18_span = "<?php _e('Span','yp'); ?>";
	var l18_quotation = "<?php _e('Quotation','yp'); ?>";
	var l18_citation = "<?php _e('Citation','yp'); ?>";
	var l18_expract_of_code = "<?php _e('Extract of code','yp'); ?>";
	var l18_navigation = "<?php _e('Navigation','yp'); ?>";
	var l18_label = "<?php _e('Label','yp'); ?>";
	var l18_time = "<?php _e('Time','yp'); ?>";
	var l18_division = "<?php _e('Division','yp'); ?>";
	var l18_caption_of_table = "<?php _e('Caption Of table','yp'); ?>";
	var l18_input = "<?php _e('Input','yp'); ?>";
	var l18_sure = "<?php _e('Are you sure you want to leave page without saving?','yp'); ?>";
	var l18_reset = "<?php _e('You want reset current options?','yp'); ?>";

	var l18_none = "Default value for this rule";
	var l18_disable = "Remove rule from output";
	var l18_picker = "Active picker and move cursor to on any element";
	</script>
</head>
<?php

	$classes[] = 'yp-yellow-pencil wt-yellow-pencil yp-metric-disable';

	if(current_user_can("edit_theme_options") == false){
		if(defined("WT_DEMO_MODE")){
			$classes[] = 'yp-yellow-pencil-demo-mode';
		}
	}
	
	if(defined("WT_DISABLE_LINKS")){
		$classes[] = 'yp-yellow-pencil-disable-links';
	}

	if(!defined('WTFV')){
		$classes[] = 'wtfv';
	}

	$classesReturn = '';

	foreach ($classes as $class){
		$classesReturn .= ' '.$class;
	}

	$classesReturn = trim($classesReturn);

?>
<body class="<?php echo $classesReturn; ?>">

	<?php

		if(isset($_GET['yp_type'])){

			$type = $_GET['yp_type'];
			$frame = add_query_arg(array('yellow_pencil_frame' => 'true','yp_type' => $type),esc_url(urldecode($_GET['href'])));
		
		}elseif(isset($_GET['yp_id'])){

			$id = $_GET['yp_id'];
			$frame = add_query_arg(array('yellow_pencil_frame' => 'true','yp_id' => $id),esc_url(urldecode($_GET['href'])));
		
		}else{

			$frame = add_query_arg(array('yellow_pencil_frame' => 'true'),esc_url(urldecode($_GET['href'])));
		
		}

	?>
	
	<iframe id="iframe" class="yellow_pencil_iframe" src="<?php echo $frame; ?>"></iframe>

	<?php yp_yellow_penci_bar(); ?>
	
	<div class="top-area-btn-group">
		<div data-delay='{"show":"150"}' data-toggle='tooltip' data-placement='right' title='<?php _e('CSS Editor','yp'); ?>' class="top-area-btn css-editor-btn"><span class="dashicons dashicons-edit"></span></div>

		<div data-delay='{"show":"150"}' data-toggle='tooltip' data-placement='right' title='<?php _e('Undo','yp'); ?>' class="top-area-btn top-area-center undo-btn"><span class="dashicons dashicons-undo"></span></div>
		<div data-delay='{"show":"150"}' data-toggle='tooltip' data-placement='right' title='<?php _e('Redo','yp'); ?>' class="top-area-btn redo-btn"><span class="dashicons dashicons-redo"></span></div>

		<div data-delay='{"show":"150"}' data-toggle='tooltip' data-placement='right' title='<?php _e('Fullscreen','yp'); ?>' class="top-area-btn fullscreen-btn"><span class="dashicons dashicons-editor-expand"></span></div>
	</div>

	<img class="metric" src="<?php echo esc_url(plugins_url( 'images/metric.png' , __FILE__ )); ?>" />

	<div id="image_uploader">
		<iframe src="<?php echo admin_url('media-upload.php?type=image&TB_iframe=true&reauth=1&yp_uploader=1'); ?>"></iframe>
	</div>
	<div id="image_uploader_background"></div>

	<div id="leftAreaEditor">
	<div id="cssData"></div>
	<div id="cssEditorBar"><span data-toggle='tooltip' data-placement='bottom' title='<?php _e('Hide CSS Editor','yp'); ?>' class="dashicons yp-css-close-btn dashicons-no-alt "></span></div>
	</div>

	<div class="yp-popup-background"></div>
	<div class="yp-info-modal">
		<h2>Not saved. Get Premium Version!</h2>
		<p>You are using some premium version features. Disable premium features or upgrade to full version for save changes.</p>

		<ul>
			<li>600+ Font Families</li>
			<li>50+ CSS Animations</li>
			<li>300+  Patterns</li>
			<li>7 Amazing Filters</li>
			<li>Color Pallets</li>
			<li>Unlock All Features</li>
			<li>Lifetime License & Free Updates</li>
		</ul>

		<div class="yp-action-area">
			<a class="yp-info-modal-close">Maybe Later</a>
			<a target="_blank" href="http://waspthemes.com/yellow-pencil/buy">Get Premium 23$</a>
		</div>
	</div>
	
	<div class="yp_debug"></div>
	
	<script src='<?php echo esc_url(plugins_url( 'js/contextmenu.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'js/nouislider.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'js/select2.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'js/minicolors.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(includes_url( 'js/jquery/ui/core.min.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(includes_url( 'js/jquery/ui/widget.min.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(includes_url( 'js/jquery/ui/mouse.min.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(includes_url( 'js/jquery/ui/draggable.min.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'js/bootstrap-tooltip.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'library/js/css-engine.js' , __FILE__ )); ?>'></script>
	<script type='text/javascript' src='<?php echo esc_url(plugins_url( 'library/ace/ace.js' , __FILE__ )); ?>'></script>
	<script src='<?php echo esc_url(plugins_url( 'js/yellow-pencil.js' , __FILE__ )); ?>'></script>
	</body>
	</html><?php exit;

}



/* ---------------------------------------------------- */
/* Adding link to plugins page 							*/
/* ---------------------------------------------------- */
if(!defined('WTFV')){

	add_filter('plugin_row_meta', 'yp_plugin_links', 10, 2);

	function yp_plugin_links($links, $file){

		if ( $file == plugin_basename(dirname(__FILE__).'/yellow-pencil.php') ) {
			$links[] = '<a href="http://waspthemes.com/yellow-pencil/buy">' . __('Get Premium', 'yp') . '</a>';
		}

		return $links;

	}

}


/* ---------------------------------------------------- */
/* Adding YP Source Page 	 							*/
/* ---------------------------------------------------- */
add_action('admin_menu', 'register_yp_source_page');

function register_yp_source_page() {
	add_submenu_page( 'options-general.php', 'Yellow Pencil Source', 'Yellow Pencil Source', 'edit_theme_options', 'yp-options', 'yp_options' );
}


/* ---------------------------------------------------- */
/* YP Source Page 	 									*/
/* ---------------------------------------------------- */
function yp_options() {

	// Can?
	if(current_user_can("edit_theme_options") == true){

		// Reset global data.
		if(isset($_GET['yp_reset_global'])){
			delete_option('wt_css');
			delete_option('wt_styles');
		}

		// Reset Post type.
		if(isset($_GET['yp_reset_type'])){
			delete_option('wt_'.$_GET['yp_reset_type'].'_css');
			delete_option('wt_'.$_GET['yp_reset_type'].'_styles');
		}

		// Reset by id.
		if(isset($_GET['yp_reset_id'])){
			delete_post_meta($_GET['yp_reset_id'],'wt_css');
			delete_post_meta($_GET['yp_reset_id'],'wt_styles');
		}

		// Updated.
		if(isset($_GET['yp_reset_global']) || isset($_GET['yp_reset_id']) || isset($_GET['yp_reset_type'])){
			echo "<script type='text/javascript'>window.location = '".admin_url('options-general.php?page=yp-options&yp_updated=true')."';</script>";
		}

	}

	// Updated message.
	if(isset($_GET['yp_updated'])){
		?>
			<div id="message" class="updated">
		        <p><strong><?php _e('Settings saved.') ?></strong></p>
		    </div>
		<?php
	}

	?>

	<div class="wrap">
	 
		<h2>Yellow Pencil CSS Source</h2>

		<p><?php _e('You will see all customized pages here. You can easily delete the style from this page or you can customize.','yp'); ?></p>

		<div class="yp-code-group">

		<ul>

			<?php $count = 0; if(get_option("wt_css") != ''){ $count = 1; ?>
				<li>
						<span class="yp-title"><?php _e('Global Theme Styles','yp'); ?></span>
						<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_global=true'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>

						<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(get_home_url("/")).''); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>

						<span class="yp-clearfix"></span>
					</li>
			<?php } ?>

			<?php

				$post_types = get_post_types();
				foreach ($post_types as $post_type){

					if(get_option("wt_".$post_type."_css") != ''){

					$count = 1;

					$last_post = wp_get_recent_posts(array("numberposts" => 1, "post_type" => $post_type));
					if(empty($last_post) == false){
						$last_post_id = $last_post['0']['ID'];
					}
				?>
					<li>
						<span class="yp-title">All Single <?php echo ucfirst($post_type); ?>s Styles</span>
						<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type='.$post_type.''); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>

						<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(get_the_permalink($last_post_id)).'&yp_type='.$post_type.''); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>

						<span class="yp-clearfix"></span>
					</li>

				<?php
					}

				}
			?>

			<?php if(get_option("wt_home_css") != ''){

			$frontpage_id = get_option('page_on_front');
			if($frontpage_id == 0 || $frontpage_id == null){ ?>
			<li>
				<span class="yp-title">Home Page</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=home'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_home_url().'/')).'&yp_type=home'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } } ?>

			<?php if(get_option("wt_search_css") != ''){ ?>
			<li>
				<span class="yp-title">Search Pages</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=search'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_home_url().'/?s=and')).'&yp_type=search'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } ?>

			<?php if(get_option("wt_404_css") != ''){ ?>
			<li>
				<span class="yp-title">404 Page</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=404'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_home_url().'/?p=987654321')).'&yp_type=404'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } ?>

			<?php if(get_option("wt_tag_css") != ''){ ?>
			<?php

			$tag_id = '';
			$tags = get_tags(array('orderby' => 'count', 'order' => 'DESC','number'=> 1 ));
			if(empty($tags) == false){
				$tag_id = $tags[0];
			}

			?>
			<li>
				<span class="yp-title">Tag Pages</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=tag'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_tag_link($tag_id))).'&yp_type=tag'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } ?>

			<?php if(get_option("wt_category_css") != ''){ ?>
			<?php

			$cat_id = '';
			$cats = get_categories(array('orderby' => 'count', 'order' => 'DESC','number'=> 1 ));
			if(empty($cats) == false){
				$cat_id = $cats[0];
			}

			?>
			<li>
				<span class="yp-title">Category Pages</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=category'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_category_link($cat_id))).'&yp_type=category'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } ?>

			<?php if(get_option("wt_author_css") != ''){ ?>
			<li>
				<span class="yp-title">Author Pages</span>
				<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_type=author'); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>
				<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(esc_url(get_author_posts_url(1))).'&yp_type=author'); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>
				<span class="yp-clearfix"></span>
			</li>
			<?php } ?>

			<?php
				query_posts( array(
					'posts_per_page' => -1,
					'meta_key' => 'wt_css'
				));

				while ( have_posts() ) : the_post();

				$id = get_the_id();

				if(get_post_meta($id, 'wt_css', true) != ''){
				$count = 1;
				?>

					<li>
						<span class="yp-title">'<?php echo ucfirst(get_the_title($id)); ?>' <?php echo ucfirst(get_post_type($id)); ?> Styles</span>
						<a class="yp-remove" href="<?php echo admin_url('options-general.php?page=yp-options&yp_reset_id='.$id.''); ?>"><span class="dashicons dashicons-no"></span> <?php _e('Delete','yp'); ?></a>

						<a class="yp-customize" href="<?php echo admin_url('admin.php?page=yellow-pencil-editor&href='.urlencode(get_the_permalink($id)).'&yp_id='.$id.''); ?>"><span class="dashicons dashicons-edit"></span> <?php _e('Customize','yp'); ?></a>

						<span class="yp-clearfix"></span>
					</li>

				<?php
					}

				endwhile;
				wp_reset_query();

			?>

			<?php

				if(0 == $count){
					echo '<li>'.__("No CSS Source! Customize something on your theme.","yp").'</li>';
				}

			?>

		</ul>

		
		</div>

		</div>
	<?php

}


// @WaspThemes.
// Coded With Love..