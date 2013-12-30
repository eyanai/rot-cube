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
                //      console.log(json);
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
        var to_url = this.domain + "get_post&post_id=" + id + "&post_type=activity-day,navigation-mission,take-photo-mission";

        this.sendAjax(to_url, func);
    }
} //JsonMan()


function JsonHandler() {

    var self = this;
    self.saver;
    self.missionCounter = 0;

    this.get_activity_day_handler = function (json) {
        var b = [];
        var saver = json;
        a = saver.post.custom_fields.משימות[0].split('"')
        for (i = 1; i < a.length; i += 2) {
            b.push(a[i]);
            newjson.get_mission(a[i], jsonHandler.get_mission_handler);
        }
        console.log(b);

    }

    this.get_mission_handler = function (mission) {
        console.log(mission);

        self.missionCounter++;
        var missionId = 'mission' + self.missionCounter;
        missions[missionId] = {};
        missions[missionId].id = missionId;
        missions[missionId].timer = 600;
        missions[missionId].points = 5;

        switch (mission.post.type) {
            case "take-photo-mission":
                missions[missionId].type = "capture-photo";
                missions[missionId].description = "עליכם לצלם 5 תמונות שיציגו חוזקות של הקהילה";
                missions[missionId].numOfPhotosRequired = 5;

                break;

            case "navigation-mission":
                missions[missionId].type = "navigate";
                missions[missionId].description = "עליכם להגיע";
                missions[missionId].destination = [mission.post.custom_fields["wpcf-latitude"][0], mission.post.custom_fields["wpcf-longitude"][0]];
                break;
        }


    }


} //JsonHandler()

var newjson = new JsonMan();

var jsonHandler = new JsonHandler();

newjson.get_activity_day(18, jsonHandler.get_activity_day_handler);

//איך לדאוג שיעבור לפי הסדר?
//get activity day
//get missions
//get active activity day

// להחליף את השם משימות לאנגלית