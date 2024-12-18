function time() {
    let clock = document.getElementById('clock');
    let date = new Date();
    let time = date.toLocaleTimeString();
    clock.innerHTML = time;
}

document.addEventListener("DOMContentLoaded", function () { 
    time();
    setInterval(time, 5000);
});