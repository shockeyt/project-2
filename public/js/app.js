console.log("hello app page");

var app = {};
var id;
//$(document).ready(function() {
	//console.log("app.js loaded!");

app.init = function () {
	$('form').on('submit', function(e) {
		e.preventDefault();
		//alert('submit clicked');

		//serialize not working(?)
		//var formData = $(this).serialize();
		var artist = $('input[type=search').val();
		console.log(artist);

		//gets matching artists
		$.ajax({
			url: "https://api.spotify.com/v1/search",
			method: "GET",
			dataType: "json",
			data: {
				type: 'artist',
				q: artist
			},
			success: handleSuccess,
			error: handleError
		});


		//gets artist albums
		// $.ajax({
		// 	url: "https://api.spotify.com/v1/" + artist + "/" + id + "/albums",
		// 	method: "GET",
		// 	dataType: "json",
		// 	data: {
		// 		album_type: 'album'
		// 	}
		// });
	});
};
//});

function handleSuccess(json) {
	app = json;
	id = json.artists.items[0].id;
	console.log(app);
	console.log(id);
}

function handleError(e) {
	console.log("not working");
}


$(app.init);