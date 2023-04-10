// array de videos y títulos
var playlist = [
  {
    title: "Video 1",
    url: "https://example.com/video1.mp4"
  },
  {
    title: "Video 2",
    url: "https://example.com/video2.mp4"
  },
  {
    title: "Video 3",
    url: "https://example.com/video3.mp4"
  }
];

// inicializar video.js
var player = videojs('my-video');

// inicializar playlist
var playlistMenu = player.playlistUi();

// agregar videos a la lista de reproducción
for (var i = 0; i < playlist.length; i++) {
  player.playlist.push(playlist[i]);
}

// reproducir el primer video de la lista de reproducción
player.playlist.first();

// mostrar el título del video en la lista de reproducción cuando se selecciona
player.on('playlistitem', function() {
  var item = player.playlist.currentItem();
  var title = playlist[item].title;
  playlistMenu.currentItem(item);
  playlistMenu.currentItem().el().firstChild.innerHTML = title;
});

// mostrar el mensaje "Capitulo siguiente" y la cuenta regresiva después de reproducir un video
player.on('ended', function() {
  var nextItem = player.playlist.next();
  if (nextItem) {
    player.playlist.next();
    var countdown = 10;
    var countdownInterval = setInterval(function() {
      if (countdown === 0) {
        clearInterval(countdownInterval);
        player.playlist.next();
      } else {
        console.log("Capitulo siguiente en " + countdown);
        countdown--;
      }
    }, 1000);
  }
});
