import { random } from "../../utils/utils";
import "./style.css";
import { useEffect } from "react";

const MAX_STARS = 400;
const ALPHA_STEP = 0.02

export default function StarField() {
  const createStars = () => {
    const canvas = document.getElementById("starfield"),
      ctx = canvas.getContext("2d"),
      WIDTH = (canvas.width = window.innerWidth),
      HEIGHT = (canvas.height = window.innerHeight),
      hue = 220,
      stars = []
    var count = 0
    const starCanvas = document.createElement("canvas"),
      starCtx = starCanvas.getContext("2d");
    starCanvas.width = 100;
    starCanvas.height = 100;
    const half = starCanvas.width / 2,
      starGradient = starCtx.createRadialGradient(half, half, 0, half, half, half);
    starGradient.addColorStop(0.025, "#fff");
    starGradient.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
    starGradient.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
    starGradient.addColorStop(1, "transparent");
    starCtx.fillStyle = starGradient;
    starCtx.beginPath();
    starCtx.moveTo(50,0)
    starCtx.quadraticCurveTo(40,60,100,50)
    starCtx.quadraticCurveTo(40,40,50,100)
    starCtx.quadraticCurveTo(60,40,0,50)
    starCtx.quadraticCurveTo(60,60,50,0)
    starCtx.fill();
    // End cache

    const mouse = {x: 0,y: 0}
    const handleMouseMove = (e) => {
      mouse.x = e.pageX
      mouse.y = e.pageY
    }
    const handleMouseClick = (e) => {
      console.log("click",mouse.x,mouse.y)
    }
    canvas.addEventListener("mousemove",handleMouseMove)
    canvas.addEventListener("click",handleMouseClick)
    var Star = function () {
      this.radius = random(5, 50);
      this.angle = random(0,90)
      this.timePassed = random(0, MAX_STARS);
      this.alpha = random(2, 10) / 10;
      this.x = random(WIDTH)
      this.y = random(HEIGHT)
      count++;
      stars[count] = this;
    };
    Star.prototype.draw = function () {
      let twinkle = random(10);
      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= ALPHA_STEP;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += ALPHA_STEP;
      }
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.angle * Math.PI / 180)
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        starCanvas,
        - this.radius / 2,
        - this.radius / 2,
        this.radius,
        this.radius
      );
      ctx.restore()
      this.timePassed += this.speed;
    };
    for (var i = 0; i < MAX_STARS; i++) {
      new Star();
    }
    function animation() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "hsla(" + hue + ", 16%, 4%, 1)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }
      window.requestAnimationFrame(animation);
    }
    animation();
  };
  useEffect(() => {
    createStars();
  });
  return <canvas id="starfield"></canvas>;
}
