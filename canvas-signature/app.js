document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const saveButton = document.getElementById('saveButton');
    const downloadButton = document.getElementById('downloadButton');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidth = document.getElementById('line');
    const toggleEraserButton = document.getElementById('toggleEraserButton');
    const previewContainer = document.getElementById('previewContainer');
    let isDrawing = false;
    let hasSigned = false;
    let isEraser = false;
    let drawnLength = 0;
    const minDrawLength = 50; // Minimum length to consider it a valid signature
  
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    context.strokeStyle = colorPicker.value;
  
    const startDrawing = (e) => {
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
      isDrawing = true;
    };
  
    const draw = (e) => {
      if (isDrawing) {

        if (isEraser) {
          context.globalCompositeOperation = 'destination-out';
          context.lineWidth = 10;  // Increase line width for eraser
        } else {
          context.globalCompositeOperation = 'source-over';
          context.lineWidth = lineWidth.value;  // Reset line width for pen
        }


        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
  
        // Calculate the distance drawn
        const dx = e.offsetX - context.lastX;
        const dy = e.offsetY - context.lastY;
        drawnLength += Math.sqrt(dx * dx + dy * dy);
        
        context.lastX = e.offsetX;
        context.lastY = e.offsetY;
  
        if (drawnLength > minDrawLength) {
          hasSigned = true;
        }
      }
    };
  
    const stopDrawing = () => {
      if (isDrawing) {
        isDrawing = false;
      }
    };
  
    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      hasSigned = false;  // Reset the flag when the canvas is cleared
      drawnLength = 0;  // Reset the drawn length when the canvas is cleared
      previewContainer.innerHTML = '';  // Clear the preview container
    };
  
    const saveSignature = () => {
      if (hasSigned) {
        const imageURL = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imageURL;
        previewContainer.innerHTML = '';  // Clear previous preview
        previewContainer.appendChild(img);
      } else {
        alert('Please sign a decent amount before saving.');
      }
    };
  
    const downloadSignature = () => {
      if (hasSigned) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'signature.png';
        link.click();
      } else {
        alert('Please sign a decent amount before downloading.');
      }
    };
  
    canvas.addEventListener('mousedown', (e) => {
      context.lastX = e.offsetX;
      context.lastY = e.offsetY;
      startDrawing(e);
    });

    const changeColor = (e) => {
        context.strokeStyle = e.target.value;
    };

    const toggleEraser = () => {
      isEraser = !isEraser;
      if (isEraser) {
        context.strokeStyle = '#ffffff';  // Set eraser color to white
        context.lineWidth = 10;  // Increase line width for eraser
        toggleEraserButton.textContent = 'Pen';
      } else {
        context.strokeStyle = colorPicker.value;
        context.lineWidth = 5;  // Reset line width for pen
        toggleEraserButton.textContent = 'Eraser';
      }
    };
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
  
    clearButton.addEventListener('click', clearCanvas);
    saveButton.addEventListener('click', saveSignature);
    downloadButton.addEventListener('click', downloadSignature);
    colorPicker.addEventListener('input', changeColor);
    toggleEraserButton.addEventListener('click', toggleEraser);
  });
  