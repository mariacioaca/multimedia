class ImageEditor {
    //atribute private
    #visibleCanvas;
    #visibleCanvasContext;

    #offscreenCanvas;
    #offscreenCanvasContext;

    #effect;

    /** @param {HTMLCanvasElement} visibleCanvas  */
    constructor(visibleCanvas){
        this.#visibleCanvas = visibleCanvas;
        this.#visibleCanvasContext = this.#visibleCanvas.getContext("2d");

        this.#offscreenCanvas = document.createElement("canvas");
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext("2d");
    }

    changeImage(img){
        this.#visibleCanvas.width = this.#offscreenCanvas.width = img.naturalWidth;
        this.#visibleCanvas.height = this.#offscreenCanvas.height = img.naturalHeight;
    
        this.#offscreenCanvasContext.drawImage(img, 0, 0); 
        this.#effect="normal";
        this.#drawImage();

    }

    /** @param {string} effect */
    changeEffect(effect){
        if(this.#effect != effect){
            this.#effect=effect;
            this.#drawImage();
        }
    }

    #drawImage(){
        switch(this.#effect){
            case "normal":
                this.#normal();
                break;
            case "greyscale":
                this.#greyscale();
                break;
            case "threshold":
                this.#threshold();
                break;
            case "sephia":
                this.#sephia();
                break;
            case "invert":
                this.#invert();
                break;
            case "red":
                this.#red();
                break;
            case "green":
                this.#green();
                break;
            case "blue":
                this.#blue();
                break;
            case "2channels":
                this.#twoChannels();
                break;
            case "pixelate":
                this.#pixelate();
                break;

        }
    }

    saveImage(){
        const a = document.createElement("a");
        a.href = this.#visibleCanvas.toDataURL("image/png", 1);
        a.download ="image";
        a.click();
    }

    #normal(){
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }

    #greyscale(){
        const imageData = this.#offscreenCanvasContext.getImageData(0,0, 
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i< data.length; i+=4){
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
           // const a = data[i+3]; //transparenta
           const average = Math.round((r+g+b)/3);
           data[i] = data[i+1] = data[i+2]= average;
        } 
        
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

     #threshold(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        const threshold = 128;
        // for(let i = 0; i < data.length; i += 4){
        //     const v = (0.2126 * data[i] + 0.7152 * data[i+1] + 0.0722 * data[i+2] >= threshold) ? 255 : 0;
        //     data[i] = data[i+1] = data[i+2] = v;
        // } SAU:
         for(let i = 0; i< data.length; i+=4){
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
           // const a = data[i+3]; //transparenta
           const v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;
           data[i]=data[i+1]=data[i+2]=v;
        } 

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #sephia(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];

            data[i]   = (r * 0.393) + (g * 0.769) + (b * 0.189);
            data[i+1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
            data[i+2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
        }

     #invert(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            data[i]   = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #pixelate(){
        const width = this.#offscreenCanvas.width;
        const height = this.#offscreenCanvas.height;
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, width, height);
        const data = imageData.data;
        const blockSize = 10;

        for(let y = 0; y < height; y += blockSize){
            for(let x = 0; x < width; x += blockSize){
                const i = (y * width + x) * 4;
                this.#visibleCanvasContext.fillStyle =
                    "rgb(" + data[i] + "," + data[i+1] + "," + data[i+2] + ")";
                this.#visibleCanvasContext.fillRect(x, y, blockSize, blockSize);
            }
        }
    }

    #twoChannels(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            // r' = r; g' = g; b' = g
            data[i+2] = data[i+1];
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #red(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            data[i+1] = 0;
            data[i+2] = 0;
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }   

    #green(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            data[i] = 0;
            data[i+2] = 0;
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #blue(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0,
               this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            data[i] = 0;
            data[i+1] = 0;
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
}