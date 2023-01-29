$(function(){
    let timeDisplay = null;
let display = $("#time");




function time() {
    timeDisplay = setInterval(function(){
         
        let curDatTime = moment().format("h:mm:ss a dddd Do MMMM YYYY");
        display.text(curDatTime);
        return curDatTime;
    }, 1000)
}

time();

let container = $(".container")
let hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
console.log('Hello2')

for(let i = 0; i < hours.length; i++){
    console.log('Hello3')
    let row = $('<div class="row"></div>');
    let time = $('<div class="hour col-2"></div>')
    time.text(hours[i]);
    let input = $('<input type="text" class="col-8">')
    let saveBtn = $('<button class="saveBtn col-2"><i class="fa-solid fa-floppy-disk"></i></button>');
    row.append(time, input, saveBtn);
    container.append(row);
    
}

})
