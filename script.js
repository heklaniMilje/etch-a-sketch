const container = document.querySelector('.container');

addEventListener('load', setGridWithDimension);

let cells = Array.from(document.querySelectorAll('[data-col]'));

const setNewGrid = document.querySelector('.set-new-grid');
setNewGrid.addEventListener('submit', setGridWithDimension);

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', resetGrid);


function resetGrid() {
    cells.forEach(cell => cell.style.background = 'white');
}

function setGridWithDimension(e) {
    e.preventDefault();
    let newDimension = 0;
    if (e.type == 'load')
        newDimension = 16;
    else {
        const newDimensionStr = this.querySelector('[name=grid-dimension').value;
        if (checkDimensionConstraints(newDimensionStr)) {
            newDimension = parseInt(newDimensionStr);
            Array.from(container.childNodes).forEach(node => node.remove());
        }
    }

    for (let i = 0; i < newDimension; i++) {
        const row = document.createElement('div');
        row.setAttribute('data-row', `${i}`);

        for (let j = 0; j < newDimension; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('data-col', `${j}`);
            row.appendChild(cell);
        }

        container.appendChild(row);
    }

    cells = Array.from(document.querySelectorAll('[data-col]'));
    cells.forEach(cell => cell.addEventListener('mouseover', colorTrace));


}

function checkDimensionConstraints(str) {
    if (str.length > 3)
        return false;
    const arr = str.match(/[a-z\.\-]/i) || [];
    if (arr.length > 0)
        return false;
    if (parseInt(str) > 100)
        return false;
    return true;
}

function colorTrace() {
    if (!this.style.background || this.style.background == 'white') {
        const colorRed = Math.floor(Math.random() * 256);
        const colorGreen = Math.floor(Math.random() * 256);
        const colorBlue = Math.floor(Math.random() * 256);
        const alpha = Math.random();
        this.style.background = `rgba(${colorRed}, ${colorGreen}, ${colorBlue}, ${alpha})`;
    }
    else {
        const cellRgba = this.style.background;
        const cellRgbaValues = cellRgba.replace(/rgba\(/i, '').replace(/\)/, '').split(',');
        cellRgbaValues.forEach((value, index) => {
            cellRgbaValues[index] = parseFloat(value.trim());
        })

        const red = Math.round(cellRgbaValues[0]) - 0.1 * 255;
        const colorRed = red >= 0 ? red : 0;
        const green = Math.round(cellRgbaValues[1]) - 0.1 * 255;
        const colorGreen = green >= 0 ? green : 0;
        const blue = Math.round(cellRgbaValues[2]) - 0.1 * 255;
        const colorBlue = blue >= 0 ? blue : 0;

        if (cellRgbaValues.length == 3)
            this.style.background = `rgba(${colorRed}, ${colorGreen}, ${colorBlue})`;
        else {

            const a = cellRgbaValues[3] + 0.1;
            const alpha = a > 1 ? 1 : a;
            this.style.background = `rgba(${colorRed}, ${colorGreen}, ${colorBlue}, ${alpha})`;
        }
    }
}

// function setGrid() {
//     for (let i = 0; i < 16; i++) {
//         const row = document.createElement('div');
//         row.setAttribute('data-row', `${i}`);

//         for (let j = 0; j < 16; j++) {
//             const cell = document.createElement('div');
//             cell.setAttribute('data-col', `${j}`);
//             row.appendChild(cell);
//         }

//         container.appendChild(row);
//     }
// }

