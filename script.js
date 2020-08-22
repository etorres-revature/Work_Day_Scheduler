// creating list of global variable
// time of day
const today = moment();
//time of day displayed at hours, minutes, am/pm
const time = moment().format("HH:mm A");
//time of day in current 24 hour format
let currentHour = moment().format("H");
//empty variable to hold the unique id from the .hour HTML code block
let newBackground = "";
//variable to hold the text from the .save-button textarea where it is typed in on the screen by end-user
let appointText = "";
//time - correlates to .hour id in 24 hour format
let appointTime = "";
//empty array to hold objects of parsed JSON from local storage when adding new appointment information
let appointArray = [];



//document ready function
$(document).ready(function () {

    //funciton to add date and time to display
    function addDateAndTime() {
        //taking today variable and setting format, sending it to display in jumbotron
        $("#currentDay").text(today.format("[Today's Date:] ddd; MMMM Do, YYYY"));
        //taking time variable and sending it to display under the date in the jumbotron
        $("#timeOfDay").text("Time: "+time);
    }
    // calling functions to clear entries after they are 24 hours old; change background to represent current, past and future hours; 
    // adding Date and Time to Jumbotron; and displaying current appointments form local storage
    clearEachDay();
    changeBackground();
    addDateAndTime();
    showCurrentAppointments();

    // console.log(currentHour);


    // function logic to display current appointments
    function showCurrentAppointments() {
        //parsing JSON into string variable to hold into array
        var appointArray = JSON.parse(localStorage.getItem("appointments")) || [];
        //if there are stored appointments
        // if (appointArray !== null) {
        //     //iterating over appointArray
        for (let i = 0; i < appointArray.length; i++) {
            //setting a variable equal to each index location of appointArray
            let returnedAppoint = appointArray[i];
            //using the dot property to pull out details
            let details = returnedAppoint.details;
            //using the time property to pull out time
            let time = returnedAppoint.time
            //if there are details to display
            if (details != null) {
                //put the details into the textarea of the appropriate sibling/child corresponding to the time ID
                $("#" + time).siblings().children("textarea").val(details);
            }
        }
        // }
    }


    //logic to save appointment details from save button click event
    $(".save-button").on("click", function () {
        //preventing default behavior of the button
        event.preventDefault()
        //setting appointText equal to the value of the child/sibling of the parent with "descrption" as the class
        appointText = $(this).parent().siblings(".description").children().val();
        //setting appointTime equal to the ID of the child/sibling of the parent with the mathcing ID
        appointTime = $(this).parent().siblings(".hour").attr("id")
        //creating a prototype appointment to hold the value of the descripton, hour, and timestamp
        var appointment = {
            time: appointTime,
            details: appointText,
            entered: today
        }
        console.log(appointment);
        //setting value of temp array to those appointment objects already in local storage
        var tempArray = JSON.parse(localStorage.getItem("appointments"));
        //if tempArray has no items then create local storage item "appointments" with appropriate key/value pairs
        if (tempArray === null) {
            localStorage.setItem("appointments", JSON.stringify([{ time: appointTime, details: appointText, entered: today }]));
            //else logic
        } else {
            //push the current version of the appointment object onto the end of tempArray
            tempArray.push(appointment);
            //set local storage of the tempArray of appointment objects to appointments and stringify for local storage
            localStorage.setItem("appointments", JSON.stringify(tempArray));
        }
        //take what was the value of the appointment description and display it in the appropriate text area
        $(this).siblings(".description").parent().siblings("textarea").replaceWith($("<textarea>" + appointText + "</textarea>"))
        //run changeBackground() function to keep appropriate background shading
        changeBackground();
    });

    //function to change background for morning, past, present, future and evening.
    function changeBackground() {
        //loop to go through working hours 9 am to 5 pm
        for (var i = 9; i <= 17; i++) {
            //setting newBackground variable to the current value of i
            newBackground = i;
            //logic for the current hour being the same as i/newBackground
            if (currentHour == i) {
                //setting the hour div and its sibling with text area to the css value for present (red background)
                $("#" + newBackground).addClass("present");
                $("#" + newBackground).siblings("div").children("textarea").addClass("present");
                //logic for if the hour is in the future
            } else if (currentHour > i) {
                //setting the hour div and its sibling with text area to the css value for future (green background)
                $("#" + newBackground).addClass("past");
                $("#" + newBackground).siblings("div").children("textarea").addClass("past");
                //past hours are captured in the else 
            } else {
                //setting the hour div and its sibling with text area to the css value for past (gray background)
                $("#" + newBackground).addClass("future");
                $("#" + newBackground).siblings("div").children("textarea").addClass("future");
            }
        }

        //iterator to go through the pre-work/morning hours
        for (var i = 5; i < 9; i++) {
            newBackground = i;
            //setting the hour div and its sibling with text area to the css value for morning (darkgrayslate background)
            $("#" + newBackground).addClass("morning");
            $("#" + newBackground).siblings("div").children("textarea").addClass("morning");
        }

        //iterator to go through the post-work/evening hours
        for (var i = 18; i < 23; i++) {
            newBackground = i;
            //setting the hour div and its sibling with text area to the css value for evening (palevioletred background)
            $("#" + newBackground).addClass("evening");
            $("#" + newBackground).siblings("div").children("textarea").addClass("evening");
        }
    }

    //function to removeItems that are over twenty four hours old
    function clearEachDay() {
        //pulls out the locally stored appointments array and parses string to array of objects
        appointArray = JSON.parse(localStorage.getItem("appointments")) || [];
        //if there are no stored appointments in local storage end function
        // if (appointArray === null) {
        //     return;
        //     //else logic
        // } else {
        //loops over array of objects from local storage
        for (var i = 0; i < appointArray.length; i++) {
            // today = today.format("")
            console.log("this is today", today);
            console.log("this is the moment object", appointArray[i].entered);
            // console.log("this is the difference", today.diff(appointArray[i].entered, "1"));
            //compares time stamp to see if it is more than 24 hours old
            if (today.diff(appointArray[i].entered, "day") >= 1) {
                console.log("you are in the if statement");
                //removes item from local storage
                appointArray.splice(i);
            }
            
            localStorage.setItem("appointments", JSON.stringify(appointArray));
        }
    }
});