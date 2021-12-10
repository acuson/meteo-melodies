

function selectedPlaylist(event){
    window.location.href = '../../player.html'
    var selected = event.target
    var uri = selected.dataset.uri

    $('.player').html = `<iframe src="https://open.spotify.com/embed/${uri}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
}


/* $('img').on('click', (event)=>{
    window.location.href = '../../player.html'
    var selected = event.target
    console.log(selected)
  /*   var uri = selected.dataset.uri

    $('.player').html = `<iframe src="https://open.spotify.com/embed/${uri}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` */
