import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const LOCALSTORAGE_KEY = "videoplayer-current-time";

 const player = new Player(iframe);

    player.on('timeupdate', throttle((time) => {
        localStorage.setItem(LOCALSTORAGE_KEY, time.seconds);
        console.log(time.seconds);
    }, 1000)
    );

onload();

function onload() {
    player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY)); 
};