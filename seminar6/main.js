"use strict"

const visibleCanvas = document.getElementById("visibleCanvas");
const imageEditor = new ImageEditor(visibleCanvas);

document.getElementById("fileBrowser").addEventListener("change", function(ev){
    const reader = new FileReader();
    reader.addEventListener("load", function(ev){
        const dataUrl = ev.target.result;
        console.log(dataUrl);

        const img = document.createElement("img");
        img.addEventListener("load", function(ev) {
            imageEditor.changeImage(img);
        });
        img.src = dataUrl;
    });

    reader.readAsDataURL(ev.target.files[0]);
});

document.getElementById("btnSave").addEventListener("click", function(){
     imageEditor.saveImage();
});

const buttons = document.querySelectorAll("button[data-effect]");
console.log(buttons.length);

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        const effect = this.dataset.effect;
        imageEditor.changeEffect(effect);
    });
}