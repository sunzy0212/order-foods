var buf = new Buffer(256);
var len = buf.write('Hello',0,10,'utf-8');
function func1(){
    console.trace('in func1');
}
console.log(len);
console.log(buf.length);
console.log(buf.byteLength);
func1();


