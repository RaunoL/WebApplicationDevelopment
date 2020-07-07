document.getElementById("search").addEventListener("click", () => {
    let type = document.getElementById("types").value;
    $.ajax({
        url: './php/requestHandler.php',
        method: "get",
        data: {
            type: type
        },
        dataType: "json",
        success: (data) => {
            if (typeof data === 'object') {
                displayResults(data);
            } else {
                handleError(data)
            }


        },
        error: (err) => {
            handleError(err.status);
        }
    });
});

function handleError(status) {
    errorBox = document.getElementById("errorBox");
    if (status == 404) {
        errorBox.innerHTML = "Not found";
    } else if (status == 400) {
        errorBox.innerHTML = "Bad search query";
    } else {
        errorBox.innerHTML = "something went wrong";
    }

    errorBox.style.display = "block";
}

function displayResults(data) {
    document.getElementById("errorBox").style.display = "none";
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    data.forEach(result => {
        let name = document.createElement("div");
        let type = document.createElement("div");
        let desc = document.createElement("div");
        let booking = document.createElement("div");
        let button = document.createElement("button");
        button.setAttribute("id", `accommodation${result.ID}`);
        button.innerText = "Book";
        booking.appendChild(button);
        name.innerText = result.name;
        type.innerText = result.type;
        desc.innerText = result.description;
        let row = document.createElement("div");
        row.className = "row";
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(desc);
        row.appendChild(booking);
        resultsDiv.appendChild(row);
        document.getElementById(`accommodation${result.ID}`).addEventListener("click", book.bind(this, result.ID));
    });
}

function book(id) {
    let thedate = prompt("Please enter the date of your booking in format YYMMDD");
    let username = prompt("Under who's name is the booking made?");
    let npeople = prompt("How many guest should we expect?");
    $.ajax({
        url: './php/makeBooking.php',
        method: "post",

        data: {
            accID: id,
            thedate: thedate,
            username: username,
            npeople: npeople
        },
        dataType: "json",
        success: (data) => {

            if (typeof data === 'object') {
                alert("booking made successfully");
            } else {
                alert("there was a problem with your booking");
            }
        },
        error: (err) => {
            alert("there was a problem with your booking");
        }
    });
}