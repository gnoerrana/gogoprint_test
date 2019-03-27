require(['jquery', 'jquery.bootstrap', 'jquery.slick', 'jquery.select2', 'jquery.autocomplete'], function($) {
    // DOM ready
    $(function() {
        // This function is needed (even if empty) to force RequireJS to load Twitter Bootstrap and its Data API.
    });



    // ==== MediaQueries +
    var mediaQuery = function() {
        window.xsMedia = 480; //ExtraSmall Media
        window.smMedia = 768; //Small Media
        window.mdMedia = 992; //Medium Media
        window.lgMedia = 1200; //Large Media
        window.height = jQuery(window).height();
        window.width = jQuery(window).width();

    };
    // ==== MediaQueries -

    var openNav = function() {
        jQuery('.nav-bg').width(0);

        jQuery('.toggle-navigation span, .toggle-navigation-scroll span').text('Show Menu');
        jQuery('.wrapper-nav-left').addClass('process-hide');



        jQuery('.toggle-navigation i, .toggle-navigation-scroll i').attr({
            class: 'fa fa-arrow-right'
        });

        setTimeout(function() {
            jQuery('body').addClass('hide-link');
        }, 500);

        setTimeout(function() {
            jQuery('body').addClass('tighten');
            if (jQuery('.products-grid .product-item').length) {
                jQuery('.products-grid .product-item').removeClass('col-xs-5ths').addClass('col-md-2');
            }
        }, 900);

        if (jQuery('.home-store-carousel').length) {
            setTimeout(function() {
                jQuery('.home-store-carousel')[0].slick.refresh();
            }, 1000);
        }


    };
    var closeNav = function() {


        jQuery('body').removeClass('tighten');

        jQuery('.toggle-navigation i,.toggle-navigation-scroll i').attr({
            class: 'fa fa-arrow-left'
        });

        setTimeout(function() {
            jQuery('body').removeClass('hide-link');
        }, 500);

        setTimeout(function() {
            jQuery('.toggle-navigation span, .toggle-navigation-scroll span').text('Hide Menu');
            jQuery('.wrapper-nav-left').removeClass('process-hide');
            if (jQuery('.products-grid .product-item').length) {
                jQuery('.products-grid .product-item').addClass('col-xs-5ths').removeClass('col-md-2');
            }
            var navWidth = jQuery('.wrapper-nav-left').width();
            var navLeft = jQuery('.wrapper-nav-left').offset().left;
            jQuery('.nav-bg').width(navWidth + 50 + navLeft);
        }, 900);

        if (jQuery('.home-store-carousel').length) {
            setTimeout(function() {
                jQuery('.home-store-carousel')[0].slick.refresh();
            }, 1000);
        }


    };


    jQuery(document).ready(function($) {

        setTimeout(function() {
            var curretUrl = window.location.href;
            var storeId = jQuery('#current-store').text();
            jQuery(".inner-content a").each(function() {
               var attr = $(this).attr('href');

               if (typeof attr !== typeof undefined && attr !== false) {
                    var $this = jQuery(this);       
                   var _href = $this.attr("href"); 
                   $this.attr("href", _href + '/?___store='+ storeId );
                }
               console.log(storeId);
               
            });
        },300);


        jQuery('.navbar-nav .submenu').each(function() {
            var catBg = jQuery(this).attr('data-bgurl');
            jQuery(this).attr({
                'style': 'background-image:url(' + catBg + ')'
            });
        });

        if (jQuery('.nav.navbar-nav').length) {
            jQuery('.nav.navbar-nav a.dropdown-toggle').mouseover(function() {
                jQuery('.nav.navbar-nav .parent').removeClass('open');
                jQuery(this).parent().addClass('open');
            });
            jQuery('.nav.navbar-nav a.dropdown-toggle').on('click', function() {
                var url = jQuery(this).attr('href');
                window.location.href = url;
            });

            jQuery('.navbar-nav li').each(function() {
                var topRange = jQuery(this).position().top;
                var bottomRange = topRange + jQuery(this).outerHeight(true);
                var navHeight = jQuery('.navbar-nav').height() / 2;
                // jQuery(this).find('a').text(topRange + '('+navHeight+')');
                if (topRange > navHeight) {
                    jQuery(this).addClass('bottom-range');
                }

            });
        }

        if (jQuery('.breadcrumb').length) {
            var breadText = jQuery('.breadcrumb').html();
            jQuery('.breadcrumb-scroll').html('<ol class="breadcrumb">' + breadText + '</ol>');
        }

        if ($('.scroll-top-btn').length) {
            var scrollTrigger = 100, // px
                backToTop = function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('.scroll-top-btn').addClass('show');
                    } else {
                        $('.scroll-top-btn').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function() {
                backToTop();
            });
            $('.scroll-top-btn').on('click', function(e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }
        if ($('.toggle-navigation-scroll').length) {
            $('.toggle-navigation-scroll').on('click', function() {
                var onNavOpen = jQuery('body').is('.hide-link');
                if (onNavOpen == true) {
                    closeNav();
                } else {
                    openNav();
                }
            });
        }


        // get onsale category badge
        jQuery('.nav-sections .navbar-nav').find('span:contains("Up to")').addClass('onsale-badge');
        setTimeout(function() {
            jQuery('.onsale-badge').html(jQuery('.onsale-badge').text().replace(/-.*$/, '<span class="after">$&</span>').replace('-', ''));
        }, 1000);

        jQuery('.nav-sections .navbar-nav').find('span:contains("Flash Sale")').addClass('flash-badge');
        setTimeout(function() {
            jQuery('.flash-badge').html('Flash Sale <i class="fa fa-bolt"></i>');
        }, 1000);
        // get onsale category badge


        // Home Store select
        jQuery('.list-stores').select2({
            placeholder: 'Select an option'
        });

        // Toggle Navigation Left

        jQuery('.toggle-navigation').on('click', function() {
            var onNavOpen = jQuery('body').is('.hide-link');
            if (onNavOpen == true) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Toggle Navigation Left


        jQuery('.review-trigger').on('click', function() {
            jQuery('body').addClass('pull-review');
        });

        jQuery('.close-review').on('click', function() {
            jQuery('body').removeClass('pull-review');
        });


        jQuery('.home-store-carousel').slick({
            dots: true,
            arrows: false,
            autoplay: false
        });



        //  Catalog Quantity Spinner Start
        (function($) {
            jQuery('.qty-catalog input').keydown(function(e) {
                e.preventDefault();
                return false;
            });


            var minNumber = 1;
            var maxNumber = 100;
            idleTimer = null;
            idleState = false;
            idleWait = 2000;

            jQuery('.qty-catalog .btn:last-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');

                if (jQuery('input[data-input-id="' + inputId + '"]').val() == maxNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) + 1);
                    jQuery('[data-qty="qty-' + tgtId + '"]').val((parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10)) - parseInt(currentInput));
                    clearTimeout(idleTimer);
                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery('.tocart[data-id="tocart-' + tgtId + '"]').trigger('click');
                        }, 100);
                        idleState = true;
                    }, idleWait);
                }
            });

            jQuery('.qty-catalog .btn:first-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');



                if (jQuery('input[data-input-id="' + inputId + '"]').val() == minNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) - 1);
                    jQuery(inputInCart).keyup();
                    clearTimeout(idleTimer);

                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery(inputInCart).val(jQuery('input[data-input-id="' + inputId + '"]').val());
                            jQuery('#mini-cart li#item-' + tgtId).find('.update-cart-item').trigger('click');
                            jQuery('[data-qty="qty-' + tgtId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val() - parseInt(currentInput)));
                        }, 100);

                        idleState = true;
                    }, idleWait);
                }
            });
        })(jQuery);
        //  Catalog Quantity Spinner End

        //  Wishlist Quantity Spinner Start
        (function($) {
            jQuery('.qty-wishlist input').keydown(function(e) {
                e.preventDefault();
                return false;
            });


            var minNumber = 1;
            var maxNumber = 100;
            idleTimer = null;
            idleState = false;
            idleWait = 2000;

            jQuery('.qty-wishlist .btn:last-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');

                if (jQuery('input[data-input-id="' + inputId + '"]').val() == maxNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) + 1);
                    jQuery('[data-qty="qty-' + tgtId + '"]').val((parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10)) - parseInt(currentInput));
                    clearTimeout(idleTimer);
                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery('.tocart[data-id="tocart-' + tgtId + '"]').trigger('click');
                            // console.log( jQuery('.tocart[data-id="tocart-' + tgtId + '"]'));
                        }, 100);
                        idleState = true;
                    }, idleWait);
                }
            });

            jQuery('.qty-wishlist .btn:first-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');



                if (jQuery('input[data-input-id="' + inputId + '"]').val() == minNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) - 1);
                    jQuery(inputInCart).keyup();
                    clearTimeout(idleTimer);

                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery(inputInCart).val(jQuery('input[data-input-id="' + inputId + '"]').val());
                            jQuery('#mini-cart li#item-' + tgtId).find('.update-cart-item').trigger('click');
                            jQuery('[data-qty="qty-' + tgtId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val() - parseInt(currentInput)));
                        }, 100);

                        idleState = true;
                    }, idleWait);
                }
            });
        })(jQuery);
        //  Catalog Quantity Spinner End


        //  PDP Quantity Spinner Start
        (function($) {


            jQuery('.qty-pdp input').keydown(function(e) {
                e.preventDefault();
                return false;
            });


            var minNumber = 1;
            var maxNumber = 100;
            idleTimer = null;
            idleState = false;
            idleWait = 2000;

            jQuery('.qty-pdp .btn:last-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');

                if (jQuery('input[data-input-id="' + inputId + '"]').val() == maxNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) + 1);
                    jQuery('[data-qty="qty-' + tgtId + '"]').val((parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10)) - parseInt(currentInput));

                    clearTimeout(idleTimer);
                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery('.pdptocart[data-id="tocart-' + tgtId + '"]').trigger('click');
                        }, 100);

                        idleState = true;
                    }, idleWait);
                }
            });

            jQuery('.qty-pdp .btn:first-of-type').on('click', function() {
                var inputId = jQuery(this).attr('data-input');
                var tgtId = jQuery(this).attr('data-input').replace('input-item-', '');
                var currentInput = jQuery('[data-crQty="currentQty-item-' + tgtId + '"]').attr('data-value');
                var inputInCart = jQuery('#mini-cart li#item-' + tgtId).find('input');

                if (jQuery('input[data-input-id="' + inputId + '"]').val() == minNumber) {
                    return false;
                } else {
                    jQuery('input[data-input-id="' + inputId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val(), 10) - 1);
                    jQuery(inputInCart).keyup();
                    clearTimeout(idleTimer);

                    idleState = false;
                    idleTimer = setTimeout(function() {
                        setTimeout(function() {
                            jQuery(inputInCart).val(jQuery('input[data-input-id="' + inputId + '"]').val());
                            jQuery('#mini-cart li#item-' + tgtId).find('.update-cart-item').trigger('click');
                            jQuery('[data-qty="qty-' + tgtId + '"]').val(parseInt(jQuery('input[data-input-id="' + inputId + '"]').val() - parseInt(currentInput)));
                        }, 100);

                        idleState = true;
                    }, idleWait);
                }
            });
        })(jQuery);
        //  PDP Quantity Spinner End


        //  Global button Spinner Start
        (function($) {
            $('.spinner input').keydown(function(e) {
                e.preventDefault();
                return false;
            });
            var minNumber = 1;
            var maxNumber = 100;

            $('.spinner .btn:last-of-type').on('click', function() {
                if ($(this).closest('.qty-wrapper').find('input').val() == maxNumber) {
                    return false;
                } else {
                    $(this).closest('.qty-wrapper').find('input').val(parseInt($(this).closest('.qty-wrapper').find('input').val(), 10) + 1);
                }
            });
            $('.spinner .btn:first-of-type').on('click', function() {
                if ($(this).closest('.qty-wrapper').find('input').val() == minNumber) {
                    return false;
                } else {
                    $(this).closest('.qty-wrapper').find('input').val(parseInt($(this).closest('.qty-wrapper').find('input').val(), 10) - 1);
                }
            });
        })(jQuery);

        //  Global button Spinner End
        jQuery('.trigger-cart').on('click', function() {
            var itemId = jQuery(this).attr('data-trigger');
            jQuery('[data-qty="qty-' + itemId + '"]').val(1);
            setTimeout(function() {
                jQuery('.tocart[data-id="tocart-' + itemId + '"]').trigger('click');
                console.log('[data-id="tocart-' + itemId + '"]');
            }, 100);
        });

        jQuery('.trigger-cart-pdp').on('click', function() {
            var itemId = jQuery(this).attr('data-trigger');
            jQuery('[data-qty="qty-' + itemId + '"]').val(1);
            setTimeout(function() {
                jQuery('.pdptocart[data-id="tocart-' + itemId + '"]').trigger('click');
                console.log('[data-id="tocart-' + itemId + '"]');
            }, 100);
        });

        jQuery('#view-more span').on('click', function() {

            jQuery('.sub-list li').removeClass('hide');
            jQuery(this).parent().addClass('hide');

        });
        // Trigger Mobile Nav
        jQuery('#trigger-nav').on('click', function() {
            console.log('navxxxs');
            jQuery('.dl-trigger').trigger('click');
        });
    });

    jQuery(window).scroll(function() {
        var winScroll = jQuery(window).scrollTop();

        if (winScroll >= 40) {
            jQuery('body').addClass('scrolled');
        } else {
            jQuery('body').removeClass('scrolled');
        }

    });

    // Sticky on scroll
    if (jQuery('footer.footer').length) {

        var navHeight = jQuery('.navbar-nav').height();
        var winHeight = jQuery(window).height();
        if (navHeight < winHeight) {
            var length = $('.nav-sections').height() - $('.navbar-nav').height() + $('.nav-sections').offset().top;
            var footerPos = jQuery('footer.footer').offset().top;
            jQuery(window).scroll(function() {

                var scroll = jQuery(this).scrollTop() + 130;
                var height = jQuery('.navbar-nav').height() + 'px';


                if (scroll < jQuery('.nav-sections').offset().top) {
                    jQuery('.navbar-nav').css({
                        'position': 'absolute',
                        'top': '0'
                    });

                } else if (scroll > ($('.nav-sections').height() - $('.navbar-nav').height() + $('.nav-sections').offset().top) - 130) {
                    // console.log('then');
                    jQuery('.navbar-nav').css({
                        'position': 'absolute',
                        'bottom': '130px',
                        'top': 'auto'
                    });

                } else {
                    // console.log('exit');
                    jQuery('.navbar-nav').css({
                        'position': 'fixed',
                        'top': '130px',
                        'height': height
                    });
                }
            });
        }
    }
    // Sticky on scroll     

    if (jQuery('footer.footer').length) {
        jQuery(window).resize(function() {
            var navWidth = jQuery('.wrapper-nav-left').width();
            var navLeft = jQuery('.wrapper-nav-left').offset().left;
            jQuery('.nav-bg').width(navWidth + 50 + navLeft);
            setTimeout(function() {
                jQuery('.wrapper-nav-left').css({
                    opacity: '1'
                });
            }, 600);
        });
        jQuery(window).trigger('resize');
    }

  

    jQuery(window).load(function() {


        if (jQuery('#pls-str').length) {
            jQuery('body').addClass('please-store');
            var storeSwitchLeft = jQuery('#switcher-store').offset().left;

            jQuery('.no-arrow').css({
                left: storeSwitchLeft - 60
            });
            setTimeout(function() {
                jQuery('.no-arrow').css({
                    opacity: '1'
                });
            }, 300)
        }
        var navWidth = jQuery('.wrapper-nav-left').width();
        var navLeft = jQuery('.wrapper-nav-left').offset().left;
        jQuery('.nav-bg').width(navWidth + 50 + navLeft);
        setTimeout(function() {
            jQuery('.wrapper-nav-left').css({
                opacity: '1'
            });
        }, 600);

        // SetMinimum Height for navigation apearance
        mediaQuery();
        if (window.width >= window.smMedia) {
            var navHeight = jQuery('.navbar-nav').height();
            jQuery('.inner-content').css({
                minHeight: navHeight
            });

        }
        // SetMinimum Height for navigation apearance

        
        


    });
});


require(['jquery', 'jquery.dlmenu'], function() {
    jQuery(window).load(function() {
        jQuery('#dl-menu').dlmenu({
            animationClasses: {
                classin: 'dl-animate-in-2',
                classout: 'dl-animate-out-2'
            }
        });
    });
});