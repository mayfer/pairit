function setCanvasSize(canvas_jq, width, height) {
    canvas_jq.css('width', width);
    canvas_jq.css('height', height);
    canvas_jq.attr('width', width);
    canvas_jq.attr('height', height);
    var canvas = canvas_jq.get(0);
    var context = canvas.getContext("2d");
    // make the h/w accessible from context obj as well
    context.width = width;
    context.height = height;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;

    // upscale the canvas if the two ratios don't match
    if(devicePixelRatio !== backingStoreRatio) {
        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        context.scale(ratio, ratio);
    }

}
    
function Canvas(jq_elem) {
    // create a canvas inside another element
    // and set the height&width to fill the element
    var canvas_jq = $('<canvas>');
    var width = jq_elem.innerWidth();
    var height = jq_elem.innerHeight();
    
    setCanvasSize(canvas_jq, width, height);

    canvas_jq.appendTo(jq_elem);
    return canvas_jq;
}

function drawingCanvas(jq_elem) {
    var jq_elem = jq_elem;
    var canvas_jq = new Canvas(jq_elem).addClass('drawing-canvas');
    var canvas = canvas_jq.get(0);
    var resolution = 900;
    var ctx = canvas.getContext("2d");
    var that = this;
    var draw = false;
    var prev_position = null;
    

    this.getCanvasElement = function() {
        return canvas_jq;
    }


    this.init = function(color, linewidth) {
        this.resetLineHistory();
        ctx.lineWidth = linewidth;
        ctx.lineCap = "round";

        if(color) {
            ctx.strokeStyle = color;
        } else {
            ctx.strokeStyle = '#aa6000';
        }

        $(document).on("mousemove touchmove", function(e) {
            e.preventDefault();
            if(draw == true) {
                var current_position = that.getCursorPosition(e);
                that.drawLine(prev_position, current_position);
                prev_position = current_position;
            }
        });
        $(document).on("mouseup touchend", function(e) {
            e.preventDefault();
            that.stopDrawing();
        });

        canvas_jq.bind('mousedown touchstart', function(e) {
            e.preventDefault();
            that.startDrawing();
        }).bind('mouseup touchend', function(e) {
            e.preventDefault();
            that.stopDrawing();
        });
    }

    this.startDrawing = function() {
        ctx.beginPath();
        draw = true;
    }
    this.stopDrawing = function() {
        draw = false;
        this.resetLineHistory();
    }
    this.resetLineHistory = function() {
        prev_position = { x: null, y: null };
    }
    this.drawLine = function(prev_position, current_position) {
        if(prev_position == null || prev_position.x==null || prev_position.y==null) {
            prev_position.x = current_position.x;
            prev_position.y = current_position.y;
        }
            
        ctx.lineTo(current_position.x, current_position.y);
        ctx.stroke();

        this.compareDrawnArea();
    }
    this.getCursorPosition = function(e) {

        if(e.originalEvent.touches || e.originalEvent.changedTouches) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            ex = touch.pageX;
            ey = touch.pageY;
        } else {
            ex = e.pageX;
            ey = e.pageY;
        }        

        var x = ex - canvas_jq.offset().left
        var y = ey - canvas_jq.offset().top
        return {x: x, y: y};
    }


    this.drawLetter = function(letter, color, font_family, font_size) {
        ctx.fillStyle = color;
        ctx.font = "" + font_size + "px "+font_family;
        var measure = ctx.measureText(letter);
        console.log(measure);
        ctx.fillText(letter, ctx.width/2 - measure.width/2, ctx.height/2 + font_size/3);

        var imgdata = this.getPixelData()
        this.letterImageData = imgdata.data;
        this.letterNumPixels = 0;
        for(var i=3; i<this.letterImageData.length; i += 4) {
            //this.letterImageData[i-3] = 250;
            if(this.letterImageData[i] > 0) {
                this.letterNumPixels++;
            }
        }
        this.slack = this.letterNumPixels / 10;
        //ctx.putImageData(imgdata, 0, 0);
    }

    this.getPixelData = function() {
        return ctx.getImageData(0, 0, ctx.width*2, ctx.height*2);
    }
    this.compareDrawnArea = function() {
        var letter = this.letterImageData;
        var current = this.getPixelData().data;

        var matches = 0;
        for(var i=0; i<letter.length; i += 4) {
            if(letter[i] > 0 && current[i] != letter[i]) {
                matches++;
            }
        }
        //console.log(matches);
        if(matches >= this.letterNumPixels - this.slack) {
            setTimeout(function() {
                window.location = './index.html'; 
            }, 150);
        }
    }
}


