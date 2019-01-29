$(document).ready( function () {
	
	var AttachmentArray = [];
	var arrCounter = 0;
	document.getElementById('contactFiles').addEventListener('change', handleFileSelect, false);
	function handleFileSelect(e) {
			if (!e.target.files) return;
			var files = e.target.files;
			for (var i = 0, f; f = files[i]; i++) {
				var fileReader = new FileReader();
				fileReader.onload = (function (readerEvt) {
					return function (e) {
						RenderThumbnail(e, readerEvt);
						FillAttachmentArray(e, readerEvt)
					};
				})(f);
				fileReader.readAsDataURL(f);
			}
	}
	$(document).on('click', '.contact__downloaded-file button', function () {
		var id = $(this).data('pos');
		var elementPos = AttachmentArray.map(function (x) { return x.FileName; }).indexOf(id);
		if (elementPos !== -1) {
				AttachmentArray.splice(elementPos, 1);
		}
		$(this).parent().remove();
		console.log(AttachmentArray);
	});
	function RenderThumbnail(e, readerEvt){
		$('.contact__downloaded-files').append('<div class="contact__downloaded-file"><span>'+readerEvt.name+'</span><button type="button" data-pos="'+readerEvt.name+'">Close</button></div>');
	}
	function FillAttachmentArray(e, readerEvt){
		AttachmentArray[arrCounter] =
		{
			FileName: readerEvt.name,
			MimeType: readerEvt.type,
			Content: e.target.result.split("base64,")[1],
			FileSizeInBytes: readerEvt.size,
		};
		arrCounter = arrCounter + 1;
	}
	
});
