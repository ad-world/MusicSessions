function message (errorDiv, header, headerVal, error, errorVals) {
	$(`#${header}`).html(headerVal);

	var errorString = '';
	for (var i = 0; i < errorVals.length; i++) {
		errorString += errorVals[i];
	}
	$(`#${error}`).html(errorString);

	$(`#${errorDiv}`).removeClass('hidden');
}
