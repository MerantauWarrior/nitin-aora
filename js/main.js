$(document).ready( function () {
	// validate
	$("#header_search_form").validate();

	//modal
	$('body').modalPlugin();


	//my account edit form
	$('.js_edit').on('click', function(e) {
		e.preventDefault();
		$(this).hide();
        $(this).closest('.block_section_account').find('form input').removeAttr('readonly');
        $(this).closest('.block_section_account').find('form select').removeAttr('disabled');
        $(this).closest('.block_section_account').find('form select').addClass('atc');
		$(this).closest('.block_section_account').find('form .block_button').addClass('show');
		$(this).closest('.block_section_account').find('form .billing-address__inner').addClass('show');
	});
	$('.js_cancel').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.block_section_account').find('.js_edit').show();
		$(this).closest('.block_section_account').find('form')[0].reset();
		$(this).closest('.block_section_account').find('form input').attr('readonly', true);
        $(this).closest('.block_section_account').find('form select').attr('disabled', true);
        $(this).closest('.block_section_account').find('form select').removeClass('atc');
		$(this).closest('.block_section_account').find('form .block_button').removeClass('show');
		$(this).closest('.block_section_account').find('form .billing-address__inner').removeClass('show');
	});
	$('.js-billing-address').on('click', function() {
		if ($(this).prop('checked')==true){ 
      $('form .billing-address__inner').css('opacity','0.7');
    }else{
			$('form .billing-address__inner').css('opacity','1');
		}		
	});

	//checkout step
	$('.js_accordion').on('click', function () {
		$(this).toggleClass('active').next('.block_section__wrap').slideToggle("slow");
	});

	/*checkout-new steps*/
	$('.checkout__step').on('click', function () {
		if ($(this).hasClass('disabled'))
			return false;

		var where = $(this).data('to');
		$('.tab-content > .tab-pane').removeClass('active');
		$('.tab-content > .tab-pane#'+where).addClass('active');
		$('.checkout__step').removeClass('checkout__step_active');
		$(this).addClass('checkout__step_active');
	});

	$('.checkout__prev-step').on('click', function () {
		var where = $(this).data('to');
		if($(this).hasClass('submit')){
			return false;
		}
		$('.checkout__step').removeClass('checkout__step_active');
		$('.checkout__step[data-to="'+where+'"]').addClass('checkout__step_active');
		$('.tab-content > .tab-pane').removeClass('active');
		$('.tab-content > .tab-pane#'+where).addClass('active');
		$('html, body').animate({
			scrollTop: $('.checkout').offset().top-30
		}, 300);
	});

	/*checkout-review-total*/
	$('.chrt-expand').on("click", function(){
		$(this).toggleClass('chrt-expand_open');
		$(this).siblings('div.checkout-review-total__subitems').slideToggle(300);
	});
	/*checkout-review-change*/
	$('.checkout-review-save__expand').on("click", function(){
		$('.checkout-review-change').slideToggle(300);
	});
	/*mobile menu*/
	$('.main-header-mobile__open').on("click", function(){
		// $('.main-header-mobile__menu').slideDown();
		$('.main-header-mobile__menu').addClass('main-header-mobile__menu_opened');
		$('.main-header-mobile__close').fadeIn();
		$('.main-header-mobile__open').fadeOut();
	});
	$('.main-header-mobile__close').on("click", function(){
		// $('.main-header-mobile__menu').slideUp();
		$('.main-header-mobile__menu').removeClass('main-header-mobile__menu_opened');
		$('.main-header-mobile__open').fadeIn();
		$('.main-header-mobile__close').fadeOut();
		// $('.main-header__search').fadeOut();
	});
	/*sticky header*/
	$(window).scroll(function(){
		var sticky = $('.main-header__controls'),
				elH = sticky.height();
				scroll = $(window).scrollTop();
		if (scroll >= 150) {
			sticky.addClass('posf-main-header');			
			$('.main-header__search.main-header__search-landing').show();
			$('body').css('padding-top', elH+'px');
			$('.slide-menu').addClass('fixed-search');
		}else{
			sticky.removeClass('posf-main-header');
			$('.main-header__search.main-header__search-landing').hide();
			$('body').css('padding-top', '0px');
			$('.slide-menu').removeClass('fixed-search');
		}
	});
	
	/*header orders scripts*/
	$('.orders-page-order__head-arrow_opened').parent().siblings('.orders-page-order__body').show();
	$('.orders-page-order__head-arrow').click(function(){
		var that = $(this);
    if(that.hasClass('orders-page-order__head-arrow_opened')){
			that.removeClass('orders-page-order__head-arrow_opened');
			that.parent().next().slideUp(300);
    }else{
			$('.orders-page-order__head-arrow').removeClass('orders-page-order__head-arrow_opened');
			that.parent().parent().siblings('.orders-page-order').find('.orders-page-order__body').slideUp(300);
			that.toggleClass('orders-page-order__head-arrow_opened');
			that.parent().next().slideToggle(300);
    }
	});
	/*
	$('.ho-order-bar__arrow_opened').parent().siblings('.ho-order-toggle').show();
	$('.ho-order-bar__arrow').click(function(){
		var that = $(this);
    if(that.hasClass('ho-order-bar__arrow_opened')){
			that.removeClass('ho-order-bar__arrow_opened');
			that.parent().next().slideUp(300);
    }else{
			$('.ho-order-bar__arrow').removeClass('ho-order-bar__arrow_opened');
			that.parent().parent().siblings('.ho-order').find('.ho-order-toggle').slideUp(300);
			that.toggleClass('ho-order-bar__arrow_opened');
			that.parent().next().slideToggle(300);
    }
	});
	$('.ho-order-block-bar__arrow').click(function(){
		$(this).toggleClass('ho-order-block-bar__arrow_opened');
		$(this).parent().siblings('div').slideToggle();
	});*/
	
	/*mixture info*/
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
			isMobile = true;
	}
	if(isMobile === false){
		$('.cart-mixture-info').hover(function(){
			$('.cart-mixture-info').addClass('cart-mixture-info_opened');
		}, function(){
			$('.cart-mixture-info').removeClass('cart-mixture-info_opened');
		});
	}else{
		$('.cart-mixture-info__icon').click(function(){
			$('.cart-mixture-info').addClass('cart-mixture-info_opened');
		});
		$('.cart-mixture-info__close').click(function(){
			$('.cart-mixture-info').removeClass('cart-mixture-info_opened');
		});
	}


/*	$('.js_open_modal').on('click', function () {
		$('.slide-menu').removeClass('slide-menu--open').addClass('slide-menu--close');
	});*/


	$('input[name="color"]').change(function () {
		var activeColor = $(this).val();
		$('.js_name_color').text(activeColor);
	});

	$(window).bind('beforeunload', function(){
		$('.loading_screen').show();
		$('#overlay').removeClass('hide').css({display:'block', backgroundColor: 'rgba(255,255,255,0.85)'});
	});
});
