'use strict'

const canvasImage = document.getElementById("image");
const canvasImageContext = canvasImage.getContext("2d");
const canvasHistogram = document.getElementById("histogram");
const barChart = new BarChart(canvasHistogram);

document.addEventListener("dragover", function(e){
    e.preventDefault();
});

document.addEventListener("drop", function(e){
    e.preventDefault();

    const files=e.dataTransfer.files;

    if(files.length > 0){
        const file = files[0];

        const reader = new FileReader();
        reader.addEventListener("load", function(e){
            const dataUrl=e.target.result;
            console.log(dataUrl);
            const image = document.createElement("img");

            image.addEventListener("load", function(){
                canvasImage.width = image.naturalWidth;
                canvasImage.height = image.naturalHeight;
                canvasImageContext.drawImage(image, 0, 0);

                histogram();
                numaraPixeli();
            });
            image.src = dataUrl;
        });
        reader.readAsDataURL(file);
    }
});

function histogram(){
    const v = [];

    for (let i=0; i<256; i++)
        v.push(0);

    const imageData = canvasImageContext.getImageData(0,0,canvasImage.width,canvasImage.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+=4){
        //histograma RGB
        const r = data[i];
        const g = data[i+1];
        const b = data [i+2];
      //  const a = data [i+3]; //tansparenta

      const average = Math.round((r+g+b)/3);
      v[average]++;
    }
    //apelam din clasa BarChart metod DRAW
    barChart.draw(v);
}

function numaraPixeli() {
    const imageData = canvasImageContext.getImageData(
        0, 0, canvasImage.width, canvasImage.height
    );

    const data = imageData.data;
    let nr = 0;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 220 && g > 220 && b > 220) {
            nr++;
        }
    }
    console.log("Nr pixeli luminosi:", nr);
}
