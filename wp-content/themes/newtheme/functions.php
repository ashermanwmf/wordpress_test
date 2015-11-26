<?php

function awesome_script_enqueue() {

	wp_enqueue_style('customstyle', get_template_directory_uri() . '/css/awesome.css', array(), '1.0.0', 'all');
	wp_enqueue_style('bootstrap.min.css', get_template_directory_uri() . '/css/bootstrap.min.css', array(), '1.0.0', 'all');
	wp_enqueue_style('norm', get_template_directory_uri() . '/css/normalize.css', array(), '1.0.0', 'all');
	wp_enqueue_style('skeleton', get_template_directory_uri() . '/css/skeleton.css', array(), '1.0.0', 'all');
	wp_enqueue_script( 'awesomejs', get_template_directory_uri() . '/js/awesome.js', array(), '1.0.0', true );
	wp_deregister_script( 'jquery' );  
    	wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', array(), null, false); 
    	wp_enqueue_script('jquery');
}

add_action('wp_enqueue_scripts', 'awesome_script_enqueue');

function awesome_theme_setup() {

	add_theme_support('menus');

	register_nav_menu('primary', 'Primary Header Navigation');

}


add_action('init', 'awesome_theme_setup');

