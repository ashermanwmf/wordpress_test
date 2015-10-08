<?php

function awesome_script_enqueue() {

	wp_enqueue_style('customstyle', get_template_directory_uri() . '/css/awesome.css', array(), '1.0.0', 'all');

}

add_action('wp_enqueue_scripts', awesome_script_enqueue);
 
