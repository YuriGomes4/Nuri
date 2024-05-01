const fpWidth = window.innerWidth;
const fpHeight = window.innerHeight;

var fullpg = new fullpage('#fullpage', {
    //anchors:['slide1', 'slide2', 'slide3', 'slide4'],
    navigation: true,
    navigationPosition: 'right',
    touchSensitivity: 10,
    afterLoad: function(origin, destination) {carregarFotos(origin, destination);},
});

const dragFotos = document.querySelectorAll('.drag-foto');

document.addEventListener('DOMContentLoaded', function() {
    var dgWidth = 122;
    //var dgWidth = dragFotos[i].offsetWidth;
    var dgHeight = 142;
    //var dgHeight = dragFotos[i].offsetHeight;
    console.log(fpWidth, fpHeight);

    for (var i = 0; i < dragFotos.length; i++) {
        var draggable = new PlainDraggable(dragFotos[i])
        draggable.containment = {
            left: (dgWidth*0.9)*-1,
            top: (dgHeight*0.9)*-1,
            width: fpWidth+(dgWidth*0.8),
            height: fpHeight+(dgHeight*0.8)};
        draggable.top += Math.floor(Math.random() * (fpHeight-dgHeight));
        draggable.left += Math.floor(Math.random() * (fpWidth-dgWidth))
        draggable.setOptions()
        draggable.onDragStart = function() {
            fullpage_api.setAllowScrolling(false);
        };
        draggable.onDragEnd = function() {
            fullpage_api.setAllowScrolling(true);
        };
    }
});


function carregarFotos(origem, destino) {

    changeBackgroundColor(destino.index);
    var sections = document.querySelectorAll('.section');
    var dragFotos = sections[destino.index].querySelectorAll('.drag-foto');

    for (var i = 0; i < dragFotos.length; i++) {
        setTimeout(function(i) {
            $(dragFotos[i]).fadeIn(1000);
        }, 300 * (i + 1), i);
    }
}

var navlinks = document.querySelectorAll('.nav_link')

var maiorWidth = 0;

for (var i = 0; i < navlinks.length; i++) {
    if (navlinks[i].offsetWidth > maiorWidth) {
        maiorWidth = navlinks[i].offsetWidth;
    }
}

for (var i = 0; i < navlinks.length; i++) {
    navlinks[i].style.width = maiorWidth+'px';
}


function changeBackgroundColor(step) {

    var sections = document.querySelectorAll(".section")

    var fundo = document.getElementById("fundo");

    // Current step based on function argument
    var currentStep = step;

    // Define the starting, middle, and ending colors
    const startColor = '#00070f'; // Night sky blue
    const middleColor = '#446275'; // Light blue (middle color)
    const endColor = '#87cefa'; // Daytime sky blue

    // Calculate the total number of steps (considering 3 colors)
    const totalSteps = sections.length-1; // Double the number of sections

    // Ensure step stays within valid range (0 to totalSteps)
    currentStep = Math.min(Math.max(currentStep, 0), totalSteps);

    // Calculate step size for each color transition (start to middle, middle to end)
    const stepRed1 = (parseInt(middleColor.substr(1, 2), 16) - parseInt(startColor.substr(1, 2), 16)) / (totalSteps / 2);
    const stepGreen1 = (parseInt(middleColor.substr(3, 2), 16) - parseInt(startColor.substr(3, 2), 16)) / (totalSteps / 2);
    const stepBlue1 = (parseInt(middleColor.substr(5, 2), 16) - parseInt(startColor.substr(5, 2), 16)) / (totalSteps / 2);

    const stepRed2 = (parseInt(endColor.substr(1, 2), 16) - parseInt(middleColor.substr(1, 2), 16)) / (totalSteps / 2);
    const stepGreen2 = (parseInt(endColor.substr(3, 2), 16) - parseInt(middleColor.substr(3, 2), 16)) / (totalSteps / 2);
    const stepBlue2 = (parseInt(endColor.substr(5, 2), 16) - parseInt(middleColor.substr(5, 2), 16)) / (totalSteps / 2);

    // Calculate color values based on current step
    let red, green, blue;
    if (currentStep < totalSteps / 2) {
        // Transition from start to middle color
        red = Math.floor(parseInt(startColor.substr(1, 2), 16) + (currentStep * stepRed1)).toString(16).padStart(2, '0');
        green = Math.floor(parseInt(startColor.substr(3, 2), 16) + (currentStep * stepGreen1)).toString(16).padStart(2, '0');
        blue = Math.floor(parseInt(startColor.substr(5, 2), 16) + (currentStep * stepBlue1)).toString(16).padStart(2, '0');
    } else {
        // Transition from middle to end color (adjusted step index)
        currentStep -= totalSteps / 2;
        red = Math.floor(parseInt(middleColor.substr(1, 2), 16) + (currentStep * stepRed2)).toString(16).padStart(2, '0');
        green = Math.floor(parseInt(middleColor.substr(3, 2), 16) + (currentStep * stepGreen2)).toString(16).padStart(2, '0');
        blue = Math.floor(parseInt(middleColor.substr(5, 2), 16) + (currentStep * stepBlue2)).toString(16).padStart(2, '0');
    }

    // Combine the calculated values into a new hex color string
    const newColor = `#${red}${green}${blue}`;

    // Set the background color with CSS transition
    document.body.style.transition = 'background-color 0.5s ease-in-out'; // Add transition property
    document.body.style.backgroundColor = newColor;
    if (step === totalSteps) {
        fundo.style.opacity = 0;
    } else if (step === 0) {
        fundo.style.opacity = 1;
    } else {
        console.log(step)
        fundo.style.opacity = (1-(step/totalSteps)).toFixed(2);
    }
}