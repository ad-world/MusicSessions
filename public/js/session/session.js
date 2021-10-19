$(document).ready(function () {
	$('.ui.search').search({
		apiSettings   : {
			onResponse : function (res) {
				console.log(res);
			},
			url        : 'http://localhost:3000/api/search?keywords={query}'
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
	fetch('http://localhost:3000/api/session/create', {
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
