var playlists = [1,2,3,4,5,6,7,8,9,10,11,12]
var output =''

playlists.forEach(playlist => {
    output+= `<img src='./assets/images/100placeholder.png' class='m-1' style='height: 100px; width: 100px' onclick='window.location.href='./player.html''/>`;
})

$('.playlists').html(output)

