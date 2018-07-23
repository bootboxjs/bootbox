$(function () {
    var doc = $('html, body');

    try {
        window.prettyPrint && prettyPrint();

        anchors.add('.bb-section h2, .bb-subsection h3, .bb-subsection h4');
    }
    catch (ex) {
        console.log(ex.message);
    }

    try {
        $.scrollUp && $.scrollUp({
            scrollName: 'scroll-up-btn',
            animationSpeed: '600',
            scrollText: '<i class="fa fa-4x fa-arrow-circle-up"></i>'
        });
    }
    catch (ex) {
        console.log(ex.message);
    }

    $(document)
        .on('click', '.dropdown-menu li a[href^="#"]', function (e) {
            e.preventDefault();

            var target = $(this).attr('href');
            var offset = 75;

            if (target && $(target).offset()) {
                offset = $(target).offset().top - 75;
            }

            doc.animate({
                scrollTop: offset
            }, 'slow', function () {
                //window.location.hash = target;
            });
        })
        .off('click', 'a.back-to-top')
        .on('click', 'a.back-to-top', function (e) {
            e.preventDefault();

            doc.animate({ scrollTop: 0 }, 'slow');
        });
});