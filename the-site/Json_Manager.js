var allUsers={};
var gday={};
var allgrup={};


function JsonManager() {

    this.domain = "http://localhost/rot-cube/";

    this.sendAjax = function (to_url, func) {

        $.ajax({
            type: 'GET',
            url: to_url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                func(json);
                //console.log(json);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }


	this.getAlldays=function(func){
		var to_url=this.domain + "?json=get_recent_posts&post_type=activity-day";
		this.sendAjax(to_url,func);
	}


/*    this.get_activity_day = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=activity-day";
        //&custom_fields=" + this.custom_fields_recipes;

        this.sendAjax(to_url, func);
    }*/

    this.get_mission = function (id, func) {
        var to_url = this.domain + "api/cube/get_mission_date/?id="+id+"";
	    this.sendAjax(to_url, func);
    }

    this.get_question = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=question";

        this.sendAjax(to_url, func);

    }
	
	//get users
	this.getUsers=function(func){
		var to_url=this.domain + "api/cube/get_users/";
		this.sendAjax(to_url,func);
		
	}
	this.getUsersById=function(id,func){
		var to_url=this.domain + "api/cube/get_users_byid/?id="+id;
		this.sendAjax(to_url,func);
		
	}
	this.getAllGroup=function(func){
		var to_url=this.domain + "?json=get_recent_posts&post_type=group";
		this.sendAjax(to_url,func);
	}
		
 //JsonMan()

    this.get_group = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=group";

        this.sendAjax(to_url, func);

    }
} //JsonManager()


function JsonHandler() {
	
    var self = this;
    self.saver,self.allDays,self.allGroup;
    self.missionCounter = 0;
    self.questionCounter = 0;
    self.question;
    var nextMission = 0;
    var missionsPostId = [];

    this.get_activity_day_handler = function (missionsStr) {

        var tempArr = missionsStr.post.custom_fields.missions[0].split('"')
        for (i = 1; i < tempArr.length; i += 2) {
            missionsPostId.push(tempArr[i]);
        }
        console.log(missionsPostId);
       // jsonManager.get_mission(missionsPostId[nextMission], jsonHandler.get_mission_handler);

    }

  this.get_mission_handler = function (mission) {
		missions = {};
		console.log(mission);
        for(self.missionCounter=0;self.missionCounter<mission.long;self.missionCounter++){
			
			var missionId = 'mission' + self.missionCounter;
			missions[missionId] = {};
			missions[missionId].id = missionId;
			missions[missionId].type = mission[self.missionCounter]['wpcf-type'][0];
			missions[missionId].description = mission[self.missionCounter]["wpcf-description"][0];
			missions[missionId].timer = parseInt(mission[self.missionCounter]["wpcf-estimated-time"][0]);
			missions[missionId].points = parseInt(mission[self.missionCounter]["wpcf-scoring"][0]);
			if (mission[self.missionCounter]["wpcf-feelings"][0] !== "") {
				missions[missionId].feelings =mission[self.missionCounter]["wpcf-feelings"][0];
			}
	
			switch (mission[self.missionCounter]['wpcf-type'][0]) {
				case "take-photo":
					missions[missionId].numOfPhotosRequired = mission[self.missionCounter]["wpcf-numofphotosrequired"][0];
					break;
	
				case "navigate":
					missions[missionId].destination = [parseFloat(mission[self.missionCounter]["wpcf-latitude"][0]),
													   parseFloat(mission[self.missionCounter]["wpcf-longitude"][0])];
					break;
	
				case "medicine-basket":
					missions[missionId].medicine = [];
					missions[missionId].medicine[0] = {};
					missions[missionId].medicine[1] = {};
					missions[missionId].medicine[2] = {};
	
					missions[missionId].medicine[0].name = mission[self.missionCounter]["wpcf-better-medicine-name"][0];
					missions[missionId].medicine[0].description =mission[self.missionCounter]["wpcf-better-medicine-description"][0];
					missions[missionId].medicine[0].audience = mission[self.missionCounter]["wpcf-better-medicine-audience"][0];
	
					missions[missionId].medicine[1].name = mission[self.missionCounter]["wpcf-prevent-medicine-name"][0]; ;
					missions[missionId].medicine[1].description = mission[self.missionCounter]["wpcf-prevent-medicine-description"][0];
					missions[missionId].medicine[1].audience = mission[self.missionCounter]["wpcf-prevent-medicine-audience"][0];
	
					missions[missionId].medicine[2].name = mission[self.missionCounter]["wpcf-saver-medicine-name"][0]; ;
					missions[missionId].medicine[2].description = mission[self.missionCounter]["wpcf-saver-medicine-description"][0];
					missions[missionId].medicine[2].audience = mission[self.missionCounter]["wpcf-saver-medicine-audience"][0];
					break;
	
				case "quiz":
				
				allq=mission[self.missionCounter]['question']['q_sum'];
					for (i = 0; i < allq; i++) {
						questions[i] = [];
						questions[i][0] = mission[self.missionCounter]['question']['q'+i];
						questions[i][1] = mission[self.missionCounter]['question']['a1-'+i];
						questions[i][2] = mission[self.missionCounter]['question']['a2-'+i];
						questions[i][3] = mission[self.missionCounter]['question']['a3-'+i];
						questions[i][4] = mission[self.missionCounter]['question']['a4-'+i];
						questions[i][5] = mission[self.missionCounter]['question']['a-'+i];
						
					}
					missions[missionId].quiz = questions;
				  
					break;
	
				case "write-text":
					//currently there is nothing to add here
					break;
	
				case "read-text":
	
					break;
	
				case "watch-video":
					//צריך להחליט אם לוקחים לינק או סרטון
					break;
	
				case "capture-video":
	
					break;
			}
		}
        //ajax call next mission
       /* if (missionsPostId[++nextMission] !== undefined) {
            jsonManager.get_mission(missionsPostId[nextMission], jsonHandler.get_mission_handler);
        }
        else*/
       console.log(missions); 


    }

  

    this.get_group_handler = function (group) {
        console.log(group);
        //questions[self.questionCounter] = [];
        //questions[self.questionCounter][0] = question.post.custom_fields["wpcf-question"][0];

        //self.questionCounter++;
    }
	
	this.setAllUsers=function(users){
		if(users.user){	
			allcount=users.user.length;
			/*for(var i=0;i<allcount;i++){
				allUsers['member'+i]={};
				allUsers['member'+i].id='user'+i;
				allUsers['member'+i].name=users.user[i].name;
				allUsers['member'+i].phone=users.user[i].phone;
				allUsers['member'+i].picture=users.user[i].img;
			}*/
			
			for (x in users.user)
				  {
					allUsers['member'+x]={};  
					allUsers['member'+x].id='user'+x;
					allUsers['member'+x].name=users.user[x].name;
					allUsers['member'+x].phone=users.user[x].phone;
					allUsers['member'+x].picture=users.user[x].img;
				 // console.log(users.user[x].name);
				  }
			
			console.log(allUsers);
		}
	}
	
	this.returnDays=function(days){
		allcount=days.count;
		for(var i=0;i<allcount;i++){
			gday['day'+i]={};
			gday['day'+i].id=days.posts[i].id;
			gday['day'+i].title=days.posts[i].title;
		}
			gday.long=allcount;
		self.allDays=gday;
	//	console.log(days);
	}
	
	
	this.returnGroup=function(group){
		//allgrup
		allcount=group.count;
		for(var i=0;i<allcount;i++){
			allgrup[i]={};
			allgrup[i].id=group.posts[i].id;
			allgrup[i].title=group.posts[i].title;
		}
			allgrup.long=allcount;
		self.allGroup=allgrup;
	//console.log(self.allGroup);
		
	}
} //JsonHandler()

var jsonManager = new JsonManager();

var jsonHandler = new JsonHandler();

var missions = {};
var questions = [];
//jsonManager.get_activity_day(18, jsonHandler.get_activity_day_handler);
//jsonManager.get_group(119, jsonHandler.get_group_handler);

//jsonManager.getAlldays(jsonHandler.returnDays);
//jsonManager.getUsers(jsonHandler.setAllUsers);
//איך לדאוג שיעבור לפי הסדר?
//get activity day
//get missions
//get active activity day


//JsonManager.get_mission(49,JsonHandler.get_mission_handler);



//להזיז את ימי פעילות למעלה

//לשקול להוציא את HELPTEXT מהמערך
//לבדוק הקרנת סרטון לפי לינק מיוטיוב
//מה נעשה עם העלאת סרטון? 3MB זה גדול מדי
//מה נעשה אם משימה נכשלה?
//להפוך לPHP
//לשנות את הסוג משימה ללא בחירה
//להוסיף צ'ק בוקס לבונוס בכללי
//להוסיף צבע למשימת צילום
//לעשות בדיקה לוידאו מיו טיוב