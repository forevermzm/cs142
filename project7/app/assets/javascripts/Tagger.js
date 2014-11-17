function Tagger (canvasId, feedbackId, coordinateX, coordinateY, width, height) {
    this.outDiv = canvasId;
    this.canvasElement = canvasId.firstElementChild;
    this.feedbackElement = feedbackId;

    this.coordinateXElement = coordinateX;
    this.coordinateYElement = coordinateY;
    this.widthElement = width;
    this.heightElement = height;

    this.isMouseDown = false;
    var obj = this;

    this.canvasElement.onmousedown = function(event) {
        obj.mouseDown(event);
    }

    Tagger.prototype.mouseDown = function(event){
        event.preventDefault();

        var obj = this;
        this.oldMoveHandler = document.body.onmousemove;
        document.body.onmousemove = function(event) {
            obj.mouseMove(event);
        }
        this.oldUpHandler = document.body.onmouseup;
        document.body.onmouseup = function(event) {
            obj.mouseUp(event);
        }
        if (withinCanvas(this.canvasElement, event.clientX, event.clientY )){
            this.isMouseDown = true;

            this.outDivRect = this.outDiv.getBoundingClientRect();
            this.canvasRect = this.canvasElement.getBoundingClientRect();
            this.startX = event.clientX - this.outDivRect.left;
            this.startY = event.clientY - this.outDivRect.top;

            this.feedbackElement.style.border = "1px solid purple";
            this.feedbackElement.style.left = this.startX + "px";
            this.feedbackElement.style.top = this.startY + "px";
            this.feedbackElement.style.width = 0 + "px";
            this.feedbackElement.style.height = 0 + "px";

            hideForm(this.feedbackElement);
        }
    }

    Tagger.prototype.mouseMove = function(event){
        if (!this.isMouseDown) {
            return;
        }
        if (withinCanvas(this.canvasElement, event.clientX, event.clientY)){
            this.currentX = event.clientX - this.outDivRect.left;
            this.currentY = event.clientY - this.outDivRect.top;

            if (this.currentX > this.startX)
                this.originX = this.startX;
            else
                this.originX = this.currentX;

            if (this.currentY > this.startY)
                this.originY = this.startY;
            else 
                this.originY = this.currentY;

            this.feedbackElement.style.left = this.originX + "px";
            this.feedbackElement.style.top = this.originY + "px";

            this.feedbackElement.style.width = Math.abs(this.currentX - this.startX) + "px";
            this.feedbackElement.style.height = Math.abs(this.currentY - this.startY) + "px";
        }
    }

    Tagger.prototype.mouseUp = function(event){
        this.isMouseDown = false;
        document.body.onmousemove = this.oldMoveHandler;
        document.body.onmouseup = this.oldUpHandler;
        if (tooSmallRect(this.feedbackElement))
            this.feedbackElement.style.border = "0px";
        else {
            var rect = this.feedbackElement.getBoundingClientRect();
            this.coordinateXElement.value = rect.left - this.outDivRect.left;
            this.coordinateYElement.value = rect.top - this.outDivRect.top;
            this.widthElement.value = rect.right - rect.left;
            this.heightElement.value = rect.bottom - rect.top;

            displayForm(this.feedbackElement);
        }
    }

    // ------------ helper functions ------------------- //
     
    displayForm = function(feedbackElement) {
        var selectElement = feedbackElement.getElementsByTagName("select")[0];
        var buttonElement = feedbackElement.getElementsByTagName("button")[0];
        selectElement.style.display = "block";
        buttonElement.style.display = "block";
    }

    hideForm = function(feedbackElement) {
        var selectElement = feedbackElement.getElementsByTagName("select")[0];
        var buttonElement = feedbackElement.getElementsByTagName("button")[0];
        selectElement.style.display = "none";
        buttonElement.style.display = "none";
    }

    tooSmallRect = function(feedbackElement) {
        var rect = feedbackElement.getBoundingClientRect();
        if (rect.width < 5 || rect.height < 5){
            return true;
        }
        return false;
    }

    withinCanvas = function(canvasElement, coorX, coorY){
        var rect = canvasElement.getBoundingClientRect();
        if ( coorX < rect.left || coorX > rect.right )
            return false;
        else if ( coorY < rect.top || coorY > rect.bottom )
            return false;
        return true;
    }
}


submitTag = function(photo_id){
    var selectElement = document.getElementById("select" + photo_id);
    var coordinateXElement = document.getElementById("coorX" + photo_id);
    var coordinateYElement = document.getElementById("coorY" + photo_id);
    var widthElement = document.getElementById("width" + photo_id);
    var heightElement = document.getElementById("height" + photo_id);
    var authElement = document.getElementById("authenticity_token" + photo_id);
    post("/tags/new/", {user_id: selectElement.value, photo_id: photo_id, coorX: coordinateXElement.value, coorY: coordinateYElement.value, width: widthElement.value, height: heightElement.value, authenticity_token: authElement.value}, "post");
}
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}
