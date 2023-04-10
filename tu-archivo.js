$(document).ready(function() {
  // Initialize player
  const player = new Plyr('#player', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
  });

  // Initialize playlist
  const playlistItems = $('#playlist li');
  playlistItems.on('click', function() {
    playlistItems.removeClass('active');
    $(this).addClass('active');
    const videoSrc = $(this).data('src');
    player.source = {
      type: 'video',
      sources: [
        {
          src: videoSrc,
          type: 'video/mp4'
        }
      ]
    };
    player.play();
  });

  // Show poster on pause
  player.on('pause', function() {
    $('#poster').show();
  });
  player.on('play', function() {
    $('#poster').hide();
  });

  // Show next chapter message
  player.on('ended', function() {
    const nextItem = playlistItems.filter('.active').next();
    if (nextItem.length) {
      const messageDiv = $('#next-chapter #message');
      messageDiv.html('Next chapter: ' + nextItem.html());
      const countdownDiv = $('#next-chapter #countdown');
      countdownDiv.show();
      const countdown = new CountUp(countdownDiv.get(0), 10, 0, 0, 10, {
        suffix: ' seconds',
        callback: function() {
          countdownDiv.hide();
          nextItem.click();
        }
      });
      countdown.start();
    }
  });

  // Autoplay first item
  playlistItems.first().click();
});