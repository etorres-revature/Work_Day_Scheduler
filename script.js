const today = moment();
const time = moment().format("HH:mm A");
let newBackground;

$("#currentDay").text(today.format("[Today's Date:] ddd; MMMM Do, YYYY"));
$("#timeOfDay").text(time);

let currentHour = moment().format("H");
console.log(currentHour);

for (let i = 0; i <= 23; i++) {
    newBackground = i;
    if (currentHour == i) {
        $("#" + newBackground).addClass("present");
        $("#"+ newBackground).siblings("div").children("textarea").addClass("present");
    } else if (currentHour > i) {
        $("#" + newBackground).addClass("past");
        $("#" + newBackground).siblings("div").children("textarea").addClass("past");
    } else {
        $("#" + newBackground).addClass("future");
        $("#" + newBackground).siblings("div").children("textarea").addClass("future")
    }
}