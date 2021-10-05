$(document).ready(function () {
	$('.ui.search').search({
		apiSettings   : {
			onResponse : function (res) {
				console.log(res);
			},
			url        : 'http://localhost:3000/api/search?keywords={query}'
		},
		fields        : {
			results : 'items',
			title   : 'name'
		},
		minCharacters : 2
	});
});
