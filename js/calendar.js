$(document).ready(function(){
	/*calendar*/
	pickmeup('input#sortFrom', {
		position: 'bottom',
		first_day: 0,
		format	: 'd b m',
		title_format	: 'b Y',
		prev: '',
		next: '',
		hide_on_select : true
	});
	pickmeup('input#sortTo', {
		position: 'bottom',
		first_day: 0,
		format	: 'd b m',
		title_format	: 'b Y',
		prev: '',
		next: '',
		hide_on_select : true
	});
});