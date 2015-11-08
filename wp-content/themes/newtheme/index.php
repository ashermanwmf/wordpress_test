<?php get_header(); ?>



<div class="index_body1">

Sample index page. This is index.php

</div>

<div class="index_body1">

<h1>Projects</h1>

<?php

        if( have_posts() ):

                while( have_posts() ): the_post(); ?>
                        <div class="post_container">
                        <h3 class="post_title"><?php the_title(); ?></h3>
                        <small class="post_summary">Posted on: <?php the_time('F j, Y'); ?> at <?php the_time('g:i a'); ?>, in <?php the_category(); ?></small>

                        <p class="post_body"><?php the_content(); ?></p>
                        </div>

                <?php endwhile;

        endif;

?>

</div>


<?php get_footer(); ?>
