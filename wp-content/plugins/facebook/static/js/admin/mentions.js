var FB_WP = FB_WP || {};
FB_WP.admin = FB_WP.admin || {};
FB_WP.admin.mentions = {
	// allow translated tool overrides
	messages: {
		likes: "%s like this",
		talking_about: "%s talking about this"
	},
	// textarea and a parent container for typeahead enhancement
	targets: {
		container: "facebook-timeline-mention-message-container",
		input: "facebook-timeline-mention-message"
	},
	// FBIDs already mentioned in the message
	// used to remove already mentioned FBIDs from search result display
	// user message may contain up to ten mentions
	mentioned: [],
	// allow locale-specific override of thousands separator used to display like counts
	thousands_separator: ",",
	// enhance textarea on focus
	init: function() {
		FB_WP.admin.mentions.input = jQuery( "#" + FB_WP.admin.mentions.targets.input );
		if ( FB_WP.admin.mentions.input.length === 0 ) {
			delete FB_WP.admin.mentions.input;
			return;
		}
		FB_WP.admin.mentions.input.trigger( "facebook-mentions-onload" );
		FB_WP.admin.mentions.input.focus(function(){FB_WP.admin.mentions.enable_autocomplete(FB_WP.admin.mentions.input)}).keypress(FB_WP.admin.mentions.keypress_handler);
	},
	// search the text for FBID mentions
	find_all_mentions: function( text ) {
		var re = /@\[(\d+)\]/g, matches;
		FB_WP.admin.mentions.mentioned = [];
		while( (matches=re.exec(text)) !== null ) {
			if ( jQuery.inArray( matches[1], FB_WP.admin.mentions.mentioned ) === -1 )
				FB_WP.admin.mentions.mentioned.push( matches[1] );
		}
	},
	// format an integer such as 1234 to a string with a thousands separator: 1,234
	format_number: function( num ) {
		return num.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, "$1" + FB_WP.admin.mentions.thousands_separator );
	},
	// enable or disable typeahead based on key input
	keypress_handler: function( event ) {
		if ( event.which === 64 ) { // @
			FB_WP.admin.mentions.find_all_mentions( FB_WP.admin.mentions.input.val() );
			if ( FB_WP.admin.mentions.mentioned.length < 10 ) {
				FB_WP.admin.mentions.input.autocomplete( "enable" );
			}
		} else if ( event.which === 27 ) { // disable on ESC
			FB_WP.admin.mentions.input.autocomplete( "disable" );
		}
	},
	// find the search term closest to the current cursor position for replacement by the search result
	extract_search_term: function() {
		var t_el = FB_WP.admin.mentions.input[0], end = -1, term = "";
		if ( typeof t_el.selectionStart === "number" ) {
			end = t_el.selectionStart;
		} else if ( document.selection && t_el.createTextRange ) {
			var range = document.selection.createRange();
			range.collapse(true);
			range.moveStart("character", -t_el.value.length);
			end = range.text.length;
		}
		// covers not set case and not enough text case
		if ( end < 2 ) {
			return {term:term,start:-1,end:end};
		}

		var t_val = FB_WP.admin.mentions.input.val();
		var start = t_val.lastIndexOf( "@", end );

		if ( start === -1 || end - start < 2 ) {
			return {term:term,start:start,end:end};
		}

		// extract without the trigger
		start++;

		term = jQuery.trim( t_val.substr( start, end - start ) );
		return {term:term,start:start,end:end};
	},
	// move the cursor to the end of search result text
	move_cursor: function( position ) {
		var t_el = FB_WP.admin.mentions.input[0];
		if ( typeof t_el.selectionStart === "number" ) {
			t_el.selectionStart = t_el.selectionEnd = position;
		} else if ( document.selection && t_el.createTextRange ) {
			var range = document.selection.createRange();
			selRange.collapse( true );
			range.moveStart( "character", position );
			range.moveEnd( "character", position );
			range.select();
		}
	},
	// setup jQuery UI autocomplete
	enable_autocomplete: function( el ) {
		if ( el.length === 0 ) {
			return;
		}
		el.autocomplete( {
			appendTo: "#" + FB_WP.admin.mentions.targets.container,
			autoFocus: true,
			minLength: 2,
			disabled: true,
			focus: function() {
				// prevent value inserted on focus
				return false;
			},
			source: function( request, response ) {
				var search_info = FB_WP.admin.mentions.extract_search_term();
				if ( search_info.term === undefined || search_info.term.length < 2 ) {
					return;
				}
				jQuery.ajax( {
					url: ajaxurl + "?" + jQuery.param({"action":"facebook_mentions_search_autocomplete","autocompleteNonce":FB_WP.admin.mentions.autocomplete_nonce,"q":search_info.term}),
					dataType: "json",
					cache: false,
					success: function( results ) {
						var filtered_results = [];
						jQuery.each( results, function( i, result ) {
							if ( result.id !== undefined && result.name !== undefined && jQuery.inArray( result.id, FB_WP.admin.mentions.mentioned ) === -1 ) {
								result.label = result.name;
								result.value = result.id;
								filtered_results.push( result );
							}
						} );
						if ( filtered_results.length === 0 ) {
							FB_WP.admin.mentions.input.autocomplete( "disable" );
						}
						response( filtered_results );
					},
					error: function() {
						response( [] );
					}
				});
			},
			search: function() {
				var search_info = FB_WP.admin.mentions.extract_search_term();
				if ( search_info.term === undefined || search_info.term.length < 2 ) {
					return false;
				}
			},
			focus: function( event, ui ) {
				// prevent value inserted on focus
				return false;
			},
			select: FB_WP.admin.mentions.select
		} ).data( "uiAutocomplete" )._renderItem = FB_WP.admin.mentions.renderItem;
	},
	// jQuery UI autocomplete item display override
	renderItem: function( ul, item ) {
		if ( item.object_type === "user" ) {
			return FB_WP.admin.mentions.render_user( item ).appendTo( ul );
		} else if ( item.object_type === "page" ) {
			return FB_WP.admin.mentions.render_page( item ).appendTo( ul );
		}
	},
	// user result item
	render_user: function( user ) {
		return jQuery( "<li>" ).addClass( "user" ).attr( {"role": "option", "aria-label": user.name} ).mouseenter(function(){jQuery(this).addClass("ui-state-focus")}).mouseleave(function(){jQuery(this).removeClass("ui-state-focus")}).append(
			jQuery( "<img>" ).attr( {src: (user.picture === undefined) ? "https:\/\/graph.facebook.com\/" + user.id + "\/picture" : user.picture, alt: user.name, width:32, height:32} ) ).append(
			jQuery( "<a>" ).addClass( "text" ).text( user.name )
		);
	},
	// page result item
	render_page: function( page ) {
		var li = jQuery( "<li>" ).addClass( "page" ).attr( {"role": "option", "aria-label": page.name} ).mouseenter(function(){jQuery(this).addClass("ui-state-focus")}).mouseleave(function(){jQuery(this).removeClass("ui-state-focus")});
		if ( page.image !== undefined ) {
			li.append( jQuery( "<img>" ).attr( {src: page.image, alt: page.name, width:32, height:32} ) );
		}
		li.append( jQuery( "<a>" ).addClass( "text" ).text( page.name ) );

		var subtext_pieces = [];
		if ( page.likes !== undefined ) {
			subtext_pieces.push( FB_WP.admin.mentions.messages.likes.replace( /%s/i , FB_WP.admin.mentions.format_number( page.likes ) ) );
		}
		if ( page.talking_about !== undefined ) {
			subtext_pieces.push( FB_WP.admin.mentions.messages.talking_about.replace( /%s/i , FB_WP.admin.mentions.format_number( page.talking_about ) ) );
		}
		if ( page.location !== undefined ) {
			if ( page.location.city !== undefined && page.location.city.length > 0 ) {
				if ( page.location.state !== undefined && page.location.state.length > 0 ) {
					subtext_pieces.push( page.location.city + ", " + page.location.state );
				} else if ( page.location.country !== undefined && page.location.country.length > 0 ) {
					subtext_pieces.push( page.location.city + ", " + page.location.country );
				}
			}
		}
		if ( page.category !== undefined ) {
			subtext_pieces.push( page.category );
		}
		if ( subtext_pieces.length !== 0 ) {
			li.append( jQuery( "<div>" ).addClass( "subtext" ).text( subtext_pieces.join( " ??? " ) ) );
		}

		return li;
	},
	// handle search result selection
	select: function( event, ui ) {
		if ( ui.item !== undefined ) {
			var item = ui.item;
			if ( jQuery.inArray( item.id, FB_WP.admin.mentions.mentioned ) === -1 ) {
				FB_WP.admin.mentions.mentioned.push( item.id );
				var search_info = FB_WP.admin.mentions.extract_search_term();
				if ( search_info.start !== -1 && search_info.end !== -1 ) {
					var existing_text = jQuery(this).val(), mention = "[" + item.id + "]";
					jQuery(this).val( existing_text.substring( 0, search_info.start ) + mention + existing_text.substring( search_info.end ) );
					FB_WP.admin.mentions.input.autocomplete( "disable" );
					FB_WP.admin.mentions.move_cursor( search_info.start + mention.length );
				}
			}
		}
		return false;
	}
}

jQuery(function(){
	FB_WP.admin.mentions.init();
});