jQuery(document).ready(function(){

    var ppp = 2; // Post per page
    var cat = 43;
    var pageNumber = 1;
    
    function load_posts(){
        pageNumber++;
        var str = '&cat=' + cat + '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&action=more_post_ajax';
        jQuery.ajax({
            type: "POST",
            url: ajax_posts.ajaxurl,
            data: str,
            success: function(response){
                console.log(response);
               var dd =  JSON.parse(response);
                jQuery.each(dd,function(key,value){
                    //alert(value.title); 
                    var rr = '<div class="transcript-sub-section-left"><div class="transcript-sub-section-child" style="background-image: url('+value.featureimage1+'); background-position: left; background-repeat: no-repeat;"><img class="attantion-post__logo" src= '+value.featureimage2+' alt=" logo"><div class="top-name"><p class="top-o_name"> </p><p class="rt-o_name"><br><span class="top-title_name">#</span></p></div><h5>'+value.title+'</h5></div><div class="attantion-footer "><a href='+value.readMore+' class="attantion-footer_contant">READ TRANSCRIPT</a></div></div>';    
                        jQuery('.transcript-lists-data').append(rr);
                }); 
                
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }
    
        });
        return false;
    }
    
    jQuery("#more_posts").on("click",function(){ // When btn is pressed.
        jQuery("#more_posts").attr("disabled",true); // Disable the button, temp.
        load_posts();
    });

    jQuery(document).on("click","#row_more_posts", function(){
        
        jQuery(this).parent().remove();
        load_default_posts();
    });

    function load_default_posts(){
        
        pageNumber++;
        var str = '&pageNumber=' + pageNumber + '&action=more_default_post_ajax';
        jQuery.ajax({
            type: "POST",
            url: ajax_posts.ajaxurl,
            data: str,
            success: function(response){
                if (response != null) {
                    jQuery(".blog_list" ).last().after(response);
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }
        });
        return false;
    }

});
    
    
    jQuery(function($){
        $('#filter').submit(function(){
    
            var filter = $('#filter');
            $.ajax({
                url:filter.attr('action'),
                data:filter.serialize(), // form data
                type:filter.attr('method'), // POST
                beforeSend:function(xhr){
                    filter.find('button').text('Processing...'); // changing the button label
                },
                success:function(data){
                    
                    $('.post-sections').hide();
                    $('.search-posts').show();
                    filter.find('button').text('Find'); // changing the button label back
                    $('#response').html(data); // insert data
                }
            });
            return false;
        });
    });

    
    
    
    
    