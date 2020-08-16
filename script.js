const today = moment();
const time = moment().format("HH:mm A");
let newBackground;

$("#currentDay").text(today.format("[Today's Date:] ddd; MMMM Do, YYYY"));
$("#timeOfDay").text(time);

let currentHour = moment().format("H");

for (let i = 0; i <= 23; i++) {
    newBackground = i;
    if (currentHour = i) {
        $("#" + newBackground).addClass("present");
    } else if (currentTime > i) {
        $("#" + newBackground).addClass("past");
    } else {
        $("#" + newBackground).addClass("future");
    }
}