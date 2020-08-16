const today = moment();
const time = moment().format("HH:mm A");
let currentHour = moment().format("H");
let newBackground = "";
let appointText = "";
let appointTime = "";
let appointArray = [];
let storedAppoint = "";

$(document).ready(function () {

    function addDateAndTime() {
        $("#currentDay").text(today.format("[Today's Date:] ddd; MMMM Do, YYYY"));
        $("#timeOfDay").text(time);
    }

    clearEachDay();
    changeBackground();
    addDateAndTime();
    showCurrentAppointments();

    console.log(currentHour);

    function showCurrentAppointments() {
        storedAppoint = JSON.parse(localStorage.getItem("appointments"));
        if (storedAppoint !== null) {
            for (let i = 0; i < storedAppoint.length; i++) {
                let returnedAppoint = storedAppoint[i];
                let details = returnedAppoint.details;
                let time = returnedAppoint.time
                if (details != null) {
                    $("#" + time).siblings().children("textarea").val(details);
                }
            }
        }
    }

    $(".save-button").on("click", function () {
        appointText = $(this).parent().siblings(".description").children().val();
        appointTime = $(this).parent().siblings(".hour").attr("id")
        appointment = {
            time: appointTime,
            details: appointText,
            entered: moment()
        }
        console.log(appointment);
        tempArray = JSON.parse(localStorage.getItem("appointments"));
        if (tempArray === null) {
            localStorage.setItem("appointments", JSON.stringify([{ time: appointTime, details: appointText, entered: moment() }]));
        } else {
            tempArray.push(appointment);
            localStorage.setItem("appointments", JSON.stringify(tempArray));
        }
        $(this).siblings(".description").parent().siblings("textarea").replaceWith($("<textarea>" + appointText + "</textarea>"))
        changeBackground();
    });

    function changeBackground() {
        for (var i = 5; i <= 22; i++) {
            newBackground = i;
            if (currentHour == i) {
                $("#" + newBackground).addClass("present");
                $("#" + newBackground).siblings("div").children("textarea").addClass("present");
            } else if (currentHour > i) {
                $("#" + newBackground).addClass("past");
                $("#" + newBackground).siblings("div").children("textarea").addClass("past");
            } else {
                $("#" + newBackground).addClass("future");
                $("#" + newBackground).siblings("div").children("textarea").addClass("future")
            }
        }
    }

    function clearEachDay() {
        storedAppoint = JSON.parse(localStorage.getItem("appointments"));
        for (var i = 0; i < storedAppoint.length; i++) {
            if (storedAppoint[i].entered > today.diff(moment(), "1")) {
                localStorage.removeItem(storedAppoint[i]);
            }
        }
    }
});