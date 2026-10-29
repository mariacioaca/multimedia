class BarChart{
    constructor(canvas){
        this.canvas=canvas;
    }
    draw(values){
        const context = this.canvas.getContext("2d");

        context.fillStyle = "#4AD3D3";
        context.fillRect(0,0, this.canvas.width, this.canvas.height);

        const maxValue = Math.max(...values);
        const f = (this.canvas.height/maxValue)*0.8;
        const barWidth = this.canvas.width/values.length;
        context.fillStyle="#398B8E";
       
        for(let i=0; i<values.length; i++){
            const barHeight = values[i] * f;
            const barX = i * barWidth;
            const barY = this.canvas.height - barHeight;

            context.fillRect(barX + barWidth/4, barY, barWidth/2, barHeight)
            context.strokeStyle = "blue";
            context.lineWidth = 1;
            context.strokeRect(barX + barWidth/4, barY, barWidth/2, barHeight)
        }
    }
}