$(function() {
    
    $('.header__btn').on('click', function() {
        $('.rightside-menu').removeClass('rightside-menu--close')
    });

    $('.rightside-menu__close').on('click', function() {
        $('.rightside-menu').addClass('rightside-menu--close')
    });

    $('.header__btn-menu').on('click', function() {
        $('.menu').toggleClass('menu--open')
    });

    if($(window).width() < 860) {
        $('.work__item--measurements').appendTo($('.work__items-box'))
    }

    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true
    });

    $('.contact-slider').slick({
        slidesToShow: 10,
        slidesToScroll: 10,
        dots: true,
        arrows: false,
        responsive: [
            {
              breakpoint: 1700,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 8,
              }
            },
            {
              breakpoint: 1520,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
            {
              breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                    arrows: true
                  }
              },
              {
                breakpoint: 500,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true
                  }
              }
          ]
    });

    $('.article__slider-box').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true
    });

    var mixer = mixitup('.gallery__inner', {
        load: {
            filter: '.bedroom'
        }
    })
});

//4:20