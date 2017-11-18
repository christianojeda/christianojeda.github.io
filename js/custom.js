
// ISOTOPE FILTER
jQuery(document).ready(function($){

  if ( $('.iso-box-wrapper').length > 0 ) { 

      var $container  = $('.iso-box-wrapper'), 
        $imgs     = $('.iso-box img');

      $container.imagesLoaded(function () {

        $container.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.iso-box'
        });

        $imgs.load(function(){
          $container.isotope('reLayout');
        })

      });

      //filter items on button click

      $('.filter-wrapper li a').click(function(){

          var $this = $(this), filterValue = $this.attr('data-filter');

      $container.isotope({ 
        filter: filterValue,
        animationOptions: { 
            duration: 750, 
            easing: 'linear', 
            queue: false, 
        }                
      });             

      // don't proceed if already selected 

      if ( $this.hasClass('selected') ) { 
        return false; 
      }

      var filter_wrapper = $this.closest('.filter-wrapper');
      filter_wrapper.find('.selected').removeClass('selected');
      $this.addClass('selected');

        return false;
      }); 

  }

});

// jQuery to collapse the navbar on scroll //
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

  // NIVO LIGHTBOX
  $('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale',
    });

});








//scroll

$(document).ready(function(){

  $(document).on("scroll", onScroll);

    $('.vertical').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .stop().animate({scrollTop: targetOffset+1}, 1300, 'easeOutQuint');
       return false;
      }
    }
  });

    $('#navbar li a[href^="#"]').on('click',function (e) {
      e.preventDefault();
        $('#navbar li').each(function(){
            $(this).removeClass('active');
        });
      $(this).parent().addClass('active'); 

        var target = this.hash,
            menu = target;
       $target = $(target);
    });

      $('a.panel').click(function() {

    $('a.panel').removeClass('selected');
    $(this).addClass('selected');

    current = $(this);

    $('#wrapper').scrollTo($(this).attr('href'), 800);

    return false;
  });

  $(window).resize(function() {
    resizePanel();
  });

});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#navbar li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#navbar ul li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            currLink.parent().removeClass("active");
      console.log(currLink.parent());
        }
    });
}

function resizePanel() {

  width = $(window).width();
  height = $(window).height();

  mask_width = width * $('.item').length;

  $('#debug').html(width + ' ' + height + ' ' + mask_width);

  $('#wrapper, .item').css({
    width: width,
    height: height
  });
  $('#mask').css({
    width: mask_width,
    height: height
  });
  $('#wrapper').scrollTo($('a.selected').attr('href'), 0);

}



