
let duration = 500;
let hasPushState = window.history && window.history.pushState;

function removeHash() {
    if (hasPushState) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function highlightTarget() {
    let hash = window.location.hash;
    let pathName = window.location.pathname;
    if (hash) {
        pathName += hash;
    }

    // Let's see if we have a matching sidebar link; if so, mark it as active
    let navLink = $('.nav-link[href=".' + pathName + '"]');
    if (navLink.length) {
        $('.nav-link').removeClass('active');
        navLink.addClass('active');
    }
}

try {
    // Anchor.js --> add clickable page anchors to elements labeled with the `topic-anchor` class
    if(anchors) {
        anchors.options = {
            placement: 'left',
            visible: 'hover'
        };
        
        anchors.add('.topic-anchor');
    }
}
catch(error) {
    console.error(error);
}

$(window)
    .on('scroll', function () {
        clearTimeout($.data(this, 'scrollTimer'));

        $.data(this, 'scrollTimer', setTimeout(function () {
            if ($(window).scrollTop() < 25) {
                $('.bb-scroll-widget').stop().fadeOut(duration, removeHash);
            }
            else {
                $('.bb-scroll-widget').stop().fadeIn(duration);
            }
        }, 800));
    })
    .on('load', function () {
        // Check for a page anchor (i.e. #somethinghere)
        let hash = window.location.hash;
        if (hash) {
            let target = $(hash);
            if (target) {
                // If the target exists, scroll it into place (taking into account the header spacing) and set the active nav item
                if (target.scrollTop() < 75) {
                    $('html, body').stop().animate({ scrollTop: (target.offset().top - 100) }, 'slow');
                }
            }
        }

        highlightTarget();
    });

jQuery(function ($) {
    // Prevent scrolling for "empty" (i.e. href="#") page anchors
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    }); 

    $('.bb-hello-world').on('click', function (e) {
      bootbox.alert('Hello world!');
    });   

    $(document)
        .on('click', '.back-to-top', function (e) {
            e.preventDefault();

            $('html, body').stop().animate({ scrollTop: 0 }, 'slow');

            return false;
        })
        .on('click', 'a[href^="#"]', function (e) {
            let target = this.hash;
            if (target) {
                if ($(target).length) {
                    e.preventDefault();

                    $('html, body').stop().animate({ scrollTop: $(target).offset().top - 100 }, 'slow', function () {
                        if (hasPushState) {
                            history.pushState(null, null, target);
                        }

                        highlightTarget();
                    });
                }
            }
        })
        .on('click', '.nav-link', function (e) {
            let _this = $(this);
            let url = _this.attr('href').split('#');

            if(url[0] && url[0].indexOf(window.location.pathname) !== -1) {
                let target = this.hash;
                if (target) {
                    if ($(target).length) {
                        e.preventDefault();

                        $('html, body').stop().animate({ scrollTop: $(target).offset().top - 100 }, 'slow', function () {
                            $('.nav-link').removeClass('active');
                            _this.addClass('active');

                            if (hasPushState) {
                                history.pushState(null, null, target);
                            }
                        });
                    }
                }
                else {
                    if (window.location.pathname === '/' && _this.attr('href') === '/') {
                        e.preventDefault();

                        $('.nav-link').removeClass('active');
                        _this.addClass('active');

                        $('html, body').stop().animate({ scrollTop: 0 }, 'slow', removeHash);
                    }
                }
            }
        });


    // Dropdown menu
    $('.sidebar-dropdown > a').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.nav-items .nav-link').on('click', function(e) {
        $('.nav-link').not(this).toggleClass('active', false);
        $(this).toggleClass('active', true);
    });

    //toggle sidebar
    $('#toggle-sidebar').on('click', function () {
        $('body').toggleClass('toggled');
    });

    //Pin sidebar
    $('#pin-sidebar').on('click', function () {
        if ($('body').hasClass('pinned')) {
            // unpin sidebar when hovered
            $('body').removeClass('pinned');
            $('#sidebar').unbind( 'hover');
        } else {
            $('body').addClass('pinned');
            $('#sidebar').hover(
                function () {
                    $('body').addClass('sidebar-hovered');
                },
                function () {
                    $('body').removeClass('sidebar-hovered');
                }
            );
        }
    });


    //toggle sidebar overlay
    $('#overlay').on('click', function () {
        $('body').toggleClass('toggled');
    });
});