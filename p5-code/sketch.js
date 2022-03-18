//script should get tokenId from contract.
let tokenId = 5996;

//script gets hash from contract.

let hash = "371221";
let xoff = 1;
let seed = tokenId * 21;

//Primary Color
let pCols = [0, 30, 80, 120, 180, 225, 270, 300];

//Secondary Color
let sCols = [0, 30, 120, 180, 225, 270, 300, 330];

//Fuzz
let nMaxV = [0.5, 1, 2, 3];

//Eye Size
let eSizes = [0.26, 0.33, 0.4];

//Padding
let thickV = [10, 25, 70];

//Eye Level
let eLevels = [0, 15];

function setup() {
    createCanvas(500, 500);
    colorMode(HSB, 360, 100, 100);
    strokeCap(ROUND);
    noiseSeed(seed);
    randomSeed(seed);


    //use generated hash to assign traits from the array.
    pCol = parseInt(hash.substring(0, 1));
    sCol = parseInt(hash.substring(1, 2));
    nMax = parseInt(hash.substring(2, 3));
    eSize = parseInt(hash.substring(3, 4));
    thick = parseInt(hash.substring(4, 5));
    eLevel = parseInt(hash.substring(5, 6));


    //if secondary color is rainbow set eyes and mouth values to the same color as primary color.
    if (sCols[sCol] == 330) {
        sec = pCols[pCol]
    } else {
        sec = sCols[sCol]
    }
    wP = random(5, 10);
    hP = random(5, 10);
}

function draw() {
    background(255);

    //create circles for background
    for (let x = 25; x < 500; x += 50) {
        for (let y = 25; y < 500; y += 50) {
            noStroke();

            f = sCols[sCol];
            if (f == 330) {
                rCol = random(360)
            } else {
                rCol = sec
            }

            fill(rCol, random(25), 100);
            circy = new Circul();
            push();
            translate(x, y);
            scale(0.14, 0.14);
            circy.show();
            pop();

        }
    }
    //body
    circul1 = new Circul2(pCols[pCol], 40, 100, 0);
    push();
    translate(250, 500);
    rotate(3.14);
    scale(0.55, 1.25);
    circul1.show();
    pop();

    //head
    push();
    translate(250, 250);
    circul1.show();
    pop();

    noStroke();


    //eyes
    eye1 = new Circul2(0, 0, 100, 1);
    push();
    translate(200, 200);
    scale(0.33);
    eye1.show();
    pop();

    eye2 = new Circul2(0, 0, 100, 1);
    push();
    push();
    translate(300, 200);
    scale(eSizes[eSize]);
    rotate(PI);
    eye2.show();
    pop();


    //pupils
    pupil1 = new Circul2(sec, 100, 100, 1);
    push();
    translate(200, 200 + eLevels[eLevel]);
    scale(0.1);
    pupil1.show();
    pop();

    pupil2 = new Circul2(sec, 100, 100, 1);
    push();
    translate(300, 200 - eLevels[eLevel]);
    scale(0.1);
    rotate(PI);
    pupil2.show();
    pop();


    //mouth squiggle
    for (let x = 200; x <= 300; x++) {
        sats = map(noise(xoff), 0, 1, 30, 100);
        fill(sec, sats, 95);
        r = map(noise(xoff), 0, 1, 0.53, 0.77);
        ellipse(x, r * 500, 28);
        xoff += 0.015;
    }
    noLoop();
}


//BG circle class (solid fill shapes, no border)
class Circul {
    show() {
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.16) {

            let xoff1 = map(cos(a), -1, 1, 0, nMaxV[nMax]);
            let yoff1 = map(sin(a), -1, 1, 0, nMaxV[nMax]);
            let r = map(noise(xoff1, yoff1), 0, 1, 100, 200);
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
            xoff1 += 0.004;
        }
        endShape();
    }
}


//body circle class (filled made with lines, stroke optional)
class Circul2 {
    constructor(hue, sat, bright, bord) {
        this.hue = hue;
        this.sat = sat;
        this.bright = bright;
        this.bord = bord;
    }
    show() {
        beginShape();
        noFill();

        for (let a = 0; a < TWO_PI; a += 0.045) {
            let yoff1 = map(sin(a), -1, 1, 0, nMaxV[nMax]);
            let xoff1 = map(cos(a), -1, 1, 0, nMaxV[nMax]);

            let r = map(noise(xoff1, yoff1), 0, 1, 100, 200);
            let x = r * cos(a);
            let y = r * sin(a);
            if (this.bord == 0) {
                stroke(this.hue, this.sat, this.bright - 25);
                strokeWeight(thickV[thick]);
            }

            vertex(x, y);
            endShape();
            push();
            stroke(this.hue, this.sat, this.bright);
            strokeWeight(6);
            line(x + 7.5, y + 10, 500 / wP, 500 / hP);
            pop();

            xoff1 += 0.04;
        }

        endShape();
    }
}