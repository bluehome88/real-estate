// properties map
function wp_rem_get_poly_cords_properties_topmap(db_cords, polygonCoords) {
    var cordsActualLimit = 1000;
    var list_all_ids = '';
    if (typeof polygonCoords !== 'undefined' && polygonCoords != '') {
        var polygonCoordsJson = jQuery.parseJSON(polygonCoords);
        var polygon_area = new google.maps.Polygon({paths: polygonCoordsJson});

        if (typeof db_cords === 'object' && db_cords.length > 0) {
            var actual_length;
            if (db_cords.length > cordsActualLimit) {
                actual_length = cordsActualLimit;
            } else {
                actual_length = db_cords.length;
            }

            var resultProperties = 0;
            jQuery.each(db_cords, function (index, element) {
                if (index === actual_length) {
                    return false;
                }

                var db_lat = parseFloat(element.lat);
                var db_long = parseFloat(element.long);
                var property_id = element.id;

                var resultCord = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(db_lat, db_long), polygon_area) ? 'true' : 'false';

                if (resultCord == 'true') {
                    if (resultProperties === 0) {
                        list_all_ids += property_id;
                    } else {
                        list_all_ids += ',' + property_id;
                    }
                    resultProperties++;
                }
            });

        }
    }
    return list_all_ids;
}
// properties top map

// jQuery('form[name="wp-rem-top-map-form"]').keydown(function (event) {
// if (event.keyCode == 13) {
// event.preventDefault();
// return false;
// }
// });

jQuery(document).on('focusin', '.wp-rem-top-loc-wrap input', function () {
    var ajax_url = wp_rem_top_gmap_strings.ajax_url;
    var _plugin_url = wp_rem_top_gmap_strings.plugin_url;
    var _this = jQuery(this);
    if (jQuery(this).hasClass('wp-rem-dev-load-locs')) {
        var list_to_append = jQuery(this).parents('label').find(".top-search-locations");
        var this_loader = jQuery(this).parents('label').find('.loc-icon-holder');
        this_loader.html('<img src="' + _plugin_url + 'assets/frontend/images/ajax-loader.gif" alt="">');
        var _top_map_locs = jQuery.ajax({
            url: ajax_url,
            method: "POST",
            data: 'locs=top_map&action=dropdown_options_for_search_location_data',
            dataType: "json"
        }).done(function (response) {
            if (response) {
                list_to_append.html('');
                jQuery.each(response, function () {
                    list_to_append.append("<li data-val=\'" + this.value + "\'>" + this.caption + "</li>");
                });
                _this.removeClass('wp-rem-dev-load-locs');
            }
            this_loader.html('<i class="icon-target3"></i>');
        }).fail(function () {
            this_loader.html('<i class="icon-target3"></i>');
        });
    }
    jQuery(this).parents('.wp-rem-top-loc-wrap').find('.top-search-locations').show();
});

jQuery(document).on('click', '.wp-rem-top-loc-wrap .top-search-locations > li', function () {
    var _this_data = jQuery(this).data('val');
    var locations_field = jQuery(this).parents('.wp-rem-top-loc-wrap').find('input');
    locations_field.val(_this_data);
    wp_rem_top_serach_trigger();
    jQuery(this).parents('.wp-rem-top-loc-wrap').find('.top-search-locations').hide();
});

jQuery(document).on('click', 'body', function (e) {
    var container = jQuery(".wp-rem-top-loc-wrap");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.find('.top-search-locations').hide();
    }
});
// get my location 
function wp_rem_getLocation(id) {
    if (navigator.geolocation) {
        var _plugin_url = wp_rem_top_gmap_strings.plugin_url;
        var this_loader = jQuery('.slide-loader');

        jQuery('#geo-location-button-' + id).attr('class', 'act-btn is-disabled');
        //jQuery('#geo-location-button-' + id).html('<img src="' + _plugin_url + 'assets/frontend/images/geo_on.svg" alt="">');

        navigator.geolocation.getCurrentPosition(function (position) {
            this_loader.addClass('loading');
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var dataString = "lat=" + pos.lat + "&lng=" + pos.lng + "&action=wp_rem_get_geolocation";
            jQuery.ajax({
                type: "POST",
                url: wp_rem_globals.ajax_url,
                data: dataString,
                dataType: "json",
                success: function (response) {

                    var address = response.address;
                    var property_form = jQuery('form[id^="frm_property_arg"]');
                    var data_vals = '&ajax_filter=true';
                    var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;
                    window.history.pushState(null, null, decodeURIComponent(current_url));
                    property_form.find('input[name="loc_polygon"]').remove();
                    jQuery('.wp-rem-locations-field-geo' + id).val(address);
                    wp_rem_top_serach_trigger();
                    if ($(".property-counter").length > 0) {
                        jQuery('body').addClass('wp-rem-changing-view');
                        wp_rem_property_content($(".property-counter").val());
                        jQuery('body').removeClass('wp-rem-changing-view');
                    }
                    jQuery('#geo-location-button-' + id).attr('class', 'act-btn');
                    //jQuery('#geo-location-button-' + id).html('<img src="' + _plugin_url + 'assets/frontend/images/geo.svg" alt="">');
                    this_loader.removeClass('loading');
                }
            });
        });
    }
}

function wp_rem_showPosition(position) {

    jQuery.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            //jQuery('#wp-rem-search-location').val(data.results[0].formatted_address);
            //jQuery('#goe_loc_bt').hide(); 
            wp_rem_top_serach_trigger();
        },
        error: function (xhr, textStatus, errorThrown) {
            jQuery('#goe_loc_bt').show();
        }
    });

}


function wp_rem_top_serach_trigger() {
    var ajax_url = wp_rem_top_gmap_strings.ajax_url;
    var _plugin_url = wp_rem_top_gmap_strings.plugin_url;
    var _this_form = jQuery('form[name="wp-rem-top-map-form"]');
    var this_loader = jQuery('.slide-loader');
    var data_vals = 'ajax_filter=true&map=top_map&action=wp_rem_top_map_search&' + _this_form.serialize() + '&atts=' + jQuery('#atts').html();
    if ($(".property-counter").length > 0) {
        data_vals += "&" + jQuery("#frm_property_arg" + $(".property-counter").length).serialize();
    }

    if ($("input[name='loc_polygon_path']").length > 0) {
        data_vals += "&loc_polygon_path=" + $("input[name='loc_polygon_path']").val();
    }
    data_vals = stripUrlParams(data_vals);
    this_loader.addClass('loading');

    var loading_top_map = jQuery.ajax({
        url: ajax_url,
        method: "POST",
        data: data_vals,
        dataType: "json"
    }).done(function (response) {
        if (typeof response.html !== 'undefined') {
            jQuery('.top-map-action-scr').html(response.html);
        }

        this_loader.removeClass('loading');
    }).fail(function () {
        this_loader.removeClass('loading');
    });

    if ($(".property-counter").length > 0) {
        jQuery('body').addClass('wp-rem-changing-view');
        wp_rem_property_content($(".property-counter").val());
        jQuery('body').removeClass('wp-rem-changing-view');
    }
}

function wp_rem_property_top_map(top_dataobj, is_ajax) {
    console.log(top_dataobj);
    var ajax_url = wp_rem_top_gmap_strings.ajax_url;
    var _plugin_url = wp_rem_top_gmap_strings.plugin_url;
    var map_id = top_dataobj.map_id,
            map_zoom = top_dataobj.map_zoom,
            this_map_style = top_dataobj.map_style,
            this_map_cus_style = top_dataobj.map_custom_style,
            latitude = top_dataobj.latitude,
            longitude = top_dataobj.longitude,
            db_cords = top_dataobj.map_cords,
            polygonCoords = top_dataobj.location_cords,
            cluster_icon = top_dataobj.cluster_icon,
            cordsActualLimit = 1000;
    
    var open_info_window;

    if (latitude != '' && longitude != '') {

        var marker;
        all_marker = [];
        reset_top_map_marker = [];

        var LatLngList = [];

        if (is_ajax != 'true') {
            map_zoom = parseInt(map_zoom);
            if (!jQuery.isNumeric(map_zoom)) {
                var map_zoom = 9;
            }
            var map_type = google.maps.MapTypeId.ROADMAP;
            var mapLatlng = new google.maps.LatLng(latitude, longitude);

            map = new google.maps.Map(jQuery('.wp-rem-ontop-gmap').get(0), {
                zoom: map_zoom,
                center: mapLatlng,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: map_type,
            });
        }
        map.panTo(new google.maps.LatLng(latitude, longitude));
        if (typeof this_map_cus_style !== 'undefined' && this_map_cus_style != '') {
            var cust_style = jQuery.parseJSON(this_map_cus_style);
            var styledMap = new google.maps.StyledMapType(cust_style, {name: 'Styled Map'});
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
        } else if (typeof this_map_style !== 'undefined' && this_map_style != '') {

            var styles = wp_rem_map_select_style(this_map_style);
            if (styles != '') {
                var styledMap = new google.maps.StyledMapType(styles, {name: 'Styled Map'});
                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
            }
        }

        var open_info_window;
        markerClusterers = '';
        var drawingManager;
        var selectedShape;
        var prePolygon;
        var draw_color = '#1e90ff';

        if (typeof polygonCoords !== 'undefined' && polygonCoords != '') {
            var points = [];
            for (var i = 0; i < polygonCoords.length; i++) {
                points.push(new google.maps.LatLng(polygonCoords[i][0], polygonCoords[i][1]));
            }

            if (prePolygon) {
                prePolygon.setMap(null);
            }

            prePolygon = new google.maps.Polygon({
                paths: points,
                strokeWeight: 0,
                fillOpacity: 0.25,
                fillColor: draw_color,
                strokeColor: draw_color,
                editable: false
            });
            prePolygon.setMap(map);

            //setSelection(prePolygon, true);
        }
        //else {
        // Showing all markers in default for page load
        if (typeof db_cords === 'object' && db_cords.length > 0) {
            var actual_length;
            if (db_cords.length > cordsActualLimit) {
                actual_length = cordsActualLimit;
            } else {
                actual_length = db_cords.length;
            }

            var def_cords_obj = [];
            var def_cords_creds = [];

            jQuery.each(db_cords, function (index, element) {

                if (index === actual_length) {
                    return false;
                }
                var i = index;
                //alert(element.title);
                //alert(element.marker);
                var db_lat = parseFloat(element.lat);
                var db_long = parseFloat(element.long);
                var list_title = element.title;
                var list_marker = element.marker;

                var def_cords = {lat: db_lat, lng: db_long};
                def_cords_obj.push(def_cords);

                var def_coroeds = {list_title: list_title, list_marker: list_marker, element: element};
                def_cords_creds.push(def_coroeds);

                var db_latLng = new google.maps.LatLng(db_lat, db_long);

                LatLngList.push(new google.maps.LatLng(db_lat, db_long));
                marker = new google.maps.Marker({
                    position: db_latLng,
                    center: db_latLng,
                    //animation: google.maps.Animation.DROP,
                    map: map,
                    draggable: false,
                    icon: list_marker,
                    title: list_title,
                });

                var contentString = infoContentString(element);

                var infowindow = new InfoBox({
                    boxClass: 'liting_map_info',
                    content: contentString,
                    disableAutoPan: true,
                    maxWidth: 0,
                    alignBottom: true,
                    pixelOffset: new google.maps.Size(-108, -72),
                    zIndex: null,
                    closeBoxMargin: "2px",
                    closeBoxURL: "close",
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: "floatPane",
                    enableEventPropagation: false
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        map.panTo(marker.getPosition());
                        map.panBy(0, -150);
                        if (open_info_window)
                            open_info_window.close();
                        infowindow.open(map, this);
                        open_info_window = infowindow;
                    }
                })(marker, i));
                all_marker.push(marker);
                reset_top_map_marker.push(marker);
            });

            if (LatLngList.length > 0) {
                if (typeof polygonCoords === 'undefined' || polygonCoords == '') {
                    var latlngbounds = new google.maps.LatLngBounds();
                    for (var i = 0; i < LatLngList.length; i++) {
                        latlngbounds.extend(LatLngList[i]);
                    }
                    map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));

                    map.setZoom(map.getZoom());
                }

                var mapResizeTimes = 0;
                setTimeout(function () {
                    if (mapResizeTimes === 0) {
                        jQuery(".wp-rem-ontop-gmap").height(jQuery(window).height);
                        google.maps.event.trigger(map, "resize");
                    }
                    mapResizeTimes++;
                }, 500);
            }

            //clusters
            mapClusters();
            google.maps.event.addListener(map, "click", function (event) {
                if (open_info_window) {
                    open_info_window.close();
                }
            });
        }
        //        
        //}
        function mapClusters() {
            if (all_marker) {
                var mcOptions;
                var clusterStyles = [
                    {
                        textColor: '#222222',
                        opt_textColor: '#222222',
                        url: cluster_icon,
                        height: 40,
                        width: 40,
                        textSize: 12
                    }
                ];
                mcOptions = {
                    gridSize: 15,
                    ignoreHidden: true,
                    maxZoom: 12,
                    styles: clusterStyles
                };
                markerClusterers = new MarkerClusterer(map, all_marker, mcOptions);
            }
        }

        var polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.25,
            editable: true
        };

        function infoContentString(element) {
            var property_id = element.id;
            var list_title = element.title;
            var list_link = element.link;
            var list_img = element.img;
            var list_price = element.price;
            var list_favourite = element.favourite;
            var list_featured = element.featured;
            var list_reviews = element.reviews;
            //var list_address = element.address;

            var img_html = '';
            if (list_img !== 'undefined' && list_img != '') {
                img_html = '<figure><a class="info-title" href="' + list_link + '">' + list_img + '</a><figcaption>' + list_favourite + '</figcaption></figure>';
            }

            var contentString = '\
            <div id="property-info-' + property_id + '-' + '" class="property-info-inner">\
                <div class="info-main-container">\
                    ' + img_html + '\
                    <div class="info-txt-holder">\
                        ' + list_featured + '\
                        ' + list_reviews + '\
                        <a class="info-title" href="' + list_link + '">' + list_title + '</a>\
                        ' + list_price + '\
                    </div>\
                </div>\
            </div>';

            return contentString;
        }

        function clearSelection() {
            if (selectedShape) {
                if (typeof selectedShape.setEditable == 'function') {
                    selectedShape.setEditable(false);
                }
                selectedShape = null;
            }
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            if (all_marker) {
                for (var i = 0; i < all_marker.length; i++) {
                    all_marker[i].setMap(map);
                }
            }
        }

        function deleteSelectedShape() {
            setMapOnAll(null);
            if (markerClusterers) {
                markerClusterers.clearMarkers();
            }
            if (selectedShape) {
                selectedShape.setMap(null);
            }
            if (prePolygon) {
                prePolygon.setMap(null);
            }

            jQuery('#delete-button-' + map_id).hide();
            jQuery('#draw-map-' + map_id).attr('class', 'act-btn');
            jQuery('#draw-map-' + map_id).html('<i class="icon-paint-brush"></i>');
            jQuery('#draw-map-' + map_id).show();
            jQuery('input[name="zoom_level"]').val('');
            var property_form = jQuery('form[id^="frm_property_arg"]');
            var data_vals = '&ajax_filter=true';
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;//window.location.href;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            property_form.find('input[name="loc_polygon_path"]').remove();
            property_form.find('input[name="location"]').val('');

            if (open_info_window) {
                open_info_window.close();
            }
            wp_rem_top_serach_trigger();
        }

        function updateCurSelText() {
            // Clear all markers data.
            all_marker = [];

            if (typeof selectedShape.getPath == 'function') {

                var coords = selectedShape.getPath().getArray();
                var pathstr = '';
                var first = true;
                for (var i = 0; i < coords.length; i++) {
                    var obj = coords[i];
                    if (!first) {
                        pathstr += '||';
                    } else {
                        first = false;
                    }
                    pathstr += obj.lat() + ',' + obj.lng();
                }

                var this_loader = jQuery('.slide-loader');
                var property_form = jQuery('form[id^="frm_property_arg"]');
                var data_vals = property_form.serialize();
                data_vals = data_vals.replace(/[^&]+=\.?(?:&|$)/g, ''); // Remove extra and empty variables.

                this_loader.addClass('loading');

                data_vals += '&loc_polygon_path=' + pathstr + '&ajax_filter=true';
                var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;//window.location.href;
                window.history.pushState(null, null, decodeURIComponent(current_url));
                property_form.find('input[name="loc_polygon_path"]').remove();
                property_form.find('input[name="location"]').val('Drawn Area');
                property_form.append('<input type="hidden" name="loc_polygon_path" value="' + pathstr + '">');

                wp_rem_top_serach_trigger();

                // if ( $(".property-counter").length > 0 ) {
                // jQuery('body').addClass('wp-rem-changing-view');
                // wp_rem_property_content( $(".property-counter").val() );
                // jQuery('body').removeClass('wp-rem-changing-view');
                // }

                this_loader.removeClass('loading');

                return;


                // var resultInsTimes = 0;
                // var resultCordTimes = 0;



                // setTimeout(function () {
                // if (resultInsTimes === 0) {
                // var poly_in_properties = wp_rem_get_poly_cords_properties_topmap(db_cords, pathstr);

                // var cords_query_string = jQuery.ajax({
                // url: wp_rem_top_gmap_strings.ajax_url,
                // method: "POST",
                // data: {
                // pathstr: pathstr,
                // poly_in_properties: poly_in_properties,
                // action: 'wp_rem_properties_map_cords_to_url'
                // },
                // dataType: "json"
                // }).done(function (response) {

                // var polygon_area = new google.maps.Polygon({paths: poly_cords_obj});

                // setTimeout(function () {
                // if (resultCordTimes === 0) {
                // var property_ids = '';
                // if (typeof db_cords === 'object' && db_cords.length > 0) {
                // var actual_length;
                // if (db_cords.length > cordsActualLimit) {
                // actual_length = cordsActualLimit;
                // } else {
                // actual_length = db_cords.length;
                // }

                // var trueCords = 0;
                // var resultProperties = 0;
                // jQuery.each(db_cords, function (index, element) {
                // if (index === actual_length) {
                // return false;
                // }
                // var i = index;

                // var db_lat = parseFloat(element.lat);
                // var db_long = parseFloat(element.long);
                // var property_id = element.id;
                // var list_title = element.title;
                // var list_marker = element.marker;

                // var resultCord = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(db_lat, db_long), polygon_area) ? 'true' : 'false';

                // if (resultCord == 'true') {
                // var db_latLng = new google.maps.LatLng(db_lat, db_long);


                // marker = new google.maps.Marker({
                // position: db_latLng,
                // center: db_latLng,
                // animation: google.maps.Animation.DROP,
                // map: map,
                // draggable: false,
                // icon: list_marker,
                // title: list_title,
                // });

                // var contentString = infoContentString(element);

                // var infowindow = new InfoBox({
                // boxClass: 'liting_map_info',
                // content: contentString,
                // disableAutoPan: true,
                // maxWidth: 0,
                // alignBottom: true,
                // pixelOffset: new google.maps.Size(-108, -72),
                // zIndex: null,
                // closeBoxMargin: "2px",
                // closeBoxURL: "close",
                // infoBoxClearance: new google.maps.Size(1, 1),
                // isHidden: false,
                // pane: "floatPane",
                // enableEventPropagation: false
                // });

                // google.maps.event.addListener(marker, 'click', (function (marker, i) {
                // return function () {
                // map.panTo(marker.getPosition());
                // map.panBy(0, -100);
                // if (open_info_window)
                // open_info_window.close();
                // infowindow.open(map, this);
                // open_info_window = infowindow;
                // }
                // })(marker, i));
                // all_marker.push(marker);
                // trueCords++;

                // if (resultProperties === 0) {
                // property_ids += property_id;
                // } else {
                // property_ids += ',' + property_id;
                // }
                // resultProperties++;
                // }
                // });

                // if (trueCords >= 0) {
                // if (trueCords >= (cordsActualLimit - 1)) {
                // jQuery('#total-records-' + map_id).html(cordsActualLimit + '+');
                // } else {
                // jQuery('#total-records-' + map_id).html(trueCords);
                // }
                // jQuery('#showing-records-' + map_id).html(trueCords);
                // jQuery('#property-records-' + map_id).show();

                // //clusters
                // mapClusters();
                // }
                // }

                // if (typeof response.string !== 'undefined' && response.string != '') {

                // if (jQuery('#wp-rem-ontop-gmap-' + map_id).is(':visible')) {

                // data_vals = '&loc_polygon=' + response.string + '&ajax_filter=true';
                // var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;//window.location.href;
                // window.history.pushState(null, null, decodeURIComponent(current_url));
                // property_form.find('input[name="loc_polygon"]').remove();
                // property_form.find('input[name="location"]').val('Drawn Area');
                // property_form.append('<input type="hidden" name="loc_polygon" value="' + response.string + '">');

                // if ( $(".property-counter").length > 0 ) {
                // jQuery('body').addClass('wp-rem-changing-view');
                // wp_rem_property_content( $(".property-counter").val() );
                // jQuery('body').removeClass('wp-rem-changing-view');
                // }

                // // var property_holder_counter = jQuery('.wp-rem-dev-property-content').data('id');
                // // wp_rem_property_content(property_holder_counter);
                // }
                // }

                // this_loader.removeClass('loading');
                // }
                // resultCordTimes++;
                // }, 2000);

                // }).fail(function () {
                // this_loader.removeClass('loading');
                // });

                // if (LatLngList.length > 0) {
                // var latlngbounds = new google.maps.LatLngBounds();
                // for (var i = 0; i < LatLngList.length; i++) {
                // latlngbounds.extend(LatLngList[i]);
                // }
                // map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));
                // map.setZoom(map.getZoom());
                // }
                // }
                // resultInsTimes++;

                // }, 2000);
                // //clearInterval(resultInsTimer);
            }
        }

        function setSelection(shape, isNotMarker) {
            clearSelection();
            selectedShape = shape;
            if (isNotMarker)
                shape.setEditable(false);
            selectColor(shape.get('fillColor') || shape.get('strokeColor'));
            updateCurSelText();

            if (selectedShape) {
                if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                    selectedShape.set('strokeColor', draw_color);
                } else {
                    selectedShape.set('fillColor', draw_color);
                }
            }
        }

        function selectColor(color) {

            if (drawingManager) {
                // Retrieves the current options from the drawing manager and replaces the
                // stroke or fill color as appropriate.
                var polylineOptions = drawingManager.get('polylineOptions');
                polylineOptions.strokeColor = color;
                drawingManager.set('polylineOptions', polylineOptions);
                var polygonOptions = drawingManager.get('polygonOptions');
                polygonOptions.fillColor = color;
                drawingManager.set('polygonOptions', polygonOptions);
            }
        }

        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        drawingManager = new google.maps.drawing.DrawingManager({
            //drawingMode: google.maps.drawing.OverlayType.POLYGON,
            markerOptions: {
                draggable: true,
                editable: true,
            },
            polylineOptions: {
                editable: false
            },
            drawingControl: false,
            drawingControlOptions: {
                drawingModes: ['polygon']
            },
            polygonOptions: polyOptions,
            map: map
        });

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
            //~ if (e.type != google.maps.drawing.OverlayType.MARKER) {
            var isNotMarker = (e.type != google.maps.drawing.OverlayType.MARKER);
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);
            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;

            setSelection(newShape, isNotMarker);

            drawingManager.setOptions({
                drawingControl: false
            });

            jQuery('#draw-map-' + map_id).hide();
            jQuery('#delete-button-' + map_id).show();

        });

        google.maps.event.addListener(map, 'zoom_changed', function () {
            jQuery("input[name='zoom_level']").val(map.getZoom());
        });

        // Start Drawing Mode
        google.maps.event.addDomListener(document.getElementById('draw-map-' + map_id), 'click', function () {

            var property_form = jQuery('form[id^="frm_property_arg"]');
            var data_vals = '&ajax_filter=true';
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;//window.location.href;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            property_form.find('input[name="loc_polygon"]').remove();
            jQuery('#draw-map-' + map_id).attr('class', 'act-btn is-disabled');
            //jQuery('#draw-map-' + map_id).html('<img src="' + _plugin_url + 'assets/frontend/images/draw_on.svg" alt="">');

            if (open_info_window) {
                open_info_window.close();
            }
            // end remove old selected result

            drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
            setMapOnAll(null);
            if (markerClusterers) {
                markerClusterers.clearMarkers();
            }
            if (selectedShape) {
                selectedShape.setMap(null);
            }
            if (prePolygon) {
                prePolygon.setMap(null);
            }
            if (open_info_window) {
                open_info_window.close();
            }
            jQuery('#property-records-' + map_id).hide();
            jQuery('#delete-button-' + map_id).hide();
            jQuery('#draw-map-' + map_id).show();
        });

        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
        //google.maps.event.addListener(map, 'click', clearSelection);
        google.maps.event.addDomListener(document.getElementById('delete-button-' + map_id), 'click', deleteSelectedShape);

        //
        if (document.getElementById('top-gmap-lock-btn')) {
            google.maps.event.addDomListener(document.getElementById('top-gmap-lock-btn'), 'click', function () {
                if (jQuery('#top-gmap-lock-btn').hasClass('map-loked')) {
                    map.setOptions({scrollwheel: true});
                    map.setOptions({draggable: true});
                    jQuery('#top-gmap-lock-btn').attr('class', 'top-gmap-lock-btn map-unloked').html('<i class="icon-lock_open"></i>');
                } else if (jQuery('#top-gmap-lock-btn').hasClass('map-unloked')) {
                    map.setOptions({scrollwheel: false});
                    map.setOptions({draggable: false});
                    jQuery('#top-gmap-lock-btn').attr('class', 'top-gmap-lock-btn map-loked').html('<i class="icon-lock_outline"></i>');
                }
            });
        }
    }
}

jQuery(".wp-rem-ontop-gmap").css("pointer-events", "none");

var onTopMapMouseleaveHandler = function (event) {
    var that = jQuery(this);

    that.on('click', onTopMapClickHandler);
    that.off('mouseleave', onTopMapMouseleaveHandler);
    jQuery(".wp-rem-ontop-gmap").css("pointer-events", "none");
}

var onTopMapClickHandler = function (event) {
    var that = jQuery(this);
    // Disable the click handler until the user leaves the map area
    that.off('click', onTopMapClickHandler);

    // Enable scrolling zoom
    that.find('.wp-rem-ontop-gmap').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onTopMapMouseleaveHandler);
}
jQuery(document).on('click', '.wp-rem-top-map-holder', onTopMapClickHandler);