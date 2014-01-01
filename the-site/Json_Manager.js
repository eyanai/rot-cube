var missions = {};

function JsonMan() {

    this.domain = "http://localhost/rot-cube/?json=";

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
        var to_url = this.domain + "get_post&post_id=" + id + "&post_type=activity-day";
        //&custom_fields=" + this.custom_fields_recipes;

        this.sendAjax(to_url, func);
    }

    this.get_mission = function (id, func) {
        var to_url = this.domain + "get_post&post_id=" + id + "&post_type=activity-day,navigation-mission,take-photo-mission,capturevideo-mission,watch-video-mission,write-mission,quiz-mission,medicine-mission";

        this.sendAjax(to_url, func);
    }

     this.get_question = function (id, func) {
        var to_url = this.domain + "get_post&post_id=" + id + "&post_type=question";

        this.sendAjax(to_url, func);

    }
} //JsonMan()


function JsonHandler() {

    var self = this;
    self.saver;
    self.missionCounter = 0;
    self.question;

    this.get_activity_day_handler = function (json) {
        var b = [];
        var saver = json;
        a = saver.post.custom_fields.missions[0].split('"')
        for (i = 1; i < a.length; i += 2) {
            b.push(a[i]);
            jsonManager.get_mission(a[i], jsonHandler.get_mission_handler);
        }
        console.log(b);

    }

    this.get_mission_handler = function (mission) {
        console.log(mission);

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
                missions[missionId].numOfPhotosRequired = 5;//change+++++++++++++++++++++++++++++++++++
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

                missions[missionId].medicine[1].name = mission.post.custom_fields["wpcf-prevent-medicine-name"][0];;
                missions[missionId].medicine[1].description = mission.post.custom_fields["wpcf-prevent-medicine-description"][0];
                missions[missionId].medicine[1].audience = mission.post.custom_fields["wpcf-prevent-medicine-audience"][0];

                missions[missionId].medicine[2].name = mission.post.custom_fields["wpcf-saver-medicine-name"][0];;
                missions[missionId].medicine[2].description = mission.post.custom_fields["wpcf-saver-medicine-description"][0];
                missions[missionId].medicine[2].audience = mission.post.custom_fields["wpcf-saver-medicine-audience"][0];
                break;

            case "quiz-mission":
                var b = [];
                a = mission.post.custom_fields.questions[0].split('"')
                for (i = 1; i < a.length; i += 2) {
                    b.push(a[i]);
                    jsonManager.get_question(a[i], self.get_question_handler); //jsonHandler.get_question
                }
                console.log(b);

                break;

            case "write-text":

                break;

            case "read-text":

                break;

            case "watch-video":

                break;

            case "capture-video":

                break;
        }

    }

    this.get_question_handler = function (question) {
        console.log("GOOD QUESTIOn");
        console.log(question);

    }
} //JsonHandler()

var jsonManager = new JsonMan();

var jsonHandler = new JsonHandler();

jsonManager.get_activity_day(18, jsonHandler.get_activity_day_handler);

//איך לדאוג שיעבור לפי הסדר?
//get activity day
//get missions
//get active activity day

//להזיז את ימי פעילות למעלה
//להעלים את השדות הקבועים
//לשקול להוציא את HELPTEXT מהמערך
//לבדוק הקרנת סרטון לפי לינק מיוטיוב
//מה נעשה עם העלאת סרטון? 3MB זה גדול מדי