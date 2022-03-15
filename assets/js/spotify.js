// oauth with PKCE preferred

function getToken() {
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic N2EwZjM3OTEzZWU3NDExYTkxNzYzMTQxZDEzODEwYjU6NmVlOTc4MjJjMTg2NDZkMjg5MGYyOGVjOGMwNzFiNDA=", // base64 encoded
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: "grant_type=client_credentials",
    })
        .then(response => response.json())
        .then(data => {
            queryPlaylists(data.access_token);
        })
        .catch(err => {
            console.log(err);
        });
}

function delayPlaylists() {
    setTimeout(() => {
        queryPlaylists();
    }, 1000);
}

function queryPlaylists(token) {
    var weatherSearch = window.localStorage.getItem("search");
    var search = weatherSearch.replace(" ", "+");
    var output = "";
    fetch(
        `https://api.spotify.com/v1/search?query=${search}+weather&type=playlist&include_external=audio&offset=0&limit=50`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}}`,
                "Content-Type": "application/json",
            },
        }
    )
        .then(response => {
            if (response.status === 401) {
                getToken();
                // Help from: https://www.delftstack.com/howto/javascript/javascript-wait-for-function-to-finish/
                setTimeout(() => {
                    queryPlaylists(); // Waits for new token before next fetch attempt
                }, 1000);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.playlists.items);

            var playlists = data.playlists.items;
            playlists.forEach(i => {
                var fullUri = i.uri;
                var uriArr = fullUri.split(":");
                uriArr.shift();
                var uri = uriArr.join("/");

                output += `<img src="${i.images[0].url}" class= "m-1" data-uri=${uri} data-name=${i.name} style="height: 150px; width: 150px" onclick="selectedPlaylist(this)"/>`;
            });
            $(".playlists").html(output); // Renders array of playlists to div
        })
        .catch(err => {
            console.log(err);
        });
}

$(".playlists").click(e => {
    console.log(e.target.dataset.uri);
    selectedPlaylist(e.target.dataset.uri, e.target.dataset.name);
});

function selectedPlaylist(uri, playlistName) {
    $("#title").html(`Playing "${playlistName}"`);

    $(".player").html(
        `<iframe class='mt=2' src="https://open.spotify.com/embed/${uri}" width="95%" height="350px" frameborder="0" allowtransparency="true" allow="encrypted-media" style-"margin:0; padding:0;"></iframe>`
    );

    $("#recs").css("visibility", "hidden");
    $("#player").css("visibility", "visible");
}

function diffPlaylist() {
    $("#recs").css("visibility", "visible");
    $("#player").css("visibility", "hidden");
}
