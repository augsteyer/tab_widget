/**
 * Image Store - Front-end
 *
 * @file pop-widget.js
 * @package Popular Widget
 * @author Hafid Trujillo
 * @copyright 20010-2013
 * @filesource  wp-content/plugins/image-store/_js/pop-widget.js
 * @since 0.5.0
 */

(function (e) {
    if (typeof popwid == "undefined")return;
    setTimeout(function () {
        e.post(popwid.ajaxurl, {postid: popwid.postid, action: "popwid_page_view_count"})
    }, 400)
})(jQuery);
jQuery(document).ready(function (e) {
    e.noConflict();
    try {
        e('#tabs').tabs();
        e("div.pop-inside > .pop-widget-content").add('.wp-tag-cloud').hide();
        e(".pop-widget-tabs").each(function () {
            tabid = e(this).attr("id").replace("pop-widget-tabs-", "");
            e("#pop-widget-tabs-" + tabid + " a").eq(0).addClass("active"); //first element active
            e(".pop-inside-" + tabid + " .pop-widget-content").add('.wp-tag-cloud').eq(0).show();
        });
        e(".pop-widget-tabs a").click(function () {
            tab = e(this).attr("href").replace("#", "");
            id = e(this).parents(".pop-widget-tabs").attr("id").replace("pop-widget-tabs-", "");
            e("#pop-widget-tabs-" + id + " a").removeClass("active");
            e(this).addClass("active");
            inx = e("#pop-widget-tabs-" + id + " a").index(e(this));
            e(".pop-inside-" + id + " .pop-widget-content").add('.wp-tag-cloud').hide();
            e(".pop-inside-" + id + " .pop-widget-content").add('.wp-tag-cloud').eq(inx).show();
            return false
        })
    } catch (t) {
        return false
    }

    /* jQ pagination */
    var holder = ['today', 'week', 'month', 'all'];
    e.each(holder, function(key, value){
        var prev = {start: 0, stop: 0},
            cont = e('#' + value + ' .post-item');

        if(cont.length > 0){
            e("#pagination-"+value).paging(cont.length, {
                format: '< ncnnn >',
                perpage: 10,
                lapping: 0,
                page: 1,
                onSelect: function (page) {
                    var data = this.slice;
                    cont.slice(prev[0], prev[1]).css('display', 'none');
                    cont.slice(data[0], data[1]).fadeIn("slow");
                    prev = data;
                },
                onFormat: function (type) {
                    switch (type) {
                        case 'block': // n and c
                            return '<a>' + this.value + '</a>';
                        case 'next': // >
                            return '<a>&gt;</a>';
                        case 'prev': // <
                            return '<a>&lt;</a>';
                        case 'first': // [
                            return '<a>first</a>';
                        case 'last': // ]
                            return '<a>last</a>';
                    }
                }
            });
        }else{
            e('#pagination-'+value).html('No Posts')
        }

    });

});