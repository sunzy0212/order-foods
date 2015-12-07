/**
 * Created by zhiyuans on 12/4/2015.
 */
function Menu(){

}

Menu.prototype.fun1=function(){
    this.fun2();
};
Menu.prototype.fun2=function(){
    console.log('fun2')
};

var menu = new Menu();
menu.fun1();
