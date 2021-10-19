$(document).ready(function () {
	$('.ui.search').search({
		apiSettings   : {
			url        : '/api/search?keywords={query}'
		},
		fields        : {
			results     : 'items',
			title       : 'name',
			description : 'artists',
			image       : 'image'
		},
		minCharacters : 2
	});
});

function create_queue () {
	fetch('/api/session/create', {
		method : 'post'
	})
		.then((data) => data.json())
		.then((data) => {
			let id = data.id;

			let temp = location.href;
			temp += 'session/' + id;

			location.href = temp;
		});
}

function remove_rager (connected_id) {
	fetch('/api/session/remove', {
		method  : 'post',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify({
			connected_id : connected_id
		})
	})
		.then((data) => data.json())
		.then((data) => {
			if (data.status == 'success') {
				var temp = location.href;
				location.href = temp;
			}
		});
}
