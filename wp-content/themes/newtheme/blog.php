<?php

/*

Template Name: Blog

*/

get_header() ?>

<div id="content">

<?php

        if( have_posts() ):

                while( have_posts() ): the_post(); ?>

                        <p class="post_body"><?php the_content(); ?></p>

                <?php endwhile;

        endif;

?>


</div>


<?php get_footer(); ?>
