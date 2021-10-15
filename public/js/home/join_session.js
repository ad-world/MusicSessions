function join_session () {
	var name = $('#name').val();
	var code = $('#code').val();

	console.log(name);
	console.log(code);

	fetch('/api/session/join', {
		method  : 'post',
		headers : {
			Accept       : 'application/json',
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify({
			name    : name,
			join_id : code
		})
	})
		.then((res) => res.json())
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
}
