document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("calendar").style.display = "none";
});
let accomID;

function availability(accID) {
    accomID = accID;
    document.getElementById("calendar").style.display = "block";
    $.ajax({
        url: `https://edward2.solent.ac.uk/~wad1901/api/availability/${accID}`,
        method: "get",
        dataType: "json",
        success: (data) => {
            fillCalendar(data, accID);
        }
    });

}

function fillCalendar(data, accID) {

    i1 = 0;
    while (i1 < 5) {
        i2 = 0;
        while (i2 < 5) {
            if (data[i2 + i1 * 5].availability >= 1) {
                ctx.fillStyle = "#00ff00";
            } else {
                ctx.fillStyle = "#ff0000";
            }
            ctx.fillRect(i2 * 100, i1 * 100, 100, 100);
            i2 += 1;
        }
        i1 += 1;
    }
    ctx.fillStyle = '#202020';
    ctx.font = "bold 32px sans-serif";
    i1 = 0;
    while (i1 < 5) {
        i2 = 0;
        while (i2 < 5) {
            ctx.fillText(i2 + 1 + i1 * 5, 50 + i2 * 100, 50 + i1 * 100);
            i2 += 1;
        }
        i1 += 1;
    }

}
canvas1.addEventListener("mouseup", (e) => {
    let mouseX = Math.ceil(e.offsetX / 100);
    let mouseY = Math.floor(e.offsetY / 100);
    let date = 200400 + mouseY * 5 + mouseX;
    openBooking(accomID, date)
});
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');