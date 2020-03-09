let $screenHeight = 0;
let currentWindowOffset = 0;
let currentWindowOffsetNormalized = 0;

let allParallaxImages = document.querySelectorAll(`.parallax-picture`);

function initializeParallaxes() {
    for (const singleImage of allParallaxImages) {
        let innerLayers = singleImage.querySelectorAll(`.parallax-layer`);
        for (const singleLayer of innerLayers) {
            singleLayer.style.backgroundPositionY = singleLayer.dataset.verticalstart;
        }
        
    }
}


function adjustParallaxPositions() {

    // font-size calculation --- could be optimized

    let currentOffset = window.scrollY + window.innerHeight / 2;

    for (const singleImage of allParallaxImages) {
        let parallaxLayers = singleImage.querySelectorAll(`.parallax-layer`);
        let verticalStartAdjustment = parseFloat(singleImage.dataset.verticalstart);
        for (const singleLayer of parallaxLayers) {
            console.log(singleLayer.style.backgroundImage);
            let adjustmentValue = -1 * parseFloat(singleLayer.dataset.speed) * (getYPosition(singleLayer) - currentOffset + (singleLayer.scrollHeight / 2));
            adjustmentValue += verticalStartAdjustment;
            console.log(adjustmentValue);
            singleLayer.style.backgroundPositionY = `${adjustmentValue}px`;
            console.log(singleLayer.style.backgroundPositionY);
        }
    }
    // MAIN TODO
}

function getYPosition(element) {
    let yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}


initializeParallaxes();
adjustParallaxPositions();

// Initialization of the scroll event listener
document.addEventListener(`scroll`, event => {

    console.log(event);

    adjustParallaxPositions();
    
});



// optimized functionality - TODO. 
// main concern for optimization - exclude any declarations from scroll loops
// add window `resize` eventListener to update window dimensions dependencies