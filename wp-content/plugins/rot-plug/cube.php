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
	    wp_reset_postdata();

	}

	//get all users
	public function get_users_byid(){
		global $json_api;
		$id=$json_api->query->id;
		
		$user=array();
		
		//$post=get_post($id);
		
				$userfild=simple_fields_values("participantPhone, participantImage, participantName",$id);
						foreach($userfild as $userfild){
							$name= $userfild['participantName'];
							$phone= $userfild['participantPhone'];
							$img= $userfild['participantImage']['url'];
							
							$user['user'][$cunter]['name']=$name;
							$user['user'][$cunter]['phone']=$phone;
							$user['user'][$cunter]['img']=$img;
							
							$cunter++;				
						}
		return $user;
	}
	
	
	//get all mission
	public function get_mission_date(){
		   global $json_api,$post;
		   $id=$json_api->query->id;	
			
	       $post=get_post($id);
		   $cunter=0;
		   
		   $mission=array();
			//return array('id'=>$id);
		
			$posts = get_field('missions');
			if( $posts ):
				 foreach( $posts as $post_object):
						$custom_fields=get_post_custom($post_object->ID);
						
						if(in_array('quiz',$custom_fields['wpcf-type'])){
							$fild=simple_fields_get_post_group_values($post_object->ID,"שאלות",true,1);;
		  					$loop=sizeof($fild['שאלה']);
				 			
							
							$question=array();
				 
				 			for ($x=0; $x<$loop; $x++)
							{
								$question['q'.$x]=$fild['שאלה'][$x];
								$question['a1-'.$x]=$fild['תשובה 1'][$x];
								$question['a2-'.$x]=$fild['תשובה 2'][$x];
								$question['a3-'.$x]=$fild['תשובה 3'][$x];
								$question['a4-'.$x]=$fild['תשובה 4'][$x];
								$question['a-'.$x]=$fild['מספר התשובה הנכונה'][$x];
								
							}
				 			$question['q_sum']=$x;
				 			$custom_fields['question']=$question;
						}
						
						
						
						array_push($mission,$custom_fields); 
						$cunter++;
				endforeach;
				$mission['long']=$cunter;
				return $mission; 
			endif;

	}
}