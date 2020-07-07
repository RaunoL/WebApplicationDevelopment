document.getElementById("search").addEventListener("click", () => {
    document.getElementById("error").style.display = "none";
    let location = document.getElementById("query").value;
    $.ajax({
        url: `https://edward2.solent.ac.uk/~wad1901/api/accommodation/${location}`,
        method: "get",
        dataType: "json",
        success: (data) => {
            displayResults(data);
            createMarkers(data);
        },
        error: (err) => {
            handleError(err.status);
        }
    });


});

function handleError(code) {
    let display = document.getElementById("error");
    let errorMessage;
    if (code == 500) {
        errorMessage = "server error";
    }
    if (code = 404) {
        errorMessage = "Not found";
    }
    display.innerHTML = errorMessage;
    display.style.display = "block";
}

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    data.forEach(result => {
        let name = document.createElement("div");
        let type = document.createElement("div");
        let desc = document.createElement("div");
        name.innerText = result.name;
        type.innerText = result.type;
        desc.innerText = result.description;
        let row = document.createElement("div");
        row.className = "row";
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(desc);
        resultsDiv.appendChild(row);
    });
}

function createMarkers(data) {
    data.forEach(result => {
        let pos = [result.latitude, result.longitude];
        let marker = L.marker(pos).addTo(map);
        marker.bindPopup(`<h3>${result.name}</h3><button onClick=openBooking(${result.ID})>Book</button><br><button onClick=availability(${result.ID})>Check availability</button>`);
    });
}


let map = L.map("map1");
let attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib }).addTo(map);
let pos;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        gpspos => {
            let pos = [gpspos.coords.latitude, gpspos.coords.longitude];
            map.setView(pos, 12);
        },
        err => {
            if (err.code == 1) {
                alert("Please allow us to know your location")
            }
            if (err.code == 2) {
                alert("Location could not be obtained")
            }
            if (err.code == 3) {
                alert("Connection timed out")
            }
        }, { enableHighAccuracy: true, maximumAge: 5000 }
    );
} else {
    alert("Sorry, geolocation not supported in this browser");
}

function openBooking(id, date) {
    // let thedate = prompt("Please enter the date of your booking in format YYMMDD");
    // let username = prompt("Under who's name is the booking made?");
    // let npeople = prompt("How many guest should we expect?")
    let thedate;
    if (date == undefined) {
        thedate = "200401"
    } else {
        thedate = date;
    }
    document.getElementById("booking").style.display = "block";
    document.getElementById("date").value = thedate;
    document.getElementById("accID").value = id;

}
document.getElementById("close-booking").addEventListener("click", () => {
    document.getElementById("booking").style.display = "none";
})
document.getElementById("newBookingButton").addEventListener("click", () => {
    let id = document.getElementById("accID").value;
    let username = document.getElementById("username").value;
    let npeople = document.getElementById("npeople").value;
    let date = document.getElementById("date").value;
    console.log(id, date, username, npeople);
    sendBooking(id, date, username, npeople);
});

function sendBooking(id, thedate, username, npeople) {
    $.ajax({
        url: 'https://edward2.solent.ac.uk/~wad1901/api/booking/create',
        method: "post",

        data: {
            accID: id,
            thedate: thedate,
            username: username,
            npeople: npeople
        },
        dataType: "json",
        success: (data, text, xhr) => {
            bookingStatus(xhr.status);
        },
        error: (err) => {
            bookingStatus(err.status);
        }
    });
}

function bookingStatus(status) {
    bookingError = document.getElementById("booking-error");
    if (status == 410) {
        bookingError.innerHTML = "Not enough space available";
    } else if (status == 404) {
        bookingError.innerHTML = "Not found";
    } else if (status == 500) {
        bookingError.innerHTML = "Server error";
    } else if (status == 201) {
        bookingError.innerHTML = "Booking made successfully";
    } else if (status == 400) {
        bookingError.innerHTML = "Bad request. Invalid data entered";
    } else {
        bookingError.innerHTML = "Something went wrong with your booking";
    }
    bookingError.style.display = "block";
    console.log(status);
}