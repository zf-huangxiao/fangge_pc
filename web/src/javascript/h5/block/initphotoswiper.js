var initPhotoSwipeDefault = function(cb,initCb,items) {

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {

        var hash = window.location.search.split('=')[1];
        var params = {};
        params.gid = 1;
        params.pid = hash;


        return params;
    };


    var openPhotoSwipe = function(index, disableAnimation, fromURL ,items) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options;

        items = items;

        // define options (if needed)
        options = {
            mouseUsed:true,
            escKey:false,
            galleryUID:1,
            galleryPIDs: true,
            history: true,
            closeEl:false,
            shareEl:false,
            zoomEl:false,
            loop: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            closeOnVerticalDrag: false,
            closeOnScroll:false,
            arrowKeys:true,
            modal:true,
            allowPanToNext:true,
            maxSpreadZoom:1,
            fullscreenEl: false,
            arrowEl: true,
            preloaderEl: true,
            tapToClose: false,
            spacing:0,
            timeToIdleOutside: 1000,
            clickToCloseNonZoomable: false,

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();

        initCb && initCb(gallery);
        gallery.listen('afterChange',function(){
            cb && cb();
            initCb && initCb(gallery);
        });
    };

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid) {
        //openPhotoSwipe( hashData.pid , true, true );
        // $(document).on('click',function(e){

            openPhotoSwipe( hashData.pid , true, true ,items);

        // });
        // $(window).on('resize',function(){
        //     openPhotoSwipe( hashData.pid , true, true ,items);
        // })
    }
};
