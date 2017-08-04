
    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        smartBackspace: true,
        
  });

 $(document).ready(function(){
             
                $('.testiomanils').slick({
                  arrows: false,
                  dots: true,
                  autoplay: true,
                  centerMode: true,
                  centerPadding: '60px',
                  slidesToShow: 3,
                  autoplaySpeed: 2000,
                  focusOnSelect: false,
                  responsive: [
                        {
                          breakpoint: 768,
                          settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                          }
                        }
                      ]
              });
     
     
        $('.click').click(function() {
        
            var link = $(this).attr('href');
            $('body').removeClass('full');
            $('nav ul').removeClass('hei');
            $('nav ul li').removeClass('show');
           $('html, body').animate({ 
               scrollTop: $(link).offset().top
           }, 1000);
        });
     
     $('#ico').click(function(){
         
         $('nav ul li').toggleClass('show');
         $('nav ul').toggleClass('hei');
         $('body').toggleClass('full');
         
     });
     
     
     
     $('.down').waypoint(function(direction){
        if (direction == "down") {
            $('nav').addClass('sticky animated fadeIn');
            
            
        } else {
            $('nav').removeClass('sticky animated fadeIn '); 
        }
    }, {
        offset: '30px'

    });
     
      $('.row').waypoint(function(direction) {
        $('.col').addClass('animated pulse'); 
    }, {
        offset: '60%'
    });



    $('#send').click(function () {

        var details = {
            name : $('#name').val(),
            email : $('#email').val(),
            tel : $('#tel').val(),
            query : $('#query').val(),
            msg : $('#msg').val()
        }

        console.log(details);

        $.post({
            url: '/contact',
            data: details,
            success : function (data) {
                console.log(data);
            }
        })


    })
    
     
     
     
     
     
});
            