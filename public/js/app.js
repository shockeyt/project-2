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

app.searchAlbums = function(oneAlbum) {
	//gets album tracks
	$.ajax({
		url: "https://api.spotify.com/v1/albums/" + oneAlbum + "/tracks",
		method: "GET",
		dataType: "json",
		success: albumSuccess,
		error: albumError
	});
};

//track data from album
function albumSuccess(json) {
	var trackData = json;
	console.log("track data is: ", trackData);
}

function albumError(e) {
	console.log("search albums not working");
}


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
	//***NOTE:Spotify won't allow multiple album tracks
	//console.log(albumIds);
	var oneAlbum = albumIds[0];
	app.searchAlbums(oneAlbum);
}

function searchError(e) {
	console.log("search artist not working");
}

//data from artist search
function handleSuccess(json) {
	artistData = json;
	id = json.artists.items[0].id;
	//console.log(artistData);
	console.log(id);
	app.searchArtist(id);
}

function handleError(e) {
	console.log("not working");
}



$(app.init);