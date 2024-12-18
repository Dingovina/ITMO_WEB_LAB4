export class CanvasManager {
    static canvas = document.getElementById("canvas");
    static ctx = CanvasManager.canvas.getContext("2d");
    static DEFAULT_R = 50; 
    static R = 50;
    static W = 400;
    static H = 400;

    static draw(r=1){
        this.R = r * this.DEFAULT_R;
        this.canvas.width = this.W;
        this.canvas.height = this.H;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#8E94F2";
    
        this.drawPoligon();
        this.drawAxis();
    }

    static drawAxis(){
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.W / 2, 10);
        this.ctx.lineTo(this.W / 2, this.H - 10);
        this.ctx.moveTo(10, this.H / 2);
        this.ctx.lineTo(this.W - 10, this.H / 2);
        this.ctx.stroke();

        this.drawPointers();
    }

    static drawPointers(){
        this.ctx.fillStyle = "black";
        this.ctx.font = "10px Arial";
        this.ctx.beginPath();
        for (let i = 1; i < 4; i++){
            
            this.ctx.moveTo(this.W / 2 + this.DEFAULT_R * i, this.H / 2 - 5);
            this.ctx.lineTo(this.W / 2 + this.DEFAULT_R * i, this.H / 2 + 5);
            this.ctx.fillText(i.toString(), this.W / 2 + this.DEFAULT_R * i + 5, this.H / 2 + 5);
        
            this.ctx.moveTo(this.W / 2 - this.DEFAULT_R * i, this.H / 2 - 5);
            this.ctx.lineTo(this.W / 2 - this.DEFAULT_R * i, this.H / 2 + 5);
            this.ctx.fillText((-i).toString(), this.W / 2 - this.DEFAULT_R * i - 20, this.H / 2 + 5);

            this.ctx.moveTo(this.W / 2 - 5, this.H / 2 - this.DEFAULT_R * i);
            this.ctx.lineTo(this.W / 2 + 5, this.H / 2 - this.DEFAULT_R * i);
            this.ctx.fillText(i.toString(), this.W / 2 + 5, this.H / 2 - this.DEFAULT_R * i + 15);
        
            this.ctx.moveTo(this.W / 2 - 5, this.H / 2 + this.DEFAULT_R * i);
            this.ctx.lineTo(this.W / 2 + 5, this.H / 2 + this.DEFAULT_R * i);
            this.ctx.fillText((-i).toString(), this.W / 2 + 5, this.H / 2 + this.DEFAULT_R * i + 15);
        }

        this.ctx.stroke();
    }

    static drawPoligon(){
        
        // circle
        this.ctx.arc(this.W / 2, this.H / 2, this.R, 0, Math.PI / 2, false);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.W / 2, this.H / 2);
        this.ctx.lineTo(this.W / 2, this.H / 2 + this.R + 1);
        this.ctx.lineTo(this.W / 2 + this.R + 1, this.H / 2);
        this.ctx.closePath();
        this.ctx.fill();
        
    
        // rectangle
        this.ctx.rect(this.W / 2, this.H / 2, this.R, -this.R / 2);
        this.ctx.fill();
    
        // triangle
        this.ctx.beginPath();
        this.ctx.moveTo(this.W / 2, this.H / 2);
        this.ctx.lineTo(this.W / 2, this.H / 2 + this.R + 1);
        this.ctx.lineTo(this.W / 2 - this.R - 1, this.H / 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    static drawPoint(point){
        let x = point.x;
        let y = point.y;
        this.ctx.beginPath();
        this.ctx.arc(this.W / 2 + x * this.DEFAULT_R, this.H / 2 - y * this.DEFAULT_R, 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = point.hit ? "green" : "red";
        this.ctx.fill();
    }

    static updatePonits(point_list){
        let r = parseFloat(document.querySelector('input[name="form:r-input"]:checked').value);
        if (!r) r = 1;
        this.draw(r);
        point_list.forEach(point => {
            this.drawPoint(point);
        });
    }

    static handleClick(event){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left - this.W / 2;
        let y = -(event.clientY - rect.top - this.H / 2);    
        // let r = document.getElementById("form:r-input").value;
        let r = parseFloat(document.querySelector('input[name="form:r-input"]:checked').value);
        x = x / this.R * r;
        y = y / this.R * r;

        return {x: x, y: y, r: r};
    }
        
}
