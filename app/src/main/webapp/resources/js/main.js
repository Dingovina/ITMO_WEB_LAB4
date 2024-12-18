// Доп: интерфейс дб менеджера + 2 реализации (jdbc и hibernate), менять динамически

import { CanvasManager } from "./managers/canvasManager.js";
import { TableManager } from "./managers/tableManager.js";

function renderPoints(){
    let curR = parseFloat(document.querySelector('input[name="form:r-input"]:checked').value);
    let points = [];
    for (let row of document.querySelectorAll('#history-table tbody tr')) {
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

function setTimezone(){
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("timezone-form:timezone-input").value = currentTimezone;
    document.getElementById("timezone-form:submit").click();
}


init();

function init(){
    setTimezone();
    renderPoints();
}

document.getElementsByName("form:r-input").forEach(radio => {
    radio.addEventListener('change', () => {
        renderPoints();
    });
});

document.getElementById("form:x-input").setAttribute("readonly", "readonly");

document.getElementById("canvas").onclick = function(event) {
    let point = CanvasManager.handleClick(event);
    document.getElementById("hidden-form:x-input").value = point.x;
    document.getElementById("hidden-form:y-input").value = point.y;
    document.getElementById("hidden-form:r-input").value = point.r;
    document.getElementById("hidden-form:drawn-input").value = true;
    document.getElementById("hidden-form:submit").click();

    setTimeout(() => {
        renderPoints();
    }, 200);    
}

document.getElementById("form:submit").addEventListener('click', () => {
    let cnt = TableManager.getTableLenght();
    setTimeout(() => {
        if (cnt != TableManager.getTableLenght()) {
            renderPoints();
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Некорректные данные',
              })
        }
    }, 200);
});