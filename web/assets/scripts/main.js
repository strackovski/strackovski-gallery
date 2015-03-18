/*global $, window*/
/*jshint strict:false */

var locale = $('body').attr('data-locale');
console.log(locale);
function changeHistory(params, title, url) {
    manualStateChange = false;
    //History.pushState({params: params}, title, '/strackovski-com' + url);
    History.pushState({params: params}, title, '/' + locale + url);
}

function replaceHistory(params, title, url) {
    manualStateChange = false;
    // History.replaceState({params: params}, title, '/strackovski-com' + url);
    History.replaceState({params: params}, title, '/' + locale + url);
}

var noAnim = false;

function handleStateChange() {
    var State = History.getState();
    if (manualStateChange === true) {
        var url = State.url.substr(State.url.lastIndexOf('/'), State.url.length);
        noAnim = true;
        if (url === '/about') {
            $('.mobile-menu .go-about').click();
        } else if (url === '/gallery') {
            $('.mobile-menu .go-gallery').click();
        } else if (url === '/home') {
            $('.mobile-menu .go-home').click();
        }
    }
    manualStateChange = true;
}

var manualStateChange = true;

var History = window.History;

var old_header_overlay, new_header_overlay,
    old_bg, new_bg,
    old_content, new_content,
    old_header, new_header,
    brushIt, brush,
    old_stamp, new_stamp,
    footer, f2,
    mobilecheck;

$(window).load(function () {
  /*  $.preloadImages = function() {
        for (var i = 0; i < arguments.length; i++) {
            var x = $("<img />").attr("src", arguments[i]);
        }
    };
    */

    function preloadImages() {
        var newImages = [], loadedImages = 0;
        var argLength = arguments.length;

        function imageLoad() {
            loadedImages++;

            if(loadedImages === argLength-1) {
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
        '/web/assets/images/arrow2.png',
        '/web/assets/images/arrows.png',
        '/web/assets/images/behance.png',
        '/web/assets/images/bg1-4.png',
        '/web/assets/images/bg1-brush.png',
        '/web/assets/images/bg1-header.png',
        '/web/assets/images/bg2-6.png',
        '/web/assets/images/bg2-header.png',
        '/web/assets/images/dama1.jpg',
        '/web/assets/images/dama2.jpg',
        '/web/assets/images/gent1.jpg',
        '/web/assets/images/gent2.jpg',
        '/web/assets/images/logo-stamp.png',
        '/web/assets/images/logo-stamp2.png',
        '/web/assets/images/sig-1.png',
        '/web/assets/images/sig-1-bb.png',
        '/web/assets/images/sig-2.png',
        '/web/assets/images/ss-spinner.png',
        '/web/assets/images/txt-about-b.png',
        '/web/assets/images/txt-about-gg.png',
        '/web/assets/images/txt-author-b.png',
        '/web/assets/images/txt-contact-b.png',
        '/web/assets/images/txt-contact-g.png',
        '/web/assets/images/txt-gallery-b.png',
        '/web/assets/images/txt-gallery-bb.png',
        '/web/assets/images/txt-gallery-g.png'
    );
});

function removeNav() {
    $('.ca-nav').addClass('hide-nav');
}

window.mobilecheck = function() {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|go-about(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function removeLoader() {
    if (mobilecheck()) {
        mobilecheck = 1;
        removeNav();
    } else {
        mobilecheck = 0;
    }
    setTimeout(function() {
        $('.first-shadow').fadeOut(function () {
            $('.first-shadow').remove();
        });
    },900);
}

$(document).ready(function() {
    History.Adapter.bind(window, 'statechange', handleStateChange);

    var att = $('body')[0].getAttribute('data-path');
    replaceHistory({}, att, '/' + att);

    window.scrollTo(0, 0);
    $('#ca-container').contentcarousel();

    footer = $('footer');
    brush = $('.brush');

    /*
    $('#contact-form .btn').on('click', function(e){
        e.preventDefault();
        console.log('ffga');

        $.ajax({
            url: $('#contact-form').attr('action'),
            method: 'POST',
            data: {
                'action': 'contact',
                'include_featured': 1,
                'contact_email': $('#contact_email').val(),
                'contact_name': $('#contact_name').val(),
                'contact_msg': $('#contact_msg').val()
            }
        })
            .done(function(data){
                console.log(data);
            })
    });

*/

    $('.ca-wrapper').on('swiperight', function (e) {
        $('body').find('.ca-nav-prev').click();
    });
    $('.ca-wrapper').on('swipeleft', function (e) {
        $('body').find('.ca-nav-next').click();
    });

    $('.nav-open').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('expanded');
        $('.nav-open').toggleClass('opened');
    });

    // open popups: legal, contact, signup
    $('.go-popup').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            popup;

        if ($this.hasClass('go-legal')) {
            popup = $('.legal-modal');
        } else if ($this.hasClass('go-contact')) {
            popup = $('.contact');
        } else {
            popup = $('.signup');
            $this.addClass('fadeUp');
            setTimeout(function () {
                $('.shadow').fadeIn(200);
                popup.fadeIn(200);
                popup.addClass('shown');
            },200);
            return;
        }

        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
        $('.shadow').fadeIn(300);
        setTimeout(function () {
            popup.addClass('shown');
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 150);
        }, 200);

    });

    $(document).on('keyup', function (e) {
        if ($('.form-style').hasClass('shown') || $('.legal-modal').hasClass('shown')){
            if (e.keyCode == 27) {
                $('.close-popup').click();
            }
        }
    });

    // close popups
    $('body').on('click', '.close-form', function (e) {
        e.preventDefault();
        $('.close-contact').click();
    });

    $('.close-popup').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            popup,
            form,
            fade;
        if ($this.hasClass('close-signup')) {
            popup = $('.signup');
            fade = 1;
            form = $('#signup-form');
        } else if ($this.hasClass('close-contact')) {
            popup = $('.contact');
            form = $('#contact-form');
        } else {
            popup = $('.legal-modal');
        }

        if (fade) {
            popup.fadeOut(200);
        }
        popup.removeClass('shown');

        setTimeout(function () {
            if (form) {
                form[0].reset();
            }
            if ($('.warned').length) {
                $('.warned').removeClass('warned');
            }
            if ($('.fadeUp').length) {
                $('.fadeUp').removeClass('fadeUp');
            }
            $('.shadow').fadeOut(200);
        }, 200);
    });

    // forms
    var contactForm = $('#contact-form');
    $('#contact-form .btn').click(function (e) {
        e.preventDefault();
        var name = $('#contact_name'),
            email = $('#contact_email'),
            msg = $('#contact_msg'),
            nameVal = name.val(),
            emailVal = email.val(),
            msgVal = msg.val();

        if(emailVal && isValidEmailAddress(emailVal) && nameVal && msgVal) {
            $.ajax({
                url: $('#contact-form').attr('action'),
                beforeSend: function( xhr ) {
                    $('.contact .sending').css({opacity: 1});
                },
                method: 'POST',
                data: {
                    'action': 'contact',
                    'include_featured': 1,
                    'contact_email': emailVal,
                    'contact_name': nameVal,
                    'contact_msg': msgVal
                }
            })
                .done(function( data ) {
                    console.log(data)
                    $('.contact-success').addClass('show-msg');
                    $('.contact .sending').css({opacity: 0});
                    $('.warned').removeClass('warned');

                    setTimeout(function () {
                        $('.contact-success').removeClass('show-msg');
                        $('.close-contact').click();
                        contactForm[0].reset();
                    }, 4000);
                })
                .error(function (error) {
                    $('.contact-fail').addClass('show-msg');
                    $('.contact .sending').css({opacity: 0});
                    $('.warned').removeClass('warned');

                    setTimeout(function () {
                        $('.contact-fail').removeClass('show-msg');
                    }, 4000);
                });
        } else {
            if (!emailVal) {
                email.addClass('warned');
            } else if (!isValidEmailAddress(emailVal)) {
                email.addClass('warned');
            } else {
                email.removeClass('warned');
            }
            if (!nameVal) {
                name.addClass('warned');
            } else {
                name.removeClass('warned');
            }
            if (!msgVal) {
                msg.addClass('warned');
            } else {
                msg.removeClass('warned');
            }
        }
    });

    var form = $('#signup-form');
    form.submit(function (e) {
        e.preventDefault();

        var email = $('#user_email'),
            emailVal = email.val();

        if(emailVal && isValidEmailAddress(emailVal)) {
            $.ajax({
                url: "http://haisdhiashdiasd.com",
                beforeSend: function( xhr ) {
                    $('.signup .sending').css({opacity: 1});
                }
            })
                .done(function( data ) {
                    $('.sub-success').addClass('show-msg');
                    $('.signup .sending').css({opacity: 0});
                    $('.warned').removeClass('warned');

                    setTimeout(function () {
                        $('.sub-success').removeClass('show-msg');
                        $('.close-signup').click();
                    }, 4000);

                })
                .error(function (error) {
                    $('.sub-fail').addClass('show-msg');
                    $('.signup .sending').css({opacity: 0});
                    $('.warned').removeClass('warned');

                    setTimeout(function () {
                        $('.sub-fail').removeClass('show-msg');
                    }, 4000);
                });
        } else {
            email.addClass('warned');
        }
    });

    // navigation links
    $('.go').click(function (e) {
        e.preventDefault();

        var $this = $(this);
        if ($this.closest('li').hasClass('active')){
            return;
        }

        $('.head0 .inner-header .active').removeClass('active');
        $this.closest('li').addClass('active');

        $('footer .go').closest('.active').removeClass('active');
        $('.mobile-nav .go').closest('.active').removeClass('active');

        if($this.closest('div').hasClass('mobile-menu')) {
            $this.closest('li').addClass('active').siblings().removeClass('active');
        }
        else {
            $('.mobile-menu li').removeClass('active');
            if ($this.hasClass('go-home')) {
                if ($('body')[0].getAttribute('data-path') !== 'home') {
                    $('body').attr('data-path', 'home');
                }
                $('.mobile-menu a.go-home').closest('li').addClass('active');
            } else if ($this.hasClass('go-gallery')) {
                if ($('body')[0].getAttribute('data-path') !== 'gallery') {
                    $('body').attr('data-path', 'gallery');
                }
                $('.mobile-menu a.go-gallery').closest('li').addClass('active');
                $('footer a.go-gallery').closest('li').addClass('active');
            } else if ($this.hasClass('go-about')) {
                if ($('body')[0].getAttribute('data-path') !== 'about') {
                    $('body').attr('data-path', 'about');
                }
                $('.mobile-menu a.go-about').closest('li').addClass('active');
                $('footer a.go-about').closest('li').addClass('active');
                $('.more').css({opacity: 0});
                if(noAnim) {
                    centerArrow();
                } else {
                    setTimeout(function () {
                        centerArrow();
                    }, 1800);
                }
            }
            var att = $('body')[0].getAttribute('data-path');
            changeHistory({}, att, '/' + att);
        }

        $('header a').addClass('no-click');
        $('.mobile-menu a').addClass('no-click');
        var li = $this.closest('li');
        old_content = $('.shown-con');

        if($this.hasClass('go-home')) {
            $('.ca-nav').remove();
            $('#ca-container').contentcarousel();
            if (mobilecheck === 1) {
                removeNav();
            }
            $('.mobile-nav .go-home').closest('li').addClass('active');
        }
        new_bg = $('.bg1');

        if ($this.hasClass('go-home')) {
            new_content = $('.con0');
        } else if ($this.hasClass('go-gallery')) {
            new_content = $('.con1');
        } else {
            new_content = $('.con2');
        }

        changeContent();

        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
    });

    $('#myModal').on('shown.bs.modal', function(){
        setTimeout(function () {
            centerModal();
        },1);
    });

    // modal functions
    var currentElement;
    $('.preview').on('click', function(){
        var src = $(this).parent('.thumb').find('img').attr('src');
        currentElement = $(this);
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') === '' || currentElement.attr('data-title') === undefined) {
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        $('#myModal').modal();
    });

    $('.modal-next').on('click', function(){
        currentElement = currentElement.parents('.col-sm-3').next().find('.preview');
        var src = currentElement.parents('.thumb').find('img').attr('src');

        if(src === undefined || src === '') {
            currentElement = $('.con1 .row .col-sm-3').first().find('.preview');
            src = currentElement.parents('.thumb').find('img').attr('src');
        }
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') === '' || currentElement.attr('data-title') === undefined) {
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        setTimeout(function () {
            centerModal();
        },1);
    });

    $('.modal-prev').on('click', function(){
        currentElement = currentElement.parents('.col-sm-3').prev().find('.preview');
        var src = currentElement.parents('.thumb').find('img').attr('src');

        if (src === undefined || src === '') {
            currentElement = $('.con1 .row .col-sm-3').last().find('.preview');
            src = currentElement.parents('.thumb').find('img').attr('src');
        }
        $('.modal-body').html('<img src="'+src+'" alt="img" />');
        if(currentElement.attr('data-title') === '' || currentElement.attr('data-title') === undefined) {
            $('.modal-footer').find('.title').html('/');
        } else {
            $('.modal-footer').find('.title').html(currentElement.attr('data-title'));
        }
        centerModal();

    });

    // About section - author, work toggle
    $('.more').on('click', function (e) {
        var $this = $(this);
        $this.addClass('no-click');
        $this.toggleClass('turned');
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

});

$(window).resize(function () {
    if($('body').hasClass('modal-open')) {
        centerModal();
    }
    
    if ($('.about-section').is(':visible')) {
        centerArrow();
    }

    if ($('.con0').hasClass('shown-con')) {
        $('.ca-nav').remove();
        $('#ca-container').contentcarousel();
        if(mobilecheck === 1) {
            removeNav();
        }
    }

    var win = $(window);
    if (win.width() > 700 && $('body').hasClass('expanded')) {
        $('.nav-open').click();
    }
});

function changeContent() {
    if (noAnim) {
        old_content.removeClass('shown-con');
        new_content.addClass('shown-con');
        $('header a').removeClass('no-click');
        $('.mobile-menu a').removeClass('no-click');
    } else {
        old_content.addClass('zoomOut');
        footer.addClass('fadeOut');

        setTimeout(function () {
            old_content.removeClass('zoomOut shown-con');
            window.scrollTo(0, 0);
            new_content.addClass('zoomInAndShow');
        }, 500);

        setTimeout(function() {
            new_content.removeClass('zoomInAndShow').addClass('shown-con');
            footer.addClass('fadeIn').removeClass('fadeOut');
            $('header a').removeClass('no-click');
            $('.mobile-menu a').removeClass('no-click');
        }, 1000);
    }
    noAnim = false;
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
}

function centerArrow() {
    var more = $('.more');
    if ($(window).width() > 700) {
        var aboutSection = $('.about-section'),
            aboutHeight = aboutSection.outerHeight();
        var moreHeight = 63;

        var top = aboutHeight/2 - moreHeight/2;
        more.css({top: top}).animate({opacity: 1}, 400);
    }
    else {
        more.css({top: 0, opacity: 1});
    }
}

