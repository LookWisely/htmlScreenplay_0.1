let listOfAllLayers = new Array();

class parallaxLayerInstance {
    layer;
    speed;
    startingY;

    constructor(ele, s, vertAdjustment) {
        this.layer = ele;
        this.speed = s;
        this.startingY = vertAdjustment;
    }


}


let allParallaxImages = document.querySelectorAll(`.parallax-picture`);

function initializeParallaxes() {
    for (const singleImage of allParallaxImages) {
        let innerLayers = singleImage.querySelectorAll(`.parallax-layer`);
        for (const singleLayer of innerLayers) {
            singleLayer.style.backgroundPositionY = singleLayer.dataset.verticalstart;
            let classInstance = new parallaxLayerInstance(singleLayer, parseFloat(singleLayer.dataset.speed), parseFloat(singleImage.dataset.verticalstart));
            listOfAllLayers.push(classInstance);
        }
        
    }
}


function adjustParallaxPositionsAdvanced() {

    let currentOffset = window.scrollY + window.innerHeight / 2;

    for (const singleLayer of listOfAllLayers) {
        let adjustmentValue = -1 * parseFloat(singleLayer.speed) * (getYPosition(singleLayer.layer) - currentOffset + (singleLayer.layer.scrollHeight / 2));
//        console.log(singleLayer.layer);
        adjustmentValue += singleLayer.startingY;
       console.log(singleLayer.layer.style.backgroundImage);
       console.log(adjustmentValue);
        singleLayer.layer.style.backgroundPositionY = `${adjustmentValue}px`;
       console.log(singleLayer.layer.style.backgroundPositionY);
    }
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
console.log(`==========================`);
console.log(listOfAllLayers);
console.log(`==========================`);
adjustParallaxPositionsAdvanced();

// Initialization of the scroll event listener
document.addEventListener(`scroll`, event => {

    adjustParallaxPositionsAdvanced();
    
});



// optimized functionality - TODO. 
// main concern for optimization - exclude any declarations from scroll loops
// add window `resize` eventListener to update window dimensions dependencies