'use strict';

var $windowWidth = $(window).width(),
    $height = undefined;

function checkWidth() {
	if ($windowWidth > 767) {
		$height = $(window).height() - $('.navbar').outerHeight();
	} else {
		$height = 'auto';
	}
}

jQuery.fn.scrollTo = function (elem) {
	var b = $(elem);
	this.scrollTop(b.position().top + b.height() - this.height());
};

function checkAdresses(element) {
	if ($(element).children('.js-create-new-address').is(':checked')) {
		$(element).parents('.checkout-user').find('.addresses-create').addClass('addresses-create--active');
	} else {
		$(element).parents('.checkout-user').find('.addresses-create').removeClass('addresses-create--active');
	}
}

function checkSameAsShipping(element) {
	checkAdresses(element);
	if (!$(element).children('input').is(':checked')) {
		$(element).parents('.checkout-user').find('.checkout-notsame').addClass('checkout-notsame--active');
	} else {
		$(element).parents('.checkout-user').find('.checkout-notsame').removeClass('checkout-notsame--active');
	}
}

$(document).ready(function () {
	checkWidth();

	$(".dl_input_date").on("change", function() {
		var date_str = moment(this.value, "YYYY-MM-DD").format( this.getAttribute("data-date-format"));
		if(date_str == 'Invalid date') {
			date_str = '';
		}
		this.setAttribute("data-date", date_str)
	}).trigger("change");

	$('.item-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});

	$('.item-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	$('.cart-remove').click(function () {
		var $cartRow = $(this).closest('.cart-row');
		$cartRow.hide("slow", function () {
			$(this).remove();
		});
		return false;
	});

	$('.js-search').click(function () {
		$('.search-toggle').toggle('fast');
	});

	$('.js-remove-saved-address').click(function () {
		var $cartRow = $(this).closest('.saved-address');
		$cartRow.hide("slow", function () {
			$(this).remove();
		});
		return false;
	});

	$('.js-height').css('height', $height);

	$('.how').on('click', '.js-toggle-how', function () {
		$('.how').toggleClass('how--active');
		$('.form--promo').toggleClass('how-active');

		return false;
	});

	$('#modal-login').on('click', '.js-toggle-create-acc', function () {
		var $btn = $(this),
		    $form = $('.create-form-mobile'),
		    $modalContent = $(this).parents().find('.modal-content'),
		    $modalHeight = $('.create-form-mobile').outerHeight();

		$btn.toggleClass('btn-create--active');
		$form.toggleClass('active');

		$('#modal-login').animate({
			scrollTop: $('.create-form-mobile').parent().scrollTop() + $('.create-form-mobile').offset().top - $('.create-form-mobile').parent().offset().top
		}, {
			duration: 500,
			complete: function complete(e) {
				console.log("animation completed");
			}
		});

		return false;
	});

	$('.navbar').on('click', '.js-toggle-hamburger', function () {
		$(this).toggleClass('active');
		$('.hamburger').toggleClass('hamburger--active');
		$('body').toggleClass('hamburger--active');

		return false;
	});

	$('#modal-login').on('show.bs.modal', function (e) {

		if ($('.js-toggle-hamburger').hasClass('active')) {
			$('.js-toggle-hamburger').trigger('click');
		}
	});

	$(".js-show-add-new").each(function () {
		checkAdresses($(this));
	});

	checkSameAsShipping($('.js-same-as-shipping'));

	$('.checkout-form').on('click', '.js-show-add-new', function () {
		checkAdresses($(this));
	});

	$('input[name="offer_condition"]').change(function() {
		load_offer();
	});

	$('.js-edit-settings').on('click', function () {
		$(this).toggleClass('btn-disabled');
		$(".js-form-control").each(function () {
			if ($(this).attr('disabled')) {
				$(this).removeAttr('disabled');
			} else {
				$(this).attr('disabled', 'disabled');
			}
		});
		$('.js-form-control').toggleClass('form-control-plaintext');
		$('.js-form-control').toggleClass('form-control');
	});

	// $('.js-form-control').on('focusout', function(){
	// 	$('.js-edit-settings').toggleClass('btn-disabled');

	// 	$(".js-form-control").each(function() {
	// 	  	$(this).attr('disabled', 'disabled');
	// 	});

	// 	$('.js-form-control').toggleClass('form-control-plaintext');
	// 	$('.js-form-control').toggleClass('form-control');
	// });

	$('.checkout-form').on('click', '.js-same-as-shipping', function () {
		checkSameAsShipping($(this));
	});

	$('.js-carousel').slick({
		slidesToShow: 5,
		dots: false,
		responsive: [{
			breakpoint: 980,
			settings: {
				dots: false,
				arrows: true,
				centerMode: false,
				centerPadding: 0,
				slidesToShow: 3
			}
		}, {
			breakpoint: 560,
			settings: {
				arrows: true,
				centerMode: false,
				centerPadding: 0,
				slidesToShow: 2
			}
		}]
	});

	$('.attribute').change(function() {
        $('#clicked_key').val($(this).data('key'));
        change_variation(true);
	});
});
function scraper_change_variable(ele, asin) {
    var market = $.trim($('#product-marketplace').val());
	var available = ($(ele).data('available'));
	if(typeof(available) == 'undefined' || available == '') {
        setTimeout(function(){
        	$(ele).removeClass('active');
        },100);
	} else {
        show_loading();
        setTimeout(function(){
            $(ele).parent().find('label.active').removeClass('focus').removeClass('active');
            $(ele).addClass('active');
            window.location.href = '/result/' + asin + '?domain=' + market;
        },100);
	}
}
function change_variation(run_ajax) {
    var groups = $('.dl_attr_groups');
    var attributes = [];
    for(var i=0; i< groups.length;i++) {
        attributes.push($(groups[i]).find('input.attribute:checked').data('key')+'');
    }

    var variations_str = $('#variations_available').val();
    var variations_arr = variations_str.split(',');
    var asin = '';
	for(var i=0;i<variations_arr.length;i++) {
		var comp = variations_arr[i].split('.');
		var tmp_asin = comp[comp.length - 1];
        comp[comp.length - 1] = '';
        if(compare_arrays(attributes, comp)) {
            asin = tmp_asin;
            break;
		}
	}
	if(asin == '') {
		setTimeout(function(){
            $('.dl_attr_groups').find('label.active').removeClass('focus').removeClass('active');
            var variations_str = $('#variations_available').val();
            var variations_arr = variations_str.split(',');
            var clicked_key = $('#clicked_key').val();
            for(var i=0; i< variations_arr.length;i++) {
                if($.inArray(clicked_key, variations_arr[i].split('.')) > -1) {
                    variations_str = variations_arr[i];
                    break;
				}
            }
            variations_arr = variations_str.split('.');
            for(var i=0; i< variations_arr.length - 1;i++) {
                var k = variations_arr[i];
                $('input[data-key="' + k + '"]').prop('checked', true);
                $('input[data-key="'+k+'"]').parent().addClass('active');
            }
            change_variation(run_ajax);
		},100);
	} else {
		var market = $.trim($('#product-marketplace').val());
        window.history.pushState("", "", "/result/"+asin+'?domain='+market);
        loadAvaibleAttributes();
        if (run_ajax) {
        	show_variation(asin);
        }
    }
}

function show_variation(asin) {
    $('#product-asin').val(asin);
    $('#product_img').attr('src',$('#'+asin+'_image').text());
    $('h3.item-title').html($('#'+asin+'_title').text());
    $('#js-add-to-cart').attr('style', 'z-index: 99;display:none !important');
    var notify = $('#'+asin+'_notify').text();
    if(notify != '') {
		$('#js-price').html('<span>'+notify+'</span>');
	} else {
		var from_price = parseFloat($('#'+asin+'_from_price').text());
		var to_price = parseFloat($('#'+asin+'_to_price').text());
		var from_currency = $('#'+asin+'_from_currency').text();
		var to_currency = $('#'+asin+'_to_currency').text();
		if (parseInt($('#'+asin+'_from_price').text()) > 0) {
			$('#js-add-to-cart').attr('style', 'z-index: 99;display:flex !important');
			var html = '<span id="item-price-converted">' + to_price.toFixed(2) + '</span> ';
			html += to_currency;
			html += '<span class="item-price--small"> / <span id="item-price-original">' + from_price.toFixed(2);
			html += '</span> ' + from_currency + '</span>';
			$('#js-price').html(html);
		}
	}
    var htm = '';
    var dimensionsCm = $('#'+asin+'_dimensionsCm').text();
    var weight = parseFloat($('#'+asin+'_weight').text());
    if(dimensionsCm != '') {
        htm += 'Product dimensions <span id="dimensions">'+dimensionsCm+'</span> cm.';
    }
    if(weight > 0) {
        var weightKg = weight * 0.45359237;
        htm += 'Item weight <span id="weight">'+weightKg.toFixed(2)+'</span> kg.';
    }
    $('#js-item-dimension').html(htm);
	$('#product_offer').html('');
}

function loading_product() {
    $.ajax({
        url: "/loading_products",
        success: function(result){}
    });
}

function show_loading() {
    $('.loading_overlay').show();
    $('.loading_spinner').show();
}
function hide_loading() {
    $('.loading_overlay').hide();
    $('.loading_spinner').hide();
}

function loadUnSupportAttributes(asin) {
    var variations_str = $('#variations_available').val();
    var variations_arr = variations_str.split(',');
    var vari = '';
    for(var k=0;k<variations_arr.length;k++) {
        var comp = variations_arr[k].split('.');
        if(comp.length != 2) {
			break;
		}
		if(comp[1] == asin) {
            vari = comp[0];
            break;
		}
    }
    if(vari == '') return false;
	var inlavel = $('input[data-key="'+vari+'"').parent().html();
    $('input[data-key="'+vari+'"').parent().remove();
	inlavel = '<label class="btn btn-outline-secondary no_support">' + inlavel + '</label>';
	$('.dl_attr_groups').append(inlavel);
}

function loadAvaibleAttributes() {
	var groups = $('.dl_attr_groups');
	for(var i=0; i< groups.length;i++) {
		var cur_attrs = $(groups[i]).find('input.attribute');
		for(var ii=0;ii<cur_attrs.length;ii++) {
		    if($(cur_attrs[ii]).val() == '') {
		        continue;
            }
            var attributes = [];
            for(var j=0; j< groups.length;j++) {
				if(i==j) {
                    attributes.push($(cur_attrs[ii]).data('key')+'');
				} else {
                    attributes.push($(groups[j]).find('input.attribute:checked').data('key')+'');
				}
            }
            var variations_str = $('#variations_available').val();
            $(cur_attrs[ii]).parent().addClass('disable');
            var variations_arr = variations_str.split(',');
            for(var k=0;k<variations_arr.length;k++) {
                var comp = variations_arr[k].split('.');
                comp[comp.length - 1] = '';
                if(compare_arrays(attributes, comp)) {
                    $(cur_attrs[ii]).parent().removeClass('disable');
                }
            }
		}
	}
}
function compare_arrays(array1, array2) {
    for(var i=0;i<array1.length;i++) {
        var el = array1[i];
        if (el != '' && $.inArray(el, array2) == -1) {
            return false;
        }
    }
    for(var i=0;i<array2.length;i++) {
        var el = array2[i];
        if (el != '' && $.inArray(el, array1) == -1) {
            return false;
        }
    }
    return true;
}
function load_offer() {
	var offers = $('input[name="offer_condition"]');
	for(var i=0;i<offers.length;i++) {
		if($(offers[i]).is(":checked")) {
            var from_price = $(offers[i]).data('price');
            var to_price = $(offers[i]).data('to_price');
            var from_currency = $(offers[i]).data('currency');
            var to_currency = $(offers[i]).data('to_currency');
			var html = '<span id="item-price-converted">' + to_price.toFixed(2) + '</span> ';
			html += to_currency;
			html += '<span class="item-price--small"> / <span id="item-price-original">' + from_price.toFixed(2);
			html += '</span> ' + from_currency + '</span>';
			$('#js-price').html(html);
		}
	}
}

$(window).on('resize', function () {
	checkWidth();
	$('.js-height').css('height', $height);
});
//# sourceMappingURL=theme-run.js.map
