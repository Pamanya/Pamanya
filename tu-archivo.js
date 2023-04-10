$(document).ready(function() {
  const player = new Plyr('#player');
  const playlist = $('#playlist');
  const nextChapter = $('#next-chapter');
  const countdown = $('#countdown');
  const videos = $('#playlist a');
  let currentVideo = 0;
  
  // Cargar el primer video de la lista
  changeVideo(videos.eq(currentVideo));
  
  // Al hacer clic en un elemento de la lista, cambiar el video
  videos.on('click', function(e) {
    e.preventDefault();
    changeVideo($(this));
  });
  
  // Función para cambiar el video
  function changeVideo(video) {
    currentVideo = video.parent().index();
    playlist.find('.active').removeClass('active');
    video.parent().addClass('active');
    const src = video.data('src');
    player.source = {
      type: 'video',
      sources: [
        {
          src: src,
          type: 'video/mp4',
        },
      ],
    };
    player.play();
    nextChapter.removeClass('show');
    countdown.removeClass('show');
  }
  
  // Al finalizar el video, mostrar el mensaje de "Capítulo siguiente" y cuenta regresiva
  player.on('ended', function() {
    nextChapter.addClass('show');
    let count = 10;
    const countdownText = $('<span/>', {
      text: count,
      class: 'countdown-text'
    });
    countdown.empty().append(countdownText);
    countdown.addClass('show');
    const timer = setInterval(function() {
      count--;
      countdownText.text(count);
      if (count == 0) {
        clearInterval(timer);
        nextVideo();
      }
    }, 1000);
  });
  
  // Cambiar al siguiente video de la lista
  function nextVideo() {
    currentVideo++;
    if (currentVideo >= videos.length) {
      currentVideo = 0;
    }
    changeVideo(videos.eq(currentVideo));
  }
  
  // Iniciar la reproducción automática del primer video
  player.autoplay = true;
  
  // Función para iniciar la reproducción del video
  function playVideo() {
    const video = videos.eq(currentVideo);
    changeVideo(video);
  }
  
  // Al hacer clic en el botón de "Capítulo siguiente", cambiar al siguiente video
  nextChapter.on('click', function() {
    nextVideo();
  });
});
