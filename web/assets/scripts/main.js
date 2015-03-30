/*!
 * Stevo Stračkovski Gallery Web Site (http://www.strackovski.com)
 * Copyright 2015 Vladimir Stračkovski
 * All rights reserved (https://github.com/strackovski-art-www)
 */
var new_content, old_content, mobilecheck;
var noAnim = false;
var locale = $('body').attr('data-locale');

/**
 * Manage history change
 *
 * @param params
 * @param title Page title
 * @param url Page URL address
 */
function changeHistory(params, title, url) {
    manualStateChange = false;
    History.pushState({params: params}, title, '/' + locale + url);
}

/**
 * Manage history replacement
 *
 * @param params
 * @param title Page title
 * @param url Page URL address
 */
function replaceHistory(params, title, url) {
    manualStateChange = false;
    History.replaceState({params: params}, title, '/' + locale + url);
}

/**
 * Manage history state change
 */
function handleStateChange() {
    var State = History.getState();
    if (manualStateChange === true) {
        var url = State.url.substr(State.url.lastIndexOf('/'), State.url.length);
        noAnim = true;
        if (url === '/about') {
            $('.mobile-menu .nav-about').click();
            centerArrow();
        } else if (url === '/gallery') {
            $('.mobile-menu .nav-gallery').click();
        } else if (url === '/home') {
            $('.mobile-menu .nav-home').click();
            $(window).resize();
        }
    } else {
    }
    manualStateChange = true;
}

var manualStateChange = true;
var History = window.History;

$(window).load(function () {
    /**
     * Image pre-loader
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
    $('.ca-container').contentcarousel();

    preloadImages(
        '/web/assets/images/about-a.png',
        '/web/assets/images/arrow2.png',
        '/web/assets/images/arrows.png',
        '/web/assets/images/author.png',
        '/web/assets/images/behance.png',
        '/web/assets/images/bg-canvas.png',
        '/web/assets/images/gallery-a.png',
        '/web/assets/images/logo-a.png',
        '/web/assets/images/logo-stamp.png',
        '/web/assets/images/ss-spinner.png',
        '/web/assets/images/work.png'
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

/**
 * Remove AJAX loader/spinner on load complete
 */
function removeLoader() {
    var modalControls = $('.modal-controls');
    if (mobilecheck()) {
        mobilecheck = 1;
        $('body').addClass('body-mobile');
        removeNav();
        if (!modalControls.hasClass('hidden-controls')) {
            modalControls.addClass('hidden-controls');
        }
    } else {
        mobilecheck = 0;
    }
    setTimeout(function() {
        $('.first-shadow').fadeOut(function () {
            $('.first-shadow').remove();
        });
    },900);
}

$(document).ready(function () {
    $(window).resize();
    History.Adapter.bind(window, 'statechange', handleStateChange);

    var caWrapper = $('.ca-wrapper');
    var modalBody = $('.modal-body');
    var navOpen = $('.nav-open');
    var att = $('body')[0].getAttribute('data-path');

    replaceHistory({}, att.charAt(0).toUpperCase() + att.slice(1) + ' | Stevo Strackovski', '/' + att);
    window.scrollTo(0, 0);

    caWrapper.on('swiperight', function (e) {
        $('body').find('.ca-nav-prev').click();
    });
    caWrapper.on('swipeleft', function (e) {
        $('body').find('.ca-nav-next').click();
    });

    modalBody.on('swiperight', function () {
        $('.modal-prev').click();
    });

    modalBody.on('swipeleft', function () {
        $('.modal-next').click();
    });

    navOpen.on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('expanded');
        $('.nav-open').toggleClass('opened');
    });

    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.closest('li').hasClass('active')) return;

        $('.desktop-menu').addClass('no-click');
        $('.mobile-menu').addClass('no-click');
        $('.mobile-nav').addClass('no-click');

        $('.mobile-menu .active').removeClass('active');
        $('.desktop-menu .active').removeClass('active');
        $('.mobile-nav .active').removeClass('active');
        $('footer .active').removeClass('active');
        // add active class
       // $this.closest('li').addClass('active').siblings().removeClass('active');

        if ($this.hasClass('nav-home')) {
            $('.desktop-menu .nav-home').closest('li').addClass('active');
            $('.mobile-menu .nav-home').closest('li').addClass('active');
            $('.mobile-nav .nav-home').closest('li').addClass('active');
            if ($('body')[0].getAttribute('data-path') !== 'home') {
                $('body').attr('data-path', 'home');
            }

        } else if ($this.hasClass('nav-gallery')) {
            $('.desktop-menu .nav-gallery').closest('li').addClass('active');
            $('.mobile-menu .nav-gallery').closest('li').addClass('active');
            $('footer .nav-gallery').closest('li').addClass('active');
            if ($('body')[0].getAttribute('data-path') !== 'gallery') {
                $('body').attr('data-path', 'gallery');
            }

        } else if ($this.hasClass('nav-about')) {
            $('.desktop-menu .nav-about').closest('li').addClass('active');
            $('.mobile-menu .nav-about').closest('li').addClass('active');
            $('footer .nav-about').closest('li').addClass('active');
            if ($('body')[0].getAttribute('data-path') !== 'about') {
                $('body').attr('data-path', 'about');
            }

            $('.more').css({opacity: 0});
            if (noAnim) {
                centerArrow();
            } else {
                setTimeout(function () {
                    centerArrow();
                }, 1800);
            }
        }

        var att = $('body')[0].getAttribute('data-path');
        changeHistory({}, att.charAt(0).toUpperCase() + att.slice(1) + ' | Stevo Strackovski', '/' + att);

        old_content = $('.shown-content');
        if ($this.hasClass('nav-home')) {
            $('.ca-nav').remove();
            new_content = $('.content-1');
        } else if ($this.hasClass('nav-gallery')) {
            new_content = $('.content-2');
        } else if ($this.hasClass('nav-about')) {
            new_content = $('.content-3');
        }

        changeContent();
        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
    });

    // Modal functions
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
            currentElement = $('.content-2 .section-1 .row .col-sm-3').first().find('.preview');
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
            currentElement = $('.content-2 .section-1 .row .col-sm-3').last().find('.preview');
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

    $('#myModal').on('shown.bs.modal', function(){
        setTimeout(function () {
            centerModal();
        },1);
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


    $('.show-signup').on('click', function (e) {
        $(this).addClass('btnFadeUp');
        e.preventDefault();
        setTimeout(function () {
            $('.shadow').fadeIn(300);
            $('.signup-box').addClass('shown');
        }, 100);

    });

    $('.show-legal').on('click', function (e) {
        e.preventDefault();
        $('.shadow').fadeIn(300);
        $('.legal-box').addClass('shown');
    });

    $('.show-disclaimer').on('click', function (e) {
        e.preventDefault();
        $('.shadow').fadeIn(300);
        $('.disclaimer-box').addClass('shown');
    });


    var form = $('#signup-form');
    form.submit(function (e) {
        form.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
        e.preventDefault();

        var email = $('#user_email'),
            emailVal = email.val();

        if(emailVal && isValidEmailAddress(emailVal)) {
            $.ajax({
                url: form.attr('action'),
                method: 'POST',
                data: {
                    'action': 'newsletter',
                    'include_featured': 1,
                    'subscribe_email': emailVal
                }
            })
                .done(function( data ) {
                    $('.signup-box').addClass('popup-success').removeClass('popup-fail');
                    $('.warned').removeClass('warned');
                    form.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
                })
                .error(function (error) {
                    $('.signup-box').addClass('popup-fail').removeClass('popup-success');
                    $('.warned').removeClass('warned');
                    form.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
                });
        } else {
            email.addClass('warned');
            $('.popup-box').removeClass('popup-success popup-fail');
            form.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
        }
    });

    // contact form
    var contactForm = $('#contact-form');
    contactForm.submit(function (e) {
        e.preventDefault();
        contactForm.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
        var name = $('#contact_name'),
            email = $('#contact_email'),
            msg = $('#contact_msg'),
            nameVal = name.val(),
            emailVal = email.val(),
            msgVal = msg.val();

        if(emailVal && isValidEmailAddress(emailVal) && nameVal && msgVal) {
            $.ajax({
                url: $('#contact-form').attr('action'),
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

                    $('.contact-box').addClass('popup-success').removeClass('popup-fail');
                    $('.warned').removeClass('warned');

                    contactForm.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');
                })
                .error(function (error) {
                    $('.contact-box').addClass('popup-fail').removeClass('popup-success');
                    $('.warned').removeClass('warned');
                    contactForm.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');

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
            $('.contact-box').removeClass('popup-success popup-fail');
            contactForm.find('.btn-default i.fa').toggleClass('fa-angle-right fa-spinner fa-spin');

        }
    });

    $('.close-popup').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $('#signup-form')[0].reset();
        $('#contact-form')[0].reset();
        var popupbox = $('.popup-box');
        $('.shadow').fadeOut(300);
        $('.show-signup').removeClass('btnFadeUp');

        if ($this.closest('.popup-box').hasClass('signup-box')) {
            $('.signup-box').addClass('fadeDown').removeClass('shown');
        } else {
            popupbox.removeClass('shown');
            console.log('removed shown')
            popupbox.scrollTop(300);
            
            console.log('scrolltop')
        }

        setTimeout(function () {
            popupbox.removeClass('popup-success popup-fail fadeDown');
            popupbox.find('.warned').removeClass('warned');

        }, 300);
    });

    $(document).on('keyup', function (e) {
        if ($('.popup-box').hasClass('shown') || $('.legal-modal').hasClass('shown')){
            if (e.keyCode == 27) {
                $('.popup-box.shown').find('.close-popup').click();
            }
        }
    });

    $('.nav-contact').on('click', function (e) {
        e.preventDefault();
        $('.shadow').fadeIn(300);
        window.scrollTo(0, 0);
        if ($('body').hasClass('expanded')) {
            $('.nav-btn').click();
        }
        $('.contact-box').addClass('shown');
        if (mobilecheck === 1) {
            $('.contact-box').addClass('contact-mobile');
        }
    });
});

function vertical_align() {
    if ($('.content-3').hasClass('shown-content')) {

        var header_height;
        var win_height = $(window).height(),
            win_width = $(window).width();

        if (win_width > 800) {
            header_height = $('.desktop-menu').height();
        } else {
            header_height = $('.mobile-nav').height();
        }

        var about_height = $('.content-3 .section-1').height() + 50;
        var footer_height = $('footer').height();
        var all_height = about_height + header_height + footer_height;

        if (win_height < all_height) {
            $('.content-3 .section-1').css('margin-top', '0px');
        } else {
            var marginTop = (win_height - all_height) / 2;
            $('.content-3 .section-1').css('margin-top', marginTop + 'px');
        }
    }

    if ($('.content-1').hasClass('shown-content')) {
        var header_height;
        var win_height = $(window).height(),
            win_width = $(window).width();

        if (win_width > 800) {
            header_height = $('.desktop-menu').height();
        } else {
            header_height = $('.mobile-nav').height();
        }

        var footer_height = $('footer').height(),
            section_height = $('.content-1 .section-1').height(),
            all_height = section_height + header_height + footer_height+70;

        if (win_height < all_height) {
            $('.content-1 .section-1').css('margin-top', '0px');
        } else {
            var marginTop = (win_height - all_height) / 2;
            $('.content-1 .section-1').css('margin-top', marginTop + 'px');
        }
    }
}

$(window).resize(function () {
    setTimeout(function () {
        vertical_align();
    }, 1);

    $('.ca-nav').remove();
    $('#ca-container').contentcarousel();
    if (mobilecheck === 1) {
        $('.ca-nav').addClass('hide-nav');
    }
    if($('body').hasClass('modal-open')) {
        centerModal();
    }

    if ($('.nav-about').closest('li').hasClass('active')) {
        centerArrow();
    }
});

function centerModal() {
    var modalContent = $('.modal-content');
    var modalContentHeight = modalContent.height() + 80;
    var windowHeight = $(window).height();
    var m = (windowHeight - modalContentHeight) / 2;
    modalContent.css('margin-top', m);
}

function centerArrow() {
    var more = $('.more');
    if ($(window).width() > 510) {
        var aboutSection = $('.about-section'),
            aboutHeight = aboutSection.outerHeight();
        var moreHeight = 63;

        var top = aboutHeight/2 - moreHeight/2;
        more.css({top: top}).animate({opacity: 1}, 1290);
    }
    else {
        more.css({top: 0, opacity: 1});
    }
}

function changeContent() {
    if (noAnim) {
        $(window).resize();
        old_content.removeClass('shown-content');
        new_content.addClass('shown-content');
        $('.desktop-menu').removeClass('no-click');
        $('.mobile-menu').removeClass('no-click');
        $('.mobile-nav').removeClass('no-click');
    } else {

        old_content.addClass('zoomOut');
        $('footer').addClass('fadeOut');

        setTimeout(function () {
            setTimeout(function () {
                $(window).resize();
            }, 510);
            old_content.removeClass('zoomOut shown-content');
            window.scrollTo(0, 0);
            new_content.addClass('zoomInAndShow');

            if (new_content.hasClass('content-1')) {
                $('.ca-container').contentcarousel();
                if (mobilecheck === 1) {
                    removeNav();
                }
            }
        }, 500);

        setTimeout(function () {
            new_content.removeClass('zoomInAndShow').addClass('shown-content');
            $('footer').addClass('fadeIn').removeClass('fadeOut');
            $('.desktop-menu').removeClass('no-click');
            $('.mobile-menu').removeClass('no-click');
            $('.mobile-nav').removeClass('no-click');
        }, 1000);
    }
    noAnim = false;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
