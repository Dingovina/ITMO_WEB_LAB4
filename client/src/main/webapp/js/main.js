import { CanvasManager } from "./managers/canvasManager.js";

function getPoints(){
    $.ajax({
        url: "http://localhost:8081/points",
        method: "GET",
        success: function(data) {
            console.log(data);
            renderPoints(data);
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function renderPoints(points){
    let curR = parseFloat(document.querySelector('input[name="r-input"]:checked').value);
    let tableBody = document.querySelector('#history-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    points.forEach(point => {
        let row = document.createElement('tr');
        
        let xCell = document.createElement('td');
        xCell.textContent = point.x;
        row.appendChild(xCell);
        
        let yCell = document.createElement('td');
        yCell.textContent = point.y;
        row.appendChild(yCell);
        
        let rCell = document.createElement('td');
        rCell.textContent = point.r;
        row.appendChild(rCell);

        let hitCell = document.createElement('td');
        hitCell.textContent = point.hit ? "Попадание" : "Промах";
        row.appendChild(hitCell);

        let creationTimeCell = document.createElement('td');
        creationTimeCell.textContent = point.creationTime;
        row.appendChild(creationTimeCell);

        tableBody.appendChild(row);
    });

    CanvasManager.updatePonits(points); 
}
init();

function init(){
    getPoints();
}

document.getElementsByName("r-input").forEach(radio => {
    radio.addEventListener('change', () => {
        getPoints();
    });
});

document.getElementById("canvas").onclick = function(event) {
    let point = CanvasManager.handleClick(event);
    $.ajax({
        url: "http://localhost:8081/add",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            x: point.x,
            y: point.y,
            r: point.r,
            drawn: true,
        }),
        success: function(response) {
            console.log(response);
            getPoints();
        },
        error: function(response) {
            console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: response,
            })
        }
    })
}

document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    let x = document.getElementById("x-input").value;
    let y = document.getElementById("y-input").value;
    let r = document.getElementById("r-input").value;
    $.ajax({
        url: "http://localhost:8081/add",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            x: x,
            y: y,
            r: r,
            drawn: false,
        }),
        success: function() {
            getPoints();
        },
        error: function(response) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
            })
        }
    })
});