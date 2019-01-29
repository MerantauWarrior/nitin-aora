'use strict';

(function () {

	$.fn.modalPlugin = function (options) {
		var options = $.extend({
			'overlayClass': '#overlay',
			'openModalClass': '.js_open_modal',
			'closeClass': '.modal_close',
			'modalClass': '.modal_div',
			'showClass': 'show',
			'hideClass': 'hide',
			'attrModal': 'data-modal',
			'bodyNoScroll': 'no-scroll',
			'messageModalClass': '.message_modal',
			'body': 'body, html'

		}, options);

		var storage = {};
		var methods = {
			init: function init() {

				$(window).resize();

				$('body').on('click', options.openModalClass, function (e) {
					e.preventDefault();
					$('.modal_div').addClass(options.hideClass);
					storage.modal = $(this).attr(options.attrModal);
					//console.log(storage.modal);
					methods.open();
					methods.bodyAddClass();
					$(window).resize();
				});

				$(options.closeClass).on('click', function () {
					methods.close();
					methods.bodyRemoveClass();
				});

				$(options.body).keydown(function (eventObject) {
					if (eventObject.which == 27) {
						methods.close();
						methods.bodyRemoveClass();
					}
				});

				if ($(options.modalClass).hasClass('show')) {
					methods.open();
					methods.bodyAddClass();
				}

				if (window.location.hash) {
                    if(window.location.hash == '#login_modal') {
                        storage.modal = $(window.location.hash);
                        methods.open();
                        methods.bodyAddClass();
                    }
                    if(window.location.hash == '#sign_up' && $('#sign_up').length > 0) {
                        storage.modal = $(window.location.hash);
                        methods.open();
                        methods.bodyAddClass();
                    }
				}
			},

			open: function open() {
				$(storage.modal).removeClass(options.hideClass);
				$(options.overlayClass).removeClass(options.hideClass);
			},

			close: function close() {
				$(options.modalClass).addClass(options.hideClass);
				$(options.overlayClass).addClass(options.hideClass);
				$(options.messageModalClass).removeClass(options.showClass);
			},

			bodyAddClass: function bodyAddClass() {
				$(options.body).addClass(options.bodyNoScroll);
			},

			bodyRemoveClass: function bodyRemoveClass() {
				$(options.body).removeClass(options.bodyNoScroll);
			}

		};
		methods.init();
	};
})(jQuery);
