<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Awesome Theme</title>
		<?php wp_head(); ?>
		<script>
			$(document).ready(console.log('hi2'));
		</script>		
	</head>
	<nav class="navbar navbar-inverse navbar-fixed-top">	
		<div class="container">
				<div class="navbar-header">
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<?php wp_nav_menu(array('theme_location'=>'primary')); ?>
					</div>
				</div>
		</div>
	</nav>

<?php 

	if( is_home() ):
		$awesome_classes = array('awesome-class', 'my-class');
	else:
		$awesome_classes = array('no-awesome-class');
	endif;
?>

<body <?php body_class($awesome_classes) ?>>
