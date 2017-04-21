console.log("hello app page");

var app = {};
var artistData = {};
var id;
var albumData = {};
//$(document).ready(function() {
	//console.log("app.js loaded!");


app.init = function () {
	//get album button
	$('form').on('submit', function(e) {
		e.preventDefault();
		//alert('submit clicked');

		//serialize not working(?)
		//var formData = $(this).serialize();
		var artist = $('input[type=search').val();
		console.log(artist);

		app.getArtist(artist, "album");
	});
	//get top ten button
	$('#button2').on('click', function(e) {
		e.preventDefault();
		//console.log("topten button clicked");
		var artist = $('input[type=search').val();
		console.log(artist);
		$('iframe').remove();
		$('#button4').remove();
		app.getArtist(artist, "topten");
	});
	//get related artists button
	$('#button3').on('click', function(e) {
		e.preventDefault();
		//console.log("topten button clicked");
		var artist = $('input[type=search').val();
		console.log(artist);
		$('iframe').remove();
		$('#button4').remove();
		app.getArtist(artist, "related");
	});
	
	//user data
	$.ajax({
		method: "GET",
		url: "/userpage/searches"
	}).done(function(data) {
		console.log(data);
		data.forEach(function(index) {
			app.renderArtist(index);
		});
	});

};

app.renderArtist = function(index) {
	//var artistList = buildHtml(index);

  var artistHtml =
  "        <!-- one artist -->" +
  "        <div class='row album' data-album-id='" + index.trackId + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='album-name'>" + index.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Genres:</h4>" +
  "                        <span class='artist-name'>" +  index.genres + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Spotify ID:</h4>" +
  "                        <span class='artist-name'>" +  index.trackId + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "               <div class='panel-footer'>" +
  "               <button class='btn btn-danger delete-search'>Delete</button>" +
  "               </div>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  //render user data to page
  $('.userDiv').append(artistHtml);
};

//app.topTen = function () {

		//e.preventDefault();
		

//};
//});

//gets matching artists
// app.getArtist = function(artist, type) {
// 	$.ajax({
// 		url: "https://api.spotify.com/v1/search",
// 		method: "GET",
// 		dataType: "json",
// 		data: {
// 			type: 'artist',
// 			q: artist
// 		},
// 		success: handleSuccess,
// 		error: handleError
// 	});
// };

app.getArtist = function(artist, type) {
	$.ajax({
		method: "GET",
		url: "/songify/" + artist
		//data: artist,

		//success: handleSuccess,
		//error: handleError
	}).done(function(data) {
		console.log(data.artistId);
		id = data.artistId;
		if (type == "topten") {
			app.getTopTen(id);
		} else if (type == "album") {
			app.searchArtist(id);
		} else if (type == "related") {
			app.relatedArtists(id);
		}
		
		
	});
	// $.ajax({
	// 	method: "POST",
	// 	//url: "/songify/" + artist
	// 	url: "/searches",
	// 	data: artist
	// }).done(function(err, data) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("post successful");
	// 	}
	// });
};


//gets artist albums
app.searchArtist = function(id) {
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

//gets album tracks
app.searchAlbums = function(oneAlbum) {
	$.ajax({
		url: "https://api.spotify.com/v1/albums/" + oneAlbum + "/tracks",
		method: "GET",
		dataType: "json",
		success: albumSuccess,
		error: albumError
	});
};

//generate a playlist
app.generatePlaylist = function(songIds) {
	//var baseUrl = "https://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:";
	//$('.playlist').css("background-color", "blue");
	//$('.playlist').append('iframe src="' + (baseUrl + songIds) + '" height="400"></iframe>');

	//$('.playlist').append('<iframe src="https://open.spotify.com/embed?uri=spotify:trackset:My Playlist:' + songIds + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
	const baseUrl = 'https://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:';
	$('.playlist').append(`<iframe src="${baseUrl + songIds}" height="500" frameborder="0" allowtransparency="true"></iframe>`);
	$('.clearButton').append('<button type="reset" id="button4" class="btn btn-default clear">Clear</button>');
	$('#button4').on('click', function(e) {
		e.preventDefault();
		console.log("clear button clicked");
		//$('.player').remove();
		$('iframe').remove();
		$('#button4').remove();
		//$('.playlist').reset();
		$('form').trigger("reset");

	});

};

//tracks from album
function albumSuccess(json) {
	var trackData = json;
	console.log("track data is: ", trackData);
	var trackItems = json.items;
	console.log("track data items are ", trackItems);
	var trackIds = [];
	trackItems.forEach(function(tracks) {
		trackIds.push(tracks.id);
		//console.log(tracks.id);
		//songIds = tracks.id + "," + songIds;
	});
	var songIds = trackIds.toString();
	console.log("track IDs are: ", songIds);
	app.generatePlaylist(songIds);
}

var compileTracks = [];

//var compileSingles = [];
//gets artist top ten tracks
app.getTopTen = function(id, type) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=ES",
		method: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.tracks);
		var tenTracks = data.tracks;
		var trackIds = [];
		//var compileTracks = [];
		if (type == "related") {
			console.log("related condition hit");
			tenTracks.forEach(function(tracks) {
				compileTracks.push(tracks.id);
				// compileSingles.forEach(function(singles) {
				// compileTracks.push(trackIds[0]);
				// });
			
			});
			//var songIds = trackIds.toString();
			//console.log("compiled ids are: ", compileTracks);
		} else {

		tenTracks.forEach(function(tracks) {
			trackIds.push(tracks.id);
		});
		var songIds = trackIds.toString();
		console.log("top 10 ids are: ", songIds);

		app.generatePlaylist(songIds);
		}
	});
};


app.relatedArtists = function(id) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
		method: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.artists);
		var artistArray = data.artists;
		var artistIds = [];
		artistArray.forEach(function(artists) {
			//artistIds.push(artists.id);
			app.getTopTen(artists.id, "related");
		});
		console.log(compileTracks);
		//var compileStrings = compileTracks.toString();
		//var artistStrings = artistIds.toString();
		//console.log(compileStrings);
	});
};

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
function handleSuccess(json, type) {
	artistData = json;
	id = json.artists.items[0].id;
	//console.log(artistData);
	console.log(id);
	if (type == "topten") {
		console.log("hit conditional");
		//app.getTopTen(id);
	} else {
	app.searchArtist(id);
	}
}

function handleError(e) {
	console.log("not working");
}



$(app.init);