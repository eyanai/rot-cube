<?php /* Template name: My Test Template */  ?>
<?php //get_header(); ?>
<div id="content" class="widecolumn">
 <?php   
			
	       $post=get_post(18);
		   $mission=array();
			//return array('id'=>$id);
		
			$posts = get_field('missions');
			if( $posts ):
				 foreach( $posts as $post_object):
				echo "<pre><br><br><br><br>";
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
						var_dump($mission);
				echo "<pre><hr>"; 
				endforeach;
				
			endif;
 ?>

<?php 
//$post=get_post(31);
		   //$userfild=simple_fields_values("quiz_question, quiz_answer_one, quiz_answer_two,quiz_answer_three,quiz_answer_four,quiz_right_answer");
		   
		    $userfild=simple_fields_get_post_group_values(31,"שאלות",false,1);
		  
		  
		//   echo "<pre>".print_r($userfild,1)."</pre>"


?>
<?php get_footer(); ?>         

