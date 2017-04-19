console.log("hello app page");

var app = {};
var artistData = {};
var id;
var albumData = {};
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

	});
};
//});

app.searchArtist = function(id) {
			//gets artist albums
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + id + "/albums",
		method: "GET",
		dataType: "json",
		data: {
			album_type: 'album'
		},
		success: searchSuccess,
		error: searchError
	});
};

//album data from artist
function searchSuccess(json) {
	albumData = json;
	console.log("the album data is: ",albumData);
	var albumItems = json.items;
	var albumIds = [];
	albumItems.forEach(function(items) {
		albumIds.push(items.id);
		//console.log(albumIds);
	});
	console.log(albumIds);
}

function searchError(e) {
	console.log("search artist not working");
}

//data from artist search
function handleSuccess(json) {
	artistData = json;
	id = json.artists.items[0].id;
	console.log(artistData);
	console.log(id);
	app.searchArtist(id);
}

function handleError(e) {
	console.log("not working");
}



$(app.init);