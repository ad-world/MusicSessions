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
		minCharacters : 2
	});
});