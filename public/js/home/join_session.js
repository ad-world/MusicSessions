function join_session () {
	var name = $('#name').val();
	var code = $('#code').val();

	if(form_validation(['name', 'code'])) {
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
					return;
				} else {
					var temp = location.href.split('/');
					temp.pop();
					temp.push('session');
					temp.push(`user/${res.queue_id}`);
	
					temp = temp.join('/');
					location.href = temp;
					return;
				}
			});
	}
}

function form_validation(tag_names) {
	let errors = false;
	for(let i = 0; i < tag_names.length; i++) {
		const current_el = $(`#${tag_names[i]}`).val();
		if(!current_el.length) {
			$(`#${tag_names[i]}`).removeClass('border-black border-solid border-2');
			$(`#${tag_names[i]}`).addClass('border-red-main border-2');
			errors = true;
		} else {
			$(`#${tag_names[i]}`).addClass('border-black border-solid border-2');
		}
	}

	return !errors;
}
