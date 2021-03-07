// Define our labelmap
const labelMap = {
    1:{name:'A', color:'lime'},
    2:{name:'B', color:'yellow'},
    3:{name:'C', color:'red'}
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}

export const showDetections = (predictions, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";

    console.log(predictions);

    // predictions.forEach(prediction => {
    //   const x = prediction.boxes[0]
    //   const y = prediction.boxes[1];
    //   const width = prediction.boxes[2];
    //   const height = prediction.boxes[3];
    //   // Draw the bounding box.
    //   ctx.strokeStyle = "#2fff00";
    //   ctx.lineWidth = 1;
    //   ctx.strokeRect(x, y, width, height);
    //   // Draw the label background.
    //   ctx.fillStyle = "#2fff00";
    //   const textWidth = ctx.measureText(prediction.class).width;
    //   const textHeight = parseInt(font, 10);
    //   // draw top left rectangle
    //   ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
    //   // draw bottom left rectangle
    //   ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

    //   // Draw the text last to ensure it's on top.
    //   ctx.fillStyle = "#000000";
    //   ctx.fillText(prediction.class, x, y);
    //   ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    // });
  };
