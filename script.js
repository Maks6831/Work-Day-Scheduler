$(function(){

//-------------------------------------------------------------------------- clock and clearing local storage --------------------------------------------------------------------------//

let timeDisplay = null; //For clock
let display = $("#time"); // to link the time div to js

// the following function displays the date and time dynamically. It also resets the local storage at midnight.
function time() {
    timeDisplay = setInterval(function(){
        // colorRows function changes the colours of the div (checks time every second)
        colorRows();
        // the following code checks if it is midnight and clears local storage if it is.
        var mmt = moment();
        var mmtMidnight = mmt.clone().startOf('day');
        var diffMinutes = mmt.diff(mmtMidnight, 'minutes');
        if (diffMinutes == 0){
            console.log('midnight: events are cleared!')
            localStorage.removeItem('stored-inputs');
        }
        // the following displays the date and time dynamically. 
        let curDatTime = moment().format("h:mm:ss a dddd Do MMMM YYYY");
        display.text(curDatTime);
        return curDatTime;
    }, 1000)
}

// now lets call the time function!
time();

//-------------------------------------------------------------------------- Dynamically created the input divs --------------------------------------------------------------------------//

// gets element with container class
let container = $(".container");
// this array will be used to display the time on each input. 
let hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
// hourTime will be used to compare with moment().hour()
let hourTime = 9

// for loop to create input divs for page. 
for(let i = 0; i < hours.length; i++){
    // creating bootstrap row
    let row = $('<div class="row"></div>');
    // time input and saveBtn populate the row
    let time = $('<div class="hour col-2"></div>')
    time.text(hours[i]);
    let input = $('<input type="text" class="col-8">')
    let saveBtn = $('<button class="saveBtn col-2"><i class="fa-solid fa-floppy-disk"></i></button>');
    // giving input id of hourTime so that the value can be compared to moment().hour();
    input.attr('id', hourTime);
    // increase so that next div is representative of the next hour. 
    hourTime++;
    row.append(time, input, saveBtn);
    container.append(row);

    // adding eventlistener to each of the save buttons. 
    saveBtn.on("click", function(event){
        event.preventDefault();
        // object to store the id and input text of div
        let inputId = {
            input: input.val(),
            location: input.attr('id'),
        };
        // stores the input information in local storage. 
        let storeInputs = JSON.parse(localStorage.getItem('stored-inputs'))||[];
        storeInputs.push(inputId);
        localStorage.setItem('stored-inputs', JSON.stringify(storeInputs));
    })

    // when the page is revisited the data from localstorage is retrieved and put in appropriate input box
    let storInp = JSON.parse(localStorage.getItem('stored-inputs'))||[];
for(let i = 0; i < storInp.length; i++){
    if(storInp[i].location == input.attr('id')){
        input.val(storInp[i].input);
    }
}

//-------------------------------------------------------------------------- Dynamically change color of input divs --------------------------------------------------------------------------//
}
// function to change colours of divs depending on the time. 
function colorRows(){
    let currentTime = moment().hour();
    for(let blockTime = 9; blockTime < 18; blockTime++){
        let blockId = '#' + blockTime
        // if number of id is smaller than hour no. then make grey
    if(blockTime < currentTime){
        $(blockId).addClass('past');
        // if no of id = hour no. then make red
    } else if(blockTime == currentTime){
        $(blockId).removeClass('past');
        $(blockId).addClass('present');
        // if no of id is greater than hour no. then make green!
    } else {
        $(blockId).removeClass('past');
        $(blockId).removeClass('present');
        $(blockId).addClass('future');
    }

    }
    }
})



