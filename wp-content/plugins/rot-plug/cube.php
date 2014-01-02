<?php
class JSON_API_Cube_Controller{
	
	public function yanai(){
		return array('mesg'=>'hallo');
	}
	
	//get all users
	public function get_users(){
		$user=array();
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
						$userfild=simple_fields_values("participantPhone, participantImage, participantName");
						foreach($userfild as $userfild){
							$name= $userfild['participantName'];
							$phone= $userfild['participantPhone'];
							$img= $userfild['participantImage']['url'];
							
							$user['user'][$cunter]['name']=$name;
							$user['user'][$cunter]['phone']=$phone;
							$user['user'][$cunter]['img']=$img;
							
							$cunter++;				
						}
		endwhile;
		return $user;
	}


}