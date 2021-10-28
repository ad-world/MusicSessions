$(document).ready(function () {
	$('.ui.search').search({
		apiSettings   : {
			onResponse : function (res) {
				console.log(res);
			},
			url        : '/api/user/search?keywords={query}'
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
			fetch('/api/session/add/user/song', {
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
				.then((res) => {
					console.log(res);
					if (res.status == 'success') {
						var temp = location.href;
						location.href = temp;
					}
				})
				.catch((err) => console.error(err));
		}
	});
});
