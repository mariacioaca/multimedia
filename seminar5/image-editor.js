class ImageEditor{
    #visibleCanvas;
    #visibleCanvasContext;
    #offscreenCanvas;
    #offscreenCanvasContext;

    /**@param {HTMLCanvasElement} visibleCanvas */
    constructor(visibleCanvas){
        this.#visibleCanvas = visibleCanvas;
        this.#visibleCanvasContext = this.#visibleCanvas.getContext("2d")

        this.#offscreenCanvas = document.createElement("canvas");
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext("2d");
    }

    changeImage(img){
        this.#visibleCanvas.width = this.#offscreenCanvas.width = img.naturalWidth;
        this.#visibleCanvas.height = this.#offscreenCanvas.height = img.naturalHeight;

        this.#offscreenCanvasContext.drawImage(img, 0, 0);
        this.#greyscale();
    }

    saveImage(){
        const a = document.createElement("a");
        a.href = this.#visibleCanvas.toDataURL("image/png",1);
        a.download = "image";
        a.click();
    }

   #greyscale(){
        const {width: w, height: h} = this.#offscreenCanvas;
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, w, h);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){\
            const r = data[i];
            const g =data[i+1];
            const b =data[i+2];
            const average = Math.round((r+g+b)/3);
            data[i]=data[i+1]=data[i+2]=average;

          //  const grey = Math.round((d[i] + d[i+1] + d[i+2]) / 3);
            // d[i] = grey;
            // d[i + 1] = grey; 
            // d[i + 2] = grey; 
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
}