$(document).ready(function () {
	$('.ui.search').search({
		apiSettings   : {
			url : '/api/search?keywords={query}'
		},
		fields        : {
			results     : 'items',
			title       : 'name',
			description : 'artists',
			image       : 'image'
		},
		minCharacters : 2,
		onSelect      : function (result, response) {
			const song = result;
			fetch('/api/session/add/song', {
				method  : 'post',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify({
					song : song
				})
			})
				.then((res) => res.json())
				.then((res) => console.log(res))
				.catch((err) => console.error(err));
		}
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

function remove_song (song_id) {
	fetch('/api/session/remove/host/song', {
		method  : 'post',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify({
			song_id : song_id
		})
	})
		.then((data) => data.json())
		.then((data) => {
			if (data.status == 'success') {
				var temp = location.href;
				location.href = temp;
			}
		})
		.catch((err) => console.error(err));
}

function add_song (uri, song_id) {
	if (!uri) {
		return;
	}

	fetch(`/api/song/add?uri=${uri}`)
		.then((res) => res.json())
		.then((res) => {
			if (res.status == 'failure') {
				alert_message('Something went wrong', res.message);
			} else {
				remove_song(song_id);
			}
		})
		.catch((err) => console.log(err));
}

function skip_song (next) {
	let action = 'prev';
	if (next) action = 'next';

	fetch(`/api/song/skip?action=${next}`)
		.then((res) => res.json())
		.then((res) => {
			if (res.staus == 'failure') {
				alert_message('Something went wrong', res.mesasge);
			} else {
				var temp = location.href;
				location.href = temp;
			}
		})
		.catch((err) => console.error(err));
}
