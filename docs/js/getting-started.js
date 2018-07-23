$(function () {
    try {
        window.prettyPrint && prettyPrint();

        $('#download-bootbox').on('click', function(e){
            e.preventDefault();

            bootbox.alert({
                title: 'Bootbox.js',
                message: '<h3><i class="fa fa-smile-o"></i> Hey there!</h3> <p>Thank you for your interest. Unfortunately, Bootbox 5 is not ready for distribution yet. ' 
                    + 'If you want to start testing it, grab <a href="https://github.com/tiesont/bootbox">the source code</a> and ' 
                    + 'report any issues you find.</p>'
            });
        });
        
        if(anchors){
            anchors.options.placement = 'left';
            anchors.add('.bb-anchor');
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
});