import { random } from "../../utils/utils";
import "./style.css";
import { useEffect } from "react";

const MAX_STARS = 300;
const ALPHA_STEP = 0.02

export default function StarField() {
  const createStars = () => {
    var canvas = document.getElementById("starfield"),
      ctx = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      hue = 220,
      stars = [],
      count = 0
    var canvas2 = document.createElement("canvas"),
      ctx2 = canvas2.getContext("2d");
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, "#fff");
    gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
    gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
    gradient2.addColorStop(1, "transparent");
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
    // End cache

    var Star = function () {
      this.radius = random(5, 80);
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, MAX_STARS);
      this.alpha = random(2, 10) / 10;
      this.x = random(w)
      this.y = random(h)
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
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        canvas2,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.timePassed += this.speed;
    };
    for (var i = 0; i < MAX_STARS; i++) {
      new Star();
    }
    function animation() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "hsla(" + hue + ", 16%, 4%, 1)";
      ctx.fillRect(0, 0, w, h);
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
