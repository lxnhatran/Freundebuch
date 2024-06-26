document.addEventListener("DOMContentLoaded", function() {
    const maxSongs = 7;
    const songsList = document.getElementById("songs-list");
    const songForm = document.getElementById("song-form");

    const savedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    savedSongs.forEach(song => {
        addSongToDOM(song);
    });

    window.addSong = function() {
        const songUrl = document.getElementById("song-url").value;
        if (songUrl && savedSongs.length < maxSongs) {
            extractSongData(songUrl).then(song => {
                if (song) {
                    savedSongs.push(song);
                    localStorage.setItem("songs", JSON.stringify(savedSongs));
                    addSongToDOM(song);
                    songForm.reset();
                } else {
                    alert("Ungültige URL oder Fehler beim Abrufen der Daten.");
                }
            });
        } else {
            alert("Maximale Anzahl von 7 Liedern erreicht oder ungültige URL.");
        }
    };

    function extractSongData(url) {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.includes("youtube.com") ? new URLSearchParams(new URL(url).search).get("v") : url.split('/').pop();
            return fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
                .then(response => response.json())
                .then(data => ({
                    url,
                    title: data.title,
                    image: `https://img.youtube.com/vi/${videoId}/0.jpg`
                }))
                .catch(() => null);
        } else if (url.includes("spotify.com")) {
            return fetch(`https://spotify-song-info-api.herokuapp.com/track/${url.split('/').pop()}`)
                .then(response => response.json())
                .then(data => ({
                    url,
                    title: data.name,
                    image: data.album.images[0].url
                }))
                .catch(() => null);
        } else {
            return Promise.resolve(null);
        }
    }

    function addSongToDOM(song) {
        const songElement = document.createElement("div");
        songElement.className = "song-item";

        const songImage = document.createElement("img");
        songImage.src = song.image;
        songImage.alt = "Song Image";

        const songUrl = document.createElement("a");
        songUrl.href = song.url;
        songUrl.textContent = song.title;
        songUrl.target = "_blank";

        const changeButton = document.createElement("button");
        changeButton.className = "mdl-button mdl-js-button mdl-button--raised mdl-button--colored custom-button";
        changeButton.textContent = "Ändern";
        changeButton.onclick = function() {
            const newSongUrl = prompt("Geben Sie die neue Lied-URL ein:", song.url);
            if (newSongUrl) {
                extractSongData(newSongUrl).then(newSong => {
                    if (newSong) {
                        Object.assign(song, newSong);
                        localStorage.setItem("songs", JSON.stringify(savedSongs));
                        updateSongElement(songElement, song);
                    } else {
                        alert("Ungültige URL oder Fehler beim Abrufen der Daten.");
                    }
                });
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "mdl-button mdl-js-button mdl-button--raised mdl-button--colored custom-button";
        deleteButton.textContent = "Löschen";
        deleteButton.onclick = function() {
            const index = savedSongs.indexOf(song);
            if (index > -1) {
                savedSongs.splice(index, 1);
                localStorage.setItem("songs", JSON.stringify(savedSongs));
                songsList.removeChild(songElement);
            }
        };

        songElement.appendChild(songImage);
        songElement.appendChild(songUrl);
        songElement.appendChild(changeButton);
        songElement.appendChild(deleteButton);

        songsList.appendChild(songElement);
    }

    function updateSongElement(element, song) {
        const img = element.querySelector("img");
        const link = element.querySelector("a");
        img.src = song.image;
        link.href = song.url;
        link.textContent = song.title;
    }
});