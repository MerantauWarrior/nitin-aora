/*=======================================================================*/
// Get IE or Edge browser version
/*var version = detectIE();
if (version === false) {
  document.getElementById('result').innerHTML = '<s>IE/Edge</s>';
} else if (version >= 12) {
  document.getElementById('result').innerHTML = 'Edge ' + version;
	var s = document.createElement("link");
	s.type = "text/css";
	s.src = "css/edge.css";
	$("head").append(s);
} else {
  document.getElementById('result').innerHTML = 'IE ' + version;
}
document.getElementById('details').innerHTML = window.navigator.userAgent;
function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
}*/

/*=======================================================================*/
/*--------------------------MOBILE-MENU-----------------------------*/
/**
var mobileMenuBtn = document.querySelector('.main-nav__toggle');
var mobileMenu = document.querySelector('.main-nav');

mobileMenuBtn.addEventListener('click', function () {

    if (mobileMenuBtn.classList.contains('main-nav__toggle--closed')) {
        mobileMenuBtn.classList.add('main-nav__toggle--opened');
        mobileMenuBtn.classList.remove('main-nav__toggle--closed');
        mobileMenu.classList.add('main-nav--opened');
    }
    else {
        mobileMenuBtn.classList.remove('main-nav__toggle--opened');
        mobileMenuBtn.classList.add('main-nav__toggle--closed');
        mobileMenu.classList.remove('main-nav--opened');
    }
});
**/

/*=======================================================================*/
/*--------------------------POPUP-----------------------------*/
/*var mobilePopup = document.querySelector('.main-nav__link--blue-btn');
var linkPopup = document.querySelector('.page-header__link--login');
var popupClose = document.querySelector('.popup__close');
var popup = document.querySelector('.popup');
var overlay = document.querySelector('.overlay');

mobilePopup.addEventListener('click', function () {
    popup.classList.add('popup--show');
    overlay.classList.add('overlay--show');
    document.body.style.overflowY = 'hidden';
});

linkPopup.addEventListener('click', function () {
    popup.classList.add('popup--show');
    overlay.classList.add('overlay--show');
    document.body.style.overflowY = 'hidden';
});

popupClose.addEventListener('click', function () {
    popup.classList.remove('popup--show');
    overlay.classList.remove('overlay--show');
    document.body.style.overflowY = 'visible';
});

overlay.addEventListener('click', function () {
    popup.classList.remove('popup--show');
    overlay.classList.remove('overlay--show');
    document.body.style.overflowY = 'visible';
});
*/

/*=======================================================================*/
/*--------------------------TO-TOP-----------------------------*/

var btnToTop = document.querySelector('.to-top');

window.onscroll = function () {
    var scrolled = document.documentElement.scrollTop;
    if (scrolled >= 800) {
        btnToTop.style.opacity = "1";
    }
    else {
        btnToTop.style.opacity = "0";
    }

    btnToTop.addEventListener('click', function () {
        document.documentElement.scrollTop = 0;
    });
};

$('.new-checkout-review-payment__controls-item').on('click', function () {
  var tabName = $(this).data('pay-method');
  $('.new-checkout-review-payment__tab').removeClass('new-checkout-review-payment__tab_active');
  $('.new-checkout-review-payment__tab#'+tabName).addClass('new-checkout-review-payment__tab_active');
  $('.new-checkout-review-payment__controls-item').removeClass('new-checkout-review-payment__controls-item_active');
  $(this).addClass('new-checkout-review-payment__controls-item_active');
});
$('.new-checkout-review-promocode__inp').on('keyup change', function () {
  if($(this).val() !== "" || $(this).val().length > 0){
    $('.new-checkout-review-promocode__btn').addClass('new-checkout-review-promocode__btn--filled');
  }else {
    $('.new-checkout-review-promocode__btn').removeClass('new-checkout-review-promocode__btn--filled');
  }
});
