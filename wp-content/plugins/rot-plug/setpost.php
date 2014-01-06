<?php
add_action('wp_ajax_nopriv_do_ajax', 'our_ajax_function');
add_action('wp_ajax_do_ajax', 'our_ajax_function');
function our_ajax_function(){
     // now we'll write what the server should do with our request here
	 
	 $post=get_post(1);
	 // Update post 37
  $my_post = array(
      'ID'           => 1,
      'post_content' => $_POST['text']
  );
		
		// Update the post into the database
		  wp_update_post( $my_post );;
	die();
}

//set an get device location
add_action( 'wp_ajax_set_devices', 'set_devices' );
add_action( 'wp_ajax_nopriv_set_devices', 'set_devices' );
    
function set_devices() {
  $lng=isset($_POST['lng'])?$_POST['lng']:'';
  $lat=isset($_POST['lat'])?$_POST['lat']:'';
 
 //insert post
	$my_post = array(
	  'post_title'    => uniqid(),
	  'post_type'     =>'device',
	  'post_status'   => 'publish',
	  'post_category' => array(8,39)
	);
	
	// Insert the post into the database
	$postid=wp_insert_post( $my_post );
	 
	 add_post_meta( $postid, 'lat',$lat );
	 add_post_meta( $postid, 'lng', $lng );
	
	echo $postid;
	
	die();
}

/*add_action( 'wp_ajax_get_devices_location', 'get_devices_location' );
add_action( 'wp_ajax_nopriv_get_devices_location', 'get_devices_location' );
    
function get_devices_location_from_posts() {
  $data = array();
//  $myposts = get_posts();

  //foreach ( $myposts as $post ) : setup_postdata( $post ); 
  $data[]=(object)array(
	  'latitude' => get_post_meta($post->ID,'lat',true),
	  'longitude' => get_post_meta($post->ID,'lng',true), 
	  'id' => $post->ID,
	  );
 // endforeach; 
  return $data;
}*/