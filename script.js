document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songImage = document.getElementById('song-image'); // Image element
    const prevButton = document.getElementById('prev-btn');
    const playButton = document.getElementById('play-btn');
    const nextButton = document.getElementById('next-btn');

    let currentSongIndex = 0;
    let songs = [];

    // Fetch song data from the JSON file
    fetch('songs.json')  // Ensure this path is correct
        .then(response => response.json())
        .then(data => {
            songs = data;
            loadSong(currentSongIndex);
        })
        .catch(error => {
            console.error("Error loading songs data:", error);
        });

    // Function to load the current song
    function loadSong(index) {
        const song = songs[index];
        audioSource.src = song.url;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songImage.src = song.image; // Change the image source
        audioPlayer.load();
    }

    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playButton.textContent = "Play";
        }
    });

    // Next song
    nextButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playButton.textContent = "Pause";
    });

    // Previous song
    prevButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playButton.textContent = "Pause";
    });
});
