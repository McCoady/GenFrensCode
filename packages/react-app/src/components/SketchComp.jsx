import React from "react";
import p5 from "p5";
import One from "../static/blufrencirc.png";
import Two from "../static/elmocirc.png";
import Three from "../static/clarencecirc.png";
import Four from "../static/oscarcirc.png";
import Five from "../static/olivecirc.png";
import Six from "../static/pinkguycirc.png";
import Seven from "../static/concernedcirc.png";
import Eight from "../static/circkermit.png";
import Nine from "../static/circone.png";
import Ten from "../static/circtim.png";
import Eleven from "../static/circzero.png";
const { useRef, useLayoutEffect } = React;

let bubbles = [];
let img;

let w = window.innerWidth;
let h = window.innerHeight;
const SketchComp = props => {
    const containerRef = useRef();

    const Sketch = (p5, canvasParentRef) => {
        p5.preload = () => {
            img = [p5.loadImage(One),
            p5.loadImage(Two),
            p5.loadImage(Three),
            p5.loadImage(Four),
            p5.loadImage(Five),
            p5.loadImage(Six),
            p5.loadImage(Seven),
            p5.loadImage(Eight),
            p5.loadImage(Nine),
            p5.loadImage(Ten),
            p5.loadImage(Eleven)];
        }
        class Bubble {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = p5.random((w + h) * 0.01, (w + h) * 0.04);
                this.h = p5.random(360);
                this.dy = p5.random(-1, 1);
                this.dx = p5.random(-1, 1);
                this.a = 1;
                this.i = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

                var rnd = Math.random() * csdh.slice(-1);

                var r = 0;
                while (csdh[r] < rnd) {
                    r++;
                }
                this.dh = dho[r];
                this.s = 35;
                this.c = 0;
            }



            display() {
                p5.strokeWeight(2);
                p5.stroke(30, 15, 70);
                p5.fill(this.h, this.s, 100, this.a);
                p5.image(img[this.i], this.x - this.r / 2, this.y - this.r / 2, this.r, this.r)
                p5.ellipse(this.x, this.y, this.r);
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;
                this.dx += p5.random(-0.2, 0.2);
                this.dy += p5.random(-0.2, 0.2);
                this.dx = clamp(this.dx, -1, 1);
                this.dy = clamp(this.dy, -1, 1);
                this.h = (this.h + this.dh + 360) % 360;
            }

            checkTime() {
                if (this.a < 1) {
                    this.s = 35;
                    this.c += 1;
                    if (this.c > 200) {
                        this.a += 0.02;
                    }
                }
            }

            checkTouch() {
                let d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y)
                if (d < this.r) {
                    if (this.a >= 1 || this.dh == 20) {
                        this.i = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    }
                    this.s = 0;
                    this.a = 0;
                    this.c = 0;
                }
            }
            checkPos() {
                if (this.x > w + this.r) {
                    this.x = 0;
                } else if (this.y > h + this.r) {
                    this.y = 0;
                } else if (this.x < 0) {
                    this.x = w;
                } else if (this.y < 0) {
                    this.y = h;
                }
            }

        }



        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        var dho = [0.5, -0.5, 1, -1, 20];
        var dhw = [10, 10, 6, 6, 1];
        var csdh = dhw.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);

        p5.setup = () => {
            // use parent to render the canvas in this ref
            // (without that p5 will render the canvas outside of your component)
            p5.createCanvas(w, h).parent(canvasParentRef);
            p5.frameRate(60);
            p5.colorMode(p5.HSB, 360, 100, 100);
            for (let i = 0; i < 50; i++) {
                let bub = new Bubble(Math.random() * w, Math.random() * h)
                bubbles.push(bub);
            }
        };

        p5.draw = () => {
            p5.background(30, 15, 100);
            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].update();
                bubbles[i].checkTouch();
                bubbles[i].checkTime();
                bubbles[i].checkPos();
                bubbles[i].display();

            }
        };

        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    }
    useLayoutEffect(
        () => {
            // Make sure the p5.js canvas is a child of the component in the DOM
            let s = new p5(Sketch, containerRef.current);

            // Remove the sketch when the component is removed/replaced
            return () => s.remove();
        },
        // This empty list tells React that this effect never needs to get re-rendered
        []
    );

    return (<div className="sketch-container" ref={containerRef}></div>

    );

}
export default SketchComp;
