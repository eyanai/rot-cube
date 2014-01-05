﻿var allUsers = {};


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


    this.get_activity_day = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=activity-day";
        //&custom_fields=" + this.custom_fields_recipes;

        this.sendAjax(to_url, func);
    }

    this.get_mission = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=activity-day,navigation-mission,take-photo-mission,capturevideo-mission,watch-video-mission,write-mission,quiz-mission,medicine-mission";

        this.sendAjax(to_url, func);
    }

    this.get_question = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=question";

        this.sendAjax(to_url, func);

    }


    this.getUsers = function (func) {
        var to_url = this.domain + "api/cube/get_users/";
        this.sendAjax(to_url, func);

    } //get users

    //JsonMan()

    this.get_group = function (id, func) {
        var to_url = this.domain + "?json=get_post&post_id=" + id + "&post_type=group";

        this.sendAjax(to_url, func);

    }
} //JsonManager()


function JsonHandler() {

    var self = this;
    self.saver;
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
        jsonManager.get_mission(missionsPostId[nextMission], jsonHandler.get_mission_handler);

    }

    this.get_mission_handler = function (mission) {

        self.missionCounter++;
        var missionId = 'mission' + self.missionCounter;
        missions[missionId] = {};
        missions[missionId].id = missionId;
        missions[missionId].type = mission.post.custom_fields["wpcf-type"][0];
        missions[missionId].description = mission.post.custom_fields["wpcf-description"][0];
        missions[missionId].timer = parseInt(mission.post.custom_fields["wpcf-estimated-time"][0]);
        missions[missionId].points = parseInt(mission.post.custom_fields["wpcf-scoring"][0]);
        if (mission.post.custom_fields["wpcf-feelings"][0] !== "") {
            missions[missionId].feelings = mission.post.custom_fields["wpcf-feelings"][0];
        }

        switch (mission.post.type) {
            case "take-photo-mission":
                missions[missionId].numOfPhotosRequired = mission.post.custom_fields["wpcf-numofphotosrequired"][0];
                missions[missionId].color = mission.post.custom_fields["wpcf-photo-mission-color"][0];
                break;

            case "navigation-mission":
                missions[missionId].destination = [parseFloat(mission.post.custom_fields["wpcf-latitude"][0]), parseFloat(mission.post.custom_fields["wpcf-longitude"][0])];
                break;

            case "medicine-mission":
                missions[missionId].medicine = [];
                missions[missionId].medicine[0] = {};
                missions[missionId].medicine[1] = {};
                missions[missionId].medicine[2] = {};

                missions[missionId].medicine[0].name = mission.post.custom_fields["wpcf-better-medicine-name"][0];
                missions[missionId].medicine[0].description = mission.post.custom_fields["wpcf-better-medicine-description"][0];
                missions[missionId].medicine[0].audience = mission.post.custom_fields["wpcf-better-medicine-audience"][0];

                missions[missionId].medicine[1].name = mission.post.custom_fields["wpcf-prevent-medicine-name"][0]; ;
                missions[missionId].medicine[1].description = mission.post.custom_fields["wpcf-prevent-medicine-description"][0];
                missions[missionId].medicine[1].audience = mission.post.custom_fields["wpcf-prevent-medicine-audience"][0];

                missions[missionId].medicine[2].name = mission.post.custom_fields["wpcf-saver-medicine-name"][0]; ;
                missions[missionId].medicine[2].description = mission.post.custom_fields["wpcf-saver-medicine-description"][0];
                missions[missionId].medicine[2].audience = mission.post.custom_fields["wpcf-saver-medicine-audience"][0];
                break;

            case "quiz-mission":
                questions = [];
                self.questionCounter = 0;
                var b = [];
                a = mission.post.custom_fields.questions[0].split('"')
                for (i = 1; i < a.length; i += 2) {
                    b.push(a[i]);
                    jsonManager.get_question(a[i], self.get_question_handler); //jsonHandler.get_question
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

        //ajax call next mission
        if (missionsPostId[++nextMission] !== undefined) {
            jsonManager.get_mission(missionsPostId[nextMission], jsonHandler.get_mission_handler);
        }
        else {
            $("#welcome-poster").css("background-image", "url(./img/Welcome1.png)");
            console.log(missions);

            $('#welcome-poster').on('click', function () {
                $(this).hide();
                $('section#register-group').show();
                $('#main-score').show();
                $('#main-help').show();

                //set the help popup
                fixedInfoController.setHelpPopupText("register");
            });

            navigationController.missions = missions;
            menuController.initMissions();


        }


    }

    this.get_question_handler = function (question) {
        questions[self.questionCounter] = [];
        questions[self.questionCounter][0] = question.post.custom_fields["wpcf-question"][0];
        questions[self.questionCounter][1] = question.post.custom_fields["wpcf-answer-1"][0];
        questions[self.questionCounter][2] = question.post.custom_fields["wpcf-answer-2"][0];
        questions[self.questionCounter][3] = question.post.custom_fields["wpcf-answer-3"][0];
        questions[self.questionCounter][4] = question.post.custom_fields["wpcf-answer-4"][0];
        questions[self.questionCounter][5] = parseInt(question.post.custom_fields["wpcf-right-answer"][0]);
        self.questionCounter++;
    }

    this.get_group_handler = function (group) {
        console.log(group);
        //questions[self.questionCounter] = [];
        //questions[self.questionCounter][0] = question.post.custom_fields["wpcf-question"][0];

        //self.questionCounter++;
    }

    this.setAllUsers = function (users) {
        allcount = users.user.length;

        //	  missions[missionId] = {};
        //   missions[missionId].id = missionId;
        //  missions[missionId].type = mission.post.custom_fields["wpcf-type"][0];

        //	 var allUsers = {id:'',name:'',picture:'',};
        // allUsers[0].name=user.posts[0].title;
        // allUsers[0].picture=user.posts[0].title;
        // allUsers[0].phone=user.posts[0].title;
        for (var i = 0; i < allcount; i++) {
            allUsers['member' + i] = {};
            allUsers['member' + i].id = 'user' + i;
            allUsers['member' + i].name = users.user[i].name;
            allUsers['member' + i].phone = users.user[i].phone;
            allUsers['member' + i].picture = users.user[i].img;
        }

        //		console.log(users);
        console.log(allUsers);

    }
} //JsonHandler()

var jsonManager = new JsonManager();

var jsonHandler = new JsonHandler();

var missions = {};
var questions = [];
jsonManager.get_activity_day(18, jsonHandler.get_activity_day_handler);
jsonManager.get_group(119, jsonHandler.get_group_handler);

jsonManager.getUsers(jsonHandler.setAllUsers);

//להזיז את ימי פעילות למעלה

//לשקול להוציא את HELPTEXT מהמערך
//לבדוק הקרנת סרטון לפי לינק מיוטיוב
//מה נעשה עם העלאת סרטון? 3MB זה גדול מדי

//להפוך לPHP
//לשנות את הסוג משימה ללא בחירה
//להוסיף צ'ק בוקס לבונוס בכללי
//להוסיף צבע למשימת צילום

//לעשות בדיקה לוידאו מיו טיוב

//מנגנון אל כשל לקריאות AJAX