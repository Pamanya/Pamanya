// Array of video sources to be played
var playlist = [
  {
    name: "Episode 1",
    sources: [
      { src: "https://example.com/episode1.mp4", type: "video/mp4" },
      { src: "https://example.com/episode1.webm", type: "video/webm" }
    ]
  },
  {
    name: "Episode 2",
    sources: [
      { src: "https://example.com/episode2.mp4", type: "video/mp4" },
      { src: "https://example.com/episode2.webm", type: "video/webm" }
    ]
  },
  {
    name: "Episode 3",
    sources: [
      { src: "https://example.com/episode3.mp4", type: "video/mp4" },
      { src: "https://example.com/episode3.webm", type: "video/webm" }
    ]
  }
];

// Video player initialization
var player = videojs("my-video");

// Function to play video from playlist
function playVideo(index) {
  player.pause();
  player.src(playlist[index].sources);
  player.load();
  player.play();
  setActive(index);
  var videoTitle = document.getElementById("video-title");
  videoTitle.innerHTML = playlist[index].name;
  player.on("ended", function() {
    var nextIndex = (index + 1) % playlist.length;
    videoTitle.innerHTML = "Next Episode: " + playlist[nextIndex].name;
    setTimeout(function() {
      videoTitle.innerHTML = playlist[nextIndex].name;
      playVideo(nextIndex);
    }, 10000); // 10 second countdown
  });
}

// Function to set active class for current playlist item
function setActive(index) {
  var items = document.getElementsByClassName("vjs-playlist-item");
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  items[index].classList.add("active");
}

// Initialize playlist
var playlistItems = [];
for (var i = 0; i < playlist.length; i++) {
  var item = {
    sources: playlist[i].sources,
    poster: playlist[i].poster,
    name: playlist[i].name
  };
  playlistItems.push(item);
}
player.playlist(playlistItems);

// Play first video on page load
playVideo(0);

// Set click listeners for playlist items
var items = document.getElementsByClassName("vjs-playlist-item");
for (var i = 0; i < items.length; i++) {
  (function(index) {
    items[i].addEventListener("click", function() {
      playVideo(index);
    });
  })(i);
}
