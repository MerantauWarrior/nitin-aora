(function ($) {

	$.fn.validate = function (opt) {

		this.each(function (i) {

			var DOM = {},
				state = {},
				$self = $(this);

			// options
			if (!opt) {
				opt = {};
			}

			opt = $.extend({
				submitHandler: function() {
					this.submit();
				}
			}, opt);

			// methods
			var plg = {
				init: function () {
					DOM.$fields = $self.find('[data-validate]');
					$self.find('input[type="submit"], .submit,button[type="submit"]').on('click', plg.submit);
					DOM.$fields.on('focus', function () {
						plg.removeLabel( $(this) );
					})
				},
				test: function (data, type, checked, name) {
					switch (type) {
						case 'name':
							return /^[а-яіїєґёА-ЯІЇЄҐЁa-zA-Z\-]+\s{0,1}[а-яіїєґёА-ЯІЇЄҐЁa-zA-Z\-]+\s{0,}[а-яіїєґёА-ЯІЇЄҐЁa-zA-Z\-]+\s{0,}$/.test(data);
						case 'phone':
							return /^[\(\)0-9\-\s\+]{6,}/.test(data);
						case 'phone-default':
							if (data === null || data === "null" || data === "false" || data === "0" || data === "undefined" ||data === "" ){
								return true;
							} else{
								return /^[\(\)0-9\-\s\+]{6,}/.test(data);
							}
						case 'email':
							return /^[0-9a-zA-Z._-]+@[0-9a-zA-Z_-]+\.[a-zA-Z._-]+/.test(data);
						case 'email-default':
							if (data === null || data === "null" || data === "false" || data === "0" || data === "undefined" ||data === "" ){
								return true;
							} else{
								return /^[0-9a-zA-Z._-]+@[0-9a-zA-Z_-]+\.[a-zA-Z._-]+/.test(data);
							}
						case 'number':
							return /^[0-9]/.test(data);
						case 'zip_code':
							return /^[0-9]{5,10}/.test(data);
						case 'cart':
							return /^[0-9]{16,}/.test(data);
						case 'number-default':
							if (data === null || data === "null" || data === "false" || data === "0" || data === "undefined" ||data === "" ){
								return true;
							} else{
								return /^[0-9]/.test(data);
							}
						case 'default':
							return /^[а-яіїєґёА-ЯІЇЄҐЁa-zA-Z0-9#\-]+/.test(data);

						case 'password':
							return /^[a-zA-Z0-9]{8}/.test(data);
						case 'password-default':
							if (data === null || data === "null" || data === "false" || data === "0" || data === "undefined" ||data === "" ){
								return true;
							} else{
								return /^[a-zA-Z0-9]{8}/.test(data);
							}
						case 'empty':
							if (data === null || data === "null" || data === "false" || data === "0" || data === "undefined" ||data === "" ){
								return true;
							} else {
								return /^[а-яіїєґёА-ЯІЇЄҐЁa-zA-Z0-9#\-]+/.test(data);
							}
                        case 'active_code':
                            return /^[a-zA-Z0-9!]{44}/.test(data);

						case 'select':
							return !(data === null || data === "null" || data === "false" || data === "0" || data === "undefined" || data === "");

						case 'checkbox':
							if (checked == true){
								return true;

							} else {
								return false;
							}

						case 'radio':
							var radios = document.getElementsByName(name);

							for (i = 0; i < radios.length; i++) {
								if (radios[i].checked) {
									return true;
								}
							}
							return false;

						case 'quantity':
							return /^[1-9]/.test(data);

						default:
							return true;
					}
				},
				addLabel: function ($el) {
					if ($el.attr('data-validate') == 'radio'){
						$el.parent().parent().addClass('error');
					} else{
						$el.parent().addClass('error');
					}

				},
				removeLabel: function ($el) {

					if ($el.attr('data-validate') == 'radio'){
						$el.parent().parent().removeClass('error');
					} else{
						$el.parent().removeClass('error');
					}
				},
				validate: function ($el) {
					if ( plg.test( $el.val(), $el.attr('data-validate'), $el.is(':checked'), $el.attr('name') ) ) {
						plg.removeLabel( $el );
					} else {
						plg.addLabel( $el );
						state.errors++;
					}
				},
				validateConfirm: function ($el) {

					var confirmData = $el.attr('data-confirm');
                    var elVal = $el.val();
					var elConfirmVal = $el.closest('form').find('[name="'+ confirmData+'"]').val();

					if ( elVal == elConfirmVal) {
						plg.removeLabel( $el );
					} else {
						plg.addLabel( $el );
						state.errors++;
					}

				},
                validateRequired: function ($el) {

                    var elVal = $el.val();
                    var requiredData = $el.attr('data-required');
                   	var elrequired = $el.closest('form').find('[name="'+ requiredData+'"]').val();


					if (elVal === null || elVal === "null" || elVal === "false" || elVal === "0" || elVal === "undefined" ||elVal === "" ) {


					} else {

                        if (elrequired === null || elrequired === "null" || elrequired === "false" || elrequired === "0" || elrequired === "undefined" ||elrequired === "" ){
                            $el.closest('form').find('[name="'+ requiredData+'"]').parent().addClass('error');
                            state.errors++;

						}

					}
                },
				submit: function (e) {

					state.errors = 0;
					$self.find('[data-validate]').each( function () {
						plg.validate( $(this) );
					} );
                    $self.find('[data-required]').each( function () {
                        plg.validateRequired( $(this) );
                    } );
					$self.find('[data-confirm]').each( function () {
						plg.validateConfirm( $(this) );
					} );


					if (state.errors) {
						e.preventDefault();
						//console.log(state.errors);
					} else {
						e.preventDefault();
						opt.submitHandler.call($self);
					}
				}
			};

			plg.init();

			return plg;
		});
	};

})(jQuery);
