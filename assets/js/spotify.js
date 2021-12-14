const clientId = "7a0f37913ee7411a91763141d13810b5";
const redirectUri = "http://127.0.0.1:5500/recsPage.html"; //Will need to be Github page
let authorize = () => {
    location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
};

function getCode() {
    //  Help from this YouTube video: https://www.youtube.com/watch?v=1vR3m0HupGI&t=636s
    let code = null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); // Constructor
    code = urlParams.get("code");
    getToken(code);
}

let getToken = code => {
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic N2EwZjM3OTEzZWU3NDExYTkxNzYzMTQxZDEzODEwYjU6NmVlOTc4MjJjMTg2NDZkMjg5MGYyOGVjOGMwNzFiNDA=", // base64 encoded from Postman
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        redirect_uri: redirectUri,
        code: code,
        body: "grant_type=client_credentials", // oauth with PKCE preferred
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.sessionStorage.setItem("token", data.access_token);
        })
        .catch(err => {
            console.log(err);
        });
};

function delayPlaylists() {
    setTimeout(() => {
        queryPlaylists();
    }, 1000);
}

function queryPlaylists() {
    var weatherSearch = window.localStorage.getItem("search");
    var search = weatherSearch.replace(" ", "+");
    var output = "";
    var token = window.sessionStorage.getItem("token");
    console.log(search);
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
                // console.log(uri);

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
    
    $('#title').html(`Playing "${playlistName}"`)

    $(".player").html(
        `<iframe class='mt=2' src="https://open.spotify.com/embed/${uri}" width="100%" height="350px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
        

    );
    
    $('#recs').css('visibility', 'hidden')
    $('#player').css('visibility', 'visible')
}

function diffPlaylist(){
    $('#recs').css('visibility', 'visible')
    $('#player').css('visibility', 'hidden')
}


