/*var timeNow = new Date();
var year = timeNow.getFullYear();
var month = timeNow.getMonth()+1;
var day = timeNow.getDate();
var hour = timeNow.getHours();
var minute = timeNow.getMinutes();
var second = timeNow.getSeconds();

var timeString = year.toString();
timeString += (month < 10 ? '0' + month : month.toString());
timeString += (day < 10 ? '0' + day : day.toString());
timeString += (hour < 10 ? '0' + hour : hour.toString());
timeString += (minute < 10 ? '0' + minute : minute.toString());
timeString += (second < 10 ? '0' + second : second.toString());*/

var randNum = Math.round(10000*(Math.random()));
var randString = null;
if(randNum<10){
    randString = '000' + randNum.toString();
}
else if(randNum<100){
    randString = '00' + randNum.toString();
}
else if(randNum<1000){
    randString = '0' + randNum.toString();
}
else{
    randString = randNum.toString();
}

console.log(randString);