function join_session () {
	var name = $('#name').val();
	var code = $('#code').val();

	console.log(name);
	console.log(code);

	fetch('/api/session/join', {
		method  : 'post',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify({
			name    : name,
			join_id : code
		})
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status == 'failure') {
				message('errors', 'error-header', "There's a problem.", 'error-message', [ `${res.message}` ]);
			} else {
				var temp = location.href.split('/');
				temp.pop();
				temp.push('session');
				temp.push(`user/${res.queue_id}`);

				temp = temp.join('/');
				location.href = temp;
			}
		});
}
