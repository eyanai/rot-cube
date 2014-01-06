function JsonManagerPost() {

    this.domain = "http://localhost/rot-cube/";
	this.domain+="wp-content/plugins/rot-plug/setpost.php";

    this.sendAjaxPost = function (text) {

        $.post( domain,
			{
			"text":text,
			"action":'test'	
				},	
			 function(data) {
				 console.log(data);
			  alert( "success" );
				}
			 );
    }


	this.setAll=function(func){
		var to_url=this.domain + "?json=get_recent_posts&post_type=activity-day";
		this.sendAjax(to_url,func);
	}
}

var JsonPost=new JsonManagerPost();


$(document).ready(function(e) {
    $('#postest').on('submit',this,function(){
		//e.preventDefault();
		text=$('#text').val();	
 	
		$.post( 'http://localhost/rot-cube/wp-admin/admin-ajax.php',
			{
			"text":text,
			"action":'do_ajax'	
				},	
			 function(data) {
				 console.log(data);
			  //alert( "success" );
				}
			 );
    
		return false;
	});
	
});