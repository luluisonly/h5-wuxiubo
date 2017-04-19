/**
 * Created by lu.lu on 2017/3/10.
 */
var  videos=  document.querySelectorAll('video');
function enableButtons(video) {
    var playBtn = video.parentNode.parentNode.querySelector('.startBtn');
    var fullscreenButton = video.parentNode.querySelector('.fullscreen');

    if (playBtn) {
        playBtn.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                $('.drimg').fadeOut();
                $('.startBtn').fadeOut();
            } else {
                video.pause();
                $('.startBtn').fadeIn();
            }
        });
    }

    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', function () {
            video.webkitEnterFullScreen();
        });
    }
}

// debug events
function debugEvents(video) {
    [
        'loadstart',
        'progress',
        'suspend',
        'abort',
        'error',
        'emptied',
        'stalled',
        'loadedmetadata',
        'loadeddata',
        'canplay',
        'canplaythrough',
        'playing', // fake event
        'waiting',
        'seeking',
        'seeked',
        'ended',
        // 'durationchange',
        'timeupdate',
        'play', // fake event
        'pause', // fake event
        // 'ratechange',
        // 'resize',
        // 'volumechange',
        'webkitbeginfullscreen',
        'webkitendfullscreen'
    ].forEach(function (event) {
        video.addEventListener(event, function () {
            console.info('@', event);
            if(event=='ended'){
                $('.page2').fadeOut();
                $('.page3').fadeIn();
            }
        });
    });
}

function enableVideos(everywhere) {
    for (var i = 0; i < videos.length; i++) {
        window.enableInlineVideo(videos[i], {everywhere: everywhere});
        enableButtons(videos[i]);
        debugEvents(videos[i]);
    }
}