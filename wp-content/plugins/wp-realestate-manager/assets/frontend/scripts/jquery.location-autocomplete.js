jQuery(document).ready(function (jQuery) {
    "use strict";
    jQuery.fn.extend({
        cityAutocomplete: function (options) {

            return this.each(function () {

                var input = jQuery(this), opts = jQuery.extend({}, jQuery.cityAutocomplete);

                var autocompleteService = new google.maps.places.AutocompleteService();

                var predictionsDropDown = jQuery('<div class="wp_rem_location_autocomplete" class="city-autocomplete" style="min-height: 35px;"></div>').appendTo(jQuery(this).parent());
				
				var predictionsLoader = jQuery('<div class="location-loader-wrapper" style="display: none;"><i class="icon-spinner8 icon-spin"></i></div>');
				predictionsDropDown.append( predictionsLoader );
				
				var predictionsGoogleWrapper = jQuery('<div class="location-google-wrapper" style="display: none;"></div>');
				predictionsDropDown.append( predictionsGoogleWrapper );

				var predictionsDBWrapper = jQuery('<div class="location-db-wrapper" style="display: none;"></div>');
				predictionsDropDown.append( predictionsDBWrapper );
				
				var plugin_url = input.parent(".wp_rem_searchbox_div").data('locationadminurl');
				
				var last_query = '';
				var new_query = '';
				var xhr = '';

				var showDropDown = function () {
					new_query = input.val();
					// Min Number of characters
					var num_of_chars = 0;
					if (new_query.length >= num_of_chars) {
						predictionsDropDown.show();
						predictionsGoogleWrapper.hide();
						predictionsDBWrapper.hide();
						predictionsLoader.show();
						
						var params = {
							input: new_query,
							bouns: 'upperbound',
							//types: ['address'],
							componentRestrictions: '', //{country: window.country_code}
						};
						updateDBPredictions();
					} else {
						predictionsDropDown.hide();
					}
					$("input.search_type").val('custom');
                }

                input.keyup(showDropDown);
                input.click(showDropDown);
				
                function updateGooglePredictions(predictions, status) {
                    var google_results = '';

                    if (google.maps.places.PlacesServiceStatus.OK == status) {
                        // AJAX GET ADDRESS FROM GOOGLE
                        google_results += '<div class="address_headers"><h5>ADDRESS</h5></div>'
                        jQuery.each(predictions, function (i, prediction) {
                            google_results += '<div class="wp_rem_google_suggestions"><i class="icon-location-arrow"></i> ' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '<span style="display:none">' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '</span></div>';
                        });
						predictionsLoader.hide();
						predictionsGoogleWrapper.empty().append(google_results).show();
                    }
				}
				
				function updateDBPredictions() {
					if ( last_query == new_query && predictionsDBWrapper.html() ) {
						predictionsLoader.hide();
						predictionsDBWrapper.show();
						return;
					}
					predictionsDBWrapper.empty();
					last_query = new_query;
                    // AJAX GET STATE / PROVINCE.
                    var dataString = 'action=get_locations_for_search' + '&keyword=' + new_query;
					if ( xhr != '' ) {
						xhr.abort();
					}
                    xhr = jQuery.ajax({
                        type: "POST",
                        url: plugin_url,
                        data: dataString,
                        success: function (data) {
                            var results = jQuery.parseJSON(data);
                            if (results != '') {
								// Set label for suggestions.
								var labels_str = "";
								if ( typeof results.title != "undefined" ) {
									labels_str = results.title.join(" / ");
								}
								var locations_str = "";
								// Populate suggestions.
								if ( typeof results.locations_for_display != "undefined" ) {
									var data = results.locations_for_display;
									$.each( data, function( key1, val1 ) {
										if ( results.location_levels_to_show[0] == true && typeof val1.item != "undefined" ) {
											if( val1.match == "yes" || ( val1.match == "no" && val1.children.length > 0 ))
												locations_str += '<div class="wp_rem_google_suggestions wp_rem_location_parent address_headers"><i class="icon-location-arrow"></i><h5>' + val1.item.name + '</h5><div style="color:#ff6428;">(wide search)</div><span style="display:none">' + val1.item.slug + '</span></div>';
										}
										if ( val1.children.length > 0 ) {
											$.each( val1.children, function( key2, val2 ) {
												if ( results.location_levels_to_show[1] == true && typeof val2.item != "undefined" ) {
													locations_str += '<div class="wp_rem_google_suggestions wp_rem_location_child"><i class="icon-location-arrow"></i>' + val2.item.name + '<span style="display:none">' + val2.item.slug + '</span></div>';
												}
												if ( val2.children.length > 0 ) {
													$.each( val2.children, function( key3, val3 ) {
														if ( results.location_levels_to_show[2] == true && typeof val3.item != "undefined" ) {
															locations_str += '<div class="wp_rem_google_suggestions wp_rem_location_child"><i class="icon-location-arrow"></i>' + val3.item.name + '<span style="display:none">' + val3.item.slug + '</span></div>';
														}
														if ( val3.children.length > 0 ) {
															$.each( val3.children, function( key4, val4 ) {
																if ( results.location_levels_to_show[3] == true && typeof val4.item != "undefined" ) {
																	locations_str += '<div class="wp_rem_google_suggestions wp_rem_location_child"><i class="icon-location-arrow"></i>' + val4.item.name + '<span style="display:none">' + val4.item.slug + '</span></div>';
																}
															});
														}
													});
												}
											});
										}
									});
									// predictionsDBWrapper.empty();
									if ( locations_str != "" ) {
										predictionsLoader.hide();
										predictionsDBWrapper.append('' + locations_str).show();
									}
									else
									{
										predictionsLoader.hide();
										predictionsDBWrapper.append('<div class="wp_rem_google_suggestions wp_rem_location_child">Sorry. No found result.</div>').show();									
									}
								}
                            }
                            predictionsLoader.hide();
                        }
                    });
                }
				
				predictionsDropDown.delegate('div.wp_rem_google_suggestions', 'click', function () {
                    // if (jQuery(this).text() != "ADDRESS" && jQuery(this).text() != "STATE / PROVINCE" && jQuery(this).text() != "COUNTRY") {
                        // address with slug			
                        var wp_rem_address_html = jQuery(this).text();
                        // slug only
                        var wp_rem_address_slug = jQuery(this).find('span').html();
                        // remove slug
                        jQuery(this).find('span').remove();
                        if( jQuery(this).hasClass('wp_rem_location_parent') )
                        	input.val(jQuery(this).find('h5').text());
                        else
                        	input.val(jQuery(this).text());
                        input.next('.search_keyword').val(wp_rem_address_slug);
                        predictionsDropDown.hide();
                        input.next('.search_keyword').closest("form.side-loc-srch-form").submit();
						$("input.search_type").val('autocomplete');
                    // }
                });
				
                jQuery(document).mouseup(function (e) {
                	if( !(e.target.className == "icon-angle-down"))
                    	predictionsDropDown.hide();
                });
				jQuery(".wp-rem-radius-location").on("click", function(){
					if( jQuery(".wp_rem_location_autocomplete").is(":visible"))
						predictionsDropDown.hide();
					else
						showDropDown();
				});

                jQuery(window).resize(function () {
                    updatePredictionsDropDownDisplay(predictionsDropDown, input);
                });
				
                updatePredictionsDropDownDisplay(predictionsDropDown, input);
				
                return input;
            });
        }
    });
    jQuery.fn.cityAutocomplete.transliterate = function (s) {
        s = String(s);
        var char_map = {
			// Latin
			'À': 'A', '�?': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
			'È': 'E', 'É': 'E', '�?': 'E', 'Ë': 'E', 'Ì': 'I', '�?': 'I', '�?': 'I', '�?': 'I',
			'�?': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', '�?': 'O',
			'Ø': 'O', 'Ù': 'U', '�?': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', '�?': 'Y', '�?': 'TH',
			'ß': 'ss',
			'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', '�?': 'a', 'å': 'a', '�?': 'ae', 'ç': 'c',
			'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', '�?': 'i', 'î': 'i', 'ï': 'i',
			'ð': 'd', 'ñ': 'n', '�?': 'o', '�?': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
			'ø': 'o', '�?': 'u', 'ú': 'u', 'û': 'u', '�?': 'u', 'ű': 'u', '�?': 'y', '�?': 'th',
			'ÿ': 'y',
			// Latin symbols
			'©': '(c)',
			// Greek
			'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
			'Ι': 'I', '�?': 'K', 'Λ': 'L', 'Μ': 'M', '�?': 'N', '�?': '3', 'Ο': 'O', 'Π': 'P',
			'Ρ': 'R', 'Σ': 'S', '�?': 'T', 'Υ': 'Y', '�?': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
			'Ά': 'A', 'Έ': 'E', '�?': 'I', 'Ό': 'O', '�?': 'Y', 'Ή': 'H', '�?': 'W', 'Ϊ': 'I',
			'Ϋ': 'Y',
			'α': 'a', '�?': 'b', '�?': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
			'�?': 'i', 'κ': 'k', 'λ': 'l', '�?': 'm', '�?': 'n', '�?': '3', 'ο': 'o', 'π': 'p',
			'�?': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
			'ά': 'a', '�?': 'e', 'ί': 'i', 'ό': 'o', '�?': 'y', 'ή': 'h', '�?': 'w', 'ς': 's',
			'�?': 'i', 'ΰ': 'y', 'ϋ': 'y', '�?': 'i',
			// Turkish
			'�?': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', '�?': 'G',
			'ş': 's', 'ı': 'i', 'ç': 'c', '�?': 'u', 'ö': 'o', 'ğ': 'g',
			// Russian
			'??': 'A', '?�': 'B', '?�': 'V', '?�': 'G', '?�': 'D', '?�': 'E', '??': 'Yo', '?�': 'Zh',
			'?�': 'Z', '?�': 'I', '?�': 'J', '??': 'K', '?�': 'L', '?�': 'M', '??': 'N', '??': 'O',
			'?�': 'P', '?�': 'R', '?�': 'S', '?�': 'T', '?�': 'U', '??': 'F', '?�': 'H', '??': 'C',
			'?�': 'Ch', '?�': 'Sh', '?�': 'Sh', '?�': '', '?�': 'Y', '?�': '', '??': 'E', '?�': 'Yu',
            '?�': 'Ya',
            '?�': 'a', '?�': 'b', '??': 'v', '??': 'g', '?�': 'd', '?�': 'e', 'ё': 'yo', '?�': 'zh',
            '?�': 'z', '?�': 'i', '??': 'j', '?�': 'k', '?�': 'l', '??': 'm', '??': 'n', '??': 'o',
            '?�': 'p', 'р': 'r', '�?': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sh', '�?': '', 'ы': 'y', 'ь': '', '�?': 'e', '�?': 'yu',
            '�?': 'ya',
            // Ukrainian
            '?�'
                : 'Ye', '?�': 'I', '?�': 'Yi', '�?': 'G',
                'є'
                : 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
                // Czech
                'Č'
                : 'C', '�?': 'D', '�?': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', '�?': 'T', 'Ů': 'U',
                '�?'
                : 'Z',
                '�?'
                : 'c', '�?': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
                '�?'
                : 'z',
                // Polish
                'Ą'
                : 'A', 'Ć': 'C', 'Ę': 'e', '�?': 'L', 'Ń': 'N', 'Ó': 'o', '�?': 'S', '�?': 'Z',
                'Ż'
                : 'Z',
                'ą'
                : 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', '�?': 'o', 'ś': 's', 'ź': 'z',
                '�?'
                : 'z',
                // Latvian
                'Ā'
                : 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
                'Š'
                : 'S', 'Ū': 'u', '�?': 'Z',
                '�?'
                : 'a', '�?': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', '�?': 'l', 'ņ': 'n',
                'š'
                : 's', 'ū': 'u', '�?': 'z'
		};
		for (var k in char_map) {
			//s = s.replace(new RegExp(k, 'g'), char_map[k]);
		}
		return s;
	};
        function updatePredictionsDropDownDisplay(dropDown, input) {
            if (typeof (input.offset()) !== 'undefined') {
                dropDown.css({
                    'width': input.outerWidth(),
                    'left': input.offset().left,
                    'top': input.offset().top + input.outerHeight()
                });
            }
        }

		jQuery('input.wp_rem_search_location_field').cityAutocomplete();

		jQuery(document).on('click', '.wp_rem_searchbox_div', function () {
			jQuery('.wp_rem_search_location_field').prop('disabled', false);
		});

		jQuery(document).on('click', 'form', function () {
			var src_loc_val = jQuery(this).find('.wp_rem_search_location_field');
			src_loc_val.next('.search_keyword').val(src_loc_val.val());
		});
}(jQuery));