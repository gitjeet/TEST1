function resize() { 
  if (jQuery(window).width() <= 768) { 
    jQuery('.wp1s-slider-wrapper').addClass('wp1s-resposive'); 
  } else {
    jQuery('.wp1s-slider-wrapper').removeClass('wp1s-resposive');} 
}

  jQuery(document).ready(function($){
    $(window).resize(resize); 
    resize();
    var ap_slider = {};
    var ap_thumb_slider = [];
    var realThumbSlider;
    $('.wp1s-bxslider').each(function(){
      var selector = $(this);
        var speed = $(this).data('speed');
        var pause = $(this).data('pause');
        var auto = $(this).data('auto');
        var transition = $(this).data('transition');
        var controls = $(this).data('controls');
        var responsive = $(this).data('responsive');
        var pager = $(this).data('pager');
        var id = $(this).data('id');
        pause = (pause=='')?4000:pause;
        if(pager=='disable'){
        ap_slider.id = $(this).bxSlider({
        speed: speed,
        pause: pause,
        auto: auto,
        pager: false,
        mode: transition,
        controls: controls,
        responsive:responsive,
        infiniteLoop: true, 
        video: true,
        useCSS: false
      });
      }
      else if(pager=='dot'){
        ap_slider.id = $(this).bxSlider({
        speed: speed,
        pause: pause,
        auto: auto,
        pager: true,
        mode: transition,
        controls: controls,
        responsive:responsive,
        infiniteLoop: true,
        video: true,
        useCSS: false
        });
      }
      else if(pager=='pagination'){
        ap_slider.id = $(this).bxSlider({
        speed: speed,
        pause: pause,
        auto: auto,
        pager: true,
        mode: transition,
        controls: controls,
        responsive:responsive,
        infiniteLoop: true,
        pagerType: 'short',
        video: true,
        useCSS: false
        });
      }
      else{
        ap_slider.id = $(this).bxSlider({
        speed: speed,
        pause: pause,
        auto: auto,
        pager: true,
        mode: transition,
        controls: controls,
        responsive:responsive,
        pagerCustom:'#wp1s-pager-'+id,
        useCSS:false,
        nextText:'',
        prevText:'',
        infiniteLoop: true,
        onSlideBefore:function($slideElement, oldIndex, newIndex){
        selector.closest('.wp1s-slider-wrapper').find('.active').removeClass("active");
        selector.closest('.wp1s-slider-wrapper').find('li a[data-slide-index="'+newIndex+'"]').addClass("active");
        var slider = ap_thumb_slider[id];

        if(slider.getSlideCount()-newIndex>=count)slider.goToSlide(newIndex);
        else slider.goToSlide(slider.getSlideCount()-count);
        
      }
        
        });
      }
});
      var count=0;
      $(".wp1s-bxslider-pager").each(function(){
        var id = $(this).data('id');
        
      count = $(this).data('count');
        ap_thumb_slider[id]= $(this).bxSlider({
          minSlides:  count,
          maxSlides:  count,
          slideWidth: 150,
          slideMargin: 10,
          moveSlides: 1,
          auto: false,
          pager: false,
          infiniteLoop: false,
          nextText:'<span></span>',
          prevText:'<span></span>',  
        });
      });
    });