const body = document.querySelector('body');
const main = document.querySelector('#main');
const text = document.querySelector('#month');
const temptxt = document.querySelector('#temp');
const svg = document.querySelector("#svg");

let time;
let minutes;
let suffix;
let radius = 0;

setup = () => {
    svg.setAttribute("r", radius);

    // grab time from session storage
    time = sessionStorage.getItem("time");
    minutes = sessionStorage.getItem("minutes");
    suffix = sessionStorage.getItem("suffix");

    if (time == null) {
        time = '12';
        minutes = '00';
        suffix = ' AM';
    }

    // initial values set
    main.style.height = window.innerHeight + 'px';
    text.textContent = 'January';
    text.textContent += ' ' + time + ':' + minutes + suffix;
    temptxt.textContent = '0°';
}

// sets month and temperature based on scroll position
getMonthandTemp = () => {
    let dimensions = body.getBoundingClientRect();
    let scrollPercentage = Math.abs(dimensions.top) / (dimensions.height - window.innerHeight);
    let month = Math.ceil(scrollPercentage * 11);

    let scrollPercentageWidth = Math.abs(dimensions.left) / (dimensions.width - window.innerWidth);
    let temp = Math.floor(scrollPercentageWidth * 100);

    temptxt.textContent = `${temp}°`;

    switch (month) {
        case 0:
            text.textContent = `January ${time}`;
            gradient.style.stopColor = "blue";
            break;
        case 1:
            text.textContent = `February ${time}`;
            break;
        case 2:
            text.textContent = `March ${time}`;
            break;
        case 3:
            text.textContent = `April ${time}`;
            break;
        case 4:
            text.textContent = `May ${time}`;
            break;
        case 5:
            text.textContent = `June ${time}`;
            break;
        case 6:
            text.textContent = `July ${time}`;
            break;
        case 7:
            text.textContent = `August ${time}`;
            break;
        case 8:
            text.textContent = `September ${time}`;
            break;
        case 9:
            text.textContent = `October ${time}`;
            break;
        case 10:
            text.textContent = `November ${time}`;
            break;
        case 11:
            text.textContent = `December ${time}`;
    }
    text.textContent += ':' + minutes + suffix;

    svg.setAttribute("r", temp);
}

window.addEventListener('load', setup);
window.addEventListener('scroll', getMonthandTemp);
window.addEventListener('resize', function () {
    setup();
    getMonthandTemp();
});
