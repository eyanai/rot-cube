<?php /* Template name: My Test Template */  ?>
<?php //get_header(); ?>
<div id="content" class="widecolumn">
<br><br>
<br>
<br>

 <?php   
			
	if(wp_delete_post(174))echo "delted!";
 ?>

<?php 
//$post=get_post(31);
		   //$userfild=simple_fields_values("quiz_question, quiz_answer_one, quiz_answer_two,quiz_answer_three,quiz_answer_four,quiz_right_answer");
		   
		    $userfild=simple_fields_get_post_group_values(31,"שאלות",false,1);
		  
		  
		//   echo "<pre>".print_r($userfild,1)."</pre>"


?>
<?php get_footer(); ?>         

