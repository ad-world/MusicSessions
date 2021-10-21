function join_qr (join_id) {
	var name = $('#name').val();

	if (!name.length) {
		message('errors', 'error-header', "There's a problem.", 'error-message', 'Name cannot be empty.');
		return;
	}
    console.log(join_id)

	fetch('/api/session/join', {
		method  : 'post',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify({
			name    : name,
			join_id : join_id
		})
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status == 'failure') {
				message('errors', 'error-header', "There's a problem.", 'error-message', [ `${res.message}` ]);
				return;
			} else {
				var temp = location.href.split('/');
				temp.pop();
                temp.pop();
				temp.push('session');
				temp.push(`user/${res.queue_id}`);

				temp = temp.join('/');
				location.href = temp;
				return;
			}
		});
}
