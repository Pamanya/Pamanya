$(document).ready(function() {
  // Inicializar el reproductor de video
  const player = new Plyr('#player', {
    autoplay: true,
    controls: [
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'settings',
      'fullscreen'
    ]
  });

  // Obtener la lista de reproducción y añadir eventos de clic
  const playlistItems = $('#playlist li');
  playlistItems.on('click', function() {
    // Cambiar el color del elemento activo
    playlistItems.removeClass('active');
    $(this).addClass('active');

    // Obtener la URL del video y reproducirlo en el reproductor
    const videoSrc = $(this).data('video-src');
    player.source = {
      type: 'video',
      sources: [
        {
          src: videoSrc,
          type: 'video/mp4'
        }
      ]
    };

    // Mostrar el mensaje de "Capítulo siguiente"
    player.on('ended', function() {
      const countdown = $('<div>').addClass('countdown').text('Capítulo siguiente en 10');
      $('body').append(countdown);

      let count = 10;
      const countdownInterval = setInterval(function() {
        count--;
        countdown.text(`Capítulo siguiente en ${count}`);
        if (count === 0) {
          clearInterval(countdownInterval);
          const nextItem = $('.playlist-item.active').next();
          if (nextItem.length) {
            nextItem.click();
          }
        }
      }, 1000);
    });
  });
});
