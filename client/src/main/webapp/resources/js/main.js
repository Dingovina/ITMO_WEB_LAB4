import { CanvasManager } from "./managers/canvasManager.js";

function renderPoints(){
    let curR = parseFloat(document.querySelector('input[name="r-input"]:checked').value);
    let points = [];
    for (let row of document.querySelectorAll('#history-table tbody tr')) {
        if (row.children.length == 0) continue;
        let x = parseFloat(row.children[0].textContent);
        let y = parseFloat(row.children[1].textContent);
        let r = parseFloat(row.children[2].textContent);
        let hit = row.children[3].textContent == "Попадание"; 
        if (r != curR) continue;
        points.push({
            x: x,
            y: y,
            hit: hit,
        });
    }
    CanvasManager.updatePonits(points); 
}
init();

function init(){
    renderPoints();
}

document.getElementsByName("r-input").forEach(radio => {
    radio.addEventListener('change', () => {
        renderPoints();
    });
});

document.getElementById("canvas").onclick = function(event) {
    let point = CanvasManager.handleClick(event);
    // TODO call ajax
    $.ajax({
        url: "http://localhost:8080/controller/addPoint",
        method: "POST",
        data: {
            x: point.x,
            y: point.y,
            r: point.r,
            drawn: true,
        },
        success: function(response) {
            renderPoints();
        },
        error: function(response) {
            console.log(response);
        }
    })
}

document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    // TODO call ajax
});