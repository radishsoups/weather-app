const background = document.querySelector('body');
const hand = document.querySelector('.hand');
const text = document.querySelector('h1');
let suffix;
let time;
let minutes;

sessionStorage.clear();

// getting height and width. moving the time pointer off the page
setup = () => {
    background.style.height = window.innerHeight + 'px';

    hand.style.top = `${window.innerHeight + 100}px`;
    hand.style.left = `${window.innerWidth - 100}px`;

    text.textContent = '12:00 AM'
}

// get pointer x and y position and calculations
getPosition = (event) => {
    let xPos = event.clientX;
    let yPos = event.clientY;

    let browserWidth = window.innerWidth;
    let browserHeight = window.innerHeight;

    time = Math.floor((xPos / (browserWidth / 360)) / 15);
    minutes = Math.floor((yPos / (browserHeight / 60)));

    let angle = (xPos / (browserWidth / 360));

    changeTime(angle, time, minutes);
}

// mapping pointer position to hour and minutes on the clock
function changeTime(angle, time, minutes) {
    hand.style.transform = `rotate(${angle}deg) translateY(-350px)`;

    if (time < 12) {
        suffix = ' AM';
    }
    else {
        suffix = ' PM';
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    text.textContent = ((Math.floor(time) + 11) % 12 + 1) + ':' + minutes + suffix;
}

// save data if body is clicked
saveData = () => {
    time = (Math.floor(time) + 11) % 12 + 1;
    sessionStorage.setItem('time', time);
    if (minutes < 10) {
        sessionStorage.setItem('minutes', '0' + minutes);
    }
    else {
        sessionStorage.setItem('minutes', minutes);
    }
    sessionStorage.setItem('suffix', suffix);
}

background.addEventListener('click', saveData);

// on load
window.addEventListener('load', function () {
    setup();
});

// pointer movements
window.addEventListener('pointerdown', getPosition);
window.addEventListener('pointermove', getPosition);

// preventing click on link from saving time
const next = document.querySelector('.next');
next.addEventListener('click', function (event) {
    event.stopPropagation();
})

// update when page is resized
window.addEventListener('resize', function () {
    setup();
});