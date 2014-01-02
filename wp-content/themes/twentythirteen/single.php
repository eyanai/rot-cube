<?php
/**
 * The template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php /* The loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
                <?php
					 //var_dump(simple_fields_values("participantPhone, participantImage, participantName"));
				
				?>
                <?php 
						/*$user=simple_fields_values("participantPhone, participantImage, participantName");
						foreach($user as $user){
							echo $user['participantName']."<br>";
							echo $user['participantPhone']."<br>";
							echo $user['participantImage']['url']."<br><hr>";
							
						}*/
				?>
			<?php endwhile; ?>
          <?php   
             $args = array(
					'posts_per_page'   =>-1,
					'order'            => 'DESC',
					'post_type'        => 'group',
					'post_status'      => 'publish',
					);
		
		$loop= new WP_Query($args);
		$cunter=0;
		
		while($loop->have_posts()):$loop->the_post();
				$userfild=simple_fields_values("participantPhone, participantImage, participantName");
						foreach($userfild as $userfild){
							$name= $userfild['participantName'];
							$phone= $userfild['participantPhone'];
							$img= $userfild['participantImage']['url'];
							
							$user['user'.$cunter][$cunter]['name']=$name;
							$user['user'.$cunter][$cunter]['phone']=$phone;
							$user['user'.$cunter][$cunter]['img']=$img;
							
							$cunter++;				
						}
		
			
			
			
			
		endwhile;
		echo print_r($user,1);
		wp_reset_postdata();
			?>
            <?php   
  //         $post=get_post(119);
		
//		while($post->have_posts()):$post->the_post();
				$userfild=simple_fields_values("participantPhone, participantImage, participantName",119);
						foreach($userfild as $userfild){
							$name= $userfild['participantName'];
							$phone= $userfild['participantPhone'];
							$img= $userfild['participantImage']['url'];
							
							$user['user'.$cunter][$cunter]['name']=$name;
							$user['user'.$cunter][$cunter]['phone']=$phone;
							$user['user'.$cunter][$cunter]['img']=$img;
							
							$cunter++;				
						}
		
			
			
			
			
//		endwhile;
		echo print_r($user,1);
			?>
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>