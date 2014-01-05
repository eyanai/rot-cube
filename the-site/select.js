// JavaScript Document
$(document).ready(function(e) {
	setDays(daychnag);
	setUser(selectgroup);
});


function setUser(func){
	jsonManager.getAllGroup(jsonHandler.returnGroup);
	
	
	html=' <option value="">בחר קבוצה</option>';
	for(var i=0;i<jsonHandler.allGroup.long;i++){
		html+=' <option value="'+jsonHandler.allGroup[i].id+'">'+jsonHandler.allGroup[i].title+'</option>';
	}
	$("#groupSelect").html(html);

	func();
}
function selectgroup(){
	$("#groupSelect").on('change',this,function(){
		sid=$("#groupSelect option:selected").val();
		jsonManager.getUsersById(sid,jsonHandler.setAllUsers);
	});
}






function setDays(func){
	jsonManager.getAlldays(jsonHandler.returnDays);
	var daylist=jsonManager.allDays;
	
	html=' <option value="">בחר יום</option>';
	for(var i=0;i<jsonHandler.allDays.long;i++){
		html+=' <option value="'+jsonHandler.allDays['day'+i].id+'">'+jsonHandler.allDays['day'+i].title+'</option>';
	}
	$("#dayselect").html(html);
	func();
}

function daychnag(){
	$("#dayselect").on('change',this,function(){
		sid=$("#dayselect option:selected").val();
		
        jsonManager.get_mission(sid,jsonHandler.get_mission_handler);
	});
	
}