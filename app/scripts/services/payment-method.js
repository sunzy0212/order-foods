/**
 * Created by ZhiyuanSun on 16/1/10.
 */
serviceModule.service('paymentMethodService',function(){
    this.paymentMethods = new Array();
    this.paymentMethods.push(new PaymentMethodModel('现金支付',0,'images/cash.png','现金',true));
    this.paymentMethods.push(new PaymentMethodModel('支付宝支付',1,'images/alipay.png','支付宝',false));
    this.paymentMethods.push(new PaymentMethodModel('微信支付',2,'images/wechat.jpg','微信',false));

    this.activePaymentId = 0;

    this.setActive = function(id){
        this.activePaymentId = id;
        this.paymentMethods.forEach(function(item){
            if(item.id == id){
                item.isActive = true;
            }
            else{
                item.isActive = false;
            }
        });
        return this.paymentMethods;
    };

    return this;

    function PaymentMethodModel(name, id, img, description, isActive){
        this.name           = name;
        this.id             =   id;
        this.img            =   img;
        this.description    =   description;
        this.isActive       =   isActive;
    }
});