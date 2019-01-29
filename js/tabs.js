(function () {

	$.fn.tabsPlugin = function(options){
		var options = $.extend({
			'tabMenu':'.nav-tabs',
			'tabItemMenu':'.item-tab',
			'tabWrap':'.tab-wrap',
			'tabItemContent':'.tab-content',
			'tabAttr':'data-tab',
			'effectFadeIn': 'fadeIn',
			'effectFadeOut': 'fadeOut'

		}, options);

		var storage = {};
		var methods = {
			init: function(){

				$(options.tabItemMenu).on('click', function(){
					
					storage.tabAttr = $(this).attr(options.tabAttr);
					methods.changeActive(this);

				});
			},

			changeActive: function (ActiveItem){
				$(ActiveItem).addClass('active').siblings().removeClass('active');
				$(ActiveItem)
					.closest(options.tabMenu)
					.next(options.tabWrap)
					.find('['+options.tabAttr+'="'+storage.tabAttr+'"]')
					.addClass('active fadeIn').removeClass('fadeOut')
					.siblings().removeClass('active fadeIn').addClass('fadeOut');
			}


		};
		methods.init();
	}
})(jQuery);
