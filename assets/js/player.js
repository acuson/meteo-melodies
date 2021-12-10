

function selectedPlaylist(event){
    window.location.href = '../../player.html'
    var selected = event.target
    var uri = selected.dataset.uri

    $('.player') = `<iframe src="https://open.spotify.com/embed/${uri}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`


}