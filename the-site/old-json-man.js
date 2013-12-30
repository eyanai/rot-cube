
    function jsonCallback(data) {
                var x = 5;
            }
    function JsonMan () {
    
   //this.domain = "http://localhost:11610/?json=";
    //this.domain = "http://cambium.co.il/ctc/?json=";
    this.domain = "http://appetite.theboxsite.com/?json=";
   this.custom_fields_recipes = "wpcf-recipe_name,wpcf-short_describtion,wpcf-total_time,wpcf-complexity_level,wpcf-instructions,wpcf-ingradient,wpcf-formatted_ingradients,wpcf-image,wpcf-video,wpcf-videomp4";
    this.custom_fields_terms = "wpcf-term_name,wpcf-describtion,wpcf-image";



    this.sendAjax = function(to_url,func)
    {
        
        $.ajax({
            type: 'GET',
            url: to_url + "&callback=call",
            async: false,
            jsonpCallback:func,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                func.call(this, data);
                //console.log(json);

            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

    //http://appetite.co.cc/?json=get_category_posts&category_slug=ipad&post_type=sharemanager&dev=1
    this.get_post_by_id = function(id, func) {
        var to_url = this.domain + "get_post&post_id=" + id + "&post_type=recipes&include=id,type,slug,status,categories,custom_fields&custom_fields=" + this.custom_fields_recipes;

        this.sendAjax(to_url,func);
        
    }
   
//
    this.get_share = function(category, func) {
        // var to_url = this.domain + "get_category_posts&category_slug=" + category + "&post_type=sharemanager&include=excerpt";
        var to_url = this.domain + "get_recent_posts&post_type=sharemanager&include=custom_fields,excerpt,slug&custom_fields=wpcf-subject,wpcf-link";

        //var to_url = "http://cambium.co.il/ctc/?json=get_category_posts&category_slug=feature&post_type=recipes&include=id,type,slug,status,categories,custom_fields&custom_fields=wpcf-recipe_name,wpcf-short_describtion,wpcf-total_time,wpcf-complexity_level,wpcf-image,wpcf-video&count=0&page=1&callback=?";
        this.sendAjax(to_url, func);

    }

     this.get_posts_by_category =function(category, count, page, func) {
        var to_url = this.domain + "get_category_posts&category_slug=" + category + "&post_type=recipes&include=id,type,slug,status,categories,custom_fields&custom_fields="+this.custom_fields_recipes+"&count=" + count + "&page=" + page;
        //var to_url = "http://cambium.co.il/ctc/?json=get_category_posts&category_slug=feature&post_type=recipes&include=id,type,slug,status,categories,custom_fields&custom_fields=wpcf-recipe_name,wpcf-short_describtion,wpcf-total_time,wpcf-complexity_level,wpcf-image,wpcf-video&count=0&page=1&callback=?";
        this.sendAjax(to_url,func);
       
    }

     this.search_by_gradients = function(words,func) {
       
        var to_url = this.domain + "taxonomy.get_taxonomy_posts&taxonomy=ingradient" + words + "&post_type=recipes&include=id,type,slug,status,categories,custom_fields&custom_fields=" + this.custom_fields_recipes+"&count=25" ;
        this.sendAjax(to_url,func);
        
    }

   this.get_terms_post= function(count, page, func) {
        var to_url = this.domain + "get_recent_posts&callback=callback&count="+count+"&post_type=terms&include=id,type,slug,status,categories,custom_fields&custom_fields=" + this.custom_fields_terms ;
        //this.sendAjax(to_url,func);
        $.ajax({
            type: 'GET',
            url: to_url,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
               termsMan_.createListCB(json);

            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

    //get array of words to search, return posts with those words in recipes
    this.search = function(words,func) {
        to_search = "";
        for(var i = 0; i < words.length; i++) {
            to_search += "&search=" + words[i];
        }
        var to_url = this.domain + "get_search_results" + to_search + "&post_type=recipes&include=id,title,type,slug,status,categories,custom_fields&custom_fields=" + this.custom_fields_recipes ;
        this.sendAjax(to_url,func);
       
    },

    this.get_categories_list = function(func) {
        var to_url = this.domain + "get_category_index&callback=callback";
        //var to_url = "http://localhost:11610" + "json=get_category_index";
        //console.log(to_url);
        this.sendAjax(to_url,func);
        
    }

   //this.callback = function() {
   //     alert("HIP HIP!")
   // }

    this.get_ingradients_list = function() {
        var to_url = this.domain + "taxonomy.get_taxonomy_index&taxonomy=ingradiant&post_type=recipes";
        this.sendAjax(to_url,func);
       
    }
    
   
}








