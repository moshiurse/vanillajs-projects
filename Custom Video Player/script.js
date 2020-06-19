// dom elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play/Pause the video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// Update Play/pause Icon based on video status
function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// update Progress
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // show timestamp
    // get mins
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    // get secs
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

// set the video progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}


// Dom events
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('click', setVideoProgress);