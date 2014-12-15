$(document).ready(function() {
	var pointer = $("#pointer");

	pointer.on("mouseover", function() {
		showOptionsOverlay();
	});

	pointer.on('mouseleave', function() {
		hideOptionsOverlay();
	});

	function showOptionsOverlay() {
		var options = "<div id=\"options\">This marker indicates the part related"
					+ " to the content displayed on the right.</div>";
		$(document.body).append(options);
		var optionsDiv = $("#options");
		optionsDiv.css({
			'border': '3px solid #AC7641',
			'background-color': 'white',
			'position': 'fixed',
			'padding': '5px',
			'top': pointer.position().top + pointer.height()/2 - optionsDiv.height()/2,
			'left': pointer.position().left - pointer.offset().left + pointer.width()
		});
	}

	function hideOptionsOverlay() {
		$("#options").remove();
	}
});