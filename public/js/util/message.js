function message (errorDiv, header, headerVal, error, errorVals) {
	$(`#${header}`).html(headerVal);

	var errorString = '';
	for (var i = 0; i < errorVals.length; i++) {
		errorString += errorVals[i];
	}
	$(`#${error}`).html(errorString);

	$(`#${errorDiv}`).removeClass('hidden');
}

function alert_message (header, message, color) {
	$('#alert-header').html(header);
	$('#alert-body').html(message);
	$('#alert').css('background-color', color)
	$('#alert').removeClass('hidden');
}

function hide_alert() {
	$('#alert').addClass('hidden');
	
}
