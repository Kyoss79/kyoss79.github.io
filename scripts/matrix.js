const canvas = document.getElementById('canvas');
const body = document.getElementsByTagName('body')[0];
const wW = body.clientWidth;
const wH = body.clientHeight;

let start;
let init = false;
let nrLines = 50;
let frameCounter = 0;
const lines = [];

const tick = (timestamp) => {
    if (!init) {
        Array.from(Array(nrLines)).forEach( (x, i) => {
            const offset = getRandomInt(-30, 40);
            const line = matrixLine();
            line.init(offset);
            lines.push(line);
        });
        init = true;
    }

    if (++frameCounter % 3 === 0) {
        if (lines.length < nrLines) {
            const line = matrixLine();
            line.init();
            lines.push(line);
        }

        lines.forEach( (line, index) => {
            if (line.redraw() > 70) {
                line.destroy();
                lines.splice(index, 1);
            }
        });
    }

    window.requestAnimationFrame( tick );
};



const matrixLine = () => {
    let timer = -20;
    let container;
    let scale;
    let speed;
    let progress = 0;

    const init = (offset = 0) => {
        timer = offset || 0;
        speed = getRandomInt(1,4);
        scale = getRandomInt(50, 200);
        container = document.createElement('div');
        container.classList.add('line');
        container.style.webkitTransform = 'scale(' + scale / 100  + ')';

        // get random characters
        let randomStr = '';
        Array.from(Array(150)).forEach( (x, i) => {
            randomStr += '<span>' + getRandomChar() + '</span> ';
        });

        container.innerHTML = randomStr;

        // position randomly on X axis
        container.style.top = getRandomInt(-300, -200) + 'px';
        container.style.left = getRandomInt(25, wW - 25)  + getRandomInt(-25 , 25) + 'px';

        body.append(container);
    };

    const redraw = () => {
        timer++;

        let spans = container.getElementsByTagName('span');
        if (timer % speed === 0) {
            progress++;
        }

        if (progress < 50) {
            for ( let i = 0; i < spans.length; i++) {
                spans.item(i).className = '';
                spans.item(i).className = 'item-' + (i - progress);
            }
        } else {
            for ( let i = 0; i < spans.length; i++) {
                spans.item(i).className = '';

                if (i - progress > 0) {
                    spans.item(i).className = 'item-' + (i -  progress);
                }
            }
        }

        return progress;
    };

    const destroy = () => {
        container.remove();
    };

    return {
        init,
        redraw,
        destroy
    }
};

const getRandomChar = () => {
    return Math.random().toString(36).substr(2, 1);
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


window.requestAnimationFrame( tick );
