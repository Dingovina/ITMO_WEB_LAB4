import { Component, createRef } from 'react';
import { config } from '../config';

export default class Canvas extends Component{
    DEFAULT_R = config.DEFAULT_R; 
    R = config.R;
    W = config.W;
    H = config.H;
    canvas = createRef();
    ctx = null;

    componentDidMount() {
      this.draw();
    }
    componentDidUpdate() {
      this.draw(this.props.r);
    }
    render() {
        return (
            <canvas ref={this.canvas} onClick={this.props.onClick} id="canvas" />
        );
    }
    draw(r=1){
        this.ctx = this.canvas.current.getContext('2d');
        this.R = r * this.DEFAULT_R;
        this.canvas.current.width = this.W;
        this.canvas.current.height = this.H;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#8E94F2";
    
        this.drawPoligon();
        this.drawAxis();
        this.updatePonits(r);
    }

      drawAxis(){
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.W / 2, 10);
        this.ctx.lineTo(this.W / 2, this.H - 10);
        this.ctx.moveTo(10, this.H / 2);
        this.ctx.lineTo(this.W - 10, this.H / 2);
        this.ctx.stroke();

        this.drawPointers();
    }

      drawPointers(){
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

      drawPoligon(){
        
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
        this.ctx.rect(this.W / 2, this.H / 2, this.R / 2, -this.R);
        this.ctx.fill();
    
        // triangle
        this.ctx.beginPath();
        this.ctx.moveTo(this.W / 2, this.H / 2);
        this.ctx.lineTo(this.W / 2, this.H / 2 + this.R / 2);
        this.ctx.lineTo(this.W / 2 - this.R / 2, this.H / 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
      drawPoint(point){
        let x = point.x;
        let y = point.y;
        this.ctx.beginPath();
        this.ctx.arc(this.W / 2 + x * this.DEFAULT_R, this.H / 2 - y * this.DEFAULT_R, 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = point.hit ? "green" : "red";
        this.ctx.fill();
    }

      updatePonits(r){
        console.log(r, this.props.points);
        let point_list = this.props.points;
        point_list.forEach(point => {
            (point.r == r) && this.drawPoint(point);
        });
    }
}
