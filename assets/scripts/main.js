var old_header_overlay,
    new_header_overlay;

var old_bg,
    new_bg;

var old_content,
    new_content;

var old_header,
    new_header;

var brushIt,
    brush,
    f2;

var old_stamp,
    new_stamp;

var footer;

var mobileCheck;

$(window).load(function () {
    $.preloadImages = function() {
        for (var i = 0; i < arguments.length; i++) {
            var x = $("<img />").attr("src", arguments[i]);
            console.log('image')
        }
    };

   // $.preloadImages('assets/images/gent1.jpg','assets/images/gent2.jpg');


    function preloadImages() {
        var newImages = [], loadedImages = 0;
        var argLength = arguments.length;

        function imageLoad() {
            loadedImages++;

            if(loadedImages == argLength-1) {
                removeLoader();
            }
        }

        for (var i = 0; i < arguments.length; i++) {
            newImages[i] = new Image();
            newImages[i].src = arguments[i];
            newImages[i].onload = function () {
                imageLoad();
            };
            newImages[i].onerror = function () {
                imageLoad();
            };
        }
    }

    preloadImages(
        'assets/images/arrow2.png',
        'assets/images/arrows.png',
        'assets/images/behance.png',
        'assets/images/bg1-4.png',
        'assets/images/bg1-brush.png',
        'assets/images/bg1-header.png',
        'assets/images/bg2-6.png',
        'assets/images/bg2-header.png',
        'assets/images/dama1.jpg',
        'assets/images/dama2.jpg',
        'assets/images/gent1.jpg',
        'assets/images/gent2.jpg',
        'assets/images/logo-stamp.png',
        'assets/images/logo-stamp2.png',
        'assets/images/sig-1.png',
        'assets/images/sig-1-bb.png',
        'assets/images/sig-2.png',
        'assets/images/ss-spinner.png',
        'assets/images/txt-about-b.png',
        'assets/images/txt-about-gg.png',
        'assets/images/txt-author-b.png',
        'assets/images/txt-contact-b.png',
        'assets/images/txt-contact-g.png',
        'assets/images/txt-gallery-b.png',
        'assets/images/txt-gallery-bb.png',
        'assets/images/txt-gallery-g.png'
    );


});

function removeNav() {
    $('.ca-nav').addClass('hide-nav');
}


window.mobilecheck = function() {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

var mobilecheck;

function removeLoader() {
    if (mobilecheck() == 1) {
        mobilecheck = 1;
        removeNav();
    } else {
        mobilecheck = 0;

    }
    setTimeout(function() {
        $('.first-shadow').fadeOut(function () {
            $('.first-shadow').remove();
        })
    },900)

}



$(document).ready(function() {

    $('.ca-wrapper').on('swiperight', function (e) {
        $('body').find('.ca-nav-prev').click();
    });

    $('.ca-wrapper').on('swipeleft', function (e) {
        $('body').find('.ca-nav-next').click();
    });

    var animating;
    window.scrollTo(0, 0);
    $('#ca-container').contentcarousel();
    footer = $('footer');

    $('.nav-open').on('click', function (e) {
        e.preventDefault();
        if (animating == 1) {
            return;
        }
        $('body').toggleClass('expanded');
        $('.nav-open').toggleClass('opened');

        /*
        var line = $('.line')
        if (line.hasClass('active')) {
            animating = 1;
            line.addClass('backwards');

            line.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    line.removeClass('backwards active');
                });

            $('.mobile-menu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                animating = 0;
            })
        }

        else {

            line.toggleClass('active');
            animating = 1;

            line.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {

                });
            $('.mobile-menu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {

                animating = 0;
            })
        }
        */

    });


    var contactForm = $('#contact-form');
    contactForm.submit(function (e) {
        e.preventDefault();
        var name = $('#contact_name').val();
        var email = $('#contact_email').val();
        var msg = $('#contact_msg').val();


        if(email && isValidEmailAddress(email) && name && msg) {
            $.ajax({
                url: "http://haisdhiashdiasd.com",
                beforeSend: function( xhr ) {
                    //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                    $('.contact form').replaceWith('<span class="msg">Processing...</span>')

                }
            })
                .done(function( data ) {

                })
                .error(function (error) {
                    setTimeout(function () {
                        $('.contact .msg').html('Thank you for your message! We will get back to you as soon as possible.');
                        $('.contact').append('<a href="#" class="btn btn-default close-form">Close</a>')
                    }, 2000)
                })


        } else {
            contactForm.addClass('errors');
        }
    });


    var form = $('#signup-form');
    form.submit(function (e) {
        e.preventDefault();

        var email = $('#user_email').val();

        if(email && isValidEmailAddress(email)) {
            $.ajax({
                url: "http://haisdhiashdiasd.com",
                beforeSend: function( xhr ) {
                    //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                    $('.signup form').replaceWith('<span class="msg">Processing...</span>')

                }
            })
                .done(function( data ) {
                    console.log('data')

                    if ( console && console.log ) {
                        console.log( "Sample of data:", data.slice( 0, 100 ) );
                    }
                })
                .error(function (error) {
                    setTimeout(function () {
                        $('.signup .msg').html('Thank you for subscribing! You will be notified by email when new art works are added to the gallery.');
                        $('.signup').append('<a href="#" class="btn btn-default close_signup">Close</a>')
                    }, 2000)
                })


        } else {
            form.addClass('errors');
        }
    });

    $('.open_signup').on('click', function (e) {
        e.preventDefault();

        $(this).addClass('fadeUp');

        setTimeout(function () {
            $('.shadow').fadeIn(200);
            $('.signup').fadeIn(200);
        },200);

    });

    $('body').on('click', '.close_signup', function (e) {
        e.preventDefault();
        $('.fadeUp').removeClass('fadeUp');
        $('#signup-form').removeClass('errors');
        $('.shadow').fadeOut(200);
        $('.signup').fadeOut(200);
    });


    brush = $('.brush');
    $('.go').click(function (e) {
        e.preventDefault();

        var $this = $(this);
        if ($this.closest('li').hasClass('active')) return;

        if($this.closest('div').hasClass('mobile-menu')) {
            $('.mobile-nav .logo.go').closest('li').removeClass('active');
            $this.closest('li').addClass('active').siblings().removeClass('active');
        }
        else {
            $('.mobile-menu li').removeClass('active');
            if ($this.hasClass('t0')) {
                $('.mobile-menu a.t0').closest('li').addClass('active');
            } else if ($this.hasClass('t1')) {
                $('.mobile-menu a.t1').closest('li').addClass('active');
            } else if ($this.hasClass('t2')) {
                $('.mobile-menu a.t2').closest('li').addClass('active');
            }
        }

        $('header a').addClass('no-click');
        $('.mobile-menu a').addClass('no-click');

        var li = $this.closest('li');
        old_header_overlay = $('.shown-ho');
        old_bg = $('.shown-bg');
        old_content = $('.shown-con');
        old_header = $('.shown-header');

        old_stamp = $('.shown-stamp');

        if ($this.hasClass('t0') || $this.hasClass('t1')) {
            if($this.hasClass('t0')) {
                $('.ca-nav').remove();
                $('#ca-container').contentcarousel();
                if (mobilecheck == 1) {
                    removeNav();
                }
                $('.mobile-nav .t0').closest('li').addClass('active');
            }
            f2 = 0;
            brushIt = 1;
            new_header_overlay = $('.ho1');
            new_bg = $('.bg1');
            new_stamp = $('.stamp1');

            if ($this.hasClass('t0')) {
                new_content = $('.con0');
                new_header = $('.head0');
            } else if ($this.hasClass('t1')) {
                new_content = $('.con1');
                new_header = $('.head1');
            }

            if ($('.ho1').hasClass('shown-ho')) {
                changeContent();

            } else {
                changeEverything();

            }
        }

        else {
            new_stamp = $('.stamp2');
            new_header_overlay = $('.ho2');
            new_bg = $('.bg2');
            new_content = $('.con2');
            new_header = $('.head2');
            brushIt = 0;
            f2 = 1;
            changeEverything();
        }

        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
    });

    $('#myModal').on('shown.bs.modal', function(){
        setTimeout(function () {
            centerModal();
        },1)
    });

    var currentElement;
    $('.preview').on('click', function(){
        var src = $(this).parent('.thumb').find('img').attr('src');
        currentElement = $(this);
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') == '' || currentElement.attr('data-title') == undefined) {
            console.log(currentElement.attr('data-title'));
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        $('#myModal').modal();
    });

    $('.modal-next').on('click', function(){
        currentElement = currentElement.parents('.col-sm-3').next().find('.preview');
        var src = currentElement.parents('.thumb').find('img').attr('src');

        if(src == undefined || src == '') {
            currentElement = $('.con1 .row .col-sm-3').first().find('.preview');
            src = currentElement.parents('.thumb').find('img').attr('src');
        }
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') == '' || currentElement.attr('data-title') == undefined) {
            console.log(currentElement.attr('data-title'));
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        //$('.modal-content').css('margin-top', '0px');
        setTimeout(function () {
            centerModal();
        },1)
    });

    $('.modal-prev').on('click', function(){
        currentElement = currentElement.parents('.col-sm-3').prev().find('.preview');
        var src = currentElement.parents('.thumb').find('img').attr('src');

        if (src == undefined || src == '') {
            currentElement = $('.con1 .row .col-sm-3').last().find('.preview');
            src = currentElement.parents('.thumb').find('img').attr('src');
        }
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') == '' || currentElement.attr('data-title') == undefined) {
            console.log(currentElement.attr('data-title'));
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        centerModal();

    });

    $('.more').on('click', function (e) {
        var $this = $(this);
        $this.addClass('no-click');
        e.preventDefault();
        $('.shown-section').addClass('slideOut');
        setTimeout(function () {
            $('.shown-section').removeClass('shown-section slideOut').addClass('temp-section');
            $('.hidden-section').addClass('slideIn');

        }, 500);

        setTimeout(function () {
            $('.hidden-section').addClass('shown-section').removeClass('hidden-section slideIn');
            $('.temp-section').removeClass('temp-section').addClass('hidden-section');
            $this.removeClass('no-click');
        }, 1000);
    });

    $('.t3').on('click', function (e) {
        e.preventDefault();

        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
        $('.shadow').fadeIn(300);
        setTimeout(function () {
            $('.contact').addClass('shown');
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 150);
        }, 200);
    });

    $('.close-contact').on('click', function () {
        $('.contact').removeClass('shown');
        setTimeout(function () {
            $('.shadow').fadeOut(100);
        }, 500);
    });

    $('body').on('click', '.close-form', function () {
        $('.close-contact').click();
    })
});

$(window).resize(function () {
    if($('body').hasClass('modal-open')) {
        centerModal();
    }

    if ($('.con0').hasClass('shown-con')) {
        $('.ca-nav').remove();
        $('#ca-container').contentcarousel();
        if(mobilecheck == 1) {
            removeNav();
        }
    }

    var win = $(window);
    if (win.width() > 700 && $('body').hasClass('expanded')) {
        $('.nav-open').click();
    }
});

function changeContent() {

    old_content.addClass('zoomOut');
    footer.addClass('fadeOut');
    old_header.addClass('fadeOut');
    new_header.addClass('fadeInAndShow');

    setTimeout(function () {
        old_content.removeClass('zoomOut shown-con');
        window.scrollTo(0, 0);
        //new_content.addClass('fadeInAndShow');
        new_content.addClass('zoomInAndShow');
        old_header.removeClass('fadeOut shown-header');
        new_header.removeClass('fadeInAndShow').addClass('shown-header');
    }, 500);

    setTimeout(function() {
        //new_content.removeClass('fadeInAndShow').addClass('shown-con');
        new_content.removeClass('zoomInAndShow').addClass('shown-con');
        footer.addClass('fadeIn').removeClass('fadeOut');
        $('header a').removeClass('no-click');
        $('.mobile-menu a').removeClass('no-click');
    }, 1000);



}

function changeEverything() {

    console.log('changeEverything');


    // 1
    old_content.addClass('zoomOut');
    footer.addClass('fadeOut');

    if (brushIt == 0) {
        brush.addClass('fadeOut');
    } else {

    }
    old_header_overlay.addClass('fadeOut');

    // 2
    setTimeout(function () {
        old_bg.addClass('fadeOut');
        window.scrollTo(0, 0);

    },500);

    // 3
    setTimeout(function () {
        old_bg.removeClass('fadeOut shown-bg');
        new_bg.addClass('fadeInAndShow');
        old_header.addClass('fadeOut');
        new_header.addClass('fadeInAndShow');

    }, 1000);

    setTimeout(function () {
        new_bg.addClass('shown-bg').removeClass('fadeInAndShow');
        if (brushIt == 0) {
            brush.removeClass('fadeOut shown-brush');
        }
        else {
            brush.addClass('fadeIn');
        }
        old_content.removeClass('zoomOut shown-con');
        //new_content.addClass('fadeInAndShow');
        new_content.addClass('zoomInAndShow');

        old_header.removeClass('fadeOut shown-header');
        new_header.removeClass('fadeInAndShow').addClass('shown-header');

        new_header_overlay.addClass('fadeIn');
        old_header_overlay.removeClass('fadeOut shown-ho');


    }, 1500);

    setTimeout(function () {
        //new_content.removeClass('fadeInAndShow').addClass('shown-con');
        new_content.removeClass('zoomInAndShow').addClass('shown-con');
        new_header_overlay.removeClass('fadeIn').addClass('shown-ho');

        if (brushIt == 1) {
            brush.removeClass('fadeIn').addClass('shown-brush');
        }
        footer.addClass('fadeIn').removeClass('fadeOut');

        if(f2 == 0) {
            footer.removeClass('f2');
        } else {
            footer.addClass('f2');
        }
        old_stamp.removeClass('shown-stamp');
        new_stamp.addClass('shown-stamp');
    },2000);

    setTimeout(function () {
        footer.removeClass('fadeIn');
        $('header a').removeClass('no-click');
        $('.mobile-menu a').removeClass('no-click');
    }, 2500);


}


function centerModal() {
    var modalContentHeight = $('.modal-content').height() + 80;
    var windowHeight = $(window).height();
    var m = (windowHeight - modalContentHeight) / 2;
    $('.modal-content').css('margin-top', m);
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};