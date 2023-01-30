$(function(){
    let timeDisplay = null;
let display = $("#time");
console.log(moment().hour())
if(moment().hour() == 0){
    localStorage.removeItem('stored-inputs');
}







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

let hourTime = 9


for(let i = 0; i < hours.length; i++){
    let row = $('<div class="row"></div>');
    let time = $('<div class="hour col-2"></div>')
    time.text(hours[i]);
    let input = $('<input type="text" class="col-8">')
    let saveBtn = $('<button class="saveBtn col-2"><i class="fa-solid fa-floppy-disk"></i></button>');
    input.attr('id', hourTime);
    hourTime++;
    console.log()
    row.append(time, input, saveBtn);
    container.append(row);
     if(input.attr('id') > 13){
        input.addClass('future');
        console.log('hello');
    } else {
        input.addClass('past');
    } 
    if(input.attr('id') == 13){
        input.addClass('present');
    }
    saveBtn.on("click", function(event){
        event.preventDefault();
        let inputId = {
            input: input.val(),
            location: input.attr('id'),
        };
        let storeInputs = JSON.parse(localStorage.getItem('stored-inputs'))||[];
        storeInputs.push(inputId);
        localStorage.setItem('stored-inputs', JSON.stringify(storeInputs));
    })

    let storInp = JSON.parse(localStorage.getItem('stored-inputs'))||[];
for(let i = 0; i < storInp.length; i++){
    if(storInp[i].location == input.attr('id')){
        input.val(storInp[i].input);
    }
}



}

})



