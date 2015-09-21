<?php

/*
 * Plugin Name: My first gallery plugin
 * Description: I am trying to make a gallery
 * Author: Andrew
 * Version: 1.0
 */

add_action('admin_menu', 'myfirstgallery_admin_actions');
function myfirstgallery-admin_actions() {
    add_options_page('MyFirstGallery', 'MyFirstGallery', 'manage_options', _FILE_, 'myfirstplugin_admin' );
}

?>
