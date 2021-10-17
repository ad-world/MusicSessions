function message (errorDiv, header, headerVal, error, errorVals) {
	var headerRef = $(`#${header}`);
	var errorRef = $(`#${error}`);

	console.log(headerRef);
	console.log(errorRef);

	console.log(headerVal);
	console.log(errorVals);

	$(`#${header}`).html(headerVal);

	var errorRef = $(`#${error}`);
	var errorString = '';
	for (var i = 0; i < errorVals.length; i++) {
		errorString += errorVals[i];
	}
	console.log(errorString);
	$(`#${error}`).html(errorString);

	$(`#${errorDiv}`).removeClass('hidden');
}
