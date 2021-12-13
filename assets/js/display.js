$(document).ready(function() {
    $('#player').css('visibility', 'hidden');
});

//The idea: when I click on a playlist, the player shows up and btnEl appends to container
$(".playlists").click(e => {
    console.log(e.target.dataset.uri);
    selectedPlaylist(e.target.dataset.uri);
});

btnEl = $('<button type="button" class="btn btn-info m-2" onclick="history.back()="./index.html"">Pick a Different Playlist</button>')
$('#recs').append(btnEl);