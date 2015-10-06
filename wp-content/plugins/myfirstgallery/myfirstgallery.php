<?php

/*
 * Plugin Name: My first plugin
 * Description: I am trying to make a gallery
 * Author: Andrew
 * Version: 1.0
 */

add_action('admin_menu', 'myfirstplugin_admin_actions');
function myfirstplugin_admin_actions() {
    add_options_page('MyFirstPlugin', 'MyFirstPlugin', 'manage_options', _FILE_, 'myfirstplugin_admin' );
}

function myfirstplugin_admin()
{
?>
	<div class="wrap">
		<h2>A more interesting Hello Word Plugin</h2>
		<h3>
		This plugin will search the DB for all draft posts and display their Title and ID
		</h3>
		<p>Click the button bellow to begin the search</p>
		<br/>
		<form action="" method="POST">
			<input type="submit" name="search_draft_posts" value="Search" class="button-primary" />
		</form>
		<br/>
		<table class="widefat">
		<thead>
		<tr>
			<th> Post Title </th>
			<th> Post ID </th>
		</tr>
		</thead>
		<tfoot>
		<tr>
			<th> Post Title </th>
			<th> Post ID </th>
		</tr>
		</tfoot>
		<tbody>
<?php
	global $wpdb;
	$mytestdrafts = array();
	if(isset($_POST['search_draft_posts']))
	{			
		$mytestdrafts = $wpdb->get_results(
			"
			SELECT ID, post_title
			FROM $wpdb->posts
			WHERE post_status = 'draft'
			"
		);
		//store the reults in WP option tables 
		update_option('myfirstplugin_draft_posts', $mytestdrafts);
	}
	else if (get_option('myfirstplugin_draft_posts'))
	{
		$mytestdrafts = get_option('myfirstplugin_draft_posts');
	}
	foreach ($mytestdrafts as $mytestdraft)
	{
?>
		<tr>
<?php
	echo"<td>".$mytestdraft->post_title."</td>";
	echo "<td>".$mytestdraft->ID."</td>";
?>
		</tr>
<?php
	
	}
?>
		</tbody>
	</div>
<?php
}

?>
